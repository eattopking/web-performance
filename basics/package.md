### 开发包的总结

前端常用模块化

##### commonjs

module.exports = {}

exports = {a: 1}

require()

##### esmodule 

export a;

export default a;

import


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