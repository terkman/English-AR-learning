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
  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  }
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

// -----------------------------------------------------------------------------
// Minimal public labels
// Purpose: update only visible names/descriptions. It does not change AR logic,
// MindAR targets, camera settings, JSON data, 3D models, or .mind files.
// -----------------------------------------------------------------------------
const MinimalLabels = (() => {
  const titleMap = {
    home: 'English AR Learning',
    part1: 'Part 1 — Word Hunter AR',
    part1_1: 'Word Pop',
    part1_2: 'Picture Reveal',
    part1_3: 'Question Clue',
    part2: 'Part 2 — Question Quest AR',
    part2_1: 'Listen & Think',
    part2_2: 'Word Compare',
    part3: 'Part 3 — Mission Spin AR',
    part4: 'Part 4 — 3D Word Detective',
    part4_1: 'Market Word Check',
    part4_2: 'School Word Check'
  };

  const exactText = new Map([
    ['Scan · Explore · Speak', 'Learn with AR'],
    ['Choose your learning activity', 'Choose a learning part'],
    ['Choose your AR learning mission', 'Choose a learning part'],

    ['AR Vocabulary Scanner', 'Part 1 — Word Hunter AR'],
    ['AR Vocabulary\nScanner', 'Part 1 — Word Hunter AR'],
    ['Scan logos & signs to learn English words with voice', 'สแกนภาพ แล้วเรียนรู้คำศัพท์รอบตัว'],
    ['Scan logos & signs, catch English words in 3D, and hear them aloud.', 'สแกนภาพ แล้วเรียนรู้คำศัพท์รอบตัว'],
    ['Image Tracking + Voice', 'Scan + Voice'],

    ['AR Open Question', 'Part 2 — Question Quest AR'],
    ['AR Open\nQuestion', 'Part 2 — Question Quest AR'],
    ['Scan an image to get a random open-ended English question', 'สแกนภาพ แล้วตอบคำถามง่าย ๆ'],
    ['Image Tracking + Q&A', 'Scan + Question'],

    ['AR Answer Mission Wheel', 'Part 3 — Mission Spin AR'],
    ['AR Answer\nMission Wheel', 'Part 3 — Mission Spin AR'],
    ['Scan, get a question, then spin the wheel for your mission!', 'สแกนภาพ แล้วหมุนวงล้อภารกิจ'],
    ['Image Tracking + Wheel', 'Scan + Wheel'],

    ['English Situation 3D', 'Part 4 — 3D Word Detective'],
    ['English\nSituation 3D', 'Part 4 — 3D Word Detective'],
    ['Explore a 3D scene, tap objects to learn vocabulary & conversation', 'สำรวจฉาก 3D แล้วตรวจคำศัพท์'],
    ['3D Model + Dialogue', '3D Scene'],

    ['← Part 1', '← Word Hunter AR'],
    ['← Part 2', '← Question Quest AR'],
    ['← Part 4', '← 3D Word Detective'],

    ['1.1 Scan Image to Text', 'Word Pop'],
    ['1.2 Scan Image to Image', 'Picture Reveal'],
    ['1.3 Scan Image to Question', 'Question Clue'],
    ['2.1 Listen & Ask', 'Listen & Think'],
    ['2.2 Scan Image to Vocabulary', 'Word Compare'],
    ['Part 3.1 Source Wheel', 'Part 3 — Mission Spin AR'],
    ['4.1 Supermarket Vocabulary Game', 'Market Word Check'],
    ['4.2 School Vocabulary Game', 'School Word Check'],

    ['สแกนภาพเป้าหมาย แล้วคำศัพท์ภาษาอังกฤษจะลอยขึ้นเป็น AR text', 'สแกนภาพ แล้วดูคำศัพท์ลอยขึ้นบนหน้าจอ'],
    ['สแกนภาพเป้าหมาย แล้วจะแสดงภาพบริบทผลลัพธ์ทับบนภาพจริง', 'สแกนข้อความ แล้วดูภาพคำตอบที่เกี่ยวข้อง'],
    ['สแกนภาพ แล้วจะแสดง 3D text พร้อมคำถามกระตุ้นการสังเกต', 'สแกนภาพ แล้วดูคำถามสั้น ๆ เพื่อฝึกคิด'],
    ['สแกนภาพ แล้วแสดงประโยคภาษาอังกฤษเป็น 3D text พร้อมคำถามและปุ่มฟังเสียง', 'สแกนภาพ ฟังเสียง แล้วตอบคำถามสั้น ๆ'],
    ['สแกนภาพ แล้วแสดงกลุ่มคำศัพท์เปรียบเทียบในบริบทเดียวกันเป็น 3D AR text', 'สแกนภาพ แล้วดูคำศัพท์หลายคำในบริบทเดียวกัน'],
    ['สแกนภาพเพื่อดูคำถาม AR เต็มรูปแบบ แล้วหมุนวงล้อเลือกแหล่งข้อมูลสำหรับตอบ', 'สแกนภาพ แล้วหมุนวงล้อเพื่อเลือกภารกิจ'],

    ['Hold the camera steady and keep the full target image in frame.', 'Hold steady to reveal the picture.'],
    ['Think about these questions', 'Think about the question'],
    ['Selected Source', 'Mission'],
    ['Tap the wheel to spin', 'Tap to spin'],
    ['Tap the wheel or tap the camera view to spin', 'Tap the wheel to choose a mission'],
    ['Words to Check', 'Word List'],
    ['Word Hunt List', 'Word List'],
    ['Edit Word', 'Edit'],
    ['Fix the Word', 'Edit'],
    ['Your Score', 'Score'],
    ['Mission Score', 'Score'],
    ['ระบบแสดงเฉพาะคะแนนรวม ไม่บอกรายข้อ', 'แสดงคะแนนรวมเท่านั้น'],
    ['กำลังโหลด 3D model โปรดรอสักครู่…', 'กำลังโหลดฉาก 3D…'],
    ['หมุน/ซูมฉากได้ · แตะป้ายหรือเลือกรายการด้านขวาเพื่อแก้คำ', 'หมุนฉาก แตะป้าย แล้วแก้คำ'],
    ['ถ้าคิดว่าคำนี้สะกดผิด ให้แก้ไขแล้วกด Confirm', 'แก้คำ แล้วกด Confirm'],
    ['iPhone/iPad: เปิดใน Safari เพื่อประสิทธิภาพดีที่สุด', 'แนะนำให้ใช้บนมือถือ'],
    ['เหมาะกับ mobile Chrome / Safari', 'แนะนำให้ใช้บนมือถือ']
  ]);

  const pages = [
    { key: 'part1_1', test: p => /\/part1\/1\.1\/?(?:index\.html)?$/.test(p) },
    { key: 'part1_2', test: p => /\/part1\/1\.2\/?(?:index\.html)?$/.test(p) },
    { key: 'part1_3', test: p => /\/part1\/1\.3\/?(?:index\.html)?$/.test(p) },
    { key: 'part2_1', test: p => /\/part2\/2\.1\/?(?:index\.html)?$/.test(p) },
    { key: 'part2_2', test: p => /\/part2\/2\.2\/?(?:index\.html)?$/.test(p) },
    { key: 'part4_1', test: p => /\/part4\/4\.1\/?(?:index\.html)?$/.test(p) },
    { key: 'part4_2', test: p => /\/part4\/4\.2\/?(?:index\.html)?$/.test(p) },
    { key: 'part1', test: p => /\/part1\/?(?:index\.html)?$/.test(p) },
    { key: 'part2', test: p => /\/part2\/?(?:index\.html)?$/.test(p) },
    { key: 'part3', test: p => /\/part3\/?(?:index\.html)?$/.test(p) },
    { key: 'part4', test: p => /\/part4\/?(?:index\.html)?$/.test(p) },
    { key: 'home', test: p => /\/?(?:index\.html)?$/.test(p) }
  ];

  function pageKey() {
    const p = window.location.pathname.replace(/\/index\.html$/, '/');
    const found = pages.find(item => item.test(p));
    return found ? found.key : 'home';
  }

  function setText(selector, value, root = document) {
    const el = root.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHTML(selector, value, root = document) {
    const el = root.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function setAllText(selector, values, root = document) {
    root.querySelectorAll(selector).forEach((el, i) => {
      if (values[i] !== undefined) el.textContent = values[i];
    });
  }

  function setAllHTML(selector, values, root = document) {
    root.querySelectorAll(selector).forEach((el, i) => {
      if (values[i] !== undefined) el.innerHTML = values[i];
    });
  }

  function setCard(card, title, desc, tag) {
    if (!card) return;
    const titleEl = card.querySelector('.card-title, h2');
    const descEl = card.querySelector('.card-desc, p');
    const tagEl = card.querySelector('.card-tag');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (tagEl) tagEl.textContent = tag;
  }

  function setSubCard(card, tag, title, desc) {
    if (!card) return;
    const tagEl = card.querySelector('.submenu-card-tag');
    const titleEl = card.querySelector('h2');
    const descEl = card.querySelector('p');
    if (tagEl) tagEl.textContent = tag;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
  }

  function applyExactText(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue && node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (exactText.has(trimmed)) {
        node.nodeValue = raw.replace(trimmed, exactText.get(trimmed));
        return;
      }

      let next = raw;
      exactText.forEach((value, key) => {
        if (next.includes(key)) next = next.split(key).join(value);
      });
      if (next !== raw) node.nodeValue = next;
    });
  }

  function applyHome() {
    document.title = titleMap.home;
    setText('.header-desc', 'Learn with AR');
    setText('.menu-intro', 'Choose a learning part');
    const cards = document.querySelectorAll('.part-card');
    setCard(cards[0], 'Part 1 — Word Hunter AR', 'สแกนภาพ แล้วเรียนรู้คำศัพท์รอบตัว', 'Scan + Voice');
    setCard(cards[1], 'Part 2 — Question Quest AR', 'สแกนภาพ แล้วตอบคำถามง่าย ๆ', 'Scan + Question');
    setCard(cards[2], 'Part 3 — Mission Spin AR', 'สแกนภาพ แล้วหมุนวงล้อภารกิจ', 'Scan + Wheel');
    setCard(cards[3], 'Part 4 — 3D Word Detective', 'สำรวจฉาก 3D แล้วตรวจคำศัพท์', '3D Scene');
  }

  function applyPart1Menu() {
    document.title = titleMap.part1;
    setHTML('.submenu-title', 'Part 1<br>Word Hunter AR');
    setText('.submenu-lead', 'สแกนภาพ แล้วเรียนรู้คำศัพท์รอบตัว');
    const cards = document.querySelectorAll('.submenu-card');
    setSubCard(cards[0], 'Scan', 'Word Pop', 'สแกนภาพ แล้วดูคำศัพท์ลอยขึ้นบนหน้าจอ');
    setSubCard(cards[1], 'Picture', 'Picture Reveal', 'สแกนข้อความ แล้วดูภาพคำตอบที่เกี่ยวข้อง');
    setSubCard(cards[2], 'Question', 'Question Clue', 'สแกนภาพ แล้วดูคำถามสั้น ๆ เพื่อฝึกคิด');
    setText('.submenu-note', 'ต้องมีไฟล์ .mind ใน assets/targets/ ก่อนใช้งาน');
  }

  function applyPart2Menu() {
    document.title = titleMap.part2;
    setHTML('.submenu-title', 'Part 2<br>Question Quest AR');
    setText('.submenu-lead', 'สแกนภาพ แล้วฝึกตอบคำถามภาษาอังกฤษ');
    const cards = document.querySelectorAll('.submenu-card');
    setSubCard(cards[0], 'Listen', 'Listen & Think', 'สแกนภาพ ฟังเสียง แล้วตอบคำถามสั้น ๆ');
    setSubCard(cards[1], 'Compare', 'Word Compare', 'สแกนภาพ แล้วดูคำศัพท์หลายคำในบริบทเดียวกัน');
    setText('.submenu-note', 'ทุกกิจกรรมใช้ MindAR Image Tracking และต้องมีไฟล์ .mind ก่อนใช้งาน');
  }

  function applyPart4Menu() {
    document.title = titleMap.part4;
    setHTML('.submenu-title', 'Part 4<br>3D Word Detective');
    setHTML('.submenu-lead', 'เลือกฉาก 3D แล้วตรวจคำศัพท์บนป้าย<br>แก้คำที่คิดว่าผิด แล้วดูคะแนนรวม');
    const cards = document.querySelectorAll('.submenu-card');
    setSubCard(cards[0], 'Market', 'Market Word Check', 'ตรวจคำศัพท์ในฉากซูเปอร์มาร์เก็ต');
    setSubCard(cards[1], 'School', 'School Word Check', 'ตรวจคำศัพท์ในฉากโรงเรียน');
    setHTML('.submenu-note', 'รอโหลดโมเดล 3D ก่อนเริ่มเล่น<br>หมุนฉาก แตะป้าย แล้วแก้คำ');
  }

  function setInstructions(lines) {
    const el = document.querySelector('.ar-instructions');
    if (!el) return;
    el.innerHTML = '<strong>วิธีใช้</strong><br>' + lines.join('<br>');
  }

  function applyARPage(title, back, desc, lines, extra = {}) {
    document.title = title;
    setText('.ar-back', back);
    setText('.top-back', back);
    setText('.back-link', back);
    setText('.ar-start-card h1', title);
    setText('.ar-desc', desc);
    setInstructions(lines);
    setText('.ar-hint', 'แนะนำให้ใช้บนมือถือ');
    if (extra.status) setText('#status', extra.status);
    if (extra.help) setText('.ar-help, .hint, .wheel-hint', extra.help);
  }

  function applyPart3() {
    applyARPage(
      titleMap.part3,
      '← Home',
      'สแกนภาพ แล้วหมุนวงล้อเพื่อเลือกภารกิจ',
      [
        '1. กด Start Camera',
        '2. สแกนภาพเป้าหมาย',
        '3. ดูคำถามบนหน้าจอ',
        '4. แตะวงล้อเพื่อเลือกภารกิจ'
      ],
      { status: 'Ready', help: 'Tap the wheel to choose a mission' }
    );
    setText('#sourceTitle, .source-title', 'Mission');
    setText('#spinHint, .spin-hint', 'Tap to spin');
  }

  function applyPart4Scene(title) {
    document.title = title;
    setText('.ar-back', '← 3D Word Detective');
    setText('.top-back', '← 3D Word Detective');
    setText('.back-link', '← 3D Word Detective');
    setText('h1', title);
    setText('.scene-help, .game-help, .page-desc', 'หมุนฉาก แตะป้าย แล้วแก้คำ');
    setText('.panel-title', 'Word List');
    setText('.edit-title', 'Edit');
    setText('.score-title', 'Score');
  }

  function applySubPage(key) {
    if (key === 'part1_1') {
      applyARPage(titleMap.part1_1, '← Word Hunter AR', 'สแกนภาพ แล้วดูคำศัพท์ลอยขึ้นบนหน้าจอ', [
        '1. กด Start Camera',
        '2. สแกนภาพเป้าหมาย',
        '3. คำศัพท์จะลอยขึ้นบนหน้าจอ',
        '4. กด Listen เพื่อฟังเสียง'
      ]);
    } else if (key === 'part1_2') {
      applyARPage(titleMap.part1_2, '← Word Hunter AR', 'สแกนข้อความ แล้วดูภาพคำตอบที่เกี่ยวข้อง', [
        '1. กด Start Camera',
        '2. สแกนภาพข้อความ',
        '3. ภาพคำตอบจะปรากฏบนหน้าจอ',
        '4. ถือกล้องให้นิ่ง'
      ], { help: 'Hold steady to reveal the picture.' });
    } else if (key === 'part1_3') {
      applyARPage(titleMap.part1_3, '← Word Hunter AR', 'สแกนภาพ แล้วดูคำถามสั้น ๆ เพื่อฝึกคิด', [
        '1. กด Start Camera',
        '2. สแกนภาพเป้าหมาย',
        '3. ข้อความและคำถามจะปรากฏ',
        '4. กด Listen เพื่อฟังเสียง'
      ]);
    } else if (key === 'part2_1') {
      applyARPage(titleMap.part2_1, '← Question Quest AR', 'สแกนภาพ ฟังเสียง แล้วตอบคำถามสั้น ๆ', [
        '1. กด Start Camera',
        '2. สแกนภาพเป้าหมาย',
        '3. ประโยคและคำถามจะปรากฏ',
        '4. กด Listen เพื่อฟังเสียง'
      ]);
    } else if (key === 'part2_2') {
      applyARPage(titleMap.part2_2, '← Question Quest AR', 'สแกนภาพ แล้วดูคำศัพท์หลายคำในบริบทเดียวกัน', [
        '1. กด Start Camera',
        '2. สแกนภาพเป้าหมาย',
        '3. คำศัพท์หลายคำจะปรากฏบนหน้าจอ',
        '4. กด Listen เพื่อฟังเสียง'
      ]);
    } else if (key === 'part4_1') {
      applyPart4Scene(titleMap.part4_1);
    } else if (key === 'part4_2') {
      applyPart4Scene(titleMap.part4_2);
    }
  }

  function applyPathSpecific() {
    const key = pageKey();
    if (key === 'home') applyHome();
    else if (key === 'part1') applyPart1Menu();
    else if (key === 'part2') applyPart2Menu();
    else if (key === 'part3') applyPart3();
    else if (key === 'part4') applyPart4Menu();
    else applySubPage(key);
  }

  function apply(root = document) {
    applyExactText(root);
    if (root === document) applyPathSpecific();
  }

  function observe() {
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        applyExactText(document.body || document);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  return { apply, observe };
})();

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

  MinimalLabels.apply();
  MinimalLabels.observe();
});

// Initialise speech early (before DOMContentLoaded) so voices load
Speech.init();
