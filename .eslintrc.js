module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // Best Practices

    // start from commenting by me just for dev only

    // eqeqeq: "error",
    // "no-invalid-this": "error",
    // "no-return-assign": "error",
    // "no-unused-expressions": ["error", { allowTernary: true }],
    // "no-useless-concat": "error",
    // "no-useless-return": "error",

    // Variable
    // 'init-declarations': 'error',

    // start from commenting by me just for dev only

    // "no-use-before-define": "error",
    // "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z]" }],

    // end from commenting by me just for dev only

    // Stylistic Issues

    // start from commenting by me just for dev only

    // "array-bracket-newline": ["error", { multiline: true, minItems: null }],
    // "array-bracket-spacing": "error",
    // "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // "block-spacing": "error",
    // "comma-dangle": "error",
    // "comma-spacing": "error",
    // "comma-style": "error",
    // "computed-property-spacing": "error",
    // "func-call-spacing": "error",

    // end from commenting by me just for dev only

    // "implicit-arrow-linebreak": ["error", "beside"], comment by me for dev only
    // indent: ['error', 4],

    // start from commenting by me just for dev only

    // "keyword-spacing": "error",
    // "multiline-ternary": ["error", "never"],

    // end from commenting by me just for dev only

    // 'no-lonely-if': 'error',

    // start from commenting by me just for dev only

    // "no-mixed-operators": "error",
    // "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    // "no-tabs": "error",
    // "no-unneeded-ternary": "error",
    // "no-whitespace-before-property": "error",
    // "nonblock-statement-body-position": "error",
    // "object-property-newline": [
    //   "error",
    //   { allowAllPropertiesOnSameLine: true }
    // ],
    // "quote-props": ["error", "as-needed"],

    // end from commenting by me just for dev only

    // quotes: ['error', 'prefer-single'],
    // semi: ["error", "never"],  comment by me for dev only
    // "semi-spacing": "error",    comment by me for dev only
    // "space-before-blocks": "error" comment by me for dev only
    // 'space-before-function-paren': 'error',

    // "space-in-parens": "error",
    // "space-infix-ops": "error",
    // "space-unary-ops": "error"

    // end from commenting by me just for dev only

    // ES6
    // start from commenting by me just for dev only

    // "arrow-spacing": "error",
    // "no-confusing-arrow": "error",
    // "no-duplicate-imports": "error",
    // "no-var": "error",
    // "object-shorthand": "error",
    // "prefer-const": "error",
    // "prefer-template": "error"

    // end from commenting by me just for dev only
  }

  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   semi: ['error', 'never'],
  //   'max-len': 'off',
  //   camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }]
  // }
};
