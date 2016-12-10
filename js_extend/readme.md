## js 实现继承的几种方式

* 构造函数绑定  [demo](./call_apply.js)
* prototype模式实现继承  [demo](./prototype_pattern.js)
* 直接继承prototype [demo](./extend_prototype.js)
* 空对象作为媒介 [demo](./object_medium.js)
* 拷贝继承 [demo](./copy_extend.js)

## new操作符的实现细节
* 先创建一个空对象
* 空对象的__proto__ 指向构造函数的prototype
* 把this赋值给这个对象
* 运行构造函数里面的代码
* 返回这个对象

## 浅拷贝和深拷贝
* 主要是针对引用对象这块的拷贝，拷贝后的对象不和原对象在同一块内存区域
