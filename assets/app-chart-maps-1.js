/**
 * app-chart-maps-1.js
 * 乐理知识点 → 可视化图表映射数据（第一组）
 * 基础乐理 15 个 + 节奏与节拍 8 个 + 和声学 10 个 = 33 个主题
 * 每个主题配置 1-3 个图表，由 window.MTCharts 提供的渲染方法生成
 * 图表生成器定义于 app-charts.js，本文件仅提供配置映射
 */
(function() {
  'use strict';
  var Charts = window.MTCharts || {};

  // 主题ID → 图表配置数组
  window.MT_CHART_MAP_1 = {

    // ================================================================
    // 一、基础乐理（15 个主题）
    // ================================================================

    // 1. 音与音高
    'sound-pitch': [
      { title: '正弦波形示意', desc: '纯音由单一频率的正弦波构成，是最简单、最纯净的乐音波形', render: function() { return Charts.waveform({ type: 'sine', freq: 2, label: '正弦波 — 纯音' }); }},
      { title: '音高与频率', desc: 'C4(约 261.6Hz)与标准音 A4(440Hz)在钢琴键盘上的位置', render: function() { return Charts.piano({ octaves: 2, startOct: 4, highlights: [{ note: 'C', oct: 4, color: '#6366f1', label: 'C4' }, { note: 'A', oct: 4, color: '#ec4899', label: 'A4=440Hz' }] }); }}
    ],

    // 2. 音符与休止符
    'notes-rests': [
      { title: '音符时值关系', desc: '从全音符到十六分音符，每个音符的时值为前一个的一半', render: function() { return Charts.noteValues({ notes: [{ name: '全音符', ratio: 4, symbol: '𝅝' }, { name: '二分音符', ratio: 2, symbol: '𝅗𝅥' }, { name: '四分音符', ratio: 1, symbol: '𝅘𝅥' }, { name: '八分音符', ratio: 0.5, symbol: '𝅘𝅥𝅮' }, { name: '十六分音符', ratio: 0.25, symbol: '𝅘𝅥𝅯' }] }); }},
      { title: '五线谱上的音符', desc: '不同音高与音值的音符在五线谱上的记写方式', render: function() { return Charts.staff({ clef: 'treble', notes: [{ step: 'C', oct: 4, color: '#6366f1', label: '1', name: 'C4' }, { step: 'E', oct: 4, color: '#10b981', label: '2', name: 'E4' }, { step: 'G', oct: 4, color: '#f59e0b', label: '3', name: 'G4' }, { step: 'C', oct: 5, color: '#ec4899', label: '4', name: 'C5' }] }); }}
    ],

    // 3. 节拍与节奏
    'rhythm-meter': [
      { title: '4/4 拍节奏格', desc: '每小节 4 拍，以四分音符为一拍，第 1 拍为强拍', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0,0] }); }},
      { title: '3/4 拍节奏格', desc: '每小节 3 拍，圆舞曲节拍，强弱弱循环', render: function() { return Charts.rhythmGrid({ beats: 3, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0] }); }}
    ],

    // 4. 五线谱
    'staff-notation': [
      { title: '高音谱号记谱', desc: '高音谱号(G 谱号)下的音符位置，下加一线为中央 C', render: function() { return Charts.staff({ clef: 'treble', notes: [{ step: 'C', oct: 4, color: '#6366f1', label: 'Do', name: 'C4' }, { step: 'E', oct: 4, color: '#3b82f6', label: 'Mi', name: 'E4' }, { step: 'G', oct: 4, color: '#10b981', label: 'Sol', name: 'G4' }, { step: 'C', oct: 5, color: '#f59e0b', label: 'Do', name: 'C5' }] }); }},
      { title: '低音谱号记谱', desc: '低音谱号(F 谱号)下的音符位置，第二线为 F3', render: function() { return Charts.staff({ clef: 'bass', notes: [{ step: 'G', oct: 2, color: '#6366f1', label: 'Sol', name: 'G2' }, { step: 'B', oct: 2, color: '#3b82f6', label: 'Si', name: 'B2' }, { step: 'D', oct: 3, color: '#10b981', label: 'Re', name: 'D3' }, { step: 'F', oct: 3, color: '#f59e0b', label: 'Fa', name: 'F3' }] }); }}
    ],

    // 5. 音程
    'intervals': [
      { title: '音程矩阵', desc: '十三种基本音程的半音数与协和性一览', render: function() { return Charts.intervalMatrix({ data: [{ name: '纯一度', semitones: 0, consonant: true }, { name: '小二度', semitones: 1, consonant: false }, { name: '大二度', semitones: 2, consonant: false }, { name: '小三度', semitones: 3, consonant: true }, { name: '大三度', semitones: 4, consonant: true }, { name: '纯四度', semitones: 5, consonant: true }, { name: '增四度', semitones: 6, consonant: false }, { name: '纯五度', semitones: 7, consonant: true }, { name: '小六度', semitones: 8, consonant: true }, { name: '大六度', semitones: 9, consonant: true }, { name: '小七度', semitones: 10, consonant: false }, { name: '大七度', semitones: 11, consonant: false }, { name: '纯八度', semitones: 12, consonant: true }] }); }},
      { title: '大三度音程', desc: 'C 到 E 为大三度，相距 4 个半音，属于协和音程', render: function() { return Charts.piano({ octaves: 2, startOct: 4, highlights: [{ note: 'C', oct: 4, color: '#6366f1', label: '根音' }, { note: 'E', oct: 4, color: '#ec4899', label: '大三度' }] }); }}
    ],

    // 6. 音阶
    'scales': [
      { title: 'C 大调音阶级数', desc: 'C 大调由七个音级构成，全全半全全全半的音程结构', render: function() { return Charts.scaleDegrees({ degrees: ['1','2','3','4','5','6','7','1'], labels: ['主音','上主音','中音','下属音','属音','下中音','导音','主音'], intervals: ['W','W','H','W','W','W','H'] }); }},
      { title: 'C 大调音阶键盘', desc: 'C 大调音阶在钢琴上的位置，全部为白键', render: function() { return Charts.piano({ octaves: 2, startOct: 4, highlights: [{ note: 'C', oct: 4, color: '#6366f1', label: '1' }, { note: 'D', oct: 4, color: '#818cf8', label: '2' }, { note: 'E', oct: 4, color: '#3b82f6', label: '3' }, { note: 'F', oct: 4, color: '#06b6d4', label: '4' }, { note: 'G', oct: 4, color: '#10b981', label: '5' }, { note: 'A', oct: 4, color: '#84cc16', label: '6' }, { note: 'B', oct: 4, color: '#f59e0b', label: '7' }, { note: 'C', oct: 5, color: '#ec4899', label: '1' }] }); }}
    ],

    // 7. 调式
    'modes': [
      { title: '调式色彩光谱', desc: '从最明亮到最暗淡的七种教会调式色彩排列', render: function() { return Charts.modeSpectrum({ modes: [{ name: 'Lydian', bright: 7 }, { name: 'Ionian', bright: 6 }, { name: 'Mixolydian', bright: 5 }, { name: 'Dorian', bright: 4 }, { name: 'Aeolian', bright: 3 }, { name: 'Phrygian', bright: 2 }, { name: 'Locrian', bright: 1 }] }); }},
      { title: 'Dorian 调式音阶', desc: 'Dorian 调式为自然小调升高第六级，全半全全全半全', render: function() { return Charts.scaleDegrees({ degrees: ['1','2','♭3','4','5','6','♭7','1'], labels: ['主音','上主音','中音','下属音','属音','下中音','下导音','主音'], intervals: ['W','H','W','W','W','H','W'] }); }}
    ],

    // 8. 调与调号
    'key-signatures': [
      { title: '五度循环圈', desc: '按纯五度关系排列的十二个调，高亮 C、G、D、F 调', render: function() { return Charts.circleOfFifths({ highlights: ['C','G','D','F'] }); }},
      { title: '调号与升降号', desc: '各调调号所包含的升号或降号数量', render: function() { return Charts.comparisonTable({ headers: ['调', '升号数', '降号数'], rows: [['C 大调','0','0'], ['G 大调','1','0'], ['D 大调','2','0'], ['A 大调','3','0'], ['F 大调','0','1'], ['B♭大调','0','2'], ['E♭大调','0','3']] }); }}
    ],

    // 9. 和弦
    'chords': [
      { title: 'C 大三和弦堆叠', desc: 'C-E-G 构成大三和弦，根音上叠置大三度与纯五度', render: function() { return Charts.chordStack({ notes: [{ name: 'C', step: 'C', oct: 3, color: '#6366f1' }, { name: 'E', step: 'E', oct: 3, color: '#3b82f6' }, { name: 'G', step: 'G', oct: 3, color: '#10b981' }], name: 'C 大三和弦' }); }},
      { title: 'C 大三和弦键盘', desc: 'C 大三和弦在钢琴键盘上的位置', render: function() { return Charts.piano({ octaves: 2, startOct: 4, highlights: [{ note: 'C', oct: 4, color: '#6366f1', label: '根' }, { note: 'E', oct: 4, color: '#3b82f6', label: '三' }, { note: 'G', oct: 4, color: '#10b981', label: '五' }] }); }}
    ],

    // 10. 音律与律制
    'tuning-systems': [
      { title: '纯五度频率比(3:2)', desc: '纯五度的频率比为 3:2，是纯律与五度相生律的生律基础', render: function() { return Charts.freqRatio({ ratios: [{ freq: 1, color: '#6366f1', label: '基波(1)' }, { freq: 1.5, color: '#ec4899', label: '纯五度(3:2)' }] }); }},
      { title: '律制对比', desc: '十二平均律与纯律(五度相生律)的特性比较', render: function() { return Charts.comparisonTable({ headers: ['特性', '十二平均律', '纯律/五度相生'], rows: [['生律方式', '八度等分 12 份', '纯五度(3:2)叠加'], ['半音关系', '各半音相等', '大小半音不一'], ['纯五度', '近似(700音分)', '纯净(702音分)'], ['转调', '自由转调', '转调受限'], ['应用', '现代通用', '早期/弦乐合唱']] }); }}
    ],

    // 11. 记谱法体系
    'notation-systems': [
      { title: '记谱法体系对比', desc: '四种主要记谱法体系的适用范围与核心特点', render: function() { return Charts.comparisonTable({ headers: ['记谱法', '适用乐器', '核心特点'], rows: [['五线谱', '通用/钢琴', '音高位置直观'], ['简谱', '声乐/民乐', '数字表示音级'], ['六线谱', '吉他', '品格位置对应'], ['Tab谱', '弹拨乐器', '指法位置明确']] }); }}
    ],

    // 12. 速度与节拍机
    'tempo-metronome': [
      { title: '速度术语与 BPM', desc: '从庄板到急板，常见意大利语速度术语及其拍速范围', render: function() { return Charts.barChart({ data: [{ label: 'Grave', value: 40, color: '#1e3a8a' }, { label: 'Largo', value: 50, color: '#1e40af' }, { label: 'Adagio', value: 70, color: '#3b82f6' }, { label: 'Andante', value: 90, color: '#06b6d4' }, { label: 'Moderato', value: 110, color: '#10b981' }, { label: 'Allegro', value: 140, color: '#f59e0b' }, { label: 'Vivace', value: 170, color: '#f97316' }, { label: 'Presto', value: 200, color: '#ef4444' }], maxVal: 208 }); }}
    ],

    // 13. 音色与泛音
    'timbre-overtone': [
      { title: '复合波形(基波+泛音)', desc: '真实乐音的波形由基波与多个泛音叠加而成，决定音色', render: function() { return Charts.waveform({ type: 'composite', freq: 2, label: '复合波形 — 基波+2次+3次谐波' }); }},
      { title: '泛音频率比', desc: '基波与整数倍泛音的频率关系(1:2:3)', render: function() { return Charts.freqRatio({ ratios: [{ freq: 1, color: '#6366f1', label: '基波(1)' }, { freq: 2, color: '#10b981', label: '八度泛音(2:1)' }, { freq: 3, color: '#f59e0b', label: '十二度泛音(3:1)' }] }); }}
    ],

    // 14. 音乐声学基础
    'acoustics-basics': [
      { title: '正弦波(纯音)', desc: '正弦波是最简单的周期波形，仅含单一频率成分', render: function() { return Charts.waveform({ type: 'sine', freq: 2, label: '正弦波 — 单一频率' }); }},
      { title: '方波(含奇次谐波)', desc: '方波由基频与奇次谐波叠加而成，音色明亮尖锐', render: function() { return Charts.waveform({ type: 'square', freq: 2, label: '方波 — 奇次谐波' }); }},
      { title: '锯齿波(含全谐波)', desc: '锯齿波含全部谐波成分，音色丰富饱满(三角波类似但仅含奇次、较柔和)', render: function() { return Charts.waveform({ type: 'sawtooth', freq: 2, label: '锯齿波 — 全谐波' }); }}
    ],

    // 15. 视唱练耳基础
    'ear-training': [
      { title: '视唱练耳训练流程', desc: '从听辨到分析的系统化练耳训练步骤', render: function() { return Charts.flow({ steps: [{ label: '听辨音高', color: '#6366f1' }, { label: '模唱复现', color: '#3b82f6' }, { label: '记谱书写', color: '#06b6d4' }, { label: '结构分析', color: '#10b981' }], direction: 'horizontal' }); }}
    ],

    // ================================================================
    // 二、节奏与节拍（8 个主题）
    // ================================================================

    // 16. 节拍与拍号
    'beat-meter': [
      { title: '2/4 拍节奏格', desc: '每小节 2 拍，进行曲常用拍号，强弱循环', render: function() { return Charts.rhythmGrid({ beats: 2, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0], accents: [1,0] }); }},
      { title: '3/4 拍节奏格', desc: '每小节 3 拍，圆舞曲节拍，强弱弱', render: function() { return Charts.rhythmGrid({ beats: 3, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0] }); }},
      { title: '4/4 拍节奏格', desc: '每小节 4 拍，最常见拍号，强弱次强弱', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0,0] }); }}
    ],

    // 17. 切分音
    'syncopation': [
      { title: '正常节奏(重拍上)', desc: '节奏重音落在节拍强位上，规整均匀', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0,0] }); }},
      { title: '切分节奏(重拍间)', desc: '重音移至弱拍或弱位，打破常规强弱规律', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0], accents: [1,0,0,0] }); }}
    ],

    // 18. 复节奏与交叉节奏
    'polyrhythm': [
      { title: '复节奏 4:3', desc: '同时进行 4 等分与 3 等分，产生交叉节奏效果', render: function() { return Charts.polyrhythm({ rings: [{ n: 4, color: '#6366f1' }, { n: 3, color: '#ec4899' }] }); }},
      { title: '复节奏 3:2', desc: '三连音对二连音，最基础的复节奏组合', render: function() { return Charts.polyrhythm({ rings: [{ n: 3, color: '#10b981' }, { n: 2, color: '#f59e0b' }] }); }}
    ],

    // 19. 变拍子
    'time-signature-changes': [
      { title: '4/4 → 3/4 变拍', desc: '拍号在行进中由 4 拍切换为 3 拍，形成节奏张力', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0], accents: [1,0,0,0] }); }},
      { title: '3/4 → 2/4 变拍', desc: '3 拍与 2 拍交替变化，打破稳定的节拍循环', render: function() { return Charts.rhythmGrid({ beats: 3, subdivisions: 4, pattern: [1,0,1,0, 1,0,1,0, 1,0,1,0], accents: [1,0,0] }); }}
    ],

    // 20. 节奏型与节奏模式
    'rhythm-patterns': [
      { title: '摇滚节奏型', desc: '强调反拍的经典摇滚节奏模式', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0], accents: [1,0,0,0] }); }},
      { title: '华尔兹节奏型', desc: '3/4 拍强弱弱的圆舞曲节奏', render: function() { return Charts.rhythmGrid({ beats: 3, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,0,0] }); }},
      { title: '拉丁节奏型', desc: '含切分与连续八分音符的拉丁律动', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,1,0,1, 1,0,1,1, 0,1,1,0, 1,1,0,1], accents: [1,0,0,0] }); }}
    ],

    // 21. 速度与表情术语
    'tempo-expressions': [
      { title: '速度术语 BPM 范围', desc: '常用速度术语对应的每分钟拍数区间', render: function() { return Charts.hBars({ data: [{ label: 'Grave', value: 40, color: '#1e3a8a' }, { label: 'Largo', value: 50, color: '#1e40af' }, { label: 'Adagio', value: 70, color: '#3b82f6' }, { label: 'Andante', value: 90, color: '#06b6d4' }, { label: 'Moderato', value: 110, color: '#10b981' }, { label: 'Allegro', value: 140, color: '#f59e0b' }, { label: 'Vivace', value: 170, color: '#f97316' }, { label: 'Presto', value: 200, color: '#ef4444' }], maxVal: 208 }); }},
      { title: '常见表情术语', desc: '影响音乐表现力的常见表情与演奏术语', render: function() { return Charts.infoCards({ cards: [{ icon: '♪', title: 'dolce', text: '柔美甜美地', color: '#ec4899' }, { icon: '♫', title: 'cantabile', text: '如歌地', color: '#6366f1' }, { icon: '!', title: 'agitato', text: '激动不安地', color: '#ef4444' }, { icon: '~', title: 'tranquillo', text: '宁静地', color: '#10b981' }] }); }}
    ],

    // 22. 律动与 Groove
    'groove-feel': [
      { title: '律动节奏格', desc: '含重音位移与微弱延迟的 Groove 律动模式', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0], accents: [1,0,0,0] }); }},
      { title: '律动核心要素', desc: '构成 Groove 律动感的三大核心要素', render: function() { return Charts.infoCards({ cards: [{ icon: '♪', title: '节奏型', text: '反复出现的节奏动机', color: '#6366f1' }, { icon: '♛', title: '重音位移', text: '重音偏离强拍产生推动力', color: '#ec4899' }, { icon: '≈', title: '微时值差', text: '人性化的小时间偏差', color: '#10b981' }] }); }}
    ],

    // 23. 节奏记谱进阶
    'advanced-notation': [
      { title: '密集十六分音符', desc: '一拍四个十六分音符的连续密集节奏', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1], accents: [1,0,0,0] }); }},
      { title: '切分十六分节奏', desc: '在十六分音符弱位上重音的复杂切分节奏', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,1,1, 0,1,0,1, 1,0,1,1, 0,1,0,1], accents: [1,0,0,0] }); }}
    ],

    // ================================================================
    // 三、和声学（10 个主题）
    // ================================================================

    // 24. 和声功能体系
    'harmonic-functions': [
      { title: '和声功能三角(T-S-D)', desc: '主(T)、下属(S)、属(D)三大功能组的功能循环关系', render: function() { return Charts.functionTriangle(); }}
    ],

    // 25. 和弦进行
    'chord-progressions': [
      { title: 'I-V-vi-IV 进行', desc: '流行音乐中最经典的四个和弦循环进行', render: function() { return Charts.flow({ steps: [{ label: 'I (C)', color: '#6366f1' }, { label: 'V (G)', color: '#ec4899' }, { label: 'vi (Am)', color: '#f59e0b' }, { label: 'IV (F)', color: '#10b981' }], direction: 'horizontal' }); }},
      { title: '进行结构比例', desc: '各和弦在循环中所占的时值比例', render: function() { return Charts.structureBlocks({ sections: [{ label: 'I', ratio: 3, color: '#6366f1', desc: '主' }, { label: 'V', ratio: 1, color: '#ec4899', desc: '属' }, { label: 'vi', ratio: 2, color: '#f59e0b', desc: '主' }, { label: 'IV', ratio: 2, color: '#10b981', desc: '下属' }] }); }}
    ],

    // 26. 和弦外音
    'non-chord-tones': [
      { title: '和弦外音类型对比', desc: '六种主要和弦外音的特点与运用方式', render: function() { return Charts.comparisonTable({ headers: ['类型', '运动方向', '特点'], rows: [['经过音', '级进', '连接两个和弦音'], ['辅助音', '级进往返', '装饰单和弦音'], ['延留音', '同音延留', '强拍延后解决'], ['先现音', '提前出现', '弱拍提前预示'], ['倚音', '跳进级出', '强拍上的外音'], ['换音', '跳进级出', '反向跳进装饰']] }); }}
    ],

    // 27. 转调技术
    'modulation': [
      { title: '近关系调转调', desc: '五度循环圈高亮 C 大调及其近关系调(G、F 等)', render: function() { return Charts.circleOfFifths({ highlights: ['C','G','F','D'] }); }}
    ],

    // 28. 和声节奏
    'harmonic-rhythm': [
      { title: '慢和声节奏(一小节一和弦)', desc: '和弦持续整个小节，和声节奏缓慢', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1], accents: [1,0,0,0] }); }},
      { title: '快和声节奏(每拍一和弦)', desc: '每拍更换一个和弦，和声变化密集', render: function() { return Charts.rhythmGrid({ beats: 4, subdivisions: 4, pattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], accents: [1,1,1,1] }); }}
    ],

    // 29. 副属和弦与副导和弦
    'secondary-dominants': [
      { title: 'V7/V 和弦(D7)', desc: 'C 大调中 V7/V 为 D7，由 D-F♯-A-C 构成', render: function() { return Charts.chordStack({ notes: [{ name: 'D', step: 'D', oct: 3, color: '#6366f1' }, { name: 'F♯', step: 'F', oct: 3, color: '#3b82f6' }, { name: 'A', step: 'A', oct: 3, color: '#10b981' }, { name: 'C', step: 'C', oct: 4, color: '#ec4899' }], name: 'V7/V (D7)' }); }},
      { title: 'V7/V 解决进行', desc: 'V7/V(D7) → V(G) → I(C) 的典型解决路径', render: function() { return Charts.flow({ steps: [{ label: 'V7/V (D7)', color: '#6366f1' }, { label: 'V (G)', color: '#ec4899' }, { label: 'I (C)', color: '#10b981' }], direction: 'horizontal' }); }}
    ],

    // 30. 持续音与踏板音
    'pedal-point': [
      { title: '持续音(踏板音)', desc: '低音声部持续保持同一音(如 C)，上方声部和声变化', render: function() { return Charts.staff({ clef: 'bass', notes: [{ step: 'C', oct: 2, color: '#6366f1', label: '持续', name: 'C2' }, { step: 'C', oct: 2, color: '#6366f1', label: '', name: 'C2' }, { step: 'C', oct: 2, color: '#6366f1', label: '', name: 'C2' }, { step: 'C', oct: 2, color: '#6366f1', label: '', name: 'C2' }] }); }}
    ],

    // 31. 和声分析方法论
    'harmony-analysis': [
      { title: '和声分析流程', desc: '从确定调性到识别进行的系统化分析步骤', render: function() { return Charts.flow({ steps: [{ label: '确定调性', color: '#6366f1' }, { label: '标记和弦', color: '#3b82f6' }, { label: '分析功能', color: '#06b6d4' }, { label: '识别进行', color: '#10b981' }, { label: '总结结构', color: '#f59e0b' }], direction: 'vertical' }); }}
    ],

    // 32. 色彩和声
    'chromatic-harmony': [
      { title: '那不勒斯六和弦(N6)', desc: '降低二级和弦的第一转位，含降二级音的色彩和弦', render: function() { return Charts.chordStack({ notes: [{ name: 'D♭', step: 'D', oct: 3, color: '#6366f1' }, { name: 'F', step: 'F', oct: 3, color: '#3b82f6' }, { name: 'A♭', step: 'A', oct: 3, color: '#10b981' }], name: '那不勒斯六和弦' }); }},
      { title: '意大利增六和弦', desc: '含增六度音程的色彩和弦，倾向解决到属和弦', render: function() { return Charts.chordStack({ notes: [{ name: 'A♭', step: 'A', oct: 3, color: '#ec4899' }, { name: 'C', step: 'C', oct: 4, color: '#f59e0b' }, { name: 'F♯', step: 'F', oct: 4, color: '#10b981' }], name: '意大利增六和弦' }); }}
    ],

    // 33. 现代和声概念
    'modern-harmony': [
      { title: '传统与现代和声对比', desc: '从调性到色彩、从功能到非功能的和声观念演变', render: function() { return Charts.comparisonTable({ headers: ['方面', '传统和声', '现代和声'], rows: [['调性中心', '明确单一', '模糊或多调性'], ['和弦结构', '三度叠置', '四度/音簇/复合'], ['功能逻辑', 'T-S-D 功能', '色彩/非功能'], ['音阶来源', '大小调音阶', '教会调式/合成音阶'], ['进行原则', '解决与回避', '平行/色彩移动']] }); }}
    ]

  };
})();
