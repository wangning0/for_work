const express = require('express');
const app = express();
const path = require('path');
const serveStatic = require('serve-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config');
const PORT = process.env.NODE_PORT || 4001;
const BUILD_DIR = path.resolve(__dirname, 'dist');

app.use(serveStatic(BUILD_DIR));

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist',
    stats: {
        colors: true
    },
    index: "index.html"
}))

app.listen(PORT, (err) => {
    if(err) {
        console.log(`${err}`);
    } else {
        console.log(`server on ${PORT}`);
    }
})