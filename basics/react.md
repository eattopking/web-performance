## hooks 总结

react-router 原理

hash router 是根据改变路径上 hash 值,通过 hashchange 监听来切换页面, 不会导致网页重新刷新

browser router 通过 h5 history 中的 history.pushState 来改变 url, 并且不会导致页面刷新, 然后通过监听 window 的 popState 事件来切换页面展示

使用 browswe router 需要在 nginx 处理 无论请求路径是什么都返回 单页应用的 index.html 文件, 这样做是为了手动刷新时不会返回 404

然后在接口请求时判断是否是 404 是 404 直接返回跳转 404 组件页面

原生无法监听 history.pushState 和 replaceState 的变化, 需要重些这两个 api 来进行监听他们的变化, react-router 监听的时候也是重写的

popState 事件只有在调用 history.pushState 或 replaceState 只有, 切换前后页面时才调用

### react fiber 架构学习总结(可以，改的挺快)

### react 组件的性能检测和代码中的性能上报

react 中渲染让的含义： 渲染就是触发 render， 然后进行 render 中新旧结果的比较， 得出比较结果

react 中提交（commit）的含义： 提交就是根据渲染得出的 render 差异，更新虚拟 dom（但是没有更新真实的 dom），
更新完虚拟 dom 会触发 componentDidMount 或 componentDidUpdate 生命周期

在 react 代码中的 Profiler 代码默认会在开发模式构建后被开启，在生产模式构建后被禁用， 我们也可以通过特殊的配置让我们在生产模式构建后的代码中依然可以实现 Profiler 的性能检测上报

[profiler 代码在生产模式构建后依然可以使用的配置](https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977)

1. 在生产模式构建后被禁用的 Profiler， 是指代码中的 Profiler 组件代码和 chrome 的 react 插件中的 profiler 录制都禁用

2. 在代码中加入 Profiler 组件本身就会影响性能

3. 在开发模式构建代码，通过亲身测试不能直接使用 Profiler 和 profiler 录制， 然后引入 resolve: {
   alias: {
   'react-dom': 'react-dom/profiling',
   'scheduler/tracing': 'scheduler/tracing-profiling',
   }
   }
   还报错，不知道啥原因， 先记录到这里， 等要使用的时候在研究把

#### 在 chrome 浏览器中分析 react 组件性能

1. chrome 中通过安装 react 插件，通过其中 profiler（类似于 chrome 中的 performance 的录制）进行页面操作时的，组件提交的性能录制来分析 react 的性能

[profiler 的具体使用教程](https://react.docschina.org/blog/2018/09/10/introducing-the-react-profiler.html)

2. profiler 的性能分析就是以组件为单位(时间就是组件的虚拟 dom 更新时间)， 性能标准就是每次顶层和它子组件的渲染提交时间(虚拟 dom 更新时间)，每次提交可能顶层没有重新渲染， 所有是灰色， 只有顶层的子组件进行了渲染提交然后展示黄色等颜色，可以查看提交耗费的时间， 然后比较性能， 和选中后的组件的 state 和 props 可以根据切换提交来观察，不同提交的 state 和 props 的变化

![react profiler](../images/profiler.png)

#### 在组件中上报吗 react 的提交时间等性能

通过在在 react 实例中获取 unstable_Profiler 这个组件， 然后将组件改名为 Profiler，然后将这个组件包裹在想监听的组件外边，
然后在 Profiler 的 onRender 事件回调中获取各种性能信息， 用于上报， 还必须给 Profiler 组件设置一个 id， 用于区分不同的 Profiler

### React 严格模式

通过过在 react 实例中获取 StaticMode 组件， 然后包裹在对应组件的外部， 实现对组件的严格模式检查， 如果出现不符合的， 会在控制台报出警告

严格模式会在 webpack 开发模式构建后被开启， 会在 webpack 生产模式构建被关闭

### redux 的源码实现

首先 redux 有几个概念， store， reducer， action， store 就是通过 createStore 传入 reducer 创建出来的，
store 包含存放数据的 state， 还有用于发送 action 的 dispatch， reducer 使用用于在 dispatch 发送 action 的时候调用更新 state 的， reducer 是一个函数， 它的参数是 action 和 当前的 state

redux 还有中间件机制， 用于增强 store 的功能的， 主要是通过函数柯理化的原理实现的

react 中要运用 redux 要 redux 和 react-redux 配合使用，react-redux 提供两个组件一个是 provider 组件用于包裹入口组件， 将 redux 的 store 传给 provider props 上的 store，用于从顶层传递数据， 还提供了 connect 高阶组件，
用于组件注册 redux 数据的更新，然后返回一个新的组件， 然后在这新组件内部调用我们传入进去的组件， 然后将我们 redux 的数据通过 props 传递给我们原有的组件实现在我们自己组件的内部接收 redux 数据的目的

connect 和 provider 可以通信的原因是，react-redux 内部是通过 context 传递数据的， connect 和 provider 共用一个 context 实例， 所以它们两个数据是一个， 所以就可以将通过 provider 传递的数据，传递给被 connect 包裹的组件了

redux 的使用还需要在看一遍

### create-react-app

创建的项目配置文件， webpack 配置会隐藏起来默认， 可以通过 npm run eject 将隐藏的配置目录显示出来

### react 事件机制的实现

1. 首先我们 react 元素上注册的不是原生事件， 是合成事件， 因为我们 react 是虚拟 dom， 我们注册事件的时候只是往 fiber 的 props 上加了属性， 还有不同浏览器之间在事件处理上有一些差异， 所以使用合成事件还有合成事件对象可以磨平不同浏览器的差异，通过 react 内部的判断

2. react 的合成事件， 提供了顶层注册、事件收集、统一触发的事件机制

3. 顶层注册就是将真实的原始事件注册到 root 元素上，react17 以后就是注册到 root 上了， 原来版本是注册到 document 上的， 注册到 root 上是因为，避免多版本 react 共存的时候， 发生事件系统冲突

4. 事件收集是指， 在通过目标元素触发 root 上注册的事件处理函数时，会根据目标元素向上查找，等到对应的事件执行路径数组，和对应的合成事件对象

5. 统一触发就是 react 会在 root 上注册的事件处理函数中， 模拟原生事件的事件执行过程， 执行事件执行路径数组里边的事件处理函数

react 内部 会将相同类型事件捕获阶段执行的事件， 和冒泡阶段执行的事件按照顺序统一放在一个事件执行路径数组中，
当数组反向遍历的时候模拟捕获阶段， 正向遍历的时候模拟冒泡阶段， 我们的目标元素注册的事件是放在数组的第一位的

没有事件执行路径数组对应一个属于自己的合成事件对象， 但是这个数组是共用一个合成事件对象的， 阻止冒泡的模拟是通过调用阻止冒泡函数更改合成事件对象上的一个属性，通过在遍历数组的时候判断这个属性， 来结束循环实现阻止冒泡

事件是有优先级的：

优先级分为 连续事件（error） > 用户阻塞事件（scroll） > 离散时间（click）

不同优先级的事件， 在 root 上注册原生事件时使用的事件处理函数是不同的

在 render 阶段 检测的到 fiber 的 prop 注册了事件， 这个时候就会往 root 上注册对应的原生事件, 如果 react 有对应的事件更新， 那就移除 root 上对应的原生事件，重新注册

react 根据事件名称判断事件触发的时机， 带有 capture 的事件就在捕获阶段执行

如果在父元素上注册了相同事件， 捕获和冒泡执行的两种情况， 这个时候事件收集阶段只会把和作为目标元素的子元素的相同触发阶段的事件收集

### createElement 源码理解

createElement 接受三个或更多参数 createElement(type, config, children ,children),
除了前两个参数以外都是 children, createElement 内部会通过 arguments 获取所有的 children 到一个数组， 然后把这个数组设置给传给这个组件的 props.children 属性

type 表示当前 createElement 创建的是什么 react 元素， 是类组件，函数组件，react 原生元素， react 提供的例如 Suspends 这样的组件

config 就是父组件传给这个组件的 props,然后组件内部筛选出这四个属性 **self, **source, key, ref, 然后其余属性作为 props 传给组件内部

createElement 最后返回的就是一个对象， 返回的对象就是虚拟 dom

这个对象包括 {
// 这是表示这个元素是什么 react 类型， 只要是 jsx 都是 REACT_ELEMENT_TYPE 类型的

$$
typeof: REACT_ELEMENT_TYPE,
// 我们给元素传的key
key: key,
// 我们给元素传的ref
ref: ref,
// 这个元素是什么类型的react元素
type: type,
// 筛选过后可以传给组件内部的props
props: props
//这个之后在了解
__owner: owner
}


### Fiber 架构的理解

react fiber 架构的更新流程
render阶段
1. 触发react创建更新的操作的有三种分别是 ReactDom.render(),  setState, forceUpdate, 通过这三种方式触发更新,
创建更新内容update(记录更新相关信息), 将update存入到对应fiber的updateQueue中, 然后触发调度

1.1 ReactDom.render() 会创建一个fiberRoot, 存储在container上

1.2 FiberRoot对象
fiberRoot 是 reactDOM.render的第二个参数，这个dom对象上的一个属性

reactDom.render执行之后， 生成一个FiberRoot 对象，
这个对象 包括很多属性{
containerInfo: rootDOM 这个属性存放的值， 就是reactDOM.render的第二个参数， 就是项目要挂载的根节点

 current: HostRoot 执行一次reactDom.render 创建的react应用的 fiber tree的根节点
}

HostRoot
{
child 就是reactDom.render第一个参数传入的这个react组件的fiber
expirationTime 有更新时,当前hostRoot中优先级最高的任务的过期时间
return : null , 只有HostRoot return是null,
stateNode: FiberRoot
}

#### fiber对象
fiber是一个对象，主要结构就是

{
return: 父节点

  child: 第一个子节点

  sibling: 右侧的兄弟节点

  updateQueue: 存储更新队列,
expirationTime: 当前组件上优先级最高的任务的过期时间, 当组件没有更新的时候, expirationTime为null
}

fiber 查找节点的规则就是， 先找到自己的第一个子节点，如果自己点还有子节点就接着往下找， 找到没有子节点的了就看有没有兄弟节点， 如果兄弟节点有子节点接着找兄弟节点的子节点， 如果没有子节点就看看有没有兄弟节点，有兄弟节点接着找兄弟节点， 没有兄弟节点直接返回父节点， 在父节点按照这个规则继续查找

fiber 架构 就是根据fiber这个数据结构实现的，这个优化的架构, fiber 整体是一个链表结构

1.3 update的主要结果

{
expirationTime: 过期更新时间
payload: 要更新的内容，update更新不止是state更新，还可以是组件内容更新等
tag: 更新的类型分为： 0(正常更新)，1(替换更新)，2(强制更新)，3（捕获错误的更新）四种
next: 下一个update
}

updateQueue 是一个对象

{
baseState: state, 最近更新完成的state
firstUpdate: update,firstUpdate是一个单向链表记录这个组件所有的更新，我们所有的更新就记录在这上边
lastUpdate: 链表上最后一个更新
}

1.4 expirationTime

在react的任务优先级中，异步的任务优先级是比较低的， 是可以被优先级更高的同步任务打断的，
但是为了防止异步任务一直被打断，导致异步任务无法被执行，所以每个异步任务根据优先级都会有一个过期更新时间（expirationTime），过了这个时间异步任务就会被强制执行了， 不能被打断了， 这是expirationTime的第一个作用

同步任务和指定context也有expirationTime（过期更新时间）

1.5 setState

1.5.1 setState就是创建一个update(更新)， 将这个更新添加到对应组件的Fiber的updateQueue对象中的存储更新链表的字段上，在render阶段结束的时候将state合并, 在commit 阶段批量更新state

1.5.2 内部执行了setState的函数, 会在react内部的batchedUpdates中被执行, batchedUpdates 函数中一开始会将全局变量isBatchingUpdates(默认值是false) 设置为true, 不能进行同步更新和异步调度更新了, 只有在 try {} 中将包含setState的函数执行完毕后,才能在finally{} 中将 isBatchingUpdates 设置为false, 然后将state进行同步更新

1.5.3 因为settimeout 和原生事件都属于异步, 所以会被加入异步队列, 在调用setState的时候回调不会被传入batchdUpdates中执行,
所以不会在一开始将isBatchingUpdates设置为true, 所有每次调用setstate都会触发同步更新, 还有就是isBatchingUpdates已经从true变为false了, 这个异步的回调中的setState才执行, 所以也是同步更新, isBatchingUpdates就是控制state批量更新的全局变量

1.5.4 所以说setState本身的执行是同步的, 只是react内部通过将包含setState的函数传入batchedUpdates中, 在执行之前将isBatchingUpdates更新true, 不能进行更新, 只有在包含setState的函数执行完毕后, 在将isBatchingUpdates设置为false, 然后统一更新state

scheduler包进行调度

2. 内部调用scheduleWork方法 处理调度, 给scheduleWork 方法传入当前更新组件的fiber和当前更新任务的expirationTime, 然后通过传入的fiber对象, 找到这个fiber对象对应的FiberRoot

2.1 通过判断当前fiber的expirationTime, 是不是没有过更新, 没有更新就将最新更新的expirationTime赋值给fiber的expirationTime, 最新更新的expirationTime和当前fiber.expirationTime比较, 如果最新更新的expirationTime更小,那就是优先级更高, 直接赋值给fiber.expirationTime

2.2 通过fiber的return属性, 逐级向上查找父级, 最终找到fiberRoot

2.3 在同一个fiberRoot上新的更新任务优先级高于老的任务优先级, 老的任务正在执行时会被打断, 高优先级的任务会被先执行, 之前低优先级任务已经执行的部分会被还原, 调用resetStack中断, 将之前处理一部分的低优先级的任务还原, 只有isWorking是false或者iscommiting是true, 才可以继续更新,isWorking表示正在工作(包括render阶段和commit阶段), iscommiting 表示正在提交阶段(正在提交阶段就是将最终的fiber tree渲染到页面上, 提交阶段还可以继续触发render阶段的更新,互不影响)


3. requestWork 将发生更新的fiberRoot加入fiberRoot调度队列, fiberRoot调度队列是个链表, 然后判断是否可以进行批量更新, 通过isBatchingUpdates(如果是true就不可以批量更新) 还有isUnBatchingUpdates(如果是false就不可以进行批量更新), 如果可以进行批量更新, 是同步任务就执行, 是异步任务就开始异步调度

3.1 如果只有一个fiberRoot, 并且之前没有更新过, 那就将全局变量lastScheduledRoot, firstSchduledRoot都赋值为这个fiberRoot, lastScheduledRoot 表示fiberRoot调度队列中的最后一项, firstScheduledRoot表示fiberRoot调度队列的首项, 可以通过nextScheduledRoot继续向下查找fiberRoot, lastScheduledRoot是fiberRoot调度队列的最后一项, react内部通过这两个全局变量获取fiberRoot调度队列, 然后进行处理

3.2 每个fiberRoot上边都有nextScheduledRoot属性, 指向fiberRoot链表的下一项, 如果react应用中只有一个fiberRoot, 那么fiberRoot的nextScheduledRoot就是fiberRoot自身

3.3 如果不同fiberRoot触发更新,那就执行优先级更高的那个fiberRoot的任务, 优先级低的那个任务被取消

3.4 在同一个fiberRoot再次触发更新的时候, 会将新一次更新的expirationTime和fiberRoot上之前的expirationTime做比较, 如果新的expirationTime更小, 说明新的更新优先级更高, 就将fiberRoot的expirationTime 替换成更小的这个, 优先执行优先级更高的任务, 更新都是从顶部向下更新的, 就是从fiberRoot开始向子级更新, 优先级高的任务执行的时候, 会将优先级低的任务执行一部分的结果重置

3.5 如果react中的更新都已处理完毕, 那就将lastScheduledRoot和firstScheduledRoot都设置为null, 最开始没有更新的时候lastScheduledRoot和firstScheduledRoot也是null

3.6 处理更新的时候, 通过expirationTime的值区分任务的等级， 如果值是sync(同步任务)就会立即执行这个任务不会被打断，一直占用浏览器主线程到将任务处理完毕(处理完毕也是在render阶段), 如果是异步任务, expirationTime越小的优先级越高, 异步任务可以在render阶段可以中断

3.7 这就是fiber架构的一部分， 任务优先级， 优先级高的任务先执行，提高性能， 避免浏览器主线程被优先级低的任务占用事件过长，导致页面性能下降, 从react16 开始有任务优先级的

4. 如果expirationTime判断是异步任务,就使用scheduler包进行异步调度, 判断当前任务的expirationTime和正在处理的异步任务那个优先级高, 如果当前任务的优先级更高, 那就通过执行上一个任务的时候设置的callbackId全局变量, 撤销上一个正在执行的任务, 然后执行新的任务, 并且将执行新任务返回的callbackId赋值给全局变量callbackId

requestHostCallback

4.1 react默认认为浏览器的刷新频率是每秒30次(就是每秒30帧的意思), react保证每帧react处理占用的时间最多的22ms, 浏览器每帧占用11ms, 正常每帧的时间就是33ms, 1s等于1000ms

4.2 react根据每帧执行计算出, 具体浏览器每帧执行的时间, 但是react最小只支持每帧时间是8ms, 就是刷新频率是120hz, 每秒刷新120次

4.3 通过在requestAnimationFrame回调中触发window.postMessage事件, 将react处理的事件放到异步队列中, 等浏览器的一些渲染用户输入的同步任务处理完成之后,计算出时间片, 如果浏览器的操作已经超出了一帧的时间, 并且任务的过期时间还没有过这个时候, react的任务将在下一帧处理, 如果react任务的过期时间已经过了, 那就会直接处理react的任务, 这就是react 模拟requestIdleCallback的方式

4.4 如果是异步任务，就进入调度流程，将异步任务放在模拟的requestIdlCallback(callback)回调中， 等到浏览器空闲了再去执行这个异步任务，并且在执行异步任务的时候react会设置一个deadline(时间片)，如果超过deadline就会中断执行的异步任务，在注册一个模拟的requestIdlCallback(callback) 回调， 将没有执行完的异步任务，放在注册的回调中，等待下次浏览器空闲在执行，当浏览器的空闲的时候，执行模拟的requestIdlCallback(callback) 回调的时候， 如果有异步任务的expirationTime 已经过期的话， 那就会将过期的任务都执行完， 直到执行到第一个没有过期的任务，执行行完过期任务之后如果时间没有超过deadline那就继续执行其他优先级高的异步任务，如果时间超过deadline ，那就将浏览器主线程控制权交给浏览器

4.5 如果是同步任务或者是过期时间已经过了的异步任务, 都是不可以被中断的

4.6 一个fiberRoot更新完毕, 会通过firstScheduledRoot查找下一个需要更新的fiberRoot进行更新

react-reconcile 进行diff 更新和生成effect list

5. renderRoot, 循环整个fiberTree, 更新每一个fiber节点

5.1 如果fiber节点上有updateQueue表示节点需要更新, 更新完成后需要查找是否有子节点需要更新, 没有子节点需要更新看看是否兄弟节点需要更新, 都没有了更新就结束了
更新的时候处理的都是workinProgressTree, 最后用这个workInprogress tree更新dom, 然后将workinProgess tree 赋值给current tree

6. react commit 阶段

6.1 将合并好的state批量更新

6.2 将最终处理好的fiber tree 进行页面渲染

6.3 执行Effect List中的副作用

6.4 执行生命周期函数



expirationTime 计算方式

#### children

this.props.children 可以传任何值，只要父组件内部取到children的时候可以通过children获取到react可以渲染的内容就可以

### react 18 新更新

concurrent mode 并发模式, 支持不全部批量更新, 可以设置紧急更新和非紧急更新, 紧急更新一起批量更新, 非紧急更新一起批量更新, 紧急更新可以打断非紧急更新, 先执行紧急更新, 更新完真实dom后才进行非紧急更新, 并发模式新增加的中断更新就是可以不是所有的更新都一起批量更新

一个fiber对应一个更新, 而一个更新中有同步任务和异步任务, 异步任务加入到任务队列中间歇执行, 同步任务直接执行, 这都是说一个更新

concurrent mode 并发模式是在fiber的上层的, fiber是它的组成部分

### react 项目的几种创建方式

create-react-app ,这个只能创建一个webpack构建的普通react项目，不会集成其他东西

next，这个只能创建一个普通react服务端渲染项目，不会集成其他东西

umi，可以创建非ssr和ssr、还有预渲染的react项目，继承了react-router，antd，react-helmet等

antd-pro，在umi的基础上做的创建管理后台的react项目

gatsby，创建普通的react项目

### react 服务端渲染

1. 服务端渲染在node中生成html字符串的时候组件的中生命周期都是不执行的，组件中获得的数据，都是在node获取到然后在从顶层组件传进去的


#### immutable 数据更新的 JavaScript 库

immer 速度慢，但是支持ie，兼容性好

mutative 速度比immer快， 内部通过proxy实现，支持ie，兼容性没有immer好

### react 组件设计原则，react开发方法论












$$
