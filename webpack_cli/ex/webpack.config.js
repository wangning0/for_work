//webpack本身具有运行时模块替换功能，称之为HMR.当某个模块代码发生改变时，webpack实时打包将其推动道页面进行替换，从而无
//需刷新页面就实现代码替换，而这个过程很复杂，需要配置，针对react出现了一个第三方的react-hot-loader加载器

module.exports = {
  entry: [
  'webpack-dev-server/client?http://127.0.0.1:3000',
  'webpack/hot/only-dev-server',
    './app/main.js'
  ],
  output: {
    path: __dirname + '/assets/',
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'jsxhint'
    }],
    loaders: [{ 
      test: /\.js$/,
      exclude: '/node_modules',
      loader: 'react-hot!jsx-loader?harmony' 
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(css)$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
}

//打包多个资源文件

{
  entry: {
    a: './a.js',
    b: './b.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.CommonsChunkPlugin('init.js')  //公共文件
  ]
}