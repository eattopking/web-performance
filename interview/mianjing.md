### 此文档用于记录面试的问题以及探讨的问题答案

## 箭头函数特性：

    1、没有自己的this，指向外层普通函数的作用域
    2、没有constructor，不能被new操作符当做构造函数调用
    3、不能通过bind，call等绑定this
    4、没有new.target属性，普通函数中，new.target等于undefined

## instanceof

    A  instanceof B , 检查 B.prototype 是否在 A.__proto__，右边的原型是否在左边的原型链上

## 跨域请求如何携带 cookie

    ajax 设置withCredentials: true, set-cookie samesite 属性设置为none

## 传输大文件的手段

分段传输
通过类似于 node 中的 stream 流的形式传输
gzip 压缩后传输
通过设置 content-type : multipart/form-data, 进行二进制数据传输, 然后在使用像 protocal buffer 对二进制进行压缩后在传输

## 对 http 的理解

## jsBridge 的实现原理

## rn webview 原理

## rn 热更新原理

## 移动端 fixed 什么时候会失效，设置了 position fixed 之后的元素, 什么时候会 fixed 失效

    当外层元素创建了层叠上下文, 子元素的固定定位就相对于外层元素了, 而不是视口了
    可以创建层叠上下文的方式
    设置transform 不为none
    opcity 小于 1

## cache-control 有哪些值

    public
    private
    max-age: 从发送请求开始
    no-cache: 相当于协商缓存
    no-store
    no-transform: 不转换请求资源

## 带领小伙伴做了哪些难点技术攻关

    小程序的canvas使用 fibrac,
    解决包大小, 使用使用手动写全局状态管理,
    做了性能优化, 独立分包, 和普通分包, 分包预下载

## 做小程序项目中做了哪些工程优化, 工程化改造

    引入ts, npm包, 实现切换环境的选择, 方便测试
    小程序优化, 分包, 图片压缩, 前端直穿cdn, 长列表使用虚拟列表, 缩略图展示图片, 通过图片抓包获取加载时间进行判断

## rn 做了哪些工程化改造

    异常上报 sentry
    自动化测试
    热更新
    测试图片加载通过抓包测试, 使用fast-IMage组件加速图片加载, 使用懒加载

## taro 的实现原理, taro2 和 taro3 的区别

    1. taro2 主要就是一个编译类型的框架, 通过babel转化将代码转化为不同平台代码, 通过运行时代码抹平各个平台的api差异
    2. taro2打包的包中不包含运行时代码, 所以代码体积小, 性能也更高
    3. taro3是一个运行时框架, 打包会把运行时代码打包进去, 并taro3内部实现了dom, bom api, 所以taro3中可以使用多种框架 react, vue都可以, 但是taro3打的包变大了, 性能没有taro2好

## 为什么使用 ssr, 什么时候不适合使用 ssr, 什么时候适用

    有利于SEO、有利于首屏渲染
    SSR使用场景：项目对首屏加载速度要求很高。比如：移动端；项目对seo要求很高：比如：企业官网、电商类（有推广页面）

## 小程序如何进行性能测试, 有哪些优化方式, 性能指标有啥

## 小程序的分包逻辑是啥

    每个包不能大于2M，最多可以分10个包
    小程序配置文件subPackages字段配置
    分包里面可以使用independent: true,设置为独立分包，只打开独立分包的话不会加载主包，主要用来承载广告页之类的
    还可以通过preloadRule字段设置分包预加载条件

## 按照使用频率和场景分包

## 小程序的优化手段主要是启动优化

    代码包大小：分包加载、分包预加载、独立分包、减少图片资源、代码优化
    代码注入优化：减少启动过程中同步调用、按需加载lazyCodeLoading: 'requiredComponents'
    页面渲染优化：提前首屏数据请求、数据预拉取、周期性更新、骨架屏、缓存请求数据、精简首屏数据

## 移动端兼容性问题整理

    click事件，300ms延迟
    1px
    label、span等非可点击元素，ios点击失效，解决方案：cursor: pointer
    底部输入框被键盘遮挡
    ios底部安全距离

## 有哪些前端优化方案

    本地数据缓存，http请求缓存
    减少图片资源，压缩
    CDN
    减少包体积
    生命周期减少同步操作
    懒加载
    虚拟列表
    雪碧图

5. 小程序分包

6. 对 http 的理解

7. jsBridge 的实现原理

8. rn webview 原理

9. rn 热更新原理

10. 有哪些前端优化方案

11. 移动端 fixed 什么时候会失效

12. 设置了 position fixed 之后的元素, 什么时候会 fixed 失效

当外层元素创建了层叠上下文, 子元素的固定定位就相对于外层元素了, 而不是视口了

可以创建层叠上下文的方式

1. 设置 transform 不为 none

2. opcity 小于 1

3. cache-control

有哪些值

public
private
max-age: 从发送请求开始
no-cache: 相当于协商缓存
no-store
no-transform: 不转换请求资源

14. 带领小伙伴做了哪些难点技术攻关
    小程序的 canvas 使用 fibrac,

15. 做了性能优化, 独立分包, 和普通分包, 分包预下载, 解决包大小, 使用使用手动写全局状态管理

16. 做小程序项目中做了哪些工程优化, 工程化改造

引入 ts, npm 包, 实现切换环境的选择, 方便测试, 异常上报

小程序优化, 分包, 图片压缩, 前端直穿 cdn, 长列表使用虚拟列表, 缩略图展示图片, 通过图片抓包获取加载时间进行判断

17. rn 做了哪些工程化改造

异常上报 sentry
自动化测试
热更新

18. rn 优化
    图片使用懒加载

复杂数据计算使用 usememo, 避免没有改变的时候重复计算

19. taro 的实现原理, taro2 和 taro3 的区别
1. taro2 主要就是一个编译类型的框架, 通过 babel 转化将代码转化为不同平台代码, 通过运行时代码抹平各个平台的 api 差异

1. taro2 打包的包中不包含运行时代码, 所以代码体积小, 性能也更高

1. taro3 是一个运行时框架, 打包会把运行时代码打包进去, 并 taro3 内部实现了 dom, bom api, 所以 taro3 中可以使用多种框架 react, vue 都可以, 但是 taro3 打的包变大了, 性能没有 taro2 好

1. 为什么使用 ssr, 什么时候不适合使用 ssr, 什么时候适用

1. 小程序如何进行性能测试, 有哪些优化方式, 性能指标有啥

1. 小程序的分包逻辑是啥

按照使用频率和场景分包

小程序的优化手段主要是启动优化

23. 如何检测 web 性能, web 性能的指标是啥, 指标对应哪些性能方面, 有哪些优化方式

24. h5 遇到的坑

react 复习

1. react 更新三种方式

state、props、context

2. 如何优化组件的多次刷新

因为 react 是单向数据流的所以，如果从父组件向下传递数据，就会导致所有子节点都更新，
所以我们在哪里用这个数据的时候就在那里引用，这样就保证只有对应的组件更新，

所以我们在拆分组件的时候要根据更新的需要进行拆分

3. fiber 架构理解

因为浏览器运行 js 和渲染页面和垃圾回收都是在主线程进行的，并且这三种操作的互斥的，所以当 js
执行时间过长的时候可能会导致页面卡顿，react16 之前的版本，react 的 vdom 是树形结构，所以当触发出发更新的时候会进行递归操作，如果递归的层级过深，导致 js 执行时间过长，就会影响页面渲染导致页面出现卡顿，
为了解决这个问题，react16 之后就提出了 fiber 架构，主要就是原来树形结构的 vdom，改为链表结构，在更新的时候时候循环替换取代递归，然后还有时间片和任务优先级的概念，同步任务的优先级会高于异步任务，例如 input 框输入内容，这就是同步任务，同步任务不能被中断，如果是异步任务会进行异步任务调度，每个异步任务有个过期时间，过期时间越小的一步任务优先级越高，时间片就是在浏览器执行完同步任务之后，没有消耗完一帧的时间，剩余的时间可以执行 react 异步任务调用中的任务，根据链表的结构特性如果没有执行完异步任务在剩余的时间中就会保存当前异步任务的，等下次浏览器空闲时继续执行

4. setState 执行的原理和什么时候是同步的
   内部执行了 setState 的函数, 会在 react 内部的 batchedUpdates 中被执行, batchedUpdates 函数中一开始会将全局变量 isBatchingUpdates(默认值是 false) 设置为 true, 不能进行同步更新和异步调度更新了, 只有在 try {} 中将包含 setState 的函数执行完毕后,才能在 finally{} 中将 isBatchingUpdates 设置为 false, 然后将 state 进行同步更新，
   因为 settimeout 和原生事件都属于异步, 所以会被加入异步队列, 在调用 setState 的时候回调不会被传入 batchdUpdates 中执行,
   所以不会在一开始将 isBatchingUpdates 设置为 true, 所有每次调用 setstate 都会触发同步更新, 还有就是 isBatchingUpdates 已经从 true 变为 false 了, 这个异步的回调中的 setState 才执行, 所以也是同步更新, isBatchingUpdates 就是控制 state 批量更新的全局变量
   http

http 相关的问题

1. 同源策略，跨域
   postmessage、nginx 代理转发、jsonp、cors

2. 请求带 cookie
   前端通过 docoment.cookie 获取和设置 cookie，httponly
   请求头自动携带 cookie 字段
   cookie 限制字段
   cors 跨域携带 cookie
   withCredentials，samesite
3. 请求类型、状态码，九种请求方式
4. 三次挥手、四次握手和为什么是三次和四次
5. 强缓存、协商缓存
6. 浏览器获取缓存位置的优先级
7. http2 和 http3 有什么特点
   二进制传输
   header 压缩
   多路复用
   服务端推送

   http3 使用 udp 协议更加的快速，不会考虑丢包，udp 主要在直播中使用

浏览器

1. 垃圾回收机制
2. 重排重绘

小程序的优化

首先根据小程序的性能分析工具，进行分析，然后根据分析的结果进行对应的优化
从 30 分优化到 80 分 性能指标

分包

前端页面的优化， 首先根据 lightHouse 进行性能分析，然后进行对应的性能优化
从 30 分优化到 80 分 性能指标

6. webpack 构建优化

首先我们根据 webpack 的构建过程考虑， 查询过程、解析转化过程、压缩过程

多线程开发

算法题

截流、防抖、反转链表、Promise.all, bind、applay， createElement、观察者模式
