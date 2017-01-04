/*
  策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们能够相互替换
  一个基于策略模式的程序至少由两个部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
  第二个是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。
*/

// Base 
var cacluateBonus = function(performanceLevel, salary) {
  if(performanceLevel === 'S') {
    return salary * 4;
  }
  if(performanceLevel === 'A') {
    return salary * 3;
  }
  if(performanceLevel === 'B') {
    return salary * 2;
  }
}

cacluateBonus('S', 2000);
cacluateBonus('A', 2000);

// 策略模式重构
(function() {
  var performanceS = function() {};
  performanceS.prototype.calcuate = function(salary) {
    return salary * 4;
  }

  var performanceA = function() {};
  performanceA.prototype.calcuate = function(salary) {
    return salary * 3;
  }

  var performanceB = function() {};
  performanceB.prototype.calcuate = function(salary) {
    return salary * 2;
  }

  var Bonus = function() {
    this.salary = null;
    this.strategy = null;
  }
  Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
  }
  Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy;
  }
  Bonus.prototype.getBonus = function() {
    return this.strategy.calcuate(this.salary);
  }

  // test

  var bonus = new Bonus();
  bonus.setSalary(1000);
  bonus.setStrategy(new performanceS());
  console.log(bonus.getBonus());
  bonus.setStrategy(new performanceA());
  console.log(bonus.getBonus());
})();

// JS 版本的策略模式

(function() {
  var strategies = {
    "S": function(salary) {
      return salary * 4;
    },
    "A": function(salary) {
      return salary * 3;
    },
    "B": function(salary) {
      return salary * 2;
    }
  }

  var calcuateBonus = function(level, salary) {
    return strategies[level](salary);
  }

  //test
  console.log(calcuateBonus('S',1000));
  console.log(calcuateBonus('A',1000));

})();

// 策略模式下的文本输入框对应的多种校验规则

/**************策略对象***************/

var strategies = {
  isEmpty: function(value, errorMsg) {
    if(value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if(value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
}

/**************Validator类***************/

var Validator = function() {
  this.cache = [];
}

Validator.prototype.add = function(dom, rules) {
  var self = this;
  for(var i = 0, rule; rule = rules[i]; i++) {
    (function(rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      self.cache.push(function() {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry);
      })
    })(rule)
  }
};

Validator.prototype.start = function() {
  for(var i = 0, validatorFunc; validatorFunc = this.cache[i]; i++) {
    var errorMsg = validatorFunc();
    if(errorMsg) {
      return errorMsg;
    }
  }
}

/**************客户调用代码***************/

var registerForm = document.getElementById('registerForm');

var validateFunc = function() {
  var validator = new Validator();
  validator.add(registerForm.username, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '长度不能小于6位'
  }]);

  validator.add(registerForm.password, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);

  validator.add(registerForm.phone, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]);
}

registerForm.onSubmit = function() {
  var errorMsg = validateFunc();

  if(errorMsg) {
    console.log(errorMsg);
    return false;
  }
}


