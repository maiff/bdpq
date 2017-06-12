const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const port = 8888

const compiler = Webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  disableHostCheck: true,
  hot: true,
  publicPath: webpackConfig.output.publicPath, /* ? */
  stats: {
    colors: true
  }
})

server.listen(port, function (err) {
  err && console.log(err)
  // opn(`http://localhost:${port}`)
  console.log(`Starting server on http://localhost:${port}`)
})
