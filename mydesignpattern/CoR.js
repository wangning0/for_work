/**
 * 
 *  职责链模式： 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的关系，将这些对象连城一条链，并沿着这条链传递该请求，知道有一个对象处理它为止
 *  生活中常见的职责链：上公交，太挤了，拿钱叫前面的人帮忙传递一下给售票员
 * 
 */

/**
 *  
 * @param orderType 
 * 1    500元定金用户
 * 2    200元定金用户
 * 3    普通级用户
 */

// 非职责链开发模式

var order = function(orderType, pay, store) {
    if(orderType == 1) {
        if(pay == true) {
            console.log('500元定金支付，获得100元优惠卷');
        } else {
            if(store > 0) {
                console.log('普通购买，无优惠卷');
            } else {
                console.log('无货');
            }
        }
    } else if(orderType == 2) {
        if(pay == true) {
            console.log('200元定金支付，获得50元优惠卷');
        } else {
            if(store > 0) {
                console.log('普通购买，无优惠卷');
            } else {
                console.log('无货');
            }
        }
    } else if(orderType == 3) {
        if(store > 0) {
            console.log('普通购买，无优惠卷');
        } else {
            console.log('无货');
        }
    }
}

order(2,true,10);

// 用职责链重构代码

var order500 = function(orderType, pay, store) {
    if(orderType == 1 && pay == true) {
        console.log('500元定金支付，获得100元优惠卷');
    } else {
        return 'nextSuccessor';
    }
}

var order200 = function(orderType, pay, store) {
    if(orderType == 2 && pay == true) {
        console.log('200元定金支付，获得50元优惠卷');
    } else {
        return 'nextSuccessor';
    }
}

var orderNormal = function(orderType, pay, store) {
    if(store > 0) {
        console.log('普通购买');
    } else {
        console.log('无货');
    }
}

var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
}

Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
}
Chain.prototype.passRequest = function() {
    var result = this.fn.apply(this, arguments);
    if(result == 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }

    return result;
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(3, true, 10);

/**
 *  如果是异步的职责链，那么可以再职责链中加上一个next方法，表示手动传递请求给职责链中的下一个节点
 */

