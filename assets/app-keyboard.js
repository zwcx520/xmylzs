/**
 * app-keyboard.js
 * 键盘快捷键系统：导航、搜索、主题、钢琴等快捷操作
 */

// ===================== 快捷键定义 =====================
App.KEYBOARD_SHORTCUTS = [
  { keys: ['Ctrl/Cmd', 'K'], desc: '打开搜索', action: 'search' },
  { keys: ['Esc'], desc: '关闭弹窗/搜索', action: 'escape' },
  { keys: ['H'], desc: '回到首页', action: 'home' },
  { keys: ['F'], desc: '查看收藏', action: 'favorites' },
  { keys: ['D'], desc: '打开学习仪表盘', action: 'dashboard' },
  { keys: ['P'], desc: '打开虚拟钢琴', action: 'piano' },
  { keys: ['Q'], desc: '随机测验', action: 'quiz' },
  { keys: ['T'], desc: '切换主题', action: 'theme' },
  { keys: ['S'], desc: '切换侧边栏', action: 'sidebar' },
  { keys: ['?'], desc: '显示快捷键帮助', action: 'help' },
  { keys: ['←'], desc: '上一节', action: 'prev' },
  { keys: ['→'], desc: '下一节', action: 'next' },
  { keys: ['1-9'], desc: '跳转到第N个分类', action: 'category-num' },
];

// ===================== 快捷键处理 =====================
App.handleKeyboard = function(e) {
  // 在输入框中不触发快捷键（除了 Escape 和 Ctrl+K）
  var tag = e.target.tagName;
  var isInput = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;

  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (App.isMobile()) {
      App.openSearch();
    } else {
      var searchInput = App.$('#header-search-input');
      if (searchInput) searchInput.focus();
    }
    return;
  }

  if (e.key === 'Escape') {
    App.closeSearch();
    App.closeHeaderSearch();
    App.closePiano();
    App.closeQuizModal();
    App.closeSidebar();
    return;
  }

  if (isInput) return;

  var key = e.key.toLowerCase();

  switch (key) {
    case 'h':
      e.preventDefault();
      App.navigate('home');
      break;
    case 'f':
      e.preventDefault();
      App.navigate('favorites');
      break;
    case 'd':
      e.preventDefault();
      App.navigate('dashboard');
      break;
    case 'p':
      e.preventDefault();
      App.openPiano();
      break;
    case 'q':
      e.preventDefault();
      App.openQuiz('random');
      break;
    case 't':
      e.preventDefault();
      App.cycleTheme();
      break;
    case 's':
      e.preventDefault();
      App.toggleSidebar();
      break;
    case '?':
      e.preventDefault();
      App.showKeyboardHelp();
      break;
    case 'arrowleft':
      e.preventDefault();
      App.goToAdjacentTopic(-1);
      break;
    case 'arrowright':
      e.preventDefault();
      App.goToAdjacentTopic(1);
      break;
    default:
      // 数字键 1-9 跳转分类
      if (key >= '1' && key <= '9') {
        var idx = parseInt(key) - 1;
        if (idx < MUSIC_THEORY_DATA.categories.length) {
          e.preventDefault();
          App.navigate('category', MUSIC_THEORY_DATA.categories[idx].id);
        }
      }
      break;
  }
};

// ===================== 上一节/下一节导航 =====================
App.goToAdjacentTopic = function(direction) {
  var route = App.getHashRoute();
  if (route.page !== 'topic' || !route.topicId) return;

  var topic = App.findTopic(route.topicId);
  if (!topic) return;

  var cat = App.findCategory(topic.categoryId);
  if (!cat) return;

  var idx = cat.topics.findIndex(function(t) { return t.id === route.topicId; });
  var targetIdx = idx + direction;

  if (targetIdx >= 0 && targetIdx < cat.topics.length) {
    App.navigate('topic', cat.topics[targetIdx].id);
  } else {
    // 跨分类导航
    var catIdx = MUSIC_THEORY_DATA.categories.findIndex(function(c) { return c.id === cat.id; });
    var targetCatIdx = catIdx + direction;
    if (targetCatIdx >= 0 && targetCatIdx < MUSIC_THEORY_DATA.categories.length) {
      var targetCat = MUSIC_THEORY_DATA.categories[targetCatIdx];
      var targetTopic = direction > 0 ? targetCat.topics[0] : targetCat.topics[targetCat.topics.length - 1];
      if (targetTopic) App.navigate('topic', targetTopic.id);
    }
  }
};

// ===================== 快捷键帮助弹窗 =====================
App.showKeyboardHelp = function() {
  var modal = App.$('#quiz-modal');

  var shortcutsHtml = App.KEYBOARD_SHORTCUTS.map(function(s) {
    var keysHtml = s.keys.map(function(k, i) {
      return '<kbd class="kbd">' + k + '</kbd>' + (i < s.keys.length - 1 ? '<span class="kbd-plus">+</span>' : '');
    }).join('');
    return '<div class="shortcut-row">' +
      '<div class="shortcut-keys">' + keysHtml + '</div>' +
      '<div class="shortcut-desc">' + s.desc + '</div>' +
    '</div>';
  }).join('');

  modal.innerHTML =
    '<div class="modal-backdrop" onclick="App.closeQuizModal()"></div>' +
    '<div class="modal-content">' +
      '<div class="modal-header">' +
        '<h2>' + App.ICONS.keyboard + ' 键盘快捷键</h2>' +
        '<button class="icon-btn" onclick="App.closeQuizModal()">' + App.ICONS.close + '</button>' +
      '</div>' +
      '<div style="padding:24px">' +
        '<div class="shortcuts-list">' + shortcutsHtml + '</div>' +
        '<div class="shortcuts-tip">' +
          '<p>' + App.ICONS.lightbulb + ' 提示：在输入框中仅 Ctrl+K 和 Esc 有效，其他快捷键在非输入状态下可用。</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  modal.classList.add('active');
};

// ===================== 注册键盘事件 =====================
App.initKeyboard = function() {
  document.addEventListener('keydown', App.handleKeyboard);
};
