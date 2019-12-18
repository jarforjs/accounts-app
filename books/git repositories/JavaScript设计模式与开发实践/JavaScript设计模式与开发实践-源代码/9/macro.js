var closeDoorCommand = {
  execute: function () {
    console.log('关门');
  }
};
var openPcCommand = {
  execute: function () {
    console.log('开电脑');
  }
};

var openQQCommand = {
  execute: function () {
    console.log('登录QQ');
  }
};

var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    },
    undo: function () {
      for (var len = this.commandsList.length - 1, command; command = this.commandsList[len--];) {
        command.execute();
      }
      // for(var i=0,len=this.commandsList.length-1;len>=i;len--){
      //   this.commandsList[len].execute();
      // }
      // var command;
      // while(command=this.commandsList.pop()){
      //   command.execute();
      // }
    }
  }
};
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();
macroCommand.undo();