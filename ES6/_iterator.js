/**
 * Created by wangning on 2016/10/24.
 */
/*
*   for-in循环
*       除了遍历数组元素之外，还会遍历自定义属性。可能会按照随机顺序遍历数组元素
*
* */

// generators 简介

/*
*   当生成器的堆栈结构(本地变量、参数、临时值、生成器内部当前的执行位置)被移出堆栈
*   然而，生成器对象保留了对这个堆栈结构的引用(备份)，所以稍后调用.next()可以宠幸激活堆栈结构并且继续执行。
*
*   值得特别一提的是，生成器不是线程。生成器运行时，他和调用者在同一个线程中，拥有确定的连续执行顺序，永不并发。
*   与系统线程不同的是，生成器只有在其函数体内标记为yield的点才会暂停。
*
* */

function* quips(name) {
    yield "你好" + name + "!";
    yield "希望你能喜欢这个ES6的译文";
    if(name.startsWith("X")) {
        yield "你的名字" + name + "首字母是X，这很酷";
    }
    yield "see u again";
}

var iter = quips("Xangning");
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//可以通过实现[Symbol.iterator]() 和 .next()两个方法就可以创建自定义迭代器

class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if(value < this.stop) {
            this.value++;
            return {done: false, value: value };
        } else {
            return {done: true, value: undefined};
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value);
}