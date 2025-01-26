/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'custom-variant'],
      },
    ],
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
};
