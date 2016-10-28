/**
 * Created by wangning on 2016/10/28.
 */

/*
*   Symbol 是一种互不等价的标注，
*   是一种值类型， 而非引用类型，所以如果将Symbol值作为函数形参进行传递，将会进行复制值传递而非引用传递
* */

const symbol = Symbol('hello');

function fn1(_symbol) {
    return _symbol == symbol;
}

console.log(fn1(symbol));

function fn2(_symbol) {
    _symbol = null;
    console.log(_symbol);
}

fn2(symbol);

console.log(symbol);