/**
 * app-charts.js
 * 乐理可视化图表系统 — 纯 SVG/CSS 代码构建，不使用任何外部图片
 * 为全部 119 个知识点提供可视化图解，不改变原有布局和功能
 * 图表自动适配深色/浅色主题（使用 CSS 变量）
 */
(function() {
  'use strict';
  var C = {}; // Charts namespace

  // ===================== 辅助函数 =====================
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function svgWrap(inner, vb) {
    return '<svg viewBox="' + (vb || '0 0 400 200') + '" preserveAspectRatio="xMidYMid meet" class="mt-chart-svg" style="width:100% !important;max-width:100%;height:auto !important;display:block">' + inner + '</svg>';
  }
  // 12 音名
  var NOTE_NAMES = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
  var NOTE_NAMES_FLAT = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];

  // ===================== 图表 1: 钢琴键盘 =====================
  C.piano = function(opts) {
    opts = opts || {};
    var octaves = opts.octaves || 2;
    var startOct = opts.startOct || 4;
    var highlights = opts.highlights || []; // [{note:'C',oct:4,color:'#6366f1',label:'1'}]
    var showLabels = opts.showLabels !== false;
    var whiteW = 32, blackW = 20, h = 80;
    var whitePattern = ['C','D','E','F','G','A','B'];
    var blackPattern = [
      {n:'C#',after:0},{n:'D#',after:1},{n:'F#',after:3},
      {n:'G#',after:4},{n:'A#',after:5}
    ];
    var totalWhite = whitePattern.length * octaves;
    var totalW = totalWhite * whiteW;
    var whiteKeys = '', blackKeys = '', labels = '';
    var wi = 0;
    for (var o = 0; o < octaves; o++) {
      for (var i = 0; i < whitePattern.length; i++) {
        var wn = whitePattern[i];
        var x = wi * whiteW;
        var isHL = false, hlColor = '', hlLabel = '';
        for (var k = 0; k < highlights.length; k++) {
          if (highlights[k].note === wn && highlights[k].oct === startOct + o) {
            isHL = true; hlColor = highlights[k].color || '#6366f1'; hlLabel = highlights[k].label || '';
          }
        }
        var fill = isHL ? hlColor : 'var(--bg2)';
        var stroke = isHL ? hlColor : 'var(--rule)';
        whiteKeys += '<rect x="' + x + '" y="0" width="' + whiteW + '" height="' + h + '" rx="3" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1" style="transition:fill .2s"/>';
        if (isHL && hlLabel) {
          labels += '<text x="' + (x + whiteW/2) + '" y="' + (h - 8) + '" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">' + esc(hlLabel) + '</text>';
        } else if (showLabels && (wn === 'C')) {
          labels += '<text x="' + (x + whiteW/2) + '" y="' + (h - 8) + '" text-anchor="middle" fill="var(--muted2)" font-size="9">C' + (startOct + o) + '</text>';
        }
        wi++;
      }
    }
    for (var o2 = 0; o2 < octaves; o2++) {
      for (var j = 0; j < blackPattern.length; j++) {
        var bp = blackPattern[j];
        var bn = bp.n;
        var bx = (o2 * 7 + bp.after) * whiteW + whiteW - blackW / 2;
        var isHL2 = false, hlColor2 = '', hlLabel2 = '';
        for (var k2 = 0; k2 < highlights.length; k2++) {
          var hn = highlights[k2].note.replace('♯','#').replace('♭','b');
          if (hn === bn && highlights[k2].oct === startOct + o2) {
            isHL2 = true; hlColor2 = highlights[k2].color || '#ec4899'; hlLabel2 = highlights[k2].label || '';
          }
        }
        var bfill = isHL2 ? hlColor2 : '#1a1a2e';
        var bstroke = isHL2 ? hlColor2 : 'var(--bg3)';
        blackKeys += '<rect x="' + bx + '" y="0" width="' + blackW + '" height="' + (h * 0.62) + '" rx="2" fill="' + bfill + '" stroke="' + bstroke + '" stroke-width="1"/>';
        if (isHL2 && hlLabel2) {
          labels += '<text x="' + (bx + blackW/2) + '" y="' + (h * 0.62 - 6) + '" text-anchor="middle" fill="#fff" font-size="9" font-weight="700">' + esc(hlLabel2) + '</text>';
        }
      }
    }
    return svgWrap(
      whiteKeys + blackKeys + labels,
      '0 -2 ' + totalW + ' ' + (h + 4)
    );
  };

  // ===================== 图表 2: 五线谱 =====================
  C.staff = function(opts) {
    opts = opts || {};
    var clef = opts.clef || 'treble'; // treble / bass
    var notes = opts.notes || []; // [{step:'E',oct:4,color:'#6366f1',label:'1'}]  step: C D E F G A B
    var w = opts.width || 420;
    var xStart = 50, xEnd = w - 20;
    var lineGap = 8;
    var topY = 30;
    var lines = '';
    for (var i = 0; i < 5; i++) {
      var ly = topY + i * lineGap;
      lines += '<line x1="' + xStart + '" y1="' + ly + '" x2="' + xEnd + '" y2="' + ly + '" stroke="var(--ink)" stroke-width="1" opacity="0.5"/>';
    }
    // 谱号
    var clefY = topY + lineGap * 2;
    var clefText = clef === 'bass' ? '𝄢' : '𝄞';
    var clefCode = clef === 'bass' ? '&#119074;' : '&#119070;';
    var clefEl = '<text x="' + (xStart - 5) + '" y="' + (clefY + lineGap) + '" font-size="48" fill="var(--ink)" style="font-family:serif">' + clefCode + '</text>';
    // 音符位置：treble: E4=第1线, F4=第1间, G4=第2线...
    // bass: G2=第1线, A2=第1间, B2=第2线...
    var baseStep, baseOct, baseLineIdx;
    if (clef === 'treble') { baseStep = 'E'; baseOct = 4; baseLineIdx = 0; }
    else { baseStep = 'G'; baseOct = 2; baseLineIdx = 0; }
    var stepOrder = ['C','D','E','F','G','A','B'];
    function noteY(step, oct) {
      var si = stepOrder.indexOf(step);
      var bi = stepOrder.indexOf(baseStep);
      var totalSteps = (oct - baseOct) * 7 + (si - bi);
      // 每个步进 = lineGap/2（因为线间交替）
      return topY + baseLineIdx * lineGap - totalSteps * (lineGap / 2);
    }
    var noteEls = '', ledgerLines = '';
    var noteSpacing = (xEnd - xStart - 60) / Math.max(notes.length, 1);
    for (var n = 0; n < notes.length; n++) {
      var nt = notes[n];
      var ny = noteY(nt.step, nt.oct);
      var nx = xStart + 60 + n * noteSpacing;
      var nfill = nt.color || 'var(--accent)';
      // 加线（超出五线谱）
      if (ny < topY - lineGap / 2) {
        for (var ly2 = topY - lineGap; ly2 >= ny - lineGap / 2; ly2 -= lineGap) {
          ledgerLines += '<line x1="' + (nx - 8) + '" y1="' + ly2 + '" x2="' + (nx + 8) + '" y2="' + ly2 + '" stroke="var(--ink)" stroke-width="1" opacity="0.5"/>';
        }
      } else if (ny > topY + 4 * lineGap + lineGap / 2) {
        for (var ly3 = topY + 5 * lineGap; ly3 <= ny + lineGap / 2; ly3 += lineGap) {
          ledgerLines += '<line x1="' + (nx - 8) + '" y1="' + ly3 + '" x2="' + (nx + 8) + '" y2="' + ly3 + '" stroke="var(--ink)" stroke-width="1" opacity="0.5"/>';
        }
      }
      // 音符头
      noteEls += '<ellipse cx="' + nx + '" cy="' + ny + '" rx="6" ry="4.5" fill="' + nfill + '" transform="rotate(-20 ' + nx + ' ' + ny + ')" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.2))"/>';
      // 符干
      var stemUp = ny > topY + 2 * lineGap;
      var stemX = stemUp ? nx + 5 : nx - 5;
      var stemY1 = ny;
      var stemY2 = stemUp ? ny - 28 : ny + 28;
      noteEls += '<line x1="' + stemX + '" y1="' + stemY1 + '" x2="' + stemX + '" y2="' + stemY2 + '" stroke="' + nfill + '" stroke-width="1.5"/>';
      // 标签
      if (nt.label) {
        noteEls += '<text x="' + nx + '" y="' + (stemUp ? stemY2 - 4 : stemY2 + 12) + '" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="600">' + esc(nt.label) + '</text>';
      }
      if (nt.name) {
        noteEls += '<text x="' + nx + '" y="' + (ny + 18) + '" text-anchor="middle" fill="var(--muted2)" font-size="9">' + esc(nt.name) + '</text>';
      }
    }
    return svgWrap(lines + clefEl + ledgerLines + noteEls, '0 0 ' + w + ' 110');
  };

  // ===================== 图表 3: 五度循环圈 =====================
  C.circleOfFifths = function(opts) {
    opts = opts || {};
    var highlights = opts.highlights || [];
    var size = opts.size || 280;
    var cx = size / 2, cy = size / 2, r = size / 2 - 30;
    var keys = ['C','G','D','A','E','B','F#','C#','G#','D#','A#','F'];
    var minorKeys = ['Am','Em','Bm','F#m','C#m','G#m','D#m','A#m','Fm','B♭m','E♭m','Cm'];
    var els = '';
    // 外圈大调
    for (var i = 0; i < 12; i++) {
      var angle = (i * 30 - 90) * Math.PI / 180;
      var x1 = cx + r * Math.cos(angle);
      var y1 = cy + r * Math.sin(angle);
      var isHL = highlights.indexOf(keys[i]) >= 0;
      var fill = isHL ? 'var(--accent)' : 'var(--glass-bg)';
      var textFill = isHL ? '#fff' : 'var(--ink)';
      els += '<circle cx="' + x1.toFixed(1) + '" cy="' + y1.toFixed(1) + '" r="18" fill="' + fill + '" stroke="var(--rule)" stroke-width="1" style="transition:fill .2s"/>';
      els += '<text x="' + x1.toFixed(1) + '" y="' + (y1 + 4).toFixed(1) + '" text-anchor="middle" fill="' + textFill + '" font-size="11" font-weight="600">' + esc(keys[i]) + '</text>';
    }
    // 内圈小调
    var r2 = r - 45;
    for (var j = 0; j < 12; j++) {
      var angle2 = (j * 30 - 90) * Math.PI / 180;
      var x2 = cx + r2 * Math.cos(angle2);
      var y2 = cy + r2 * Math.sin(angle2);
      els += '<text x="' + x2.toFixed(1) + '" y="' + (y2 + 3).toFixed(1) + '" text-anchor="middle" fill="var(--muted)" font-size="9">' + esc(minorKeys[j]) + '</text>';
    }
    // 中心
    els += '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="none" stroke="var(--rule)" stroke-width="1"/>';
    els += '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" fill="var(--muted)" font-size="9">五度</text>';
    els += '<text x="' + cx + '" y="' + (cy + 12) + '" text-anchor="middle" fill="var(--muted)" font-size="9">循环</text>';
    return svgWrap(els, '0 0 ' + size + ' ' + size);
  };

  // ===================== 图表 4: 节奏格 =====================
  C.rhythmGrid = function(opts) {
    opts = opts || {};
    var beats = opts.beats || 4; // 拍数
    var subdivisions = opts.subdivisions || 4; // 每拍细分
    var pattern = opts.pattern || []; // [1,0,1,0,...] 长度 = beats * subdivisions
    var accents = opts.accents || [1,0,0,0]; // 强弱拍
    var totalCells = beats * subdivisions;
    var cellW = 48, cellH = 36, gap = 2;
    var totalW = totalCells * (cellW + gap) + 20;
    var els = '';
    for (var b = 0; b < beats; b++) {
      var beatX = 10 + b * (cellW + gap) * subdivisions;
      var isAccent = accents[b % accents.length];
      var beatBg = isAccent ? 'rgba(99,102,241,0.08)' : 'transparent';
      els += '<rect x="' + beatX + '" y="10" width="' + (subdivisions * (cellW + gap) - gap) + '" height="' + (cellH + 8) + '" rx="4" fill="' + beatBg + '" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2,2"/>';
      els += '<text x="' + (beatX + subdivisions * (cellW + gap) / 2) + '" y="8" text-anchor="middle" fill="var(--muted)" font-size="9">' + (b + 1) + (isAccent ? ' (强)' : '') + '</text>';
      for (var s = 0; s < subdivisions; s++) {
        var idx = b * subdivisions + s;
        var cx = beatX + s * (cellW + gap);
        var active = pattern[idx];
        var fill = active ? 'var(--accent)' : 'var(--glass-bg)';
        els += '<rect x="' + cx + '" y="14" width="' + cellW + '" height="' + cellH + '" rx="3" fill="' + fill + '" stroke="var(--rule)" stroke-width="1" style="transition:fill .2s"/>';
        if (active) {
          els += '<text x="' + (cx + cellW/2) + '" y="' + (14 + cellH/2 + 4) + '" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">♪</text>';
        }
        // 细分标签
        var subLabels = ['1','e','+','a'];
        els += '<text x="' + (cx + cellW/2) + '" y="' + (14 + cellH + 18) + '" text-anchor="middle" fill="var(--muted2)" font-size="8">' + subLabels[s] + '</text>';
      }
    }
    return svgWrap(els, '0 0 ' + totalW + ' ' + (cellH + 40));
  };

  // ===================== 图表 5: 波形图 =====================
  C.waveform = function(opts) {
    opts = opts || {};
    var type = opts.type || 'sine'; // sine, square, sawtooth, triangle, composite
    var freq = opts.freq || 2;
    var w = opts.width || 400, h = opts.height || 120;
    var midY = h / 2;
    var amp = h / 2 - 10;
    var points = [];
    var steps = 200;
    for (var i = 0; i <= steps; i++) {
      var x = (i / steps) * w;
      var t = (i / steps) * Math.PI * 2 * freq;
      var y;
      if (type === 'sine') { y = midY - amp * Math.sin(t); }
      else if (type === 'square') { y = midY - amp * (Math.sin(t) >= 0 ? 1 : -1); }
      else if (type === 'sawtooth') { y = midY - amp * (2 * ((t / (2 * Math.PI)) % 1) - 1); }
      else if (type === 'triangle') { y = midY - amp * (2 * Math.abs(2 * ((t / (2 * Math.PI)) % 1) - 1) - 1); }
      else if (type === 'composite') {
        // 基波 + 2次谐波 + 3次谐波
        y = midY - amp * (0.6 * Math.sin(t) + 0.25 * Math.sin(2 * t) + 0.15 * Math.sin(3 * t));
      } else { y = midY; }
      points.push(x.toFixed(1) + ',' + y.toFixed(1));
    }
    var els = '';
    // 中线
    els += '<line x1="0" y1="' + midY + '" x2="' + w + '" y2="' + midY + '" stroke="var(--rule)" stroke-width="1" stroke-dasharray="4,4"/>';
    // 波形
    els += '<polyline points="' + points.join(' ') + '" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    // 标签
    if (opts.label) {
      els += '<text x="' + (w / 2) + '" y="' + (h - 4) + '" text-anchor="middle" fill="var(--muted)" font-size="10">' + esc(opts.label) + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 6: 结构色块 =====================
  C.structureBlocks = function(opts) {
    opts = opts || {};
    var sections = opts.sections || []; // [{label:'A',ratio:3,color:'#6366f1',desc:'呈示'}]
    var totalRatio = 0;
    for (var i = 0; i < sections.length; i++) totalRatio += sections[i].ratio || 1;
    var w = 420, h = 80;
    var els = '', curX = 0;
    for (var j = 0; j < sections.length; j++) {
      var sec = sections[j];
      var bw = (sec.ratio / totalRatio) * w;
      var fill = sec.color || 'var(--accent)';
      els += '<rect x="' + curX.toFixed(1) + '" y="20" width="' + bw.toFixed(1) + '" height="40" rx="4" fill="' + fill + '" opacity="0.85" stroke="var(--bg)" stroke-width="2"/>';
      els += '<text x="' + (curX + bw / 2).toFixed(1) + '" y="44" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">' + esc(sec.label) + '</text>';
      if (sec.desc) {
        els += '<text x="' + (curX + bw / 2).toFixed(1) + '" y="72" text-anchor="middle" fill="var(--muted)" font-size="9">' + esc(sec.desc) + '</text>';
      }
      curX += bw;
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 7: 功能三角 =====================
  C.functionTriangle = function(opts) {
    opts = opts || {};
    var size = 260;
    var cx = size / 2, cy = size / 2;
    var r = 90;
    var p1x = cx, p1y = cy - r; // top T
    var p2x = cx - r * 0.866, p2y = cy + r * 0.5; // bottom-left S
    var p3x = cx + r * 0.866, p3y = cy + r * 0.5; // bottom-right D
    var els = '';
    // 三角形边（箭头方向 T→S→D→T）
    els += '<path d="M' + p1x + ',' + p1y + ' L' + p2x + ',' + p2y + ' L' + p3x + ',' + p3y + ' Z" fill="none" stroke="var(--accent)" stroke-width="2" opacity="0.4"/>';
    // 箭头
    function arrow(x1,y1,x2,y2,color) {
      var mx = (x1+x2)/2, my = (y1+y2)/2;
      var dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy);
      var ux = dx/len, uy = dy/len;
      var ax = mx + ux*15, ay = my + uy*15;
      var px = -uy, py = ux;
      return '<path d="M' + (ax-px*5) + ',' + (ay-py*5) + ' L' + ax + ',' + ay + ' L' + (ax+px*5) + ',' + (ay+py*5) + '" stroke="' + color + '" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    els += arrow(p1x,p1y,p2x,p2y,'var(--accent)');
    els += arrow(p2x,p2y,p3x,p3y,'var(--accent)');
    els += arrow(p3x,p3y,p1x,p1y,'var(--accent)');
    // 节点
    var nodes = [
      {x:p1x, y:p1y, label:'T', name:'主功能', color:'#6366f1', chords:'I vi'},
      {x:p2x, y:p2y, label:'S', name:'下属功能', color:'#3b82f6', chords:'IV ii'},
      {x:p3x, y:p3y, label:'D', name:'属功能', color:'#ec4899', chords:'V vii°'}
    ];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      els += '<circle cx="' + n.x + '" cy="' + n.y + '" r="28" fill="' + n.color + '" opacity="0.9" style="filter:drop-shadow(0 2px 8px rgba(0,0,0,0.2))"/>';
      els += '<text x="' + n.x + '" y="' + (n.y + 5) + '" text-anchor="middle" fill="#fff" font-size="18" font-weight="700">' + n.label + '</text>';
      els += '<text x="' + n.x + '" y="' + (n.y + 46) + '" text-anchor="middle" fill="var(--muted)" font-size="10">' + esc(n.name) + '</text>';
      els += '<text x="' + n.x + '" y="' + (n.y + 58) + '" text-anchor="middle" fill="var(--muted2)" font-size="9">' + esc(n.chords) + '</text>';
    }
    return svgWrap(els, '0 0 ' + size + ' ' + (size + 20));
  };

  // ===================== 图表 8: 音程矩阵 =====================
  C.intervalMatrix = function(opts) {
    opts = opts || {};
    var data = opts.data || [
      {name:'纯一度', semitones:0, consonant:true},
      {name:'小二度', semitones:1, consonant:false},
      {name:'大二度', semitones:2, consonant:false},
      {name:'小三度', semitones:3, consonant:true},
      {name:'大三度', semitones:4, consonant:true},
      {name:'纯四度', semitones:5, consonant:true},
      {name:'增四度', semitones:6, consonant:false},
      {name:'纯五度', semitones:7, consonant:true},
      {name:'小六度', semitones:8, consonant:true},
      {name:'大六度', semitones:9, consonant:true},
      {name:'小七度', semitones:10, consonant:false},
      {name:'大七度', semitones:11, consonant:false},
      {name:'纯八度', semitones:12, consonant:true}
    ];
    var cellW = 60, cellH = 32;
    var els = '';
    // 表头
    els += '<rect x="0" y="0" width="' + cellW + '" height="' + cellH + '" fill="var(--bg3)" rx="4"/>';
    els += '<text x="' + (cellW/2) + '" y="' + (cellH/2+5) + '" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="600">音程</text>';
    els += '<rect x="' + cellW + '" y="0" width="' + cellW + '" height="' + cellH + '" fill="var(--bg3)" rx="4"/>';
    els += '<text x="' + (cellW + cellW/2) + '" y="' + (cellH/2+5) + '" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="600">半音数</text>';
    els += '<rect x="' + (2*cellW) + '" y="0" width="' + cellW + '" height="' + cellH + '" fill="var(--bg3)" rx="4"/>';
    els += '<text x="' + (2*cellW + cellW/2) + '" y="' + (cellH/2+5) + '" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="600">性质</text>';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var ry = (i + 1) * (cellH + 2);
      els += '<rect x="0" y="' + ry + '" width="' + cellW + '" height="' + cellH + '" rx="3" fill="var(--glass-bg)" stroke="var(--rule)" stroke-width="1"/>';
      els += '<text x="' + (cellW/2) + '" y="' + (ry + cellH/2 + 4) + '" text-anchor="middle" fill="var(--ink)" font-size="11">' + esc(d.name) + '</text>';
      els += '<rect x="' + cellW + '" y="' + ry + '" width="' + cellW + '" height="' + cellH + '" rx="3" fill="var(--glass-bg)" stroke="var(--rule)" stroke-width="1"/>';
      els += '<text x="' + (cellW + cellW/2) + '" y="' + (ry + cellH/2 + 4) + '" text-anchor="middle" fill="var(--accent)" font-size="12" font-weight="700">' + d.semitones + '</text>';
      var propColor = d.consonant ? '#10b981' : '#ef4444';
      var propText = d.consonant ? '协和' : '不协和';
      els += '<rect x="' + (2*cellW) + '" y="' + ry + '" width="' + cellW + '" height="' + cellH + '" rx="3" fill="' + propColor + '" opacity="0.15" stroke="' + propColor + '" stroke-width="1" opacity="0.4"/>';
      els += '<text x="' + (2*cellW + cellW/2) + '" y="' + (ry + cellH/2 + 4) + '" text-anchor="middle" fill="' + propColor + '" font-size="10" font-weight="600">' + propText + '</text>';
    }
    var totalW = cellW * 3;
    var totalH = (data.length + 1) * (cellH + 2);
    return svgWrap(els, '0 0 ' + totalW + ' ' + totalH);
  };

  // ===================== 图表 9: 音阶级数图 =====================
  C.scaleDegrees = function(opts) {
    opts = opts || {};
    var degrees = opts.degrees || ['1','2','3','4','5','6','7','1']; // 音级数字
    var labels = opts.labels || ['主音','上主音','中音','下属音','属音','下中音','导音','主音'];
    var colors = opts.colors || [];
    var intervals = opts.intervals || ['W','W','H','W','W','W','H']; // 全音/半音
    var n = degrees.length;
    var circleR = 22;
    var spacing = 50;
    var totalW = n * spacing + 20;
    var h = 100;
    var els = '';
    for (var i = 0; i < n; i++) {
      var cx = 30 + i * spacing;
      var cy = 40;
      var fill = (colors[i] || (i === 0 || i === n - 1) ? 'var(--accent)' : 'var(--bg3)');
      els += '<circle cx="' + cx + '" cy="' + cy + '" r="' + circleR + '" fill="' + fill + '" stroke="var(--rule)" stroke-width="1" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>';
      els += '<text x="' + cx + '" y="' + (cy + 5) + '" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">' + esc(degrees[i]) + '</text>';
      if (labels[i]) {
        els += '<text x="' + cx + '" y="' + (cy + circleR + 16) + '" text-anchor="middle" fill="var(--muted)" font-size="8">' + esc(labels[i]) + '</text>';
      }
      // 连接线和音程标记
      if (i < n - 1) {
        var lx1 = cx + circleR;
        var lx2 = cx + spacing - circleR;
        var isHalf = intervals[i] === 'H';
        var lineColor = isHalf ? '#ef4444' : 'var(--muted2)';
        els += '<line x1="' + lx1 + '" y1="' + cy + '" x2="' + lx2 + '" y2="' + cy + '" stroke="' + lineColor + '" stroke-width="2" stroke-dasharray="' + (isHalf ? '3,3' : 'none') + '"/>';
        els += '<text x="' + ((lx1 + lx2) / 2) + '" y="' + (cy - 8) + '" text-anchor="middle" fill="' + lineColor + '" font-size="8" font-weight="600">' + esc(intervals[i] || '') + '</text>';
      }
    }
    // 图例
    els += '<text x="10" y="' + (h - 8) + '" fill="var(--muted2)" font-size="9">W=全音(2个半音)  H=半音(1个半音)</text>';
    return svgWrap(els, '0 0 ' + totalW + ' ' + h);
  };

  // ===================== 图表 10: 树形图 =====================
  C.tree = function(opts) {
    opts = opts || {};
    var root = opts.root || {label:'根',children:[]};
    var w = opts.width || 420;
    function countLeaves(node) {
      if (!node.children || !node.children.length) return 1;
      var s = 0;
      for (var i = 0; i < node.children.length; i++) s += countLeaves(node.children[i]);
      return s;
    }
    var leafCount = Math.max(countLeaves(root), 1);
    var leafSpacing = Math.max(80, w / leafCount);
    var totalW = leafCount * leafSpacing;
    var levelH = 70;
    var leafIdx = 0;
    var els = '';
    function layout(node, depth, parentX, parentY) {
      var nodeY = depth * levelH + 25;
      var nodeX;
      if (!node.children || !node.children.length) {
        nodeX = leafIdx * leafSpacing + leafSpacing / 2;
        leafIdx++;
      } else {
        var childXs = [];
        for (var i = 0; i < node.children.length; i++) {
          var cx = layout(node.children[i], depth + 1, 0, 0);
          childXs.push(cx);
        }
        nodeX = (childXs[0] + childXs[childXs.length - 1]) / 2;
      }
      var isRoot = depth === 0;
      var fill = node.color || (isRoot ? 'var(--accent)' : 'var(--bg3)');
      var textFill = isRoot ? '#fff' : 'var(--ink)';
      var bw = (node.label || '').length * 11 + 20;
      bw = Math.max(bw, 60);
      els += '<rect x="' + (nodeX - bw/2) + '" y="' + (nodeY - 14) + '" width="' + bw + '" height="28" rx="6" fill="' + fill + '" stroke="var(--rule)" stroke-width="1" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.1))"/>';
      els += '<text x="' + nodeX + '" y="' + (nodeY + 4) + '" text-anchor="middle" fill="' + textFill + '" font-size="11" font-weight="' + (isRoot ? '700' : '500') + '">' + esc(node.label || '') + '</text>';
      if (parentX !== 0 || parentY !== 0) {
        var midY = (parentY + nodeY) / 2;
        els += '<path d="M' + parentX + ',' + (parentY + 14) + ' C' + parentX + ',' + midY + ' ' + nodeX + ',' + midY + ' ' + nodeX + ',' + (nodeY - 14) + '" fill="none" stroke="var(--rule)" stroke-width="1.5"/>';
      }
      return nodeX;
    }
    var totalH = (opts.maxDepth || 3) * levelH + 40;
    layout(root, 0, 0, 0);
    return svgWrap(els, '0 0 ' + Math.max(totalW, 200) + ' ' + totalH);
  };

  // ===================== 图表 11: 流程图 =====================
  C.flow = function(opts) {
    opts = opts || {};
    var steps = opts.steps || []; // [{label:'步骤1',color:'#6366f1'}]
    var direction = opts.direction || 'horizontal'; // horizontal / vertical
    var els = '';
    if (direction === 'horizontal') {
      var stepW = 100, stepH = 44, gap = 30;
      var totalW = steps.length * stepW + (steps.length - 1) * gap + 20;
      for (var i = 0; i < steps.length; i++) {
        var x = 10 + i * (stepW + gap);
        var y = 20;
        var fill = steps[i].color || 'var(--accent)';
        els += '<rect x="' + x + '" y="' + y + '" width="' + stepW + '" height="' + stepH + '" rx="8" fill="' + fill + '" opacity="0.9" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.15))"/>';
        els += '<text x="' + (x + stepW/2) + '" y="' + (y + stepH/2 + 5) + '" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">' + esc(steps[i].label) + '</text>';
        if (i < steps.length - 1) {
          var ax1 = x + stepW, ax2 = x + stepW + gap;
          els += '<path d="M' + ax1 + ',' + (y + stepH/2) + ' L' + ax2 + ',' + (y + stepH/2) + '" stroke="var(--muted2)" stroke-width="2" marker-end="url(#mtflowArrow)"/>';
        }
      }
      els += '<defs><marker id="mtflowArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M1,1 L7,4 L1,7 Z" fill="var(--muted2)"/></marker></defs>';
      return svgWrap(els, '0 0 ' + totalW + ' ' + (stepH + 40));
    } else {
      var vStepH = 50, vGap = 24, vW = 160;
      for (var j = 0; j < steps.length; j++) {
        var vy = 10 + j * (vStepH + vGap);
        var vfill = steps[j].color || 'var(--accent)';
        els += '<rect x="20" y="' + vy + '" width="' + vW + '" height="' + vStepH + '" rx="8" fill="' + vfill + '" opacity="0.9" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.15))"/>';
        els += '<text x="' + (20 + vW/2) + '" y="' + (vy + vStepH/2 + 5) + '" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">' + esc(steps[j].label) + '</text>';
        if (j < steps.length - 1) {
          var vay1 = vy + vStepH, vay2 = vy + vStepH + vGap;
          els += '<path d="M' + (20 + vW/2) + ',' + vay1 + ' L' + (20 + vW/2) + ',' + vay2 + '" stroke="var(--muted2)" stroke-width="2" marker-end="url(#mtflowArrowV)"/>';
        }
      }
      els += '<defs><marker id="mtflowArrowV" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M1,1 L4,7 L7,1 Z" fill="var(--muted2)"/></marker></defs>';
      var vTotalH = steps.length * vStepH + (steps.length - 1) * vGap + 20;
      return svgWrap(els, '0 0 ' + (vW + 40) + ' ' + vTotalH);
    }
  };

  // ===================== 图表 12: 对比表 =====================
  C.comparisonTable = function(opts) {
    opts = opts || {};
    var headers = opts.headers || [];
    var rows = opts.rows || [];
    var highlightCol = opts.highlightCol || -1;
    var cellW = 110, cellH = 30, headerH = 34;
    var totalW = headers.length * cellW;
    var els = '';
    // 表头
    for (var h = 0; h < headers.length; h++) {
      var hbg = h === highlightCol ? 'var(--accent)' : 'var(--bg3)';
      var ht = h === highlightCol ? '#fff' : 'var(--muted)';
      els += '<rect x="' + (h * cellW) + '" y="0" width="' + cellW + '" height="' + headerH + '" fill="' + hbg + '" rx="3"/>';
      els += '<text x="' + (h * cellW + cellW/2) + '" y="' + (headerH/2 + 5) + '" text-anchor="middle" fill="' + ht + '" font-size="11" font-weight="600">' + esc(headers[h]) + '</text>';
    }
    // 数据行
    for (var r = 0; r < rows.length; r++) {
      var ry = headerH + r * (cellH + 2);
      for (var c = 0; c < rows[r].length; c++) {
        var cbg = c === highlightCol ? 'rgba(99,102,241,0.08)' : 'var(--glass-bg)';
        els += '<rect x="' + (c * cellW) + '" y="' + ry + '" width="' + cellW + '" height="' + cellH + '" rx="3" fill="' + cbg + '" stroke="var(--rule)" stroke-width="1"/>';
        els += '<text x="' + (c * cellW + cellW/2) + '" y="' + (ry + cellH/2 + 4) + '" text-anchor="middle" fill="var(--ink)" font-size="10">' + esc(rows[r][c]) + '</text>';
      }
    }
    var totalH = headerH + rows.length * (cellH + 2);
    return svgWrap(els, '0 0 ' + totalW + ' ' + totalH);
  };

  // ===================== 图表 13: 柱状图 =====================
  C.barChart = function(opts) {
    opts = opts || {};
    var data = opts.data || []; // [{label:'A',value:80,color:'#6366f1'}]
    var maxVal = opts.maxVal || 100;
    var w = opts.width || 420, h = opts.height || 160;
    var barW = 36, gap = 16;
    var chartH = h - 40;
    var els = '';
    // 基线
    els += '<line x1="10" y1="' + (chartH + 10) + '" x2="' + (w - 10) + '" y2="' + (chartH + 10) + '" stroke="var(--rule)" stroke-width="1"/>';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var bx = 20 + i * (barW + gap);
      var bh = (d.value / maxVal) * chartH;
      var by = chartH + 10 - bh;
      var fill = d.color || 'var(--accent)';
      els += '<rect x="' + bx + '" y="' + by.toFixed(1) + '" width="' + barW + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + fill + '" opacity="0.85" style="transition:height .3s"/>';
      els += '<text x="' + (bx + barW/2) + '" y="' + (by - 5) + '" text-anchor="middle" fill="var(--ink)" font-size="10" font-weight="600">' + d.value + '</text>';
      els += '<text x="' + (bx + barW/2) + '" y="' + (chartH + 25) + '" text-anchor="middle" fill="var(--muted)" font-size="9">' + esc(d.label) + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 14: 音符时值条 =====================
  C.noteValues = function(opts) {
    opts = opts || {};
    var notes = opts.notes || [
      {name:'全音符',ratio:4,symbol:'𝅝'},
      {name:'二分音符',ratio:2,symbol:'𝅗𝅥'},
      {name:'四分音符',ratio:1,symbol:'𝅘𝅥'},
      {name:'八分音符',ratio:0.5,symbol:'𝅘𝅥𝅮'},
      {name:'十六分音符',ratio:0.25,symbol:'𝅘𝅥𝅯'}
    ];
    var w = 420, rowH = 34, gap = 4;
    var els = '';
    var maxRatio = notes[0].ratio;
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var bw = (n.ratio / maxRatio) * (w - 120);
      var y = i * (rowH + gap) + 4;
      els += '<text x="10" y="' + (y + rowH/2 + 5) + '" fill="var(--ink)" font-size="22" style="font-family:serif">' + n.symbol + '</text>';
      els += '<rect x="44" y="' + y + '" width="' + bw.toFixed(1) + '" height="' + rowH + '" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" stroke-width="1"/>';
      els += '<text x="' + (52 + bw) + '" y="' + (y + rowH/2 + 5) + '" fill="var(--muted)" font-size="10">' + esc(n.name) + '</text>';
    }
    var totalH = notes.length * (rowH + gap) + 8;
    return svgWrap(els, '0 0 ' + w + ' ' + totalH);
  };

  // ===================== 图表 15: 同心圆/雷达 =====================
  C.radar = function(opts) {
    opts = opts || {};
    var axes = opts.axes || ['A','B','C','D','E']; // 标签
    var values = opts.values || [0.8,0.6,0.9,0.5,0.7]; // 0~1
    var size = 240, cx = size/2, cy = size/2, r = 90;
    var n = axes.length;
    var els = '';
    // 网格圆
    for (var g = 1; g <= 4; g++) {
      var gr = r * g / 4;
      var pts = [];
      for (var i = 0; i < n; i++) {
        var a = (i * 2 * Math.PI / n - Math.PI/2);
        pts.push((cx + gr * Math.cos(a)).toFixed(1) + ',' + (cy + gr * Math.sin(a)).toFixed(1));
      }
      els += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="var(--rule)" stroke-width="1"/>';
    }
    // 数据多边形
    var dpts = [];
    for (var j = 0; j < n; j++) {
      var da = (j * 2 * Math.PI / n - Math.PI/2);
      var dr = r * values[j];
      dpts.push((cx + dr * Math.cos(da)).toFixed(1) + ',' + (cy + dr * Math.sin(da)).toFixed(1));
    }
    els += '<polygon points="' + dpts.join(' ') + '" fill="var(--accent)" fill-opacity="0.2" stroke="var(--accent)" stroke-width="2"/>';
    // 数据点
    for (var k = 0; k < n; k++) {
      els += '<circle cx="' + dpts[k].split(',')[0] + '" cy="' + dpts[k].split(',')[1] + '" r="3" fill="var(--accent)"/>';
    }
    // 标签
    for (var l = 0; l < n; l++) {
      var la = (l * 2 * Math.PI / n - Math.PI/2);
      var lx = cx + (r + 14) * Math.cos(la);
      var ly = cy + (r + 14) * Math.sin(la);
      els += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="600">' + esc(axes[l]) + '</text>';
    }
    return svgWrap(els, '0 0 ' + size + ' ' + size);
  };

  // ===================== 图表 16: 时间线 =====================
  C.timeline = function(opts) {
    opts = opts || {};
    var phases = opts.phases || []; // [{label:'巴洛克',start:1600,end:1750,color:'#6366f1'}]
    var w = 420, h = 80;
    var minYear = phases.length ? phases[0].start : 0;
    var maxYear = phases.length ? phases[phases.length-1].end : 100;
    var range = maxYear - minYear;
    var els = '';
    // 基线
    els += '<line x1="10" y1="40" x2="' + (w-10) + '" y2="40" stroke="var(--rule)" stroke-width="2"/>';
    for (var i = 0; i < phases.length; i++) {
      var p = phases[i];
      var x1 = 10 + ((p.start - minYear) / range) * (w - 20);
      var x2 = 10 + ((p.end - minYear) / range) * (w - 20);
      var bw = x2 - x1;
      var fill = p.color || 'var(--accent)';
      els += '<rect x="' + x1.toFixed(1) + '" y="28" width="' + bw.toFixed(1) + '" height="24" rx="4" fill="' + fill + '" opacity="0.8"/>';
      els += '<text x="' + ((x1+x2)/2).toFixed(1) + '" y="44" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">' + esc(p.label) + '</text>';
      els += '<text x="' + x1.toFixed(1) + '" y="22" fill="var(--muted)" font-size="8">' + p.start + '</text>';
      els += '<text x="' + x2.toFixed(1) + '" y="22" text-anchor="end" fill="var(--muted)" font-size="8">' + p.end + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 17: 和弦堆叠 =====================
  C.chordStack = function(opts) {
    opts = opts || {};
    var notes = opts.notes || []; // [{name:'C',step:'E',oct:4,color:'#6366f1'}]
    var w = 200, h = 160;
    var els = '';
    // 五线谱底线
    var topY = 30, lineGap = 10;
    for (var i = 0; i < 5; i++) {
      els += '<line x1="20" y1="' + (topY + i * lineGap) + '" x2="' + (w-20) + '" y2="' + (topY + i * lineGap) + '" stroke="var(--ink)" stroke-width="1" opacity="0.4"/>';
    }
    // 谱号
    els += '<text x="25" y="' + (topY + lineGap * 3) + '" font-size="36" fill="var(--ink)" style="font-family:serif" opacity="0.7">&#119070;</text>';
    // 音符堆叠
    var stepOrder = ['C','D','E','F','G','A','B'];
    var baseStep = 'E', baseOct = 4, baseLineIdx = 0;
    function noteY(step, oct) {
      var si = stepOrder.indexOf(step);
      var bi = stepOrder.indexOf(baseStep);
      var totalSteps = (oct - baseOct) * 7 + (si - bi);
      return topY + baseLineIdx * lineGap - totalSteps * (lineGap / 2);
    }
    var cx = w / 2 + 15;
    for (var n = 0; n < notes.length; n++) {
      var nt = notes[n];
      var ny = noteY(nt.step, nt.oct);
      var nfill = nt.color || 'var(--accent)';
      els += '<ellipse cx="' + cx + '" cy="' + ny + '" rx="7" ry="5" fill="' + nfill + '" transform="rotate(-20 ' + cx + ' ' + ny + ')" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.2))"/>';
      els += '<text x="' + (cx + 14) + '" y="' + (ny + 4) + '" fill="var(--muted)" font-size="10" font-weight="600">' + esc(nt.name) + '</text>';
    }
    // 符干
    if (notes.length > 0) {
      var topNoteY = noteY(notes[notes.length-1].step, notes[notes.length-1].oct);
      var botNoteY = noteY(notes[0].step, notes[0].oct);
      els += '<line x1="' + (cx + 6) + '" y1="' + botNoteY + '" x2="' + (cx + 6) + '" y2="' + (topNoteY - 25) + '" stroke="var(--accent)" stroke-width="1.5"/>';
    }
    // 和弦名称
    if (opts.name) {
      els += '<text x="' + cx + '" y="' + (h - 8) + '" text-anchor="middle" fill="var(--ink)" font-size="14" font-weight="700">' + esc(opts.name) + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 18: 频率比波形 =====================
  C.freqRatio = function(opts) {
    opts = opts || {};
    var ratios = opts.ratios || [{freq:1,color:'#6366f1',label:'基波(1)'},{freq:1.5,color:'#ec4899',label:'纯五度(3:2)'}];
    var w = 380, h = 100, midY = h/2, amp = h/2 - 14;
    var els = '';
    els += '<line x1="0" y1="' + midY + '" x2="' + w + '" y2="' + midY + '" stroke="var(--rule)" stroke-width="1" stroke-dasharray="3,3"/>';
    for (var r = 0; r < ratios.length; r++) {
      var ro = ratios[r];
      var pts = [];
      for (var i = 0; i <= 200; i++) {
        var x = (i/200) * w;
        var t = (i/200) * Math.PI * 2 * ro.freq;
        var y = midY - amp * 0.7 * Math.sin(t) + (r - (ratios.length-1)/2) * 6;
        pts.push(x.toFixed(1) + ',' + y.toFixed(1));
      }
      els += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + ro.color + '" stroke-width="2" opacity="0.8"/>';
      els += '<text x="' + (w - 8) + '" y="' + (14 + r * 14) + '" text-anchor="end" fill="' + ro.color + '" font-size="9" font-weight="600">' + esc(ro.label) + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 19: 同心圆复节奏 =====================
  C.polyrhythm = function(opts) {
    opts = opts || {};
    var rings = opts.rings || [{n:4,color:'#6366f1'},{n:3,color:'#ec4899'}];
    var size = 200, cx = size/2, cy = size/2;
    var maxR = 80;
    var els = '';
    for (var r = 0; r < rings.length; r++) {
      var ring = rings[r];
      var rr = maxR - r * 28;
      els += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rr + '" fill="none" stroke="var(--rule)" stroke-width="1.5"/>';
      for (var i = 0; i < ring.n; i++) {
        var a = (i * 2 * Math.PI / ring.n) - Math.PI/2;
        var px = cx + rr * Math.cos(a);
        var py = cy + rr * Math.sin(a);
        els += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="7" fill="' + ring.color + '" opacity="0.8" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.2))"/>';
      }
      els += '<text x="' + cx + '" y="' + (cy + rr + 16) + '" text-anchor="middle" fill="' + ring.color + '" font-size="11" font-weight="600">' + ring.n + '</text>';
    }
    return svgWrap(els, '0 0 ' + size + ' ' + size);
  };

  // ===================== 图表 20: 调式色彩渐变条 =====================
  C.modeSpectrum = function(opts) {
    opts = opts || {};
    var modes = opts.modes || [
      {name:'Lydian',bright:7},{name:'Ionian',bright:6},{name:'Mixolydian',bright:5},
      {name:'Dorian',bright:4},{name:'Aeolian',bright:3},{name:'Phrygian',bright:2},{name:'Locrian',bright:1}
    ];
    var w = 420, h = 60, barH = 24;
    var els = '';
    // 渐变背景
    els += '<defs><linearGradient id="mtModeGrad" x1="0" y1="0" x2="1" y2="0">';
    els += '<stop offset="0%" stop-color="#fbbf24"/>';
    els += '<stop offset="50%" stop-color="#6366f1"/>';
    els += '<stop offset="100%" stop-color="#1e1b4b"/>';
    els += '</linearGradient></defs>';
    els += '<rect x="10" y="10" width="' + (w-20) + '" height="' + barH + '" rx="4" fill="url(#mtModeGrad)" opacity="0.85"/>';
    var stepW = (w - 20) / modes.length;
    for (var i = 0; i < modes.length; i++) {
      var mx = 10 + i * stepW + stepW/2;
      els += '<text x="' + mx + '" y="' + (10 + barH/2 + 4) + '" text-anchor="middle" fill="#fff" font-size="9" font-weight="600">' + esc(modes[i].name) + '</text>';
      els += '<text x="' + mx + '" y="' + (10 + barH + 16) + '" text-anchor="middle" fill="var(--muted)" font-size="8">' + (modes[i].bright > 4 ? '明亮' : modes[i].bright === 4 ? '中性' : '暗淡') + '</text>';
    }
    els += '<text x="10" y="' + (h - 2) + '" fill="var(--muted2)" font-size="8">← 暗　　色彩　　亮 →</text>';
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // ===================== 图表 21: 简易信息卡（纯 CSS） =====================
  C.infoCards = function(opts) {
    opts = opts || {};
    var cards = opts.cards || [];
    var html = '<div class="mt-info-cards-grid">';
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      html += '<div class="mt-info-card" style="border-color:' + (c.color || 'var(--accent)') + '40">';
      if (c.icon) html += '<div class="mt-info-card-icon" style="color:' + (c.color || 'var(--accent)') + '">' + c.icon + '</div>';
      html += '<div class="mt-info-card-body">';
      if (c.title) html += '<div class="mt-info-card-title">' + esc(c.title) + '</div>';
      if (c.text) html += '<div class="mt-info-card-text">' + esc(c.text) + '</div>';
      html += '</div></div>';
    }
    html += '</div>';
    return html;
  };

  // ===================== 图表 22: 百分比环 =====================
  C.donut = function(opts) {
    opts = opts || {};
    var segments = opts.segments || [{value:60,color:'#6366f1',label:'已掌握'},{value:40,color:'var(--bg3)',label:'未学习'}];
    var size = 160, cx = size/2, cy = size/2, r = 60;
    var total = 0;
    for (var i = 0; i < segments.length; i++) total += segments[i].value;
    var els = '';
    var startAngle = -Math.PI/2;
    for (var s = 0; s < segments.length; s++) {
      var seg = segments[s];
      var angle = (seg.value / total) * 2 * Math.PI;
      var endAngle = startAngle + angle;
      var x1 = cx + r * Math.cos(startAngle);
      var y1 = cy + r * Math.sin(startAngle);
      var x2 = cx + r * Math.cos(endAngle);
      var y2 = cy + r * Math.sin(endAngle);
      var largeArc = angle > Math.PI ? 1 : 0;
      els += '<path d="M' + cx + ',' + cy + ' L' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' A' + r + ',' + r + ' 0 ' + largeArc + ',1 ' + x2.toFixed(1) + ',' + y2.toFixed(1) + ' Z" fill="' + seg.color + '" opacity="0.8" stroke="var(--bg)" stroke-width="2"/>';
      startAngle = endAngle;
    }
    // 中心文字
    if (opts.centerText) {
      els += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" fill="var(--ink)" font-size="20" font-weight="700">' + esc(opts.centerText) + '</text>';
    }
    if (opts.centerSub) {
      els += '<text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle" fill="var(--muted)" font-size="9">' + esc(opts.centerSub) + '</text>';
    }
    return svgWrap(els, '0 0 ' + size + ' ' + size);
  };

  // ===================== 图表 23: 横向条形图 =====================
  C.hBars = function(opts) {
    opts = opts || {};
    var data = opts.data || []; // [{label:'钢琴',value:88,color:'#6366f1'}]
    var maxVal = opts.maxVal || 100;
    var w = 420, rowH = 28, gap = 6;
    var barMaxW = w - 100;
    var els = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var y = i * (rowH + gap) + 4;
      var bw = (d.value / maxVal) * barMaxW;
      var fill = d.color || 'var(--accent)';
      els += '<text x="10" y="' + (y + rowH/2 + 4) + '" fill="var(--ink)" font-size="11" font-weight="500">' + esc(d.label) + '</text>';
      els += '<rect x="80" y="' + y + '" width="' + barMaxW + '" height="' + rowH + '" rx="4" fill="var(--glass-bg)" stroke="var(--rule)" stroke-width="1"/>';
      els += '<rect x="80" y="' + y + '" width="' + bw.toFixed(1) + '" height="' + rowH + '" rx="4" fill="' + fill + '" opacity="0.8" style="transition:width .3s"/>';
      els += '<text x="' + (80 + bw + 6) + '" y="' + (y + rowH/2 + 4) + '" fill="var(--accent)" font-size="10" font-weight="600">' + d.value + '</text>';
    }
    var totalH = data.length * (rowH + gap) + 8;
    return svgWrap(els, '0 0 ' + w + ' ' + totalH);
  };

  // ===================== 图表 24: 带通配的通用阶梯图 =====================
  C.steps = function(opts) {
    opts = opts || {};
    var items = opts.items || [];
    var w = 420, h = 120;
    var stepW = w / (items.length + 1);
    var els = '';
    for (var i = 0; i < items.length; i++) {
      var x = (i + 0.5) * stepW;
      var stepH = (i + 1) / items.length * (h - 30);
      var y = h - 20 - stepH;
      var fill = items[i].color || 'var(--accent)';
      els += '<rect x="' + (x - stepW/2 + 5) + '" y="' + y + '" width="' + (stepW - 10) + '" height="' + stepH + '" rx="4" fill="' + fill + '" opacity="0.2" stroke="' + fill + '" stroke-width="1.5"/>';
      els += '<text x="' + x + '" y="' + (y - 6) + '" text-anchor="middle" fill="' + fill + '" font-size="11" font-weight="700">' + esc(items[i].label || '') + '</text>';
      els += '<text x="' + x + '" y="' + (h - 6) + '" text-anchor="middle" fill="var(--muted)" font-size="9">' + esc(items[i].desc || '') + '</text>';
    }
    return svgWrap(els, '0 0 ' + w + ' ' + h);
  };

  // 暴露到全局
  window.MTCharts = C;
})();
