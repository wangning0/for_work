/**
 * Created by wangning on 2016/11/3.
 */

var currying = function (fn) {
    var arg = [].slice.call(arguments, 1);
    return function () {
        var newArgs = arg.concat([].slice.call(arguments));
        return fn.apply(null, newArgs);
    }
}

var getWife = currying(function () {
    var allWife = [].slice.call(arguments);
    console.log(allWife.join(','))
}, '合法老婆');

getWife('大老婆','二老婆','三老婆','四老婆','五老婆');

getWife('韦小宝的老婆');