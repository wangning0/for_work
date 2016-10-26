/**
 * Created by wangning on 2016/10/24.
 */
// class Point {
//     constructor(x, y) {
//         // ...
//     }
//
//     toString() {
//         // ...
//     }
// }

// let a = Object.keys(Point.prototype)
// console.log(a);
// // []
// let b = Object.getOwnPropertyNames(Point.prototype)
// console.log(b);
//
// let person = new class {
//     constructor(name) {
//         this.name = name;
//     }
//
//     sayName() {
//         console.log(this.name);
//     }
// }('wangning');
//
// person.sayName();

//私有方法的实现
/*
*   因为bar和snaf都是Symbol的值，导致第三方无法获取到他们，因此达到了私有方法和私有属性的效果
*
* */
// const bar = Symbol('bar');
// const snaf = Symbol('snaf');
//
// class myClass {
//     foo(baz) {
//         this[bar](baz);
//     }
//
//     [bar](baz) {
//         return this[snaf] = baz;
//     }
// }
//
// let myclass = new myClass();
// myclass.foo('name');

// class内的this用法，内部的this默认指向类的实例，但是，一旦单独使用该方法，则很容易出错

// class Logger {
//     printName(name = 'there') {
//         this.print(`hello ${name}`);
//     }
//     print(text) {
//         console.log(text);
//     }
// }
//
// const logger = new Logger();
// const { printName } = logger;
// //printName(); //TypeError

//解决方案一，用bind绑定this

// class Logger {
//     constructor() {
//         this.printName = this.printName.bind(this);
//     }
//     printName(name = 'there') {
//         this.print(`hello ${name}`);
//     }
//     print(text) {
//         console.log(text);
//     }
// }
// const logger = new Logger();
// const { printName } = logger;
// printName();

//解决方案二，箭头函数

// class Logger {
//     constructor() {
//         this.printName = (name = 'there') => {
//             this.print(`hello ${name}`);
//         }
//     }
//     print(text) {
//          console.log(text);
//      }
// }
// const logger = new Logger();
// const { printName } = logger;
// printName();

//解决方案三，使用Proxy，获取方法的时候，自动绑定this  不明白！！！！！！！等学了Proxy后再看这个

// function selfish (target) {
//     const cache = new WeakMap();
//     const handler = {
//         get (target, key) {
//             const value = Reflect.get(target, key);
//             if (typeof value !== 'function') {
//                 return value;
//             }
//             if (!cache.has(value)) {
//                 cache.set(value, value.bind(target));
//             }
//             return cache.get(value);
//         }
//     };
//     const proxy = new Proxy(target, handler);
//     return proxy;
// }
//
// const logger = selfish(new Logger());

// name属性

// class Point {
//
// }
// console.log(Point.name); //Point

//class的继承
/*
*   子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象 然后对其进行加工
*
*   如果子类没有定义constructor方法，这个方法会被默认添加
*   constructor(...arg) {
*       super(..arg);
*   }
*
*   在ES5中，我们是先得到了子类的this对象后，然后再将父类的this对象用在子类上
*   ES6中，先得到父类的this对象，再在上面增加子类的方法
*
* */

// class Point {
//     constructor(x,y) {
//         this.x = x;
//         this.y = y;
//     }
// }
//
// class ColorPoint extends Point {
//     constructor(x, y, color) {
//         super(x, y); //调用父类的constructor(x, y)
//         this.color = color;
//     }
//     toString() {
//         return this.color + ' ' + super.toString(); //调用父类的toString()
//     }
// }

//类的prototype属性和__proto__属性

/*
*   同时存在两条继承链
*       1. 子类的__proto__属性，表示构造函数的继承，总是指向父类
*       2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
* */

//class A {}
//class B extends A {}

//console.log(B.__proto__ == A);                     //构造函数继承
//console.log(B.prototype.__proto__ == A.prototype); //方法继承


