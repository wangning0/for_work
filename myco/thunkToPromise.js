/**
 * Created by wangning on 2016/10/25.
 */


function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if(err) reject(err);
            if(arguments.length > 2) res = Array.prototype.slice.call(arguments, 1);
            resolve(res);
        })
    })
};


module.exports = thunkToPromise;