/* =============================================
   English AR Learning — Global Script v1.0
   Shared utilities: Speech, helpers
   ============================================= */

'use strict';

// ── Web Speech API (Text-to-Speech) ────────────
const Speech = {
  // Check if Web Speech API is supported
  supported: 'speechSynthesis' in window,

  /**
   * Speak a given text in English
   * @param {string} text - Text to speak
   * @param {number} [rate=0.9] - Speech rate (0.1–10)
   * @param {number} [pitch=1] - Pitch (0–2)
   */
  speak(text, rate = 0.9, pitch = 1) {
    if (!this.supported) {
      console.warn('Web Speech API not supported on this device.');
      return;
    }
    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = 'en-US';
    utterance.rate  = rate;
    utterance.pitch = pitch;

    // Try to use a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en') && v.localService);
    if (engVoice) utterance.voice = engVoice;

    window.speechSynthesis.speak(utterance);
  },

  // Stop any ongoing speech
  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  }
};

// Reload voices after they are loaded (required in some browsers)
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices(); // preload voices
  };
}

// ── Haptic feedback (if supported) ─────────────
function vibrate(pattern = 50) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}

// ── Prevent double-tap zoom on buttons ─────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, a.btn, a.part-card').forEach(el => {
    el.addEventListener('touchend', e => e.preventDefault(), { passive: false });
  });
});
