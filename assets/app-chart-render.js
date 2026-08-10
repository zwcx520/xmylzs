/**
 * app-chart-render.js
 * 图表渲染整合模块 — 合并三组映射数据，提供统一的主题图表渲染接口
 * 在 app-charts.js 和 app-chart-maps-*.js 之后加载
 */
(function() {
  'use strict';

  // 合并所有映射组
  var ALL_MAPS = {};
  var groups = [window.MT_CHART_MAP_1, window.MT_CHART_MAP_2, window.MT_CHART_MAP_3];
  for (var g = 0; g < groups.length; g++) {
    if (!groups[g]) continue;
    var keys = Object.keys(groups[g]);
    for (var k = 0; k < keys.length; k++) {
      if (!ALL_MAPS[keys[k]]) {
        ALL_MAPS[keys[k]] = groups[g][keys[k]];
      }
    }
  }

  /**
   * 渲染主题的可视化图解区块
   * @param {string} topicId - 主题 ID
   * @returns {string} HTML 字符串，如果无图表返回空字符串
   */
  function renderTopicCharts(topicId) {
    var charts = ALL_MAPS[topicId];
    if (!charts || !charts.length) return '';

    var html = '<div class="mt-charts-section">' +
      '<div class="mt-charts-header">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);flex-shrink:0">' +
          '<path d="M3 3v18h18"/><path d="M7 16l4-8 4 6 3-4"/>' +
        '</svg>' +
        '<span>可视化图解</span>' +
      '</div>' +
      '<div class="mt-charts-grid">';

    for (var i = 0; i < charts.length; i++) {
      var chart = charts[i];
      var chartHtml = '';
      try {
        chartHtml = chart.render();
        if (!chartHtml) continue;
      } catch (e) {
        console.error('[图表渲染失败] topic=' + topicId + ' chart#' + i, e);
        continue;
      }
      html += '<div class="mt-chart-card">';
      if (chart.title) {
        html += '<div class="mt-chart-card-title">' + escapeHtml(chart.title) + '</div>';
      }
      html += '<div class="mt-chart-card-body">' + chartHtml + '</div>';
      if (chart.desc) {
        html += '<div class="mt-chart-card-desc">' + escapeHtml(chart.desc) + '</div>';
      }
      html += '</div>';
    }

    html += '</div></div>';
    return html;
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 暴露到 App 命名空间（如果 App 已存在）或全局
  if (typeof window.App !== 'undefined') {
    window.App.renderTopicCharts = renderTopicCharts;
  } else {
    window.renderTopicCharts = renderTopicCharts;
  }

  // 统计信息（调试用）
  window.MT_CHART_STATS = {
    totalTopics: Object.keys(ALL_MAPS).length,
    totalCharts: (function() {
      var c = 0;
      var keys = Object.keys(ALL_MAPS);
      for (var i = 0; i < keys.length; i++) c += ALL_MAPS[keys[i]].length;
      return c;
    })()
  };
})();
