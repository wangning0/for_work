const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config.dev');

const PORT = process.env.NODE_ENV || 3000;

const compiler = webpack(webpackConfig);

const server = webpackDevServer(compiler, {
    hot: false,
    noInfo: false,
    host: '0.0.0.0',
    publicPath: '/webpack/',
    stats: { colors: true },
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist')
//     proxy: {
//   },
})

server.listen(PORT, err => {
    if(err) {
        console.error(err);
    } else {
        console.log(`server is running at port: ${PORT}`);
    }
})