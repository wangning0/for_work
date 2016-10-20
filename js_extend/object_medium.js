/**
 * Created by wangning on 2016/10/20.
 */

//空对象作为媒介

function Animal() {};
Animal.prototype.species = 'animal';

function F() {}
F.prototype = Animal.prototype;

function Cat(name,color) {
    this.name = name;
    this.color = color;
}

Cat.prototype = new F();
Cat.prototype.constructor = Cat;

var cat1 = new Cat('cat1','blue');

//一个实例没有prototype对象
//cat1.__proto__ == Cat.prototype;