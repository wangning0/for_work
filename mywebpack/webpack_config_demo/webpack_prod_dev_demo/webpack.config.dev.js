const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        filename: 'app.bundle.js',
        publicPath: '/webpack/',
        chunkFilename: '[id].[chunkhash].js'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            // ...
        })
    ]
})