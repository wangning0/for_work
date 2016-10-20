/**
 * Created by wangning on 2016/10/20.
 */

//第三种方式是直接继承prototype

function Animal() {}

Animal.prototype.species = 'animal';

function Cat(name,color) {
    this.name = name;
    this.color = color;
}

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat; //这句话把Animal.prototype也改变了


var cat1 = new Cat('cat1','blue');
console.log(cat1.species);