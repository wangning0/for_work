# express源码分析

## 中间件

中间件函数能够访问请求对象，响应对象以及应用程序的请求／响应循环中的下一个中间件函数，下一个
中间件函数通常由名为next的变量来表示。当前中间件函数如果没有结束请求／响应循环，那么它必须调用
next()，已将控制权传递给下一个中间件函数。否则将保持挂起状态


## 为Express开发模版引擎

```
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', ''+ options.title +'')
    .replace('#message#', ''+ options.message +'');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine

```