const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss');

const isProd = process.env.HUGO_ENVIRONMENT === 'production';

const safelist = [
  // Классы из theme.js для управления темой
  'data-bs-theme',
  'theme-icon',
  'theme-icon-light',
  'theme-icon-dark',
  'opacity-100',
  'opacity-0',
  'text-warning',
  'text-info',
  'theme-toggle-btn',
  // Классы из form.js для Bootstrap-валидации
  'is-invalid',
  'was-validated',
  'form-control',
  'invalid-feedback',
  'btn',
  'btn-primary'
];

module.exports = {
  plugins: [
    require('postcss-import'),
    isProd && purgeCSSPlugin({
      content: ['./hugo_stats.json'],
      defaultExtractor: (content) => {
        try {
          const stats = JSON.parse(content);
          return [
            ...(stats.htmlElements?.tags || []),
            ...(stats.htmlElements?.classes || []),
            ...(stats.htmlElements?.ids || [])
          ];
        } catch (e) {
          console.error('Ошибка при парсинге hugo_stats.json:', e.message);
          return [];
        }
      },
      safelist,
    }),
    isProd && autoprefixer(),
    isProd && cssnano(),
  ].filter(Boolean),
};