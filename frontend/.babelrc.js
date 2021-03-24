// https://github.com/babel/babel/issues/8672
// https://babeljs.io/docs/en/config-files#6x-vs-7x-babelrc-loading

module.exports = function (api) {
  api.cache(true);
  return {
    comments: false,
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          corejs: 3,
          useBuiltIns: 'usage',
        },
      ],
      '@babel/typescript',
      '@babel/react',
    ],
    plugins: ['@babel/transform-runtime', '@babel/proposal-class-properties'],
  };
};
