/* English AR Learning v3 — Global Script */
'use strict';

const Speech = {
  supported: 'speechSynthesis' in window,
  _voices: [],

  init() {
    if (!this.supported) return;
    const load = () => { this._voices = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  },

  speak(text, rate = 0.88, pitch = 1.0) {
    if (!this.supported || !text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(String(text).trim());
    utt.lang = 'en-US';
    utt.rate = rate;
    utt.pitch = pitch;
    const voice =
      this._voices.find(v => v.lang === 'en-US' && v.localService) ||
      this._voices.find(v => v.lang && v.lang.startsWith('en'));
    if (voice) utt.voice = voice;
    window.speechSynthesis.speak(utt);
  },

  stop() { if (this.supported) window.speechSynthesis.cancel(); }
};

// Haptic feedback
function vibrate(ms = 35) {
  if ('vibrate' in navigator) navigator.vibrate(ms);
}

// Attach touch-action manipulation to interactive elements
function setupTouchAction(root = document) {
  root.querySelectorAll('button, a.part-card, a.submenu-card, a.back-link, a.ar-back, a.top-back').forEach(el => {
    el.style.touchAction = 'manipulation';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Speech.init();
  setupTouchAction();

  // Global data-speak handler (for any page that uses it)
  document.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => {
      Speech.speak(btn.getAttribute('data-speak'));
      vibrate(25);
    });
  });
});

// Initialise speech early (before DOMContentLoaded) so voices load
Speech.init();
