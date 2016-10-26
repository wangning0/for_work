/**
 * Created by wangning on 2016/10/26.
 */

/*
*   const定义常量的原理是阻隔变量名所对应的内存地址被变化
*   const定义的对象常量，其内容依然能够通过修改属性值而被修改。可以使用freeze来使首层的属性不改变。若实现完全不会改变的对象可以通过小工具创建
*
*   const 和 let不会变量提升
*
*   
* */
const peoplesInfo = [
    {name: 'wangning', age: 12, sex: 'male'},
    {name: 'caishiran', age: 12, sex: 'female'}
];

for (const {name, age} of peoplesInfo) { //利用解构
    console.log(`hello ${name}, your age is ${age}`);
}