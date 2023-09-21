### 此文档用于记录面试的问题以及探讨的问题答案

#### css 和页面适配

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

14. transform为什么是不占cpu，而是占用的GPU

首先cpu是单控制流单数据流的，Gpu是单控制流多数据流的

cpu擅长处理复杂困难的计算，gpu擅长处理简单重复的计算， cpu就像一个大学生可以计算复杂的题，Gpu就像是一个班级的小学生可以计算大量的1+1的计算

因为transform动画和opcity都属于是简单重复的计算，所以适合使用GPU计算，效率更高

gup渲染需要创建一个新的图层，然后把元素移到新的图层上之后在操作，最后合并图层

will-change 就是让浏览器提前为执行某些属性做准备， 比如transform就是会提前创建图层，然后直接叫GPU渲染了

只有重复的简单的渲染浏览器默认通过GPU渲染的（像 transform、opacity、filter等），其他的还是使用cpu渲染的

过度使用 will-change 将导致内存使用过多，并导致更复杂的渲染发生，因为浏览器试图为可能的更改做准备。这将导致更差的性能。
15. 移动端 fixed 什么时候会失效，设置了 position fixed 之后的元素, 什么时候会 fixed 失效

当外层元素创建了层叠上下文, 子元素的固定定位就相对于外层元素了, 而不是视口了
可以创建层叠上下文的方式
设置transform 不为none
opcity 小于 1


#### js原生和es6复习
1. 事件队列，宏任务微任务
js的特性js是单线程，所以js有异步的概念，当执行到异步代码的时候会将任务先放到异步队列中，异步队列分为宏任务和微任务，当同步任务执行完毕之后，先去执行微任务队列中的任务，微任务队列中任务被执行完了再去执行宏任务队列中任务，微任务的优先级大于宏任务的优先级

常见的微任务有 process.nextTick Promise.then, 常见的宏任务有setTimeout 、setInterval、dom原生事件、ajax回调
2. 原型链理解
实例查找属性的过程
3. 作用域链理解
查找变量的过程
4. 箭头函数和普通函数的区别
 1、没有自己的this，指向外层普通函数的作用域
 2、没有constructor，不能被new操作符当做构造函数调用
 3、不能通过bind，call等绑定this
 4、没有new.target属性，普通函数中，new.target等于undefined
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

23. 如何实现一个iterator,可迭代，它和generator有什么关系
只要是不是箭头函数，其他的函数当作对象的属性执行的时候其内部this都是指向这个对象，跟函数的作用无关（比如generator函数或是async 函数）

generator 函数就是生成迭代器的

generator的执行就是通过迭代的next函数调用触发的，每次next()触发generator函数都是在遇到yield或者return的时候停止并返回他们之后的运行结果，遇到return之后函数执行就是结束了，再次调用就不会往下执行了，遇到yield之后，再次调用next()还会继续往下执行，如果过后面没有return或者yield了就执行执行往并返回 {value: undefiend, done: true},结束函数的执行

数据结构的迭代器属性，其实是一个迭代器生成函数，属性名称是Symbol.iterator(这个一特定的值可以比较的值，Symbol.iterator 是全等于 Symbol.iterator的)，所以我们可以使用generator实现数据结构的迭代器属性

数据结构的迭代器属性就是用来做for ...of遍历的，for...of 取到迭代器属性然后生成迭代器实例，用这个实例进行遍历，而不是直接遍历数据结构

yield* 就是将其他迭代器，或者调用其他数据结构的迭代器函数生成迭代器，然后将迭代器的执行过程中的yield合并到这个generater中一起执行

generator的next函数的参数会作为上一个yield的返回值，可以在执行下面代码的时候用到，利用generator配合promise实现类似await的功能就是利用这个原理，返回promise，然后.then之后的结果在调用next的时候作为参数传下去这样yiled下面的代码就可以获取请求后的结果在继续执行了，就实现了和await类似的结果



24. promise和async await的关系

promise可以处理异步，async await是通过promise和generator实现的，根据generator延迟执行遇到yield会停止的特性，还有next的参数会作为上一个yield的返回值的特性实现的await效果

25. 使用promise 和generator实现 async await 
26. 函数柯理化有啥好处

27. 使用事件代理有哪些好处
1. 避免注册多个事件占用过多内存，影响性能
2. 统一处理代码简洁，新增元素不用在注册事件
28. 进程中堆内存和堆外内存的如何区分
node 中进程中的内存是堆内存是由v8分配的， 通过流或者buffer操作的数据使用的是堆外内存，流也是通过buffer实现的


#### ts复习
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
ts总结中已经有了，到那去看
8. 说一下实际使用之后，感觉怎么使用ts比较好
主要分为三种情况吧
1. 接口相关的每个接口文件对应一套ts类型，参数类型和返回值类型，然后这套类型可以复用，在调用接口的时候也可以使用返回值类型，然后类型定义的时候要写全，要不然没意义了
2. 我正常组件开发中，ts类型定义直接写在组件中就可以了
3. utils方法中也是提出来一个公共的ts文件然后引用， 参数类型和返回值类型

9. ts 协变、逆变概念


#### react 复习

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
1. 同构、注水脱水

2. 客户端使用hydrateRoot

3. 服务端使用renderToPipeableStream、renderToReadableStream、renderToString、 renderToStaticMarkup、renderToStaticNodeStream、
renderToPipeableStream是如何实现的， 使用ssr react有哪些注意事项，为什么 useLoayoutEffect react.lazy 不能使用啊 ？？？

4. 使用流展示的页面和正常字符串穿的页面有什么不同呢？？？

9. react17和18的新功能 还得看

1. createRoot hydateRoot

2. useTransation 非紧急任务 紧急任务， 原理是什么

3. 批量更新优化 flushSync

4. react.lazy 支持服务端渲染 为什么支持，怎么支持的

5. react18 新的概念都是啥，有啥作用， 如何解决Effect初始化要执行一次， 如何设置effect 有两个参数，但是只受一个参数控制，还有其他的react案例

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
1. angular 比react和vue功能更全面，包含UI、路由、请求等，react和vue就是在UI层面的

2. angular 使用真实dom，react和vue使用虚拟dom

3. angular和vue都有指令， react没有指令

4. vue和react都可以实现相同的功能，区别在于数据传递 react单向数据流，vue是双向绑定、模版渲染react是使用jsx、vue是使用模版（vue3也支持jsx了）

12. redux和mobx的区别
 redux 是一个store， mobx是多个store

 redux 状态不可变，mobx状态可变，可以直接修改

 redux 是函数式思想，mobx是面向对象思想

13. react异常展示展位组件

创建ErrorBoundary组件 包裹正常组件，报错之后展示预设的占位组件， 通过getDerivedStateFromError监听子组件报错

14. 函数式组件和类组件的区别

函数式组件是函数式编程思想，主打的是immutable（不可变的）、没有副作用、引用透明等特点；而类组件是面向对象编程思想，它主打的是继承、生命周期等核心概念。


15. 如何用hooks实现didupdate
16. react 合成事件

17. 并发更新概念
18. 纯函数有啥好处
1. 输入和输出是确定的，可以做缓存
#### vue复习

1. vue2的生命周期 和react生命周期有何不同
beforecreate（初始化事件和生命周期函数之后执行）、createed（data、props、methods创建好后执行，但是模版结构还没有创建好），beforemount（挂载之前，模版结构创建完了但是没有挂载）、mounted（挂载完毕，vue实例初始化完毕）、beforeUpdate（页面更新之前之前, 数据和虚拟dom更新了页面还没更新）、Updatetd（页面更新之后）、beforeDestroy（组件卸载之前）、destroyed（组件卸载之后）

vue2的生命周期比react多了两个创建之前和创建之后

2. vue的虚拟dom和react的有何不同， vue diff和react有何不同

react虚拟dom diff算法是从顶向下全部diff，然后创建一个新的虚拟dom和旧的虚拟dom比较，找到变化，只更新变化的dom

vue会跟踪每个组件的依赖关系，局部更新组件树，而不是重新diff整个组件树

3. vue3 完全组合式生命周期，在设置成<script setup>之后使用的

onBeforeMount、onMounted、onBeforeUpdate、onUpdated（父组件更新后，它的这个生命周期会在子组件的这个生命周期执行后执行）、onBeforeUnmount、onUnmounted、onErrorCaptured（子组件报错夫组件执行这个生命周期）

4. vue组合式api和选项式api区别

选择式api就是vue2的老语法，data，methods、created这种

组合式api是vue3提供的新写法，使用setup 配合 ref，实现了vue2中的data、methods的功能，还可以对methods中的逻辑提取成多个小函数在引用到setup中，方便复用，类似react的自定义hooks

5. vue2和vue3双向绑定的实现，双向绑定就是用的响应式，它们是一个原理

vue2使用Object.defineProperty实现双向绑定, 

let obj = {x: 1}
Object.defineProperty(obj, 'x', {
    set: function(value) {
        this.value = value
    },
    get: function() {
        return this.value;
    }
})

vue3通过Proxy和Reflect实现双向绑定

let obj = {x: 1}

new Proxy(obj, { 
    set: function(target, key ,value) {
        Reflect.set(target, key, vlaue);
    },
    get: function(target, key) {
        return Reflect.get(target, key);
    },
    deleteProperty: function(target, key) {
        Reflect.deleteProperty(target, key)
    }
})

6. vue的响应式是什么意思

vue的响应式指的就是通过this.value,更新data中的数据或者setup返回的数据会导致dom重新渲染，并且data中或者通过ref定义的响应式对象的值也跟着更新了

7. vue jsx使用

vue2中使用jsx，是在render函数里面使用，render函数和data是并列的，vue3需要被difineComponent包裹之后，然后在setup中retuen jsx，把setup当render

8. 为什么说vue是渐进式的

9. vue的组合式api和react hooks有什么区别


#### rn复习
1. react Native 架构原理

1.1. 开启hermes引擎之后，metro 编译react-native代码的时候hermes会有个预编译把metro编译出来的jsbundle转换成hermes bytecode，（原来的js引擎搜边转换边执行的，js引擎最后都是执行的字节码，hermes也可以边转换边执行，但是速度要比v8和jscode慢，以为hermes移除了JIT编译器，就是去掉了边转换边执行的优化，这样带来的好处就是减小了hermes引擎的体积，优化了内存大小，还有JIT在启动时需要预热，影响app启动时间， hermes有针对移动端的垃圾回收策略）

1.2 然后通过hermes js引擎执行，hermes bytecode

1.2.1 hermes预编译将js转换为 hermes byteccode文件大小比单纯的js文件大

1.2.2 hermes js引擎 是0.64版本之后在ios和安卓中都可以使用的，之前只可以在安卓中使用， 之前的ios使用的jsc 引擎，使用hermes引擎需要在原生代码里设置 enableHermes 为true

1.2.3 0.7版本版本之后安卓和ios都默认使用hermes引擎

rn工作有这个几部分组成，native端、jsbridge或者jsi、渲染层使用fabric作为渲染器，他的优点是性能更好，扩展性更强，使用hermes作为引擎，优点是体积小，执行速度快

2. rn应用启动流程

1. 启动app

2. 加载全部native模块

3. 加载执行jsbundle

4. 在逻辑层将虚拟dom传递给渲染层后,将虚拟dom转换为shadow tree

6. yoga将shadow tree中的flex布局转换为原生布局

7. 渲染原生内容


3. jsbrige 通信是如何实现的

1. jsBridge 是通过native 代码实现的, 通过将全局对象作为媒介实现逻辑层和渲染层的通信, native端可以获取js的全局对象,实现了native端可以获取js全局对象上的方法进而可以操作js, 应用初始化的时候 bridge就将原生模块通过Json的形式传递给逻辑层, 然后挂载到js的全局对象上

2. jsbridge是异步的，需要序列化反序列化， 通信效率低

3. 还可以通过jsi实现逻辑层和渲染层通信，是同步的，jsi通过c++实现，提高通信效率

4. rn新架构的变化有哪些

1. 使用fabric渲染渲染层, 可以通过jsi实现渲染层和逻辑层通信了

2. turbomodule 实现native模块的按需加载, 在初始化的时候只加载首页需要的native模块, 

3. CodeGen 将ts转换为原生代码

5. rn 如何实现热更新

首先全局安装code-push-cli

然后注册code-push账号，分别添加安卓app和ios app，然后会生成对应app的测试环境和生产环境的key，将测试环境和生产环境的key分别添加到安卓和ios的代码中去

然后在rn中安装react-native-code-push，在app.js中初始化

然后把app包发布过一次之后

然后就可以通过code-push release 指令更新rn代码了，需要输入更新的版本和环境

6. rn 和flutter有什么区别， 还有哪些混合开发方案

1. rn 和 flutter用的语言不一样，rn是js而flutter是dart
2. Flutter 在自己的画布上渲染所有组件， React Native 将 JavaScript 组件转换为原生组件。
3. React Native 和 Flutter 都是支持插件开发， React Native 开发的是 npm 插件，而 Flutter 开发的是 pub 插件。

还有跨端开发方案就是 codva，weex

rn和flutter相同点

都是开发应用的跨平台框架

7. rn webview 原理
1. webview加载的页面可以通过postMessage和rn通信
2. webview 就是通过WebKit

8.  rn做过哪些构建优化
1. 拆包
1.1 首先要确定如何拆包，我们根据用途拆分为common包（项目中公共依赖打成一个包，跟随app版本下发，因为common包体积太大，动态下发成本太大）和业务逻辑包（动态下发，热更新），
common公共代码包只加载一次，biz包是业务包按需加载（修改native的代码实现按需加载）

1.2 需要两个metro配置文件，一个构建common包，一个构建业务逻辑包，通过配置createModuleIdFactory（传入module的绝对路径返回打包时生成的id）和processModuleFilter（传入module信息，通过返回boolean判断是否打到包里面，返回true就表示打到包里）来配置打包文件

1.3 分包之后每个业务包加载都会起一个新的react-native容器，不同的react-native容器需要通信这个我们在看如何通信

2. code push 热更新

9.  rn做过哪些优化
1. react的优化，减少组件刷新
2. 使用fast-image加载图片
3. 使用虚拟列表
4. 开启hermes引擎

10. rn 用的什么路由
react-native-router-flux（通过react-navigator实现，react-navigator是rn提供的路由，内部模拟了history的api，react-native-router-flux对react-navigator做了封装，让我们使用起来更加简便）

11. 混合开发的好处
1. 效率高，一套代码可以配多端, 节省成本
2. 更新方便，不用频繁发版（发到应用市场或者app store），可以热更新


12. react-router 原理

hash router 是根据改变路径上 hash 值,通过 hashchange 监听来切换页面, 不会导致网页重新刷新

browser router 通过 h5 history 中的 history.pushState() 来改变 url, 并且不会导致页面刷新, 然后通过监听自定义pushState事件判断页面切换，这个pushState事件是在重写pushState的时候创建并触发的

history.pushState(),就是在历史记录中又插入一条，不回会请求资源，不会发请求

history.replaceState()，只是对原有的历史记录做修改，不会请求了

使用 browswe router 需要在 nginx 处理 无论请求路径是什么都返回 单页应用的 index.html 文件, 这样做是为了手动刷新时不会返回 404

然后在接口请求时判断是否是 404 是 404 直接返回跳转 404 组件页面

在通过history.pushState 和 replaceState 改变路径的时候，popState事件监听不到，但是通过其他方式修改路径，popState就可以监听到，通过其他方式来将路径切换回通过pushState或者replaceState设置过state的路径，此时popState可以监听到，并且可以获取到之前设置的state

因为popstate监听不到 pushState和replaceState的调用，所以我们需要重写popstate和replaceState在重新的函数中定义自定义事件并触发，pushState和replaceState，这样我们我们就可以监听到pushState和replaceState调用的时候了

#### electron复习

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
1. 渲染进程给主进程发消息通过ipcRenderer 发消息，主进程通过ipcMain监听

渲染进程通过ipcRenderer.invoke 发送消息，并且可以返回一个peomise接收主进程的返回消息，主进程通过ipcMain.handle监听然后监听函数return的值返回给渲染进程的promise

2. 主进程通过win.webContents.send()给渲染进程发消息，渲染进程通过ipcRenderer进行监听

3. 主进程通过ipcMain.emit发消息， 主进程通过ipcMain.on监听

4. 渲染进程通过ipcRenderer.sendTo(win2.webContents.id)发消息， 然后渲染进程通过ipcRenderer.on监听

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

8. electron如何优化包的大小
以mac为例子，包体积分为两部分 Frameworks 和resources， 其中Frameworks是electron核心没有什么优化的空间， 之前有一个electron-boilerplate是精简的electron但是也有好几年不更新了，所以我们优化的点主要是在resources，它里边的app.asar就是我们前端的资源文件， 我们将第三方的文件按需加载，减少node_modules, 打包的时候设置compression：store 进行压缩， /** 压缩形式，默认normal;store打包最快，适合测试;maximum打包体积最小，适合生产模式 **/


9. 除了electron还有哪些可以开发桌面端
flutter3（使用dart语言） 、tauri（使用后端使用rust语言， 渲染页面使用系统自带的webview，webview可能存在兼容性问题，代码中出现bug（需要polyfills做处理），包更小（内部没有集成浏览器和node运行环境）、占内存小（因为electron中的浏览器和node运行环境都很占内存）、安全性（electron可以使用全部的node接口，而tauri中的rust需要显式的公开rust函数使用））

10. electron主进程和渲染进程如何共享数据
通过http共享， 还有通过redux状态管理

11. 渲染进程中如何调用桌面端原生方法
通过contextBridge.exposeInMainWorld('ynote', ynote); 将原生方法注册到渲染进程的window上

12. electron如何调用操作系统方法的
通过C++封装调用操作系统的APi，然后在node中通过ffi调用这个c++动态链接库，然后就可以在node中通过调用js的方式调用操作系统API了

#### node 复习
1. pm2负载均衡

pm2通过node cluster 集群模块


2. node创建进程， 子进程
创建子进程通过child_process 的fork方法可以创建

进行进程操作可以使用process

3. node如何处理内存泄漏
首先node进程分到的内存是rss包括俩部分，堆内存和堆外内存，堆内存就是我们node进程中分配的内存有固定的大小，内存占用超过这个大小就会导致进程崩溃，堆内存分为新生代内存和老生代内存，新生代内存是指存活时间较短的内存，老生代内存是指存活时间较长的内存，node中可以修改堆内存的最大值（包括老生代和新生代），因为堆内存有最大值，所以堆内存会导致内存泄漏，堆外内存不用担心这个问题，检查内存泄漏有两种方式，一个是npm 安装node-heapdump（hei de m pe），生成内存快照然后在浏览器memory中可以导入展示，快照中显示的leak部分就是内存泄漏部分，还有就是通过npm 安装 node-memwatch，然后在需要检查内存的泄漏的代码之前初始化 let hd = new Memwatch().heapDiff(),然后在代码执行完毕之后 执行 const diff = hd.end()获取内存变化，查看内存泄漏， 使用堆外内存不会导致内存泄漏奔溃，使用流或者buffer就会使用堆外内存，流也是通过buffer实现的，使用delete删除属性释放内存可能影响v8的优化（看看如何影响的），所以使用赋值null的形式释放内存比较好


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

4. Https网站中请求Http内容


5. 三次握手、四次挥手和为什么是三次和四次
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

6. response body相关的header
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

7. 强缓存、协商缓存

public：客户端和代理服务器都可以缓存，响应可以被中间任何一个节点缓存
private：这个是 Cache-Control 的默认取值，只有客户端可以缓存，中间节点不允许缓存
no-cache：表示不进行强缓存验证，而是用协商缓存来验证
no-store：所有内容都不会被缓存，既不使用强缓存，也不使用协商缓存
max-age：表示多久时间之后过期
no-transform: 告诉中间代理不要改变资源的格式


9. 浏览器获取缓存位置的优先级
9. http2 和 http3 有什么特点
  1.  二进制传输
   header 压缩
   多路复用  多路复用因为网络带宽和服务器资源的限制容易导致请求超时， 还有队头阻塞问题，就是同一个TCP连接中的请求一个丢包等待了，其他请求都得等待，不能传输数据了

   服务端推送

   2. http3 实现QUIC协议，依赖udp协议，使用0RTT 快速建立连接，并且QUIC也实现了丢包重发等，弥补了udp的缺点，
   并且实现多路复用同一个连接的多个请求数据传输是独立的，一个请求丢包了等待重发了，其他请求正常传输。

   3. 如何实现http2， 实现http2要做哪些事
   

10. 大文件传输方式
1. 分段传输
3. 通过设置 content-type : multipart/form-data, 进行二进制流传输, 然后在使用像 protocal buffer 对二进制进行压缩后在传输

流都是二进制的

11. csrf 和 xss
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

12. https 建立连接的过程

tcp三次握手 + 建立TLS连接（建立连接的时候时候非对称加密）完成连接，连接建立之后传输数据使用对称加密

因为非对称加密算法复杂效率低，在建立连接之后使用对称加密既可以保证效率，又可以增加安全性

对称加密就是加密和解密都用一个密钥， 非对称加密，加密用公钥，解密用私钥

SSL是TLS的前身，TLS是SSL3.1

13. 当连接不安全外网时，可能会遇到页面注入广告信息等，该怎么解决
1. 我们可以使用https协议
2. 可以meta禁用iframe <meta http-equiv="X-Frame-Options" content="DENY"> deny 不允许网页中的iframe加载页面， sameorigin 允许相同域名网页被iframe嵌套  
3. 获取页面所以iframe标签然后移除


禁止页面在iframe中加载
js禁用iframe if(top!=self)top.location=self.location;    

14. cdn 实现的原理
cdn 叫做内容分发网路

静态资源适合使用cdn优化，动态资源不适合，动态资源值的相同域名和path的不同参数获取的内容是不同的，比如api接口，数据库操作请求这些就是动态资源

cdn是通过源服务和很多个缓存服务器组成的

向cdn上传资源是上传到源服务器， 有两种更新方式的cdn服务器，一种是主动推动更新的（阿里云就支持主动推送更新，使用的是websorket），一种是使用回源更新

1. 用户通过域名请求资源，将域名发到本地dns，然后本地dns向dsn服务器获取对应域名的ip，dns服务器chame（chame就是在dns服务器上配置请求的域名执行另一个域名返回，如果返回的是cdn域名，本地dns就去请求这个cdn域名）到这个域名对应的域名是cdn域名，然后dns服务器把真实的cdn域名返回给本地dns，然后本地dns再去请求真实cdn域名，然后cdn返回给本地dns最优的缓存服务器ip（就是和请求位置最近的缓存服务器的ip），然后本地dns将这个ip返回给用户，然后用户请求这个ip去获取资源，获取资源的时候如果缓存服务器已经缓存过这个资源那就直接返回，如果没有缓存过，需要向源服务获取资源后在返回给用户（这个就是cdn回源，回到源服务器获取数据，回源是cdn中更新缓存服务器最常用的策略使）

2. 为什么cdn不支持websocket协议，主要是受监管要求不能支持，有人用cdn的ws翻墙， 还有一个原因就是成本高，websocket要一直比保持长连接， 还有就是websorket是动态数据不能缓存，每次请求都需要回源

3. 只有缓存服务器没有数据、数据过期，或者这个数据不被允许缓存才会回源

4. cdn缓存服务器通过回源方式获取资源的时候都是通过http协议， cdn自定义缓存策略，也可以使用源服务返回的缓存策略（就是强缓存策略），如果不用前两个的话，cdn也会有一个默认缓存规则，比如： 缓存200-400 状态码的时间默认是8天 301默认是两个小时 302默认是20分钟 ，400、404、416、500、502、504状态码3s，其他4XX、5XX状态码不缓存，浏览器获取cdn数据后，会进行强缓存， cache-control， expries，不同cdn的默认缓存机制是不同的

5. 回源的cdn服务器在源服务器更新了数据之后，可以调用缓存刷新接口更新所有缓存服务器的缓存时间，让它过期，再次获取这个资源的时候缓存服务器需要从源服务器重新获取

6. cdn如何判断是否缓存是通过url，所以cdn只适合get请求

7. 如何计算使用那个缓存服务器的IP：CDN根据用户的地理位置分配距离最近的节点

15. ssr渲染使用流传输和正常字符串传输，也面试看到的效果有什么区别，使用流传输有什么好吃

16. 不用http2 和 http3 如何处理并发， 预加载可以用吗


#### 浏览器

1. 浏览器渲染过程
2. 重排重绘
3. 垃圾回收机制
4. 浏览器如何离线操作，service worker， 使用navigator.serviceWorker 操作
5. web worker

通过let obj = new Worker(js文件路径)创建work线程实例， 通过obj.on('message',() => {}), 监听work进程消息， 通过obj.postMessage('1111')给worker进程发消息，worker进程通过全局对象self.postMessage给主进程发消息，通过self.on('message',() => {})接收主进程的消息

work进程中获取不到window、document， 只能获取自己的全局对象 WorkerGlobalScope， WorkerGlobalScope 中包含window中的部分内容，  WorkerGlobalScope 中包含的对象self，self是work线程的顶级对象

6. 地址栏输入url的全过程

dns、 tcp链接、请求资源、浏览器渲染过程、js执行

7. 浏览器页签之前如何通信

#### 小程序
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

7. 骨架屏如何实现
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

 #### 小程序如何检查代码内的性能

#### Taro 

taro1、2都是编译时框架，将taro 代码编译成小程序代码，使用babel

这里就会有问题，
1. 不能100%支持jsx语法，之前taro只是穷举适配可能的jsx这个工作很繁重
2. 不支持source-map，taro对源码进行一系列AST转换操作之后就不能生成source-map了
3. 由于编译只支持了react框架，支持其他框架增加了维护成本和工作量


taro3是运行时框架， 在小程序端实现是一个模拟的浏览器环境，实现了bom、dom api等，实现dom是根据小程序中<template>可以引用其他的<template>的特性，把taro的dom树渲染成<template>相互引用的形式实现在小程序端渲染，
我们的写的react和vue代码正常编译为js代码，然后在运行时调用taro运行时的api实现不同框架都可以开发小程序，taro实现taro-react 是小程序版本的react-dom，就是将react根页面和taro用小程序api实现的dom实例绑定在一下，并处理react中的事件

taro和rn的区别

1. taro是运行时框架，rn最后要转原生组件
2. taro可以适配多个UI框架，rn只能使用react
3. rn和taro都是跨平台的，taro可以开发h5、小程序、app，rn只能开发app

微信小程序和rn的区别
1. 首先不是一个纬度的， 小程序是微信这个app中集成的，而rn是用来开发app的
2. 小程序有自己的语法，rn不能兼容，所以rn也不能开发小程序


taro3和适配实现支付宝小程序或者痘印本身较小程序的

taro和rn相同点

都使用像View 这种跨平台组件

之前工作中的用到东西的深度



#### 前端页面的优化
主要是做了一些首屏性能优化和一些非首屏优化


1. 首先根据 lightHouse 进行性能分析，然后进行对应的性能优化

2. 有几个性能指标 Fp fcp lcp tti，通过查看这几个指标发现，影响首屏渲染的问题是包过大，导致加载时间过长，导致首屏在 900毫秒左右
然后通过webpack-bundle-analyzer分析包的大小，然后通过dllplugin进行预编译，固定版本，还有通过splitchunks进行分包，减小了首屏加载包的大小
减小了加载时间，还有react组件可以懒加载的进行懒加载，将首屏缩短为 300 毫秒

3. 还有图片过大加载时间长，对图片进行压缩，并上传到 cdn， 使用webp图片，图片懒加载

4. 接口请求时间长，服务端帮忙优化接口

5. 请求开启 gzip 压缩

6. DNS预解析
link标签的rel属性设置dns-prefetch，提前获取域名对应的IP地址

7. 使用缓存
开启强缓存

8. 其他的非首屏优化有react性能优化，和performance记录之后的代码性能点优化

9. js预加载如何做的： 通过 <link rel="prefetch" as="script" href="./b.js"> 或者 <link rel="preload" as="script" href="./b.js">，prefetch和preload都是只加载不执行，preload是高优先级加载执行到就加载，prefetch是低优先级加载等其他高优先级加载完毕在加载，
正常加载进行着预加载的文件的，如果没有加载完，等预加载完毕之后在加载，如果预加载完毕了，如果是通过preload预加载的，再次正常加载就不会发请求了，如果是通过prefetch预加载的，那会发一个请求，但是不会发出去，会直接走强缓存（prefetch cache）， prefetch和preload都不会阻止dom解析

10. css 预请求也是通过<link rel="prefetch" as="style" href="./b.css">或者<link rel="preload" as="style" href="./b.css">

11. 图片的预加载也是可以通过在登录页let image = new Image() image.src = 'http://aaaa.jpg'或者<link rel="prefetch" as="image" href="./b.jpg">、<link rel="preload" as="image" href="./b.jpg">实现

DOMContentLoaded 是dom解析完毕生成dom树了， load页面上全部资源都加载完毕，解析完毕

12. webp图片如何实现

13. 骨架屏如何实现


#### 缓存总结
请求接口这个过程和其他非服务器资源的过程
1. 数据库缓存（使用redis，用户请求的时候请求到redis，如果没有需要请求的数据的话，就去数据库拉取，然后返回给用户并把数据缓存在redis上，如果数据库数据更新了，在数据库和redis中间建立消息订阅，通知redis将缓存失效，下次用户在请求重新去数据库拉取， redis是一个内存数据库，数据是存在内存中的，所以请求才那么快，不过redis会定期存到硬盘中）

2. 应用服务器（tomcat，可以创建web容器，执行java代码）

3. 反向代理服务器缓存（nginx是反向代理服务器，可以代理转发、负载均衡、缓存请求数据（js文件、css文件），接口数据这种经常变化的就不缓存在nginx代理服务器了，nginx设置自动清除缓存的时间默认是10s，nginx也可以选择缓存哪些数据， 通过proxy_no_cache设置是否开启缓存，不为空或者不为0时不开启缓存，我们正常是nginx代理请求别的服务器上的js或者css或图片的时候才缓存，正常先缓存在内存中，内存中缓存不下就缓存到指定的缓存文件中就是硬盘中）

4. 浏览器缓存：包括浏览本地存储（cookie（cookie可以存在内存和磁盘中，设置了expires的cookie存在磁盘中，没有设置的存在内存中，称为会话cookie，在页签的页面关闭后cookie就会消失）、sessionStrrage（存在内存中，当这个一个会话就是这个页面关闭后就会消失）、localStrorage（存在磁盘中）、indexDB（存在磁盘中））、浏览器其他缓存（http缓存（强缓存、协商缓存）、servise worker、push cache、prefetch cache）

5. 从缓存优先级来说分为 servise worker（缓存的内容存在磁盘中、必须是https协议，但是本地可以使用http://localhost或者http://127.0.0.1, sevice work是在js主线程之外另外开辟的一个js线程这个js线程是全异步, 注册这个sevice work的线程被关闭了，这个sevice线程还是存在的，sevice work不支持window、document localStrong这些同步的api）
> memory cache（请求下来的js 脚本、图片、css样式、不同的浏览器都有自己的设置内存缓存的策略，把比较小的放在内存中，都是通过强缓存协商缓存获取的） 
> disk cache 
> push cache

6. 从缓存的存储位置来说就是两种内存或者磁盘，存储在磁盘的缓存有：servise worker、强缓存和协商缓存、prefetch cache、localStrorage、cookie
存在内存中缓存有：cookie（没有设置expires，存在会话内存中）、push cache（存在session内存中）、 memory cache（请求下来的js 脚本、图片、css样式、不同的浏览器都有自己的设置内存缓存的策略，把比较小的放在内存中，都是通过强缓存协商缓存获取的） 

请求cdn资源数据缓存

1. cdn缓存

2. 浏览器缓存

3. indexdB的使用（非关系型数据库）
const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
  // 错误处理
};
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // 创建一个对象存储来存储我们客户的相关信息，我们将“ssn”作为键路径
  // 因为 ssn 可以保证是不重复的——或至少在启动项目的会议上我们是这样被告知的。
  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // 创建一个索引以通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引。
  objectStore.createIndex("name", "name", { unique: false });

  // 使用邮箱建立索引，我们想确保客户的邮箱不会重复，所以我们使用 unique 索引。
  objectStore.createIndex("email", "email", { unique: true });

  // 使用事务的 oncomplete 事件确保在插入数据前对象存储已经创建完毕。
  objectStore.transaction.oncomplete = (event) => {
    // 将数据保存到新创建的对象存储中。
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");
    customerData.forEach((customer) => {
      customerObjectStore.add(customer);
    });
  };
};

10. 有哪些造成内存泄漏的方式、如何检测内存泄漏、如何优化内存泄漏
1. 被遗忘的全局变量
2. 被遗忘的定时器
3. 不被使用的闭包
4. 被遗忘的dom结构存储

测试是否有内存泄漏：performance.monitor,实时看内存变化，呈现成梯度内存，手动触发垃圾回收之后，还没有变化的就说明出现内存泄漏

最终确定内存泄漏的点还是需要通过memory生成内存快照比对，确定内存泄漏位置解决问题，进一步搞懂定位内存泄漏memory的使用

共享闭包概念： 外部函数里定义的所有函数共享一个闭包，也就是 b 函数使用外部函数 a 变量，即使 c 函数没使用，但 c 函数仍旧会存储 a 变量，这就叫共享闭包

Shallow Size 表示对象自己真是占用内存大小
Retained Size 表示对象自己真实大小和引用的对象大小的总和

12. 什么情况下内存不会被回收

13. 对象在什么时候可以被定义为垃圾


14. h5页面使用的测试工具

webpageTest在线的h5测试工具，然后分析测试的

#### webpack 构建优化

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
8.  tree shaking为什么必须用esmodule

因为esmodule的编译时加载，webpack在编译的时候就可以判断哪些模块没有被使用就可以shaking掉

9. loader和plugin的实现方式

loader 本质就是一个函数，接收文件内容处理之后再返回处理后的结果

plugin就是一个包含apply方法的类，可以在apply函数中直接执行一些逻辑， 或者通过它的参数compiler监听生命周期去执行一些逻辑

10. antd如何实现按需加载

通过babelrc 中配置插件babel-plugin-import，在构建时候实现按需加载只会把通过import引用的Botton等组件打到包中

还有就是通过antd/Botton这种直接制定了路径的webpack就会按照路径打包只会打包button，这是正常的

11. webpack 热更新是如何实现的

12. webpack splitchunks 如何实现的


#### vite 理解

开发环境
1. vite 开发环境启动的时候会把代码进行分类，分为依赖和源码两类，通过esbuild进行预构建，就是将不变的依赖包和不变的项目代码，将不是esmole模块化的都转成esmodule模块化放在node_modules/.vite下缓存起来，并且设置很长的强缓存时间，这里如果没有变化那就直接不变了，以后直接引用，
将其他业务代码单独放置，对初始化引用的文件进行esmodule 转化放到html中，利用浏览器支持的Native esmodule能力，加载入口文件，入口文件中的import 在浏览器中可以直接被使用，入口文件需要被<script type='module' src='入口文件'>加载，其他的文件vite启动的时候是不做esmodule转化操作的，然后只有在后面执行到了这个文件才会按需加载，然后vite服务器对这个请求进行拦截，对请求的文件进行处理都处理成esmodule格式的然后在返回，文件中引用node_modules的包会被在文件中处理成/@modules开头的引用（ 比如import vue from '/@/modules/vue.js'，这个是使用ES Module Lexer实现的）, 所以在启动的时候只进行了预处理和初始化加载js文件的转化就启动服务了，所以vite启动很快，webpack为啥慢，以为webpack会把所有文件都编译完在起服务所以很慢

2. vite开发环境的时候支持热更新

3. vite开发环境的时候es6不转成es5

4. 因为需要预构建， 所以首次启动慢一点，后面不需要编译，就快了

生产环境

1. vite生产环境的时候使用rollup构建，保证代码打包后的模块化，所以浏览器都支持、es6转成es5
2. 生产环境使用rollup，是因为esbuild 对css和代码分割不友好

vite4的优化

1. vite4新增了swc，swc是rust写的替代babel的库，vite4编译react可以选择@vitejs/plugin-react，@vitejs/plugin-react-swc

2. vite4中正式环境构建升级到rollup3

#### esbuild的理解 
esbuild为什么快

1. 使用go实现，语言更快

2. 支持多线程

3. 做的事少

#### 工程化模块化

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

对前端工程化的理解
我对前端工程化的理解就是

给我们的开发提效的，提高我们开发体验

比如 js模块化、css module、组件化、前端规范化、自动化

4. AST 什么意思， 知道recast吗
AST是抽象语法树， babel就是根据AST将es6转为es5

recast是词法分析库，可以将js代码转成语法树，并生成sourcemap

5. 什么是依赖树

我理解就是项目中不同模块的依赖关系

6. pnpm和npm有什么不同

#### 异常监控
1. try {} catch {} 运行
2. promise.catch
2. img.onerror script.onerror 和 window.onerror只能获取到代码错误，window.addEventLister('error')可以获取到请求加载错误和代码错误
3. sentry 异常上报，sentry因为可以上传sourcemap，所以可以定位源码
4. window.addEventListener("unhandledrejection", (event) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
}); 当promise的reject没有被catch处理的时候会触发


#### 做过的比较印象深刻的项目

有道云笔记搜索在前端做的原因： 有道云笔记桌面端搜索重构，因为有道云笔记这种桌面端应用，要支持离线编辑，所以这个搜索是在我们本地做的，这样离线情况下也可以支持

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

#### fts5 如何实现的，使用fts5需要做什么准备，fts5和其他模块有什么不同


#### 如何实现一篇笔记的搜索

#### 有道云笔记的同步机制，如何处理冲突笔记

#### 实现高亮用的什么方案，还有哪些方案

#### 协同算法是什么，什么机制



#### electron更新重构

没重构之前的更新，更新非常的简陋就是手动触发下载一个安装包，然后需要用户手动安装替换之前的安装包

所以我们需要提升用户体验，可以让用户自动更新，不需要手动安装

我正对这个问题进行调用，发现electron中提供了更新方式，就是通过electron-updater实现更新

找到了方案，通过electron-updater，可以对更新的各个阶段进行处理，然后给出不同的提示文案，下载中、下载完成等，

最后重构了更新流程，实现了检查更新、安装后自动安装这个更新流程

提高了用户体验

并且增加了增量更新，添加stagingPercentage字段，字段的取值是0-100

#### nginx

nginx是网关，可以转发、负载均衡

#### docker
docker有镜像，可以通过镜像创建容器
#### jenkins
可以发布项目

#### 阿里云服务器申请
阿里云是一个云服务器，可以在它上边部署东西

### 建站项目总结

#### 为什么要做这个建站，想到达什么目的

网易外贸通是一个sass系统，提供了一些功能，像发营销邮件、做数据整理分析、建站等

建站功能是在外贸通中的一个功能，用户有快速建站的诉求，为了满足用户需求，增加外贸通的销售量，所以开发了建站功能

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

4. 建站在第一版本之后又扩展了哪些功能

6. 如何控制模块版本的

7. 编辑器内如何对应组件的

8. 对单独模块属性修改是如何实现的


#### 学习了什么有什么理解

最近学了xstate

arcGIS是地理相关的软件，开发地图的时候可能会用到

#### 带人是如何带人的

首先了解小伙伴的特点和经验，然后在分配任务的结合这些去分配，在工作中帮助它们解决建立好的习惯， 包括设计文档的编写共同讨论确定合理的开发方案，对需求的拆分，提高排期的准确率，带头养成分享的习惯，共同成长，营造良好的工作氛围，增强团队的凝聚力，增强团队的战斗力

#### 带人如何分配自己和带的人工作的

#### 给产品提过哪些建议或者自己发现过哪些问题点对用户改善很大， 自己发现过什么小的点但是解决了大问题
就是之前的有道云笔记的更新没做自动更新，每次还需要下载新的包然后在手动安装替换，我也问了一些用户的反馈感觉这个体验不好，所有我就可产品提了这个建议，然后最后也是由我实现了有道云笔记的自动更新，最后也回访了用户，用户也表示自动更新功能体验很好

#### 已有的准备的在深入点，在准备一下简历中的细节， 简历在写的牛逼一点，更突出点做的东西重要

#### 职业规划

如果我们能加入咱们公司，首先短期内，我要熟悉开发流程、和业务逻辑上手工作，并继续了解更多的业务逻辑，让自己可以独挡一面，中期的计划就是有时间继续拓展的知识面，和自己的技术深入，为公司更好的服务，长期的计划就是在我对公司业务很好的掌握之后如果有机会带人我也回抓住这个机会, 通过自己的努力公司在有晋升机会的时候我要抓住机会，去争取晋升

#### 如何跨部门沟通，解决问题
首先我感觉跨部门的沟通这种，不能用一种索取的态度去沟通， 因为每个人都有自己的okr，如果这件事和他不相关的话别人内心里可能也不是想帮忙的，所以要以一个双赢的态度去沟通，要想着能给对方也带来什么收获，比如技术影响力或者一次很好的技术实践，这样可能让对方也是内心有这个意向的，还有就是在平时营造比较好的关系，比如有机会加上对方的好友，有时间一起打打游戏，私下拉近关系，都说熟人好办事嘛，这样在有求于人的时候别人可能也更愿意帮忙，在就是找人帮忙的时候顺道带一杯奶茶咖啡之类的，表现出自己诚意，这样别人有的时候也不好太意思拒绝，我感觉这样可以比较正向的进行跨部门沟通协作


#### 通过什么方式学习

1. 公众号文章（前端早读课、奇舞精选），最近看了turborepo这个项目管理工具，它比之前的lerna更快，因为turborepo是并行构建，lerna是串行构建，turborepo可以对构建结果进行缓存，只构建最新的修改，之前没有修改的构建可以复用，实现了增量构建，turborepo可以生成性能文件，倒入浏览器中，看看具体的性能损耗，turborepo有一个核心概念pipeline（管道），turborepo就是通过管道来处理各个任务和它们之间的依赖关系的，turborepo通过显示的声明优化任务的执行，充分利用多核CPU，之前的lerna它的执行方式可能导致CPU核心被闲置，就会影响性能，
还有最近也学到了新的构建工具turbopack他的速度号称比vite快10倍，因为turbopack是使用rust开发的，rust比js性能高，使用swc替代了babel，swc也是使用rust开发的性能更好，turbopack使用了缓存增量构建提高性能

2. 前端社区网站掘金
3. 看书（你不知道的javascript、深入浅出nodejs）
4. 然后通过看一下文章感觉不够全面的时候，想进行一些实践的时候，我有的时候也会看一些课程，像慕课网上的一些课程，比如之前我对react ssr的原理和好奇，想自己实践一下，感觉看一些文章不够全面，我当时就找了一个react ssr的课程，自己跟着实现了一个原生的react ssr项目，包括阿里云的申请、docker配置、nginx、还有jenkins发布整个这套流程自己跑了一遍，感觉收获还是很大的，然后把我这些经验也都总结到了我的github上，这样等需要用到也避免走弯路


#### 如何技术选型， 怎么考虑
1. 首先还是从业务出发，看业务诉求，比如当时在开发小程序的时候需要兼容h5，需要当时就考虑多平台适配的这种方案

2. 还有要考虑团队的技术特点，也是开发小程序技术选型时，因为团队是react技术栈，所以在uniapp和taro中选择了taro

3. 在有就是考虑选型的社区的活跃程度，这样在出现问题的时候也比较容易解决

4. 还有就是可控性，这个我感觉也比较重要，比如之前遇到过项目使用Umi构建，umi对于开发人员来说就是黑盒的，做一些优化只能依赖于文档，并且文档还不是很全，就是十分费劲，所以umi对于我们来说就不可控，导致开发过程中遇到问题就不容易被解决

5. 还有稳定性，比如用到一些库，在升级的时候要向下兼容，保证稳定

#### 网站重构如何设计
1. 首先要了解网站的现状，包括业务功能、业务代码
2. 确定需要改进的问题，包括UI展示、性能、代码扩展困难
3. 根据重构的成本、开发的难度、紧急程度我们一般把要重构的内容分为几个模块确定重构的方式，一般都是业务代码正常开发，然后找一个相对简单且重要的模块，拉新的分支进行重构，比如登录注册作为一部分，重构完成之后，进行测试，期间有更改在重构的分支也进行同步，这样测试完重构的部分之后，合回主干，然后再继续重构下一个模块

#### 为啥离开用友

当时感觉处在一个舒适区，想离开舒适区突破一下自己

#### 对于新工作会看重哪些方面呢
我可能会比较看重一是团队的氛围（愉悦、顺畅）、还有一个就是我承担的角色，需要负责的工作（我希望为公司创造更多的价值）

#### 如何设计开发一个公共组件和一个组件库




