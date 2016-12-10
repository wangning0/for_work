// function *helloworld() {
//   yield "hello";
//   return "world";
// }

// func = helloworld();

// console.log(func.next());
// console.log(func.next());
// console.log(func.next());


// function *f() {
//   for(var i = 0; true ; i++) {
//     var reset = yield i;
//     if(reset) {
//       i = -1;
//     }
//   }
// }

// var g = f();

// console.log(g.next())
// console.log(g.next())
// console.log(g.next(true))

function* objects(){
    yield "cat";
    yield "dog";
    yield "duck";
}
function* say(){
    yield* objects();
    yield " say hello world!";
}
// 如果在generator函数内部需要调用另外一个generator函数，那么对目标函数的调用就需要使用yield*
var g = say();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());