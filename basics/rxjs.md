### rxjs概念理解
rxjs 就是创建响应式对象和处理响应式对象的库
### rxjs常用方法学习

```
import { 
  // rxjs 响应式对象的类型
  Subscription,
  // 将普通数据变成rxjs 响应式对象, 可以接收多个参数每一项都是对象中的一项
  of,
  // 将普通数据变成rxjs 响应式对象，只接收一个数组参数， 数组中每一项都是对象中的一项
  from, 
  // 类型数组的map
  map, 
  // 类型数据的concatAll
  concatAll,
  // 返回出rxjs 响应式对象的每个值，但不会处理这个值
  tap
} from 'rxjs';

// subscribe 监听rxjs 响应式对象
```

### Subject，BehaviorSubject，AsyncSubject，ReplaySubject 区别

#### 相同点

1. 都是多播，就是创建一个实例可以被共享， 可以被共用多次监听，可以共享数据（这就是多播的意思）
hot observable 不管被不被监听都发送值，hot observable都是多播的

2. 即是消费者也是生产者， 都是通过new 的方式创建一个生产者实例，通过next添加数据， 然后生产者实例调用asObservable方法可以转化成消费者实例，可以通过subscribe监听数据变化，对生产者添加数据，消费者实例就可以监听到

#### 不同的

1. Subject 只能在更新数据的时候，给已经监听的传递数据，更新之后注册的监听接收不到数据

2. BehaviorSubject可以 new BehaviorSubject(初始值)的时候需要设置一个初始值（必须要的），一开始监听者就可以接收到值，然后BehaviorSubject生产者还会缓存最新的值，在更新之后才注册的监听，会把这个最新值传给更新之后才注册的监听

3. AsyncSubject 可以多次更新数据，但是只有当生产者调用complete的时候，消费者才能监听到最后更新的那个数据，complete执行之后才注册的监听也能监听到那个数据，complete只能执行一次，一个生产者实例

4. ReplaySubject 可以缓存多个值，在new ReplaySubject(3)（缓存个数）设置缓存最近几个更新的值，
在更新完之后注册的监听可以监听到缓存的几个值

#### 单播

1. 单播的意思就是每次消费者实例被监听，都会产生一个新的实例，将所有的值重新给新的监听者传一遍，每次监听都是独立的

2. cold observable 就是只有开始监听的时候才开始发送值，cold observable 都是单播的