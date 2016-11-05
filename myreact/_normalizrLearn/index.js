var normalizr = require('normalizr');
var Schema = normalizr.Schema
var arrayOf = normalizr.arrayOf
var normalize = normalizr.normalize

// let response = require('./data.js');
//
// const article = new Schema('articles');
// //const article = new Schema('articles', { meta: { removeProps: ['antuhor'] }});
// const user = new Schema('users');
//
// article.define({
//   author: user,
//   contributors: arrayOf(user)
// });
//
// response = normalize(response, article);
//
// console.log(response);
// console.log('=====================================================================================');
// console.log(response.entities);

// var article = new Schema('articles'),
//     type = new Schema('types'),
//     input;
//
// article.define({
//   type: type
// });
//
// input = {
//   id: 1,
//   title: 'Some Article',
//   isFavorite: false,
//   typeId: 1,
//   type: {
//     id: 1
//   }
// };
//
// Object.freeze(input);
//
// var options = {
//   assignEntity: function (obj, key, val) {
//     obj[key] = val;
//     delete obj[key + 'Id'];
//     console.log(obj);
//   }
// };
//
// var res = normalize(input, article, options);
//
// console.log(res.entities);

//创建自定义的属性
// function makeSlug(article) {
//   var posted = article.posted,
//       title = article.title.toLowerCase().replace(' ', '-');
//   return [title, posted.year, posted.month, posted.day].join('-');
// }
//
// var article = new Schema('articles', { idAttribute: makeSlug }),
//     input;
//
// input = {
//   id: 1,
//   title: 'som article',
//   isFavorite: false,
//   posted: {
//     day: 12,
//     month: 3,
//     year: 1983
//   }
// };
//
// Object.freeze(input);
//
// var res = normalize(input, article);
// console.log(res.entities);


//规范化数组

// var article = new Schema('articles'),
//     input;
// input = [{
//   id: 1,
//   title: 'Some Article'
// },{
//   id: 2,
//   title: 'Other Article'
// }];
//
// Object.freeze(input);
//
// var res = normalize(input, arrayOf(article));
// console.log(res);

// 抽取多个schema, 通过schemaAttribute选项来指定区分这两个schema的字段

// var article = new Schema('articles'),
//     tutorial = new Schema('tutorials'),
//     articleOrTutorial = { articles: article, tutorials: tutorial },
//     input;
//
// input = [{
//   id: 1,
//   type: 'articles',
//   title: 'Some Article'
// }, {
//   id: 1,
//   type: 'tutorials',
//   title: 'Some Tutorial'
// }];
//
// Object.freeze(input);
//
// var res = normalize(input, arrayOf(articleOrTutorial, { schemaAttribute: 'type' }))
// console.log(res);

//规范化内嵌形式

// var article = new Schema('articles'),
//     user = new Schema('users'),
//     input;
// // 此处的key应该与model的key一样
// article.define({
//   author: user
// });
//
// input = {
//   id: 1,
//   title: 'Some Article',
//   author: {
//     id: 3,
//     name: 'Mike'
//   }
// };
//
// Object.freeze(input);
//
// var res = normalize(input, article);
// console.log(res.entities);

