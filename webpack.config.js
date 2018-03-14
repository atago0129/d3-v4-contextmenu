const webpack = require('webpack');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {

  entry: {
    "d3-v4-contextmenu": __dirname + '/src/index.js',
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].min.js',
    library: 'ContextMenu',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  devtool: 'sourcemap',

  devServer: {
    contentBase: 'debug/',
    publicPath: '/dist/',
    port: 9999,
    inline: true
  },

  module: {
    rules: [{
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BabiliWebpackPlugin()
  ]

};

