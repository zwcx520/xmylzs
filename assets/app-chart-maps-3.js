/**
 * app-chart-maps-3.js
 * 乐理知识点图表映射数据 — 第三组
 * 曲式与体裁(8) + 音乐史与流派(8) + 作曲与编曲(6) + 数字音乐制作(6)
 * + 音乐声学(5) + 音乐分析(4) + 世界音乐(5) + 音乐教育与心理学(6) = 48个主题
 * 图表生成器依赖全局对象 window.MTCharts
 */
(function() {
  'use strict';
  var Charts = window.MTCharts || {};

  window.MT_CHART_MAP_3 = {

    // ================================================================
    // 一、曲式与体裁 (8)
    // ================================================================

    'phrase-structure': [
      {
        title: '方整乐段结构（4+4小节）',
        desc: '典型的8小节乐段由两个4小节乐句组成，前乐句以半终止收束，后乐句以全终止收束，构成问答关系',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '前乐句', ratio: 4, color: '#6366f1', desc: '半终止(V)' },
              { label: '后乐句', ratio: 4, color: '#ec4899', desc: '全终止(I)' }
            ]
          });
        }
      },
      {
        title: '乐段扩展形式',
        desc: '乐段可通过补充终止、扩充等手法扩展为非方整结构（4+4+2）',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '前句', ratio: 4, color: '#6366f1', desc: '4小节' },
              { label: '后句', ratio: 4, color: '#ec4899', desc: '4小节' },
              { label: '补充', ratio: 2, color: '#f59e0b', desc: '2小节扩充' }
            ]
          });
        }
      }
    ],

    'binary-ternary': [
      {
        title: '二段体（A-B）',
        desc: '由两个对比或互补的段落构成，A段呈示主题素材，B段展开或引入新材料，是小型器乐曲和歌曲最基本的结构',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 4, color: '#6366f1', desc: '第一段' },
              { label: 'B', ratio: 4, color: '#ec4899', desc: '第二段' }
            ]
          });
        }
      },
      {
        title: '三段体（A-B-A）',
        desc: '三段体在B段对比后回到A段再现，形成呈示—对比—再现的对称结构，是独立的器乐小品和歌曲副歌最常用的曲式',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 3, color: '#6366f1', desc: '呈示' },
              { label: 'B', ratio: 2, color: '#ec4899', desc: '对比（三声中部）' },
              { label: 'A', ratio: 3, color: '#6366f1', desc: '再现' }
            ]
          });
        }
      }
    ],

    'rondo-form': [
      {
        title: '回旋曲式（A-B-A-C-A）',
        desc: '主部主题（A）多次再现，其间插入不同的插部（B、C…），形成交替回旋的结构。古典时期常用于末乐章',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 2, color: '#6366f1', desc: '主部' },
              { label: 'B', ratio: 2, color: '#ec4899', desc: '第一插部' },
              { label: 'A', ratio: 2, color: '#6366f1', desc: '主部' },
              { label: 'C', ratio: 2, color: '#f59e0b', desc: '第二插部' },
              { label: 'A', ratio: 2, color: '#6366f1', desc: '主部' }
            ]
          });
        }
      },
      {
        title: '五部回旋曲与七部回旋曲',
        desc: '五部回旋曲（A-B-A-B-A）结构简洁，七部回旋曲（A-B-A-C-A-B-A）包含主题再现与插部对比的复杂交替',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 1, color: '#6366f1', desc: '主部' },
              { label: 'B', ratio: 1, color: '#ec4899', desc: '插部' },
              { label: 'A', ratio: 1, color: '#6366f1', desc: '主部' },
              { label: 'C', ratio: 1, color: '#f59e0b', desc: '插部' },
              { label: 'A', ratio: 1, color: '#6366f1', desc: '主部' },
              { label: 'B', ratio: 1, color: '#ec4899', desc: '插部' },
              { label: 'A', ratio: 1, color: '#6366f1', desc: '主部' }
            ]
          });
        }
      }
    ],

    'sonata-form': [
      {
        title: '奏鸣曲式三大部分',
        desc: '奏鸣曲式是古典音乐最重要的大型曲式，由呈示部、展开部、再现部三大部分构成。呈示部包含两个对比主题（主部与副部），展开部将主题素材发展变形，再现部回到调性统一',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '呈示部', ratio: 3, color: '#6366f1', desc: '主部+副部' },
              { label: '展开部', ratio: 2, color: '#f59e0b', desc: '主题发展' },
              { label: '再现部', ratio: 3, color: '#ec4899', desc: '调性统一' }
            ]
          });
        }
      },
      {
        title: '呈示部内部结构',
        desc: '呈示部由主部（第一主题，主调）、连接段、副部（第二主题，属调或关系调）和结束段构成',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '主部', ratio: 2, color: '#6366f1', desc: '第一主题' },
              { label: '连接段', ratio: 1, color: '#8b5cf6', desc: '转调过渡' },
              { label: '副部', ratio: 2, color: '#ec4899', desc: '第二主题' },
              { label: '结束段', ratio: 1, color: '#f59e0b', desc: '终止收束' }
            ]
          });
        }
      }
    ],

    'variation-form': [
      {
        title: '变奏曲式结构',
        desc: '变奏曲式以一个主题为基础，通过改变旋律、和声、节奏、织体等要素进行多次变奏，形成主题—变奏1—变奏2—变奏3…的链式结构',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '主题', ratio: 2, color: '#6366f1', desc: 'T' },
              { label: '变奏1', ratio: 2, color: '#8b5cf6', desc: 'V1' },
              { label: '变奏2', ratio: 2, color: '#ec4899', desc: 'V2' },
              { label: '变奏3', ratio: 2, color: '#f59e0b', desc: 'V3' }
            ]
          });
        }
      },
      {
        title: '变奏手法类型',
        desc: '变奏可分为装饰变奏（添加华彩音型）、性格变奏（改变速度与性格）、严格变奏（保持和声骨架）与自由变奏（改变和声与结构）',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎵', title: '装饰变奏', text: '保持旋律骨架与和声，添加经过音、辅助音等装饰', color: '#6366f1' },
              { icon: '🎭', title: '性格变奏', text: '改变速度、节拍与性格，如慢板变快板、大调变小调', color: '#ec4899' },
              { icon: '📐', title: '严格变奏', text: '保持和声进行与乐句结构不变，仅改变织体与旋律', color: '#f59e0b' },
              { icon: '🌀', title: '自由变奏', text: '可改变和声、调性甚至结构，仅保留主题核心动机', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'concerto-symphony': [
      {
        title: '交响曲四乐章结构',
        desc: '古典交响曲通常包含四个乐章：第一乐章快板（奏鸣曲式）、第二乐章慢板（抒情性）、第三乐章舞曲性（小步舞曲或谐谑曲）、第四乐章快板（终曲）',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'I', ratio: 3, color: '#6366f1', desc: '快板 奏鸣曲式' },
              { label: 'II', ratio: 2, color: '#8b5cf6', desc: '慢板 抒情' },
              { label: 'III', ratio: 2, color: '#ec4899', desc: '小步舞曲/谐谑曲' },
              { label: 'IV', ratio: 3, color: '#f59e0b', desc: '快板 终曲' }
            ]
          });
        }
      },
      {
        title: '协奏曲与交响曲对比',
        desc: '协奏曲突出独奏乐器与乐队的竞奏协作，交响曲则以管弦乐队整体表现。两者乐章结构相似但角色不同',
        render: function() {
          return Charts.comparisonTable({
            headers: ['特征', '协奏曲', '交响曲'],
            rows: [
              ['编制', '独奏+乐队', '管弦乐队'],
              ['核心', '独奏炫技', '主题发展'],
              ['乐章', '3-4乐章', '4乐章为主'],
              ['华彩', '有华彩段', '通常无']
            ],
            highlightCol: 1
          });
        }
      }
    ],

    'vocal-genres': [
      {
        title: '声乐体裁分类',
        desc: '声乐体裁按演唱形式与功能可分为艺术歌曲、歌剧、合唱、弥撒、清唱剧等类型',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎤', title: '艺术歌曲', text: '诗与乐的融合，钢琴伴奏独立，如舒伯特《魔王》', color: '#6366f1' },
              { icon: '🎭', title: '歌剧', text: '综合音乐、戏剧、舞台美术，含咏叹调与宣叙调', color: '#ec4899' },
              { icon: '👥', title: '合唱', text: '多声部声乐，分混声、同声、无伴奏等形式', color: '#f59e0b' },
              { icon: '⛪', title: '弥撒', text: '天主教仪式音乐，含垂怜经、荣耀经等固定段落', color: '#10b981' },
              { icon: '📖', title: '清唱剧', text: '宗教或世俗题材的大型声乐套曲，不舞台表演', color: '#8b5cf6' },
              { icon: '🎶', title: '康塔塔', text: '中型声乐套曲，含咏叹调、宣叙调与合唱', color: '#06b6d4' }
            ]
          });
        }
      }
    ],

    'modern-forms': [
      {
        title: '现代音乐结构类型',
        desc: '20世纪后音乐结构突破传统调性与方整性，出现序列结构、细胞增殖、块状拼接、开放曲式等新形式',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: 'A', ratio: 2, color: '#6366f1', desc: '音块I' },
              { label: 'B', ratio: 3, color: '#ec4899', desc: '点描织体' },
              { label: 'C', ratio: 1, color: '#f59e0b', desc: '过渡' },
              { label: 'A\'', ratio: 2, color: '#6366f1', desc: '音块II' }
            ]
          });
        }
      },
      {
        title: '现代曲式理念',
        desc: '现代音乐常打破传统呈示-展开-再现模式，采用开放式、过程性或瞬时性结构',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🔢', title: '序列结构', text: '以十二音序列为基础，按预置规则组织音高、节奏等参数', color: '#6366f1' },
              { icon: '🧬', title: '细胞增殖', text: '从微型音高/节奏细胞出发，通过变换与增殖展开', color: '#ec4899' },
              { icon: '🧩', title: '块状拼接', text: '不同音乐块直接并置，无传统过渡，强调对比与断裂', color: '#f59e0b' },
              { icon: '🔄', title: '开放曲式', text: '演奏顺序可变，由演奏者即兴决定结构走向', color: '#10b981' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 二、音乐史与流派 (8)
    // ================================================================

    'medieval-renaissance': [
      {
        title: '中世纪与文艺复兴时间线',
        desc: '从公元500年格里高利圣咏的建立到1600年文艺复兴结束，跨越千年的音乐发展历程',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '早期中世纪', start: 500, end: 900, color: '#6366f1' },
              { label: '格里高利圣咏', start: 900, end: 1150, color: '#8b5cf6' },
              { label: '圣母院乐派', start: 1150, end: 1300, color: '#ec4899' },
              { label: '新艺术', start: 1300, end: 1450, color: '#f59e0b' },
              { label: '文艺复兴', start: 1450, end: 1600, color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '重要音乐特征',
        desc: '中世纪以单声部宗教声乐为主，文艺复兴发展复调与世俗音乐',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '📜', title: '格里高利圣咏', text: '单声部、无伴奏、自由节拍的拉丁宗教歌曲', color: '#6366f1' },
              { icon: '🎼', title: '复调萌芽', text: '奥尔加农至经文歌，多声部叠加逐渐成熟', color: '#ec4899' },
              { icon: '🎨', title: '人文主义', text: '文艺复兴强调词乐关系，世俗牧歌兴盛', color: '#f59e0b' },
              { icon: '🖨️', title: '印刷术', text: '1501年佩特鲁奇首次印刷乐谱，音乐传播革命', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'baroque': [
      {
        title: '巴洛克时期时间线',
        desc: '巴洛克时期（1600-1750）以歌剧诞生为起点，以巴赫去世为终点，是通奏低音与复调艺术的黄金时代',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '早期', start: 1600, end: 1700, color: '#6366f1' },
              { label: '中期', start: 1700, end: 1730, color: '#ec4899' },
              { label: '晚期', start: 1730, end: 1750, color: '#f59e0b' }
            ]
          });
        }
      },
      {
        title: '巴洛克代表作曲家',
        desc: '巴赫、亨德尔、维瓦尔第是巴洛克时期最重要的三位作曲家',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎻', title: '巴赫 (1685-1750)', text: '复调音乐巅峰，《赋格的艺术》《马太受难曲》', color: '#6366f1' },
              { icon: '🎭', title: '亨德尔 (1685-1759)', text: '歌剧与清唱剧大师，《弥赛亚》《水上音乐》', color: '#ec4899' },
              { icon: '🎵', title: '维瓦尔第 (1678-1741)', text: '协奏曲之父，《四季》小提琴协奏曲', color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    'classical': [
      {
        title: '古典主义时间线',
        desc: '古典主义时期（1750-1820）以奏鸣曲式为核心，追求均衡、清晰与理性的审美',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '前古典', start: 1750, end: 1770, color: '#6366f1' },
              { label: '盛古典', start: 1770, end: 1800, color: '#ec4899' },
              { label: '过渡浪漫', start: 1800, end: 1820, color: '#f59e0b' }
            ]
          });
        }
      },
      {
        title: '古典主义代表作曲家',
        desc: '海顿、莫扎特、贝多芬被誉为维也纳古典乐派三巨头',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎼', title: '海顿 (1732-1809)', text: '交响曲之父，104部交响曲与弦乐四重奏奠基', color: '#6366f1' },
              { icon: '🎹', title: '莫扎特 (1756-1791)', text: '音乐神童，歌剧与协奏曲的完美典范', color: '#ec4899' },
              { icon: '⚡', title: '贝多芬 (1770-1827)', text: '承前启后，从古典走向浪漫，《命运》《合唱》', color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    'romantic': [
      {
        title: '浪漫主义时间线',
        desc: '浪漫主义时期（1820-1900）强调个人情感、民族色彩与标题音乐，和声与管弦乐色彩极大丰富',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '早期浪漫', start: 1820, end: 1850, color: '#6366f1' },
              { label: '中期浪漫', start: 1850, end: 1880, color: '#ec4899' },
              { label: '晚期浪漫', start: 1880, end: 1900, color: '#f59e0b' }
            ]
          });
        }
      },
      {
        title: '浪漫主义代表作曲家',
        desc: '肖邦、李斯特、瓦格纳分别代表了浪漫主义钢琴、交响诗与歌剧的最高成就',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎹', title: '肖邦 (1810-1849)', text: '钢琴诗人，夜曲、叙事曲与谐谑曲的革新者', color: '#6366f1' },
              { icon: '🎼', title: '李斯特 (1811-1886)', text: '交响诗创始人，钢琴炫技与超技练习曲', color: '#ec4899' },
              { icon: '🎭', title: '瓦格纳 (1813-1883)', text: '乐剧理念，主导动机与半音化和声革新', color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    'twentieth-century': [
      {
        title: '二十世纪音乐时间线',
        desc: '二十世纪音乐（1900-2000）经历了印象主义、表现主义、新古典主义、序列主义、简约主义等多元流派的更迭',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '印象主义', start: 1900, end: 1920, color: '#6366f1' },
              { label: '表现/新古典', start: 1920, end: 1945, color: '#ec4899' },
              { label: '序列/实验', start: 1945, end: 1970, color: '#f59e0b' },
              { label: '简约/后现代', start: 1970, end: 2000, color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '二十世纪重要流派',
        desc: '从调性解体到多元并存，二十世纪音乐流派纷呈',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🌅', title: '印象主义', text: '德彪西、拉威尔，模糊调性，色彩性和声', color: '#6366f1' },
              { icon: '😱', title: '表现主义', text: '勋伯格、贝尔格，无调性与十二音序列', color: '#ec4899' },
              { icon: '🏛️', title: '新古典主义', text: '斯特拉文斯基，回归巴洛克形式与客观性', color: '#f59e0b' },
              { icon: '🔁', title: '简约主义', text: '莱许、格拉斯，重复模式与渐进变化', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'popular-music': [
      {
        title: '流行音乐发展史',
        desc: '从1950年代摇滚乐诞生到2020年代流媒体时代，流行音乐经历了多次风格演变',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '摇滚诞生', start: 1950, end: 1965, color: '#6366f1' },
              { label: '迷幻/民谣', start: 1965, end: 1975, color: '#8b5cf6' },
              { label: '迪斯科/朋克', start: 1975, end: 1985, color: '#ec4899' },
              { label: '嘻哈/电子', start: 1985, end: 2000, color: '#f59e0b' },
              { label: '数字/流媒体', start: 2000, end: 2020, color: '#10b981' }
            ]
          });
        }
      }
    ],

    'jazz-history': [
      {
        title: '爵士乐发展史',
        desc: '爵士乐从1900年代新奥尔良发源，经历了摇摆、比波普、自由爵士到融合爵士等阶段的演变',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '新奥尔良', start: 1900, end: 1925, color: '#6366f1' },
              { label: '摇摆乐', start: 1925, end: 1945, color: '#8b5cf6' },
              { label: '比波普', start: 1945, end: 1960, color: '#ec4899' },
              { label: '自由爵士', start: 1960, end: 1980, color: '#f59e0b' },
              { label: '融合/当代', start: 1980, end: 2020, color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '爵士乐代表人物',
        desc: '不同时期的爵士大师定义了各自时代的风格',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎺', title: '路易斯·阿姆斯特朗', text: '新奥尔良与摇摆乐时期的小号与声乐先驱', color: '#6366f1' },
              { icon: '🎷', title: '查理·帕克', text: '比波普革命核心， alto sax 巨匠', color: '#ec4899' },
              { icon: '🎹', title: '迈尔斯·戴维斯', text: '从冷爵士到融合爵士的不断革新者', color: '#f59e0b' },
              { icon: '🎵', title: '约翰·柯川', text: '自由爵士与灵性爵士的探索者', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'chinese-music-history': [
      {
        title: '中国音乐史时间线',
        desc: '中国音乐从远古骨笛到现代新音乐，经历了数千年绵延不断的发展',
        render: function() {
          return Charts.timeline({
            phases: [
              { label: '先秦', start: -1100, end: -200, color: '#6366f1' },
              { label: '汉魏六朝', start: -200, end: 580, color: '#8b5cf6' },
              { label: '隋唐燕乐', start: 580, end: 960, color: '#ec4899' },
              { label: '宋元', start: 960, end: 1368, color: '#f59e0b' },
              { label: '明清', start: 1368, end: 1911, color: '#10b981' },
              { label: '近现代', start: 1911, end: 2000, color: '#06b6d4' }
            ]
          });
        }
      },
      {
        title: '中国音乐重要特征',
        desc: '五声调式体系、雅乐与俗乐并行、戏曲与说唱的兴盛是中国音乐的突出特征',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🦴', title: '贾湖骨笛', text: '距今约8000年，世界最早的吹奏乐器之一', color: '#6366f1' },
              { icon: '🔔', title: '曾侯乙编钟', text: '战国青铜乐器，十二半音齐全，音域跨五个八度', color: '#ec4899' },
              { icon: '🎼', title: '五声调式', text: '宫商角徵羽五声音阶体系，影响东亚音乐', color: '#f59e0b' },
              { icon: '🎭', title: '戏曲音乐', text: '昆曲、京剧等板腔体与曲牌体音乐体系', color: '#10b981' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 三、作曲与编曲 (6)
    // ================================================================

    'melody-writing': [
      {
        title: '旋律乐句展示',
        desc: '一个完整的旋律通常由动机发展而成，通过音高走向与节奏型组合形成有逻辑的乐句',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            width: 420,
            notes: [
              { step: 'C', oct: 5, color: '#6366f1', label: '动机', name: 'C' },
              { step: 'E', oct: 5, color: '#6366f1', name: 'E' },
              { step: 'G', oct: 5, color: '#6366f1', name: 'G' },
              { step: 'E', oct: 5, color: '#ec4899', label: '重复', name: 'E' },
              { step: 'C', oct: 5, color: '#ec4899', name: 'C' },
              { step: 'D', oct: 5, color: '#f59e0b', label: '发展', name: 'D' },
              { step: 'F', oct: 5, color: '#f59e0b', name: 'F' },
              { step: 'E', oct: 5, color: '#10b981', label: '收束', name: 'E' }
            ]
          });
        }
      },
      {
        title: '旋律创作核心技法',
        desc: '旋律创作常用的手法包括重复、模进、倒影、逆行、扩展与紧缩',
        render: function() {
          return Charts.steps({
            items: [
              { label: '重复', desc: '强化记忆', color: '#6366f1' },
              { label: '模进', desc: '音高水平移位', color: '#8b5cf6' },
              { label: '倒影', desc: '音高方向反转', color: '#ec4899' },
              { label: '逆行', desc: '顺序反向', color: '#f59e0b' },
              { label: '变奏', desc: '装饰与变形', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'harmony-arrangement': [
      {
        title: '和声功能三角',
        desc: '和声编配以主(T)、下属(S)、属(D)三大功能为核心，T→S→D→T的功能进行是调性音乐和声的基础逻辑',
        render: function() {
          return Charts.functionTriangle();
        }
      },
      {
        title: '和声编配原则',
        desc: '和声编配需考虑功能逻辑、声部进行、声部连接与色彩变化',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🔄', title: '功能进行', text: 'T→S→D→T 的功能循环是和声的基本逻辑', color: '#6366f1' },
              { icon: '⚖️', title: '声部平衡', text: '四个声部音域合理分布，避免声部交叉', color: '#ec4899' },
              { icon: '🔗', title: '声部连接', text: '共同音保持，其余声部就近进行', color: '#f59e0b' },
              { icon: '🎨', title: '色彩变化', text: '通过离调、变和弦等丰富和声色彩', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'orchestration': [
      {
        title: '管弦乐队声部分类',
        desc: '交响乐队按乐器家族分为弦乐、木管、铜管与打击乐四大声部组，各组音色特性互补',
        render: function() {
          return Charts.tree({
            maxDepth: 3,
            root: {
              label: '管弦乐队',
              color: '#6366f1',
              children: [
                {
                  label: '弦乐组',
                  color: '#ec4899',
                  children: [
                    { label: '小提琴' },
                    { label: '中提琴' },
                    { label: '大提琴' },
                    { label: '低音提琴' }
                  ]
                },
                {
                  label: '木管组',
                  color: '#f59e0b',
                  children: [
                    { label: '长笛' },
                    { label: '双簧管' },
                    { label: '单簧管' },
                    { label: '大管' }
                  ]
                },
                {
                  label: '铜管组',
                  color: '#10b981',
                  children: [
                    { label: '圆号' },
                    { label: '小号' },
                    { label: '长号' },
                    { label: '大号' }
                  ]
                },
                {
                  label: '打击乐',
                  color: '#8b5cf6',
                  children: [
                    { label: '定音鼓' },
                    { label: '镲/锣' },
                    { label: '木琴' }
                  ]
                }
              ]
            }
          });
        }
      }
    ],

    'song-structure': [
      {
        title: '流行歌曲典型结构',
        desc: '流行歌曲通常采用前奏—主歌—副歌—主歌—副歌—桥段—副歌—尾奏的结构，副歌是记忆点（hook）所在',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '前奏', ratio: 1, color: '#8b5cf6', desc: 'Intro' },
              { label: '主歌', ratio: 2, color: '#6366f1', desc: 'Verse 1' },
              { label: '副歌', ratio: 2, color: '#ec4899', desc: 'Chorus' },
              { label: '主歌', ratio: 2, color: '#6366f1', desc: 'Verse 2' },
              { label: '副歌', ratio: 2, color: '#ec4899', desc: 'Chorus' },
              { label: '桥段', ratio: 1, color: '#f59e0b', desc: 'Bridge' },
              { label: '副歌', ratio: 2, color: '#ec4899', desc: 'Chorus' },
              { label: '尾奏', ratio: 1, color: '#10b981', desc: 'Outro' }
            ]
          });
        }
      },
      {
        title: '歌曲各部分功能',
        desc: '每个段落承担不同的叙事与情感功能',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🚪', title: '前奏', text: '建立调性、速度与氛围，引入主题动机', color: '#8b5cf6' },
              { icon: '📖', title: '主歌', text: '叙事推进，歌词展开故事情节', color: '#6366f1' },
              { icon: '⭐', title: '副歌', text: '情感高潮与核心记忆点，旋律最抓耳', color: '#ec4899' },
              { icon: '🌉', title: '桥段', text: '引入新素材或转调，打破重复疲劳', color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    'motive-development': [
      {
        title: '动机展示（贝多芬第五交响曲）',
        desc: '短-短-短-长的命运动机是最著名的音乐动机之一，通过重复、模进与变形贯穿全曲',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            width: 420,
            notes: [
              { step: 'G', oct: 4, color: '#6366f1', label: '短', name: 'G' },
              { step: 'G', oct: 4, color: '#6366f1', label: '短', name: 'G' },
              { step: 'G', oct: 4, color: '#6366f1', label: '短', name: 'G' },
              { step: 'E', oct: 4, color: '#ec4899', label: '长', name: 'E♭' },
              { step: 'F', oct: 4, color: '#f59e0b', label: '短', name: 'F' },
              { step: 'F', oct: 4, color: '#f59e0b', label: '短', name: 'F' },
              { step: 'F', oct: 4, color: '#f59e0b', label: '短', name: 'F' },
              { step: 'D', oct: 4, color: '#10b981', label: '长', name: 'D' }
            ]
          });
        }
      },
      {
        title: '动机发展手法',
        desc: '动机可通过多种手法发展为完整的音乐主题',
        render: function() {
          return Charts.steps({
            items: [
              { label: '重复', desc: '原样再现', color: '#6366f1' },
              { label: '模进', desc: '音高移位', color: '#8b5cf6' },
              { label: '扩展', desc: '延长时值', color: '#ec4899' },
              { label: '紧缩', desc: '缩短时值', color: '#f59e0b' },
              { label: '逆行', desc: '顺序反向', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'arranging-practice': [
      {
        title: '编曲工作流程',
        desc: '从旋律与和声框架出发，经过织体设计、声部分配到最终混音的完整编曲流程',
        render: function() {
          return Charts.flow({
            direction: 'vertical',
            steps: [
              { label: '1. 旋律与歌词分析', color: '#6366f1' },
              { label: '2. 和声框架搭建', color: '#8b5cf6' },
              { label: '3. 风格与速度确定', color: '#ec4899' },
              { label: '4. 织体与声部设计', color: '#f59e0b' },
              { label: '5. 乐器分配与编配', color: '#10b981' },
              { label: '6. 演奏与录音', color: '#06b6d4' },
              { label: '7. 混音与调整', color: '#8b5cf6' }
            ]
          });
        }
      },
      {
        title: '编曲核心要素',
        desc: '编曲需平衡旋律、和声、节奏与音色四个维度',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎶', title: '旋律层', text: '主旋律与副旋律的层次安排与呼应', color: '#6366f1' },
              { icon: '🎼', title: '和声层', text: '和声填充与节奏型设计，支撑旋律', color: '#ec4899' },
              { icon: '🥁', title: '节奏层', text: '打击乐与节奏组的律动感与推动力', color: '#f59e0b' },
              { icon: '🎸', title: '音色层', text: '乐器音色搭配与音域分布的平衡', color: '#10b981' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 四、数字音乐制作 (6)
    // ================================================================

    'daw-midi': [
      {
        title: 'DAW工作流程',
        desc: '数字音频工作站（DAW）的基本工作流程从项目设置到最终导出的完整链路',
        render: function() {
          return Charts.flow({
            direction: 'horizontal',
            steps: [
              { label: '新建工程', color: '#6366f1' },
              { label: 'MIDI编曲', color: '#8b5cf6' },
              { label: '音频录制', color: '#ec4899' },
              { label: '编辑整理', color: '#f59e0b' },
              { label: '混音', color: '#10b981' },
              { label: '导出', color: '#06b6d4' }
            ]
          });
        }
      },
      {
        title: 'MIDI基础概念',
        desc: 'MIDI是乐器数字接口协议，传输的是演奏信息而非声音本身',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎵', title: '音符信息', text: '音高(Note)、力度(Velocity)、时值(Duration)', color: '#6366f1' },
              { icon: '🎛️', title: '控制信息', text: 'CC控制器：音量、表情、延音踏板等连续参数', color: '#ec4899' },
              { icon: '⏱️', title: '时钟同步', text: 'MIDI Clock与BPM同步，保持多设备节拍一致', color: '#f59e0b' },
              { icon: '🎹', title: '通道', text: '16个MIDI通道，每通道可控制一个乐器/音色', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'virtual-instruments': [
      {
        title: '虚拟乐器类型',
        desc: '虚拟乐器按发声原理可分为采样器、合成器、物理建模与音色库四大类',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎙️', title: '采样器', text: '回放真实录制的音频样本，如Kontakt钢琴/弦乐', color: '#6366f1' },
              { icon: '⚡', title: '合成器', text: '减法/加法/FM/Wavetable等合成方式生成音色', color: '#ec4899' },
              { icon: '🔧', title: '物理建模', text: '模拟乐器物理振动，如Pianoteq钢琴建模', color: '#f59e0b' },
              { icon: '📚', title: '音色库', text: '大型管弦乐采样库，含多力度层与连奏过渡', color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '合成器基本结构',
        desc: '减法合成器由振荡器、滤波器、包络与LFO构成声音生成与塑形链路',
        render: function() {
          return Charts.flow({
            direction: 'horizontal',
            steps: [
              { label: '振荡器OSC', color: '#6366f1' },
              { label: '滤波器FILTER', color: '#8b5cf6' },
              { label: '包络ENV', color: '#ec4899' },
              { label: 'LFO', color: '#f59e0b' },
              { label: '放大器AMP', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'recording': [
      {
        title: '录音制作流程',
        desc: '从前期准备到最终混音的完整录音工作链路',
        render: function() {
          return Charts.flow({
            direction: 'horizontal',
            steps: [
              { label: '1.准备', color: '#6366f1' },
              { label: '2.录音', color: '#8b5cf6' },
              { label: '3.编辑', color: '#ec4899' },
              { label: '4.混音', color: '#f59e0b' },
              { label: '5.母带', color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '录音关键技术',
        desc: '话筒选择与摆位是录音质量的核心要素',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎤', title: '话筒类型', text: '动圈、电容、铝带各有适用场景与音色特征', color: '#6366f1' },
              { icon: '📐', title: '拾音制式', text: 'A/B、X/Y、ORTF等立体声拾音技术', color: '#ec4899' },
              { icon: '🔇', title: '声学环境', text: '吸音与扩散处理，控制反射与驻波', color: '#f59e0b' },
              { icon: '🎚️', title: '增益架构', text: '合理设置输入增益，避免削波与噪声', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'mixing': [
      {
        title: '混音频段分布',
        desc: '混音将各音轨按频段平衡，低频提供力度、中频决定清晰度、高频增添空气感',
        render: function() {
          return Charts.barChart({
            maxVal: 100,
            data: [
              { label: '次低频\n20-60Hz', value: 40, color: '#6366f1' },
              { label: '低频\n60-250Hz', value: 75, color: '#8b5cf6' },
              { label: '中低频\n250-500Hz', value: 60, color: '#ec4899' },
              { label: '中频\n500-2kHz', value: 85, color: '#f59e0b' },
              { label: '中高频\n2-6kHz', value: 70, color: '#10b981' },
              { label: '高频\n6-20kHz', value: 55, color: '#06b6d4' }
            ]
          });
        }
      },
      {
        title: '混音核心处理',
        desc: '均衡、压缩、混响与声像定位是混音的四大基本工具',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎛️', title: '均衡(EQ)', text: '调整各频段能量，消除冲突，突出特征频率', color: '#6366f1' },
              { icon: '📦', title: '压缩', text: '控制动态范围，统一音量，增加密度感', color: '#ec4899' },
              { icon: '🏛️', title: '混响', text: '营造空间感与深度，模拟声学环境', color: '#f59e0b' },
              { icon: '🎧', title: '声像', text: '左右声像定位，创造立体声宽度', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'mastering': [
      {
        title: '母带处理流程',
        desc: '母带处理是混音后的最终环节，统一响度、优化频响并确保跨平台一致性',
        render: function() {
          return Charts.flow({
            direction: 'horizontal',
            steps: [
              { label: '均衡修正', color: '#6366f1' },
              { label: '动态控制', color: '#8b5cf6' },
              { label: '染色/激励', color: '#ec4899' },
              { label: '响度标准化', color: '#f59e0b' },
              { label: '导出/Dither', color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '母带频段目标',
        desc: '母带处理需确保各频段能量分布合理，达到商业发行标准',
        render: function() {
          return Charts.barChart({
            maxVal: 100,
            data: [
              { label: '低频', value: 65, color: '#6366f1' },
              { label: '中低频', value: 55, color: '#8b5cf6' },
              { label: '中频', value: 70, color: '#ec4899' },
              { label: '中高频', value: 65, color: '#f59e0b' },
              { label: '高频', value: 50, color: '#10b981' }
            ]
          });
        }
      }
    ],

    'edm-production': [
      {
        title: 'EDM节奏模式（4/4拍）',
        desc: '电子舞曲以四四拍为基础，底鼓在每拍上（four-on-the-floor），反拍为踩镲',
        render: function() {
          return Charts.rhythmGrid({
            beats: 4,
            subdivisions: 4,
            pattern: [
              1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0
            ],
            accents: [1, 0, 0, 0]
          });
        }
      },
      {
        title: 'EDM反拍踩镲',
        desc: '踩镲落在每拍的第二个八分音符（反拍），制造律动感',
        render: function() {
          return Charts.rhythmGrid({
            beats: 4,
            subdivisions: 2,
            pattern: [
              1, 0,  1, 0,  1, 0,  1, 0
            ],
            accents: [1, 0, 0, 0]
          });
        }
      },
      {
        title: 'EDM子类型',
        desc: '电子舞曲包含多种子类型，各有独特的BPM范围与音色特征',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '💃', title: 'House', text: '120-130 BPM，四四底鼓，律动感强', color: '#6366f1' },
              { icon: '⚡', title: 'Dubstep', text: '140 BPM，重低音与切分节奏', color: '#ec4899' },
              { icon: '🌈', title: 'Trance', text: '130-150 BPM，合成器旋律与渐层结构', color: '#f59e0b' },
              { icon: '🔥', title: 'Drum & Bass', text: '160-180 BPM，碎拍与快速低频', color: '#10b981' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 五、音乐声学 (5)  — tuning-systems 已在第一组映射，跳过
    // ================================================================

    'overtone-series': [
      {
        title: '泛音系列复合波形',
        desc: '真实乐器声音由基波与多个谐波（泛音）叠加而成，泛音的比例决定了音色特征',
        render: function() {
          return Charts.waveform({
            type: 'composite',
            freq: 3,
            label: '基波 + 2次谐波 + 3次谐波 = 复合波形'
          });
        }
      },
      {
        title: '泛音频率比',
        desc: '泛音频率为基波的整数倍（1f, 2f, 3f, 4f...），各泛音的强度分布决定音色明亮或暗淡',
        render: function() {
          return Charts.freqRatio({
            ratios: [
              { freq: 1, color: '#6366f1', label: '基波 1f' },
              { freq: 2, color: '#8b5cf6', label: '八度 2f' },
              { freq: 3, color: '#ec4899', label: '纯五度 3f' },
              { freq: 4, color: '#f59e0b', label: '纯四度 4f' }
            ]
          });
        }
      }
    ],

    'resonance': [
      {
        title: '共鸣频率波形',
        desc: '当外部频率接近物体的固有频率时产生共振，振幅急剧增大。乐器的共鸣箱体放大特定频率',
        render: function() {
          return Charts.waveform({
            type: 'sine',
            freq: 4,
            label: '共鸣频率正弦波（被放大的固有频率）'
          });
        }
      },
      {
        title: '共鸣类型',
        desc: '音乐中的共鸣分为箱体共鸣、弦共鸣与空气柱共鸣，各有不同原理与应用',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎻', title: '箱体共鸣', text: '小提琴/吉他的琴体共振箱放大弦振动', color: '#6366f1' },
              { icon: '🎺', title: '空气柱共鸣', text: '管乐器管内空气柱驻波决定音高与音色', color: '#ec4899' },
              { icon: '🎹', title: '弦共鸣', text: '钢琴制音器抬起时其他弦产生共鸣', color: '#f59e0b' },
              { icon: '🏛️', title: '房间共鸣', text: '厅堂空间对特定频率的放大形成声学特色', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'psychoacoustics': [
      {
        title: '心理声学核心概念',
        desc: '心理声学研究人类对声音的主观感知，包括音高感知、响度感知、音色识别与空间听觉',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '👂', title: '音高感知', text: '基频决定音高，缺失基频时大脑可从泛音推断', color: '#6366f1' },
              { icon: '🔊', title: '响度感知', text: '人耳对不同频率灵敏度不同，等响曲线描述此特性', color: '#ec4899' },
              { icon: '🎭', title: '音色识别', text: '泛音结构与包络波形共同决定音色辨识', color: '#f59e0b' },
              { icon: '🧠', title: '空间听觉', text: '双耳时间差与强度差共同定位声源方向', color: '#10b981' },
              { icon: '🌫️', title: '掩蔽效应', text: '强声掩盖弱声，MP3等编码利用此原理压缩', color: '#8b5cf6' },
              { icon: '🎵', title: '虚拟音高', text: '缺失基频时大脑补充感知的音高', color: '#06b6d4' }
            ]
          });
        }
      }
    ],

    'room-acoustics': [
      {
        title: '室内声学要素',
        desc: '室内声学关注直达声、早期反射与混响的关系，直接影响音乐表演与录音质量',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '📢', title: '直达声', text: '声源到听众的最短路径，决定清晰度与定位', color: '#6366f1' },
              { icon: '🔄', title: '早期反射', text: '80ms内到达的一次反射，增强空间感与温暖度', color: '#ec4899' },
              { icon: '🌊', title: '混响', text: '多次反射叠加形成的尾音，混响时间RT60是核心指标', color: '#f59e0b' },
              { icon: '🔇', title: '吸声处理', text: '吸声材料控制反射声，减少驻波与回声', color: '#10b981' },
              { icon: '🌀', title: '扩散', text: '扩散体打散反射声方向，营造均匀声场', color: '#8b5cf6' },
              { icon: '📏', title: '房间比例', text: '长宽高比例影响驻波分布，黄金比例减少模式叠加' }
            ]
          });
        }
      },
      {
        title: '不同空间的混响时间',
        desc: '不同用途空间的最佳混响时间差异很大',
        render: function() {
          return Charts.hBars({
            maxVal: 3,
            data: [
              { label: '录音棚', value: 0.3, color: '#6366f1' },
              { label: '会议室', value: 0.8, color: '#8b5cf6' },
              { label: '音乐厅', value: 2.0, color: '#ec4899' },
              { label: '教堂', value: 3.0, color: '#f59e0b' }
            ]
          });
        }
      }
    ],

    'digital-audio': [
      {
        title: '数字音频波形（采样示意）',
        desc: '数字音频将连续声波离散化为采样点，采样率与位深决定了音频的精度与动态范围',
        render: function() {
          return Charts.waveform({
            type: 'sine',
            freq: 5,
            label: '模拟声波经采样量化后的数字表示'
          });
        }
      },
      {
        title: '采样率与位深对比',
        desc: '不同采样率和位深对应不同的音频质量与文件大小',
        render: function() {
          return Charts.comparisonTable({
            headers: ['规格', '采样率', '位深', '动态范围'],
            rows: [
              ['电话质量', '8 kHz', '8 bit', '约48 dB'],
              ['CD质量', '44.1 kHz', '16 bit', '约96 dB'],
              ['专业录音', '48 kHz', '24 bit', '约144 dB'],
              ['高清音频', '96 kHz', '24 bit', '约144 dB'],
              ['母带级', '192 kHz', '32 bit', '约152 dB']
            ],
            highlightCol: 1
          });
        }
      }
    ],

    // ================================================================
    // 六、音乐分析 (4)  — harmony-analysis 已在第一组映射，跳过
    // ================================================================

    'schenkerian': [
      {
        title: '申克分析层次结构',
        desc: '申克分析法将音乐分为前景（表面旋律）、中景（和声进行）与背景（基本结构）三个层次，揭示调性音乐深层的线性逻辑',
        render: function() {
          return Charts.tree({
            maxDepth: 3,
            root: {
              label: '背景: Urlinie (3-2-1)',
              color: '#6366f1',
              children: [
                {
                  label: '中景I: 5-3-2-1',
                  color: '#8b5cf6',
                  children: [
                    { label: '前景: 旋律装饰' },
                    { label: '前景: 经过音' }
                  ]
                },
                {
                  label: '中景II: 和声骨架',
                  color: '#ec4899',
                  children: [
                    { label: '前景: 琶音' },
                    { label: '前景: 邻音' }
                  ]
                },
                {
                  label: '中景III: 延长',
                  color: '#f59e0b',
                  children: [
                    { label: '前景: 转调' },
                    { label: '前景: 回音' }
                  ]
                }
              ]
            }
          });
        }
      },
      {
        title: '申克分析核心概念',
        desc: '基本结构(Ursatz)是所有调性音乐的深层模型',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '📊', title: '前景', text: '乐谱表面的所有音符，含装饰音与经过音', color: '#6366f1' },
              { icon: '📐', title: '中景', text: '前景简化后的和声进行与声部延长', color: '#ec4899' },
              { icon: '🎯', title: '背景', text: '最深层的基本结构：Bassbrechung + Urlinie', color: '#f59e0b' },
              { icon: '➡️', title: 'Urlinie', text: '基本线条：从3、5或8级下行至1的线性进行', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'motive-analysis': [
      {
        title: '动机分析（贝多芬第五）',
        desc: '通过五线谱展示核心动机及其在不同声部的出现，分析动机如何贯穿发展',
        render: function() {
          return Charts.staff({
            clef: 'treble',
            width: 420,
            notes: [
              { step: 'G', oct: 4, color: '#6366f1', label: 'a', name: 'G' },
              { step: 'G', oct: 4, color: '#6366f1', label: 'a', name: 'G' },
              { step: 'G', oct: 4, color: '#6366f1', label: 'a', name: 'G' },
              { step: 'E', oct: 4, color: '#ec4899', label: 'b', name: 'E♭' },
              { step: 'A', oct: 4, color: '#f59e0b', label: 'a\'', name: 'A♭' },
              { step: 'A', oct: 4, color: '#f59e0b', label: 'a\'', name: 'A♭' },
              { step: 'A', oct: 4, color: '#f59e0b', label: 'a\'', name: 'A♭' },
              { step: 'F', oct: 4, color: '#10b981', label: 'b\'', name: 'F' }
            ]
          });
        }
      },
      {
        title: '动机分析步骤',
        desc: '动机分析遵循识别、标记、追踪与总结的系统方法',
        render: function() {
          return Charts.steps({
            items: [
              { label: '识别', desc: '找出核心动机', color: '#6366f1' },
              { label: '标记', desc: '标注a/b/a\'等', color: '#8b5cf6' },
              { label: '追踪', desc: '追踪全曲出现', color: '#ec4899' },
              { label: '变形', desc: '识别变化手法', color: '#f59e0b' },
              { label: '总结', desc: '概括发展逻辑', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'form-analysis': [
      {
        title: '曲式分析结构图',
        desc: '以贝多芬钢琴奏鸣曲第一乐章为例，展示奏鸣曲式的呈示部—展开部—再现部三段结构分析',
        render: function() {
          return Charts.structureBlocks({
            sections: [
              { label: '呈示部', ratio: 3, color: '#6366f1', desc: '主部+连接+副部+结束' },
              { label: '展开部', ratio: 2, color: '#f59e0b', desc: '动机发展+转调' },
              { label: '再现部', ratio: 3, color: '#ec4899', desc: '主部+连接+副部+结束' },
              { label: '尾声', ratio: 1, color: '#10b981', desc: 'Coda' }
            ]
          });
        }
      },
      {
        title: '曲式分析层次',
        desc: '曲式分析从宏观结构到微观乐句逐层深入',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🏛️', title: '宏观结构', text: '整体曲式类型判断（奏鸣/回旋/变奏等）', color: '#6366f1' },
              { icon: '📐', title: '段落划分', text: '各部分边界与比例关系，调性布局', color: '#ec4899' },
              { icon: '📝', title: '乐句分析', text: '乐句长度、终止式类型与动机关系', color: '#f59e0b' },
              { icon: '🔍', title: '细节标注', text: '和声标注、动机标记与声部进行', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'music-semiotics': [
      {
        title: '音乐语义学核心概念',
        desc: '音乐语义学研究音乐符号的意义生成机制，探讨音乐如何传达情感、叙事与文化内涵',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '💡', title: '能指与所指', text: '音响形式(能指)与意义内容(所指)的符号关系', color: '#6366f1' },
              { icon: '🎭', title: '修辞格', text: '音乐中的隐喻、转喻与提喻等修辞手法', color: '#ec4899' },
              { icon: '📖', title: '叙事性', text: '音乐中的时间序列与情节建构能力', color: '#f59e0b' },
              { icon: '🌍', title: '文化编码', text: '特定文化语境中音乐符号的约定意义', color: '#10b981' },
              { icon: '💭', title: '情感传达', text: '音乐参数(音高/节奏/力度)与情感的映射', color: '#8b5cf6' },
              { icon: '🔗', title: '互文性', text: '不同作品间引用、暗示与风格关联', color: '#06b6d4' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 七、世界音乐 (5)
    // ================================================================

    'african-music': [
      {
        title: '非洲交叉节奏模式',
        desc: '非洲音乐以多层节奏叠加为特征，常出现3对2或6对4的交叉节奏(hemiola)',
        render: function() {
          return Charts.rhythmGrid({
            beats: 4,
            subdivisions: 3,
            pattern: [
              1, 0, 0,  0, 1, 0,  1, 0, 0,  0, 1, 0
            ],
            accents: [1, 0, 0, 0]
          });
        }
      },
      {
        title: '非洲音乐特征',
        desc: '非洲音乐以复杂节奏、呼应形式与即兴变奏为核心',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🥁', title: '多层节奏', text: '多个鼓手演奏不同节奏型叠加，形成交叉节奏', color: '#6366f1' },
              { icon: '📢', title: '呼应形式', text: '领唱与合唱交替呼应(call and response)', color: '#ec4899' },
              { icon: '🎵', title: '五声音阶', text: '常用五声或七声音阶，无半音进行', color: '#f59e0b' },
              { icon: '🔥', title: '即兴变奏', text: '固定节奏型上即兴变化，循环中发展', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'indian-music': [
      {
        title: 'Raga音阶级数（Bhairav）',
        desc: 'Raga Bhairav使用升Re和升Dha的特色音阶，具有虔诚庄严的性格',
        render: function() {
          return Charts.scaleDegrees({
            degrees: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni', 'Sa'],
            labels: ['主音', '二度', '三度', '四度', '五度', '六度', '七度', '主音'],
            intervals: ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
            colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#6366f1']
          });
        }
      },
      {
        title: '印度音乐要素',
        desc: 'Raga（旋律框架）与Tala（节奏循环）是印度古典音乐的两大支柱',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎼', title: 'Raga', text: '旋律框架，规定音高、走向与装饰音规则', color: '#6366f1' },
              { icon: '⏱️', title: 'Tala', text: '节奏循环周期，如16拍的Teental', color: '#ec4899' },
              { icon: '🎹', title: 'Tanpura', text: '持续低音提供和声背景，不演奏旋律', color: '#f59e0b' },
              { icon: '🎸', title: 'Sitar', text: '北印度代表弦乐器，21弦，可做滑音装饰', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'latin-music': [
      {
        title: 'Son Clave节奏（3-2）',
        desc: 'Clave是古巴音乐的核心节奏型，3-2 clave由三拍组和两拍组构成，是拉丁音乐的节奏骨架',
        render: function() {
          return Charts.rhythmGrid({
            beats: 4,
            subdivisions: 4,
            pattern: [
              1, 0, 0, 1,  0, 0, 1, 0,  0, 1, 0, 0,  0, 0, 0, 0
            ],
            accents: [1, 0, 0, 0]
          });
        }
      },
      {
        title: '拉丁音乐类型',
        desc: '拉丁音乐涵盖多种地域风格，各有独特的节奏型与乐器配置',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🇨🇺', title: 'Son Cubano', text: '古巴颂，Clave节奏核心，吉他与三弦琴', color: '#6366f1' },
              { icon: '💃', title: 'Salsa', text: '融合古巴与爵士的都市舞曲，铜管突出', color: '#ec4899' },
              { icon: '🎸', title: 'Bossa Nova', text: '巴西轻柔风格，吉他与切分节奏', color: '#f59e0b' },
              { icon: '🎭', title: 'Tango', text: '阿根廷探戈，班多钮手风琴与2/4拍', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'japanese-music': [
      {
        title: '都节音阶（阴音阶）',
        desc: '日本都节音阶含小二度与小七度，营造出幽玄、哀婉的独特色彩，常用於三味线与筝曲',
        render: function() {
          return Charts.scaleDegrees({
            degrees: ['1', '2', '3', '4', '5', '1'],
            labels: ['宫', '商', '羽', '清角', '徵', '宫'],
            intervals: ['H', 'W+W', 'H', 'W+W', 'H'],
            colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1']
          });
        }
      },
      {
        title: '日本音乐要素',
        desc: '日本传统音乐以五声音阶、自由节拍与独特音色处理为特征',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎸', title: '三味线', text: '三弦拨弦乐器，音色清脆，含"触"音技法', color: '#6366f1' },
              { icon: '🎼', title: '筝', text: '13弦古筝类乐器，以拨片演奏旋律', color: '#ec4899' },
              { icon: '🎋', title: '尺八', text: '五孔竹笛，气息控制产生音色变化', color: '#f59e0b' },
              { icon: '🕐', title: '间', text: '重视音符之间的"空白"与停顿的美学', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'middle-eastern-music': [
      {
        title: 'Maqam Rast音阶',
        desc: 'Maqam Rast是阿拉伯音乐最基本的调式之一，含四分之一音(3/4音)，色彩庄重华丽',
        render: function() {
          return Charts.scaleDegrees({
            degrees: ['1', '2', '3', '4', '5', '6', '7', '1'],
            labels: ['D', 'E', 'F半', 'G', 'A', 'B', 'C半', 'D'],
            intervals: ['W', '3/4', '3/4', 'W', 'W', '3/4', '3/4'],
            colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#6366f1']
          });
        }
      },
      {
        title: '中东音乐要素',
        desc: 'Maqam调式系统与Iqa节奏循环是阿拉伯与波斯音乐的核心',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🎼', title: 'Maqam', text: '旋律调式系统，含四分之一音与特定行进规则', color: '#6366f1' },
              { icon: '⏱️', title: 'Iqa', text: '节奏循环模式，如2/4的Maqsum与Wahda', color: '#ec4899' },
              { icon: '🎻', title: '乌德琴', text: '无品拨弦乐器，可演奏四分之一音', color: '#f59e0b' },
              { icon: '🎵', title: 'Taqsim', text: '器乐即兴独奏段落，展示Maqam色彩', color: '#10b981' }
            ]
          });
        }
      }
    ],

    // ================================================================
    // 八、音乐教育与心理学 (6)
    // ================================================================

    'kodaly-method': [
      {
        title: '柯达伊教学法阶梯',
        desc: '柯达伊教学法以歌唱为核心，遵循从体验到符号的渐进学习路径',
        render: function() {
          return Charts.steps({
            items: [
              { label: '歌唱', desc: '人声为本', color: '#6366f1' },
              { label: '民谣', desc: '母语素材', color: '#8b5cf6' },
              { label: '柯尔文', desc: '首调唱名', color: '#ec4899' },
              { label: '手势', desc: '视觉辅助', color: '#f59e0b' },
              { label: '节奏', desc: '节奏音节', color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '柯达伊教学工具',
        desc: '柯达伊体系使用一系列独特工具辅助音乐学习',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '✋', title: '柯尔文手势', text: '用手势表示音级高低，视觉化音高关系', color: '#6366f1' },
              { icon: '🎶', title: '首调唱名', text: 'Do Re Mi首调系统，强调调性功能感', color: '#ec4899' },
              { icon: '🥁', title: '节奏音节', text: 'ta ti-ti等音节对应不同时值', color: '#f59e0b' },
              { icon: '📋', title: '移动Do', text: '任何调的主音都唱Do，培养调性感' }
            ]
          });
        }
      }
    ],

    'orff-approach': [
      {
        title: '奥尔夫教学理念',
        desc: '奥尔夫教学法强调"元素音乐"——音乐、律动与语言的有机统一，以即兴创作为核心',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🥁', title: '元素音乐', text: '回归最本真的节奏、旋律与律动体验', color: '#6366f1' },
              { icon: '🕺', title: '体态律动', text: '身体即乐器，通过动作感受音乐', color: '#ec4899' },
              { icon: '🎵', title: '奥尔夫乐器', text: '木琴、金属琴、竖笛等易上手的打击与旋律乐器', color: '#f59e0b' },
              { icon: '🎨', title: '即兴创作', text: '从固定节奏型出发即兴变化，激发创造力', color: '#10b981' },
              { icon: '📖', title: '语言节奏', text: '以童谣、诗词的韵律为音乐入门', color: '#8b5cf6' },
              { icon: '👥', title: '集体参与', text: '强调合奏与合作，人人都是表演者', color: '#06b6d4' }
            ]
          });
        }
      }
    ],

    'suzuki-method': [
      {
        title: '铃木教学法步骤',
        desc: '铃木教学法以"才能教育"为理念，模仿母语学习过程，从听觉模仿到正式演奏',
        render: function() {
          return Charts.steps({
            items: [
              { label: '聆听', desc: '反复听录音', color: '#6366f1' },
              { label: '模仿', desc: '听觉先行', color: '#8b5cf6' },
              { label: '演奏', desc: '不看谱演奏', color: '#ec4899' },
              { label: '识谱', desc: '后学乐谱', color: '#f59e0b' },
              { label: '精炼', desc: '持续复习', color: '#10b981' }
            ]
          });
        }
      },
      {
        title: '铃木教学法核心理念',
        desc: '铃木认为每个孩子都有音乐才能，关键在于环境与方法',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🌍', title: '母语学习', text: '音乐如母语，先听后说，先模仿后识谱', color: '#6366f1' },
              { icon: '👨‍👩‍👧', title: '家长参与', text: '家长陪伴学习，成为家庭教师', color: '#ec4899' },
              { icon: '🔁', title: '持续复习', text: '旧曲不断精炼，与新曲并行', color: '#f59e0b' },
              { icon: '🎶', title: '录音伴随', text: '每日聆听标准录音，内化音色与表现', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'music-cognition': [
      {
        title: '音乐认知能力雷达',
        desc: '音乐认知涉及多个维度的能力，包括音高感知、节奏处理、记忆与情感反应',
        render: function() {
          return Charts.radar({
            axes: ['音高感知', '节奏处理', '音乐记忆', '和声理解', '音色辨识', '情感反应'],
            values: [0.85, 0.90, 0.75, 0.70, 0.80, 0.95]
          });
        }
      },
      {
        title: '音乐与大脑',
        desc: '音乐激活大脑多个区域，是研究认知功能的理想窗口',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '🧠', title: '听觉皮层', text: '颞叶处理音高与音色信息', color: '#6366f1' },
              { icon: '⚡', title: '运动皮层', text: '额叶参与节奏感知与运动同步', color: '#ec4899' },
              { icon: '💭', title: '记忆系统', text: '海马体参与音乐记忆的编码与提取', color: '#f59e0b' },
              { icon: '❤️', title: '情感回路', text: '边缘系统与奖赏回路对音乐的情感反应', color: '#10b981' },
              { icon: '🔗', title: '胼胝体', text: '音乐家胼胝体更厚，左右脑连接更强', color: '#8b5cf6' },
              { icon: '🎯', title: '注意力', text: '前额叶控制音乐注意力的分配与切换', color: '#06b6d4' }
            ]
          });
        }
      }
    ],

    'music-memory': [
      {
        title: '音乐记忆类型',
        desc: '音乐记忆可分为多种类型，有效的练习策略需针对不同记忆类型进行训练',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '👂', title: '听觉记忆', text: '通过聆听内化音乐声响，建立"内心听觉"', color: '#6366f1' },
              { icon: '👁️', title: '视觉记忆', text: '乐谱的视觉印象与页面布局记忆', color: '#ec4899' },
              { icon: '✋', title: '动觉记忆', text: '肌肉记忆，手指自动化的运动模式', color: '#f59e0b' },
              { icon: '🧠', title: '分析记忆', text: '对和声结构与曲式的理性认知记忆', color: '#10b981' },
              { icon: '🎤', title: '歌唱记忆', text: '通过歌唱旋律加深对线条的理解', color: '#8b5cf6' },
              { icon: '📝', title: '概念记忆', text: '对音乐概念与规则的语义记忆', color: '#06b6d4' }
            ]
          });
        }
      },
      {
        title: '高效练习策略',
        desc: '科学练习方法提升记忆效率与演奏稳定性',
        render: function() {
          return Charts.steps({
            items: [
              { label: '分段', desc: '分小段练习', color: '#6366f1' },
              { label: '慢练', desc: '慢速精准', color: '#8b5cf6' },
              { label: '重复', desc: '间隔重复', color: '#ec4899' },
              { label: '变奏', desc: '变化练习', color: '#f59e0b' },
              { label: '心理', desc: '离开琴默练', color: '#10b981' }
            ]
          });
        }
      }
    ],

    'performance-psychology': [
      {
        title: '表演心理素质雷达',
        desc: '成功的音乐表演需要多方面的心理素质支撑，包括自信、专注、情绪调控与临场适应',
        render: function() {
          return Charts.radar({
            axes: ['自信心', '专注力', '情绪调控', '临场适应', '抗压能力', '表现欲'],
            values: [0.80, 0.85, 0.75, 0.70, 0.78, 0.90]
          });
        }
      },
      {
        title: '舞台焦虑与应对',
        desc: '舞台焦虑是表演者最常面临的心理挑战，需通过科学方法管理',
        render: function() {
          return Charts.infoCards({
            cards: [
              { icon: '😰', title: '生理反应', text: '心跳加速、手抖、出汗等交感神经激活', color: '#6366f1' },
              { icon: '🧘', title: '呼吸调节', text: '腹式呼吸与正念冥想降低焦虑水平', color: '#ec4899' },
              { icon: '🎯', title: '心理预演', text: '在脑中模拟完整演奏流程增强信心', color: '#f59e0b' },
              { icon: '🔄', title: '暴露训练', text: '逐步增加表演场合，脱敏焦虑反应', color: '#10b981' },
              { icon: '💪', title: '积极暗示', text: '用正向自我对话替代消极思维', color: '#8b5cf6' },
              { icon: '🎵', title: '心流状态', text: '专注于音乐本身，进入忘我的心流体验', color: '#06b6d4' }
            ]
          });
        }
      }
    ]

  };
})();
