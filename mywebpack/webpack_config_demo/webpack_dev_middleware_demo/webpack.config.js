const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel'
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: 'cheap-module-eval-source-map'
}