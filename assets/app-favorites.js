/**
 * app-favorites.js
 * 增强收藏管理：收藏分组、导出/导入、批量操作
 */

// ===================== 收藏分组管理 =====================
App.getCollections = function() {
  return App.storage.getJSON('mt-collections', []);
};

App.saveCollections = function(collections) {
  App.storage.setJSON('mt-collections', collections);
};

App.createCollection = function(name) {
  var collections = App.getCollections();
  var id = 'col-' + Date.now();
  collections.push({ id: id, name: name, items: [], createdAt: Date.now() });
  App.saveCollections(collections);
  App.showToast('已创建分组：' + name);
  return id;
};

App.deleteCollection = function(id) {
  var collections = App.getCollections().filter(function(c) { return c.id !== id; });
  App.saveCollections(collections);
  App.showToast('分组已删除');
};

App.addToCollection = function(colId, topicId) {
  var collections = App.getCollections();
  var col = collections.find(function(c) { return c.id === colId; });
  if (col && col.items.indexOf(topicId) === -1) {
    col.items.push(topicId);
    App.saveCollections(collections);
    App.showToast('已加入分组：' + col.name);
  }
};

App.removeFromCollection = function(colId, topicId) {
  var collections = App.getCollections();
  var col = collections.find(function(c) { return c.id === colId; });
  if (col) {
    col.items = col.items.filter(function(t) { return t !== topicId; });
    App.saveCollections(collections);
  }
};

// ===================== 收藏夹渲染（增强版） =====================
App.renderFavoritesEnhanced = function() {
  var main = App.$('#main-content');
  var collections = App.getCollections();
  var favTopics = App.state.favorites.map(function(id) { return App.findTopic(id); }).filter(function(t) { return t; });

  if (App.state.favorites.length === 0 && collections.length === 0) {
    main.innerHTML = '<div class="empty-state">' +
      '<div class="empty-icon">' + App.ICONS.starOutline + '</div>' +
      '<h2>还没有收藏</h2>' +
      '<p>在学习过程中点击星标按钮，将重要知识点收藏起来</p>' +
      '<button class="btn btn-primary" onclick="App.navigate(\'home\')">去浏览知识库</button>' +
    '</div>';
    return;
  }

  // 按分类分组统计
  var byCat = {};
  favTopics.forEach(function(t) {
    if (!byCat[t.categoryId]) byCat[t.categoryId] = [];
    byCat[t.categoryId].push(t);
  });

  var groupedHtml = Object.keys(byCat).map(function(catId) {
    var cat = App.findCategory(catId);
    if (!cat) return '';
    return '<div class="fav-group">' +
      '<div class="fav-group-head">' +
        '<span class="fav-group-icon" style="color:' + cat.color + '">' + (App.ICONS[cat.icon] || App.ICONS.note) + '</span>' +
        '<span class="fav-group-name">' + cat.name + '</span>' +
        '<span class="fav-group-count">' + byCat[catId].length + ' 个</span>' +
      '</div>' +
      '<div class="topic-list">' +
        byCat[catId].map(function(t) {
          return '<div class="topic-card" onclick="App.navigate(\'topic\',\'' + t.id + '\')">' +
            '<div class="topic-number" style="color:' + cat.color + '">' + App.ICONS.star + '</div>' +
            '<div class="topic-body">' +
              '<h3 class="topic-card-title">' + t.title + '</h3>' +
              '<p class="topic-summary">' + t.summary + '</p>' +
              '<div class="topic-meta">' +
                '<span class="meta-tag level-' + t.level + '">' + t.level + '</span>' +
                '<span class="meta-tag">' + App.ICONS.clock + '<span>' + t.readTime + '</span></span>' +
              '</div>' +
            '</div>' +
            '<div class="topic-actions">' +
              '<button class="icon-btn fav-btn active" onclick="event.stopPropagation();App.toggleFav(\'' + t.id + '\')">' + App.ICONS.star + '</button>' +
              '<div class="topic-go">' + App.ICONS.arrowRight + '</div>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');

  // 分组列表
  var collectionsHtml = collections.length > 0 ?
    '<div class="section-header" style="margin-top:2rem">' +
      '<h2 class="section-title">自定义分组</h2>' +
    '</div>' +
    '<div class="collections-grid">' +
    collections.map(function(col) {
      return '<div class="collection-card">' +
        '<div class="collection-head">' +
          '<h3 class="collection-name">' + col.name + '</h3>' +
          '<button class="icon-btn" onclick="App.deleteCollection(\'' + col.id + '\')">' + App.ICONS.close + '</button>' +
        '</div>' +
        '<p class="collection-count">' + col.items.length + ' 个知识点</p>' +
        (col.items.length > 0 ?
          '<div class="collection-items">' +
          col.items.slice(0, 5).map(function(tid) {
            var t = App.findTopic(tid);
            if (!t) return '';
            return '<div class="collection-item" onclick="App.navigate(\'topic\',\'' + t.id + '\')">' +
              '<span class="ci-dot"></span><span>' + t.title + '</span>' +
            '</div>';
          }).join('') +
          (col.items.length > 5 ? '<div class="collection-more">+' + (col.items.length - 5) + ' 更多</div>' : '') +
          '</div>'
        : '<p class="collection-empty">暂无内容</p>') +
      '</div>';
    }).join('') +
    '</div>' : '';

  main.innerHTML =
    '<div class="breadcrumb">' +
      '<a onclick="App.navigate(\'home\')" class="crumb-link">首页</a><span class="crumb-sep">/</span>' +
      '<span class="crumb-current">我的收藏</span>' +
    '</div>' +
    '<div class="section-header">' +
      '<div>' +
        '<h1 class="page-title">我的收藏</h1>' +
        '<p class="section-desc">' + favTopics.length + ' 个已收藏 · ' + collections.length + ' 个自定义分组</p>' +
      '</div>' +
      '<div class="fav-actions">' +
        '<button class="btn btn-glass btn-sm" onclick="App.openCollectionModal()">' + App.ICONS.star + '新建分组</button>' +
        '<button class="btn btn-glass btn-sm" onclick="App.exportFavorites()">' + App.ICONS.download + '导出</button>' +
        '<button class="btn btn-glass btn-sm" onclick="App.importFavorites()">' + App.ICONS.upload + '导入</button>' +
      '</div>' +
    '</div>' +
    groupedHtml +
    collectionsHtml;

  App.animateCards('.topic-card, .collection-card');
};

// ===================== 创建分组弹窗 =====================
App.openCollectionModal = function() {
  var modal = App.$('#quiz-modal');
  modal.innerHTML =
    '<div class="modal-backdrop" onclick="App.closeQuizModal()"></div>' +
    '<div class="modal-content">' +
      '<div class="modal-header">' +
        '<h2>' + App.ICONS.star + ' 新建收藏分组</h2>' +
        '<button class="icon-btn" onclick="App.closeQuizModal()">' + App.ICONS.close + '</button>' +
      '</div>' +
      '<div style="padding:24px">' +
        '<input type="text" id="collection-name-input" class="search-input" placeholder="输入分组名称（如：考前复习）" style="width:100%;margin-bottom:16px">' +
        '<button class="btn btn-primary" style="width:100%" onclick="App.confirmCreateCollection()">创建分组</button>' +
      '</div>' +
    '</div>';
  modal.classList.add('active');
  setTimeout(function() { var inp = App.$('#collection-name-input'); if (inp) inp.focus(); }, 100);
};

App.confirmCreateCollection = function() {
  var name = App.$('#collection-name-input').value.trim();
  if (!name) { App.showToast('请输入分组名称'); return; }
  App.createCollection(name);
  App.closeQuizModal();
  App.renderFavoritesEnhanced();
};

// ===================== 导出/导入 =====================
App.exportFavorites = function() {
  var data = {
    favorites: App.state.favorites,
    collections: App.getCollections(),
    progress: App.state.progress,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'music-theory-export-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  App.showToast('已导出收藏与进度数据');
};

App.importFavorites = function() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (data.favorites) {
          data.favorites.forEach(function(id) {
            if (App.state.favorites.indexOf(id) === -1) App.state.favorites.push(id);
          });
          App.storage.setJSON('mt-favorites', App.state.favorites);
        }
        if (data.collections) {
          var existing = App.getCollections();
          data.collections.forEach(function(col) {
            if (!existing.find(function(c) { return c.id === col.id; })) existing.push(col);
          });
          App.saveCollections(existing);
        }
        if (data.progress) {
          Object.keys(data.progress).forEach(function(k) {
            if (!App.state.progress[k]) App.state.progress[k] = data.progress[k];
          });
          App.storage.setJSON('mt-progress', App.state.progress);
        }
        App.showToast('数据导入成功');
        App.renderSidebar();
        App.renderFavoritesEnhanced();
      } catch (err) {
        App.showToast('导入失败：文件格式错误');
      }
    };
    reader.readAsText(file);
  };
  input.click();
};
