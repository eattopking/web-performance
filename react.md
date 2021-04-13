## hooks 总结

### react fabe 架构学习总结


### react 组件的性能检测和代码中的性能上报

react 中渲染让的含义： 渲染就是触发render， 然后进行render中新旧结果的比较， 得出比较结果

react 中提交（commit）的含义： 提交就是根据渲染得出的render差异，更新虚拟dom（但是没有更新真实的dom），
更新完虚拟dom会触发componentDidMount或componentDidUpdate生命周期

在react代码中的Profiler代码默认会在开发模式构建后被开启，在生产模式构建后被禁用， 我们也可以通过特殊的配置让我们在生产模式构建后的代码中依然可以实现Profiler的性能检测上报

[profiler代码在生产模式构建后依然可以使用的配置](https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977)


在生产模式构建后被禁用的Profiler， 是指代码中的Profiler组件代码， 而不是chrome的react插件中的profiler录制

#### 在chrome浏览器中分析react组件性能

1. chrome中通过安装react插件，通过其中profiler（类似于chrome中的performance的录制）进行页面操作时的，组件提交的性能录制来分析react的性能

[profiler的具体使用教程](https://react.docschina.org/blog/2018/09/10/introducing-the-react-profiler.html)

2. profiler的性能分析就是以组件为单位(时间就是组件的虚拟dom更新时间)， 性能标准就是每次顶层和它子组件的渲染提交时间(虚拟dom更新时间)，每次提交可能顶层没有重新渲染， 所有是灰色， 只有顶层的子组件进行了渲染提交然后展示黄色等颜色，可以查看提交耗费的时间， 然后比较性能， 和选中后的组件的state和props可以根据切换提交来观察，不同提交的state和props的变化

![react profiler](./images/profiler.png)

#### 在组件中上报吗react的提交时间等性能

通过在在react实例中获取 unstable_Profiler 这个组件， 然后将组件改名为Profiler，然后将这个组件包裹在想监听的组件外边，
然后在Profiler的onRender事件回调中获取各种性能信息， 用于上报， 还必须给Profiler组件设置一个id， 用于区分不同的Profiler

### React 严格模式

通过过在react实例中获取StaticMode组件， 然后包裹在对应组件的外部， 实现对组件的严格模式检查， 如果出现不符合的， 会在控制台报出警告

严格模式会在webpack 开发模式构建后被开启， 会在webpack 生产模式构建被关闭

