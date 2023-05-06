/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};
