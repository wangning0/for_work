/**
 * Created by wangning on 2016/10/21.
 */

// new运算符的实现细节

function Animal() {
    this.species = 'animal';
}

var cat = new Animal();

//等同于

var obj = {
    name:'cat'
};

obj.__proto__ = Animal.prototype;
Animal.call(obj);   //this指针指向obj
console.log(obj.name);