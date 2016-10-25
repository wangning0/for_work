/**
 * Created by wangning on 2016/10/25.
 */

var fs = require('fs');

var readFile = function (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if(err) return reject(err);
            resolve(data);
        })
    })
};

var gen = function* () {
    var f1 = yield readFile('/etc/passwd');
    var f2 = yield readFile('/etc/shells');
    console.log(f1);
    console.log(f2);
};

function run(gen) {
    var g = gen();
    
    function next(data) {
        var result = g.next(data);
        if(result.done) return;
        result.value.then(function (data) {
            next(data);
        },function (err) {
            next(err);
        })
    }

    next();
}

run(gen);