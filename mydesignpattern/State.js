/**
 *  状态模式： 关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变
 * 
 */

// 非状态模式下 电灯程序

var Light = function() {
    this.state = 'off';
}
Light.prototype.buttonWasPressed = function() {
    if(this.state == 'off') {
        console.log('开灯啦！');
        this.state = 'on';
    } else if(this.state == 'on') {
        console.log('关灯了!');
        this.state = 'off';
    }
}

// 上述例子完美的状态机，但是如果要改变了需求，可能不止这两种状态的话，我们需要修改buttonWasPressed 违反封闭-开放原则

/**
 *  用状态模式改进电灯程序
 * 
 *  在状态模式下，它的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部
 * 
 */


// OffLightState
var OffLightState = function(light) {
    this.light = light;
}
OffLightState.prototype.buttonWasPressed = function() {
    console.log('weak light');
    this.light.setState(this.light.weakLightState);
}

var WeakLightState = function(light) {
    this.light = light;
}
WeakLightState.prototype.buttonWasPressed = function() {
    console.log('strong light');
    this.light.setState(this.light.strongLightState);
}

var StrongLightState = function(light) {
    this.light = light;
}
StrongLightState.prototype.buttonWasPressed = function() {
    console.log('cloe light');
    this.light.setState(this.light.offLightState);
}

var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
}
Light.prototype.init = function() {
    this.currentState = this.offLightState;
}
Light.prototype.buttonWasPressed = function() {
    this.currentState.buttonWasPressed();
}
Light.prototype.setState = function(newState) {
    this.currentState = newState;
}

var light = new Light();
light.init();
light.buttonWasPressed();
light.buttonWasPressed();
light.buttonWasPressed();