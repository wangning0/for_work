var normalizr = require('normalizr');
var Schema = normalizr.Schema;
var arrayOf = normalizr.arrayOf;
var normalize = normalizr.normalize;
var valuesOf = normalizr.valuesOf;

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

// 复杂的情形

// var article = new Schema('articles'),
//     user = new Schema('users'),
//     collection = new Schema('colletcions'),
//     feedSchema,
//     input;
//
// article.define({
//   author: user,
//   collections: arrayOf(collection)
// })
//
// collection.define({
//   curator: user
// })
//
// feedSchema = {
//   feed: arrayOf(article)
// }
//
// input = {
//   feed: [{
//     id: 1,
//     title: 'Some Article',
//     author: {
//       id: 3,
//       name: 'Mike Persson'
//     },
//     collections: [{
//       id: 1,
//       title: 'Awesome Writing',
//       curator: {
//         id: 4,
//         name: 'Andy Warhol'
//       }
//     }, {
//       id: 7,
//       title: 'Even Awesomer',
//       curator: {
//         id: 100,
//         name: 'T.S. ELiot'
//       }
//     }]
//   }, {
//     id: 2,
//     title: 'Other Article',
//     collections: [{
//       id: 2,
//       title: 'Neverhood',
//       curator: {
//         id: 120,
//         name: 'Ada Lovelace'
//       }
//     }],
//     author: {
//       id: 2,
//       name: 'Peter Hunt'
//     }
//   }]
// }
//
// Object.freeze(input);
//
// var res = normalize(input, feedSchema);
//
// console.log(res);

//内嵌+数组倾斜

// var article = new Schema('articles'),
//     tutorial = new Schema('tutorials'),
//     articleOrTutorial = {articles: article, tutorials: tutorial},
//     user = new Schema('users'),
//     collection = new Schema('collections'),
//     feedSchema,
//     input;
//
// article.define({
//   author: user,
//   collections: arrayOf(collection)
// })
//
// collection.define({
//   curator: user
// })
//
// tutorial.define({
//   author: user,
//   collections: arrayOf(collection)
// })
//
// feedSchema = {
//   feed: arrayOf(articleOrTutorial, { schemaAttribute: 'type' })
// }
//
// input = {
//   feed: [{
//     id: 1,
//     type: 'articles',
//     title: 'Some Article',
//     author: {
//       id: 3,
//       name: 'Mike Persson'
//     },
//     collections: [{
//       id: 1,
//       title: 'Awesome Writing',
//       curator: {
//         id: 4,
//         name: 'Andy Warhol'
//       }
//     }, {
//       id: 7,
//       title: 'Awesome writing',
//       curator: {
//         id: 100,
//         name: 'wang ning'
//       }
//     }]
//   }, {
//     id: 1,
//     type: 'tutorials',
//     title: 'some tutorial',
//     collections: [{
//       id: 2,
//       title: 'Neverhood',
//       curator: {
//         id: 120,
//         name: 'Ada Lovelace',
//       }
//     }],
//     author: {
//       id: 2,
//       name: 'Peter Hunt'
//     }
//   }]
// };
//
// Object.freeze(input);
//
// var res = normalize(input, feedSchema);
// console.log(res.result);

// 内嵌+对象

// var article = new Schema('articles'),
//     user = new Schema('users'),
//     feedSchema,
//     input;
//
// article.define({
//   collaborators: valuesOf(arrayOf(user))
// });
//
// feedSchema = {
//   feed: arrayOf(article),
//   suggestions: valuesOf(arrayOf(article))
// };
//
// input = {
//   feed: [{
//     id: 1,
//     title: 'Some Article',
//     collaborators: {
//       authors: [{
//         id: 3,
//         name: 'Mike Persson'
//       }],
//       reviewers: [{
//         id: 2,
//         name: 'Pete Hunt'
//       }]
//     }
//   }, {
//     id: 2,
//     title: 'Other Article',
//     collaborators: {
//       authors: [{
//         id: 2,
//         name: 'Pete Hunt'
//       }]
//     }
//   }, {
//     id: 3,
//     title: 'Last Article'
//   }],
//   suggestions: {
//     1: [{
//       id: 2,
//       title: 'Other Article',
//       collaborators: {
//         authors: [{
//           id: 2,
//           name: 'Pete Hunt'
//         }]
//       }
//     }, {
//       id: 3,
//       title: 'Last Article'
//     }]
//   }
// }
//
// Object.freeze(input);
//
// var res = normalize(input, feedSchema);
// console.log(res.entities);

// 更加复杂的

// var article = new Schema('articles'),
//     user = new Schema('users'),
//     group = new Schema('groups'),
//     userOrGroup = {users: user, groups: group},
//     feedSchema,
//     input;
//
// article.define({
//   collaborators: valuesOf(userOrGroup, { schemaAttribute: 'type' })
// });
//
// feedSchema = {
//   feed: arrayOf(article),
//   suggestions: valuesOf(arrayOf(article))
// }
//
// input = {
//   feed: [{
//     id: 1,
//     title: 'Some Article',
//     collaborators: {
//       author: {
//         id: 3,
//         type: 'users',
//         name: 'Mike Persson'
//       },
//       reviewer: {
//         id: 2,
//         type: 'groups',
//         name: 'Reviewer Group'
//       }
//     }
//   }, {
//     id: 2,
//     title: 'Other Article',
//     collaborators: {
//       author: {
//         id: 2,
//         type: 'users',
//         name: 'Pete Hunt'
//       }
//     }
//   }, {
//     id: 3,
//     title: 'Last Article'
//   }],
//   suggestions: {
//     1: [{
//       id: 2,
//       title: 'Other Article'
//     }, {
//       id: 3,
//       title: 'Last Article'
//     }]
//   }
// };
//
// Object.freeze(input);
//
// var res = normalize(input, feedSchema);
// console.log(res.entities);

// 自动合并merge属性，在一个数组里面，如果id属性一致，那么会自动抽取并合并属性成一个

var writer = new Schema('writers'),
    book = new Schema('books'),
    schema = arrayOf(writer),
    input;

writer.define({
  books: arrayOf(book)
});

input = [{
  id: 3,
  name: 'Jo Rowling',
  isBritish: true,
  location: {
    x: 100,
    y: 200,
    nested: ['hello', {
      world: true
    }]
  },
  books: [{
    id: 1,
    soldWell: true,
    name: 'Harry Potter'
  }]
}, {
  id: 3,
  name: 'Jo Rowling',
  bio: 'writer',
  location: {
    x: 100,
    y: 200,
    nested: ['hello', {
      world: true
    }]
  },
  books: [{
    id: 1,
    isAwesome: true,
    name: 'Harry Potter'
  }]
}];
var res = normalize(input, schema);
console.log(res);