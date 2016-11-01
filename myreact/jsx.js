var child1 = React.createElement('li', null, 'First text content');
var child2 = React.createElement('li', null, 'Second text content');
var root = React.createElement('ul', {className: 'my-list'}, child1, child2);

//等价于

var root = (
  <ul className="my-list">
    <li>First text content</li>
    <li>second text content</li>
  </ul>
)



/*
    jsx本身和XML语法相似，可以定义属性以及子元素，唯一特殊的就是可以用大括号来加入javascript表达式
*/

var person = <Person name={window.isLoggedIn ? window.name : ''} />

var node = (
  <div className="container">
    {
      person ? <span>hello, {person.name}</span> : <span>Please login in</span>
    }
  </div>
)