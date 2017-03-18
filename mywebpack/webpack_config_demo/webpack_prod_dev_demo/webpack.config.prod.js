const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'xxx',
            template: './index.html',
            filename: path.resolve(__dirname, './dist/index.html')
        })
    ]
})