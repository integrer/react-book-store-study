const { RuleSetUseItem } = require('webpack');

////////////////////////////////
// PostCSS plugins
////////////////////////////////
const postcss = {
  cssNano: require('cssnano'),
  autoprefixer: require('autoprefixer'),
  url: require('postcss-url'),
  presetEnv: require('postcss-preset-env'),
  flexBugsFixes: require('postcss-flexbugs-fixes'),
};

////////////////////////////////
// Webpack plugins
////////////////////////////////
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

////////////////////////////////
// SASS
////////////////////////////////
const DartSass = require('sass');
const Fibers = require('fibers');

/**
 * @param isProduction
 */
function getPostcssPlugins(isProduction = false) {
  const basePlugins = [
    postcss.flexBugsFixes(),
    postcss.presetEnv(),
    postcss.url(),
    postcss.autoprefixer(),
  ];
  if (isProduction) return [...basePlugins, postcss.cssNano()];
  return basePlugins;
}

/**
 * Loader chain for style factory
 *
 * @param {'css'|'scss'|'sass'} syntax - Style syntax kind
 * @param {boolean} isProduction - Denotes if css chunks extraction is required
 * @param {boolean} isExtract - Denotes if css chunks extraction is required
 * @returns {RuleSetUseItem[]} Loader chain
 */
module.exports.styleLoaders = (syntax, isProduction, isExtract = true) => {
  const sourceMap = true;

  return [
    ...(isExtract ? [{ loader: ExtractCssChunks.loader, options: { hmr: !isProduction } }] : []),
    { loader: 'css-loader', options: { sourceMap } },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap,
        postcssOptions: { plugins: getPostcssPlugins(isProduction) },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap,
        implementation: DartSass,
        sassOptions: { fiber: Fibers, indentedSyntax: syntax === 'sass' },
      },
    },
  ];
};

module.exports.stylePlugins = (isExtract = true) =>
  isExtract
    ? [
        new ExtractCssChunks({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css?',
        }),
      ]
    : [];
