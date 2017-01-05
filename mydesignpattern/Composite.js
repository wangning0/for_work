/*
  组合模式：用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的
  组合模式将对象组合成树形结构，以表示"部分-整体"的层次结构
*/

// 以宏命令为例，请求从树最顶端的对象往下传递，如果当前处理请求的对象是叶对象，叶对象自身会对请求进行处理；
// 如果当前处理请求的对象是组合对象，组合对象则会遍历它属下的子节点，将请求继续传递给这些子节点

var MacroCommand = function() {
  return {
    commandLists: [],
    add: function(command) {
      this.commandLists.push(command);
    },
    execute: function() {
      for(var i = 0, command; command = this.commandLists[i++];){
        command.execute();
      }
    }
  }
}

var openAcCommand = {
  execute: function() {
    console.log('开空调');
  }
}

var openTVCommand = {
  execute: function() {
    console.log('开电视');
  }
}

var openSoundCommand = {
  execute: function() {
    console.log('开音响');
  }
}

var macroCommand1 = new MacroCommand();
macroCommand1.add(openTVCommand);
macroCommand1.add(openSoundCommand);

var closeDoorCommand = {
  execute: function() {
    console.log('关门');
  }
}

var openPCCommand = {
  execute: function() {
    console.log('开电脑');
  }
}

var openQQCommand = {
  execute: function() {
    console.log('开qq');
  }
}

var macroCommand2 = new MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPCCommand);
macroCommand2.add(openQQCommand);


var macroCommand = new MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

macroCommand.execute();

// 组合模式适用于下面两个情况

// 表示对象的部分-整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分-整体结构，只需要通过请求树的最顶层对象，便能对整个
   // 树做统一的操作
// 客户希望统一对待树中的所有对象，组合模式使客户可以忽略组合对象和叶对象的区别