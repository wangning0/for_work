/*
  迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示,迭代器模式可以把迭代的过程从业务
            逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部结构，也可以按顺序访问i 中的每个元素
*/

// 内部迭代器：调用的时候很方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅仅是一次初始调用，但这也刚好是内部迭代器
//           的缺点。

// 比较两个数组是否相等
var each = function(arr, callback) {
  for(var i = 0; i < arr.length; i++) {
    callback.call(arr[i], i, arr[i]);
  }
}
var compare = function(arr1, arr2) {
  if(arr1.length != arr2.length) {
    throw new Error('两个数组不相等');
  }
  each(arr1, function(i, n) {
    if(n != arr2[i]) {
      throw new Error('两个数组不相等');
    }
  })
  console.log('两个数组相等');
}

// 外部迭代器：必须要显示地请求迭代下一个元素。增加了一些调用的复杂度，但相对也增强了迭代器的灵活性我们可以手工控制迭代的过程或顺序

// 比较两个数组是否相等

var Iterator = function(obj) {
  var current = 0;

  var next = function() {
    current += 1;
  }

  var isDone = function() {
    return current >= obj.length;
  }

  var getCurrentItem = function() {
    return obj[current];
  }

  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  }
}

var compare = function(iterator1, iterator2) {
  while(!iterator1.isDone && !iterator1.isDone) {
    if(iterator1.getCurrentItem() != iterator2.getCurrentItem()) {
      throw new Error('两个数组不相等');
    }

    iterator1.next();
    iterator2.next();
  }

  console.log('两个数组相等');
}

var iterator1 = new Iterator([1,2,3]);
var iterator2 = new Iterator([1,2,3,4]);

console.log(iterator1 == iterator2);

