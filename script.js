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


function applyPartThemeClass() {
  if (!document.body) return;

  const path = window.location.pathname.toLowerCase();
  document.body.classList.remove('theme-part-1', 'theme-part-2', 'theme-part-3', 'theme-part-4');

  if (/\/part1(\/|$)/.test(path)) {
    document.body.classList.add('theme-part-1');
  } else if (/\/part2(\/|$)/.test(path)) {
    document.body.classList.add('theme-part-2');
  } else if (/\/part3(\/|$)/.test(path)) {
    document.body.classList.add('theme-part-3');
  } else if (/\/part4(\/|$)/.test(path)) {
    document.body.classList.add('theme-part-4');
  }
}

function injectThemeColorOverrides() {
  if (document.getElementById('english-ar-theme-color-overrides')) return;

  const style = document.createElement('style');
  style.id = 'english-ar-theme-color-overrides';
  style.textContent = `
    body.theme-part-1 { --part-accent: #00d4ff; --part-accent-rgb: 0, 212, 255; --part-ink: #001923; }
    body.theme-part-2 { --part-accent: #ffd60a; --part-accent-rgb: 255, 214, 10; --part-ink: #191300; }
    body.theme-part-3 { --part-accent: #ff3b8f; --part-accent-rgb: 255, 59, 143; --part-ink: #260015; }
    body.theme-part-4 { --part-accent: #06d6a0; --part-accent-rgb: 6, 214, 160; --part-ink: #00170f; }

    body.submenu-page.theme-part-1,
    body.submenu-page.theme-part-2,
    body.submenu-page.theme-part-3,
    body.submenu-page.theme-part-4 {
      background:
        radial-gradient(circle at 20% 0%, rgba(var(--part-accent-rgb), .22), transparent 34%),
        radial-gradient(circle at 85% 15%, rgba(var(--part-accent-rgb), .10), transparent 32%),
        linear-gradient(160deg, #06111f, #111827) !important;
    }

    body.submenu-page .submenu-title {
      color: var(--part-accent);
      text-shadow: 0 0 28px rgba(var(--part-accent-rgb), .22);
    }

    body.submenu-page .submenu-card {
      border-color: rgba(var(--part-accent-rgb), .18);
    }

    body.submenu-page .submenu-card:hover,
    body.submenu-page .submenu-card:active {
      background: rgba(var(--part-accent-rgb), .11);
      border-color: rgba(var(--part-accent-rgb), .32);
    }

    body.submenu-page .submenu-card-tag {
      color: var(--part-accent);
      background: rgba(var(--part-accent-rgb), .12);
      border: 1px solid rgba(var(--part-accent-rgb), .28);
    }

    body.ar-page.theme-part-1 .ar-start-card,
    body.ar-page.theme-part-2 .ar-start-card,
    body.ar-page.theme-part-3 .ar-start-card,
    body.ar-page.theme-part-4 .ar-start-card {
      border-color: rgba(var(--part-accent-rgb), .25);
      box-shadow: 0 24px 90px rgba(var(--part-accent-rgb), .12), 0 24px 90px rgba(0, 0, 0, .42);
    }

    body.ar-page .ar-start-btn,
    body.ar-page .listen-btn {
      background: var(--part-accent);
      color: var(--part-ink);
      box-shadow: 0 12px 34px rgba(var(--part-accent-rgb), .24);
    }

    body.ar-page .ar-status.found,
    body.ar-page .ar-status.theme-accent {
      background: rgba(var(--part-accent-rgb), .96) !important;
      color: var(--part-ink) !important;
      box-shadow: 0 6px 24px rgba(var(--part-accent-rgb), .22) !important;
    }

    body.ar-page .panel-label {
      color: var(--part-accent);
    }

    body.ar-page .question-panel {
      border-color: rgba(var(--part-accent-rgb), .18);
    }

    body.theme-part-3 .wheel-panel {
      border-color: rgba(255, 59, 143, .26) !important;
    }

    body.theme-part-3 .wheel-q-label,
    body.theme-part-3 .wheel-result-label {
      color: #ff7ab8 !important;
    }

    body.theme-part-3 .wheel-resource-link {
      background: rgba(255, 59, 143, .14) !important;
      border-color: rgba(255, 59, 143, .28) !important;
      color: #ffd1e5 !important;
    }

    body.theme-part-3 .wheel-resource-link:hover {
      background: rgba(255, 59, 143, .22) !important;
    }

    body.theme-part-4 .game-help,
    body.theme-part-4 .game-loader-card p {
      color: #d1fae5 !important;
    }

    body.theme-part-4 .word-list h3,
    body.theme-part-4 .progress-title,
    body.theme-part-4 .score-display {
      color: #86efac !important;
    }

    body.theme-part-4 .submit-btn,
    body.theme-part-4 .modal-btn-primary,
    body.theme-part-4 .load-bar-fill {
      background: #06d6a0 !important;
      color: #00170f !important;
      box-shadow: 0 10px 28px rgba(6, 214, 160, .22) !important;
    }

    body.theme-part-4 .modal-input:focus {
      border-color: rgba(6, 214, 160, .5) !important;
      box-shadow: 0 0 0 3px rgba(6, 214, 160, .12) !important;
    }

    body.theme-part-4 .game-loader {
      background: radial-gradient(circle at top, rgba(6, 214, 160, .18), var(--bg-page) 65%) !important;
    }
  `;
  document.head.appendChild(style);
}

function initGlobalHelpers() {
  applyPartThemeClass();
  injectThemeColorOverrides();
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
