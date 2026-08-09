/**
 * app-theme.js
 * 多主题系统：暗色、亮色、午夜蓝、森林绿、日落橙
 */

// ===================== 主题定义 =====================
App.THEMES = {
  dark: {
    name: '暗色',
    icon: 'moon',
    vars: {
      '--bg': '#0a0a12',
      '--bg2': '#12121e',
      '--bg3': '#1a1a2e',
      '--ink': '#e8e8f0',
      '--muted': '#8888a0',
      '--muted2': '#5a5a72',
      '--rule': 'rgba(255,255,255,0.08)',
      '--accent': '#6366f1',
      '--accent2': '#ec4899',
      '--accent3': '#f59e0b',
      '--glass-bg': 'rgba(255,255,255,0.04)',
      '--glass-border': 'rgba(255,255,255,0.08)',
      '--glass-blur': '16px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.3)'
    }
  },
  light: {
    name: '亮色',
    icon: 'sun',
    vars: {
      '--bg': '#f0f2f8',
      '--bg2': '#ffffff',
      '--bg3': '#e8eaf2',
      '--ink': '#1a1a2e',
      '--muted': '#5a5a72',
      '--muted2': '#8888a0',
      '--rule': 'rgba(0,0,0,0.08)',
      '--accent': '#6366f1',
      '--accent2': '#ec4899',
      '--accent3': '#f59e0b',
      '--glass-bg': 'rgba(255,255,255,0.6)',
      '--glass-border': 'rgba(0,0,0,0.06)',
      '--glass-blur': '20px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.08)'
    }
  },
  midnight: {
    name: '午夜蓝',
    icon: 'moon',
    vars: {
      '--bg': '#0c1929',
      '--bg2': '#132f4c',
      '--bg3': '#1a3a5c',
      '--ink': '#d6e4f0',
      '--muted': '#7a96b4',
      '--muted2': '#506880',
      '--rule': 'rgba(100,160,255,0.1)',
      '--accent': '#3b82f6',
      '--accent2': '#a78bfa',
      '--accent3': '#60a5fa',
      '--glass-bg': 'rgba(59,130,246,0.06)',
      '--glass-border': 'rgba(100,160,255,0.12)',
      '--glass-blur': '16px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.4)'
    }
  },
  forest: {
    name: '森林绿',
    icon: 'note',
    vars: {
      '--bg': '#0a1f14',
      '--bg2': '#0f2e1d',
      '--bg3': '#164028',
      '--ink': '#d4f0dc',
      '--muted': '#7aaa8e',
      '--muted2': '#506858',
      '--rule': 'rgba(100,200,140,0.1)',
      '--accent': '#10b981',
      '--accent2': '#34d399',
      '--accent3': '#a3e635',
      '--glass-bg': 'rgba(16,185,129,0.05)',
      '--glass-border': 'rgba(100,200,140,0.1)',
      '--glass-blur': '16px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.35)'
    }
  },
  sunset: {
    name: '日落橙',
    icon: 'sun',
    vars: {
      '--bg': '#1a0e14',
      '--bg2': '#2a1620',
      '--bg3': '#3a1e2c',
      '--ink': '#f5e0d4',
      '--muted': '#b48878',
      '--muted2': '#7a5848',
      '--rule': 'rgba(255,160,100,0.1)',
      '--accent': '#f97316',
      '--accent2': '#fb7185',
      '--accent3': '#fbbf24',
      '--glass-bg': 'rgba(249,115,22,0.05)',
      '--glass-border': 'rgba(255,160,100,0.1)',
      '--glass-blur': '16px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.35)'
    }
  }
};

// ===================== 应用主题 =====================
App.applyThemeEnhanced = function() {
  var themeName = App.state.theme || 'dark';
  var theme = App.THEMES[themeName] || App.THEMES.dark;
  var root = document.documentElement;

  // 先清除自定义变量
  Object.keys(App.THEMES).forEach(function(name) {
    var t = App.THEMES[name];
    Object.keys(t.vars).forEach(function(key) {
      root.style.removeProperty(key);
    });
  });

  // 移除 data-theme 属性以避免与 CSS 中的 [data-theme] 冲突
  root.setAttribute('data-theme', themeName === 'light' ? 'light' : 'dark');

  // 应用自定义变量
  Object.keys(theme.vars).forEach(function(key) {
    root.style.setProperty(key, theme.vars[key]);
  });

  // 更新动态背景
  App.updateThemeBackground(themeName);

  // 更新按钮图标
  var btn = App.$('#theme-toggle');
  if (btn) btn.innerHTML = theme.icon === 'sun' ? App.ICONS.sun : App.ICONS.moon;

  App.storage.set('mt-theme', themeName);
};

App.updateThemeBackground = function(themeName) {
  // 背景已改为纯色（var(--bg)），不再创建渐变背景层
  // 若之前已存在 .theme-bg-overlay 元素，则移除
  var bg = document.querySelector('.theme-bg-overlay');
  if (bg && bg.parentNode) {
    bg.parentNode.removeChild(bg);
  }
};

// ===================== 主题选择器 =====================
App.openThemeModal = function() {
  var modal = App.$('#quiz-modal');
  var current = App.state.theme || 'dark';

  var themesHtml = Object.keys(App.THEMES).map(function(key) {
    var t = App.THEMES[key];
    var isActive = key === current;
    return '<div class="theme-card ' + (isActive ? 'active' : '') + '" onclick="App.setTheme(\'' + key + '\')">' +
      '<div class="theme-preview" style="background:' + t.vars['--bg'] + '">' +
        '<div class="tp-accent" style="background:' + t.vars['--accent'] + '"></div>' +
        '<div class="tp-accent2" style="background:' + t.vars['--accent2'] + '"></div>' +
        '<div class="tp-bar" style="background:' + t.vars['--bg3'] + '"></div>' +
      '</div>' +
      '<div class="theme-info">' +
        '<span class="theme-name">' + t.name + '</span>' +
        (isActive ? '<span class="theme-check">' + App.ICONS.check + '</span>' : '') +
      '</div>' +
    '</div>';
  }).join('');

  modal.innerHTML =
    '<div class="modal-backdrop" onclick="App.closeQuizModal()"></div>' +
    '<div class="modal-content">' +
      '<div class="modal-header">' +
        '<h2>' + App.ICONS.palette + ' 选择主题</h2>' +
        '<button class="icon-btn" onclick="App.closeQuizModal()">' + App.ICONS.close + '</button>' +
      '</div>' +
      '<div style="padding:24px">' +
        '<div class="themes-grid">' + themesHtml + '</div>' +
      '</div>' +
    '</div>';
  modal.classList.add('active');
};

App.setTheme = function(name) {
  App.state.theme = name;
  App.applyThemeEnhanced();
  App.closeQuizModal();
  App.showToast('已切换至' + (App.THEMES[name] ? App.THEMES[name].name : name) + '主题');
};

// ===================== 循环切换主题 =====================
App.cycleTheme = function() {
  var keys = Object.keys(App.THEMES);
  var currentIdx = keys.indexOf(App.state.theme || 'dark');
  var nextIdx = (currentIdx + 1) % keys.length;
  App.setTheme(keys[nextIdx]);
};
