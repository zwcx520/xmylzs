/**
 * app-timeline.js
 * 学习路径时间线：可视化学习路径、推荐学习顺序、知识图谱
 */

// ===================== 学习路径定义 =====================
App.LEARNING_PATHS = [
  {
    id: 'beginner',
    name: '零基础入门路径',
    desc: '从认识声音开始，逐步掌握基础乐理',
    color: '#6366f1',
    icon: 'play',
    topics: ['sound-pitch', 'notes-rests', 'rhythm-basics', 'beat-meter', 'tempo-expressions', 'key-signatures', 'intervals', 'scales', 'triads', 'seventh-chords']
  },
  {
    id: 'intermediate',
    name: '进阶和声路径',
    desc: '深入和声学、曲式分析与中级技巧',
    color: '#10b981',
    icon: 'trending',
    topics: ['harmonic-functions', 'chord-progressions', 'secondary-dominants', 'harmonic-rhythm', 'phrase-structure', 'binary-ternary', 'variation-form', 'rondo-form', 'cadences', 'non-harmonic-tones']
  },
  {
    id: 'advanced',
    name: '高级理论路径',
    desc: '爵士和声、对位法与现代作曲技法',
    color: '#ec4899',
    icon: 'crown',
    topics: ['jazz-harmony', 'modulation', 'chromatic-harmony', 'sonata-form', 'counterpoint', 'non-chord-tones', 'pedal-point', 'modern-harmony', 'modern-forms', 'polyrhythm']
  },
  {
    id: 'ear-training',
    name: '练耳视唱路径',
    desc: '系统训练听觉能力与视唱技巧',
    color: '#8b5cf6',
    icon: 'ear',
    topics: ['interval-recognition', 'rhythm-dictation', 'sight-singing', 'chord-recognition', 'melody-dictation', 'perfect-pitch']
  },
  {
    id: 'production',
    name: '音乐制作路径',
    desc: '数字音乐制作与声学基础',
    color: '#f59e0b',
    icon: 'cpu',
    topics: ['daw-basics', 'digital-audio', 'mixing-fundamentals', 'synthesis-basics', 'overtone-series', 'psychoacoustics', 'room-acoustics', 'mastering-basics']
  }
];

// ===================== 渲染学习路径页 =====================
App.renderLearningPaths = function() {
  var main = App.$('#main-content');

  var pathsHtml = App.LEARNING_PATHS.map(function(path) {
    var completedCount = path.topics.filter(function(tid) {
      return App.state.progress[tid] && App.state.progress[tid].completed;
    }).length;
    var pct = path.topics.length > 0 ? Math.round((completedCount / path.topics.length) * 100) : 0;
    var firstTopic = App.findTopic(path.topics[0]);

    var timelineItems = path.topics.map(function(tid, i) {
      var t = App.findTopic(tid);
      if (!t) return '';
      var isDone = App.state.progress[tid] && App.state.progress[tid].completed;
      var isCurrent = !isDone && path.topics.slice(0, i).every(function(prevId) {
        return App.state.progress[prevId] && App.state.progress[prevId].completed;
      });
      return '<div class="timeline-item ' + (isDone ? 'done' : '') + ' ' + (isCurrent ? 'current' : '') + '" onclick="App.navigate(\'topic\',\'' + tid + '\')">' +
        '<div class="timeline-dot" style="background:' + (isDone ? path.color : 'var(--bg3)') + '; border-color:' + path.color + '">' +
          (isDone ? App.ICONS.check : '<span>' + (i + 1) + '</span>') +
        '</div>' +
        '<div class="timeline-content">' +
          '<div class="timeline-title">' + t.title + '</div>' +
          '<div class="timeline-meta">' +
            '<span class="meta-tag level-' + t.level + '">' + t.level + '</span>' +
            '<span class="meta-tag">' + App.ICONS.clock + '<span>' + t.readTime + '</span></span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="learning-path-card" style="--path-color:' + path.color + '">' +
      '<div class="path-header">' +
        '<div class="path-icon" style="background:' + path.color + '20; color:' + path.color + '">' + (App.ICONS[path.icon] || App.ICONS.map) + '</div>' +
        '<div class="path-info">' +
          '<h3 class="path-name">' + path.name + '</h3>' +
          '<p class="path-desc">' + path.desc + '</p>' +
        '</div>' +
        '<div class="path-progress">' +
          '<div class="path-pct">' + pct + '%</div>' +
          '<div class="path-count">' + completedCount + '/' + path.topics.length + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="path-bar"><div class="path-bar-fill" style="width:' + pct + '%; background:' + path.color + '"></div></div>' +
      (firstTopic && pct === 0 ?
        '<button class="btn btn-primary btn-sm path-start-btn" onclick="App.navigate(\'topic\',\'' + firstTopic.id + '\')">' + App.ICONS.play + '开始此路径</button>'
      : '') +
      '<div class="timeline">' + timelineItems + '</div>' +
    '</div>';
  }).join('');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">学习路径</span>' +
    '</div>' +
    '<div class="section-header">' +
      '<h1 class="page-title">' + App.ICONS.map + ' 学习路径</h1>' +
      '<p class="section-desc">按推荐顺序系统学习，循序渐进掌握乐理知识</p>' +
    '</div>' +
    '<div class="learning-paths">' + pathsHtml + '</div>';

  App.animateCards('.learning-path-card');
};

// ===================== 知识图谱数据 =====================
App.getKnowledgeMap = function() {
  var nodes = [];
  var links = [];

  MUSIC_THEORY_DATA.categories.forEach(function(cat, ci) {
    cat.topics.forEach(function(topic, ti) {
      nodes.push({
        id: topic.id,
        label: topic.title,
        category: cat.id,
        catName: cat.name,
        color: cat.color,
        level: topic.level,
        completed: App.state.progress[topic.id] && App.state.progress[topic.id].completed,
        index: ti
      });
      // 同分类内前后关联
      if (ti > 0) {
        links.push({ source: cat.topics[ti - 1].id, target: topic.id });
      }
    });
  });

  // 跨分类关联（基础 -> 中级 -> 高级）
  var crossLinks = [
    { from: 'scales', to: 'modes' },
    { from: 'triads', to: 'seventh-chords' },
    { from: 'seventh-chords', to: 'jazz-harmony' },
    { from: 'intervals', to: 'interval-recognition' },
    { from: 'chord-progressions', to: 'modulation' },
    { from: 'harmonic-functions', to: 'harmony-analysis' },
    { from: 'rhythm-basics', to: 'syncopation' },
    { from: 'syncopation', to: 'polyrhythm' },
    { from: 'overtone-series', to: 'tuning-systems' },
    { from: 'phrase-structure', to: 'binary-ternary' },
    { from: 'binary-ternary', to: 'sonata-form' },
    { from: 'digital-audio', to: 'mixing-fundamentals' }
  ];

  crossLinks.forEach(function(cl) {
    if (App.findTopic(cl.from) && App.findTopic(cl.to)) {
      links.push({ source: cl.from, target: cl.to, cross: true });
    }
  });

  return { nodes: nodes, links: links };
};

// ===================== 渲染知识图谱页 =====================
App.renderKnowledgeMap = function() {
  var main = App.$('#main-content');
  var map = App.getKnowledgeMap();

  // 按分类分组渲染
  var categoriesHtml = MUSIC_THEORY_DATA.categories.map(function(cat) {
    var catTopics = map.nodes.filter(function(n) { return n.category === cat.id; });
    var catDone = catTopics.filter(function(n) { return n.completed; }).length;
    var catPct = catTopics.length > 0 ? Math.round((catDone / catTopics.length) * 100) : 0;

    return '<div class="map-category" style="--cat-color:' + cat.color + '">' +
      '<div class="map-cat-header">' +
        '<span class="map-cat-icon" style="background:' + cat.color + '20; color:' + cat.color + '">' + (App.ICONS[cat.icon] || App.ICONS.note) + '</span>' +
        '<span class="map-cat-name">' + cat.name + '</span>' +
        '<span class="map-cat-pct">' + catPct + '%</span>' +
      '</div>' +
      '<div class="map-cat-bar"><div class="map-cat-fill" style="width:' + catPct + '%; background:' + cat.color + '"></div></div>' +
      '<div class="map-nodes">' +
        catTopics.map(function(n, i) {
          return '<div class="map-node ' + (n.completed ? 'done' : '') + '" onclick="App.navigate(\'topic\',\'' + n.id + '\')" title="' + n.label + '">' +
            '<div class="map-node-dot" style="border-color:' + cat.color + (n.completed ? '; background:' + cat.color : '') + '">' +
              (n.completed ? App.ICONS.check : '<span>' + (i + 1) + '</span>') +
            '</div>' +
            '<div class="map-node-label">' + n.label + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">知识图谱</span>' +
    '</div>' +
    '<div class="section-header">' +
      '<h1 class="page-title">' + App.ICONS.grid + ' 知识图谱</h1>' +
      '<p class="section-desc">' + map.nodes.length + ' 个知识点 · ' + map.links.length + ' 条关联 · 可视化知识结构</p>' +
    '</div>' +
    '<div class="knowledge-map">' + categoriesHtml + '</div>';

  App.animateCards('.map-category');
};

// ===================== 推荐下一个学习主题 =====================
App.getRecommendedTopic = function() {
  // 优先推荐未完成的入门级主题
  var beginner = App.flatTopics.filter(function(t) {
    return t.level === '入门' && !(App.state.progress[t.id] && App.state.progress[t.id].completed);
  });
  if (beginner.length > 0) return beginner[0];

  // 然后推荐未完成的中级主题
  var intermediate = App.flatTopics.filter(function(t) {
    return t.level === '中级' && !(App.state.progress[t.id] && App.state.progress[t.id].completed);
  });
  if (intermediate.length > 0) return intermediate[0];

  // 最后推荐未完成的高级主题
  var advanced = App.flatTopics.filter(function(t) {
    return t.level === '高级' && !(App.state.progress[t.id] && App.state.progress[t.id].completed);
  });
  if (advanced.length > 0) return advanced[0];

  return null;
};
