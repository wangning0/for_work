# webpack2.0

## 代码分离

### 分离资源，实现缓存资源和并行加载资源

* 分离第三方库[vendor]

一个典型的应用程序会依赖很多第三方库，如果我们将这些library中的代码
保留在与应用程序相独立的bundle中，可以利用浏览器的缓存机制，把这些
文件长时间缓存在用户机器上

     //CommonsChunkPlugin 
     
     // 多入口
     
     // webpack.config.js
     var path = require('path');
     
     module.exports = function(env) {
        enrty: {
            main: './index.js',
            vendor: 'moment' //示例库
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        }
     }
     
     // 运行上面代码后，会发现moment的代码在两个文件中都出现了，这个时候需要CommonsChunkPlugin
     
     // CommonsChunkPlugin是一个复杂的插件，它从根本上允许我们从不同的bundle中提取所有的公共模块，并且将他们加入到公共bundle，如果公共bundle不存在，会创建一个出来
     var webpack = require('webpack');
     var path = require('path');
     
     module.exports = function() {
        return {
            entry: {
                main: './index.js',
                vendor: 'moment'
            },
            output: {
                filename: '[chunkhash].[name].js',
                path: path.resolve(__dirname, 'dist')
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor'
                })
            ]
        }
     }
     
     // 但是当我们改变应用的代码并且再次运行webpack的时候，可以看到vendor文件的hash改变了，这样的话就无法从浏览器缓存机制中受益
     
     // webpack 生成了一些 webpack runtime 代码，用来帮助 webpack 完成其工作。当只有一个 bundle 的时候，runtime 代码驻留在其中。但是当生成多个 bundle 的时候，运行时代码被提取到了公共模块中，在这里就是 vendor 文件
     
     // 为了防止这种情况，我们需要将运行时代码提取到一个单独的mainfest文件中
     
     
        var webpack = require('webpack');
        var path = require('path');
    
        module.exports = function(env) {
            return {
                entry: {
                    main: './index.js',
                    vendor: 'moment'
                },
                output: {
                    filename: '[chunkhash].[name].js',
                    path: path.resolve(__dirname, 'dist')
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin({
                        names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
                    })
                ]
            }
        };
     


* 分离CSS

    可以选择用`ExtractTextWebpackPlugin`将打包好的CSS提取出来并输入成CSS文件
    
    webpack 能够用 ExtractTextWebpackPlugin 帮助你将 CSS 单独打包，以解决以上问题。
    
    ```
    // npm i --save-dev extract-text-webpack-plugin@beta
    
    
    ```
    
* 按需分离

`import`

```
//Usage with Babel
//npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015

// inedx.js
function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log(str))
    .catch(err => console.log('Failed to load moment', err));
}

determineDate();

//webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  }
};

// Usage with Babel and async/await

// npm install --save-dev babel-plugin-transform-async-to-generator babel-plugin-transform-regenerator babel-plugin-transform-runtime

// index.js
async function determineDate() {
  const moment = await import('moment');
  return moment().format('LLLL');
}

determineDate().then(str => console.log(str));

// webpack.config.js
module.exports = {
  entry: './index-es2017.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: [
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      }]
    }]
  }
};

```

## 缓存

为了能够长期缓存webpack生成的静态资源：

* 使用[chunkhash]向每个文件添加一个依赖于内容的cache-buster
* 将webpack mainfest提供到一个单独的文件中
* 对于一组依赖关系相同的资源，确保包含引导代码的入口起点(entry point) chunk 不会随时间的推移而更改它的哈希值


**为每个文件生成唯一的hash值**

```
module.exports = {
    // ...
    output: {
        filename: '[name].[chunkhash].js'
    }
}

// 不逃在开发环境下使用chunkhash，将开发和生产模式的配置分开，并在开发模式中使用[name].js的文件名，在生产模式中使用[name].[chunkhash].js的文件名
```

**从webpack编译统计中获取文件名**

开发模式下：

```
    <script src="vendor.js"></script>
    <script src="main.js"></    script>

```

生产模式下：

```
<script src="vendor.50cfb8f89ce2262e5325.js"></script>
<script src="main.70b594fe8b07bcedaa98.js"></script>

```

可以使用一个插件`webpack-manifest-plugin`，会导出一个JSON文件


## Shimming

webpack作为模块打包工具可以支持ES2015模块，根据CommonJS或者AMD规范编写的模块，但是很多时候，我们在使用第三方的Library的时候，我们还期待有一些全局依赖

```
module.exports = {
    // ... 
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
}
```

**ProvidePlugin**

ProvidePlugin可以将模块作为一个遍历那个，被webpack在其他每个模块中饮用，只有你在需要使用的时候，模块才会被require，比如 jQuery 插件中的 \$ 或者 jQuery。在这种场景，你可以在每次遇到全局标识符 \$ 的时候，在 webpack 中预先设置 var $ = require(“jquery”)

```
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}
```

## 使用环境变量

```
module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: precess.env.NODE_ENV === 'production'
        })
    ]
}
```

## 模块热替换-React

模块热替换HMR的作用是，在应用运行时，无需刷新页面，便能替换、增加、删除必要的模块，HMR对于那些由单一状态树构成的应用非常有用，因为她们是dump的，所以在组件的代码更改后，组件的状态依然能够正确反映应用的最新状态


## Public Path

webpack提供一个非常有用的配置，改配置能帮助你为项目中的资源指定一个基础路径，称为公共路径

```
import webpack from 'webpack';

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH
  },

  plugins: [
    //该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
};
```






 


