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

// class Animal {
//     constructor(species, name) {
//         this.species = species;
//         this.name = name;
//     }
//     getName() {
//         return function () {
//             console.log(this);  //undefined
//         }
//     }
// }

// class Animal {
//     constructor(species, name) {
//         this.species = species;
//         this.name = name;
//     }
//     getName() {
//         return () => {
//             console.log(this.name);
//         }
//    }
// }

// const dog = new Animal('dog', 'xh');
// dog.getName()();


// class Point2D {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     toString() {
//         return `(${this.x}, ${this.y})`
//     }
// }
//
// class Point3D extends Point2D {
//     constructor(x, y, z) {
//         super(x ,y);
//         this.z = z;
//     }
//
//     toString(x, y, z) {
//         return `(${this.x}, ${this.y}, ${this.z})`;
//     }
// }
//
// var a = new Point3D(1, 2, 3);
// console.log(a.toString())

// 如果一个子类继承了一个父类，那么在子类的constructor构造函数中必须使用super函数调用父类的构造函数后才能在子类的constructor构造函数中使用
// this,否则会报出this is not defined的错误

//Getter/Setter 元编程的概念，特点在于 允许程序可以对运行时的对象进行读取和操作，从而使程序可以脱离代码从字面上为程序定义的一些限制，有了对对象的更高操作权限

// const Counter = {
//     _count: 1,
//     get value() {
//         return this._count++;
//     }
// };
// console.log(Counter.value);
// console.log(Counter.value);
// console.log(Counter.value);
//
// const List = {
//     _array: [],
//     set new(value) {
//         this._array.push(value)
//     },
//     get last() {
//         return this._array[0];
//     },
//     get value() {
//         return this._array;
//     }
// };
//
// List.new = 4;
// List.new = 5;
// List.new = 6;
// console.log(List.last);
// console.log(List.value);

// class与Getter/Setter在类中的使用，配合元编程

class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get d() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
};

var p = new Point2D(3, 4);
console.log(p.d);

/*
*   class的静态方法
*
*       如果在类的一个方法前面加上了static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法"
*
*       父类的静态方法，可以被子类继承
* */

// class Foo {
//     static classMethod() {
//         console.log('hello')
//     }
// }
//
// Foo.classMethod();
//
// const foo = new Foo();
// //foo.classMethod();  //foo.classMethod is not a function
//
// class Bar extends Foo {
//     static barclassMethod () {
//         console.log('bar')
//     }
// }
//
// Bar.classMethod();
// Bar.barclassMethod();

/*
*
*   class 的静态属性，ES6规定Class内部只有静态方法，没有静态属性
*
* */

//唯一的一种写法定义class的静态属性


class Foo {
}

Foo.prop = 1;
console.log(Foo.prop);

/*
*   ES7 对于静态属性的提案
* */

// 类的实例属性可以用等式

class MyClass {
    myProp = 1;
    constructor() {
        console.log(this.myProp); //在类的实例上，可以读取这个属性
    }
}
//以前我们定义实例属性，只能写在类的constructor方法里

class ReactCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
}

//new style
class ReactCounter extends React.Component {
    state = {
        count: 0
    }
}

//类的静态属性 ，在属性名前加上static