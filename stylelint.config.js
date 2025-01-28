/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'custom-variant', 'plugin'],
      },
    ],
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
};
