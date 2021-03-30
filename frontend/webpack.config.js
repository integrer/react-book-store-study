const path = require('path');
const { stylePlugins, styleLoaders } = require('./webpack_config/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env, argv) => {
  const { mode } = argv;
  [`.env.${mode}.local`, `.env.${mode}`, '.env.local', '.env']
    .map(p => path.resolve('./', p))
    .forEach(p => {
      dotenv.config({ path: p });
    });
  const serve = !!env.WEBPACK_SERVE;
  const styleSyntax = ['sass', 'scss', 'css'];
  const isDevelopment = mode === 'development';

  return {
    mode,
    entry: './src/index',
    // browserslist prevents live reload in dev server (fixed since v4)
    target: serve ? 'web' : `browserslist:${isDevelopment ? 'development' : 'production'}`,
    output: {
      path: process.env['WEBPACK_OUTPUT_PATH'] || path.resolve(__dirname, 'dist'),
      publicPath: '/',
      chunkFilename: 'js/[name].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
            name: 'vendors',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
    },
    resolve: {
      extensions: [
        '*',
        ...['.js', '.ts'].flatMap(s => [s, s + 'x']),
        ...styleSyntax.map(s => '.' + s),
      ],
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        ...styleSyntax.map(syntax => ({
          test: new RegExp(`\\.${syntax}$`),
          use: styleLoaders(syntax, !isDevelopment),
        })),
        {
          test: /\.(jpe?g|gif|png|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'images',
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'fonts',
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...stylePlugins(),
      new HtmlWebpackPlugin({
        template: './node_modules/html-webpack-template/index.ejs',
        title: 'React Bookstore',
        appMountId: 'root',
      }),
      new webpack.EnvironmentPlugin(['API_URL']),
    ],
  };
};
