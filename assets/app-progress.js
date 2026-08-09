/**
 * app-progress.js
 * 增强进度管理：成就系统、学习统计、学习连续天数、仪表盘渲染
 */

// ===================== 成就定义 =====================
App.ACHIEVEMENTS = [
  { id: 'first-step', name: '初次迈步', desc: '完成第一个知识点', icon: 'play', threshold: 1, color: '#6366f1' },
  { id: 'ten-topics', name: '勤奋学习', desc: '完成10个知识点', icon: 'book', threshold: 10, color: '#10b981' },
  { id: 'quarter-done', name: '四分之一', desc: '完成25%的知识点', icon: 'trending', threshold: 0, color: '#f59e0b', special: 'quarter' },
  { id: 'half-done', name: '过半旅程', desc: '完成50%的知识点', icon: 'zap', threshold: 0, color: '#ec4899', special: 'half' },
  { id: 'all-basics', name: '基础大师', desc: '完成基础乐理全部主题', icon: 'note', threshold: 0, color: '#6366f1', special: 'category', catId: 'basics' },
  { id: 'all-harmony', name: '和声专家', desc: '完成和声学全部主题', icon: 'layers', threshold: 0, color: '#10b981', special: 'category', catId: 'harmony' },
  { id: 'streak-3', name: '连续三天', desc: '连续3天学习', icon: 'zap', threshold: 3, color: '#f59e0b', special: 'streak' },
  { id: 'streak-7', name: '一周坚持', desc: '连续7天学习', icon: 'trophy', threshold: 7, color: '#ec4899', special: 'streak' },
  { id: 'quiz-master', name: '测验达人', desc: '答对50道测验题', icon: 'quiz', threshold: 50, color: '#8b5cf6', special: 'quiz-correct' },
  { id: 'collector', name: '收藏家', desc: '收藏10个知识点', icon: 'star', threshold: 10, color: '#f59e0b', special: 'favorites' },
  { id: 'all-done', name: '乐理大师', desc: '完成全部知识点', icon: 'crown', threshold: 0, color: '#ec4899', special: 'all' },
];

// ===================== 学习记录存储 =====================
App.getStudyLog = function() {
  return App.storage.getJSON('mt-study-log', {dates:[],quizCorrect:0,lastStudyDate:null});
};

App.saveStudyLog = function(log) {
  App.storage.setJSON('mt-study-log', log);
};

App.recordStudyDay = function() {
  var log = App.getStudyLog();
  var today = new Date().toISOString().slice(0, 10);
  if (log.dates.indexOf(today) === -1) {
    log.dates.push(today);
    log.lastStudyDate = today;
    App.saveStudyLog(log);
    App.checkAchievements();
  }
};

App.recordQuizCorrect = function() {
  var log = App.getStudyLog();
  log.quizCorrect = (log.quizCorrect || 0) + 1;
  App.saveStudyLog(log);
  App.checkAchievements();
};

// ===================== 连续学习天数 =====================
App.getStreakDays = function() {
  var log = App.getStudyLog();
  if (!log.dates || log.dates.length === 0) return 0;
  var dates = log.dates.slice().sort();
  var today = new Date().toISOString().slice(0, 10);
  var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // 如果今天或昨天没有学习记录，连续天数为0
  if (dates.indexOf(today) === -1 && dates.indexOf(yesterday) === -1) return 0;

  var streak = 0;
  var checkDate = dates.indexOf(today) !== -1 ? today : yesterday;
  while (dates.indexOf(checkDate) !== -1) {
    streak++;
    var d = new Date(checkDate);
    d.setDate(d.getDate() - 1);
    checkDate = d.toISOString().slice(0, 10);
  }
  return streak;
};

// ===================== 成就检查 =====================
App.getUnlockedAchievements = function() {
  return App.storage.getJSON('mt-achievements', []);
};

App.unlockAchievement = function(id) {
  var unlocked = App.getUnlockedAchievements();
  if (unlocked.indexOf(id) !== -1) return false;
  unlocked.push(id);
  App.storage.setJSON('mt-achievements', unlocked);
  return true;
};

App.checkAchievements = function() {
  var completed = Object.values(App.state.progress).filter(function(p) { return p.completed; }).length;
  var total = App.flatTopics.length;
  var log = App.getStudyLog();
  var streak = App.getStreakDays();
  var favCount = App.state.favorites.length;
  var newlyUnlocked = [];

  App.ACHIEVEMENTS.forEach(function(ach) {
    var shouldUnlock = false;
    if (ach.special === 'quarter' && total > 0 && completed >= total * 0.25) shouldUnlock = true;
    else if (ach.special === 'half' && total > 0 && completed >= total * 0.5) shouldUnlock = true;
    else if (ach.special === 'all' && total > 0 && completed >= total) shouldUnlock = true;
    else if (ach.special === 'category' && ach.catId) {
      var cat = App.findCategory(ach.catId);
      if (cat) {
        var catDone = cat.topics.filter(function(t) { return App.state.progress[t.id] && App.state.progress[t.id].completed; }).length;
        if (catDone >= cat.topics.length) shouldUnlock = true;
      }
    }
    else if (ach.special === 'streak' && streak >= ach.threshold) shouldUnlock = true;
    else if (ach.special === 'quiz-correct' && (log.quizCorrect || 0) >= ach.threshold) shouldUnlock = true;
    else if (ach.special === 'favorites' && favCount >= ach.threshold) shouldUnlock = true;
    else if (!ach.special && completed >= ach.threshold) shouldUnlock = true;

    if (shouldUnlock) {
      if (App.unlockAchievement(ach.id)) {
        newlyUnlocked.push(ach);
      }
    }
  });

  newlyUnlocked.forEach(function(ach, i) {
    setTimeout(function() {
      App.showToast(App.ICONS.trophy + ' 成就解锁：' + ach.name + ' — ' + ach.desc);
    }, i * 1500);
  });
};

// ===================== 进度统计 =====================
App.getProgressStats = function() {
  var completed = Object.values(App.state.progress).filter(function(p) { return p.completed; }).length;
  var total = App.flatTopics.length;
  var pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  var log = App.getStudyLog();
  var streak = App.getStreakDays();
  var achievements = App.getUnlockedAchievements();

  // 按分类统计
  var byCategory = MUSIC_THEORY_DATA.categories.map(function(cat) {
    var done = cat.topics.filter(function(t) { return App.state.progress[t.id] && App.state.progress[t.id].completed; }).length;
    return {
      id: cat.id,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      done: done,
      total: cat.topics.length,
      pct: cat.topics.length > 0 ? Math.round((done / cat.topics.length) * 100) : 0
    };
  });

  // 按难度统计
  var byLevel = { '入门': { done: 0, total: 0 }, '中级': { done: 0, total: 0 }, '高级': { done: 0, total: 0 } };
  App.flatTopics.forEach(function(t) {
    if (byLevel[t.level]) {
      byLevel[t.level].total++;
      if (App.state.progress[t.id] && App.state.progress[t.id].completed) byLevel[t.level].done++;
    }
  });

  return {
    completed: completed,
    total: total,
    pct: pct,
    streak: streak,
    studyDays: log.dates ? log.dates.length : 0,
    quizCorrect: log.quizCorrect || 0,
    achievements: achievements,
    achievementsTotal: App.ACHIEVEMENTS.length,
    byCategory: byCategory,
    byLevel: byLevel,
    favorites: App.state.favorites.length
  };
};

// ===================== 渲染：学习仪表盘 =====================
App.renderDashboard = function() {
  var main = App.$('#main-content');
  var stats = App.getProgressStats();

  var levelBars = Object.keys(stats.byLevel).map(function(level) {
    var d = stats.byLevel[level];
    var pct = d.total > 0 ? Math.round((d.done / d.total) * 100) : 0;
    return '<div class="level-stat">' +
      '<div class="level-stat-head"><span class="level-tag level-' + level + '">' + level + '</span><span>' + d.done + '/' + d.total + '</span></div>' +
      '<div class="level-bar"><div class="level-bar-fill" style="width:' + pct + '%"></div></div>' +
    '</div>';
  }).join('');

  var catBars = stats.byCategory.map(function(c) {
    return '<div class="cat-progress-item" onclick="App.navigate(\'category\',\'' + c.id + '\')">' +
      '<div class="cat-progress-head">' +
        '<span class="cat-progress-icon" style="color:' + c.color + '">' + (App.ICONS[c.icon] || App.ICONS.note) + '</span>' +
        '<span class="cat-progress-name">' + c.name + '</span>' +
        '<span class="cat-progress-pct">' + c.pct + '%</span>' +
      '</div>' +
      '<div class="cat-progress-bar"><div class="cat-progress-fill" style="width:' + c.pct + '%; background:' + c.color + '"></div></div>' +
      '<div class="cat-progress-count">' + c.done + '/' + c.total + ' 已完成</div>' +
    '</div>';
  }).join('');

  var achievementsHtml = App.ACHIEVEMENTS.map(function(ach) {
    var unlocked = stats.achievements.indexOf(ach.id) !== -1;
    return '<div class="achievement-card ' + (unlocked ? 'unlocked' : 'locked') + '" style="--ach-color:' + ach.color + '">' +
      '<div class="ach-icon" style="background:' + ach.color + '20; color:' + ach.color + '">' + (App.ICONS[ach.icon] || App.ICONS.trophy) + '</div>' +
      '<div class="ach-info"><div class="ach-name">' + ach.name + '</div><div class="ach-desc">' + ach.desc + '</div></div>' +
      (unlocked ? '<div class="ach-badge">' + App.ICONS.check + '</div>' : '<div class="ach-lock">未解锁</div>') +
    '</div>';
  }).join('');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">学习仪表盘</span>' +
    '</div>' +
    '<div class="section-header"><h1 class="page-title">学习仪表盘</h1><p class="section-desc">追踪你的学习进度与成就</p></div>' +
    '<div class="dashboard-grid">' +
      '<div class="dash-card dash-stat">' +
        '<div class="dash-stat-icon" style="color:#6366f1">' + App.ICONS.check + '</div>' +
        '<div class="dash-stat-num">' + stats.completed + '/' + stats.total + '</div>' +
        '<div class="dash-stat-label">已完成知识点</div>' +
        '<div class="dash-stat-bar"><div class="dash-stat-fill" style="width:' + stats.pct + '%"></div></div>' +
        '<div class="dash-stat-pct">' + stats.pct + '%</div>' +
      '</div>' +
      '<div class="dash-card dash-stat">' +
        '<div class="dash-stat-icon" style="color:#f59e0b">' + App.ICONS.zap + '</div>' +
        '<div class="dash-stat-num">' + stats.streak + '</div>' +
        '<div class="dash-stat-label">连续学习天数</div>' +
        '<div class="dash-stat-sub">累计学习 ' + stats.studyDays + ' 天</div>' +
      '</div>' +
      '<div class="dash-card dash-stat">' +
        '<div class="dash-stat-icon" style="color:#ec4899">' + App.ICONS.trophy + '</div>' +
        '<div class="dash-stat-num">' + stats.achievements.length + '/' + stats.achievementsTotal + '</div>' +
        '<div class="dash-stat-label">已解锁成就</div>' +
        '<div class="dash-stat-sub">继续学习解锁更多</div>' +
      '</div>' +
      '<div class="dash-card dash-stat">' +
        '<div class="dash-stat-icon" style="color:#10b981">' + App.ICONS.quiz + '</div>' +
        '<div class="dash-stat-num">' + stats.quizCorrect + '</div>' +
        '<div class="dash-stat-label">答对测验题数</div>' +
        '<div class="dash-stat-sub">收藏 ' + stats.favorites + ' 个知识点</div>' +
      '</div>' +
    '</div>' +
    '<div class="dash-two-col">' +
      '<div class="dash-card">' +
        '<h3 class="dash-card-title">' + App.ICONS.chart + ' 按难度分布</h3>' +
        '<div class="level-stats">' + levelBars + '</div>' +
      '</div>' +
      '<div class="dash-card">' +
        '<h3 class="dash-card-title">' + App.ICONS.trending + ' 按模块进度</h3>' +
        '<div class="cat-progress-list">' + catBars + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="section-header" style="margin-top:2rem">' +
      '<h2 class="section-title">' + App.ICONS.trophy + ' 成就墙</h2>' +
      '<p class="section-desc">已解锁 ' + stats.achievements.length + '/' + stats.achievementsTotal + ' 个成就</p>' +
    '</div>' +
    '<div class="achievements-grid">' + achievementsHtml + '</div>';

  App.animateCards('.dash-card, .achievement-card');
};

// ===================== 进度重置 =====================
App.resetProgress = function() {
  if (!confirm('确定要重置所有学习进度吗？此操作不可撤销。')) return;
  App.state.progress = {};
  App.state.favorites = [];
  App.storage.remove('mt-progress');
  App.storage.remove('mt-favorites');
  App.storage.remove('mt-study-log');
  App.storage.remove('mt-achievements');
  App.showToast('学习进度已重置');
  App.renderSidebar();
  App.navigate('home');
};
