/*
  命令模式：命令指的是一个执行某些特定事情的指令
  有些时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件
  使得请求发送者何请求接收者能够消除彼此之间的耦合关系
*/

var setCommand = function(button, command) {
  button.click = function() {
    command.execute();
  }
}

var MenuBar = {
  refresh: function() {
    console.log('刷新菜单目录');
  }
}

var SubMenu = {
  add: function() {
    console.log('添加菜单');
  },
  del: function() {
    console.log('删除菜单');
  }
}

var RefreshMenuBarCommand = function(receiver) {
  this.receiver = receiver;
}
RefreshMenuBarCommand.prototype.execute = function() {
  this.receiver.refresh();
}

var AddMenuBarCommand = function(receiver) {
  this.receiver = receiver;
}
AddMenuBarCommand.prototype.execute = function() {
  this.receiver.add();
}

var DelMenuBarCommand = function(receiver) {
  this.receiver = receiver;
}
DelMenuBarCommand.prototype.execute = function() {
  this.receiver.del();
}

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
setCommand('button1', refreshMenuBarCommand);

// JS的命令模式

var setCommand = function(button, command) {
  button.onclick = function() {
    command.execute();
  }
}

var RefreshMenuBarCommand = function(receiver) {
  return {
    execute: function() {
      receiver.refresh();
    }
  }
}

var refreshMenuBarCommand = new RefreshMenuBarCommand();
setCommand('button', refreshMenuBarCommand);


// 宏命令 指的是一组命令的集合

var closeDoorCommand = {
  execute: function() {
    console.log('关闭门');
  }
}

var openPCCommand = {
  execute: function() {
    console.log('打开电脑');
  }
}

var openQQCommand = {
  execute: function() {
    console.log('登录QQ');
  }
}

// 宏命令

var MacroCommand = function() {
  return {
    commandLists: [],
    add: function(command) {
      this.commandLists.push(command);
    },
    execute: function() {
      for(var i = 0, command; command = this.commandLists[i++]) {
        command.execute();
      }
    }
  }
}


// 命令模式在JS中和策略模式一样 是一种隐形的模式