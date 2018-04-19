const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  entry: {
    "d3-v4-contextmenu": __dirname + '/src/index.js',
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].min.js',
    library: 'D3V4ContextMenu',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'debug/',
    publicPath: '/dist/',
    port: 9999,
    inline: true
  },

  module: {
    rules: [{
      test: /.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
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
      }],
    }]
  },

  plugins: [].concat(
    isProduction
      ? [
        new webpack.optimize.UglifyJsPlugin()
      ]
      : [
        new webpack.HotModuleReplacementPlugin()
      ]
  )

};

