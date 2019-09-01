import vue from 'rollup-plugin-vue'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/vue-ethereum.esm.js'
    },
    external: [ 'web3' ],
    plugins: [
      vue()
    ]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/vue-ethereum.ssr.js'
    },
    external: [ 'web3' ],
    plugins: [
      vue({ template: { optimizeSSR: true } })
    ]
  }
]
