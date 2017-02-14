/**
 * 
 * @author wangning
 * 
 */

function mSort(arr, left, right) {
    if(left >= right) {
        return;
    }
    var middle = parseInt((left + right) / 2);
    mSort(arr, left, middle);
    mSort(arr, middle + 1, right);
    merge(arr, left, middle, right);
}

function merge(arr, left, middle, right) {
    var temp = [];
    var i = left;
    var j = middle + 1;
    var k = 0;
    while(i <= middle && j <= right) {
        if(arr[i] < arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while(i <= middle) {
         temp[k++] = arr[i++];
    }
     while(j <= right) {
         temp[k++] = arr[j++];
    }

    for(var p = 0; p < temp.length; p++) {
        arr[left + p] = temp[p];
    }
}

function mergeSort(arr) {
    if(arr == null || arr.length == 0) {
        return;
    }
    mSort(arr, 0, arr.length - 1);
    return arr;
}


//test
var arr = [49, 38, 65, 97, 76, 13, 27];
console.log(mergeSort(arr));