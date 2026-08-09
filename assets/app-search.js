/**
 * app-search.js
 * 全站搜索功能
 */

// 手机端全屏搜索
App.openSearch = function() {
  App.$('#search-overlay').classList.add('active');
  setTimeout(function() { App.$('#search-input').focus(); }, 100);
};

App.closeSearch = function() {
  App.$('#search-overlay').classList.remove('active');
  App.$('#search-input').value = '';
  App.$('#search-results').innerHTML = '';
};

// 手机端点击 header 搜索区域 → 打开全屏搜索
App.handleSearchClick = function(e) {
  if (App.isMobile()) {
    if (e) e.preventDefault();
    App.openSearch();
  }
};

// 关键词高亮
App.highlightMatch = function(text, query) {
  if (!query || !query.trim()) return text;
  var escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
};

// 桌面端 header 输入框实时搜索
App.handleHeaderSearch = function(query) {
  var dropdown = App.$('#search-dropdown');
  if (!dropdown) return;

  if (!query.trim()) {
    dropdown.classList.remove('show');
    dropdown.innerHTML = '';
    return;
  }

  var q = query.toLowerCase();
  var matches = App.flatTopics.filter(function(t) {
    return t.title.toLowerCase().indexOf(q) >= 0 ||
      t.summary.toLowerCase().indexOf(q) >= 0 ||
      t.sections.some(function(s) {
        return s.heading.toLowerCase().indexOf(q) >= 0 || s.content.toLowerCase().indexOf(q) >= 0;
      }) ||
      t.keyPoints.some(function(p) { return p.toLowerCase().indexOf(q) >= 0; });
  });

  if (matches.length === 0) {
    dropdown.innerHTML = '<div class="search-empty">没有找到相关内容，试试其他关键词？</div>';
    dropdown.classList.add('show');
    return;
  }

  dropdown.innerHTML = matches.slice(0, 20).map(function(t) {
    var cat = App.findCategory(t.categoryId);
    return '<div class="search-result-item" onclick="App.navigate(\'topic\',\'' + t.id + '\');App.closeHeaderSearch()">' +
      '<div class="sr-cat" style="color:' + cat.color + '">' + cat.name + '</div>' +
      '<h4 class="sr-title">' + App.highlightMatch(t.title, q) + '</h4>' +
      '<p class="sr-summary">' + App.highlightMatch(t.summary, q) + '</p>' +
    '</div>';
  }).join('');
  dropdown.classList.add('show');
};

// 关闭桌面端下拉搜索
App.closeHeaderSearch = function() {
  var dropdown = App.$('#search-dropdown');
  if (dropdown) dropdown.classList.remove('show');
  var input = App.$('#header-search-input');
  if (input) input.value = '';
  // 恢复焦点到 body
  if (document.activeElement && document.activeElement.id === 'header-search-input') {
    document.activeElement.blur();
  }
};

// 手机端全屏搜索（带高亮）
App.performSearch = function(query) {
  var results = App.$('#search-results');
  if (!query.trim()) {
    results.innerHTML = '';
    return;
  }

  var q = query.toLowerCase();
  var matches = App.flatTopics.filter(function(t) {
    return t.title.toLowerCase().indexOf(q) >= 0 ||
      t.summary.toLowerCase().indexOf(q) >= 0 ||
      t.sections.some(function(s) {
        return s.heading.toLowerCase().indexOf(q) >= 0 || s.content.toLowerCase().indexOf(q) >= 0;
      }) ||
      t.keyPoints.some(function(p) { return p.toLowerCase().indexOf(q) >= 0; });
  });

  if (matches.length === 0) {
    results.innerHTML = '<div class="search-empty">没有找到相关内容，试试其他关键词？</div>';
    return;
  }

  results.innerHTML = matches.map(function(t) {
    var cat = App.findCategory(t.categoryId);
    return '<div class="search-result-item" onclick="App.navigate(\'topic\',\'' + t.id + '\');App.closeSearch()">' +
      '<div class="sr-cat" style="color:' + cat.color + '">' + cat.name + '</div>' +
      '<h4 class="sr-title">' + App.highlightMatch(t.title, q) + '</h4>' +
      '<p class="sr-summary">' + App.highlightMatch(t.summary, q) + '</p>' +
    '</div>';
  }).join('');
};
