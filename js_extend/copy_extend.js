/**
 * Created by wangning on 2016/10/20.
 */

//第五种继承方式为拷贝继承

function Animal() {}
Animal.prototype.species = 'animal';

function Cat(name,color) {
    this.name = name;
    this.color = color;
}

function extend(Child,Parent) {
    var c = Child.prototype;
    var p = Parent.prototype;

    for(var i in p) {
        c[i] = p[i];
    }

}

extend(Cat,Animal);

var cat1 = new Cat('cat1','blue');
console.log(cat1.species);