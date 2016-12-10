var path = require('path');
var webpack = require('webpack');

var base = require('./webpack.config.base');

const publicToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoicHVibGljIiwiaWF0IjoxNDc1NDg0NzEzfQ.se7N-G2CTU2caWsgBCifv3yg08tf-7sGx4QwEbQe3yM';
// const publicToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoicHVibGljIiwiaWF0IjoxNDc1NDMxODAxfQ.JYnEmqN-N_fnkUT7pJ_pMQmPIXyMNOg7kb8ufHFHfj0';

module.exports = Object.assign({}, base, {
  output: {
    path: path.resolve(__dirname, 'dist/assets/js'),
    filename: 'app.bundle.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/webpack/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PUBLIC_TOKEN: JSON.stringify(publicToken),
    })
  ]
});