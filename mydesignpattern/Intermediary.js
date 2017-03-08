/**
 *  中介者模式： 作用是杰出对象与对象之间的耦合关系，增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是相互引用，所以当一个对象发生
 *             了改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使得网状的多对多关系变
 *             成了相对简单的一对多关系。
 *
 */

// 现实生活中中介者的例子有 机场的指挥塔， 博彩公司


// 以泡泡糖游戏举例，如果说是非中介者模式的话，一旦玩家过多，有一个玩家掉线活着死亡，我必须从所有的玩家的队友列表和敌人列表中删除这个玩家，效率低下

// 中介者模式下的泡泡糖游戏

function Player(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.active = 'alive';
}

Player.prototype.win = function() {
    console.log(this.name + 'win');
}
Player.prototype.lose = function() {
    console.log(this.name + 'lose');
}
Player.prototype.die = function() {
    this.active = 'die';
    playerDirector.ReceiveMessage('playerDead', this);
}
Player.prototype.remove = function() {
     playerDirector.ReceiveMessage('removePlayer', this);
}
Player.prototype.changeTeam = function(color) {
     playerDirector.ReceiveMessage('changeTeam', this, color);
}

// 工厂模式生产玩家
var playerFactory = function(name, teamColor) {
    var newPlayer = new Player(name, teamColor);
    playerDirector.ReceiveMessage('addPlayer', newPlayer);
    return newPlayer;
}

// playerDirector 中介模式下的控制器

var playerDirector = (function() {
    var players = {};
    var operations = {};

    operations.addPlayer = function(player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    }

    operations.removePlayer = function(player) {
        var teamColor = player.teamColor;
        var teamPlayers = players[teamColor] || [];
        for(var i = 0; i < teamPlayers.length; i++) {
            if(teamPlayers[i] == player) {
                teamPlayers.splice(i, 1);
            }
        }
    },

    operations.changeTeam = function(player, color) {
        operations.removePlayer(player);
        player.teamColor = color;
        operations.addPlayer.add(player);
    },

    operations.playerDead = function(player) {
        var teamColor = player.teamColor;
        var teamPlayers = players[teamColor];
        var all_dead = true;

        for(var i = 0; i < teamPlayers.length ; i++) {
            if(teamPlayers[i].active == 'alive') {
                all_dead = false;
                break;
            }
        }

        if(all_dead == true) {
            for(var i = 0; i < teamPlayers.length ; i++) {
                teamPlayers[i].lose();
            }
            for(var color in players) {
                if(color != teamColor) {
                    var teamPlayers = players[color];
                    for(var i = 0; i < teamPlayers.length; i++) {
                        teamPlayers[i].win();
                    }
                }
            }
        }
    }

    var ReceiveMessage = function() {
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    }

    return {
        ReceiveMessage: ReceiveMessage
    }
})();

var player1 = playerFactory('1', 'red');
var player2 = playerFactory('2', 'red');

var player11 = playerFactory('3', 'blue');
var player12 = playerFactory('4', 'blue');

player1.die();
player2.die();


// 中介者模式的例子  购买商品

