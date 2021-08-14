*** 此文档用于记录面试的问题以及探讨的问题答案

一、箭头函数特性：
    1、没有自己的this，指向外层普通函数的作用域
    2、没有constructor，不能被new操作符当做构造函数调用
    3、不能通过bind，call等绑定this
    4、没有new.target属性，普通函数中，new.target等于undefined
二、instanceof
    A  instanceof B , 检查 B.prototype 是否在 A.__proto__，右边的原型是否在左边的原型链上

三. 跨域请求如何携带cookie

ajax 设置withCredentials: true, set-cookie samesite 属性设置为none


4. 传输大文件的手段

1. 分段传输

2. 通过类似于node中的stream 流的形式传输

3. gzip压缩后传输

4. 通过设置content-type : multipart/form-data, 进行二进制数据传输, 然后在使用像protocal buffer 对二进制进行压缩后在传输

5. 小程序分包

6. 对http的理解

7. jsBridge 的实现原理

8. rn webview 原理

9. rn热更新原理

10. 有哪些前端优化方案

11. 移动端fixed 什么时候会失效

设置了position fixed之后的元素, 什么时候会fixed失效

当外层元素创建了层叠上下文, 子元素的固定定位就相对于外层元素了, 而不是视口了

可以创建层叠上下文的方式

1. 设置transform 不为none

2. opcity 小于 1

12. cache-control

有哪些值

public
private
max-age: 从发送请求开始
no-cache: 相当于协商缓存
no-store
no-transform: 不转换请求资源

带领小伙伴做了哪些难点技术攻关
小程序的canvas使用 fibrac,

解决包大小, 使用使用手动写全局状态管理,
做了性能优化, 独立分包, 和普通分包, 分包预下载

做小程序项目中做了哪些工程优化, 工程化改造

引入ts, npm包, 实现切换环境的选择, 方便测试

小程序优化, 分包, 图片压缩, 前端直穿cdn, 长列表使用虚拟列表, 缩略图展示图片, 通过图片抓包获取加载时间进行判断

rn 做了哪些工程化改造
异常上报 sentry
自动化测试
热更新
测试图片加载通过抓包测试, 使用fast-IMage组件加速图片加载, 使用懒加载
taro的实现原理, taro2和taro3的区别
1. taro2 主要就是一个编译类型的框架, 通过babel转化将代码转化为不同平台代码, 通过运行时代码抹平各个平台的api差异

2. taro2打包的包中不包含运行时代码, 所以代码体积小, 性能也更高

3. taro3是一个运行时框架, 打包会把运行时代码打包进去, 并taro3内部实现了dom, bom api, 所以taro3中可以使用多种框架 react, vue都可以, 但是taro3打的包变大了, 性能没有taro2好

为什么使用ssr, 什么时候不适合使用ssr, 什么时候适用


小程序如何进行性能测试, 有哪些优化方式, 性能指标有啥 


小程序的分包逻辑是啥

按照使用频率和场景分包

小程序的优化手段主要是启动优化




