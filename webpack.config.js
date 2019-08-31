const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./src/vue-ethereum.js"],
  output: {
    library: "VueEthereum",
    libraryTarget: "umd",
    filename: "vue-ethereum.js",
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
