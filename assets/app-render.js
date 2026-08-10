/**
 * app-render.js
 * 页面渲染：首页、分类页、主题详情页、收藏页、侧边栏
 */

// ===================== 渲染：首页 =====================
App.renderHome = function() {
  var main = App.$('#main-content');
  var totalTopics = App.flatTopics.length;
  var completed = Object.values(App.state.progress).filter(function(p) { return p.completed; }).length;
  var favCount = App.state.favorites.length;

  main.innerHTML =
    '<div class="hero-section">' +
      '<div class="hero-bg-orbs">' +
        '<div class="orb orb-1"></div>' +
        '<div class="orb orb-2"></div>' +
        '<div class="orb orb-3"></div>' +
      '</div>' +
      '<div class="hero-content">' +
        '<div class="hero-badge">从零基础到精通 · ' + MUSIC_THEORY_DATA.categories.length + '大模块 · ' + totalTopics + '个主题</div>' +
        '<h1 class="hero-title">音乐乐理<br><span class="gradient-text">知识百科</span></h1>' +
        '<p class="hero-subtitle">最全面的音乐理论知识库，涵盖基础乐理、节奏节拍、和声学、练耳视唱、曲式体裁、乐器知识、音乐史、作曲编曲、数字制作、声学、音乐分析、世界音乐及音乐教育，让每个人都能看懂音乐的语言。</p>' +
        '<div class="hero-stats">' +
          '<div class="stat-item"><div class="stat-num">' + totalTopics + '</div><div class="stat-label">知识主题</div></div>' +
          '<div class="stat-item"><div class="stat-num">' + MUSIC_THEORY_DATA.categories.length + '</div><div class="stat-label">学习模块</div></div>' +
          '<div class="stat-item"><div class="stat-num">' + completed + '</div><div class="stat-label">已完成</div></div>' +
          '<div class="stat-item"><div class="stat-num">' + favCount + '</div><div class="stat-label">已收藏</div></div>' +
        '</div>' +
        '<div class="hero-actions">' +
          '<button class="btn btn-primary btn-lg" onclick="App.navigate(\'topic\',\'sound-pitch\')">' + App.ICONS.play + '开始学习</button>' +
          '<button class="btn btn-glass btn-lg" onclick="App.openSearch()">' + App.ICONS.search + '搜索知识</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="section-header">' +
      '<h2 class="section-title">学习路径</h2>' +
      '<p class="section-desc">' + MUSIC_THEORY_DATA.categories.length + '大模块，按难度循序渐进，从入门到精通</p>' +
    '</div>' +
    '<div class="category-grid">' +
      MUSIC_THEORY_DATA.categories.map(function(cat) {
        return '<div class="category-card" style="--cat-color: ' + cat.color + '" onclick="App.navigate(\'category\',\'' + cat.id + '\')">' +
          '<div class="cat-icon" style="background: ' + cat.color + '20; color: ' + cat.color + '">' +
            (App.ICONS[cat.icon] || App.ICONS.note) +
          '</div>' +
          '<div class="cat-info">' +
            '<h3 class="cat-name">' + cat.name + '</h3>' +
            '<p class="cat-desc">' + cat.description + '</p>' +
            '<div class="cat-meta">' +
              '<span class="cat-count">' + cat.topics.length + ' 个主题</span>' +
              '<span class="cat-arrow">' + App.ICONS.arrowRight + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
    '<div class="section-header" style="margin-top:3rem">' +
      '<h2 class="section-title">快速工具</h2>' +
      '<p class="section-desc">互动学习工具，边学边练</p>' +
    '</div>' +
    '<div class="tools-grid">' +
      '<div class="tool-card" onclick="App.openPiano()"><div class="tool-icon" style="color:#6366f1">' + App.ICONS.piano + '</div><h3>虚拟钢琴</h3><p>点击琴键试听各种音程与和弦</p></div>' +
      '<div class="tool-card" onclick="App.openQuiz(\'random\')"><div class="tool-icon" style="color:#ec4899">' + App.ICONS.quiz + '</div><h3>乐理测验</h3><p>随机抽题，检验你的乐理水平</p></div>' +
      '<div class="tool-card" onclick="App.navigate(\'dashboard\')"><div class="tool-icon" style="color:#f59e0b">' + App.ICONS.chart + '</div><h3>学习仪表盘</h3><p>查看进度统计与成就</p></div>' +
      '<div class="tool-card" onclick="App.navigate(\'learning-paths\')"><div class="tool-icon" style="color:#10b981">' + App.ICONS.map + '</div><h3>学习路径</h3><p>按推荐顺序系统学习</p></div>' +
      '<div class="tool-card" onclick="App.navigate(\'knowledge-map\')"><div class="tool-icon" style="color:#8b5cf6">' + App.ICONS.grid + '</div><h3>知识图谱</h3><p>可视化知识关联结构</p></div>' +
      '<div class="tool-card" onclick="App.navigate(\'favorites\')"><div class="tool-icon" style="color:#f59e0b">' + App.ICONS.star + '</div><h3>我的收藏</h3><p>查看已收藏的知识点</p></div>' +
    '</div>';

  App.animateCards('.category-card, .tool-card');
};

// ===================== 渲染：分类页 =====================
App.renderCategory = function(catId) {
  var cat = App.findCategory(catId);
  if (!cat) { App.navigate('home'); return; }
  var main = App.$('#main-content');

  var completedInCat = cat.topics.filter(function(t) { return App.state.progress[t.id] && App.state.progress[t.id].completed; }).length;
  var progressPct = Math.round((completedInCat / cat.topics.length) * 100);

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a>' +
      '<span class="crumb-sep">/</span>' +
      '<span class="crumb-current">' + cat.name + '</span>' +
    '</div>' +
    '<div class="category-header" style="--cat-color: ' + cat.color + '">' +
      '<div class="cat-header-icon" style="background: ' + cat.color + '20; color: ' + cat.color + '">' + (App.ICONS[cat.icon] || App.ICONS.note) + '</div>' +
      '<div><h1 class="page-title">' + cat.name + '</h1><p class="page-subtitle">' + cat.description + '</p></div>' +
    '</div>' +
    '<div class="progress-bar-wrap">' +
      '<div class="progress-info"><span>学习进度 ' + completedInCat + '/' + cat.topics.length + '</span><span>' + progressPct + '%</span></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + progressPct + '%; background:' + cat.color + '"></div></div>' +
    '</div>' +
    '<div class="topic-list">' +
      cat.topics.map(function(topic, i) {
        var isCompleted = App.state.progress[topic.id] && App.state.progress[topic.id].completed;
        var isFav = App.state.favorites.includes(topic.id);
        return '<div class="topic-card ' + (isCompleted ? 'completed' : '') + '" onclick="App.navigate(\'topic\',\'' + topic.id + '\')">' +
          '<div class="topic-number" style="color:' + cat.color + '">' + String(i+1).padStart(2,'0') + '</div>' +
          '<div class="topic-body">' +
            '<div class="topic-title-row">' +
              '<h3 class="topic-card-title">' + topic.title + '</h3>' +
              (isCompleted ? '<span class="topic-badge done">' + App.ICONS.check + '已学完</span>' : '') +
            '</div>' +
            '<p class="topic-summary">' + topic.summary + '</p>' +
            '<div class="topic-meta">' +
              '<span class="meta-tag level-' + topic.level + '">' + topic.level + '</span>' +
              '<span class="meta-tag">' + App.ICONS.clock + '<span>' + topic.readTime + '</span></span>' +
              '<span class="meta-tag">' + topic.sections.length + ' 节内容</span>' +
              '<span class="meta-tag">' + topic.quiz.length + ' 道测验</span>' +
            '</div>' +
          '</div>' +
          '<div class="topic-actions">' +
            '<button class="icon-btn fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();App.toggleFav(\'' + topic.id + '\')">' + (isFav ? App.ICONS.star : App.ICONS.starOutline) + '</button>' +
            '<div class="topic-go">' + App.ICONS.arrowRight + '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>';

  App.animateCards('.topic-card');
};

// ===================== 渲染：主题详情页 =====================
App.renderTopic = function(topicId) {
  var topic = App.findTopic(topicId);
  if (!topic) { App.navigate('home'); return; }
  App.state.currentTopic = topic;
  var main = App.$('#main-content');

  var cat = App.findCategory(topic.categoryId);
  var isFav = App.state.favorites.includes(topic.id);
  var isCompleted = App.state.progress[topic.id] && App.state.progress[topic.id].completed;

  var catTopics = cat.topics;
  var idx = catTopics.findIndex(function(t) { return t.id === topicId; });
  var prevTopic = idx > 0 ? catTopics[idx - 1] : null;
  var nextTopic = idx < catTopics.length - 1 ? catTopics[idx + 1] : null;

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<a onclick="App.navigate(\'category\',\'' + cat.id + '\')" class="crumb-link">' + cat.name + '</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">' + topic.title + '</span>' +
    '</div>' +
    '<article class="topic-detail">' +
      '<header class="topic-header" style="--cat-color: ' + cat.color + '">' +
        '<div class="topic-header-top">' +
          '<span class="meta-tag level-' + topic.level + '" style="border-color:' + cat.color + '40">' + topic.level + '</span>' +
          '<span class="meta-tag">' + App.ICONS.clock + '<span>' + topic.readTime + '</span></span>' +
          '<button class="icon-btn fav-btn ' + (isFav ? 'active' : '') + '" onclick="App.toggleFav(\'' + topic.id + '\')">' + (isFav ? App.ICONS.star : App.ICONS.starOutline) + '</button>' +
        '</div>' +
        '<h1 class="topic-detail-title">' + topic.title + '</h1>' +
        '<p class="topic-detail-summary">' + topic.summary + '</p>' +
      '</header>' +
      '<div class="topic-content">' +
        topic.sections.map(function(sec, i) {
          return '<section class="content-section" id="section-' + i + '">' +
            '<div class="section-num" style="color:' + cat.color + '">' + String(i+1).padStart(2,'0') + '</div>' +
            '<h2 class="section-h2">' + sec.heading + '</h2>' +
            '<p class="section-text">' + sec.content + '</p>' +
            (sec.tip ? '<div class="tip-box" style="border-left-color:' + cat.color + '">' +
              '<div class="tip-icon" style="color:' + cat.color + '">' + App.ICONS.lightbulb + '</div>' +
              '<div class="tip-content"><strong>学习提示</strong><p>' + sec.tip + '</p></div></div>' : '') +
          '</section>';
        }).join('') +
        (typeof App.renderTopicCharts === 'function' ? App.renderTopicCharts(topic.id) : '') +
        '<div class="key-points-box">' +
          '<h3 class="kp-title">' + App.ICONS.check + ' 核心要点</h3>' +
          '<ul class="kp-list">' + topic.keyPoints.map(function(p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="quiz-section" id="quiz-section">' +
          '<h3 class="quiz-title">' + App.ICONS.quiz + ' 随堂测验</h3>' +
          '<p class="quiz-desc">完成测验来标记本节为"已学习"</p>' +
          '<div id="quiz-container"></div>' +
        '</div>' +
        '<div class="topic-nav">' +
          (prevTopic ? '<button class="nav-btn nav-prev" onclick="App.navigate(\'topic\',\'' + prevTopic.id + '\')">' + App.ICONS.arrowLeft + '<span class="nav-label">上一节</span><span class="nav-title">' + prevTopic.title + '</span></button>' : '<div></div>') +
          (nextTopic ? '<button class="nav-btn nav-next" onclick="App.navigate(\'topic\',\'' + nextTopic.id + '\')"><span class="nav-label">下一节</span><span class="nav-title">' + nextTopic.title + '</span>' + App.ICONS.arrowRight + '</button>' : '<div></div>') +
        '</div>' +
        (isCompleted ? '<div class="completed-banner">' + App.ICONS.check + '<span>恭喜！你已完成本节学习</span></div>' : '') +
      '</div>' +
    '</article>';

  App.renderQuiz(topic);
  App.animateCards('.content-section');
};

// ===================== 渲染：收藏页 =====================
App.renderFavorites = function() {
  var main = App.$('#main-content');
  if (App.state.favorites.length === 0) {
    main.innerHTML = '<div class="empty-state">' +
      '<div class="empty-icon">' + App.ICONS.starOutline + '</div>' +
      '<h2>还没有收藏</h2>' +
      '<p>在学习过程中点击星标按钮，将重要知识点收藏起来</p>' +
      '<button class="btn btn-primary" onclick="App.navigate(\'home\')">去浏览知识库</button>' +
    '</div>';
    return;
  }

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">我的收藏</span>' +
    '</div>' +
    '<div class="section-header"><h1 class="page-title">我的收藏</h1><p class="section-desc">' + App.state.favorites.length + ' 个已收藏的知识点</p></div>' +
    '<div class="topic-list">' +
      App.state.favorites.map(function(id) {
        var t = App.findTopic(id);
        if (!t) return '';
        var cat = App.findCategory(t.categoryId);
        return '<div class="topic-card" onclick="App.navigate(\'topic\',\'' + t.id + '\')">' +
          '<div class="topic-number" style="color:' + cat.color + '">' + App.ICONS.star + '</div>' +
          '<div class="topic-body">' +
            '<h3 class="topic-card-title">' + t.title + '</h3>' +
            '<p class="topic-summary">' + t.summary + '</p>' +
            '<div class="topic-meta">' +
              '<span class="meta-tag" style="color:' + cat.color + '">' + cat.name + '</span>' +
              '<span class="meta-tag level-' + t.level + '">' + t.level + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="topic-actions">' +
            '<button class="icon-btn fav-btn active" onclick="event.stopPropagation();App.toggleFav(\'' + t.id + '\')">' + App.ICONS.star + '</button>' +
            '<div class="topic-go">' + App.ICONS.arrowRight + '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>';

  App.animateCards('.topic-card');
};

// ===================== 渲染：侧边栏 =====================
App.renderSidebar = function() {
  var sidebar = App.$('#sidebar');
  if (!sidebar) return;

  var route;
  try {
    route = App.getHashRoute();
  } catch (e) {
    route = { page: 'home' };
  }

  var doneCount = 0;
  var total = 0;
  try {
    doneCount = Object.values(App.state.progress).filter(function(p) { return p.completed; }).length;
    total = App.flatTopics.length;
  } catch (e) {
    console.error('[renderSidebar] 统计进度失败:', e);
  }

  var pct = total > 0 ? Math.round(doneCount / total * 100) : 0;

  // 构建基本导航（不依赖 MUSIC_THEORY_DATA，确保 data 文件加载失败时仍可导航）
  var basicNav =
    '<div class="nav-section">' +
      '<button class="nav-item ' + (route.page === 'home' ? 'active' : '') + '" onclick="App.navigate(\'home\')">' + App.ICONS.home + '<span>首页</span></button>' +
      '<button class="nav-item ' + (route.page === 'dashboard' ? 'active' : '') + '" onclick="App.navigate(\'dashboard\')">' + App.ICONS.chart + '<span>学习仪表盘</span></button>' +
      '<button class="nav-item ' + (route.page === 'learning-paths' ? 'active' : '') + '" onclick="App.navigate(\'learning-paths\')">' + App.ICONS.map + '<span>学习路径</span></button>' +
      '<button class="nav-item ' + (route.page === 'knowledge-map' ? 'active' : '') + '" onclick="App.navigate(\'knowledge-map\')">' + App.ICONS.grid + '<span>知识图谱</span></button>' +
      '<button class="nav-item ' + (route.page === 'favorites' ? 'active' : '') + '" onclick="App.navigate(\'favorites\')">' + App.ICONS.star + '<span>我的收藏</span>' + (App.state.favorites.length ? '<span class="nav-badge">' + App.state.favorites.length + '</span>' : '') + '</button>' +
    '</div>';

  // 构建分类导航（依赖 MUSIC_THEORY_DATA，失败则跳过）
  var categoriesNav = '';
  try {
    if (typeof MUSIC_THEORY_DATA !== 'undefined' && MUSIC_THEORY_DATA.categories) {
      categoriesNav = MUSIC_THEORY_DATA.categories.map(function(cat) {
        var isActive = route.page === 'category' && route.topicId === cat.id;
        return '<div class="nav-section">' +
          '<div class="nav-section-title" style="color:' + cat.color + '">' + (App.ICONS[cat.icon] || App.ICONS.note) + '<span>' + cat.name + '</span></div>' +
          cat.topics.map(function(t) {
            var isTopicActive = route.page === 'topic' && route.topicId === t.id;
            var isDone = App.state.progress[t.id] && App.state.progress[t.id].completed;
            return '<button class="nav-item nav-sub ' + (isTopicActive ? 'active' : '') + '" onclick="App.navigate(\'topic\',\'' + t.id + '\')">' +
              (isDone ? '<span class="nav-check">' + App.ICONS.check + '</span>' : '<span class="nav-dot" style="background:' + cat.color + '"></span>') +
              '<span>' + t.title + '</span>' +
            '</button>';
          }).join('') +
        '</div>';
      }).join('');
    }
  } catch (e) {
    console.error('[renderSidebar] 分类导航渲染失败:', e);
  }

  var toolsNav =
    '<div class="nav-section">' +
      '<button class="nav-item" onclick="App.openPiano()">' + App.ICONS.piano + '<span>虚拟钢琴</span></button>' +
      '<button class="nav-item" onclick="App.openQuiz(\'random\')">' + App.ICONS.quiz + '<span>随机测验</span></button>' +
    '</div>';

  var aboutNav =
    '<div class="nav-section">' +
      '<button class="nav-item ' + (route.page === 'about' ? 'active' : '') + '" onclick="App.navigate(\'about\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>关于</span></button>' +
      '<button class="nav-item ' + (route.page === 'privacy' ? 'active' : '') + '" onclick="App.navigate(\'privacy\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>隐私政策</span></button>' +
      '<button class="nav-item ' + (route.page === 'terms' ? 'active' : '') + '" onclick="App.navigate(\'terms\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg><span>用户服务协议</span></button>' +
    '</div>';

  sidebar.innerHTML =
    '<div class="sidebar-header">' +
      '<div class="sidebar-logo" onclick="App.navigate(\'home\')">' +
        
        '<span class="logo-text">目录列表</span>' +
      '</div>' +
    '</div>' +
    '<nav class="sidebar-nav">' +
      basicNav +
      categoriesNav +
      toolsNav +
      aboutNav +
    '</nav>' +
    '<div class="sidebar-footer">' +
      '<div class="sidebar-progress">' +
        '<div class="sp-label">总体进度</div>' +
        '<div class="sp-bar"><div class="sp-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="sp-count" id="progress-count">' + doneCount + '/' + total + '</div>' +
      '</div>' +
    '</div>';

  // 更新底部导航 active 状态（失败不影响主内容）
  try {
    var bnItems = App.$$('.bottom-nav-item');
    for (var i = 0; i < bnItems.length; i++) {
      var p = bnItems[i].getAttribute('data-page');
      if (p === route.page || (p === 'home' && (!route.page || route.page === 'home'))) {
        bnItems[i].classList.add('active');
      } else {
        bnItems[i].classList.remove('active');
      }
    }
  } catch (e) {
    console.error('[renderSidebar] 更新底部导航失败:', e);
  }
};

// ===================== 渲染：关于页面 =====================
App.renderAbout = function() {
  var main = App.$('#main-content');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">关于</span>' +
    '</div>' +
    '<div class="about-page">' +
      '<div class="about-header">' +
        '<div class="about-logo">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
        '</div>' +
        '<h1 class="about-title">星漫乐理</h1>' +
        '<p class="about-tagline">音乐乐理知识百科全书</p>' +
        '<span class="about-version">v1.0.0</span>' +
      '</div>' +
      '<div class="about-card">' +
        '<h2 class="about-section-title">开发信息</h2>' +
        '<div class="about-info-list">' +
          '<div class="about-info-row"><span class="about-info-label">开发者</span><span class="about-info-value">不见桃花不见秋</span></div>' +
          '<div class="about-info-row"><span class="about-info-label">开发时间</span><span class="about-info-value">2026年8月10日</span></div>' +
          '<div class="about-info-row"><span class="about-info-label">程序类型</span><span class="about-info-value about-type-web">Web 应用</span><span class="about-info-value about-type-app">Android APP</span></div>' +
          '<div class="about-info-row"><span class="about-info-label">技术栈</span><span class="about-info-value">原生前端</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="about-card">' +
        '<h2 class="about-section-title">功能特性</h2>' +
        '<div class="about-features">' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>15大模块,119个主题</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>随堂测验与随机测验</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>虚拟钢琴(Web Audio)</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>学习进度追踪</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>11个成就系统</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>5条学习路径</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>知识图谱可视化</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>全文搜索(关键词高亮)</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>5套主题切换</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>13个键盘快捷键</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>响应式(APP UI 适配)</div>' +
          '<div class="about-feature-item"><span class="feature-check">✓</span>零依赖,纯原生实现</div>' +
        '</div>' +
      '</div>' +
      
    '</div>';

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===================== 渲染：隐私政策 =====================
App.renderPrivacy = function() {
  var main = App.$('#main-content');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">隐私政策</span>' +
    '</div>' +
    '<div class="legal-page">' +
      '<div class="legal-header">' +
        '<div class="legal-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
        '</div>' +
        '<h1 class="legal-title">隐私政策</h1>' +
        '<p class="legal-updated">最后更新：2026年8月10日 · 版本 v1.0.0</p>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<p>星漫乐理（以下简称"本应用"）由开发者"不见桃花不见秋"独立开发，是一款基于原生前端技术构建的纯本地音乐乐理知识学习工具。我们深知个人信息对您的重要性，本隐私政策旨在向您说明本应用如何处理与您的使用相关的数据。请您在使用本应用前，仔细阅读并充分理解本政策的全部内容。</p>' +
          '<div class="legal-note">核心承诺：本应用为纯前端离线应用，<strong>不连接任何服务器、不上传任何用户数据、不收集任何个人信息</strong>。您的所有学习数据仅保存在您当前使用的设备本地。</div>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">一、我们收集的信息</h2>' +
          '<p>本应用不主动收集、不请求、不传输任何能够单独或与其他信息结合识别您个人身份的信息。具体而言：</p>' +
          '<ul>' +
            '<li>不要求注册账户，不收集用户名、邮箱、手机号等账号信息；</li>' +
            '<li>不采集设备标识符（如 IMEI、IDFA、设备序列号等）；</li>' +
            '<li>不获取地理位置、通讯录、相册、摄像头、麦克风等系统权限；</li>' +
            '<li>不收集网络信息（IP 地址、Wi-Fi 信息等）；</li>' +
            '<li>不进行任何形式的用户行为追踪或画像。</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">二、本地存储的使用</h2>' +
          '<p>为提供完整的学习体验，本应用使用浏览器提供的 localStorage 本地存储能力，将以下数据保存在<strong>您当前设备的浏览器中</strong>：</p>' +
          '<ul>' +
            '<li><strong>学习进度</strong>：记录您在每个主题（共 119 个主题）的阅读完成状态，用于"学习仪表盘"统计与成就解锁；</li>' +
            '<li><strong>收藏列表</strong>：记录您收藏的知识主题，便于后续查阅；</li>' +
            '<li><strong>测验记录</strong>：保存随堂测验与随机测验的答题结果，用于成就判定；</li>' +
            '<li><strong>主题偏好</strong>：记录您选择的界面主题（深色/浅色等 5 套主题之一）；</li>' +
            '<li><strong>学习连续天数</strong>：用于"学习仪表盘"中的连续学习打卡统计。</li>' +
          '</ul>' +
          '<p class="muted">上述数据均以本地文件形式存储于设备，不会通过网络发送给开发者或任何第三方。当您清除浏览器数据、卸载应用或更换设备时，相关数据将被清除且无法恢复。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">三、设备能力调用说明</h2>' +
          '<p>本应用在运行过程中会调用以下浏览器原生能力，但<strong>仅限于实现功能所需的最小范围</strong>，不涉及任何信息外发：</p>' +
          '<div class="legal-sub">1. Web Audio API</div>' +
          '<p>用于"虚拟钢琴"工具的音频播放，将音频信号发送至设备的音频输出设备。音频数据在本地实时生成，不被录制、保存或上传。</p>' +
          '<div class="legal-sub">2. 浏览器存储（localStorage）</div>' +
          '<p>用于保存上文所述的学习进度与偏好设置。在 file:// 协议或隐私模式下，若存储被禁用，应用会自动回退至内存模式运行，功能不受影响。</p>' +
          '<div class="legal-sub">3. 剪贴板（可选）</div>' +
          '<p>仅在您主动点击"复制"相关按钮时使用，用于将内容复制到系统剪贴板，应用不会读取剪贴板中的其他内容。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">四、Cookie 与同类技术</h2>' +
          '<p>本应用<strong>不使用 Cookie</strong>，不使用 Web Beacon（网络信标）、Flash Cookie 等同类跟踪技术。界面主题与学习状态的持久化完全依赖 localStorage，不属于 Cookie 范畴。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">五、第三方服务</h2>' +
          '<p>本应用为<strong>零依赖的纯原生实现</strong>，不集成任何第三方 SDK、统计服务、广告 SDK、推送服务或分析工具。所有功能（包括知识图谱可视化、全文搜索、虚拟钢琴等）均由原生 JavaScript 实现，不向任何第三方服务器发起请求。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">六、未成年人保护</h2>' +
          '<p>本应用面向音乐爱好者与学生群体，内容为音乐乐理知识科普，不包含任何不适合未成年人的内容。由于本应用不收集任何个人信息，不会对未成年人构成隐私风险。若您是未成年人的监护人，发现任何您认为不当的内容，可随时通过本页底部提供的联系方式反馈。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">七、数据安全</h2>' +
          '<p>本应用的数据均存储于设备本地，其安全性取决于您设备与浏览器的安全状况。建议您：</p>' +
          '<ul>' +
            '<li>及时更新操作系统与浏览器至最新版本；</li>' +
            '<li>不在公共设备上保存学习进度，使用后及时清除浏览器数据；</li>' +
            '<li>不将设备借给不可信的第三方使用。</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">八、您的权利</h2>' +
          '<p>由于本应用不收集任何个人信息，您对本地数据拥有完全控制权。您可以随时通过以下方式管理数据：</p>' +
          '<ul>' +
            '<li>在"学习仪表盘"中查看学习进度；</li>' +
            '<li>在"我的收藏"中管理收藏列表；</li>' +
            '<li>通过浏览器设置清除站点数据，即可清除全部本地存储；</li>' +
            '<li>卸载应用或更换设备即可彻底移除所有数据。</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">九、政策更新</h2>' +
          '<p>本隐私政策可能会随应用功能迭代而更新。更新后的政策将通过应用内的"关于"页面或本页面发布，不另行单独通知。建议您定期查阅本页面以了解最新内容。政策更新后，您继续使用本应用即视为同意更新后的政策。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">十、联系我们</h2>' +
          '<p>如您对本隐私政策有任何疑问、意见或建议，可通过以下方式与开发者联系：</p>' +
          '<div class="legal-contact">' +
            '应用名称：星漫乐理<br>' +
            '开发者：不见桃花不见秋<br>' +
            '程序类型：<span class="about-type-web">Web 应用</span><span class="about-type-app">Android APP</span><br>' +
            '技术栈：原生前端（零依赖）<br>' +
            '版本：v1.0.0' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="legal-note">本政策自 2026 年 8 月 10 日起生效并长期有效。</div>' +
    '</div>';

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===================== 渲染：用户服务协议 =====================
App.renderTerms = function() {
  var main = App.$('#main-content');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">用户服务协议</span>' +
    '</div>' +
    '<div class="legal-page">' +
      '<div class="legal-header">' +
        '<div class="legal-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>' +
        '</div>' +
        '<h1 class="legal-title">用户服务协议</h1>' +
        '<p class="legal-updated">最后更新：2026年8月10日 · 版本 v1.0.0</p>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<p>本《用户服务协议》（以下简称"本协议"）由开发者"不见桃花不见秋"（以下简称"我们"）与您（以下简称"用户"）就"星漫乐理"应用（以下简称"本应用"）的使用所订立。请您在使用本应用前仔细阅读本协议全部内容。您开始使用本应用即表示您已充分理解并同意接受本协议的全部条款。</p>' +
          '<div class="legal-note">提示：本应用为纯前端离线学习工具，不涉及付费、账户、网络通信等服务。本协议重点说明各功能的使用规范与责任边界。</div>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">一、服务说明</h2>' +
          '<p>本应用是一款音乐乐理知识学习工具，提供以下服务：</p>' +
          '<ul>' +
            '<li><strong>知识学习</strong>：涵盖 15 大模块、119 个主题的乐理知识体系；</li>' +
            '<li><strong>学习路径</strong>：提供 5 条循序渐进的推荐学习路径；</li>' +
            '<li><strong>知识图谱</strong>：可视化展示知识关联结构；</li>' +
            '<li><strong>互动工具</strong>：虚拟钢琴、乐理测验（随堂与随机）；</li>' +
            '<li><strong>学习管理</strong>：学习进度追踪、收藏管理、学习仪表盘、11 个成就系统；</li>' +
            '<li><strong>辅助功能</strong>：全文搜索（关键词高亮）、5 套主题切换、13 个键盘快捷键。</li>' +
          '</ul>' +
          '<p class="muted">本应用为免费工具，不收取任何使用费用。所有功能均可在离线状态下使用。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">二、使用条件</h2>' +
          '<div class="legal-sub">1. 使用资格</div>' +
          '<p>本应用面向所有音乐爱好者、学生及教师开放。若您为未成年人，请在监护人指导下使用。</p>' +
          '<div class="legal-sub">2. 运行环境</div>' +
          '<p>本应用基于原生 Web 技术构建，支持现代浏览器（Chrome、Edge、Safari、Firefox 等）及 Android 设备。建议使用最新版浏览器以获得最佳体验。</p>' +
          '<div class="legal-sub">3. 无需账户</div>' +
          '<p>本应用不要求注册账户，无需提供任何个人信息即可使用全部功能。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">三、用户行为规范</h2>' +
          '<p>您在使用本应用时应遵守中华人民共和国相关法律法规，并承诺不以任何方式：</p>' +
          '<ul>' +
            '<li>对本应用进行逆向工程、反编译、反汇编，或试图获取源代码；</li>' +
            '<li>修改、改编、翻译本应用，或创作衍生作品；</li>' +
            '<li>将本应用用于任何违法违规、侵犯他人权益或破坏社会秩序的目的；</li>' +
            '<li>利用本应用从事危害国家安全、泄露国家秘密的活动；</li>' +
            '<li>通过技术手段干扰本应用正常运行，或试图突破应用的功能限制；</li>' +
            '<li>将本应用内容以盈利为目的进行复制、传播或商业使用。</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">四、功能使用规范</h2>' +
          '<div class="legal-sub">1. 学习内容</div>' +
          '<p>本应用提供的乐理知识内容仅供学习参考，不构成专业音乐教育意见。如您进行专业音乐学习或考试准备，请以正规教材及专业教师指导为准。</p>' +
          '<div class="legal-sub">2. 虚拟钢琴</div>' +
          '<p>虚拟钢琴基于 Web Audio API 实现，使用时请合理控制设备音量，避免长时间大音量使用对听力造成损害。在公共场合使用时请佩戴耳机，以免影响他人。</p>' +
          '<div class="legal-sub">3. 乐理测验</div>' +
          '<p>测验结果仅用于自我评估，不具有任何认证、考核或证明效力。测验成绩保存在本地，不会与他人比较或公开。</p>' +
          '<div class="legal-sub">4. 学习数据</div>' +
          '<p>学习进度、收藏、成就等数据保存在您的设备本地。因设备故障、浏览器数据清除、卸载应用等原因造成的数据丢失，本应用不承担责任，建议您定期记录重要学习节点。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">五、知识产权</h2>' +
          '<p>本应用的全部内容，包括但不限于：</p>' +
          '<ul>' +
            '<li>乐理知识体系的组织结构与表述方式；</li>' +
            '<li>应用界面设计、图标、配色方案；</li>' +
            '<li>原创的 JavaScript 代码与交互逻辑；</li>' +
            '<li>测验题目与成就系统的设计；</li>' +
          '</ul>' +
          '<p>其知识产权均归开发者"不见桃花不见秋"所有，受相关法律保护。未经书面授权，您不得以任何形式复制、传播、修改或商用上述内容。</p>' +
          '<p class="muted">本应用中涉及的乐理基础知识属于公共领域知识，其知识产权不因被本应用收录而改变。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">六、免责声明</h2>' +
          '<div class="legal-sub">1. 内容准确性</div>' +
          '<p>开发者已尽合理努力确保应用内乐理知识的准确性，但不保证内容绝对无误、完整或适用于所有场景。对于因依赖应用内容而产生的任何后果，开发者不承担责任。</p>' +
          '<div class="legal-sub">2. 服务可用性</div>' +
          '<p>本应用为离线工具，原则上可长期使用。但开发者不保证应用在所有设备、所有浏览器版本上均能完美运行。因设备兼容性、浏览器升级等原因导致的功能异常，开发者将尽力修复但不承担相应责任。</p>' +
          '<div class="legal-sub">3. 数据损失</div>' +
          '<p>因不可抗力、设备故障、用户操作失误或第三方原因导致的本地数据损失，开发者不承担责任。</p>' +
          '<div class="legal-sub">4. 第三方链接</div>' +
          '<p>本应用原则上不包含外部链接。若日后加入外部参考链接，对其内容的准确性、合法性不承担责任。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">七、服务的变更与终止</h2>' +
          '<p>开发者有权根据实际情况对应用功能进行调整、更新或停止维护。由于本应用为离线工具，即使停止后续更新，您已安装的版本仍可继续使用，但相关服务（如内容纠错）将不再提供。</p>' +
          '<p>您可随时通过卸载应用或清除浏览器数据的方式终止使用本应用。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">八、协议修改</h2>' +
          '<p>开发者有权根据需要修改本协议。修改后的协议将通过应用内"关于"页面或本页面发布，不另行单独通知。协议修改后，您继续使用本应用即视为同意修改后的协议。如您不同意修改内容，请停止使用本应用。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">九、法律适用与争议解决</h2>' +
          '<p>本协议的订立、执行与解释均适用中华人民共和国法律。因本协议或本应用使用产生的任何争议，双方应首先友好协商解决；协商不成的，任何一方均可向开发者所在地有管辖权的人民法院提起诉讼。</p>' +
        '</div>' +
      '</div>' +

      '<div class="legal-card">' +
        '<div class="legal-section">' +
          '<h2 class="legal-section-title">十、联系方式</h2>' +
          '<p>如对本协议有任何疑问，可通过以下信息联系开发者：</p>' +
          '<div class="legal-contact">' +
            '应用名称：星漫乐理<br>' +
            '开发者：不见桃花不见秋<br>' +
            '程序类型：<span class="about-type-web">Web 应用</span><span class="about-type-app">Android APP</span><br>' +
            '开发时间：2026年8月10日<br>' +
            '版本：v1.0.0' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="legal-note">本协议自 2026 年 8 月 10 日起生效并长期有效。本协议各条款标题仅为方便阅读，不影响条款实质含义。</div>' +
    '</div>';

  window.scrollTo({ top: 0, behavior: 'smooth' });
};
