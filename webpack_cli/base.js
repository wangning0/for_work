const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname,'/../src');
const modulesPath = path.join(__dirname,'/../node_modules');

module.exports = {
    cache: false,
    context: __dirname,
    debug: false,
    quiet: false,
    noInfo: false,
    stats: {
        colors: true,
        reasons: true,
        hash: true,
        versions: true,
        timings: true,
        chunks: true,
        chunkModules: true,
        cached: true,
        cachedAssets: true
    },
    resolve: {
        extensions: ['', '.js', ',jsx'],
        modulesDirectories: [
            'src',
            'node_modules'
        ]
    },
    module: {
        //可以在此处加preLoaders作为代码检查规范使用
        loaders: [
            {
                test: /\.css$/,
                loader:ExtractTextPlugin.extract(
                    'isomorphic-style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                ),
                include: srcPath,
                exclude: modulesPath
            },
            {
                test: '/\.css$/',
                loader: ExtractTextPlugin.extract('isomorphic-style-loader', 'css-loader!postcss-loader'),
                include: srcPath,
                exclude: modulesPath
            }
        ]
    },
    plugins: [
        new webpack.NoErroesPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true})
    ],
    postcss: () => {
        return [
            require('autoprefixer')({
                browsers: ['last 2 versions', 'ie >= 8']
            })
        ]
    },
    node: {
        process: true,
        __dirname: true
    }
};