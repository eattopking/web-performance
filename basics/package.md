### 开发包的总结

前端常用模块化

##### commonjs

1. module.exports = {}

2. exports = {a: 1}

3. require()

不知道require在各种环境中，模块地址可不可以是远端地址

##### esmodule 

1. export a;

2. export default a;

3. import，import()

4. import和import()需要根据模块地址获取模块内容，这个模块地址可以是相对路径，可以是绝对路径、也可以是远端地址，/user/test.js和https://baidu/user/test.js都属于远端地址，import和import()在浏览器环境下、构建工具环境下、node环境下可能支持的模块地址不同，不同就是不知道import在node环境和构建工具环境下模块地址可不可以是远端地址

5. 在浏览器中使用esmoule，只需要设置script标签 type='module'，这样就可以在script标签中使用
esmodule引用模块使用了

#### 加载包的几种环境

浏览器环境、构建工具环境(又分浏览器环境和node环境)、node环境

#### 包管理工具

npm、yarn、pnpm，他们三个提供功能差不多


#### 开发一个包的用途
1. 可以在node环境下被引用并使用
2. 可以在构建工具环境下被引用并使用
3. 浏览器环境中通过模块化直接引用包文件js

#### 开发包的时候四种导出方式的区别
##### main导出
1. 在node环境下，不支持esmodule的情况下默认是导出符合commonjs规范的内容，在支持esmodule的情况下，设置type:module将导出esmodule规范的内容，设置type:module也会起到允许包中文件使用esmodule的作用，正常node环境指定模块化导出只能被其相对应的引入方式所引入

2. 在构建工具环境下，main可以导出conmonjs和esmodule规范的内容，构建工具将导出到conmonjs规范按照esmodule引入，正常对应规范引入也是可以的

3. 设置type: module,main也可以作为commonjs的导出


##### module 导出
1. 在node环境中，module不支持导出任何东西 ！！！！
2. 在构建工具环境下，module支持导出esmodule规范的内容

##### browser 导出

导出只能在构建工具的浏览器环境下引入的模块

```
  "main": "dist/index.js",  // main  
  "module": "dist/index.mjs", // module
  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./dist/index.js": "./dist/index.browser.js", // browser+cjs
    "./dist/index.mjs": "./dist/index.browser.mjs"  // browser+mjs
  },
  // "browser": "./dist/index.browser.js" // browser
```
1. 当在构建工具浏览器环境中，browser设置为对象后，引用包的时候会根据模块化类型先去找main、module内容，然后去broswer中去找main、module对应路径作为key对应路径，用这个路径来做真实的构建，如果找不到就用main、module对应的路径构建

2. browser不设置成对象，浏览器环境下就直接用browser配置的路径构建

3. 这个加载顺序是大部分构建工具默认的加载顺序，比如webapck、esbuild等等。可以通过相应的配置修改这个加载顺序，不过大部分场景，我们还是会遵循默认的加载顺序。

##### exports导出
1. exports默认是不支持导入项目子目录的，其他的默认都是支持的
2. exports支持各种条件相互嵌套
3. exports导出的条件有import、require、node、module、default、types、deno、browser、development、production
4. default始终匹配的默认选项。可以是 CommonJS 或 ES 模块文件。这种情况应始终排在最后。（他会匹配任意模块引入方式）

exports的优先级最高

node环境下： exports > module 和main

浏览器环境下： exports > broswer > module 和main


模块化引入会去寻找包中和模块化对应的导出，找到了可以引入，找不到就不能引入