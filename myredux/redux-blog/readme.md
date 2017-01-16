# Redux 项目文件划分

src/  所有源代码存放的路径
|--app.js 整个应用的入口
|--views 应用中某个页面的入口文件，一般为路由文件
    
    |--Home.js 
    |--Home.css
    |--HomeRedux.js  Home页面中所有与Redux相关的reducer、action creator 的汇总，即components/Home下所有的*Reducers.js的汇总
|--components 所有应用的组件
    
    |-- Home eg:views/中一个名为Home的view，则在components中就有一个名为Home的子文件夹
        |-- Table.js
        |-- Table.css
        |-- TableRedux.js 
    |-- shared 不归属于任何view的组件，如一些公共组件等
|-- containers
    
    |-- DevTools.js 配置DevTools
    |-- Root.js 一般被app.js依赖，用于根据环境是否需要加载DevTools
|-- layouts 布局相关的组件及样式，如菜单、侧边栏、header、footer等
|-- redux Redux store 相关的配置
    
    |-- reducers.js 整个应用中所有的reducer的汇总
|-- routes 路由相关的配置
|-- utils 工具函数、常量
|-- styles 全局公共样式
|-- app.css 应用主样式表




