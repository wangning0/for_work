## webpack2.x的改变

* module.loaders 改成了 module.rules

```
module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
                modules: true
            }
        }]
    }]
}
```

* 链式loaders

loaders还是可以链式调用，上一个的loader的输出被作为输入传入给下一个loade.
使用rule.use配置项。ues可以设置为一个loaders的数组列表。v1.x版本中使用的是！

```
module: {
    rules: [{
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader",
            "less-loader"
        ]
    }]
}
```

* 不能省略-loader后缀

```
module: {
    rules: [{
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader",
            "less-loader"
        ]
    }]
}

// 如果想再模块名后自动添加-loader后缀

resolveLoader: {
    moduleExtensions: ["-loader"]
}
```

* 取消了 module.preLoaders以及module.postLopaders

```
module: {
    rules: [{
        test: /\.js*/,
        enforce: "pre",  // 使用enforce
        loader: "eslint-loader"
    }]
}
```

* UglifyJsPlugin sourceMap

UglifyJsPlugin的sourceMap配置默认为false，这意味着如锅你在压缩代码时启用
了source map，或者想要uglifyjs的警告对应正确的代码行

```
devtool: "source-map",
plugins: [
    new UglifyJsPlugin({
        sourceMap: true
    })
]
```

* UglifyJsPlugin的compress.warnings的配置项默认为false.如果想要看到
uglifyjs的警告信息

```
devtool: "source-map",
plugins: [
    new UglifyJsPlugin({
        compress: {
            warnings: true
        }
    })
]
```

* UglifyJsPlugin 压缩loades

UglifyJsPlugin不再压缩loaders,需要手动配置，loaders的压缩模式在v3被取消

```
plugins: [
    new webpack.loaderOptionsPlugin({
        minimize: true
    })
]
```

* ES6的代码分割

在v1中，能使用require.ensure作为方法来懒加载chunks到你的应用中

```
require.ensure([], function(require) {
    var foo = require('./moduls');
})
```

在v2中我们可以使用import

```
function onClick() {
    import('./module').then(module => {
        return module.default;
    }).catch(err => {
        console.log('chunk loading failed');
    })
}
```

* webpack支持模版字符串

