const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        filename: 'app.bundle.[hash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/assets/js'
    },
    resolve: {
        extensions: ['.js', '.json', 'jsx'],
        // alias
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoader: 1
                    }
                },
                'postcss-loader'
            ]
        }]
    },
    plugins: []
}