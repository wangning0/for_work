/**
 * 模版方法模式是一种基于继承的设计模式，是一种只需使用继承就可以实现的非常简单的模式。
 * 
 * 模版方法模式由两个部分组成
 *    一部分是抽象父类
 *    一部分是具体的实现子类
 *  通常在抽象父类中封装了子类的算法框架，包括实现一些公告方法以及封装子类中所有方法的执行顺序，子类通过继承父类这个抽象类，也就继承了整个算法框架，还可以重写父类的方法
 * 
 * 
 */

/**
 *  举例子：
 *    泡咖啡和泡茶都需要以下几个步骤
 *      1. 把水烧开
 *      2. 用沸水冲饮料
 *      3. 把饮料倒进杯子
 *      4. 加调料
 *    可以根据这些公共点来进行构造抽象类
 */

// 抽象类
var Beverage = function() {};

Beverage.prototype.boilWater = function() {
    console.log('把水烧开');
}
Beverage.prototype.brew = function() {
    throw new Error('子类必须重写brew方法');
}
Beverage.prototype.pourInCup = function() {
    throw new Error('子类必须重写pourInCup方法');
}
Beverage.prototype.addCondiments = function() {
    throw new Error('子类必须重写addCondiments方法');
}

// Coffee
var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.constructor = Coffee;

Coffee.prototype.brew = function() {
    console.log('泡咖啡');
}
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子里');
}
Coffee.prototype.addCondiments = function() {
    console.log('加牛奶');
}
// tea
var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.constructor = Tea;

Tea.prototype.brew = function() {
    console.log('泡茶');
}
Tea.prototype.pourInCup = function() {
    console.log('把茶倒进杯子里');
}
Tea.prototype.addCondiments = function() {
    console.log('加柠檬');
}



/**
 *  模版模式的使用场景
 *      在Web开发中也能找到许多模版方法模式的适用场景，比如我们在构建一系列的UI组件，这些组件的构建过程一般如下所示：
 * 
 *      1. 初始化一个div容器
 *      2. 通过Ajax请求拉取相应的数据
 *      3. 把数据渲染到div容器里面，完成组件的构造
 *      4. 通知用户组件渲染完毕
 * 
 * 可以将这四步用一个抽象父类封装起来
 */