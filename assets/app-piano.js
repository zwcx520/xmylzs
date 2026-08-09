/**
 * app-piano.js
 * 虚拟钢琴：Web Audio API 驱动
 */

App.openPiano = function() {
  var modal = App.$('#piano-modal');
  modal.classList.add('active');
  if (!modal.querySelector('.piano-keys')) {
    App.buildPiano();
  }
};

App.closePiano = function() {
  App.$('#piano-modal').classList.remove('active');
};

App.buildPiano = function() {
  var modal = App.$('#piano-modal');

  var notes = [
    { name: 'C4', freq: 261.63, type: 'white' },
    { name: 'C#4', freq: 277.18, type: 'black' },
    { name: 'D4', freq: 293.66, type: 'white' },
    { name: 'D#4', freq: 311.13, type: 'black' },
    { name: 'E4', freq: 329.63, type: 'white' },
    { name: 'F4', freq: 349.23, type: 'white' },
    { name: 'F#4', freq: 369.99, type: 'black' },
    { name: 'G4', freq: 392.00, type: 'white' },
    { name: 'G#4', freq: 415.30, type: 'black' },
    { name: 'A4', freq: 440.00, type: 'white' },
    { name: 'A#4', freq: 466.16, type: 'black' },
    { name: 'B4', freq: 493.88, type: 'white' },
    { name: 'C5', freq: 523.25, type: 'white' },
    { name: 'C#5', freq: 554.37, type: 'black' },
    { name: 'D5', freq: 587.33, type: 'white' },
    { name: 'D#5', freq: 622.25, type: 'black' },
    { name: 'E5', freq: 659.25, type: 'white' },
    { name: 'F5', freq: 698.46, type: 'white' },
    { name: 'F#5', freq: 739.99, type: 'black' },
    { name: 'G5', freq: 783.99, type: 'white' },
    { name: 'G#5', freq: 830.61, type: 'black' },
    { name: 'A5', freq: 880.00, type: 'white' },
    { name: 'A#5', freq: 932.33, type: 'black' },
    { name: 'B5', freq: 987.77, type: 'white' },
  ];

  var chords = {
    'C大三': ['C4', 'E4', 'G4'],
    'C小三': ['C4', 'D#4', 'G4'],
    'C属七': ['C4', 'E4', 'G4', 'A#4'],
    'C大七': ['C4', 'E4', 'G4', 'B4'],
    'C减三': ['C4', 'D#4', 'F#4'],
    'C增三': ['C4', 'E4', 'G#4'],
    'G大三': ['G4', 'B4', 'D5'],
    'D小三': ['D4', 'F4', 'A4'],
    'F大三': ['F4', 'A4', 'C5'],
    'A小三': ['A4', 'C5', 'E5'],
  };

  var noteFreqMap = {};
  notes.forEach(function(n) { noteFreqMap[n.name] = n.freq; });

  modal.innerHTML =
    '<div class="modal-backdrop" onclick="App.closePiano()"></div>' +
    '<div class="modal-content piano-modal-content">' +
      '<div class="modal-header">' +
        '<h2>' + App.ICONS.piano + ' 虚拟钢琴</h2>' +
        '<button class="icon-btn" onclick="App.closePiano()">' + App.ICONS.close + '</button>' +
      '</div>' +
      '<div class="piano-body">' +
        '<div class="piano-display" id="piano-display">点击琴键或选择和弦试听</div>' +
        '<div class="piano-keys" id="piano-keys"></div>' +
        '<div class="chord-section">' +
          '<h3>和弦试听</h3>' +
          '<div class="chord-buttons">' +
            Object.keys(chords).map(function(name) {
              return '<button class="chord-btn" onclick="App.playChord(\'' + name + '\', ' + JSON.stringify(chords[name]).replace(/"/g, '&quot;') + ')">' + name + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var keysContainer = App.$('#piano-keys');

  // 白键
  notes.filter(function(n) { return n.type === 'white'; }).forEach(function(n) {
    var key = App.el('div', { class: 'key white-key', 'data-note': n.name });
    key.innerHTML = '<span class="key-label">' + n.name + '</span>';
    key.addEventListener('mousedown', function() { App.playNote(n); });
    keysContainer.appendChild(key);
  });

  // 黑键
  var blackPositions = { 'C#4': 0, 'D#4': 1, 'F#4': 3, 'G#4': 4, 'A#4': 5, 'C#5': 7, 'D#5': 8, 'F#5': 10, 'G#5': 11, 'A#5': 12 };
  notes.filter(function(n) { return n.type === 'black'; }).forEach(function(n) {
    var pos = blackPositions[n.name];
    var key = App.el('div', { class: 'key black-key', 'data-note': n.name });
    key.style.left = 'calc(' + ((pos + 1) * (100/15)) + '% - 14px)';
    key.innerHTML = '<span class="key-label">' + n.name + '</span>';
    key.addEventListener('mousedown', function() { App.playNote(n); });
    keysContainer.appendChild(key);
  });
};

App.playNote = function(note) {
  if (!App.state.audioCtx) {
    App.state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  var ctx = App.state.audioCtx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = note.freq;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.5);

  var display = App.$('#piano-display');
  if (display) display.textContent = note.name + ' (' + note.freq.toFixed(2) + ' Hz)';

  var key = App.$('[data-note="' + note.name + '"]');
  if (key) {
    key.classList.add('pressed');
    setTimeout(function() { key.classList.remove('pressed'); }, 200);
  }
};

App.playChord = function(name, noteNames) {
  var display = App.$('#piano-display');
  if (display) display.textContent = '和弦：' + name;

  var noteFreqMap = {
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
    'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
    'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
  };

  noteNames.forEach(function(n, i) {
    var freq = noteFreqMap[n] || 261.63;
    setTimeout(function() {
      App.playNote({ name: n, freq: freq });
    }, i * 80);
  });
};
