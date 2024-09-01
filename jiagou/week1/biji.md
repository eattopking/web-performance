
### 如何写技术方案

一. 技术方案达到的效果

整体效果：
考虑全面、流程完整、业务闭环

具体效果：
1. 列出所有需求要做的功能点、依赖项、有需要调研的功能点要标记调研，并进行调研确认，及时更新调研进度
2. 画出实现方案的整体流程图，包含核心实现方案
3. 确定好所有依赖后端接口的地址，请求参数字段类型，响应参数字段
4. 具体功能进行的实现方式，写出具体方案和代码

二. 项目闭环流程
1. 系统后台管理（回滚、快速下线）
2. 数据统计（支持分渠道统计）
3. h5页面

三. 架构设计
1.  复用原则（例如创建公共代码库）、数据数据统一存储（编辑器、h5ssr、管理后台使用统一的数据库）
2. 不为了设计而设计，通过最简单的方式实现业务需求，例如ssr不适合用在toB的项目中，因为ssr的开发和调试成本更高，但是toB对于性能的要求没有那么极致，ssr到达极致性能特性就不适用toB，所以toB就使用常规的CSR就可以，对于性能要求非常高的toC h5就非常适合使用ssr

四、
统计服务具备的功能
1. 接收打点请求
2. 分析打点数据
3. 提供openApi，用户调用openApi可以获取到打点分析结果

pv/uv是网站级别的统计

五、数据结构设计
1. 模拟组件的数据结构
使用vnode定义被存储的组件数据结构，vnode就是使用对象数据表示一个虚拟dom
```
vnode类的源码

export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>, 
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```
六、前端技术文档很重要

几类图：流程图、架构图、状态图等



