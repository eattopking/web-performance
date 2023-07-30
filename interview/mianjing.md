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

css 和页面适配

1. bfc
2. 页面适配
3. width: 100%和 width: auto
4. 定位有几种
5. 盒子模型的理解
6. link和@import的区别
7. 三栏布局
8. 两栏布局
9. 伪类和伪元素的区别
10. 水平垂直居中
11. 移动端1px问题
12. 高性能css

js原生和es6复习
1. 事件队列，宏任务微任务
2. 原型链理解
3. 作用域链理解
4. 箭头函数和普通函数的区别
5. js计算的精度问题 IEEE754标准来定义整数和浮点数，使用双精度存储，计算的以后转成二进制相加之后转成十进制就会多一点
6. 作用域的种类和区别
7. 闭包的概念
8. this的理解
9. js变量提升函数提升
10. js数据类型
11. es6中的weakmap和weakset的作用
12. Generator和async函数的区别
13. bigInt是用来表达大于2^53-1的数
14. promise
15. reflect 重写了一些操作对象的方法
16. promise
17. === 和 ==，object.is 区别
18. dom事件相关自定义事件， new Event('eventName'), new CustomEvent('eventName',  {}) 
19. 如何判断数据类型
20. valueOf和toString，js隐式转换
21. requestAnimationFrame和 requestIdleCallback区别和使用这个还没看呢
22. 


ts复习
1. 数据类型
2. ts的优点
3. implements 和extends区别
4. type和interface区别
5. pick和omit区别
6. 多态的意思

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
5. react hooks的实现原理

6. react生命周期和常用hooks

7. react的性能优化

8. react服务端渲染

9. react17和18的新功能

10. react hooks原理，
useState原理
fiberNode = {
   memorizedState: list,
   baseState: 初始值
   queue: 保存过度值
}

通过 Hooks 调用的顺序来与实际保存的数据结构来关联
useEffect原理

以链表的形式挂载在 FiberNode.updateQueue

rn复习

electron复习

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

8. 大文件传输方式
9. csrf 和 xss

分段传输
通过类似于 node 中的 stream 流的形式传输
gzip 压缩后传输
通过设置 content-type : multipart/form-data, 进行二进制数据传输, 然后在使用像 protocal buffer 对二进制进行压缩后在传输

浏览器

1. 浏览器渲染过程
2. 重排重绘
3. 垃圾回收机制
4. 浏览器如何离线操作，service worker
5. web worker
6. 地址栏输入url的全过程

小程序
实现原理
逻辑层、渲染层、jscore， 通过 jsbrige 利用 native 通信

小程序运行机制

优化

首先使用微信开发者工具中 audits 中的性能分析工具进行分析，一开始的性能分析,
一开始只有 50 多分，然后根据性能指标分析

1. 第一个问题是首屏的时间过长，要解决解决这个问题首先要知道首屏加载过程中都做了什么

   下载小程序代码包
   加载小程序代码包
   渲染小程序的过程

   所以针对下载过程，在上传代码的时候勾选压缩，针对下载阶段

   针对下载和加载，进行分包加载，将首屏需要加载的包内容放在主包里面，
   其他的放在子包里面进行按需下载和加载，子包设置了预加载，会在加载首页后，对包进行预下载
   让首屏加载在 5s 以内

   分包 subpackages，root 分包名，独立分包 independent: true,加载独立分饱不需要加载主包，
   preloadrule: [// 分包预下载
   {
   子包名称
   }
   ]

渲染方面
将图片都放到 cdn
有的接口请求时间过长

前端页面的优化

1. 首先根据 lightHouse 进行性能分析，然后进行对应的性能优化

2. 有几个性能指标 Fp fcp lcp tti，通过查看这几个指标发现，影响首屏渲染的问题是包过大，导致加载时间过长，导致首屏在 900毫秒左右
然后通过webpack-bundle-analyzer分析包的大小，然后通过dllplugin进行预编译，固定版本，还有通过splitchunks进行分包，减小了首屏加载包的大小
减小了加载时间，还有react组件可以懒加载的进行懒加载，将首屏缩短为 300 毫秒

3. 还有图片过大加载时间长，对图片进行压缩，并上传到 cdn， 使用webp图片，图片懒加载

4. 接口请求时间长，服务端帮忙优化接口

5. 请求开启 gzip 压缩

6. 其他的非首屏优化有react性能优化，和performance记录之后的代码性能点优化



webpack 构建优化

首先我们根据 webpack 的构建过程考虑， 查询过程、解析转化过程、压缩过程
所以从这几个过程着手优化

1. 优化之前先通过 speed-measure-webpack-plugin 确定优化之前的构建时间

2. 然后针对查询过程 是指 alias 别名，来减小查询时间

3. 针对转化过程设置 exclude 和 include 避免不必要的转化

4. 针对于解析转化过程，通过 dllplugin 对 node_modules 中的包进行预编译，较少构建时间，使用webpack-bundle-analyzer分析webpack包体积

5. 并且通过 thread-loader 开启多线程较少构建时间

6. 使用 cache-loader，减少热更新时间

7. 压缩使用 terser-webpack-plugin 并开启多线程较少压缩时间

工程化模块化

1. babel过程，将es6生成ast抽象语法树,对抽象语法书进行编译生成新的ast，然后将新的ast转成es5

2. webpack的工作流程

3. conmonjs和esmodule的区别

4. 

### 异常监控
1. try {} catch {} 运行
2. object.onerror 和 img.onerror
3. sentry 异常上报


做过的比较印象深刻的项目

### 建站项目总结

1. 由于我们项目比较紧急所以选择现有的页面编辑器，h5-Dooring，craft、tmagic-editor，都不是很适合，最后发现了一个 ant landing，他的交互还有整体代码的书写都很好，所以最后选择了这个， 也进行了 ts 和 hooks 的改造，redux 进行全局数据管理
2. 首先在外贸通中有一个入口，然后会有一个页面列表，根据不同的页面进入到对应的编辑页面
3. 建站这个项目是一个 menorepo 的项目，分为编辑器、模块组件库、首页项目，是通过 pnpm 构建的 menorepo，通过 pnpm 的 workspace 协议实现的模块组件库在编辑器中和首页中的应用，组件库的 package.json 中的 main 可以被 conmon.js 和 esmodule 引用
4. 最后页面编辑器是产生一个 json 数据，模块按照顺序放在数组中，然后 config 中有根据数组中的内容作为 key 的配置，
   然后我们匹配对应的模块组件进行整体页面的渲染，整体的页面数据存在 redux 中，然后保存之后存到后端
5. 在首页页面中，获取到后端的 config 配置之后，进行渲染

模块组件库开发

1. 模块组件开发，有一个默认配置，包括类名、内容、样式等，然后渲染这个组件的，会将默认配置和自己修改的配置合并成一个新的配置穿给组件用于渲染，然后组件是响应式的通过媒体查询判断页面达到 767px 变成 h5 的样式

2. 响应式布局就是页面展示的宽度最大就是 1200px，然后宽度是 100%，水平居中

响应式布局展示内容的元素样式
margin: 0 auto;
width: 100%;
max-width: 1200px;

编辑器实现

1. 首先编辑器主要分为三个部分拖拽选择区域、中间展示区域、属性编辑区域

2. 拖拽部分的主要是通过一个配置文件渲染出可拖拽列表，给每一项添加一个 data-key 值就是模块名称用于标识，在拖到展示区域的时候根据这个名称插入到展示列表中，进行渲染

3. 中间展示区域，分为两层，上层是编辑层，下层是展示层，下层的展示层是通过 iframe 加载展示组件路由用于展示，上层通过 postmessage 给底层传数据，底层 iframe 中的页面通过 window.parent 获取到上层的 window，然后调用 window 上的方法给上层传数据

4. 模块是是通过 data-id 标识的，这个 data-id 是从外到内的这种名称拼接而成，只有标识了的模块才可以编辑,文本编辑通过 medium-editor 实现，根据 data-edit 区分需要进行什么类型的编辑，bkg， font，选中之后的编辑，将通过将 data-id，key，value 传入处理函数，得到更新后模块区域数据，然后更新到全局数据中，再通过 postmessage 将数据穿给 iframe 进行展示

5. 右侧的属性编辑区域，就是根据 data-edit 决定进行什么编辑，然后根据 data-id 进行更新的

ssr 首页实现

1. ssr 首页实现，通过 umi 创建的 ssr 项目， 然后复用了编辑器的展示渲染逻辑，然后引用了模块组件库，进行渲染展示

2. 首页 seo 优化，通过后端给我返回 keywords 和 description 的内容，我将这个内容放在 meta 标签中，然后插入到 head 标签中，然后后端给谷歌发一个消息，然后谷歌回定期来爬一下内容
<meta name="keywords" content="推荐有礼,推荐奖励,推广奖励,邀请好友,薪人薪事,员工管理,招聘管理,考勤管理,绩效管理">
<meta name="description" content="参与薪人薪事推荐有礼活动，领高额推荐奖励">

3. 具体后端会隔一段时间通知谷歌去爬一次，具体的细节面试的时候要搞清楚

有道云笔记桌面端搜索重构

因为有道云笔记这种桌面端应用，要支持离线编辑，所以这个搜索是在我们本地做的，这样离线情况下也可以支持

算法题

截流、防抖、反转链表、Promise.all, bind、applay， createElement、观察者模式
