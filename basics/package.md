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

#### 包管理工具

npm、yarn、pnpm，他们三个提供功能差不多


#### 开发一个包的用途
1. 可以在node环境下被引用并使用
2. 可以在构建工具环境下被引用并使用

#### 开发包的时候三种导出方式的区别
##### main导出
1. 在node环境下，不支持esmodule的情况下默认是导出符合commonjs规范的内容，
在支持esmodule的情况下，设置type:module将导出esmodule规范的内容，设置type:module也会起到允许包中文件使用esmodule的作用，正常node环境指定模块化导出只能被其相对应的引入方式所引入

2. 在构建工具环境下，main可以导出conmonjs和esmodule规范的内容，构建工具将导出到conmonjs规范按照esmodule引入，正常对应规范引入也是可以的

##### module 导出
1. 在node环境中，module不支持导出任何东西
2. 在构建工具环境下，module支持导出esmodule规范的内容

##### exports导出
1. 