const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('postcss-import'),
    process.env.HUGO_ENVIRONMENT === 'production' ? purgeCSSPlugin({
      content: [ './hugo_stats.json' ],
      defaultExtractor: (content) => {
        try {
          const stats = JSON.parse(content);
          return [
            ...(stats.htmlElements?.tags || []),
            ...(stats.htmlElements?.classes || []),
            ...(stats.htmlElements?.ids || [])
          ];
        } catch (e) {
          console.error('Error parsing hugo_stats.json', e);
          return [];
        }
      },
      safelist: [ 'data-bs-theme' ]        
    }) : null,
    process.env.HUGO_ENVIRONMENT === 'production' ? autoprefixer() : null,
    process.env.HUGO_ENVIRONMENT === 'production' ? cssnano() : null
  ].filter(Boolean)
};