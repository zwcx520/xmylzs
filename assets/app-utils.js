/**
 * app-utils.js
 * 工具函数、SVG图标库、状态管理
 */

var App = window.App || {};

// ===================== 安全存储（兼容本地 file:// 访问） =====================
// 某些浏览器在 file:// 协议、隐私模式或存储被禁用时，localStorage 会抛错。
// 这里统一封装 get/set/remove，失败时返回默认值并不抛错。
App.storage = {
  available: (function() {
    try {
      var k = '__mt_test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  })(),
  _mem: {},  // localStorage 不可用时的内存回退
  get: function(key, defVal) {
    try {
      var raw = App.storage.available
        ? window.localStorage.getItem(key)
        : App.storage._mem[key];
      return raw === null || raw === undefined ? defVal : raw;
    } catch (e) {
      return defVal;
    }
  },
  getJSON: function(key, defVal) {
    var raw = App.storage.get(key, null);
    if (raw === null || raw === undefined) return defVal;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return defVal;
    }
  },
  set: function(key, value) {
    try {
      if (App.storage.available) {
        window.localStorage.setItem(key, value);
      } else {
        App.storage._mem[key] = value;
      }
      return true;
    } catch (e) {
      // 配额超限或被禁用，回退到内存
      App.storage._mem[key] = value;
      return false;
    }
  },
  setJSON: function(key, obj) {
    try {
      return App.storage.set(key, JSON.stringify(obj));
    } catch (e) {
      return false;
    }
  },
  remove: function(key) {
    try {
      if (App.storage.available) {
        window.localStorage.removeItem(key);
      } else {
        delete App.storage._mem[key];
      }
    } catch (e) {
      delete App.storage._mem[key];
    }
  }
};

// ===================== 状态管理 =====================
App.state = {
  currentTopic: null,
  theme: App.storage.get('mt-theme', 'dark'),
  favorites: App.storage.getJSON('mt-favorites', []),
  progress: App.storage.getJSON('mt-progress', {}),
  sidebarOpen: false,
  searchQuery: '',
  audioCtx: null,
  quizResults: {},
};

// ===================== 工具函数 =====================
App.$ = function(sel, parent) { return (parent || document).querySelector(sel); };
App.$$ = function(sel, parent) { return (parent || document).querySelectorAll(sel); };
App.isMobile = function() {
  return window.innerWidth <= 768 || document.documentElement.classList.contains('device-mobile');
};
App.el = function(tag, attrs) {
  var node = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(function(k) {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0) node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
  }
  for (var i = 2; i < arguments.length; i++) {
    if (arguments[i]) node.append(arguments[i]);
  }
  return node;
};

// ===================== 数据扁平化 =====================
App.flatTopics = [];
App.buildFlatTopics = function() {
  App.flatTopics = [];
  MUSIC_THEORY_DATA.categories.forEach(function(cat) {
    cat.topics.forEach(function(topic) {
      App.flatTopics.push(Object.assign({}, topic, {
        categoryId: cat.id,
        categoryName: cat.name,
        categoryColor: cat.color
      }));
    });
  });
};

App.findTopic = function(id) {
  return App.flatTopics.find(function(t) { return t.id === id; });
};

App.findCategory = function(id) {
  return MUSIC_THEORY_DATA.categories.find(function(c) { return c.id === id; });
};

// ===================== SVG图标库 =====================
App.ICONS = {
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  harmony: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M7 4v16M12 4v16M17 4v16M22 4v16"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 19h20l-2-9-4 4-4-7-4 7-4-4z"/></svg>',
  instrument: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 20.77 12 17.77 5.82 20.77 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  piano: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="1"/><path d="M7 6v8M11 6v8M15 6v8M19 6v8"/><path d="M2 14h20"/></svg>',
  quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  drum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h20l-2 10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L2 8z"/><path d="M6 8V4M10 8V4M14 8V4M18 8V4"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  ear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 0 2 2"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0 4 6 2 0"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
};

// ===================== Toast 提示 =====================
App.toastTimer = null;
App.showToast = function(msg) {
  var toast = App.$('#toast');
  if (!toast) {
    toast = App.el('div', { id: 'toast', class: 'toast' });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(App.toastTimer);
  App.toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2000);
};

// ===================== 动画 =====================
App.animateCards = function(selector) {
  requestAnimationFrame(function() {
    App.$$(selector).forEach(function(c, i) {
      c.style.opacity = '0';
      c.style.transform = 'translateY(15px)';
      setTimeout(function() {
        c.style.transition = 'opacity .4s ease, transform .4s ease';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 50 + i * 60);
    });
  });
};

// ===================== 主题切换 =====================
App.applyTheme = function() {
  document.documentElement.setAttribute('data-theme', App.state.theme);
  var btn = App.$('#theme-toggle');
  if (btn) btn.innerHTML = App.state.theme === 'dark' ? App.ICONS.sun : App.ICONS.moon;
};

App.toggleTheme = function() {
  if (App.cycleTheme) {
    App.cycleTheme();
  } else {
    App.state.theme = App.state.theme === 'dark' ? 'light' : 'dark';
    App.storage.set('mt-theme', App.state.theme);
    App.applyTheme();
  }
};

// ===================== 侧边栏 =====================
App.openSidebar = function() {
  try {
    var sb = App.$('#sidebar');
    var bd = App.$('#sidebar-backdrop');
    if (sb) sb.classList.add('open');
    if (bd) bd.classList.add('active');
    App.state.sidebarOpen = true;
  } catch (e) {
    console.error('[openSidebar] 失败:', e);
  }
};

App.closeSidebar = function() {
  try {
    var sb = App.$('#sidebar');
    var bd = App.$('#sidebar-backdrop');
    if (sb) sb.classList.remove('open');
    if (bd) bd.classList.remove('active');
    App.state.sidebarOpen = false;
  } catch (e) {
    console.error('[closeSidebar] 失败:', e);
  }
};

App.toggleSidebar = function() {
  try {
    App.state.sidebarOpen ? App.closeSidebar() : App.openSidebar();
  } catch (e) {
    console.error('[toggleSidebar] 失败:', e);
  }
};

// ===================== 进度管理 =====================
App.markCompleted = function(topicId) {
  if (!App.state.progress[topicId]) App.state.progress[topicId] = {};
  App.state.progress[topicId].completed = true;
  App.state.progress[topicId].completedAt = Date.now();
  App.storage.setJSON('mt-progress', App.state.progress);
  App.updateProgressIndicator();
  App.recordStudyDay();
  if (App.checkAchievements) App.checkAchievements();
};

App.updateProgressIndicator = function() {
  var total = App.flatTopics.length;
  var done = Object.values(App.state.progress).filter(function(p) { return p.completed; }).length;
  var indicator = App.$('#progress-count');
  if (indicator) indicator.textContent = done + '/' + total;
};

// ===================== 收藏管理 =====================
App.toggleFav = function(topicId) {
  var idx = App.state.favorites.indexOf(topicId);
  if (idx >= 0) {
    App.state.favorites.splice(idx, 1);
  } else {
    App.state.favorites.push(topicId);
  }
  App.storage.setJSON('mt-favorites', App.state.favorites);
  App.renderSidebar();
  if (App.checkAchievements) App.checkAchievements();
  var route = App.getHashRoute();
  if (route.page === 'topic' && route.topicId) App.renderTopic(route.topicId);
  else if (route.page === 'category') App.renderCategory(route.topicId);
  else if (route.page === 'favorites') App.renderFavoritesEnhanced();
  App.showToast(idx >= 0 ? '已取消收藏' : '已加入收藏');
};
