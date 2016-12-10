var path = require('path');
var webpack = require('webpack');

 module.exports = {
   entry: [
     path.resolve(__dirname, 'src/js/')
   ],
   output: {
     path: path.resolve(__dirname, 'dist/assets/js'),
     filename: 'app.bundle.[hash].js',
     chunkFilename: '[id].[chunkhash].js',
     publicPath: '/assets/js/',
   },
   resolve: {
     extensions: ['', '.js', '.jsx'],
     alias: {
       $common: path.resolve(__dirname, 'src/js/common'),
       $utils: path.resolve(__dirname, 'src/js/utils'),
       $mock: path.resolve(__dirname, 'src/js/mock.js'),
     }
   },
   externals: {
     'react': 'React',
     'react-dom': 'ReactDOM',
     'react-router': 'ReactRouter',
     'redux': 'Redux',
     'react-redux': 'ReactRedux',
     'immutable': 'Immutable',
     'lodash': '_',
   },
   module: {
     loaders: [{
       test: /\.jsx?$/,
       exclude: /node_modules/,
       loader: 'babel'
     }, {
       test: /\.css$/,
       loader: "style-loader!css-loader?minimize&importLoaders=1!postcss-loader"
     }, {
       test: /\.s[ac]ss$/,
       loader: "style-loader!css-loader?minimize&importLoaders=1!postcss-loader!sass-loader"
     }, {
       test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
       loader: 'url?prefix=font/&limit=10000'
     }]
   },
   plugins: []
 };
