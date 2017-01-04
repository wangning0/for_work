/*
  单例模式： 保证一个嘞仅有一个实例，比提供一个访问它的全局访问点
  JS单例模式的核心：确保只有一个实例，并提供全局访问
  惰性单例是单例模式的重点
*/

// 实现一个标准的单例模式

var Singleton = function(name) {
  this.name = name;
}

Singleton.prototype.getName = function(name) {
  console.log(this.name);
}

Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if(!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();


// test

var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');

console.log(a == b); //true


// Q: 在上述过程中，铜用户需要知道该类是一个单例模式的类，以及相对应的接口instance

// “透明”的单例模式

// CreateDiv 负责在页面中创建唯一的div节点

var CreateDiv = (function() {
  var instance;

  var CreateDiv = function(html) {
    if(instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  }

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }

  return CreateDiv;
})()

// Q: 如果需求变化为，即可以生成多个div节点，又可以生成唯一的div节点，则我们需要改变CreateDiv构造函数

// 改变

var CreateDiv = function(html) {
  this.html = html;
  this.init();
}

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div); 
}

var ProxySingletonCreateDiv = (function() {
  var instance;

  return function(html) {
    if(instance) {
      return instance;
    }
    instance = new CreateDiv(html);
  }
})()


// 惰性单例：在需要的时候才创建对象实例

var getSingle = function(fn) {
  var result;
  return funtion() {
    return result || (result = fn.apply(this, arguments));
  }
}

var createLoginLayer = function() {
  var div = document.createElement('div');
  div.innerHTML = 'login';
  div.style.display = 'none';
  document.body.append(div);
  return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);

// 还可以创建多个对象，降低了耦合度

