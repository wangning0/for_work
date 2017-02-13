/**
 * 
 * @author wangning
 * 
 */

var swap = require('./swap');

function heapAdjust(arr, start, end) {
    var temp = arr[start];
    
    for(var i = 2 * start + 1; i <= end ; i*=2 ) {
        // 左右孩子节点分别为2i+1 2i+2
        if(i < end && arr[i] < arr[i+1]) {
            i++;
        }

        if(temp >= arr[i]) {
            break;
        }

        arr[start] = arr[i];
        start = i;
    }
    
    arr[start] = temp;
}

function heapSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }

    // 建立大顶堆
    for(var i = Math.ceil(arr.length/2); i >= 0; i--) {
        heapAdjust(arr, i, arr.length - 1);
    }

    for(var i = arr.length - 1; i >= 0; i-- ) {
        swap(arr, 0, i);
        heapAdjust(arr, 0, i - 1);
    }

    return arr;
}

var arr = [3,2,32,12,22,33,31123,23123,9,234,432,1243];
console.log(heapSort(arr));