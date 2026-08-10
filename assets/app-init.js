/**
 * app-init.js
 * 应用初始化：绑定事件、启动路由、注册增强功能
 */

App.init = function() {
  // 数据扁平化（依赖 MUSIC_THEORY_DATA，失败则无法渲染内容）
  try {
    if (App.buildFlatTopics) App.buildFlatTopics();
  } catch (e) {
    console.error('[init] buildFlatTopics 失败:', e);
  }

  // 应用主题系统（失败不影响内容渲染，仅样式异常）
  try {
    if (App.applyThemeEnhanced) {
      App.applyThemeEnhanced();
    } else if (App.applyTheme) {
      App.applyTheme();
    }
  } catch (e) {
    console.error('[init] applyTheme 失败:', e);
  }

  // 设置头部按钮图标
  try {
    var dashBtn = App.$('#dashboard-btn');
    if (dashBtn) dashBtn.innerHTML = App.ICONS.chart;
    var pathsBtn = App.$('#paths-btn');
    if (pathsBtn) pathsBtn.innerHTML = App.ICONS.map;
  } catch (e) {
    console.error('[init] 设置头部图标失败:', e);
  }

  // 渲染侧边栏（失败不影响主内容）
  try {
    if (App.renderSidebar) App.renderSidebar();
  } catch (e) {
    console.error('[init] renderSidebar 失败:', e);
  }

  // 初始化键盘快捷键
  try {
    if (App.initKeyboard) App.initKeyboard();
  } catch (e) {
    console.error('[init] initKeyboard 失败:', e);
  }

  // 检查成就（页面加载时）
  try {
    if (App.checkAchievements) App.checkAchievements();
  } catch (e) {
    console.error('[init] checkAchievements 失败:', e);
  }

  // 路由监听
  window.addEventListener('hashchange', function() {
    try { App.handleRoute(); } catch (e) { console.error('[hashchange] handleRoute 失败:', e); }
  });

  // 搜索输入（手机端全屏搜索 + 桌面端 header 搜索）
  var searchTimer;
  document.addEventListener('input', function(e) {
    try {
      if (e.target.id === 'search-input') {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function() { App.performSearch(e.target.value); }, 200);
      } else if (e.target.id === 'header-search-input') {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function() { App.handleHeaderSearch(e.target.value); }, 200);
      }
    } catch (err) {
      console.error('[input] 搜索处理失败:', err);
    }
  });

  // 点击外部关闭桌面端下拉搜索
  document.addEventListener('click', function(e) {
    try {
      var headerSearch = App.$('#header-search');
      var dropdown = App.$('#search-dropdown');
      if (dropdown && dropdown.classList.contains('show') && headerSearch && !headerSearch.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    } catch (err) {
      console.error('[click] 关闭下拉失败:', err);
    }
  });

  // 键盘快捷键（基础版，增强版由 app-keyboard.js 注册）
  document.addEventListener('keydown', function(e) {
    try {
      if (e.key === 'Escape') {
        App.closeSearch();
        App.closeHeaderSearch();
        App.closePiano();
        App.closeQuizModal();
        App.closeSidebar();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (App.isMobile()) {
          App.openSearch();
        } else {
          var input = App.$('#header-search-input');
          if (input) input.focus();
        }
      }
    } catch (err) {
      console.error('[keydown] 快捷键处理失败:', err);
    }
  });

  // 阅读进度
  window.addEventListener('scroll', function() {
    try { App.updateReadingProgress(); } catch (e) {}
  }, { passive: true });

  // 初始路由（最关键步骤：失败时尝试 fallback 渲染首页）
  try {
    App.handleRoute();
  } catch (e) {
    console.error('[init] handleRoute 失败，尝试 fallback:', e);
    try {
      App.renderHome();
    } catch (e2) {
      console.error('[init] renderHome 也失败，渲染错误提示:', e2);
      App.renderFatalError(e2);
    }
  }
};

// 致命错误兜底页面（仅当正常渲染全部失败时调用）
App.renderFatalError = function(err) {
  var main = document.getElementById('main-content');
  if (!main) return;
  main.innerHTML =
    '<div style="max-width:560px;margin:80px auto;padding:32px;text-align:center;font-family:sans-serif;">' +
      '<div style="font-size:48px;margin-bottom:16px;">🎵</div>' +
      '<h2 style="font-size:1.25rem;margin-bottom:8px;">页面加载出错</h2>' +
      '<p style="color:#888;font-size:0.9rem;margin-bottom:20px;">可能是页面兼容性或加载限制导致。请尝试退出重新加载！</p>' +
      '<button onclick="location.reload()" style="padding:10px 24px;border-radius:8px;background:#6366f1;color:#fff;border:none;cursor:pointer;font-size:0.9rem;">重新加载</button>' +
      '<p style="color:#666;font-size:0.75rem;margin-top:24px;word-break:break-all;">错误信息：' + (err && err.message ? err.message : String(err)) + '</p>' +
    '</div>';
};

// DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    try { App.init(); } catch (e) {
      console.error('[DOMContentLoaded] init 失败:', e);
      try { App.renderFatalError(e); } catch (_) {}
    }
  });
} else {
  try { App.init(); } catch (e) {
    console.error('[init] 顶层失败:', e);
    try { App.renderFatalError(e); } catch (_) {}
  }
}
