const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.dev');

const devServerConfig = {
  hot: false,
  noInfo: false,
  host: '0.0.0.0',
  publicPath: '/webpack/',
  stats: { colors: true },
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, './dist'),
  proxy: {
    '/api': {
      target: {
        host: '120.26.201.68',
        protocol: 'http:',
        port: 4002,
      },
      changeOrigin: true,
      secure: false,
    },
  },
};

const port = 9001;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerConfig);
server.listen(port, err => {
  if (err) console.error(err.stack);
  else console.log(`server is running at port#${port}`);
});
