/**
 * Created by wangning on 2016/10/25.
 */
//用Promise.all的方法把promise数组组成一个新的promise对象
function objectToPromise(obj) {
    var results = new obj.constructor();
    var promises = [];
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this,obj[key]);
        if(promise && isPromise(promise)) defer(promise, key);
        else results[key] = obj[i]
    }

    return Promise.all(promises).then(function () {
        console.log(results);
    });
    
    function defer(promise, key) {
        results[key] = undefined;
        promises.push(promise.then(function (res) {
            results[key] = res;
        }))
    }
}

module.exports = objectToPromise;