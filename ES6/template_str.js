/**
 * Created by wangning on 2016/10/26.
 */

//object对象的数据不能出现

const str = "str";
const num = 1;
const void0 = void(0);
const bool = true;
const obj = {foo: 'bar'};
const arr = [1, 2, 3];
const err = new Error('error');
const regexp = /foobar/;

const str1 = `String ${str}`;
const str2 = `Number: ${num}`;
const str3 = `null: ${void0}`;
const str4 = `bool: ${bool}`;
const str5 = `obj: ${obj}`;
const str6 = `arr: ${arr}`;
const str7 = `err: ${err}`;
const str8 = `reg: ${regexp}`;

console.log(str1,str2,str3,str4,str5,str6,str7,str8);