/**
 * Created by wangning on 2016/10/26.
 */

//import { EventEmitter } from 'events';
//
// const emitter = new EventEmitter();
//
// emitter.on('event', msg => {
//     console.log(`received message : ${msg}`);
// })
//
// emitter.emit('event', 'Hello, world');

// 因为构造函数的继承是通过__proto__去继承的
// 方法的继承是通过 prototype属性的__proto__属性 去继承父类的prototype属性
// const machine = {
//     __proto__: new EventEmitter()
// }
//
// console.log(machine);
// console.log(machine instanceof EventEmitter);
//
// machine.on('event', msg => {
//     console.log(`received message : ${msg}`);
// })
//
// machine.emit('event', 'Hello, world');

//class内部增加迭代器的方法

const fibo = {
    a: 0,
    b: 1,
    [ Symbol.iterator ]() {
        return {
            next() {
                [fibo.a, fibo.b] = [fibo.b, fibo.a + fibo.b];
                return {done: false, value: fibo.b};
            }
        }
    }
}

for(const n of fibo) {  //for...of循环 是基于iteartor
    if(n > 100) break;
    console.log(n.toString());
}


