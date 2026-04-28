/* =============================================
   English AR Learning — Global Script v1.0
   Shared utilities: Speech, helpers
   ============================================= */

'use strict';

// ── Web Speech API (Text-to-Speech) ────────────
const Speech = {
  supported: 'speechSynthesis' in window,

  speak(text, rate = 0.9, pitch = 1) {
    if (!this.supported) {
      console.warn('Web Speech API not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = 'en-US';
    utterance.rate  = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en') && v.localService);
    if (engVoice) utterance.voice = engVoice;

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  }
};

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// ── Haptic feedback ─────────────
function vibrate(pattern = 50) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}

// ── Touch optimization without blocking mobile links ─────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, a.btn, a.part-card').forEach(el => {
    el.style.touchAction = 'manipulation';
  });
});
