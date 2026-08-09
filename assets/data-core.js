/**
 * data-core.js
 * 核心数据整合文件 —— 将所有分类数据合并为统一的 MUSIC_THEORY_DATA 对象
 * 依赖: data-basics.js, data-intermediate.js, data-advanced.js,
 *       data-instruments.js, data-history.js, data-composition.js,
 *       data-production.js, data-analysis.js, data-world-music.js,
 *       data-rhythm.js, data-harmony.js, data-ear-training.js,
 *       data-music-forms.js, data-acoustics.js, data-pedagogy.js
 */

var MUSIC_THEORY_DATA = {
  categories: [
    CATEGORY_BASICS,
    CATEGORY_INTERMEDIATE,
    CATEGORY_ADVANCED,
    CATEGORY_RHYTHM,
    CATEGORY_HARMONY,
    CATEGORY_INSTRUMENTS,
    CATEGORY_EAR_TRAINING,
    CATEGORY_MUSIC_FORMS,
    CATEGORY_HISTORY,
    CATEGORY_COMPOSITION,
    CATEGORY_PRODUCTION,
    CATEGORY_ACOUSTICS,
    CATEGORY_ANALYSIS,
    CATEGORY_WORLD_MUSIC,
    CATEGORY_PEDAGOGY
  ]
};
