// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "airbnb",
    "eslint-config-alloy/react",
    "eslint-config-alloy/typescript",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["typescript"],
  globals: {
    API_ENV: true,
    API_ENCODE: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      // alias: {
      //   map: [
      //     ['@', './src'],
      //   ],
      //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      // },
    },
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": ["error", { code: 180 }],
    "linebreak-style": [0, "unix"],
    "no-console": [0],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", "tsx"] },
    ],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/anchor-is-valid": [0],
    "react/jsx-one-expression-per-line": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "react/button-has-type": [0],
    "import/extensions": [0],
    "import/no-extraneous-dependencies": [0],
    "arrow-body-style": [0],
    "@typescript-eslint/explicit-member-accessibility": [0],
    "import/prefer-default-export": [0],
    "no-restricted-syntax": [0],
    "comma-dangle": [0],
    "import/no-unresolved": [
      2,
      {
        ignore: ["^@/*"], // @ 是设置的路径别名
      },
    ],
    quotes: [0],
    "react/self-closing-comp": [0],
    "object-curly-newline": [0],
  },
};
