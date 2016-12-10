var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var base = require('./webpack.config.base');

const publicToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoicHVibGljIiwiaWF0IjoxNDc1NDg0NzEzfQ.se7N-G2CTU2caWsgBCifv3yg08tf-7sGx4QwEbQe3yM';

module.exports = Object.assign({}, base, {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      PUBLIC_TOKEN: JSON.stringify(publicToken),
    }),
    new HtmlWebpackPlugin({
      title: '后台管理系统',
      template: 'handlebars-loader!./src/index.hbs',
      filename: path.resolve(__dirname, './dist/index.html'),
    })
  ]
});
