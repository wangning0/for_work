/*
  发布-订阅模式叫做观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

  如何实现发布-订阅模式
  首先要指定好谁充当发布者
  然后给发布者添加一个缓存列表，用于存放回掉函数以便通知订阅者
  最后发布消息的时候，发布者会遍历这个缓存列表，依次出发里面存放的订阅者回调函数
*/

//  售楼部与顾客的订阅-发布模式

var salesOffices = {};
salesOffices.clientList = {};

salesOffices.listen = function(key, fn) {
  if(!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
}

salesOffices.trigger = function() {
  var key = Array.prototype.shift.apply(arguments);
  var fns = this.clientList[key];

  if(!fns || fns.length == 0) {
    return false;
  }

  for(var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);
  }
}

salesOffices.listen('s88', function(price) {
  console.log(price);
})

salesOffices.listen('s99', function(price) {
  console.log(price);
})

salesOffices.trigger('s88', 200);
salesOffices.trigger('s99', 300);

// 发布-订阅的通用实现

var event = {
  clientList: {},
  listen: function(key, fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.apply(arguments);
    var fns = this.clientList[key];

    if(!fns || fns.length == 0) {
      return false;
    }

    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }
};

var installEvent = function(obj) {
  for(var i in event) {
    obj[i] = event[i];
  }
}

// 取消订阅的事件

event.remove = function(key, fn) {
  var fns = this.clientList[key];

  if(!fns) {
    return false;
  }

  if(!fn) {
    this.clientList[key] = [];
  } else {
    for( var l = fns.length - 1; l >= 0 ; l--) {
      var _fn = fns[l];
      if(_fn == fn) {
        fns.splice(l, 1);
      }
    }
  }
}


// 全局的Event对象实现的发布-订阅模式，订阅者不需要知道消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者。Event类似于中介

var Event = (function() {
  var clientList = {},
      listen,
      trigger,
      remove;
  listen = function(key, fn) {
    if(!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function() {
    var key = Array.prototype.shift.apply(arguments);
    var fns = clientList[key];

    if(!fns || fns.length == 0) {
      return false;
    }

    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }
  remove = function(key, fn) {
    var fns = clientList[key];

    if(!fns) {
      return false;
    }

    if(!fn) {
      clientList[key] = [];
    } else {
      for( var l = fns.length - 1; l >= 0 ; l--) {
        var _fn = fns[l];
        if(_fn == fn) {
          fns.splice(l, 1);
        }
      }
    }
  }

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})();

Event.listen('s88', function(price) {
  console.log(price);
})

Event.trigger('s88', 100);
