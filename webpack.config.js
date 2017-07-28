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
      options: {
        presets: [
          ['env', {
            modules: false,
            loose: true,
            targets: {
              browsers: 'last 2 versions'
            }
          }]
        ],
        plugins: [
          'babel-plugin-transform-class-properties'
        ]
      }
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BabiliWebpackPlugin()
  ]

};

