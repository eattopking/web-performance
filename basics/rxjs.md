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
  tap, 
  // 创建一个rxjs 响应式对象的类, 通过实例的next方法向rxjs 响应式对象中插入值
  ReplaySubject 
} from 'rxjs';

// subscribe 监听rxjs 响应式对象
```