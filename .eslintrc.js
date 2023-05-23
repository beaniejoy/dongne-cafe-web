module.exports = {
  root: true,
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  env: {
    node: true,
    browser: true,
  },
  extends: [
    // "plugin:vue/essential", // Use this if you are using Vue.js 2.x.
    "plugin:vue/vue3-recommended", // Use this if you are using Vue.js 3.x.
    "eslint:recommended", // able to use eslint rules (https://eslint.org/docs/rules/)
  ],
  /**
   * rule level: off, warn, error
   */
  rules: {
    /* eslint:recommended */
    semi: ["error", "never"],
    indent: ["error", 2],
    quotes: ["error", "single"],
    // 'no-mixed-spaces-and-tabs': "error",
    "no-unused-vars": ["warn", { "args": "none" }],
    "no-unsafe-finally": ["error"],
    "no-return-assign": ["error"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-before-blocks": ["error"],
    "keyword-spacing": ["error", { before: true, after: true }],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // vue component template code(html) lint
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    // html tag first attribute location setting
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "below"
    }],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/html-closing-bracket-spacing": ["error"],
    "vue/html-indent": ["error"],
    "vue/html-quotes": ["error"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
        },
      },
    ],
    "vue/order-in-components": ["error"],
    "vue/multi-word-component-names": ["off"],
  },
};
