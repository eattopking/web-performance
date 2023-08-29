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
块级格式化上下文，它就是一块渲染区域，
在一个bfc中的元素，会出现边距重叠，解决方法是将一个元素放到另一个bfc中
bfc计算高度时候会算上浮动元素的高度
bfc元素不和浮动元素重叠
创建bfc的方式 position absolute、fixed、overflow不为visible、display: flex
2. 页面适配
rem vh vw
rem首先知道1rem等于什么， clientWidth、resize，视口
3. width: 100%和 width: auto
4. 定位有几种
5种定位
5. 盒子模型的理解
6. link和@import的区别
link是在html中加载css文件的，@import是在css文件中加载css文件的
link会在浏览器加载页面的同步加载css文件、而@import会在页面加载完毕之后才加载css文件
link的优先级大于@import
7. 三栏布局
8. 两栏布局
9. 伪类和伪元素的区别
10. 水平垂直居中
11. 移动端1px问题
12. 高性能css
异步加载css link的media一开始设置为noexist， 然后加载完毕后设置为all，这样css加载不会影响页面渲染
避免重排重绘， gpu
避免calc
使用class选择器
利用继承 color， font-size
避免使用@import下载css文件，因为这样css文件的下载会滞后不能并行下载

13. CSS 内容，一个简单的 sticky footer 布局。大致内容就是当页面高度不够时，页脚固定在页面底部；当页面高度足够时，页脚被页面内容推送下去。
<header>
 <h1>Header</h1>
</header>
<main>
  <p>Bacon Ipsum dolor sit amet...</p>
</main>
<footer>
  <p>Footer</p>
</footer>
html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
main {
  flex: 1;
}


js原生和es6复习
1. 事件队列，宏任务微任务
js的特性js是单线程
2. 原型链理解
实例查找属性的过程
3. 作用域链理解
查找变量的过程
4. 箭头函数和普通函数的区别
箭头函数没有原型对象
5. js计算的精度问题 IEEE754标准来定义整数和浮点数，使用双精度存储，计算的以后转成二进制相加之后转成十进制就会多一点
6. 作用域的种类和区别
7. 闭包的概念
8. this的理解
9. js变量提升函数提升
10. js数据类型
11. 字面量创建对象和new一个有什么区别
   1. 不需要调用Object构造函数
   2. 字面量创建对象更快，因为不需要查找Object构造函数
12. es6中的weakmap和weakset的作用
13. Generator和async函数的区别
14. bigInt是用来表达大于2^53-1的数
15. promise
16. reflect 重写了一些操作对象的方法
17. === 和 ==，object.is 区别
18. dom事件相关自定义事件， const event = new Event('eventName'), const event = new CustomEvent('eventName',  {}) el.dispatchEvent(event)
19. 如何判断数据类型
typeof instanceof Object.prototype.toString.call() [object Array]
20. valueOf和toString，js隐式转换
21. requestAnimationFrame和 requestIdleCallback区别和使用这个还没看呢
每个屏幕都有固定刷新率，就是一秒绘制多少帧 60hz(1秒绘制60次，每帧绘制时间16ms)，也就有了每帧最多的绘制时间
为了让页面流畅页面绘制一帧的最长时间是确定的，如果页面绘制完一帧所用时间小于最长时间，这个时候剩余的时间就会用来执行requestIdleCallback，这样做不会影响页面渲染，如果绘制一帧一直没有剩余时间，requestIdleCallback第二个参数绘有一个超时时间，超过这个时间没有被执行就是自动执行， 取消requestIdleCallback
使用cancelIdleCallback(id)

requestAnimationFrame 注册会在下一次重绘执行，注册的回调返回有一个参数，就是执行的时候当前的毫秒数时间，注册一次只能执行一次，下次重新还想执行那就要在回调中再次注册，cancelAnimationFrame(id)可以取消requestAnimationFrame的注册

22. 通过es5如何实现es6的类


ts复习
1. 数据类型
null undefiend number string boolean never any enum function array object 元祖 unknown void
2. ts的优点
强类型 ts是js的超级，它有跟多的类型，可以更好的类型约束，让代码更加严谨
ts让代码的可读性更强
3. implements 和extends区别
一个用之前的可以直接用，一个用之前的需要实现
4. type和interface区别
5. pick和omit区别
6. 多态的意思
重载
覆盖
7. ts工具类型的实现

react 复习

1. react 更新四种方式

state、props、context， useReducer

2. 如何优化组件的多次刷新

class组件

pureComponent
shouldComponentUpdate

函数组件
memo

使用全局数据时，哪里需要用就在哪里获取，避免上层组件更新

在这个原则下做好组件拆分，便于实现如上优化

通过react dev tools观测组件刷新

因为 react 是单向数据流的所以，如果从父组件向下传递数据，就会导致所有子节点都更新，
所以我们在哪里用这个数据的时候就在那里引用，这样就保证只有对应的组件更新，

所以我们在拆分组件的时候要根据更新的需要进行拆分



3. fiber 架构理解

因为浏览器运行 js 和渲染页面和垃圾回收都是在主线程进行的，并且这三种操作的互斥的，所以当 js
执行时间过长的时候可能会导致页面卡顿，react16 之前的版本，react 的 vdom 是树形结构，所以当触发出发更新的时候会进行递归操作，如果递归的层级过深，导致 js 执行时间过长，就会影响页面渲染导致页面出现卡顿，
为了解决这个问题，react16 之后就提出了 fiber 架构，主要就是原来树形结构的 vdom，改为链表结构，在更新的时候时候循环替换取代递归，然后还有时间片和任务优先级的概念，同步任务的优先级会高于异步任务，例如 input 框输入内容，这就是同步任务，同步任务不能被中断，如果是异步任务会进行异步任务调度，每个异步任务有个过期时间，过期时间越小的一步任务优先级越高，时间片就是在浏览器执行完同步任务之后，没有消耗完一帧的时间，剩余的时间可以执行 react 异步任务调用中的任务，根据链表的结构特性如果没有执行完异步任务在剩余的时间中就会保存当前异步任务的，等下次浏览器空闲时继续执行

fiber架构中有两个概念一个是任务优先级、scheduler 任务调度
任务分为同步任务和异步分为，expirationTime为sync的表示同步任务理解执行，expirationTime为数值的是异步任务数值越小优先级越高


一个fiber对象

{
return: 父节点

  child: 第一个子节点

  sibling: 右侧的兄弟节点

  updateQueue: 存储更新队列,
  expirationTime: 当前组件上优先级最高的任务的过期时间, 当组件没有更新的时候, expirationTime为null
}

fiber 查找节点的规则就是， 先找到自己的第一个子节点，如果自己点还有子节点就接着往下找， 找到没有子节点的了就看有没有兄弟节点， 如果兄弟节点有子节点接着找兄弟节点的子节点， 如果没有子节点就看看有没有兄弟节点，有兄弟节点接着找兄弟节点， 没有兄弟节点直接返回父节点， 在父节点按照这个规则继续查找，一直找到fiberRoot

react 如何实现的requestIdleCallback

通过在requestAnimationFrame回调中触发window.postMessage事件, 将react处理的事件放到异步队列中, 等浏览器的一些渲染用户输入的同步任务处理完成之后,计算出时间片, 如果浏览器的操作已经超出了一帧的时间, 并且任务的过期时间还没有过这个时候, react的任务将在下一帧处理, 如果react任务的过期时间已经过了, 那就会直接处理react的任务, 这就是react 模拟requestIdleCallback的方式

4. setState 执行的原理和什么时候是同步的
   内部执行了 setState 的函数, 会在 react 内部的 batchedUpdates 中被执行, batchedUpdates 函数中一开始会将全局变量 isBatchingUpdates(默认值是 false) 设置为 true, 不能进行同步更新和异步调度更新了, 只有在 try {} 中将包含 setState 的函数执行完毕后,才能在 finally{} 中将 isBatchingUpdates 设置为 false, 然后将 state 进行同步更新，
   因为 settimeout 和原生事件都属于异步, 所以会被加入异步队列, 在调用 setState 的时候回调不会被传入 batchdUpdates 中执行,
   所以不会在一开始将 isBatchingUpdates 设置为 true, 所有每次调用 setstate 都会触发同步更新, 还有就是 isBatchingUpdates 已经从 true 变为 false 了, 这个异步的回调中的 setState 才执行, 所以也是同步更新, isBatchingUpdates 就是控制 state 批量更新的全局变量
   http

   react 中18之后都可以批量更新， 然后通过react-dom flushsync(() => {
    setstate()
   })
5. react hooks的实现原理

6. react生命周期和常用hooks
getDerivedStateFromProps
shoudComponentUpdate()
render
didmount
getSnapshotBeforeUpdate f返回值作为参数传给didupdate
didupdate
componentWillUnmount()


7. react的性能优化
1. 主要就是react 组件刷新优化


8. react服务端渲染
同构
注水脱水

客户端使用hydrateRoot

服务端使用renderToPipeableStream、renderToReadableStream、renderToString、 renderToStaticMarkup、renderToStaticNodeStream、

9. react17和18的新功能

createRoot hydateRoot

useTransation 非紧急任务 紧急任务

批量更新优化 flushSync

react.lazy 支持服务端渲染

10. react hooks原理，
hooks存储是链表顺序存储
useState原理
fiberNode = {
   memorizedState: list,
   baseState: 初始值
   queue: 保存过度值
}

hooks的状态是在链表中顺序存储的，所以要保证hooks的顺序执行

usestate 模拟实现
let memorizedState = [];
let index = -1;

const useState = (initValue) => {
    const currentIndex = ++index;
    if (memorizedState[currentIndex]) {
      return memorizedState[currentIndex];
    }
    
    const setState = (value) => {
      memorizedState[currentIndex][0] = value;
      index = -1;
    }

    let arr = [initValue, setState];
    memorizedState[currentIndex] = arr;
    return arr;
}

useEffect模拟实现
let _memoizedState = []; // 多个 hook 存放在这个数组
let _idx = 0; // 当前 memoizedState 下标
function useEffect(callback, deps) {
    // 没有依赖项，则每次都执行 callback
    if(!deps) {
        callback();
    } else {
        // 先根据当前下标获取到存储在全局 hooks 列表中当前位置原本的依赖项
        const memoizedDeps = _memoizedState[_idx];
        if(deps.length === 0) {
            // 通过当前 _memoizedState 下标位置是否有 deps 来判断是不是初次渲染
            !memoizedDeps && callback();
            // 同时也要更新全局 hooks 列表当前下标的依赖项的数据
            _memoizedState[_idx] = deps;
        } else {
            // 如果是初次渲染就直接调用 callback
            // 否则就再判断依赖项有没有更新
            memoizedDeps && deps.every((dep, idx) => dep === memoizedDeps[idx]) || callback();
            // 更新当前下标的依赖项的数据
            _memoizedState[_idx] = deps;
        }
        _idx++;
    }
}

以链表的形式挂载在 FiberNode.updateQueue

11. react. angular. vue 区别和应用场景
1. angular 比react和vue功能更全面，react和vue主要是在UI层面的

2. angular 使用真实dom，react和vue使用虚拟dom

3. angular和vue都有指令， react没有指令

4. vue和angular、 react相比善守上手难度低一些

5. 还有说的vue 适合小项目，react适合大项目，我理解主要是react开发自由度更高，更便于优化性能，还有react提倡更加细粒度的封装，可以提高组件复用

6. 至于技术选型，需要结合团队情况，成员对框架的熟悉程度选择

12. redux和mobx的区别
 redux 是一个store， mobx是多个store

 redux 状态不可变，mobx状态可变，可以直接修改

 redux 是函数式思想，mobx是面向对象思想


rn复习
1. react Native 架构原理

1.1. metro将react-native代码编译成jsbundle或者hermes bytecode，

1.2 然后通过hermes js引擎执行 hermes bytecode， hermes也可以执行js，v8和jsc引擎只能执行js

1.2.1 在打包的时候将js转换为 hermes byteccode，较小包整体体积， 可以缩短首屏启动时间

1.2.2 hermes js引擎 是0.64版本之后在ios和安卓中都可以使用的，之前只可以在安卓中使用， 之前的ios使用的jsc 引擎，使用hermes引擎需要在原生代码里设置 enableHermes 为true

1.2.3 0.7版本版本之后安卓和ios都默认使用hermes引擎

rn分为渲染层和逻辑层，渲染层使用fabric作为渲染器，他的优点是性能更好，扩展性更强，使用hermes作为引擎，优点是hermes bytecode代码体积更小，hermes执行速度更快

2. rn应用启动流程

1. 启动app

2. 加载全部native模块

3. 加载执行jsbundle

4. 在逻辑层将虚拟dom传递给native渲染层后,将虚拟dom转换为shadow tree

6. yoga将shadow tree中的flex布局转换为原生布局

7. 渲染原生内容


3. jsbrige 通信是如何实现的

1. jsBridge 是通过native 代码实现的, 通过将全局对象作为媒介实现逻辑层和渲染层的通信, native端可以获取js的全局对象,实现了native端可以获取js全局对象上的方法进而可以操作js, 应用初始化的时候 bridge就将原生模块通过Json的形式传递给逻辑层, 然后挂载到js的全局对象上

2. jsbridge是异步的

3. 还可以通过jsi实现逻辑层和渲染层通信，是同步的，jsi通过c++实现

4. rn新架构的变化有哪些

1. 使用fabric渲染渲染层, 可以通过jsi实现渲染层和逻辑层通信了

2. turbomodule 实现native模块的按需加载, 在初始化的时候只加载首页需要的native模块, 

3. CodeGen 将ts转换为原生代码

4. rn 做了哪些工程化改造

异常上报 sentry
自动化测试
热更新

5. rn 优化
    使用fast-image加载图片和做图片懒加载

6. rn 如何实现热更新

首先全局安装code-push-cli

然后注册code-push账号，分别添加安卓app和ios app，然后会生成对应app的测试环境和生产环境的key，将测试环境和生产环境的key分别添加到安卓和ios的代码中去

然后在rn中安装react-native-code-push，在app.js中初始化

然后把app包发布过一次之后

然后就可以通过code-push release 指令更新rn代码了

6. rn 和flutter有什么区别， 还有哪些混合开发方案

1. rn 和 flutter用的语言不一样，rn是js而flutter是dart
2. Flutter 在自己的画布上渲染所有组件， React Native 将 JavaScript 组件转换为原生组件。
3. React Native 和 Flutter 都是支持插件开发， React Native 开发的是 npm 插件，而 Flutter 开发的是 pub 插件。

rn和flutter相同点

都是开发应用的跨平台框架

7. rn webview 原理
1. webview加载的页面可以通过postMessage和rn通信
2. webview 就是通过WebKit

electron复习

1. electron是什么

electron是内部封装了chromium和node，创建跨平台桌面端应用的框架

2. 主进程和渲染进程的作用

1. 主进程的程序的入口，用于创建窗口， 处理程序的生命周期等
2. 渲染进程是由主进程创建的，用于渲染窗口页面，每个进程间是独立的
3. 渲染进程和主进程间可以进行ipc通信

3. electron日志上报如何上报

1. 本地日志, 通过ensurefile和appendFile写入本地数据
2. sentry在发生代码错误的时候上传错误

4. electron如何增量更新
1. 使用electron-updater更新
2. 在electron-updater更新的基础上，更新yaml文件，添加stagingPercentage字段，字段的取值是0-100

5. electron如何打包

通过electron-builder进行打包

6. electron 进程间如何通信
渲染进程给主进程发消息通过ipcRenderer 发消息，主进程通过ipcMain监听

主进程通过win.webContents.send()给渲染进程发消息，渲染进程通过ipcRenderer进行监听

主进程通过ipcMain.emit发消息， 主进程通过ipcMain.on监听

渲染进程通过ipcRenderer.sendTo(win2.webContents.id)发消息， 然后渲染进程通过ipcRenderer.on监听

7. electron 有什么优缺点
优点
1. 可以跨平台
2. 开发上手简单，前端就可以开发
3. 社区完善

缺点
1. 打包过大，因为需要把chromium和node的运行环境打包进去
2. 包过大导致应用启动慢，因为包体积过大依赖的插件多导致启动慢

8. electron 启动慢原因

1. 初始化启动electron需要加载大量文件，文件过大导致启动慢，可以拆包避免启动加载不必要的文件

2. 硬件限制，电脑硬件配置不高，导致启动慢，更换性能更好的硬件设备

3. 包体积过大依赖的插件过多导致启动变慢，可以尝试移除不必要的插件

node 复习
1. pm2负载均衡

pm2通过node cluster 集群模块


2. node创建进程， 子进程
创建子进程铜通过child_process 的fork方法可以创建

进行进程操作可以使用process


http 相关的问题

1. 同源策略，跨域
   postmessage、nginx 代理转发、jsonp、cors

2. 请求带 cookie
   前端通过 docoment.cookie 获取和设置 cookie，httponly
   请求头自动携带 cookie 字段
   cookie 限制字段
   cors 跨域携带 cookie
   withCredentials，samesite（Strict、Lax、none）
3. 请求类型、状态码，九种请求方式
head、options、get、post、delete、put、connect、patch、trace

http 常见的状态码 200 响应成功并返回响应数据， 204 响应成功，没有返回响应数据， 206 响应成功， 分段响应数据， 会返回响应数据的大小，301 永久重定向 302 暂时重定向 304 协商缓存状态码 404 没有发现请求的资源 500 服务端错误

4. 三次握手、四次挥手和为什么是三次和四次
三次握手ack报文
客户端发起请求，并将自己的状态设置为待连接状态；
服务端接收到请求，并返回响应，同时也将自己的状态设置为待连接状态；
客户端接收到响应之后，发出信息告诉服务端自己已经接收到请求，同时将自己的状态设置为已连接；
服务端接收到信息后，将自己的状态设置为已连接；
客户端和服务端可以正式开始通信。
四次挥手
客户端发送请求，通知服务端将要断开连接，同时将自己的状态设置为待断开状态；
服务器接收到请求之后，通知客户端，当前可能还有响应没有发送完；
服务端发送完所有响应之后，通知客户端所有响应均已发送，可以断开连接，同时将自己状态设置为待断开状态；
客户端接收到通知后，将自己的状态设置为断开状态，同时通知服务端自己已经断开；
服务端接收到通知后，也将自己的状态设置为断开状态；
服务端和客户端通信正式断开。

5. response body相关的header
200 OK
Access-Control-Allow-Origin: *
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Mon, 18 Jul 2016 16:06:00 GMT
Etag: "c561c68d0ba92bbeb8b0f612a9199f722e3a621a"
Keep-Alive: timeout=5, max=997
Last-Modified: Mon, 18 Jul 2016 02:36:04 GMT
Server: Apache
// 设置多个cookie需要设置多个Set-Cookie，可以重复的
Set-Cookie: mykey=myvalue; expires=Mon, 17-Jul-2017 16:06:00 GMT; Max-Age=31449600; Path=/; secure
Set-Cookie: mykey=myvalue; expires=Mon, 17-Jul-2017 16:06:00 GMT; Max-Age=31449600; Path=/; secure
Set-Cookie: mykey=myvalue; expires=Mon, 17-Jul-2017 16:06:00 GMT; Max-Age=31449600; Path=/; secure
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding
X-Backend-Server: developer2.webapp.scl3.mozilla.com
X-Cache-Info: not cacheable; meta data too large
X-kuma-revision: 1085259
x-frame-options: DENY

前端设置多个cookie是多次调用document.cookie, 调一次只能设置一个cookie

6. 强缓存、协商缓存

public：客户端和代理服务器都可以缓存，响应可以被中间任何一个节点缓存
private：这个是 Cache-Control 的默认取值，只有客户端可以缓存，中间节点不允许缓存
no-cache：表示不进行强缓存验证，而是用协商缓存来验证
no-store：所有内容都不会被缓存，既不使用强缓存，也不使用协商缓存
max-age：表示多久时间之后过期
no-transform: 告诉中间代理不要改变资源的格式


7. 浏览器获取缓存位置的优先级
8. http2 和 http3 有什么特点
   二进制传输
   header 压缩
   多路复用  多路复用因为网络带宽和服务器资源的限制容易导致请求超时， 还有队头阻塞问题，就是同一个TCP连接中的请求一个丢包等待了，其他请求都得等待，不能传输数据了

   服务端推送

   http3 实现QUIC协议，依赖udp协议，使用0RTT 快速建立连接，并且QUIC也实现了丢包重发等，弥补了udp的缺点，
   并且实现多路复用同一个连接的多个请求数据传输是独立的，一个请求丢包了等待重发了，其他请求正常传输。
   

9. 大文件传输方式
1. 分段传输
3. 通过设置 content-type : multipart/form-data, 进行二进制流传输, 然后在使用像 protocal buffer 对二进制进行压缩后在传输

流都是二进制的

10. csrf 和 xss
csrf 
登录A网站， 然后再去b网站，b网站给app网站后端发请求利用a网站下的cookie信息，csrf 攻击过程

1. 同源策略和设置samesite，
2. 验证refer
3. 使用token 替换 cookie

xss

存储型

攻击者将恶意代码存储到目标服务器中
然后用户访问目标网站的时候恶意代码拼接到html被返回并执行
窃取用户信息发送到攻击者服务器

反射型
目标网站原来url上的参数会被后端获取到并拼到html中返回，攻击者将这个参数替换成恶意代码
恶意代码返回到浏览器中执行，获取用户信息，发送给攻击者的客户端


DOM型

前端js代码中有直接获取url中的参数，并通过innerHtml、或者documen.write插入到html中这个时候，攻击者就可以构造一个url将参数换成恶意代码进行攻击

就是

1. 对于修改html的xss攻击，我们可以使用动态渲染的方式防范，还可以转义html

2. 谨慎使用innerhtml, outerHTML、dangerouslySetInnerHTML，不插入有风险的数据，不直接获取url参数插到html

11. https 建立连接的过程

tcp三次握手 + 建立TLS连接（建立连接的时候时候非对称加密）完成连接，连接建立之后传输数据使用对称加密

因为非对称加密算法复杂效率低，在建立连接之后使用对称加密既可以保证效率，又可以增加安全性

对称加密就是加密和解密都用一个密钥， 非对称加密，加密用公钥，解密用私钥

SSL是TLS的前身，TLS是SSL3.1

12. 当连接不安全外网时，可能会遇到页面注入广告信息等，该怎么解决
1. 我们可以使用https协议
2. 可以meta禁用iframe <meta http-equiv="X-Frame-Options" content="DENY"> deny 不允许网页中的iframe加载页面， sameorigin 允许相同域名网页被iframe嵌套  
3. 获取页面所以iframe标签然后移除


禁止页面在iframe中加载
js禁用iframe if(top!=self)top.location=self.location;    


浏览器

1. 浏览器渲染过程
2. 重排重绘
3. 垃圾回收机制
4. 浏览器如何离线操作，service worker， 使用navigator.serviceWorker 操作
5. web worker

通过let obj = new Worker(js文件路径)创建work线程实例， 通过obj.on('message',() => {}), 监听work进程消息， 通过obj.postMessage('1111')给worker进程发消息，worker进程通过全局对象self.postMessage给主进程发消息，通过self.on('message',() => {})接收主进程的消息

work进程中获取不到window、document， 只能获取自己的全局对象 WorkerGlobalScope， WorkerGlobalScope 中包含window中的部分内容，  WorkerGlobalScope 中包含的对象self，self是work线程的顶级对象

6. 地址栏输入url的全过程

dns、 tcp链接、请求资源、浏览器渲染过程、js执行

小程序
实现原理
逻辑层、渲染层、jscore， 通过 jsbrige 利用 native 通信

小程序运行机制

优化

首先使用微信开发者工具中体验评分插件 audits 进行性能评分
一开始只有 60 多分，然后根据性能指标分析

主要问题就是首屏的时间过长

首先知道首屏渲染包括几部分， 代码包下载和加载、代码注入、页面渲染

1. 下载小程序的代码包时间过长
 所以针对下载过程，在上传代码的时候勾选压缩，针对下载阶段
 代码优化
2. 加载小程序代码包时间过长
针对下载和加载，进行分包加载，将首屏需要加载的包内容放在主包里面，
   其他的放在子包里面进行按需下载和加载，子包设置了预加载，会在加载首页后，对包进行预下载
   让首屏加载在 5s 以内

   分包 subpackages，root 分包名，独立分包 independent: true,加载独立分饱不需要加载主包，
   preloadrule: [// 分包预下载
   {
   子包名称
   }
   ]
3.  代码注入时间
代码注入优化：减少启动过程中同步调用、按需加载lazyCodeLoading: 'requiredComponents'
4. 图片加载时间长
将图片压缩放到 cdn

5. 页面渲染优化：提前首屏数据请求、数据预拉取、周期性更新

6. 有的接口请求时间过长
优化接口

## 小程序的分包逻辑是啥

    每个包不能大于2M，最多可以分10个包
    小程序配置文件subPackages字段配置
    分包里面可以使用independent: true,设置为独立分包，只打开独立分包的话不会加载主包，主要用来承载广告页之类的
    还可以通过preloadRule字段设置分包预加载条件

## 小程序的优化手段主要是启动优化

    代码包大小：分包加载、分包预加载、独立分包、减少图片资源、代码优化
    代码注入优化：减少启动过程中同步调用、按需加载lazyCodeLoading: 'requiredComponents'
    页面渲染优化：提前首屏数据请求、数据预拉取、周期性更新、骨架屏、缓存请求数据、精简首屏数据

### 小程序的登录流程
 用户登录的时候， 后端将根据微信login 返回的code+session_Key生成的token设置成无限期， 然后前端只判断checkSession是否过期， 在token存在情况下, 需要使用wx.getsetting获取， 是否有各种权限， 没有的话，主要我们弹出获取权限页面， 如果需要手动触发的话， 不要手动触发的话，直接弹出获取权限弹窗

### Taro 

taro1、2都是编译时框架，将taro 代码编译成小程序代码，使用babel

这里就会有问题，
1. 不能100%支持jsx语法，之前taro只是穷举适配可能的jsx这个工作很繁重
2. 不支持source-map，taro对源码进行一系列转换操作之后就不支持source-map了
3. 由于编译只支持了react框架，支持其他框架增加了维护成本和工作量


taro3是运行时框架， 在小程序端实现是一个模拟的浏览器环境，实现了bom、dom api等，实现dom是根据小程序中<template>可以引用其他的<template>的特性，把taro的dom树渲染成<template>相互引用的形式实现在小程序端渲染，
我们的写的react和vue代码正常编译为js代码，然后在运行时调用taro运行时的api实现不同框架都可以开发小程序，taro实现taro-react 是小程序版本的react-dom，就是将react根页面和taro用小程序api实现的dom实例绑定在一下，并处理react中的事件

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

webpack的构建主要分为两种场景开发环境和构建环境

开发环境的优化主要是针对首次构建速度和热更新速度


1. 优化之前先通过 speed-measure-webpack-plugin 确定优化之前的构建时间, 30多秒

2. 然后针对查询过程 是指 alias 别名，来减小查询时间

3. 针对转化过程设置 exclude 和 include 避免不必要的转化

4. 针对于解析转化过程，通过 dllplugin 对 node_modules 中的包进行预编译，较少构建时间，

5. 并且通过 thread-loader 开启多线程较少构建时间

6. 使用 cache-loader，减少热更新时间
优化完之后首次构建时间为5s多

生产环境主要是想减小打包时间和包体积
生产环境在上面优化的基础上使用webpack-bundle-analyzer分析webpack包体积，通过splitchunks分包

7. 压缩使用 terser-webpack-plugin 并开启多线程较少压缩时间

工程化模块化

1. babel过程，将es6生成ast抽象语法树,对抽象语法书进行编译生成新的ast，然后将新的ast转成es5

2. webpack的工作流程

初始化参数
从配置文件和 Shell 语句中读取并合并参数，得出最终的配置参数。

开始编译
从上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。

确定入口
根据配置中的 entry 找出所有的入口文件。

编译模块
从入口文件出发，调用所有配置的 loader 对模块进行翻译，再找出该模块依赖的模块，这个步骤是递归执行的，直至所有入口依赖的模块文件都经过本步骤的处理。

完成模块编译
经过第 4 步使用 loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。

输出资源
根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk，再把每个 chunk 转换成一个单独的文件加入到输出列表，这一步是可以修改输出内容的最后机会。

输出完成
在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

3. conmonjs和esmodule的区别
1. 语法不同
2. conmonjs是运行时加载，esmodule是编译时加载
3. conmonjs加载的是值的拷贝，内存地址变了，esmodule加载的是值的引用，内存地址相同

### 异常监控
1. try {} catch {} 运行
2. promise.catch
2. img.onerror script.onerror 和 window.onerror
3. sentry 异常上报


做过的比较印象深刻的项目

一个是对有道云笔记桌面端的搜索功能重构，因为云笔记要支持离线搜索， 所以整个的搜索功能都由前端来实现的本地搜索

在没有进行重构之前，主要存在两点问题，一个是搜索速度慢，还有一个是搜索到的笔记不全

然后我先对这两个问题的原因进行了分析
1. 搜索速度慢的问题是由于之前搜索的实现是通过将本地sqlite数据中的笔记全部获取到，然后再通过filter筛选返回结果，这样做在笔记量大时候就非常慢，导致搜索速度慢，一开始测试2000条笔记搜索时间大概为20s

2. 还有笔记时搜索不全的问题，是因为笔记搜索是在每篇笔记的摘要中搜索关键字，而不是在整篇笔记中搜索关键，所以当关键字不在摘要中时，那篇笔记就不能被搜到

确认了问题原因，我就确定了解决问题的方向

首先就要通过在内存中循环查找关键词太慢，我应该改成在数据库中直接查找关键词获取笔记

然后我做了一些调研
1. 搜索我首先elasticSearch，这是我们后端最常用的搜索引擎

优点：存取性能高, 搜索快速, 提供分词存储

需要部署服务, 不能打包到安装包中, 无法集成在 electron 中

现有问题: 没有实现全内容搜索, 搜索功能不完全, 需要补全功能,

2. search-index 结合 nodejieba 分词实现全文搜索
nodejieba 分词, 目前发现最好的中文分词
search-index 倒排索引数据库, 底层依赖的数据库是 levelDB
优点: 实现了分词存储和索引
缺点: 和当前存储方式不统一, 当前存储是 sqlite

3. 使用https://github.com/wangfenjin/simple
node sqlite3 结合 fts5 插件。实现分词和倒排索引

写demo性能也是很好

所以最后选择 sqlite3 + fts5 + simple 实现全文搜索

针对搜索不全的问题，将每篇笔记的全部内容存到数据库中，从每篇笔记的全部内容中搜索关键字

2000 条笔记,优化之后是700ms左右

问题： 

1. sqlite 中的批量插入有条数限制, 上限是 999 条, 一次插入超过这么多条, 会报错 too many sql variables

2. simple插件 只提供了windows和mac x64的版本，没有提供arm64版本，所以我做了向下加兼容并且给我提了一个



electron更新重构

没重构之前的更新，更新非常的简陋就是手动触发下载一个安装包，然后需要用户手动安装替换之前的安装包

所以我们需要提升用户体验，可以让用户自动更新，不需要手动安装

我正对这个问题进行调用，发现electron中提供了更新方式，就是通过electron-updater实现更新

找到了方案，通过electron-updater，可以对更新的各个阶段进行处理，然后给出不同的提示文案，下载中、下载完成等，

最后重构了更新流程，实现了检查更新、安装后自动安装这个更新流程

提高了用户体验

并且增加了增量更新，添加stagingPercentage字段，字段的取值是0-100

继续准备云笔记做过的事


### 建站项目总结

1. 由于我们项目比较紧急所以选择现有的页面编辑器，h5-Dooring、tmagic-editor，都不是很适合，最后发现了一个 ant landing，他的交互还有整体代码的书写都很好，所以最后选择了这个， 但是由于项目比较老了，所以我对它进行了 ts 和 hooks 的改造，redux 进行全局数据管理
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
