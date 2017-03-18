const path = require('path');
const webpack = require('webpack');

module.exports = function() {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[chunkhash].[name].js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest']
            })
        ]
    }
}