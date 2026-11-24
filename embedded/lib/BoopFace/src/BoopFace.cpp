#include "BoopFace.h"
#include "BoopFaceWebMotion.h"
#include "BoopFaceWebMotionNew.h"

#include <math.h>
#include <string.h>

namespace boopface {
namespace {
constexpr float PI = 3.14159265358979323846f;
float clamp(float x, float low, float high) { return x < low ? low : (x > high ? high : x); }
float smooth(float t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
float lerp(float a, float b, float t) { return a + (b - a) * t; }
// Idle gaze reach per GazeRange, in face units: {horizontal, vertical}.
const float GAZE_REACH[][2] = {{8, 6}, {20, 18}, {30, 21}};
// The Web avatar narrows an eye as it nears the head edge (32 / 208 in its
// 240-unit drawing, i.e. -8 / 168 here): within 58 units, width shrinks by up
// to 22 % and height by 8 %, and the eye moves inward by 58 % of the lost width.
float edgeFactor(float distance) { return clamp(1 - distance / 58, 0, 1); }
const char* const NAMES[] = {
  "idle", "bored", "waiting-spin", "waiting-wrap", "input", "affirm", "success", "failure",
  "wary", "inspect", "angry", "refuse", "surprise", "love", "random", "sleep", "wake", "waiting-wave",
  "observe", "ponder", "think", "waiting-bloom", "waiting-cross", "shape-wait", "bow", "shake",
  "smug", "wink", "dizzy", "bounce", "smug-bounce"
};
const unsigned FIRST_NEW = static_cast<unsigned>(Action::Observe);

// Names that still parse, matching the Web avatar: "waiting" is the generic name
// for the default spin, the others are deprecated and removed in 1.0.
struct Alias { const char* name; Action action; };
const Alias ALIASES[] = {
  {"waiting", Action::WaitingSpin}, {"wait", Action::WaitingSpin}, {"send", Action::Affirm},
  {"failed", Action::Failure}, {"fail", Action::Failure}, {"warning", Action::Wary},
  {"verify", Action::Inspect}, {"review", Action::Inspect}, {"blocked", Action::Angry},
  {"policy-blocked", Action::Angry}, {"error", Action::Refuse}, {"system-error", Action::Refuse},
  {"connection-error", Action::Refuse}, {"slot", Action::Random},
};
static_assert(sizeof(NAMES) / sizeof(NAMES[0]) == static_cast<unsigned>(Action::Count), "Action names must stay complete");
}

size_t Eyes::requiredBytes(uint16_t width, uint16_t height) {
  if (width < 16 || height < 16 || width > 512 || height > 512) return 0;
  return ((static_cast<size_t>(width) + 7) / 8) * height;
}

Eyes::Pose Eyes::webPose(Action action, uint32_t elapsed) {
  const unsigned id = static_cast<unsigned>(action);
  const auto& clip = id >= FIRST_NEW ? web_reference::NEW_CLIPS[id - FIRST_NEW] : web_reference::CLIPS[id];
  if (!clip.count) return webPose(Action::Idle, 0);
  const uint32_t index = elapsed / 20;
  const unsigned a = index < clip.count ? index : clip.count - 1;
  const unsigned b = a + 1 < clip.count ? a + 1 : a;
  const float t = (elapsed % 20) / 20.f;
  Pose result;
  Eye* eyes[] = {&result.left, &result.right};
  for (unsigned side = 0; side < 2; ++side) {
    float v[10];
    for (unsigned j = 0; j < 10; ++j) {
      const float scale = j == 7 || j == 8 ? 4096.f : 100.f;
      const float first = clip.values[a * 20 + side * 10 + j] / scale;
      const float second = clip.values[b * 20 + side * 10 + j] / scale;
      v[j] = j == 9 ? first : lerp(first,second,t);
    }
    const float corner = v[9] < 0 ? -1 : fminf(v[9],fminf(v[2],v[3]));
    *eyes[side] = {v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],corner,corner};
  }
  return result;
}
Eyes::Pose Eyes::neutral() { return webPose(Action::Idle,0); }

bool Eyes::begin(const EyesConfig& config, uint8_t* buffer, size_t capacity, uint32_t now) {
  const size_t needed = requiredBytes(config.width, config.height);
  if (!needed || !buffer || capacity < needed || config.maxFps < 1 || config.maxFps > 60
      || config.transitionMs > 2000 || static_cast<unsigned>(config.gazeRange) > 2) return false;
  config_ = config;
  layout_ = EyesLayout();
  buffer_ = buffer;
  bytes_ = needed;
  stride_ = (config.width + 7) / 8;
  memset(buffer_, 0, bytes_);
  started_ = lastFrame_ = now;
  action_ = Action::Idle;
  from_ = current_ = neutral();
  crossfade_ = false;
  lookX_ = lookY_ = 0;
  force_ = true;
  sleepRendered_ = false;
  return true;
}

const char* Eyes::actionName(Action action) {
  const unsigned index = static_cast<unsigned>(action);
  return index < static_cast<unsigned>(Action::Count) ? NAMES[index] : nullptr;
}

bool Eyes::parseAction(const char* name, Action& result) {
  if (!name) return false;
  for (unsigned i = 0; i < static_cast<unsigned>(Action::Count); ++i) {
    if (strcmp(name, NAMES[i]) == 0) { result = static_cast<Action>(i); return true; }
  }
  for (const Alias& alias : ALIASES) {
    if (strcmp(name, alias.name) == 0) { result = alias.action; return true; }
  }
  return false;
}

uint32_t Eyes::duration(Action action) {
  switch (action) {
    case Action::Bored: return 4000;
    case Action::Affirm: return 1360;
    case Action::Success: return 2000;
    case Action::Failure: return 2720;
    case Action::Wary: return 3850;
    case Action::Inspect: return 6870;
    case Action::Angry: return 1980;
    case Action::Refuse: return 1840;
    case Action::Surprise: return 1770;
    case Action::Love: return 3190;
    case Action::Random: return 2260;
    case Action::Wake: return 750;
    case Action::WaitingBloom: case Action::WaitingCross: return 0; // until stopped
    default: {
      const unsigned index = static_cast<unsigned>(action);
      if (index >= FIRST_NEW && index < static_cast<unsigned>(Action::Count))
        return web_reference::NEW_CLIPS[index - FIRST_NEW].count * 20u;
      return 0;
    }
  }
}

bool Eyes::play(Action action, uint32_t now) {
  if (!buffer_ || !actionName(action)) return false;
  if (action == action_ && (isWaiting() || isSleeping() || action == Action::Input)) return true;
  // Sample at the command timestamp, even if the last display flush was delayed.
  from_ = poseAt(now);
  current_ = from_;
  const bool cursorShape = from_.left.corner >= 0 || from_.right.corner >= 0;
  crossfade_ = (action_ != Action::Idle || action == Action::WaitingWave || action == Action::WaitingBloom
      || action == Action::WaitingCross || cursorShape)
      && (action != Action::Wake || cursorShape);
  action_ = action;
  started_ = now;
  force_ = true;
  sleepRendered_ = false;
  return true;
}

bool Eyes::play(const char* name, uint32_t now) {
  Action action;
  return parseAction(name, action) && play(action, now);
}
void Eyes::reset(uint32_t now) { play(Action::Idle, now); }
void Eyes::startWaiting(uint32_t now, bool wrap) { play(wrap ? Action::WaitingWrap : Action::WaitingSpin, now); }
void Eyes::stopWaiting(uint32_t now) { if (isWaiting()) reset(now); }
void Eyes::sleep(uint32_t now) { play(Action::Sleep, now); }
void Eyes::wake(uint32_t now) { if (isSleeping()) play(Action::Wake, now); }

void Eyes::lookAt(float x, float y) {
  const float lx = isfinite(x) ? clamp(x, -1, 1) : 0;
  const float ly = isfinite(y) ? clamp(y, -1, 1) : 0;
  if (lx == lookX_ && ly == lookY_) return;
  lookX_ = lx;
  lookY_ = ly;
}

bool Eyes::setGazeRange(GazeRange range) {
  if (range != GazeRange::Small && range != GazeRange::Medium && range != GazeRange::Large) return false;
  config_.gazeRange = range;
  force_ = true;
  return true;
}

bool Eyes::setTiming(uint8_t maxFps, bool autoBlink, uint16_t transitionMs) {
  if (!buffer_ || maxFps < 1 || maxFps > 60 || transitionMs > 2000) return false;
  config_.maxFps = maxFps;
  config_.autoBlink = autoBlink;
  config_.transitionMs = transitionMs;
  force_ = true;
  return true;
}

bool Eyes::setLayout(const EyesLayout& layout) {
  if (!buffer_ || layout.x >= config_.width || layout.y >= config_.height ||
      (layout.width && layout.width > config_.width - layout.x) ||
      (layout.height && layout.height > config_.height - layout.y) ||
      (layout.fit != FitMode::Contain && layout.fit != FitMode::Cover) ||
      (layout.shape != ScreenShape::Rectangle && layout.shape != ScreenShape::Circle) ||
      (layout.shape == ScreenShape::Circle && config_.width != config_.height) ||
      !isfinite(layout.zoom) || layout.zoom < .25f || layout.zoom > 3 ||
      !isfinite(layout.offsetX) || fabsf(layout.offsetX) > 1 ||
      !isfinite(layout.offsetY) || fabsf(layout.offsetY) > 1) return false;
  layout_ = layout;
  force_ = true;
  sleepRendered_ = false;
  return true;
}

Eyes::Eye Eyes::mixEye(const Eye& a, const Eye& b, float t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  // A full-radius rounded rectangle is an ellipse. Interpolate both corner
  // axes along with the bounds instead of holding the old primitive until
  // the final frame. Keep the ellipse fast path for ellipse-only transitions.
  const bool ellipses = a.corner < 0 && b.corner < 0;
  const float ax = a.corner < 0 ? a.rx : fminf(a.corner,a.rx);
  const float ay = a.corner < 0 ? a.ry : fminf(a.cornerY,a.ry);
  const float bx = b.corner < 0 ? b.rx : fminf(b.corner,b.rx);
  const float by = b.corner < 0 ? b.ry : fminf(b.cornerY,b.ry);
  return {lerp(a.x,b.x,t), lerp(a.y,b.y,t), lerp(a.rx,b.rx,t), lerp(a.ry,b.ry,t),
          lerp(a.angle,b.angle,t), lerp(a.top,b.top,t), lerp(a.bottom,b.bottom,t),
          lerp(a.topSlope,b.topSlope,t), lerp(a.bottomSlope,b.bottomSlope,t),
          ellipses ? -1 : lerp(ax,bx,t), ellipses ? -1 : lerp(ay,by,t)};
}
Eyes::Pose Eyes::mix(const Pose& a, const Pose& b, float t) {
  return {mixEye(a.left,b.left,t), mixEye(a.right,b.right,t)};
}

Eyes::Pose Eyes::poseAt(uint32_t now) const {
  uint32_t elapsed = now - started_;
  const uint32_t total = duration(action_);
  Action selected = total && elapsed >= total ? Action::Idle : action_;
  if (selected == Action::WaitingSpin && elapsed >= 120) elapsed = 120 + (elapsed - 120) % 3200;
  if (selected == Action::WaitingWrap && elapsed >= 120) elapsed = 120 + (elapsed - 120) % 2400;
  Pose p;
  if (selected == Action::WaitingBloom || selected == Action::WaitingCross) {
    // The voice kit's thinking shapes (src/boopface-voice.js), computed: two
    // ovals crossing in the middle of the face. Bloom breathes and turns;
    // cross rests on the x and turns a quarter at a time, swapping full and slim.
    const float t = elapsed / 1000.f;
    float rx[2], ry[2], angle;
    if (selected == Action::WaitingBloom) {
      const float phase = t * 2 * PI / 4, longR = 55.5f;
      angle = fmodf(t * 57, 360);
      for (int i = 0; i < 2; ++i) {
        const float breath = (1 - cosf(phase + i * 38 * PI / 180)) / 2;
        const float shortR = longR * fmaxf(.1f, fminf(1, (54.8f + (75.4f - 54.8f) * breath) / 100));
        rx[i] = i ? shortR : longR; ry[i] = i ? longR : shortR;
      }
    } else {
      const float step = 850, ms = static_cast<float>(elapsed);
      const int n = static_cast<int>(ms / step);
      const float f = fmodf(ms, step) / step, u = f < .5f ? 4 * f * f * f : 1 - powf(-2 * f + 2, 3) / 2;
      angle = 45 + 90 * n + 90 * u;
      const float slim = (n % 2) ? 1 - u : u, longR = 55.5f, shortR = longR * (.754f + (.548f - .754f) * slim);
      for (int i = 0; i < 2; ++i) { rx[i] = i ? shortR : longR; ry[i] = i ? longR : shortR; }
    }
    angle = fmodf(angle + 180, 360); if (angle < 0) angle += 360; angle -= 180;
    p = {{80, 45, rx[0], ry[0], angle, -100, 100, 0, 0, -1, -1},
         {80, 45, rx[1], ry[1], angle, -100, 100, 0, 0, -1, -1}};
  } else if (selected == Action::WaitingWave) {
    // Restore the experimental v0.1 waiting motion verbatim as a NEW variant.
    // Source: e600f7e3b22dd792c3fc7b26994fa6bae39f1e66, poseAt/Waiting.
    // Legacy neutral geometry is intentional; original Web actions stay intact.
    const float phase = (elapsed % 1400) * 2 * PI / 1400;
    p = {{46, 50 + sinf(phase) * 10, 27, 29, 0, -100, 100, 0, 0, -1, -1},
         {114, 50 + sinf(phase + .7f) * 10, 27, 29, 0, -100, 100, 0, 0, -1, -1}};
  } else {
    p = webPose(selected,elapsed);
  }
  if (selected == Action::Input && p.left.corner >= 0 && ((now / 265) % 2))
    p.left.rx = p.right.rx = 0;
  if (selected == Action::Idle) {
    const float* reach = GAZE_REACH[static_cast<unsigned>(config_.gazeRange)];
    const float dx = lookX_ * reach[0], dy = lookY_ * reach[1];
    Eye* eyes[] = {&p.left, &p.right};
    for (unsigned side = 0; side < 2; ++side) {
      Eye& e = *eyes[side];
      e.y += dy;
      if (dx == 0) continue;
      const float outward = side ? 1.f : -1.f;
      const float edge = side ? 168.f : -8.f;
      // Apply only the change from the resting edge squash, so a centred gaze
      // keeps the sampled Web pose exactly.
      const float f0 = edgeFactor(outward * (edge - e.x)), f = edgeFactor(outward * (edge - e.x - dx));
      const float w0 = 1 - .22f * f0 * f0, w = 1 - .22f * f * f;
      const float rx = e.rx / w0 * w;
      e.x += dx - outward * 2 * (e.rx - rx) * .58f;
      e.rx = rx;
      e.ry = e.ry / (1 - .08f * f0 * f0) * (1 - .08f * f * f);
    }
    if (config_.autoBlink) {
      const uint32_t blink = (now - started_) % 4200;
      if (blink >= 3800 && blink < 3980) {
        const float phase = (blink - 3800) / 180.f;
        const float openness = phase < .5f ? lerp(1,.08f,phase*2) : lerp(.08f,1,(phase-.5f)*2);
        p.left.ry = fmaxf(1.3f,p.left.ry*openness);
        p.right.ry = fmaxf(1.3f,p.right.ry*openness);
        p.left.y += (58-2*p.left.ry)*.02f; p.right.y += (58-2*p.right.ry)*.02f;
      }
    }
  }
  const uint32_t commandElapsed = now - started_;
  if (crossfade_ && config_.transitionMs && commandElapsed < config_.transitionMs)
    p = mix(from_,p,smooth(commandElapsed/static_cast<float>(config_.transitionMs)));
  return p;
}

bool Eyes::update(uint32_t now) {
  if (!buffer_) return false;
  const uint32_t elapsed = now - started_;
  if (!force_ && action_ == Action::Sleep && sleepRendered_) return false;
  const uint32_t interval = (1000u + config_.maxFps - 1) / config_.maxFps;
  if (!force_ && now - lastFrame_ < interval) return false;
  if (duration(action_) && elapsed >= duration(action_)) {
    // Idle starts here with nothing to fade from; the time this action ran must
    // not count toward the idle blink.
    crossfade_ = false;
    action_ = Action::Idle;
    started_ = now;
  }
  current_ = poseAt(now);
  render(current_);
  lastFrame_ = now;
  sleepRendered_ = action_ == Action::Sleep && (now - started_) >= 3400;
  force_ = false;
  return true;
}

void Eyes::setPixel(int x, int y) {
  if (x < 0 || y < 0 || x >= config_.width || y >= config_.height) return;
  const unsigned vw = layout_.width ? layout_.width : config_.width - layout_.x;
  const unsigned vh = layout_.height ? layout_.height : config_.height - layout_.y;
  if (x < layout_.x || y < layout_.y || static_cast<unsigned>(x) >= layout_.x + vw ||
      static_cast<unsigned>(y) >= layout_.y + vh) return;
  if (layout_.shape == ScreenShape::Circle) {
    const float radius = config_.width / 2.f;
    const float dx = x + .5f - radius, dy = y + .5f - radius;
    if (dx * dx + dy * dy > radius * radius) return;
  }
  buffer_[static_cast<size_t>(y) * stride_ + (x >> 3)] |= static_cast<uint8_t>(0x80u >> (x & 7));
}

namespace {
// Rounded lid corners, as the Web avatar draws them (src/boopface-eye-shape.js):
// the eye is the ellipse cut by its two lids, and every corner a lid cuts is
// rounded. Here that is a morphological opening: the shape shrunk by the
// corner radius, then grown back by it, which rounds exactly the convex
// corners and leaves the smooth ellipse alone. A thin slit (sleep, a squint)
// gets half-round ends: the radius grows to half the slit's height.
struct RoundShape {
  enum { MAX = 72 };
  float x[MAX], y[MAX];
  int n = 0;
  float radius = 0;
};
const int ELLIPSE_SAMPLES = 48;
// Clip a convex polygon by a half-plane a*x + b*y + c >= 0.
int clipHalf(const float* ix, const float* iy, int n, float a, float b, float c, float* ox, float* oy, int max) {
  int m = 0;
  for (int i = 0; i < n; ++i) {
    const int j = (i + 1) % n;
    const float di = a * ix[i] + b * iy[i] + c, dj = a * ix[j] + b * iy[j] + c;
    if (di >= 0 && m < max) { ox[m] = ix[i]; oy[m] = iy[i]; ++m; }
    if ((di >= 0) != (dj >= 0) && m < max) {
      const float t = di / (di - dj);
      ox[m] = ix[i] + (ix[j] - ix[i]) * t; oy[m] = iy[i] + (iy[j] - iy[i]) * t; ++m;
    }
  }
  return m;
}
// The eroded shape (every point at least radius from the edge) and the radius,
// in the eye's own units; n == 0 means draw the plain ellipse.
void roundShape(float rx, float ry, float top, float bottom, float topSlope, float bottomSlope, float baseRadius, RoundShape& out) {
  float px[RoundShape::MAX], py[RoundShape::MAX], qx[RoundShape::MAX], qy[RoundShape::MAX];
  int n = 0;
  for (int i = 0; i < ELLIPSE_SAMPLES; ++i) {
    const float t = i * 2 * PI / ELLIPSE_SAMPLES;
    px[n] = rx * cosf(t); py[n] = ry * sinf(t); ++n;
  }
  // top lid keeps y >= top + topSlope*x, bottom keeps y <= bottom + bottomSlope*x
  n = clipHalf(px, py, n, -topSlope, 1, -top, qx, qy, RoundShape::MAX);
  n = clipHalf(qx, qy, n, bottomSlope, -1, bottom, px, py, RoundShape::MAX);
  out.n = 0;
  if (n < 3) return;
  // How tall the eye is through its middle (as the Web measures it).
  const float yTop = fmaxf(top, -ry), yBottom = fminf(bottom, ry), h = yBottom - yTop;
  if (!(h > 0)) return;
  const float w = fminf(1, fmaxf(0, (24 - h) / 10)), k = w * w * (3 - 2 * w);
  const float radius = fminf(baseRadius + k * (h / 2 - baseRadius), h / 2 * .999f);
  if (!(radius > .05f)) return;
  // Shrink: clip the polygon by each of its own edges moved inward by radius.
  float cx = 0, cy = 0;
  for (int i = 0; i < n; ++i) { cx += px[i]; cy += py[i]; }
  cx /= n; cy /= n;
  float ex[RoundShape::MAX], ey[RoundShape::MAX];
  int m = n;
  for (int i = 0; i < n; ++i) { ex[i] = px[i]; ey[i] = py[i]; }
  for (int i = 0; i < n && m >= 3; ++i) {
    const int j = (i + 1) % n;
    float a = -(py[j] - py[i]), b = px[j] - px[i];
    const float len = sqrtf(a * a + b * b);
    if (len < 1e-4f) continue;
    a /= len; b /= len;
    if (a * (cx - px[i]) + b * (cy - py[i]) < 0) { a = -a; b = -b; }
    const float c = -(a * px[i] + b * py[i]) - radius;
    m = clipHalf(ex, ey, m, a, b, c, qx, qy, RoundShape::MAX);
    for (int k2 = 0; k2 < m; ++k2) { ex[k2] = qx[k2]; ey[k2] = qy[k2]; }
  }
  if (m < 1) { // thinner than the radius everywhere: a point at the middle
    ex[0] = cx; ey[0] = cy; m = 1;
  }
  for (int i = 0; i < m; ++i) { out.x[i] = ex[i]; out.y[i] = ey[i]; }
  out.n = m; out.radius = radius;
}
// Is the point within radius of the (convex) shrunk shape?
bool nearShape(const RoundShape& r, float x, float y) {
  if (r.n >= 3) {
    bool inside = true;
    float sign = 0;
    for (int i = 0; i < r.n && inside; ++i) {
      const int j = (i + 1) % r.n;
      const float cr = (r.x[j] - r.x[i]) * (y - r.y[i]) - (r.y[j] - r.y[i]) * (x - r.x[i]);
      if (cr != 0) { if (sign == 0) sign = cr; else if ((cr > 0) != (sign > 0)) inside = false; }
    }
    if (inside) return true;
  }
  const float rr = r.radius * r.radius;
  for (int i = 0; i < r.n; ++i) {
    const int j = r.n > 1 ? (i + 1) % r.n : i;
    const float vx = r.x[j] - r.x[i], vy = r.y[j] - r.y[i], wx = x - r.x[i], wy = y - r.y[i];
    const float l = vx * vx + vy * vy;
    const float t = l > 0 ? fminf(1, fmaxf(0, (wx * vx + wy * vy) / l)) : 0;
    const float dx = wx - vx * t, dy = wy - vy * t;
    if (dx * dx + dy * dy <= rr) return true;
  }
  return false;
}
} // namespace

void Eyes::drawEye(const Eye& e, float scale, float ox, float oy) {
  if (e.rx < .05f || e.ry < .05f) return;
  const float rx = e.rx * scale, ry = e.ry * scale;
  const float cx = ox + e.x * scale, cy = oy + e.y * scale;
  const float angle = e.angle * PI / 180;
  const float c = cosf(angle), s = sinf(angle);
  const float ix = 1 / (rx * rx), iy = 1 / (ry * ry);
  const float a = c * c * ix + s * s * iy;
  const float extentY = e.corner >= 0 ? fabsf(rx*s)+fabsf(ry*c) : sqrtf(rx * rx * s * s + ry * ry * c * c);
  const int y0 = static_cast<int>(fmaxf(0, floorf(cy - extentY)));
  const int y1 = static_cast<int>(fminf(config_.height - 1.f, ceilf(cy + extentY)));
  const bool noClip = e.top <= -e.ry - fabsf(e.topSlope) * e.rx
      && e.bottom >= e.ry + fabsf(e.bottomSlope) * e.rx;
  // Lids that cut the eye: round the corners they make (see roundShape).
  RoundShape rounded;
  if (roundEyes_ && !noClip && e.corner < 0) {
    roundShape(e.rx, e.ry, e.top, e.bottom, e.topSlope, e.bottomSlope, 4, rounded);
  }
  const float cornerX = fminf(e.corner*scale,rx), cornerY = fminf(e.cornerY*scale,ry);
  const float cornerIx = cornerX > 0 ? 1/(cornerX*cornerX) : 0;
  const float cornerIy = cornerY > 0 ? 1/(cornerY*cornerY) : 0;
  for (int y = y0; y <= y1; ++y) {
    const float dy = y + .5f - cy;
    const float b = 2 * c * s * dy * (ix - iy);
    const float q = dy * dy * (s * s * ix + c * c * iy) - 1;
    const float discriminant = b * b - 4 * a * q;
    if (discriminant < 0 && e.corner < 0) continue;
    const float root = sqrtf(fmaxf(0,discriminant));
    const float extentX = fabsf(rx*c)+fabsf(ry*s);
    const int x0 = static_cast<int>(fmaxf(0,ceilf((e.corner >= 0 ? cx-extentX : cx+(-b-root)/(2*a))-.5f)));
    const int x1 = static_cast<int>(fminf(config_.width-1.f,floorf((e.corner >= 0 ? cx+extentX : cx+(-b+root)/(2*a))-.5f)));
    for (int x = x0; x <= x1; ++x) {
      if (e.corner >= 0) {
        const float dx = x+.5f-cx;
        const float lx = fabsf(c*dx+s*dy), ly = fabsf(-s*dx+c*dy);
        if (lx > rx || ly > ry) continue;
        const float qx = fmaxf(0,lx-(rx-cornerX)), qy = fmaxf(0,ly-(ry-cornerY));
        // Preserve the original circular-corner rasterization for the input
        // cursor, with elliptical corners used only during a shape morph.
        if (cornerX == cornerY ? qx*qx+qy*qy > cornerX*cornerX
            : qx*qx*cornerIx+qy*qy*cornerIy > 1) continue;
      }
      if (!noClip) {
        const float dx = x + .5f - cx;
        const float localX = (c * dx + s * dy) / scale;
        const float localY = (-s * dx + c * dy) / scale;
        if (localY < e.top + e.topSlope * localX || localY > e.bottom + e.bottomSlope * localX) continue;
        if (rounded.n && !nearShape(rounded, localX, localY)) continue;
      }
      setPixel(x,y);
    }
  }
}

void Eyes::render(const Pose& pose) {
  memset(buffer_, 0, bytes_);
  const float width = layout_.width ? layout_.width : config_.width - layout_.x;
  const float height = layout_.height ? layout_.height : config_.height - layout_.y;
  float scale = layout_.fit == FitMode::Cover ? fmaxf(width / 160.f, height / 100.f)
      : fminf(width / 160.f, height / 100.f);
  if (layout_.shape == ScreenShape::Circle && layout_.fit == FitMode::Contain)
    scale = fminf(scale, fminf(width,height) / sqrtf(160.f * 160 + 100.f * 100));
  scale *= layout_.zoom;
  const float ox = layout_.x + (width - 160 * scale) / 2 + layout_.offsetX * width / 2;
  const float oy = layout_.y + (height - 100 * scale) / 2 + layout_.offsetY * height / 2;
  drawEye(pose.left, scale, ox, oy);
  drawEye(pose.right, scale, ox, oy);
}

} // namespace boopface

