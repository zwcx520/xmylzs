/**
 * app-quiz.js
 * 测验功能：随堂测验 + 随机测验
 */

// ===================== 随堂测验 =====================
App.renderQuiz = function(topic) {
  var container = App.$('#quiz-container');
  if (!container) return;

  App.state.quizResults = {};

  container.innerHTML = topic.quiz.map(function(q, qi) {
    return '<div class="quiz-card" data-qi="' + qi + '">' +
      '<p class="quiz-q">Q' + (qi+1) + '. ' + q.q + '</p>' +
      '<div class="quiz-options">' +
        q.options.map(function(opt, oi) {
          return '<button class="quiz-opt" data-oi="' + oi + '" onclick="App.answerQuiz(' + qi + ', ' + oi + ')">' +
            '<span class="opt-letter">' + String.fromCharCode(65+oi) + '</span>' +
            '<span class="opt-text">' + opt + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="quiz-feedback" id="feedback-' + qi + '"></div>' +
    '</div>';
  }).join('');
};

App.answerQuiz = function(qi, oi) {
  var topic = App.state.currentTopic;
  if (!topic) return;
  var q = topic.quiz[qi];
  var card = App.$('.quiz-card[data-qi="' + qi + '"]');
  var opts = App.$$('.quiz-opt', card);
  var feedback = App.$('#feedback-' + qi);

  opts.forEach(function(opt, i) {
    opt.disabled = true;
    if (i === q.answer) opt.classList.add('correct');
    if (i === oi && i !== q.answer) opt.classList.add('wrong');
  });

  if (oi === q.answer) {
    feedback.innerHTML = '<span class="fb-correct">' + App.ICONS.check + ' 正确！</span>';
    App.state.quizResults[qi] = true;
    if (App.recordQuizCorrect) App.recordQuizCorrect();
  } else {
    feedback.innerHTML = '<span class="fb-wrong">答案错误，正确答案是 ' + String.fromCharCode(65+q.answer) + '</span>';
    App.state.quizResults[qi] = false;
  }

  var total = topic.quiz.length;
  var answered = Object.keys(App.state.quizResults).length;
  if (answered >= total) {
    var correct = Object.values(App.state.quizResults).filter(function(r) { return r; }).length;
    if (correct >= Math.ceil(total * 0.6)) {
      App.markCompleted(topic.id);
    }
    setTimeout(function() {
      var banner = App.el('div', { class: 'quiz-result-banner' });
      banner.innerHTML =
        '<div class="qr-icon">' + (correct >= Math.ceil(total*0.6) ? App.ICONS.check : App.ICONS.quiz) + '</div>' +
        '<div class="qr-text"><strong>测验完成！</strong><span>得分：' + correct + '/' + total + ' ' + (correct >= Math.ceil(total*0.6) ? '— 已标记为已学习' : '— 需60%以上正确率') + '</span></div>';
      var quizSection = App.$('#quiz-section');
      if (quizSection) {
        quizSection.appendChild(banner);
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  }
};

// ===================== 随机测验 =====================
App.openQuiz = function(type) {
  if (type === 'random') {
    var allQuizzes = [];
    App.flatTopics.forEach(function(t) {
      t.quiz.forEach(function(q) {
        allQuizzes.push(Object.assign({}, q, { topicTitle: t.title }));
      });
    });
    var shuffled = allQuizzes.sort(function() { return Math.random() - 0.5; }).slice(0, 5);
    App.showRandomQuiz(shuffled);
  }
};

App.showRandomQuiz = function(questions) {
  var modal = App.$('#quiz-modal');
  App.state.quizResults = {};

  modal.innerHTML =
    '<div class="modal-backdrop" onclick="App.closeQuizModal()"></div>' +
    '<div class="modal-content quiz-modal-content">' +
      '<div class="modal-header">' +
        '<h2>' + App.ICONS.quiz + ' 随机测验</h2>' +
        '<button class="icon-btn" onclick="App.closeQuizModal()">' + App.ICONS.close + '</button>' +
      '</div>' +
      '<div class="quiz-modal-body" id="quiz-modal-body">' +
        questions.map(function(q, qi) {
          return '<div class="quiz-card" data-qi="r' + qi + '">' +
            '<p class="quiz-q">Q' + (qi+1) + '. ' + q.q + '</p>' +
            '<div class="quiz-source">来源：' + q.topicTitle + '</div>' +
            '<div class="quiz-options">' +
              q.options.map(function(opt, oi) {
                return '<button class="quiz-opt" data-oi="' + oi + '" onclick="App.answerRandomQuiz(\'r' + qi + '\', ' + oi + ', ' + q.answer + ')">' +
                  '<span class="opt-letter">' + String.fromCharCode(65+oi) + '</span>' +
                  '<span class="opt-text">' + opt + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
            '<div class="quiz-feedback" id="feedback-r' + qi + '"></div>' +
          '</div>';
        }).join('') +
        '<div class="quiz-result-banner" id="random-quiz-result" style="display:none"></div>' +
      '</div>' +
    '</div>';

  modal.classList.add('active');
};

App.answerRandomQuiz = function(qi, oi, answer) {
  var card = App.$('.quiz-card[data-qi="' + qi + '"]');
  var opts = App.$$('.quiz-opt', card);
  var feedback = App.$('#feedback-' + qi);

  opts.forEach(function(opt, i) {
    opt.disabled = true;
    if (i === answer) opt.classList.add('correct');
    if (i === oi && i !== answer) opt.classList.add('wrong');
  });

  if (oi === answer) {
    feedback.innerHTML = '<span class="fb-correct">' + App.ICONS.check + ' 正确！</span>';
    App.state.quizResults[qi] = true;
    if (App.recordQuizCorrect) App.recordQuizCorrect();
  } else {
    feedback.innerHTML = '<span class="fb-wrong">答案错误，正确答案是 ' + String.fromCharCode(65+answer) + '</span>';
    App.state.quizResults[qi] = false;
  }

  var total = Object.keys(App.state.quizResults).length;
  var allCards = App.$$('#quiz-modal-body .quiz-card');
  if (total >= allCards.length) {
    var correct = Object.values(App.state.quizResults).filter(function(r) { return r; }).length;
    var result = App.$('#random-quiz-result');
    result.style.display = 'flex';
    result.innerHTML =
      '<div class="qr-icon">' + (correct >= 3 ? App.ICONS.check : App.ICONS.quiz) + '</div>' +
      '<div class="qr-text"><strong>测验完成！</strong><span>得分：' + correct + '/' + allCards.length + ' ' + (correct >= 3 ? '— 太棒了！' : '— 继续加油！') + '</span></div>';
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

App.closeQuizModal = function() {
  App.$('#quiz-modal').classList.remove('active');
};

App.openFavorites = function() {
  App.navigate('favorites');
};
