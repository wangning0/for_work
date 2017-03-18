## webpack2

## 入口和上下文

* context

    基础目录，绝对路径，用于从配置中解析入口起点和加载器
    
    `context: path.resolve(__dirname, 'app')`

* entry

    起点是应用程序的起点入口，从这个起点开始，应用程序启动执行
    
    动态加载的模块不是入口起点
    
    每个HTML页面都有一个入口起点单页面只有一个入口起点，多页应用多个入口起点
    
## 输出
    
 * output.filename 

    * [name]
    * [id]
    * [name].[hash]
    * [chunkhash]
    
* output.path

    目录对应一个绝对路径
    
    `path: path.resolve(__dirname, 'dist/assets')`    
    
* out.pathinfo

    告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 false，并且不应该用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。
    
* output.publicPath

    webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件
    
* output.sourceMapFilename

    此选项会向硬盘写入一个输出文件，只在 devtool 启用了 SourceMap 选项时才使用
    
## 模块 module

* module.noParse 

    防止webpack解析那些任何与给定正则表达式相匹配的文件，忽略的文件不应该被import require或其他任何机制调用
    
    `noParse: /jquery|loadsh/`
    
* module.rules 

    * Rule.enforce

        可能的值为"pre" | "post"
        
        指定loader种类，没有值表示是普通loader
        
    * Rule.exclude

        Rule.resource.exclude的简写
        
    * Rule.include

        Rule.include是Rule.resource.include的简写
        
    * Rule.loader

        Rule.loader是Rule.use:[{loader}]的简写
        
    * Rule.use

        ```
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader',
            options: {
                importLoaders: 1
            }
        }, {
            loader: 'less-loader',
            options: {
                noIeCompat: true
            }
        }]
        ```
        
    * 条件

        可以为下面：
        
        * 字符串
        * 正则表达式
        * 函数
        * 条件数组
        * 对象

        {test: Condition}:约定了提供一个正则或正则数组，但不是强制的
        
        { include: Condition }：匹配条件。约定了提供一个字符串或字符串数组，但不是强制的
        
        { exclude: Condition }：不能匹配条件。约定了提供一个字符串或字符串数组，但不是强制的。
        
        { and: [Condition] }：匹配所有条件

        { or: [Condition] }：匹配任何条件

        { not: Condition }：不能匹配条件

    ```
    {
        test: /\.css$/,
        include: [
            path.resolve(__dirname, 'app/styles'),
            path.resolve(__dirname, 'vendor/styles')
        ]
    }
    ```
    
## 解析(Resolve)

这些选项能设置模块如何被解析

配置模块如何解析

* resolve.alias

    创建import或require的别名，来确保模块引入变得更简单
    
    ```
    alias: {
        Utilties: path.resolve(__dirname, 'src/Utilties/'),
        Templates: path.resolve(__dirname, 'src/templates/')
    }
    
    // resolve之前
    import Utility from '../../utilities/utility';
    
    // resolve 之后
    import Utility from 'Utilities/utility'; 
    ```
    
* resolve.extensions

    自动解析确定的扩展，默认值
    
    `extensions: [".js", ".json"]`
    
* resolve.modules

    告诉webpack解析模块时应该搜索的目录
    
    `modules: ['node_modules']`
    
* resolveLoader

    这组选项宇上面的resolve对象的集合属性相同，只用于解析webpack的loader包
    
    * moduleExtensions

        扩展
        
        `moduleExtensions: ['-loader']`
        
## 插件

```

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// 在配置中添加插件
plugins: [
  // 构建优化插件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  // 编译时(compile time)插件
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server 强化插件
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]

```

## 开发中Server

webpack-dev-server

* devServer

    ```
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
    ```
* devServer.compress

    一切服务都启用gzip 压缩
    
* devServer.contentBase

    告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要，devServer.publicPath将用于确定应该从那里提供bundle，此选项优先
    
    `contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]`
    
* devServer.headers

    在所有请求中添加首部内容：

* decServer.historyApiFallback

    当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面。通过传入以下启用
    
    `historyApiFallback: true`
    
* devServer.host

    指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下
    
    `host: 0.0.0.0`
    
* devServer.hot

    启用 webpack 的模块热替换特性
    
* devServer.port

    指定要监听请求的端口号
    
* devServer.proxy

    ```
    proxy: {
  "/api": {
    target: "https://localhost:3000",
    secure: false
  }
}
    ```
* devServer.publicPat

    此路径下的打包文件可在浏览器中访问。
    
    `publicPath: "http://localhost:8080/assets/"`
    
## 开发工具

开发：

cheap-module-eval-source-map

生产：

cheap-source-map

## target

* node
* web

## 外部扩展(externals)

防止将某些 import 包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展包(external package)。


