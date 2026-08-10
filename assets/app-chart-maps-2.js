/**
 * app-chart-maps-2.js
 * 乐理知识点图表映射数据（第二组）
 * 中级乐理 8 + 高级乐理 8 + 乐器知识 12 + 练耳与视唱 6 = 34 个主题
 * 图表生成器在全局对象 window.MTCharts 中定义
 */
(function(){
  var Charts = window.MTCharts || {};

  window.MT_CHART_MAP_2 = {

    // ==================== 中级乐理 (8个) ====================
    // 注：chord-progressions 与 modulation 已在第一组映射，此处跳过

    // 1. harmony — 和声学
    'harmony': [
      {
        title: '功能三角图',
        desc: '主(T)、下属(S)、属(D)三大功能及其 T-S-D-T 循环关系',
        render: function() {
          return Charts.functionTriangle();
        }
      },
      {
        title: '终止式类型对比',
        desc: '五种常见终止式的和弦进行、效果与用途',
        render: function() {
          return Charts.comparisonTable({
            headers: ['终止式', '和弦进行', '效果', '用途'],
            rows: [
              ['完满终止', 'V7-I', '强烈归属', '结束全曲'],
              ['不完满终止', 'V-I', '较弱归属', '段落停顿'],
              ['半终止', '...-V', '悬而未决', '乐句停顿'],
              ['变格终止', 'IV-I', '柔和色彩', '教会/浪漫'],
              ['阻碍终止', 'V-VI', '意外转折', '扩展乐段']
            ]
          });
        }
      }
    ],

    // 2. musical-form — 曲式
    'musical-form': [
      {
        title: 'A-B-A 三段体',
        desc: '呈示-对比-再现的经典三段式结构',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 3, color: '#6366f1', desc: '呈示' },
              { label: 'B', ratio: 2, color: '#ec4899', desc: '对比' },
              { label: 'A', ratio: 3, color: '#6366f1', desc: '再现' }
            ]
          });
        }
      },
      {
        title: '回旋曲式',
        desc: '主部(A)与插部(B/C)交替出现的结构',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 2, color: '#6366f1', desc: '主部' },
              { label: 'B', ratio: 1.5, color: '#3b82f6', desc: '插部一' },
              { label: 'A', ratio: 1, color: '#6366f1', desc: '主部' },
              { label: 'C', ratio: 1.5, color: '#8b5cf6', desc: '插部二' },
              { label: 'A', ratio: 2, color: '#6366f1', desc: '主部' }
            ]
          });
        }
      }
    ],

    // 3. dynamics-expression — 力度与表情记号
    'dynamics-expression': [
      {
        title: '力度等级',
        desc: '从极弱(pp)到极强(ff)的六个力度层次',
        render: function() {
          return Charts.hBars({
            data: [
              { label: 'pp 极弱', value: 20, color: '#6366f1' },
              { label: 'p 弱', value: 35, color: '#3b82f6' },
              { label: 'mp 中弱', value: 50, color: '#0ea5e9' },
              { label: 'mf 中强', value: 65, color: '#f59e0b' },
              { label: 'f 强', value: 80, color: '#f97316' },
              { label: 'ff 极强', value: 100, color: '#ef4444' }
            ],
            maxVal: 100
          });
        }
      },
      {
        title: '常见表情记号',
        desc: '力度变化与演奏法术语对照表',
        render: function() {
          return Charts.comparisonTable({
            headers: ['术语', '含义', '术语', '含义'],
            rows: [
              ['cresc.', '渐强', 'dim.', '渐弱'],
              ['rit.', '渐慢', 'accel.', '渐快'],
              ['dolce', '甜美地', 'cantabile', '如歌地'],
              ['legato', '连奏', 'staccato', '断奏'],
              ['fp', '强后即弱', 'sfp', '突强后弱']
            ]
          });
        }
      }
    ],

    // 4. ornaments — 装饰音
    'ornaments': [
      {
        title: '装饰音展示',
        desc: '五线谱上的常见装饰音位置与类型标注',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            notes: [
              { step: 'C', oct: 4, label: '颤音', name: 'tr', color: '#6366f1' },
              { step: 'D', oct: 4, label: '波音', name: 'mordent', color: '#3b82f6' },
              { step: 'E', oct: 4, label: '回音', name: 'turn', color: '#0ea5e9' },
              { step: 'G', oct: 4, label: '倚音', name: 'appoggiatura', color: '#8b5cf6' },
              { step: 'C', oct: 5, label: '滑音', name: 'glissando', color: '#ec4899' }
            ],
            width: 420
          });
        }
      },
      {
        title: '装饰音类型',
        desc: '五种主要装饰音的奏法与特点',
        render: function() {
          return Charts.comparisonTable({
            headers: ['名称', '符号', '奏法', '特点'],
            rows: [
              ['颤音', 'tr', '主音与上方音快速交替', '华丽闪烁'],
              ['波音', 'mordent', '主-上-主快速交替', '轻巧装饰'],
              ['回音', 'turn', '上-主-下-主环绕', '优雅流转'],
              ['倚音', 'appoggiatura', '强拍上的装饰音', '富有表情'],
              ['滑音', 'glissando', '快速划过音阶', '连贯流动']
            ]
          });
        }
      }
    ],

    // 5. figured-bass — 数字低音与通奏低音
    'figured-bass': [
      {
        title: '数字低音符号',
        desc: '通奏低音中数字标记与和弦类型、转位的对应关系',
        render: function() {
          return Charts.comparisonTable({
            headers: ['数字', '低音上方音程', '和弦类型', '记法示例'],
            rows: [
              ['5/3', '三度+五度', '三和弦(原位)', 'C: C-E-G'],
              ['6/3', '三度+六度', '第一转位', 'C/E: E-G-C'],
              ['6/4', '四度+六度', '第二转位', 'C/G: G-C-E'],
              ['7', '三度+五度+七度', '七和弦(原位)', 'G7: G-B-D-F'],
              ['6/5', '三度+六度+七度', '七和弦第一转位', 'G7/B: B-D-F-G'],
              ['4/3', '四度+六度+七度', '七和弦第二转位', 'G7/D: D-F-G-B'],
              ['4/2', '二度+四度+六度', '七和弦第三转位', 'G7/F: F-G-B-D']
            ],
            highlightCol: 2
          });
        }
      }
    ],

    // 6. texture — 音乐织体
    'texture': [
      {
        title: '织体类型',
        desc: '单声、复调、主调三大织体分类及其子类',
        render: function() {
          return Charts.tree({
            root: {
              label: '音乐织体',
              children: [
                {
                  label: '单声织体',
                  children: [
                    { label: '单旋律' },
                    { label: '齐奏齐唱' }
                  ]
                },
                {
                  label: '复调织体',
                  children: [
                    { label: '对比复调' },
                    { label: '模仿复调' }
                  ]
                },
                {
                  label: '主调织体',
                  children: [
                    { label: '旋律+伴奏' },
                    { label: '和声性织体' }
                  ]
                }
              ]
            },
            maxDepth: 3
          });
        }
      }
    ],

    // 7. melody-development — 旋律分析与发展
    'melody-development': [
      {
        title: '旋律发展手法',
        desc: '从重复到对比的五种基本旋律发展手段',
        render: function() {
          return Charts.steps({
            items: [
              { label: '重复', desc: '原样再现', color: '#6366f1' },
              { label: '变奏', desc: '变化再现', color: '#3b82f6' },
              { label: '模进', desc: '音高移位', color: '#0ea5e9' },
              { label: '展开', desc: '动机发展', color: '#8b5cf6' },
              { label: '对比', desc: '引入新材料', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 8. tonal-layout — 调性布局与大型曲式
    'tonal-layout': [
      {
        title: '调性布局',
        desc: '大型曲式中调性中心的规划、展开与回归',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'I', ratio: 3, color: '#6366f1', desc: '主调-呈示' },
              { label: 'V', ratio: 2, color: '#3b82f6', desc: '属调-展开' },
              { label: 'vi', ratio: 1.5, color: '#8b5cf6', desc: '关系小调' },
              { label: 'IV', ratio: 1.5, color: '#0ea5e9', desc: '下属调' },
              { label: 'I', ratio: 2, color: '#6366f1', desc: '主调-回归' }
            ]
          });
        }
      }
    ],

    // ==================== 高级乐理 (8个) ====================

    // 9. jazz-harmony — 爵士和声
    'jazz-harmony': [
      {
        title: 'Cmaj7 大七和弦',
        desc: '根音C、大三度E、纯五度G、大七度B',
        render: function() {
          return Charts.chordStack({
            notes: [
              { name: 'C', step: 'C', oct: 4, color: '#6366f1' },
              { name: 'E', step: 'E', oct: 4, color: '#6366f1' },
              { name: 'G', step: 'G', oct: 4, color: '#6366f1' },
              { name: 'B', step: 'B', oct: 4, color: '#6366f1' }
            ],
            name: 'Cmaj7'
          });
        }
      },
      {
        title: 'G7 属七和弦',
        desc: '根音G、大三度B、纯五度D、小七度F',
        render: function() {
          return Charts.chordStack({
            notes: [
              { name: 'G', step: 'G', oct: 4, color: '#ec4899' },
              { name: 'B', step: 'B', oct: 4, color: '#ec4899' },
              { name: 'D', step: 'D', oct: 5, color: '#ec4899' },
              { name: 'F', step: 'F', oct: 5, color: '#ec4899' }
            ],
            name: 'G7'
          });
        }
      },
      {
        title: '爵士与传统和声对比',
        desc: '两种和声体系在结构、色彩、进行上的核心差异',
        render: function() {
          return Charts.comparisonTable({
            headers: ['特征', '传统和声', '爵士和声'],
            rows: [
              ['和弦结构', '三和弦为主', '七和弦为基础'],
              ['色彩扩展', '少量外音', '9/11/13音丰富'],
              ['进行逻辑', 'T-S-D-T功能', 'ii-V-I进行'],
              ['调性中心', '明确单一', '可多调性游移'],
              ['半音使用', '节制', '大量半音化']
            ],
            highlightCol: 2
          });
        }
      }
    ],

    // 10. counterpoint — 对位法
    'counterpoint': [
      {
        title: '对位-高声部',
        desc: '上方声部旋律线(高音谱号)',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            notes: [
              { step: 'E', oct: 4, name: '' },
              { step: 'F', oct: 4, name: '' },
              { step: 'G', oct: 4, name: '' },
              { step: 'A', oct: 4, name: '' },
              { step: 'G', oct: 4, name: '' },
              { step: 'F', oct: 4, name: '' },
              { step: 'E', oct: 4, name: '' }
            ],
            width: 420
          });
        }
      },
      {
        title: '对位-低声部',
        desc: '下方声部旋律线(低音谱号)，与高声部形成音程关系',
        render: function() {
          return Charts.staff({
            clef: 'bass',
            notes: [
              { step: 'C', oct: 2, name: '' },
              { step: 'D', oct: 2, name: '' },
              { step: 'E', oct: 2, name: '' },
              { step: 'F', oct: 2, name: '' },
              { step: 'E', oct: 2, name: '' },
              { step: 'D', oct: 2, name: '' },
              { step: 'C', oct: 2, name: '' }
            ],
            width: 420
          });
        }
      },
      {
        title: '对位法类型',
        desc: '不同历史时期与声部关系的对位分类',
        render: function() {
          return Charts.comparisonTable({
            headers: ['类型', '声部关系', '时期', '代表'],
            rows: [
              ['严格对位', '遵循教会调式规则', '文艺复兴', '帕勒斯特里那'],
              ['自由对位', '较灵活半音化', '巴洛克', 'J.S.巴赫'],
              ['单对位', '声部同时结合', '通用', '—'],
              ['复对位', '声部可互换位置', '巴洛克', '赋格曲']
            ]
          });
        }
      }
    ],

    // 11. twelve-tone — 十二音技法
    'twelve-tone': [
      {
        title: '十二音原形序列',
        desc: '十二个半音各出现一次的基本序列(P)，标注序列序号',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            notes: [
              { step: 'C', oct: 4, name: '1' },
              { step: 'A', oct: 4, name: '2' },
              { step: 'G', oct: 4, name: '3' },
              { step: 'E', oct: 4, name: '4' },
              { step: 'F', oct: 4, name: '5' },
              { step: 'D', oct: 5, name: '6' },
              { step: 'B', oct: 4, name: '7' },
              { step: 'G', oct: 5, name: '8' },
              { step: 'E', oct: 5, name: '9' },
              { step: 'A', oct: 5, name: '10' },
              { step: 'F', oct: 5, name: '11' },
              { step: 'D', oct: 4, name: '12' }
            ],
            width: 460
          });
        }
      },
      {
        title: '序列的四种形式',
        desc: 'P(原形)、R(逆行)、I(倒影)、RI(逆行倒影)四种基本变换',
        render: function() {
          return Charts.comparisonTable({
            headers: ['形式', '说明', '记号', '特征'],
            rows: [
              ['P 原形', '作曲家设定的基本序列', 'P0', '十二音各出现一次'],
              ['R 逆行', 'P从末音至首音逆向演奏', 'R0', '音高顺序倒序'],
              ['I 倒影', 'P以某轴对称反转音高', 'I0', '音程方向相反'],
              ['RI 逆行倒影', 'I的逆行', 'RI0', 'I从末至首演奏']
            ]
          });
        }
      }
    ],

    // 12. modern-techniques — 现代作曲技法
    'modern-techniques': [
      {
        title: '现代作曲技法',
        desc: '二十世纪以来的主要作曲技法与流派',
        render: function() {
          return Charts.comparisonTable({
            headers: ['技法', '特点', '代表作曲家', '时期'],
            rows: [
              ['序列主义', '音高节奏等参数序列化', '勋伯格/韦伯恩', '20世纪初'],
              ['微音程', '使用小于半音的音程', '哈巴/帕奇', '20世纪'],
              ['音簇', '密集半音叠加成音块', '利盖蒂/潘德列茨基', '20世纪中'],
              ['简约主义', '重复与微小渐变', '赖利/格拉斯/赖克', '20世纪后期'],
              ['偶然音乐', '引入随机性与不确定性', '凯奇', '20世纪中'],
              ['拼贴/引用', '融合多种风格与历史素材', '贝里奥/罗奇伯格', '20世纪后期']
            ]
          });
        }
      }
    ],

    // 13. post-tonal — 后调性音乐
    'post-tonal': [
      {
        title: '后调性音乐流派',
        desc: '摆脱传统调性束缚后的主要音乐方向',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '序列', title: '序列主义', text: '将音高、节奏等参数按序列组织，彻底摆脱调性中心', color: '#6366f1' },
              { icon: '音簇', title: '音簇技法', text: '由相邻半音密集叠加形成音块，色彩强烈震撼', color: '#3b82f6' },
              { icon: '偶然', title: '偶然音乐', text: '引入随机性与不确定性，每次演奏皆为不同版本', color: '#0ea5e9' },
              { icon: '简约', title: '简约主义', text: '通过重复与微小渐变产生催眠式的听觉效果', color: '#8b5cf6' },
              { icon: '集合', title: '集合理论', text: '用音级集合分析后调性音乐的音高组织关系', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 14. microtones — 微分音与非常规音高
    'microtones': [
      {
        title: '微分音键盘',
        desc: '24平均律概念：在12个半音间插入四分之一音(橙色标记位置)',
        render: function() {
          return Charts.piano({
            octaves: 2,
            startOct: 4,
            highlights: [
              { note: 'C', oct: 4, color: '#6366f1', label: 'C' },
              { note: 'C\u266f', oct: 4, color: '#f59e0b', label: '\u00bc' },
              { note: 'D', oct: 4, color: '#6366f1', label: 'D' },
              { note: 'D\u266f', oct: 4, color: '#f59e0b', label: '\u00bc' },
              { note: 'E', oct: 4, color: '#6366f1', label: 'E' },
              { note: 'F', oct: 4, color: '#6366f1', label: 'F' },
              { note: 'F\u266f', oct: 4, color: '#f59e0b', label: '\u00bc' },
              { note: 'G', oct: 4, color: '#6366f1', label: 'G' },
              { note: 'G\u266f', oct: 4, color: '#f59e0b', label: '\u00bc' },
              { note: 'A', oct: 4, color: '#6366f1', label: 'A' },
              { note: 'A\u266f', oct: 4, color: '#f59e0b', label: '\u00bc' },
              { note: 'B', oct: 4, color: '#6366f1', label: 'B' }
            ]
          });
        }
      }
    ],

    // 15. set-theory — 音乐集合理论深化
    'set-theory': [
      {
        title: '集合理论核心概念',
        desc: '艾伦\u00b7福特音级集合理论的主要分析工具',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '集合', title: '音级集合', text: '用0-11整数表示12个半音，集合是音高的无序组合', color: '#6366f1' },
              { icon: '标准', title: '标准型', text: '将集合转位排列到最紧凑的音程形态，便于比较', color: '#3b82f6' },
              { icon: '编号', title: '福腾序号', text: '每个集合有唯一编号如3-11(大三和弦)、4-28(减七)', color: '#0ea5e9' },
              { icon: '移位', title: '移位与倒影', text: 'Tn移位n个半音，In倒影移位，保持集合等价类', color: '#8b5cf6' },
              { icon: '相似', title: '相似性关系', text: '用Rp/R1/R2等指标衡量两个集合间的相似程度', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 16. contemporary-trends — 当代音乐趋势
    'contemporary-trends': [
      {
        title: '当代音乐发展时间线',
        desc: '二十世纪至今的主要音乐流派演变',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '序列主义', start: 1920, end: 1960, color: '#6366f1' },
              { label: '偶然音乐', start: 1950, end: 1980, color: '#3b82f6' },
              { label: '简约主义', start: 1960, end: 2000, color: '#0ea5e9' },
              { label: '频谱音乐', start: 1970, end: 2020, color: '#8b5cf6' },
              { label: '新复杂主义', start: 1980, end: 2025, color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // ==================== 乐器知识 (12个) ====================

    // 17. keyboard-instruments — 键盘乐器
    'keyboard-instruments': [
      {
        title: '键盘乐器家族',
        desc: '四种主要键盘乐器的发声原理与特点',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '钢琴', title: '钢琴', text: '88键击弦发声，音域A0-C8，应用最广泛的键盘乐器', color: '#6366f1' },
              { icon: '管风', title: '管风琴', text: '气流通过音管发声，音域极广，教堂与音乐厅核心', color: '#3b82f6' },
              { icon: '羽管', title: '羽管键琴', text: '拨弦发声，巴洛克时期主要键盘乐器，音色清脆', color: '#8b5cf6' },
              { icon: '电子', title: '电子琴/合成器', text: '电子振荡发声，可模拟与创造多种音色', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 18. string-instruments — 弓弦乐器
    'string-instruments': [
      {
        title: '弓弦乐器家族',
        desc: '管弦乐队中四种弓弦乐器的定弦与音域',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '小提', title: '小提琴', text: '最高音弦乐，四弦G-D-A-E，表现力最为丰富', color: '#6366f1' },
              { icon: '中提', title: '中提琴', text: '中音弦乐，四弦C-G-D-A，音色温暖醇厚', color: '#3b82f6' },
              { icon: '大提', title: '大提琴', text: '低音弦乐，四弦C-G-D-A，音域深沉歌唱', color: '#8b5cf6' },
              { icon: '低提', title: '低音提琴', text: '最低音弦乐，四弦E-A-D-G，支撑低音声部', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 19. guitar-instruments — 拨弦乐器
    'guitar-instruments': [
      {
        title: '拨弦乐器家族',
        desc: '常见拨弦乐器的构造与音色特点',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '吉他', title: '吉他', text: '六弦E-A-D-G-B-E，尼龙或钢弦，流行与古典通用', color: '#6366f1' },
              { icon: '竖琴', title: '竖琴', text: '47弦踏板变音，音域宽广华丽，交响乐色彩乐器', color: '#3b82f6' },
              { icon: '班卓', title: '班卓琴', text: '5弦羊皮膜面，音色明亮跳跃，乡村蓝草核心', color: '#8b5cf6' },
              { icon: '电吉', title: '电吉他', text: '电磁拾音发声，可接效果器处理，摇滚乐核心', color: '#ec4899' },
              { icon: '曼陀', title: '曼陀林', text: '8弦4对定弦，拨片演奏，音色清脆明亮', color: '#0ea5e9' }
            ]
          });
        }
      }
    ],

    // 20. woodwind-instruments — 木管乐器
    'woodwind-instruments': [
      {
        title: '木管乐器分类',
        desc: '按发声方式分为无簧(长笛类)、单簧、双簧三大类',
        render: function() {
          return Charts.tree({
            root: {
              label: '木管乐器',
              children: [
                {
                  label: '无簧(长笛类)',
                  children: [
                    { label: '长笛' },
                    { label: '短笛' }
                  ]
                },
                {
                  label: '单簧',
                  children: [
                    { label: '单簧管' },
                    { label: '低音单簧管' },
                    { label: '萨克斯管' }
                  ]
                },
                {
                  label: '双簧',
                  children: [
                    { label: '双簧管' },
                    { label: '英国管' },
                    { label: '大管' },
                    { label: '低音大管' }
                  ]
                }
              ]
            },
            maxDepth: 3
          });
        }
      }
    ],

    // 21. brass-instruments — 铜管乐器
    'brass-instruments': [
      {
        title: '铜管乐器家族',
        desc: '四种主要铜管乐器的调性与音色特点',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '小号', title: '小号', text: '最高音铜管，B\u266d调，音色明亮辉煌，旋律与号角', color: '#f59e0b' },
              { icon: '圆号', title: '圆号', text: 'F调，音色圆润温暖，铜管与木管间的桥梁', color: '#6366f1' },
              { icon: '长号', title: '长号', text: '滑管变音，B\u266d调，庄严有力，低音铜管核心', color: '#3b82f6' },
              { icon: '大号', title: '大号', text: '最低音铜管，F/E\u266d调，支撑整个铜管低音', color: '#8b5cf6' }
            ]
          });
        }
      }
    ],

    // 22. percussion-instruments — 打击乐器
    'percussion-instruments': [
      {
        title: '打击乐器家族',
        desc: '有音高与无音高打击乐器的代表',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '定音', title: '定音鼓', text: '有音高，踏板调音，管弦乐核心打击乐器', color: '#6366f1' },
              { icon: '军鼓', title: '小军鼓', text: '无音高，响弦振动，进行曲与流行节奏核心', color: '#3b82f6' },
              { icon: '大鼓', title: '大鼓', text: '无音高，低沉浑厚，强拍与高潮支撑', color: '#8b5cf6' },
              { icon: '钹', title: '钹', text: '无音高，金属碰撞，高潮烘托与色彩点缀', color: '#ec4899' },
              { icon: '木琴', title: '木琴/马林巴', text: '有音高，木质音条排列，色彩丰富旋律性强', color: '#0ea5e9' }
            ]
          });
        }
      }
    ],

    // 23. chinese-instruments — 中国民族乐器
    'chinese-instruments': [
      {
        title: '中国民族乐器分类',
        desc: '按演奏方式分为吹管、拉弦、弹拨、打击四大类',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '吹管', title: '吹管乐器', text: '笛子、箫、唢呐、管子、笙，气息振动发声', color: '#6366f1' },
              { icon: '拉弦', title: '拉弦乐器', text: '二胡、板胡、京胡、马头琴，弓毛擦弦发声', color: '#3b82f6' },
              { icon: '弹拨', title: '弹拨乐器', text: '琵琶、古筝、古琴、中阮、柳琴，手指拨弦', color: '#8b5cf6' },
              { icon: '打击', title: '打击乐器', text: '堂鼓、锣、钹、编钟、云锣，敲击振动发声', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 24. electronic-instruments — 电子乐器与合成器
    'electronic-instruments': [
      {
        title: '电子乐器与合成器',
        desc: '电子发声乐器的主要类型与原理',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '模拟', title: '模拟合成器', text: '振荡器产生波形，滤波器塑形，音色温暖厚实', color: '#6366f1' },
              { icon: '数字', title: '数字合成器', text: '数字算法生成音色，FM与Wavetable合成', color: '#3b82f6' },
              { icon: '采样', title: '采样器', text: '录制真实乐器音色并回放，逼真还原原声', color: '#0ea5e9' },
              { icon: '鼓机', title: '鼓机', text: '电子鼓节奏生成器，步进式模式编辑', color: '#8b5cf6' },
              { icon: 'DAW', title: 'DAW工作站', text: '数字音频工作站，集录音编曲混音于一体', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // 25. world-instruments — 世界民族乐器
    'world-instruments': [
      {
        title: '世界民族乐器',
        desc: '各大洲代表性传统乐器',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '西塔', title: '西塔尔(印度)', text: '长颈拨弦，共鸣弦丰富，演奏拉格旋律', color: '#6366f1' },
              { icon: '塔布', title: '塔布拉鼓(印度)', text: '双鼓组合手击，节奏体系极为复杂精妙', color: '#3b82f6' },
              { icon: '乌德', title: '乌德琴(中东)', text: '短颈拨弦无品，阿拉伯音乐核心乐器', color: '#0ea5e9' },
              { icon: '尺八', title: '尺八(日本)', text: '五孔竹笛，禅意音色，气息控制精微', color: '#8b5cf6' },
              { icon: '非洲', title: '非洲鼓(西非)', text: '高脚手鼓，音色丰富，社群音乐核心', color: '#ec4899' },
              { icon: '风笛', title: '风笛(苏格兰)', text: '风袋供气持续发声，高地文化象征', color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    // 26. voice-types — 人声分类
    'voice-types': [
      {
        title: '人声音域',
        desc: '各声部音域高低对比(条形长度代表相对音高位置)',
        render: function() {
          return Charts.hBars({
            data: [
              { label: '女高 Soprano', value: 95, color: '#ec4899' },
              { label: '女中 Mezzo', value: 82, color: '#8b5cf6' },
              { label: '女低 Alto', value: 70, color: '#6366f1' },
              { label: '男高 Tenor', value: 75, color: '#3b82f6' },
              { label: '男中 Baritone', value: 62, color: '#0ea5e9' },
              { label: '男低 Bass', value: 50, color: '#64748b' }
            ],
            maxVal: 100
          });
        }
      }
    ],

    // 27. instrument-classification — 乐器学分类法
    'instrument-classification': [
      {
        title: 'Hornbostel-Sachs 分类',
        desc: '按发声方式将乐器分为体鸣、膜鸣、弦鸣、气鸣、电鸣五大类',
        render: function() {
          return Charts.tree({
            root: {
              label: 'Hornbostel-Sachs',
              children: [
                {
                  label: '体鸣乐器',
                  children: [
                    { label: '木琴' },
                    { label: '钹/锣' }
                  ]
                },
                {
                  label: '膜鸣乐器',
                  children: [
                    { label: '定音鼓' },
                    { label: '小军鼓' }
                  ]
                },
                {
                  label: '弦鸣乐器',
                  children: [
                    { label: '擦弦(小提琴)' },
                    { label: '拨弦(吉他)' },
                    { label: '击弦(钢琴)' }
                  ]
                },
                {
                  label: '气鸣乐器',
                  children: [
                    { label: '长笛' },
                    { label: '铜管' }
                  ]
                },
                {
                  label: '电鸣乐器',
                  children: [
                    { label: '合成器' },
                    { label: '电吉他' }
                  ]
                }
              ]
            },
            maxDepth: 3
          });
        }
      }
    ],

    // 28. instrument-maintenance — 乐器保养与维护
    'instrument-maintenance': [
      {
        title: '乐器保养要点',
        desc: '延长乐器寿命与保持音色的关键措施',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '温湿', title: '温湿度控制', text: '保持40-60%湿度，避免木材开裂变形或金属生锈', color: '#6366f1' },
              { icon: '清洁', title: '定期清洁', text: '演奏后擦拭，清除汗渍松香与灰尘积垢', color: '#3b82f6' },
              { icon: '调试', title: '定期调试', text: '调音、换弦、机械保养与零件润滑', color: '#0ea5e9' },
              { icon: '存放', title: '妥善存放', text: '琴盒存放，避免挤压碰撞与极端环境', color: '#8b5cf6' },
              { icon: '避免', title: '避免极端', text: '远离热源、阳光直射和潮湿环境', color: '#ec4899' }
            ]
          });
        }
      }
    ],

    // ==================== 练耳与视唱 (6个) ====================

    // 29. interval-recognition — 音程听辨
    'interval-recognition': [
      {
        title: '音程矩阵',
        desc: '十二种基本音程的半音数与协和性',
        render: function() {
          return Charts.intervalMatrix({});
        }
      },
      {
        title: '听辨流程',
        desc: '音程听辨的标准训练步骤',
        render: function() {
          return Charts.flow({
            steps: [
              { label: '聆听', color: '#6366f1' },
              { label: '哼唱', color: '#3b82f6' },
              { label: '数半音', color: '#0ea5e9' },
              { label: '判断协和', color: '#8b5cf6' },
              { label: '命名音程', color: '#ec4899' }
            ],
            direction: 'horizontal'
          });
        }
      }
    ],

    // 30. chord-recognition — 和弦听辨
    'chord-recognition': [
      {
        title: 'C大三和弦',
        desc: '根音C、大三度E、纯五度G',
        render: function() {
          return Charts.chordStack({
            notes: [
              { name: 'C', step: 'C', oct: 4, color: '#6366f1' },
              { name: 'E', step: 'E', oct: 4, color: '#6366f1' },
              { name: 'G', step: 'G', oct: 4, color: '#6366f1' }
            ],
            name: 'C大三和弦'
          });
        }
      },
      {
        title: 'Am小三和弦',
        desc: '根音A、小三度C、纯五度E',
        render: function() {
          return Charts.chordStack({
            notes: [
              { name: 'A', step: 'A', oct: 3, color: '#3b82f6' },
              { name: 'C', step: 'C', oct: 4, color: '#3b82f6' },
              { name: 'E', step: 'E', oct: 4, color: '#3b82f6' }
            ],
            name: 'Am小三和弦'
          });
        }
      },
      {
        title: '听辨流程',
        desc: '和弦听辨的训练步骤',
        render: function() {
          return Charts.flow({
            steps: [
              { label: '聆听色彩', color: '#6366f1' },
              { label: '判断大小', color: '#3b82f6' },
              { label: '辨别转位', color: '#0ea5e9' },
              { label: '识别七音', color: '#8b5cf6' },
              { label: '命名和弦', color: '#ec4899' }
            ],
            direction: 'horizontal'
          });
        }
      }
    ],

    // 31. rhythm-dictation — 节奏听写
    'rhythm-dictation': [
      {
        title: '4/4拍节奏格',
        desc: '四拍每拍四分音符细分的节奏型示例',
        render: function() {
          return Charts.rhythmGrid({
            beats: 4,
            subdivisions: 4,
            pattern: [1,0,1,0, 1,1,0,0, 1,0,0,1, 1,0,1,0],
            accents: [1,0,0,0]
          });
        }
      }
    ],

    // 32. melody-dictation — 旋律听写
    'melody-dictation': [
      {
        title: '旋律听写示例',
        desc: 'C大调简单旋律的记谱展示(do-mi-sol-do-la-sol-mi-do)',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            notes: [
              { step: 'C', oct: 4, name: 'do' },
              { step: 'E', oct: 4, name: 'mi' },
              { step: 'G', oct: 4, name: 'sol' },
              { step: 'C', oct: 5, name: 'do', color: '#6366f1' },
              { step: 'A', oct: 4, name: 'la' },
              { step: 'G', oct: 4, name: 'sol' },
              { step: 'E', oct: 4, name: 'mi' },
              { step: 'C', oct: 4, name: 'do' }
            ],
            width: 420
          });
        }
      }
    ],

    // 33. sight-singing — 视唱训练
    'sight-singing': [
      {
        title: 'C大调音阶级数',
        desc: '七个音级的名称与全音(W)/半音(H)关系',
        render: function() {
          return Charts.scaleDegrees({
            degrees: ['1','2','3','4','5','6','7','1'],
            labels: ['主音','上主音','中音','下属音','属音','下中音','导音','主音'],
            intervals: ['W','W','H','W','W','W','H'],
            colors: ['#6366f1','#3b82f6','#0ea5e9','#14b8a6','#8b5cf6','#d946ef','#ef4444','#6366f1']
          });
        }
      }
    ],

    // 34. perfect-pitch — 绝对音感与相对音感
    'perfect-pitch': [
      {
        title: '正弦波形',
        desc: '纯音波形(正弦波)——绝对音感识别的基础',
        render: function() {
          return Charts.waveform({
            type: 'sine',
            freq: 2,
            label: '正弦波(纯音) — 绝对音感识别基础'
          });
        }
      },
      {
        title: '绝对 vs 相对音感',
        desc: '两种音高感知能力的特点与训练方式',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '绝对', title: '绝对音感', text: '无需参照即可识别具体音高，约万分之一人口天生拥有', color: '#6366f1' },
              { icon: '相对', title: '相对音感', text: '以参照音为基准判断音程关系，可后天系统训练获得', color: '#3b82f6' },
              { icon: '训练', title: '训练方法', text: '从固定do唱名法入手，反复聆听标准音A4(440Hz)', color: '#0ea5e9' },
              { icon: '对比', title: '优劣对比', text: '绝对音感识别快但移调困难，相对音感更实用灵活', color: '#8b5cf6' }
            ]
          });
        }
      }
    ]

  };
})();
