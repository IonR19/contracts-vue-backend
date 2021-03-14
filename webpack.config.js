const path = require('path')

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build_node'),
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  target: 'node14'
  // plugins: [new NodePolyfillPlugin()],
  // resolve: {
  //   fallback: {
  //     util: false,
  //     path: false,
  //     url: false,
  //     assert: false,
  //     crypto: false,
  //     stream: false,
  //     fs: false,
  //     tls: false,
  //     net: false,
  //     path: false,
  //     zlib: false,
  //     http: false,
  //     https: false,
  //     stream: false,
  //     crypto: false,
  //     buffer: false,
  //   },
  // },
}
