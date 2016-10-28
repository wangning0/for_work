/**
 * Created by wangning on 2016/10/27.
 */

/*
*   set数据解构 集合  无序性 不可重复性
*
*   长度为size
*
*   set.add(value)
*   set.delete(value)
*   set.has(value)
*   set.clear()
*   set.forEach(callbackFn[, context])
* */

// const set = new Set();
//
// //可以利用数组进行初始化
//
 const set_one = new Set([1, 2, 3]);
//
// set.add(1).add(2).add(3).add(3);
//
// set.delete(2);
//
// console.log(set);
//
// console.log(set.has(2));
//
// set.forEach(item => console.log(item));
//
// // 拥有迭代器 可以迭代
//
// for (const val of set) {
//     console.log(val);
// }

/*
*   WeakSet
*         WeakSet不能高喊值类型元素， 否则会抛出一个TypeError
*         WeakSet不能包含无引用的对象， 否则会自动清除出集合
*         WeakSet无法被探知其大小，也无法被探知其中所包含的元素
* */

const weakset = new WeakSet();
// weakset.add(1); //TypeError: Invalid value used in weak set

weakset.add({foo: 1});
// console.log(weakset); //WeakSet {}

// console.log(weakset.size); //undefined

//一旦数据结构内的任一元素的引用全部解除，该元素便会被移除出当前所在的数据结构

let foo = {bar: 1};

weakset.add(foo);

console.log(weakset.has(foo)); //true
console.log(weakset.size); //undefined

foo = null;

console.log(weakset.has(foo)); //false