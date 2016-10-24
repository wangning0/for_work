/**
 * Created by wangning on 2016/10/24.
 */

// __proto__属性
/*
*   __proto__属性是用来获取或者设置当前对象的prototype对象
*   Object.setPrototypeOf() 写操作 Object.getPrototypeOf() 读操作 Object.create() 生成操作
*
* */

/*
*   类的继承按照下面的模式
*    class A {}
     class B{}
     //B的实例继承A的实例
     Object.setPrototypeOf(B.prototype, A.prototype);
     //B继承A的静态属性
     Object.setPrototypeOf(B, A);
*
* */

