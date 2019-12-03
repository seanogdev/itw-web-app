module.exports = {
  root: true,
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-prettier'],
  language: 'scss',
  rules: {
    'prettier/prettier': true,
    'no-descending-specificity': null,
     "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin"]
    }],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
