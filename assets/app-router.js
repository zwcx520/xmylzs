/**
 * app-router.js
 * 路由管理
 */

App.getHashRoute = function() {
  var hash = location.hash.slice(1);
  if (!hash) return { page: 'home' };
  var parts = hash.split('/');
  return { page: parts[0] || 'home', topicId: parts[1] || null };
};

App.navigate = function(page, topicId) {
  if (topicId) {
    location.hash = page + '/' + topicId;
  } else {
    location.hash = page || 'home';
  }
  if (App.isMobile()) App.closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 安全渲染：单个页面渲染失败时自动 fallback 到首页，避免白屏
App.safeRender = function(fn, args) {
  try {
    if (typeof fn === 'function') {
      if (args) fn.apply(null, args);
      else fn();
    } else {
      App.renderHome();
    }
  } catch (e) {
    console.error('[safeRender] 页面渲染失败，回退到首页:', e);
    try {
      App.renderHome();
    } catch (e2) {
      console.error('[safeRender] 首页也失败:', e2);
      // 最后兜底：渲染错误提示页（不会抛错）
      if (App.renderFatalError) App.renderFatalError(e2);
    }
  }
};

App.handleRoute = function() {
  var route;
  try {
    route = App.getHashRoute();
  } catch (e) {
    console.error('[handleRoute] getHashRoute 失败:', e);
    route = { page: 'home' };
  }

  try {
    App.renderSidebar();
  } catch (e) {
    console.error('[handleRoute] renderSidebar 失败:', e);
  }

  if (route.page === 'home' || !route.page) {
    App.safeRender(App.renderHome);
  } else if (route.page === 'category' && route.topicId) {
    App.safeRender(App.renderCategory, [route.topicId]);
  } else if (route.page === 'topic' && route.topicId) {
    App.safeRender(App.renderTopic, [route.topicId]);
    try { if (App.recordStudyDay) App.recordStudyDay(); } catch (e) { console.error(e); }
  } else if (route.page === 'favorites') {
    App.safeRender(App.renderFavoritesEnhanced);
  } else if (route.page === 'dashboard') {
    App.safeRender(App.renderDashboard);
  } else if (route.page === 'learning-paths') {
    App.safeRender(App.renderLearningPaths);
  } else if (route.page === 'knowledge-map') {
    App.safeRender(App.renderKnowledgeMap);
  } else if (route.page === 'about') {
    App.safeRender(App.renderAbout);
  } else if (route.page === 'privacy') {
    App.safeRender(App.renderPrivacy);
  } else if (route.page === 'terms') {
    App.safeRender(App.renderTerms);
  } else {
    App.safeRender(App.renderHome);
  }
};

// 阅读进度条
App.updateReadingProgress = function() {
  var bar = App.$('#reading-progress');
  if (!bar) return;
  var scrollTop = window.scrollY;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
};
