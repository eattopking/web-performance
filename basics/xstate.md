### xstate react应用实践总结

#### xstate主要的几个概念

##### 状态(state)

guards设置的对应的是cond用到的函数
##### event(事件)
改变状态需要通过事件触发

##### actions(动作，就是进入状态、改变状态、离开状态这个过程的事件监听)
action也是状态的生命周期

##### activities(活动，就是进入到这个状态就开始事件监听，离开这个状态就是移除的事件监听)
activities就是状态的生命周期和react的useEffect传空数组是一个效果

##### context(就是数据)

1. 处理上context 数据的合并用assign，assign的结果可以直接赋值给actions

#### actor

actor就是在context中存储的状态基

#### sevices
sevices就是在状态中去进行一步操作然后，得到结果





