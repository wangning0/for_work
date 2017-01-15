// let koa = require('koa');

// let app = koa();

// app.use(function *(next) {
//   if(this.path !== '/') {
//     return yield next;
//   }
//   this.body = 'hello world';
// })

// app.use(function *(next) {
//   if(this.path !== '/404') {
//     return yield next;
//   }
//   this.body = 'page not found';
// })

// app.use(function *(next) {
//   if(this.path !== '/500') {
//     return yield next;
//   }
//   this.body = 'error';
// })

// app.listen(9090,() => console.log('9090'));

var Koa = require('koa');
var app = new Koa();

app.use(function *() {
  yield console.log(this.request);
})

app.listen(3000);
