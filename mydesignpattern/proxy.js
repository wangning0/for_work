/*
  代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问
  保护代理用于控制不同权限的对象对目标对象的访问
  虚拟代理把一些开销很大的对象延迟到真正需要它的时候才去创建
*/

var mult = function() {
  console.log('开始计算乘积');
  var result = 1;
  for(var i = 0; i < arguments.length; i++) {
    result = result * arguments[i];
  }
  return result;
}

// 缓存代理

var proxyMult = (function() {
  var cache = {};
  return function() {
    var args = Array.prototype.slice.apply(arguments);
    if(args in cache) {
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  }
})()

console.log(proxyMult(1, 2, 3, 4)); // 24
console.log(proxyMult(1, 2, 3, 4)); // 24

// 使用场景，分页中，拉取该页的数据后，缓存起来，再下次访问同样的页数的时候，可以利用缓存数据

// 结合工厂模式, 创建缓存代理的工厂

var createProxyFactory = function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.slice.apply(arguments);
    if(args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
}