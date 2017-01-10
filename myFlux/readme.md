# 深入理解flux的结构模式

flux中几大核心概念：

* view 视图
* action 行为
* dispatcher 事件分发器
* stores 负责保存数据和修改数据的逻辑
* controller-view 调用store暴露的getter获取存储其中的数据，并且会监听store中state的数据，如果变化则会通知view进行改变


流程：
  view／api触发一个action后，action会通过dispatcher中注册了的监听器中去dispatch来分发一个action，dispatch来改变stores中的数据，而stores中的数据要和view绑定起来，那么这个时候通过controller-view来进行一个绑定，controller-view会调用store中的getter方法去拿到数据，因为react的组件有自己对应的state，那么当stores里面的数据改变的时候，怎么去更新组件中的state，可以通过观察者的模式去更新，即，当store中的数据发生改变时，触发在controller-view 中监听stores数据的回调函数（基本放在dispatch这个环节中）即可。




