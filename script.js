/* English AR Learning — Global helpers
   - Keeps shared speech, haptic feedback and mobile touch behavior.
   - Does not rewrite visible labels. Menu names should live directly in HTML.
*/
'use strict';

const Speech = {
  supported: 'speechSynthesis' in window,
  _voices: [],
  _ready: false,

  init() {
    if (!this.supported || this._ready) return;

    const loadVoices = () => {
      this._voices = window.speechSynthesis.getVoices() || [];
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    this._ready = true;
  },

  getVoice() {
    return (
      this._voices.find(v => v.lang === 'en-US' && v.localService) ||
      this._voices.find(v => v.lang === 'en-US') ||
      this._voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en')) ||
      null
    );
  },

  speak(text, rate = 0.88, pitch = 1.0) {
    if (!this.supported || !text) return;

    this.init();
    const cleanText = String(text).trim();
    if (!cleanText) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = this.getVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  }
};

function vibrate(ms = 35) {
  if ('vibrate' in navigator) navigator.vibrate(ms);
}

function setupTouchAction(root = document) {
  root
    .querySelectorAll('button, a.part-card, a.submenu-card, a.back-link, a.ar-back, a.top-back, .scene-label')
    .forEach(el => {
      el.style.touchAction = 'manipulation';
    });
}

function attachSpeakButtons(root = document) {
  root.querySelectorAll('[data-speak]').forEach(btn => {
    if (btn.dataset.speechReady === '1') return;

    btn.dataset.speechReady = '1';
    btn.addEventListener('click', () => {
      Speech.speak(btn.getAttribute('data-speak'));
      vibrate(25);
    });
  });
}

function observeInteractiveElements() {
  if (!document.body || !('MutationObserver' in window)) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        setupTouchAction(node);
        attachSpeakButtons(node);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function initGlobalHelpers() {
  Speech.init();
  setupTouchAction();
  attachSpeakButtons();
  observeInteractiveElements();
}

// Keep helpers available for pages that need direct access.
window.EnglishAR = Object.assign(window.EnglishAR || {}, {
  Speech,
  speak: Speech.speak.bind(Speech),
  stopSpeech: Speech.stop.bind(Speech),
  vibrate,
  setupTouchAction,
  attachSpeakButtons
});

// Backward-compatible global name for older pages that may call Speech.speak(...).
window.Speech = window.Speech || Speech;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalHelpers, { once: true });
} else {
  initGlobalHelpers();
}

// Start voice loading as early as possible, especially on Safari/iOS.
Speech.init();
