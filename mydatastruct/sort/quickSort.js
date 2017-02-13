/**
 * 
 * @author: wangning
 * 
 */

var swap = require('./swap');

function partition(arr, left, right) {
    var pivotKey = arr[left];
    var pivotPointer = left;
    while(left < right) {
        // 顺序很重要
        while(left < right && arr[right] >= pivotKey) {
            right--;
        }
        while(left < right && arr[left] <= pivotKey) {
            left++;
        }
    }
    swap(arr, pivotPointer, left);
    return left;
}

function quickSort(arr, left, right) {
    if(left >= right) {
        return;
    }
    var pivotPos = partition(arr, left, right);
    quickSort(arr, left, pivotPos - 1);
    quickSort(arr, pivotPos + 1, right);
}

function sort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }
    quickSort(arr, 0, arr.length-1);

    return arr;
}
//test
var arr = [3,2,32,12,22,33];
console.log(sort(arr));