/**
 * 
 * @author: wangning
 * 
 */

function shellInsert(arr, d) {
    for( var i = d; i < arr.length; i++ ) {
        var j = i - d;
        var temp = arr[i];
        while( j >=0 && arr[j] > temp ) {
            arr[j + d] = arr[j];
            j -= d;
        }

        if(j != i - d) {
            arr[j + d] = temp;
        }
    }
}

function shellSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }
    var d = parseInt(arr.length / 2);
    
    while( d >= 1) {
        shellInsert(arr, d);
        d = parseInt(d / 2);
    }

    return arr;
}


// test
var arr = [3,2,32,12,22,33,31123,23123,9,234,432,1243];
console.log(shellSort(arr));