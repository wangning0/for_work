/*
*    async函数是Generator函数的语法糖
*
*    async函数对Generator函数进行了改进
*       1. 内置执行期,async函数的执行，和普通函数一样。
*       2. 更好的语义性
*       3. 更广的实用性，co模块规定，yield命令后面只能是Thunk函数或者Promise对象，但是async函数的await明明后面，可以是Promise对象和原始类型的值
*       4. 返回值是Promise
* */