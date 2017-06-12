const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const rm = require('rimraf').sync
const DEV = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
  context: path.resolve(__dirname, 'src'),/*?*/
  entry: {
    index: ['babel-polyfill', './index.js']
  },
  node: {
    __dirname: true,/*?*/
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].js.map'
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
};

config.module.rules.push({
  test: /\.(jpe?g|png|gif|ttf)$/i,
  loaders: DEV ? "url-loader" : 'file-loader',/*?*/
  query: DEV ? {} : {
    name: 'static/[name]-[hash:8].[ext]',/*?*/
    publicPath: config.output.publicPath,/*?*/
  }
});


if (DEV) {
  config.output.filename = '[name].[hash].js'
  config.devtool = '#cheap-module-eval-source-map';
  config.entry.index.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8888',
    'webpack/hot/only-dev-server'
  );
  config.output.publicPath = 'http://localhost:8888/dist/';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

} else {
  rm('./dist/*')
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true}))
  config.plugins.push(...[
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})
  ])
  // config.output.filename = "index.js";
}


module.exports = config;