const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    context: path.resolve(__dirname, './'),
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                importLoaders: 1
                }
            },
            'postcss-loader'
            ]
        }]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}