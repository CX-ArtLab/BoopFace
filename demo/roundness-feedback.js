// One long mark spans five 2-point subdivisions on the roundness ruler.
const MAJOR_STEP = 10;

function createTickSound(isMuted) {
  const url = new URL('./roundness-tick.wav', import.meta.url);
  const clip = new Audio(url.href);
  clip.preload = 'auto';
  const Context = window.AudioContext || window.webkitAudioContext;
  let context;
  let buffer;
  let lastStart = -Infinity;

  function play() {
    // Coalesce crossings inside a single audio transient during a fast swipe.
    const now = performance.now();
    if (isMuted() || now - lastStart < 22) return;
    lastStart = now;
    if (!buffer || context.state !== 'running') {
      if (!clip.paused && !clip.ended && clip.currentTime > 0) clip.currentTime = 0;
      clip.play().catch(() => {});
      return;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
  }

  function unlock(event) {
    if (!event.isTrusted || isMuted() || !Context) return;
    if (!context) {
      try {
        context = new Context();
      } catch {
        return;
      }
      fetch(url).then(response => response.arrayBuffer())
        .then(bytes => context.decodeAudioData(bytes))
        .then(decoded => { buffer = decoded; })
        .catch(() => {}); // The audio element can still play the same sample.
    }
    if (context.state !== 'running') context.resume().catch(() => {});
  }

  return { play, unlock, clear: () => clip.pause() };
}

export function createRoundnessFeedback(row, isMuted) {
  const sound = createTickSound(isMuted);
  for (const event of ['pointerdown', 'pointerup', 'keydown', 'click']) {
    row.addEventListener(event, sound.unlock, { capture: true });
  }
  const pulses = new Map();
  const squareButton = row.querySelector('#roundnessSquareBtn');
  const roundButton = row.querySelector('#roundnessRoundBtn');
  let flash;

  function flashMark(button) {
    // Leave a short dark gap when consecutive marks hit the same icon.
    const repeating = flash?.effect.target === button && flash.playState === 'running';
    if (repeating && flash.effect.getComputedTiming().progress === null) return;
    flash?.cancel();
    flash = button.animate([{ opacity: 1 }, { opacity: 1 }], {
      delay: repeating ? 18 : 0,
      duration: 65,
    });
  }
  window.addEventListener('blur', stop);

  function stop() {
    flash?.cancel();
    sound.clear();
    cancelMotion();
  }

  function cancelMotion() {
    for (const pulse of pulses.values()) pulse.cancel();
    pulses.clear();
  }

  function cross(previous, next, faces, reducedMotion) {
    const direction = Math.sign(next - previous);
    if (!direction) return;
    const bucket = direction > 0 ? Math.floor : Math.ceil;
    const stopIndex = bucket(next / MAJOR_STEP);
    if (stopIndex === bucket(previous / MAJOR_STEP)) return;
    flashMark(direction < 0 ? squareButton : roundButton);
    sound.play();
    if (reducedMotion) return;

    // Replace each pulse from its current scale. All targets are absolute,
    // so crossing several marks at speed cannot amplify the deformation.
    const edge = Math.abs(stopIndex * MAJOR_STEP - 50) / 50;
    const amount = direction * (0.022 + 0.032 * edge);
    const scaleAt = displacement => `${1 - 0.6 * displacement} ${1 + displacement}`;
    for (const face of faces) {
      if (!face?.isConnected) continue;
      const previousPulse = pulses.get(face);
      const from = previousPulse?.playState === 'running' ? getComputedStyle(face).scale : 'none';
      previousPulse?.cancel();
      const pulse = face.animate([
        { scale: from, easing: 'ease-out' },
        { scale: scaleAt(amount), offset: 0.21, easing: 'ease-in-out' },
        { scale: scaleAt(-amount * 0.12), offset: 0.62, easing: 'ease-out' },
        { scale: '1 1' },
      ], { duration: 200 });
      pulses.set(face, pulse);
    }
  }

  return { cross, stop, cancelMotion };
}
