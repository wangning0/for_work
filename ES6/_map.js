/**
 * Created by wangning on 2016/10/28.
 */

/*
*   Map 映射类型在计算机科学中的定义属于关联数组，定义为若干个键值队组成的集合，其中每一个键都只能出现一次。
*
*   操作：
*       map.set(key, value)
*       map.get(key)
*       map.delete(key)
*       map.clear()
*       map.has(key)
*       map.entries() //返回一个以二元数组作为元素的数组
*       map.keys() //返回一个以当前映射中所有键作为元素的可迭代对象
*       map.value(s) //返回一个以当前映射中所有值作为元素的可迭代对象
*       map.size 映射中键值对的数量
* */

//初始化
const map = new Map([['foo', 1],['bar', 2]]);
map.set('name', 1);
console.log(map);
console.log(map.entries());

const map1 = new Map();
console.log(map1);

for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}

console.log(map.size);

// Object和Map的区别
/*
*   Object 的JSON序列化结果是标注的对象字面量形式，而Map对象JSON处理结果则是以关联数组的形式表达出来。
*   这种序列化结果的意义在于可以通过网络等方式传输了结果后，再通过JSON.parse方法直接将解释结果传入Map构造函数中，来得到正确的Map对象
*
* */

const map2 = new Map();
map2.set('name', 'wangning');
map2.set('age', 20);
console.log(map2);


// WeakMap和WeakSet相似

const weakm = new WeakMap();
let keyObject = {id: 1};
let valueObject = {score: 100};
weakm.set(keyObject, valueObject);
console.log(weakm.get(keyObject));

keyObject = null;
console.log(weakm.has(keyObject));
