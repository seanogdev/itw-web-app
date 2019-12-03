module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-recommended'],
  syntax: 'scss',
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags',
      {
        fileFilterRegex: [/\.vue$/],
      },
    ],
  ],
  rules: {
    'prettier/prettier': true,
  },
};
