# app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

####笔记

#####项目配置
node_modules 文件夹：项目依赖

public 文件夹：一般放置一些静态资源（图片） 注意：public 里资源，webpack 进行打包时，就原封不动的打包到 dist 文件中

src 文件夹：程序员源代码

    assets 文件夹：一般放置多个组件共用的静态资源 注意：webpack 打包时，会把 assets 的资源当作一个模块，打包到 js 文件里

    components文件：一般放置非路由组件（全局组件）

    App.vue:唯一的根组件
    main.js：程序入口文件，也是整个程序最先执行的文件

babel.config.js:配置文件

package.js:记录项目信息，有哪些依赖，名字

package.lock.json:缓存文件

README.md:说明文件

其他配置
1，项目运行时，自定打开浏览器

2.eslint 语法校验关闭 ：根目录下

module.exports = {
lintSave: "false",
};

#####路由分析

前端路由：KV 键值对 key：URL（地址栏中的路径） val：对应的路由组件

路由组件：
Home 首页路由组件，Search 路由组件，login 组件，Register 注册组件
非路由组件：
Header【首页，搜索页】，Footer：【首页，登录页，】登录页没有

4.使用组件的步骤（非组件） -定义组件 -注册组件 -映入标签

5.路由组件的搭建 vue-router （npm i --save vue-router@3.5.3 ）

-components:经常放置非路由组件（公用全局组件）
-pages|views:经常放置路由组件

配置路由：项目当中配置的路由一般放置在 router 文件中

总结： 1.路由组件一般放置在 pages|views 文件中 非路由组件一般放置在 component 文件中 2.路由组件一般需要在 router 文件中进行注册（使用的即为组件的名字）非组件都是以标签的形式使用 3.注册完路由，路由组件和非路由组件身上都有$route\$router

$route：一般获取路由信息【路径，query，params】
$router：一般进行编程式导航进行路由跳转【push|replace】

路由的跳转： 1.声明式导航 router-link 2.编程式导航 push|replace

编程式导航：声明式导航能做的，编程式导航都能做，编程式导航不但可以路由跳转，还可以做一些其他的业务逻辑

6.Footer 组建的显示与隐藏
Footer 组件：在 Home，Search 显示，在登录和注册页隐藏

我们可以根据组件身上的$route 获取当前的路由信息，通过路径判断 MyFoot 显示与隐藏
设置路由的时候。可以给路由添加路由信息【meta】，路由需要配置对象，他的 key 不能乱写

8.路由传参

路由跳转方式
声明式导航：router-link（务必有 to）
编程式导航：利用组件实例的$router.push|replace 方法，（可以写自己的业务）

路由参数，参数写法种类
params 参数：属于路径当中的一部分，注意：配置路由需要占位
query 参数：不属于路径一部分，类似于 ajax 中的 queryString /home？k=v$kv 不需占位

//路由传参
//第一种：字符串形式
// this.$router.push(
      //   "/search" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      //第二种：字符串模板
      // this.$router.push(
// `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
// );
//第三种：对象
this.$router.push({
name: "search",
params: { keyword: this.keyword },
query: { k: this.keyword.toUpperCase() },
});

面试题一：路由传递参数（对象写法）path 是否可以结合 params 参数一起使用
答：不能，对象写法可以是 name，path 形式，但 path 形式不能与 params 一起使用

二：在配置路由的时候；占位符后面加 ？ 就可以指定 params 传参或者不传参

三：如果 params 传递的是空字符串 或为 || undefined
