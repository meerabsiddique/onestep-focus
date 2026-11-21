/* One Step – break a task into small steps and do them one at a time.
   No frameworks, no backend. Everything is stored in the browser (localStorage). */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     1. Interface text (English + Urdu)
  ------------------------------------------------------------------ */
  const I18N = {
    en: {
      skip: 'Skip to main content',
      settings: 'Settings',
      close: 'Close',
      language: 'Language',
      textSize: 'Text size',
      sizeNormal: 'Normal',
      sizeLarge: 'Large',
      sizeXL: 'Extra large',
      font: 'Font',
      fontDefault: 'Standard',
      fontEasy: 'Easy-read (wider spacing)',
      theme: 'Colours',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeContrast: 'High contrast',
      spacing: 'Extra line spacing',
      motion: 'Reduce motion',
      sound: 'Soft chime when time is up',
      autoRead: 'Read each step aloud automatically',
      question: 'What do you need to get done?',
      intro: 'Type it as messy as you like. We will turn it into small steps and show you only one at a time.',
      taskLabel: 'Your task',
      placeholder: 'e.g. Finish my assignment',
      mic: 'Speak your task',
      go: 'Break it into steps',
      tryExample: 'Or try an example:',
      examples: ['Study for my exam', 'Finish my assignment', 'Clean my room'],
      yourTask: 'Your task:',
      stepOf: 'Step {n} of {m}',
      progress: 'Progress',
      suggested: 'Suggested time:',
      minutes: 'min',
      timerLabel: 'Timer',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      plus5: '+5 min',
      doneBtn: 'I did this step',
      back: 'Back',
      skipStep: 'Do this later',
      read: 'Read aloud',
      allSteps: 'See all steps',
      addStep: 'Add a step',
      add: 'Add',
      remove: 'Remove',
      newTask: 'Start a new task',
      allDone: 'Well done! You finished it.',
      allDoneMsg: 'You got there by taking one small step at a time.',
      privacy: 'Everything stays in your browser. Nothing is sent anywhere.',
      timeUp: 'Time is up. Finish the step when you are ready, or take a little more time.',
      micListening: 'Listening…',
      micError: 'Sorry, I could not hear that. Please try again or type it.',
      emptyTask: 'Please type your task first.',
      stepsReady: 'Your steps are ready. Step 1 is shown.',
      stepDoneMsg: 'Step done.',
      skippedMsg: 'Moved to the end of your list.',
      doneLabel: 'done',
      currentLabel: 'current step'
    },
    ur: {
      skip: 'مرکزی مواد پر جائیں',
      settings: 'ترتیبات',
      close: 'بند کریں',
      language: 'زبان',
      textSize: 'متن کا سائز',
      sizeNormal: 'عام',
      sizeLarge: 'بڑا',
      sizeXL: 'بہت بڑا',
      font: 'فونٹ',
      fontDefault: 'عام',
      fontEasy: 'آسان پڑھنے والا (زیادہ فاصلہ)',
      theme: 'رنگ',
      themeLight: 'روشن',
      themeDark: 'تاریک',
      themeContrast: 'زیادہ کنٹراسٹ',
      spacing: 'لائنوں کے درمیان زیادہ فاصلہ',
      motion: 'حرکت کم کریں',
      sound: 'وقت ختم ہونے پر نرم گھنٹی',
      autoRead: 'ہر قدم خود بخود پڑھ کر سنائیں',
      question: 'آپ کو کیا کرنا ہے؟',
      intro: 'جیسے چاہیں لکھ دیں۔ ہم اسے چھوٹے قدموں میں بانٹ دیں گے اور ایک وقت میں صرف ایک قدم دکھائیں گے۔',
      taskLabel: 'آپ کا کام',
      placeholder: 'مثلاً: اسائنمنٹ مکمل کرنا',
      mic: 'بول کر لکھیں',
      go: 'قدموں میں تقسیم کریں',
      tryExample: 'یا کوئی مثال آزمائیں:',
      examples: ['امتحان کی تیاری', 'اسائنمنٹ مکمل کرنا', 'کمرہ صاف کرنا'],
      yourTask: 'آپ کا کام:',
      stepOf: 'قدم {n} از {m}',
      progress: 'پیش رفت',
      suggested: 'تجویز کردہ وقت:',
      minutes: 'منٹ',
      timerLabel: 'ٹائمر',
      start: 'شروع کریں',
      pause: 'روکیں',
      reset: 'دوبارہ',
      plus5: '+5 منٹ',
      doneBtn: 'یہ قدم مکمل ہو گیا',
      back: 'پیچھے',
      skipStep: 'بعد میں کریں گے',
      read: 'پڑھ کر سنائیں',
      allSteps: 'تمام قدم دیکھیں',
      addStep: 'نیا قدم شامل کریں',
      add: 'شامل کریں',
      remove: 'ہٹائیں',
      newTask: 'نیا کام شروع کریں',
      allDone: 'شاباش! آپ نے مکمل کر لیا۔',
      allDoneMsg: 'آپ نے ایک وقت میں ایک چھوٹا قدم اٹھا کر یہ کام پورا کیا۔',
      privacy: 'سب کچھ آپ کے براؤزر میں رہتا ہے۔ کچھ بھی کہیں نہیں بھیجا جاتا۔',
      timeUp: 'وقت ختم ہو گیا۔ جب تیار ہوں تو قدم مکمل کریں، یا کچھ اور وقت لے لیں۔',
      micListening: 'سن رہا ہوں…',
      micError: 'معذرت، آواز سمجھ نہیں آئی۔ دوبارہ کوشش کریں یا لکھ دیں۔',
      emptyTask: 'براہِ کرم پہلے اپنا کام لکھیں۔',
      stepsReady: 'آپ کے قدم تیار ہیں۔ پہلا قدم دکھایا گیا ہے۔',
      stepDoneMsg: 'قدم مکمل۔',
      skippedMsg: 'اسے فہرست کے آخر میں بھیج دیا گیا۔',
      doneLabel: 'مکمل',
      currentLabel: 'موجودہ قدم'
    }
  };

  /* ------------------------------------------------------------------
     2. Step templates (rule-based, works offline, no AI needed).
        {t} is replaced by the user's task text.
  ------------------------------------------------------------------ */
  const TEMPLATES = [
    {
      keys: ['study', 'exam', 'revise', 'revision', 'quiz', 'test', 'prepare', 'امتحان', 'پڑھ', 'تیاری', 'کوئز'],
      steps: [
        { en: 'Clear your desk and put your phone out of reach', ur: 'اپنی میز صاف کریں اور فون اپنی پہنچ سے دور رکھیں', min: 2 },
        { en: 'On a piece of paper, list the topics for “{t}”', ur: 'کاغذ پر “{t}” کے موضوعات کی فہرست بنائیں', min: 5 },
        { en: 'Pick the hardest topic and study it for one focused round', ur: 'سب سے مشکل موضوع چنیں اور ایک بار توجہ سے پڑھیں', min: 25 },
        { en: 'Close the book and write down what you remember', ur: 'کتاب بند کریں اور جو یاد ہے وہ لکھیں', min: 10 },
        { en: 'Check what you missed and note it down', ur: 'دیکھیں کیا رہ گیا اور اسے نوٹ کر لیں', min: 5 },
        { en: 'Take a 5-minute break: water, stretch, breathe', ur: '5 منٹ کا وقفہ لیں: پانی پیئیں، جسم کو کھینچیں، گہری سانس لیں', min: 5 }
      ]
    },
    {
      keys: ['assignment', 'homework', 'essay', 'report', 'write', 'submit', 'lab', 'paper', 'presentation', 'اسائنمنٹ', 'رپورٹ', 'مضمون', 'جمع'],
      steps: [
        { en: 'Open “{t}” and read the instructions once', ur: '“{t}” کھولیں اور ہدایات ایک بار پڑھیں', min: 5 },
        { en: 'Write down exactly what must be handed in', ur: 'لکھیں کہ بالکل کیا جمع کرانا ہے', min: 3 },
        { en: 'Do the easiest part first to get started', ur: 'شروع کرنے کے لیے سب سے آسان حصہ پہلے کریں', min: 15 },
        { en: 'Work on the main part', ur: 'اہم حصے پر کام کریں', min: 25 },
        { en: 'Read it through once and fix small mistakes', ur: 'ایک بار پڑھیں اور چھوٹی غلطیاں ٹھیک کریں', min: 10 },
        { en: 'Submit it and tick it off', ur: 'جمع کرائیں اور مکمل کا نشان لگائیں', min: 3 }
      ]
    },
    {
      keys: ['code', 'coding', 'program', 'build', 'app', 'bug', 'website', 'project', 'کوڈ', 'پروگرام', 'پروجیکٹ'],
      steps: [
        { en: 'Write one sentence on what “{t}” should do', ur: 'ایک جملے میں لکھیں کہ “{t}” کو کیا کرنا چاہیے', min: 5 },
        { en: 'Break it into 3 small pieces', ur: 'اسے 3 چھوٹے حصوں میں تقسیم کریں', min: 5 },
        { en: 'Build the smallest piece that works', ur: 'سب سے چھوٹا کام کرنے والا حصہ بنائیں', min: 25 },
        { en: 'Run it and fix one problem', ur: 'اسے چلائیں اور ایک مسئلہ ٹھیک کریں', min: 15 },
        { en: 'Save your work (commit or make a backup)', ur: 'اپنا کام محفوظ کریں (کمٹ یا بیک اپ)', min: 3 }
      ]
    },
    {
      keys: ['clean', 'tidy', 'room', 'laundry', 'organize', 'organise', 'dishes', 'صفائی', 'صاف', 'کمرہ', 'کمرے'],
      steps: [
        { en: 'Put on some music or a podcast', ur: 'موسیقی یا پوڈکاسٹ لگا لیں', min: 1 },
        { en: 'Pick up rubbish only, nothing else yet', ur: 'پہلے صرف کوڑا اٹھائیں، اور کچھ نہیں', min: 5 },
        { en: 'Put things back where they belong', ur: 'چیزیں ان کی جگہ پر رکھیں', min: 10 },
        { en: 'Wipe the surfaces', ur: 'سطحیں صاف کریں', min: 10 },
        { en: 'Look at the result and enjoy it for a moment', ur: 'نتیجہ دیکھیں اور ایک لمحہ خوش ہوں', min: 1 }
      ]
    },
    {
      keys: ['email', 'mail', 'message', 'reply', 'call', 'ای میل', 'پیغام', 'فون'],
      steps: [
        { en: 'Write the one main thing you need to say in “{t}”', ur: '“{t}” میں وہ ایک اہم بات لکھیں جو کہنی ہے', min: 3 },
        { en: 'Add any details the other person needs', ur: 'وہ تفصیل شامل کریں جو دوسرے شخص کو چاہیے', min: 5 },
        { en: 'Read it once, then send it', ur: 'ایک بار پڑھیں، پھر بھیج دیں', min: 3 }
      ]
    }
  ];

  const GENERIC = [
    { en: 'Take one slow breath. Write what “{t}” looks like when it is done', ur: 'ایک آہستہ سانس لیں۔ لکھیں کہ “{t}” مکمل ہونے پر کیسا ہوگا', min: 3 },
    { en: 'List the small actions needed', ur: 'ضروری چھوٹے کاموں کی فہرست بنائیں', min: 5 },
    { en: 'Do only the very first action, for just 5 minutes', ur: 'صرف پہلا کام کریں، بس 5 منٹ کے لیے', min: 5 },
    { en: 'Keep going on the main part', ur: 'اصل کام جاری رکھیں', min: 20 },
    { en: 'Check what is left and finish it', ur: 'دیکھیں کیا باقی ہے اور اسے مکمل کریں', min: 10 },
    { en: 'Celebrate. You did it', ur: 'خوش ہوں۔ آپ نے کر دکھایا', min: 1 }
  ];

  function generateSteps(task) {
    const lower = task.toLowerCase();
    const match = TEMPLATES.find(tpl => tpl.keys.some(k => lower.includes(k)));
    const source = match ? match.steps : GENERIC;
    return source.map(s => ({
      en: s.en.replace(/\{t\}/g, task),
      ur: s.ur.replace(/\{t\}/g, task),
      min: s.min,
      done: false
    }));
  }

  /* ------------------------------------------------------------------
     3. Small helpers: storage, DOM, translation
  ------------------------------------------------------------------ */
  const $ = id => document.getElementById(id);

  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable: ignore */ }
    }
  };

  function prefersMedia(query) {
    try { return window.matchMedia && window.matchMedia(query).matches; } catch (e) { return false; }
  }

  const defaults = {
    lang: 'en',
    size: '1',
    font: 'default',
    theme: prefersMedia('(prefers-contrast: more)') ? 'contrast'
        : prefersMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light',
    spacing: false,
    motion: prefersMedia('(prefers-reduced-motion: reduce)'),
    sound: true,
    autoRead: false
  };

  const settings = Object.assign({}, defaults, store.get('onestep.settings', {}));
  const state = Object.assign({ task: '', steps: [], current: 0, view: 'setup' }, store.get('onestep.state', {}));

  function t(key, vars) {
    const table = I18N[settings.lang] || I18N.en;
    let s = table[key] !== undefined ? table[key] : (I18N.en[key] !== undefined ? I18N.en[key] : key);
    if (typeof s === 'string' && vars) {
      Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
    }
    return s;
  }

  function stepText(step) { return step[settings.lang] || step.en; }

  function announce(message) {
    const el = $('announce');
    el.textContent = '';
    setTimeout(() => { el.textContent = message; }, 60);
  }

  const saveState = () => store.set('onestep.state', state);
  const saveSettings = () => store.set('onestep.settings', settings);

  /* ------------------------------------------------------------------
     4. Settings (language, size, font, colours, spacing, motion, sound)
  ------------------------------------------------------------------ */
  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    renderExamples();
  }

  function applySettings() {
    const root = document.documentElement;
    root.lang = settings.lang;
    root.dir = settings.lang === 'ur' ? 'rtl' : 'ltr';
    root.dataset.theme = settings.theme;
    root.dataset.font = settings.font;
    root.dataset.spacing = settings.spacing ? 'on' : 'off';
    root.dataset.motion = settings.motion ? 'reduce' : 'normal';
    root.style.setProperty('--scale', settings.size);

    document.querySelectorAll('[data-setting]').forEach(ctrl => {
      const key = ctrl.dataset.setting;
      if (ctrl.type === 'checkbox') ctrl.checked = !!settings[key];
      else ctrl.value = settings[key];
    });
    applyI18n();
  }

  document.querySelectorAll('[data-setting]').forEach(ctrl => {
    ctrl.addEventListener('change', () => {
      const key = ctrl.dataset.setting;
      settings[key] = ctrl.type === 'checkbox' ? ctrl.checked : ctrl.value;
      saveSettings();
      applySettings();
      render();
    });
  });

  function setSettingsOpen(open) {
    $('settings').hidden = !open;
    $('settingsBtn').setAttribute('aria-expanded', String(open));
    if (open) $('s-lang').focus();
    else $('settingsBtn').focus();
  }
  $('settingsBtn').addEventListener('click', () => setSettingsOpen($('settings').hidden));
  $('settingsClose').addEventListener('click', () => setSettingsOpen(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('settings').hidden) setSettingsOpen(false);
  });

  /* ------------------------------------------------------------------
     5. Views
  ------------------------------------------------------------------ */
  function showView(name) {
    state.view = name;
    $('viewSetup').hidden = name !== 'setup';
    $('viewFocus').hidden = name !== 'focus';
    $('viewDone').hidden = name !== 'done';
  }

  function renderExamples() {
    const box = $('exampleList');
    box.textContent = '';
    (t('examples') || []).forEach(text => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = text;
      b.addEventListener('click', () => startTask(text));
      box.appendChild(b);
    });
  }

  function remainingCount() {
    return state.steps.filter(s => !s.done).length;
  }

  function renderFocus(options) {
    const opts = options || {};
    const step = state.steps[state.current];
    if (!step) return;

    $('taskTitle').textContent = state.task;
    $('progressText').textContent = t('stepOf', { n: state.current + 1, m: state.steps.length });
    const bar = $('progressBar');
    bar.max = state.steps.length;
    bar.value = state.steps.filter(s => s.done).length;
    $('stepText').textContent = stepText(step);
    $('stepMin').textContent = step.min;
    $('backBtn').disabled = state.current === 0;
    $('skipBtn').disabled = remainingCount() <= 1;

    if (opts.resetTimer) resetTimer(step.min);
    renderList();

    if (opts.focusStep) $('stepText').focus();
    if (opts.speak && settings.autoRead) speak(stepText(step));
  }

  function renderList() {
    const list = $('stepList');
    list.textContent = '';
    state.steps.forEach((s, i) => {
      const li = document.createElement('li');
      if (s.done) li.classList.add('is-done');
      if (i === state.current) {
        li.classList.add('is-current');
        li.setAttribute('aria-current', 'step');
      }

      const line = document.createElement('div');
      line.className = 'step-line';

      const span = document.createElement('span');
      span.className = 'step-text';
      span.textContent = stepText(s);
      line.appendChild(span);

      if (s.done || i === state.current) {
        const sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = ' (' + (s.done ? t('doneLabel') : t('currentLabel')) + ')';
        span.appendChild(sr);
      }

      const rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'btn ghost';
      rm.textContent = t('remove');
      rm.setAttribute('aria-label', t('remove') + ': ' + stepText(s));
      rm.addEventListener('click', () => removeStep(i));
      line.appendChild(rm);

      li.appendChild(line);
      list.appendChild(li);
    });
  }

  function render() {
    showView(state.view);
    if (state.view === 'focus') renderFocus({});
    drawTimer();
  }

  /* ------------------------------------------------------------------
     6. Task flow
  ------------------------------------------------------------------ */
  function startTask(text) {
    const task = (text || '').trim();
    if (!task) {
      announce(t('emptyTask'));
      $('taskInput').focus();
      return;
    }
    state.task = task;
    state.steps = generateSteps(task);
    state.current = 0;
    showView('focus');
    renderFocus({ resetTimer: true, focusStep: true, speak: true });
    saveState();
    announce(t('stepsReady'));
  }

  function finish() {
    showView('done');
    stopTimer();
    saveState();
    $('doneTitle').focus();
  }

  function completeStep() {
    const step = state.steps[state.current];
    if (!step) return;
    step.done = true;
    announce(t('stepDoneMsg'));
    if (state.current >= state.steps.length - 1) {
      finish();
      return;
    }
    state.current += 1;
    renderFocus({ resetTimer: true, focusStep: true, speak: true });
    saveState();
  }

  function goBack() {
    if (state.current === 0) return;
    state.current -= 1;
    state.steps[state.current].done = false;
    renderFocus({ resetTimer: true, focusStep: true, speak: true });
    saveState();
  }

  function skipStep() {
    if (remainingCount() <= 1) return;
    const [step] = state.steps.splice(state.current, 1);
    state.steps.push(step);
    announce(t('skippedMsg'));
    renderFocus({ resetTimer: true, focusStep: true, speak: true });
    saveState();
  }

  function removeStep(index) {
    state.steps.splice(index, 1);
    if (state.steps.length === 0) {
      resetAll();
      return;
    }
    if (index < state.current) state.current -= 1;
    if (state.current >= state.steps.length) {
      finish();
      return;
    }
    renderFocus({ resetTimer: index === state.current });
    saveState();
  }

  function addStep(text) {
    const value = (text || '').trim();
    if (!value) return;
    state.steps.push({ en: value, ur: value, min: 10, done: false });
    renderFocus({});
    saveState();
  }

  function resetAll() {
    stopTimer();
    state.task = '';
    state.steps = [];
    state.current = 0;
    showView('setup');
    $('taskInput').value = '';
    saveState();
    $('taskInput').focus();
  }

  $('taskForm').addEventListener('submit', e => {
    e.preventDefault();
    startTask($('taskInput').value);
  });
  $('addForm').addEventListener('submit', e => {
    e.preventDefault();
    addStep($('addInput').value);
    $('addInput').value = '';
    $('addInput').focus();
  });
  $('doneBtn').addEventListener('click', completeStep);
  $('backBtn').addEventListener('click', goBack);
  $('skipBtn').addEventListener('click', skipStep);
  $('newTaskBtn').addEventListener('click', resetAll);
  $('againBtn').addEventListener('click', resetAll);
  $('readBtn').addEventListener('click', () => {
    const step = state.steps[state.current];
    if (step) speak(stepText(step));
  });

  /* ------------------------------------------------------------------
     7. Timer (soft chime, no harsh alarm)
  ------------------------------------------------------------------ */
  const timer = { left: 0, id: null };

  function fmt(total) {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function drawTimer() {
    $('timerDisplay').textContent = fmt(timer.left);
    $('timerToggle').textContent = timer.id ? t('pause') : t('start');
  }

  function stopTimer() {
    if (timer.id) clearInterval(timer.id);
    timer.id = null;
  }

  function resetTimer(minutes) {
    stopTimer();
    timer.left = Math.round(minutes * 60);
    drawTimer();
  }

  function chime() {
    if (!settings.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 523.25;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) { /* audio blocked: ignore */ }
  }

  function tick() {
    timer.left -= 1;
    if (timer.left <= 0) {
      timer.left = 0;
      stopTimer();
      chime();
      announce(t('timeUp'));
    }
    drawTimer();
  }

  $('timerToggle').addEventListener('click', () => {
    if (timer.id) {
      stopTimer();
    } else {
      if (timer.left <= 0) {
        const step = state.steps[state.current];
        timer.left = Math.round(((step && step.min) || 5) * 60);
      }
      timer.id = setInterval(tick, 1000);
    }
    drawTimer();
  });
  $('timerReset').addEventListener('click', () => {
    const step = state.steps[state.current];
    resetTimer((step && step.min) || 5);
  });
  $('timerPlus').addEventListener('click', () => {
    timer.left += 300;
    drawTimer();
  });

  /* ------------------------------------------------------------------
     8. Voice: read aloud (speechSynthesis) and voice input (SpeechRecognition)
  ------------------------------------------------------------------ */
  function speak(text) {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = settings.lang === 'ur' ? 'ur-PK' : 'en-US';
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    $('micBtn').hidden = false;
    $('micBtn').addEventListener('click', () => {
      try {
        const rec = new Recognition();
        rec.lang = settings.lang === 'ur' ? 'ur-PK' : 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        $('micStatus').textContent = t('micListening');
        rec.onresult = e => {
          $('taskInput').value = e.results[0][0].transcript;
          $('micStatus').textContent = '';
          $('taskInput').focus();
        };
        rec.onerror = () => { $('micStatus').textContent = t('micError'); };
        rec.onend = () => {
          if ($('micStatus').textContent === t('micListening')) $('micStatus').textContent = '';
        };
        rec.start();
      } catch (e) {
        $('micStatus').textContent = t('micError');
      }
    });
  }

  /* ------------------------------------------------------------------
     9. Start
  ------------------------------------------------------------------ */
  if (state.view === 'focus' && state.steps.length === 0) state.view = 'setup';
  if (state.view === 'focus' && !state.steps[state.current]) state.current = 0;
  if (state.view === 'done') state.view = 'setup';

  applySettings();
  showView(state.view);
  if (state.view === 'focus') {
    const step = state.steps[state.current];
    resetTimer((step && step.min) || 5);
    renderFocus({});
  } else {
    drawTimer();
  }
})();
