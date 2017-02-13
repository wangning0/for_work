/**
 * 
 * @author wangning
 * 
 */
var swap = require('./swap');

function selectSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }

    var minIndex = 0;
    for(var i = 0; i < arr.length; i++) {
        minIndex = i;
        for( var j = i + 1; j < arr.length; j++ ) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if(minIndex != i) {
            swap(arr, i, minIndex);
        }
    }
    
    return arr;
}

//test
var arr = [1,2,32,12,22,33];
console.log(selectSort(arr));