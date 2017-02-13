/**
 * @author wangning
 */

var swap = require('./swap');

function bubbleSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }
    for(var i = 0; i < arr.length; i++) {
        for(var j = arr.length - 1; j > i; j--) {
            if(arr[j-1] >arr[j]) {
                swap(arr, j, j-1);
            }
        }
    }
    return arr;
}


// test
var arr = [1,2,32,12,22,33];

console.log(bubbleSort(arr));