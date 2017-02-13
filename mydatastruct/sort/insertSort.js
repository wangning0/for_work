/**
 * 
 * @author: wangning
 * 
 */

function insertSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }
    
    for(var i = 1; i < arr.length; i++) {
        var j = i;
        var target = arr[i];

        while( j > 0 && target < arr[j-1] ) {
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = target;
    }

    return arr;
}

// test
var arr = [1,2,32,12,22,33];

console.log(insertSort(arr));