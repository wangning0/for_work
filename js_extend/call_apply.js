/**
 * Created by wangning on 2016/10/20.
 */
//构造函数绑定的方式去实现继承

// 第一种构造函数绑定

function Animal() {
    this.species = "动物";
}

function Cat(name,color) {
    Animal.apply(this,arguments);
    this.name = name;
    this.color = color;
}

var cat1 = new Cat('大毛','黄色');

console.log(cat1.species);
console.log(cat1.name);
console.log(cat1.color);