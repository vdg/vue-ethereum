module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'standard', 'plugin:vue/recommended'
  ],
  plugins: [
    'html'
  ]
}
