// Explicit publication boundary. Local editors, backups and experimental pages
// never enter the website simply because they exist under demo/.
export const publicDemoFiles = [
  // The Studio (the demo home) and its parts.
  'index.html', 'studio.js', 'studio.css', 'studio-voice.js', 'studio-agent.js', 'studio-i18n.js', 'roundness-feedback.js', 'roundness-tick.wav',
  'favicon-white.svg', 'fonts/geist.css', 'fonts/OFL.txt',
  'fonts/geist-wordmark-0.ttf', 'fonts/geist-wordmark-1.ttf', 'fonts/geist-wordmark-2.ttf', 'fonts/geist-wordmark-3.ttf', 'fonts/geist-wordmark-4.ttf',
  'skin-catalog.js', 'skin-catalog-data.js', 'voice/voice-audio-data.js',
  // Old addresses, now short redirects into the Studio (the full skin gallery too).
  'skins.html', 'agent.html', 'materials/index.html',
];
