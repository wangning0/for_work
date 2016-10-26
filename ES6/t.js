'use strict';

var _events = require('events');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by wangning on 2016/10/26.
                                                                                                                                                                                                                   */

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

var fibo = _defineProperty({
    a: 0,
    b: 1
}, Symbol.iterator, function () {
    return {
        next: function next() {
            var _ref = [fibo.b, fibo.a + fibo.b];
            fibo.a = _ref[0];
            fibo.b = _ref[1];

            return { done: false, value: fibo.b };
        }
    };
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = fibo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        if (n > 100) break;
        console.log(n.toString());
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
