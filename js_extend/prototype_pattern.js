/**
 * Created by wangning on 2016/10/20.
 */

//第二种方式为prototype模式实现继承

function Animal() {
    this.species = 'animal';
}

function Cat(name,color) {
    this.name = name;
    this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat; 

var cat1 = new Cat('cat1','blue');

console.log(cat1.species);
console.log(cat1.hasOwnProperty('species'));
console.log("species" in cat1);