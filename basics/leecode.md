解题步骤， 先找到解决题目的规律，然后看看用什么手段实现这个规律

### 算法练习

1. 斐波那契数列

```
规律就是 n - 1 + n - 2 = n, 并且前两个是1， 背诵的诀窍


递归思路， 确定好退出条件， 第一个和第二个都是为 1， 然后就是构造出前两个加前一个数的这种规律， 然后就让他自己算
// 低性能递归版本
function fibonacci(n) {
    if (n <= 2) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
};

斐波那契数，指的是这样一个数列 1、2、3、5、8、13、21 ,求第n个返回啥

function fib(n) {
    if (n < 1) {
        return null;
    }

    if (n === 1) {
        return 1;
    }

    if (n === 2) {
        return 2;
    }

    return fib(n-1) + fib(n-2);
}
```

### 代码实现

2. 实现数组的flat 方法

递归+ concat + reduce + 递归
function flat(arr, num) {
   return num > 0 ? arr.reduce((result, current) => {
      return result.concat(Array.isArray(current) ? flat(current, num - 1) : current)
   }, []) : arr;
 }


 flat 升级

 // 编写一个程序将数组、对象扁平化并去重（值相同即为重复），最终得到一个升序的数组（不允许使用 Array.flat()）。
// // 输入以下值
var arr = [15, [1, new Number(10), 2], { a: 3, b: [4, 7, 8] }, [6, 7, 8, 9, [11, 12, [12, 13, [14]]]]]
// // 返回下面的值
// [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]


function flat(arr) {
  const isObj = (obj) => Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
  const _flat = (arr) => {
    return arr.reduce((res, cur) => {
      const list = Array.isArray(cur) ? flat(cur) : isObj(cur) ? flat(Object.values(cur)) : cur.valueOf();
      return res.concat(list);
    }, [])
  }

  let result = _flat(arr);

  result = [...new Set(result)];

  return result.sort((a, b) => a - b);
}

3. 给定一个二叉树和一个给定值，要求找到和为给定值的路径

4. 手写_instanceof

function _instanceof(left, right) {
  let proto = left.__proto__;
  const prototype = right.prototype;

  while(true) {
    if (proto === prototype) {
      return true;
    }

    if (proto === null) {
      return false;
    }
    proto = left.__proto__;
  }
}

5. 手写valueof和toString的面试题

数值隐式转化调用valueof ，字符隐式转化调用toString

6. 截流防抖
截流 一定时间内只能执行一次 Date.now() ,闭包
实现要点: 在外层函数缓存旧的时间，在内层函数实时获取当前时间， 取差值比较是否允许函数执行

function throttle(func, time) {
    let prev = null;
    return (...rest) => {
        let current = Date.now();
        if (!prev || current - prev > time) {
            prev = current;
            func(...rest)
        }
    }
}

防抖 每次执行都取消上一次执行 setTimeout , 闭包
主要思路： 就是在外层函数中缓存一个存储 timerid 的变量， 然后在返回的函数中刚开始就是 clearInterval(timerid), 确保调用时就把没有执行的定时器清除掉
function debounce(func, time) {
    let timmer = null
    return (...rest) => {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            func(...rest);
        }, time)
    }
}

7. bind、apply、call实现

作为传入的this的方法执行的时候内部this就是传入的this

call实现: 使用的原理就是函数当作为谁属性调用的时候，这个函数的 this 指向就是谁， 还有只有 null 和 undefined == null， 内置构造函数创建实例， 用不用 new 都可以， Object 类似于 Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf 方法是获取对象的原始值的方法, 对象的 toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的

诀窍： 就是函数作为一个对象的方法调用时，函数内部 this 指向就是这个对象

Function.prototype.call = function(newThis, ...test) {
    if (newThis === null || newThis === undefiend) {
        return newThis(...test);
    }
    
    newThis = Object(newThis);
    newThis.fn = this;
    const result = newThis.fn(...test);
    delete newThis.fn;
    return result;
}


apply 实现: 使用的原理就是函数当作为谁属性调用的时候，这个函数的 this 指向就是谁， 还有只有 null 和 undefined == null， 内置构造函数创建实例， 用不用 new 都可以， Object 类似于 Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf 方法是获取对象的原始值的方法, 对象的 toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的

诀窍： 就是函数作为一个对象的方法调用时，函数内部 this 指向就是这个对象


Function.prototype.apply = function(newThis, arr) {
    if (newThis === undefiend || newThis === null) {
        return this(...arr);
    }
    newThis = Object(newThis);
    newThis.fn = this;
    const result = newThis.fn(...rest);
    delete newThis.fn;
    return result;
}

bind 实现: 使用的原理就是函数当作为谁属性调用的时候，这个函数的 this 指向就是谁， 还有只有 null 和 undefined == null， 内置构造函数创建实例， 用不用 new 都可以， Object 类似于 Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf 方法是获取对象的原始值的方法, 对象的 toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的, 还是使用了闭包的原理缓存 rest

诀窍： 就是函数作为一个对象的方法调用时，函数内部 this 指向就是这个对象

Function.prototype.bind = function (newThis, ...rest) {
    return (...params) => {
        if (newThis == null) {
            return this(...[...rest, ...params]);
        }
        const currentThis = Object(newThis);
        currentThis.fun = this;
        const result = currentThis.fun(...[...rest, ...params]);
        delete currentThis.fun;
        return result;
    }
}





8. 失败重连
promise.catch的时候重复调用方法，有一个数，重连一次就--，到0的时候直接返回error结果， 最终就是返回一个promise

错误重连的原理就是返回一个promise实例，创建一个递归函数，然后初始化调用， fulfilled状态直接resolve状态返回，如果rejected状态直接setTimeout递归延时执行， 然后减去一个次数， 如果次数到0，
直接还是rejected，直接就reject 返回状态 返回err值

function wrongConnect(fun, times, delay) {
    return new Promise((resolve, reject) => {
        function callback() {
           Promise.resolve(fun()).then(resolve).catch((err) => {
               if (times > 0) {
                   times--;
                   setTimeout(callback, delay);
                   return;
               }
               reject(err);
           })
        }

        callback();
    });
}



promise.resolve 将函数执行结果统一转换一下， 写一个函数， 在下面执行， 然后在catch 中进行settimeout 递归调用定义的函数， 在catch 中判断次数， 然后没有次数了返回失败状态

9. promise.all promise.allSettled
最终返回一个promise，内部第一个数组缓存结果， allSettled结果有特殊结构，{value: 11, status: ''};

Promise.all 原理就是 Promise 只能改变一次状态， 然后定义一个变量缓存 resolve 的次数， 用于和数组的长度比较，
   当全部 promise 都变成 resolve 时候就将最外层的 promise 变为 fulfilled 状态返回数组， 如果有 promise 变成 reject 状态，直接返回这个 reject 状态的值，设置一个数组的 index 值， 前面没有值得索引会用空值占位

Promise.all = function(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('params must array');
    }

    let result = []
    let count = 0;

    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length; i++) {
            const promise = Promise.resolve(arr[i]);
            promise.then((data) => {
                count++;
                result[i] = data;
                if (count === arr.length) {
                    resolve(result);
                }
            }).
            catch((error) => {
                reject(error);
            });
        }
    })
}

10. new 实现
通过Object.create(fun.prototype)创建一个空对象，然后把fun作为空对象的方法调用，主意返回值，如果函数返回了函数或者对象直接就返回，如果没有返回，那就是直接返回之前创建的空对象

new 实现的原理： 就是自定义一个 new 函数， 然后参数是我们的构造函数和构造函数的参数， 创建一个最后返回的实例， 并将构造函数的原型对象设置给实例的原型，然后使用 call 调用 new 函数， 并将 this 指向设置为我们创建的实例， 函数的参数也设置为我们传入的参数，
再有就是判断一下构造函数是否返回对象， 如果返回对象 new 函数直接返回这个对象， 我们没有返回对象， new 函数就返回我们创建的那个实例

诀窍： new 就是先创建一个空对象，然后被这个对象添加属性

function customNew(fun, ...rest) {
const that = Object.create(fun.prototype);

    const result = fun.apply(that, rest);

    const type = typeof result;

    if ((type === 'object' && result !== null) || type === 'function') {
        return result
    }
    return that;

}

11. 观察者模式实现

解题思路： 观察者模式就是发布订阅模式, 就是我们js中事件的实现原理， 我们要自己实现发布订阅模式就是先定义一个实例对象， 这个对象类似于dom对象， 拥有注册、移除、发布订阅的api，以为每个实例上可以注册多种观察类型， 所以特殊的在这个实例中需要有一个存储各种类型观察回调（事件回调）的字段， 因为每个被观察者（dom对象）的每种观察类型（类型）可以被订阅多次， 所以存储每种观察类型的观察回调（事件回调）的应该是数组， 然后发布订阅（触发事件）的时候循环执行对应类型的观察回调, 移除事件就是移除对象类型的一个回调， 因为相同类型的事件可能注册多个回调

诀窍就是就是实现nodeEventEmitter 类

class EventEmitter {
    eventList = {}

    addEvent = (eventName, callback) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName].push(callback);
            return;
        }
        this.eventList[eventName] = [callback];
    }

    removeEvent = (eventName, callback) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName] = this.eventList[eventName].filter((item) => item !== callback);
        }
    }

    emit = (eventName, ...rest) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName].forEach((item) => item(...rest));
        }
    }

}

添加、出发、删除

add、delete、emit

12. JavaScript 把数组里的0放到后面

口诀： 使用一个变量缓存0项的索引， 然后当循环遇到非0项时，在才自增， 时间复杂度n

// 用一个标识表示为0项的索引，0项的时候 tmp不自增，遇到非0项， 通过tmp取到0项和非0项换位置，然后tmp 自增，寻找下一个可能实0项, 当item为0 tmp不自增， 这是为了遇到不为0的item0，可以通过tmp取到为0的item进行替换, 直到最后一个非0项， 都被替换为0， 结束。

function lastZero(arr) {
    let tmp = 0
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item !== 0) {
            if (arr[tmp] === 0) {
                arr[tmp] = arr[i];
                arr[i] = 0;
            }

            tmp++;
        }
    }

    return arr;
}

13. 深拷贝

function deepClone(val) {
  let isObj = (val) => Object.prototype.toString.call(val).slice(8, -1) === 'Object';
  let isDate = (val) => Object.prototype.toString.call(val).slice(8, -1) === 'Date';
  let isReg = (val) => Object.prototype.toString.call(val).slice(8, -1) === 'RegExp';

  const _deepClone = (vlaue) => {
    if (Array.isArray(vlaue)) {
      const source = vlaue;
  
      return source.reduce((result, current) => {
        result.push(deepClone(current))
        return result;
      }, [])
    }
  
    if (isObj(vlaue)) {
      const source = vlaue;
  
      return Object.keys(source).reduce((result, key) => {
        result[key] = deepClone(source[key]);
        return result;
      }, {})
    }

    if(isDate(vlaue)) {
      return new Date(vlaue.valueOf());
    }

    if(isReg(vlaue)) {
      const source = vlaue;
      const result = new RegExp(source.source, source.flags);
      result.lastIndex = source.lastIndex;
      return result;
    }
  
    return vlaue;
  }
  
  return _deepClone(val);
}

14. promisify 

function promisify (fn) {
    return function(...rest) {
        return new Promise((resolve, reject) => {
            rest.push((error,data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
            fn.apply(null, rest);
        });
    }
}

15. 写算法：
a_b_ccc_D_EEE_f ==> aBCccdeEEF
移除下划线
第一个单词不变
后面所有单词首字母大小写翻转

const reverseFirstCode = (str) => {
  const arr = str.split('_');
  let result = arr[0];
  for(let i = 1; i < arr.length; i++) {
    let item = arr[i];
    const first = item[0];
    // 65 - 90大写 charCodeAt
    // 90 - 122 小写
    const isLower = first.charCodeAt(0) >= 65 && first.charCodeAt(0) <= 90;
    if (!isLower) {
      item = first.toUpperCase() + item.slice(1);
    } else {
      item = first.toLowerCase() + item.slice(1);
    }
    result += item;
  }
  return result;
}

16. 实现一个pipe函数 让所有函数都处理一个值并返回结果 使用reduce

function pipe(...fns) {
  return (params) => {
    return fns.reduce((result, current) => {
      return current(result);
    }, params);
  }
}

17. 反转字符串
1. 利用字符串split方法 数组reverse方法， 数组join方法实现
2. 从后往前遍历字符串，拼接字符返回
3. 双指针 // 因为字符串不可变必须转成数组之后在反转
const reverString = (str) => {
  str = str.split('');
  let left = 0;
  let right = str.length - 1;

  while(left < right) {
    const leftItem = str[left];
    const rightItem = str[right];
    str[left] = rightItem;
    str[right] = leftItem;
    left++;
    right--;
  }

  return str.join('');
}

18. getVal实现
// console.log(getValue1({a: {c: {d: [1]}}}, 'a.c.d[0]'))

const getValue = (obj, path) => {
  const paths = path.split('.');
  const key = paths.shift();
  let result = '';

  const _getValue = (val, paths) => {
    if (paths.length > 0 && val !== null && val !== undefined) {
      result = getValue1(val, paths.join('.'));
    }
  }

  const reg1 = /^\[\d+\]$/;
  const reg2 = /^[a-zA-Z]+$/;
  const reg3 = /^([a-zA-Z]+)(\[\d+\])$/;

  if (reg1.test(key)) {
    const index = key.slice(1, key.length - 1);
    const value = obj[index];
    result = value;
    _getValue(value, paths);
  } else if(reg2.test(key)) {
    const value = obj[key];
    result = value;
    _getValue(value, paths);
  } else if(reg3.test(key)) {
    const { $1, $2 } = RegExp;
    const prevValue = obj[$1];
    if (prevValue) {
      const index = $2.slice(1, $2.length - 1);
      const value = prevValue[index];
      result = value;
      _getValue(value, paths);
    }
  }
  return result;
};

19. 并发任务函数

const asyncPool = async (limit, array, callback) => {
  let result = [];
  const working = [];

  for(let item of array) {
    const p = Promise.resolve(callback(item));
    result.push(p);

    if (array.length >= limit) {
      const w = p.then(() => working.splice(working.indexOf(w), 1));
      working.push(w);

      if (working.length >= limit) {
        await Promise.race(working);
      }
    }
  }

  return Promise.all(result);
}

20. 用JS实现数字千分位格式化

function getStrNum(num) {
    num = Math.floor(num);
    const str = num.toString();
    let res = '';
    const length = str.length;
    for(let i = length - 1; i >= 0; i--) {
      const count = length - i;
      if (count % 3 === 0) {
        if (i === 0) {
          res = str[i] + res;
        } else {
          res = ',' + str[i] + res;
        }
      } else {
        res = str[i] + res;
      }
    }

    return res;
}

### 队列

中等

面试题 17.09. 第 k 个数
有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21, 就是找出和例子一样规律的数中的一个

队列就是数据js中， 这个题就是利用队列就是数组存值， 然后就是将3、5、7分别定义一个所以变量，然后队列默认第一项是1，因为规律就是第一项从1开始，然后就循环从1开始， 找到队列中对应的3，5，7索引的值，和3，5，7相乘得到的结果中最小的值，赋值给遍历的当前项为索引的队列值，然后在用这个值和队列中3，5，7，索引变量值乘3，5，7，比较是否相等， 相等的那个所以变量就是加1，按这个规律遍历，
最后取到数组中的我们要找的个数减1项， 就是我们要找的值

var getKthMagicNumber = function(k) {
    let result = [];
    let p3 = 0;
    let p5=0;
    let p7=0;
    result[0]=1;
    for(let i= 1; i<k; i++) {
    result[i]=Math.min(result[p3]*3, Math.min(result[p5]*5, result[p7]*7));
    if(result[i] === result[p3]*3) {p3++};
    if(result[i] === result[p5]*5) {p5++};
    if(result[i] === result[p7]*7) {p7++};
    }

    return result[k-1];
};

### 栈

1. leecode 316. 去除重复字母 就是去除重复字母的同时，在将能排序的元素从小到大排序就是这个意思

var removeDuplicateLetters = function(s) {
    let arr = [];
    // 字典序最小就是字符串直接比较的从小到大的顺序，将能排序的元素
    for(let i = 0; i < s.length; i++) {
        const item = s[i];

        // 这里主要是处理挨着的重复的元素， 和普通的重复元素， 因为下面已经排序完成了， 所有只要重复
        // 直接就过滤掉就完事了
        if(arr.includes(item)) {
            continue;
        }

        // 这里关键， 只要不符合从小到大的顺序的， 并且是字符串后面还有的字符， 那就直接在数组中删除掉， 循环这个操作， 得到最符合条件的1. 数组内容
        while(arr.length > 0 && arr[arr.length - 1] > item && s.indexOf(arr[arr.length - 1], i + 1) !== -1) {
           arr.pop();
        }

        arr.push(item);
    }

    return arr.join('');
};

### 数组

数组相关问题的诀窍， 就是使用中间数组变量和中间索引变量 协助处理for循环完成问题

1. 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        const item = nums[i];

        const filterItem = target - item;
        const filterIndex = nums.findIndex((item, index) => {
            return item === filterItem && index !== i;
        });

        if(filterIndex !== -1) {
            return [i, filterIndex];
        }
    }
};

2.  给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 
const searchRange = function(nums, target) {
    if (!nums.length) {
        return [-1, -1];
    }
    const arr = [];
    for(let i = 0; i < nums.length; i++) {
        const item = nums[i];
        if (item === target) {
            arr.push(i);
        }
    }

    if (!arr.length) {
        return [-1, -1];
    }

    if(arr.length === 1) {
        arr.push(arr[0]);
        return arr;
    }

    if(arr.length > 1) {
        return [arr[0], arr[arr.length - 1]];
    }
};

3. JavaScript 把数组里的0放到后面

// 直接把0push到最后，然后把原位置上的0删除了， 最简单粗暴的方法, 没有引入第二个数字
function lastZero(arr) {
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item === 0 || item === '0') {
            arr.splice(i, 1);
            arr.push(0);
        }
    }

    return arr;
}

口诀： 使用一个变量缓存0项的索引， 然后当循环遇到非0项时，在才自增， 时间复杂度n

// 用一个标识表示为0项的索引，0项的时候 tmp不自增，遇到非0项， 通过tmp取到0项和非0项换位置，然后tmp 自增，寻找下一个可能实0项, 当item为0 tmp不自增， 这是为了遇到不为0的item0，可以通过tmp取到为0的item进行替换, 直到最后一个非0项， 都被替换为0， 结束。

function lastZero(arr) {
    let tmp = 0
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item !== 0) {
            if (arr[tmp] === 0) {
                arr[tmp] = arr[i];
                arr[i] = 0;
            }

            tmp++;
        }
    }

    return arr;
}

// 双指针做法最好用
function afterZero(arr) {
  if (!arr.length) {
    return;
  }

  let j = -1;

  for(let i = 0; i < arr.length; i++) {
    if (arr[i] === 0 && j < 0) {
      j = i;
    }

    if (arr[i] !== 0 && j >= 0) {
      const n = arr[i];
      arr[i] = arr[j];
      arr[j] = n;
      j++;
    }
  }
}

### 链表
使用js 实现一个链表的数据结构，是这样的

const header = {
    val: 1,
    next: {
        val: 2
        next: null
    }
}

这个header 对象是整体的单链表也是，链表的头, 也就是链表的开始

1. 链表相关题简单
解题思路：返回空的链表就是返回空就是返回null 在js中，解题思路就是递归，然后每一次都定义一个新的对象将每次递归的val赋值给新的对象的val， 将上一次存储的对象赋值给新对象的next属性，然后将新对象赋值给外部变量obj，最后将obj 返回就是最后的反转链表了， 注意需要判断输入空链表的情况，
将obj初始化设置为null， 可以一举两得， 一是反转链表第一个是空可以直接用， 二是在空链表判断时直接返回空可以用

var reverseList = function(head) {
    let obj = null;

    function deepHead (head) {
        if (!head) {
            return;
        }

        obj = {
            val: head.val,
            next: obj
        }

        if(head.next) {
            deepHead(head.next)
        }
    }

    deepHead(head);

    return obj;
};

const reverseList = (head) => {
    let obj = null;

    function deepHead(head1) {
        if (head1) {
            return;
        }

        obj = {
            val: head1.val,
            next: obj
        }

        if (head1.next) {
            deepHead(head1.next)
        }
    }


    deepHead(head);

    return obj;
}



链表就是使用while循环， 然后循环一次存储上次循环项的next， 用于下次循环

2. 删除链表项
解题思路， 设置两个变量， 分别存储整个链表， 和最新的next对象, 这是正向操作， 正向操作需要存储最后的next
const deleteList = (head, val) => {
   let obj = null;
   let next = null;

   function deepList(head1) {
        if(!head1) {
            return;
        }

        if(head1.val !== val) {
            if (obj) {
                if (obj.next) {
                    next.next = {
                        val: head1.val,
                        next: null
                    }
                    next = next.next;
                } else {
                    obj.next = {
                        val: head1.val,
                        next: null
                    }
                    next = obj.next;
                }
            } else {
              obj = {
                val: head1.val,
                next: obj
              }  
            }
        }
   }

   deepList(head1);
   return obj;
}

3. 链表相关题中等

双向链表就是: {
    pre: null,
    val: 111,
    next: {
        pre: 111,
        val: 222,
        next: null
    }
}

有环的链表就是: let a = {
    val: 1,
    next: {
        val: 2,
        next: a
    }
}

这样的， 就是一项的next是另一个项 （{
    val，
    next
}这个样的），两个项就形成了环

// 给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。 链表环路检测

两种解法：
第一种就是用循环， 在外边定义一个值，next的初始值是head， 存储深层的next， 定一个数组用于存储不重复的next， 这个最后是让我们返回环中前面的那个链表节点，只要不重复直接将next赋值为下一个next继续循环，直到对象比较中发现了相同的， 然后返回这个相同的对象， 就是这么个原理

// 这种解法就叫做哈希表法， 就是用个数组存上了，就叫哈希表
var detectCycle = function(head) {

    if (!head) {
        return null;
    }

    let next = head;
    let arr = [];

    while(next) {
        if (arr.includes(next)) {
            return next;
        } else {
            arr.push(next);
            next = next.next;
        }
    }

    return null;
};

//第二种标记方法 ,就是使用特殊标记, 标识前面的值， 如果后面的next有值是这个特殊值的， 那肯定有环，因为如果next没有取到前面的对象的话，那就是不能取到特殊的val的值

var detectCycle = function(head) {

    if (!head) {
        return null;
    }

    let tmp = head;

    while(tmp) {
        tmp.val = 'dssddd';
        tmp = tmp.next;
        if (!tmp) {
            return null;
        }

        if (tmp.val === 'dssddd') {
            return tmp;
        }
    }
};

### 哈希表

哈希表在js中就是说的是map 数据结构

1. 简单
leecode 两数之和

这个解法更简单， 关键点， 从后面取这个值的index 和从前面取另一个值的index只要是不相等， 说明两个数不是同一个数
var twoSum = function(nums, target) {
    let result = [];
    for(let i = 0; i < nums.length; i++) {
        const item = nums[i];
        const flag = target - item;

        if (nums.includes(flag)) {
            const flagIndex = nums.indexOf(flag);
            if (flagIndex !== i) {
                return [i, flagIndex];
            }
        }
    }
};

获取到数组中唯一的值
function onlyOne(arr) {
    console.time('testForEach')
    let result = null;

    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const index = arr.indexOf(item);
        const lastIndex = arr.lastIndexOf(item);

        if (lastIndex === index) {
            console.timeEnd('testForEach')
            return item
        }
    }
}

哈希表就是对象或者map， 就是使用键值对存储值， 然后根据存储值比较变化

2. leecode 1679. K 和数对的最大数目

// 这里的逻辑就是在对象中存储这个对应值的出现次数， 没有配对的就保留，配对的就将对应的key的次数减/// 1，并且不将配对的值存入对象中， 起到过滤不重复的作用，得到结果
var maxOperations = function(nums, k) {
    let ans = 0;
    let map = {};
    for(let item of nums) {
        if (map[k-item]) {
            map[k-item]--;
            ans++;
        } else {
            map[item] = (map[item] || 0) + 1;
        }
    }
    return ans;
};

### 字符串

1. 获取字符串中连续次数字段的字符和次数, 双指针j一直保持不动，在i和j对应的值不等的时候统计次数更新，在i === str.length - 1时还相等的也要判断是否要更新最大值, 找连续相同和不相投的字符串就是使用双指针，定义两个存储索引的变量就是两个指针，然后注意i === str.length - 1和是否需要i--情况就是字符串的本来遍历后退一个
function getCountMax (str) {
  let result = {
    value: '',
    count: 0
  }

  if (!str.length) {
    return result;
  }

  let j = 0;
  let max = 0;
  for(let i = 0; i < str.length; i++) {
    if (str[i] === str[j]) {
      max++;
      if (i === str.length - 1) {
        if (max > result.count) {
            result.value = str[j];
            result.count = max;
        }
      }
    } else {
      if (max > result.count) {
        result.value = str[j];
        result.count = max;
        j = i;
        i--;
        max = 0;
      }
    }
  }

  return result;
}

2. 获取字符串中连续次数字段的字符和次数

function maxLength(s) {
  let value = '';
  let maxLength = 0;
  let j = 0;
  let set = new Set();
  for(let i = 0; i < s.length; i++) {
    if (!set.has(s[i])) {
      set.add(s[i])

      if (i === s.length - 1) {
        if (set.size > maxLength) {
          maxLength = set.size;
          value = Array.from(set).join('');
        }
      }
    } else {
      if (set.size > maxLength) {
        maxLength = set.size;
        value = Array.from(set).join('');
      }
     
      while(set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      i--
    }
  }

  return {
    maxLength,
    value
  };
}

3. 有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

诀窍就是要括号需要是挨着配对或者对称配对， 整好符合栈的特性

题目要求的是紧挨着或者对称的位置有配对的才是对的

所以就是循环将对称或者挨着的配对项消掉， 如果最后的数组不是空的就不对， 返回 false

function isTrueString(string) {
    let stack = [];

    for(let i = 0; i < string.length; i++) {
        const item = string[i];

        if (item === '(') {
            stack.push(')')
        }

        if (item === '[') {
            stack.push(']')
        }

        if (item === '{') {
            stack.push('}')
        }

        if (item === ')') {
            const popItem = stack.pop();
            if (popItem !== ')') {
                return false;
            }
        }

        if (item === ']') {
            const popItem = stack.pop();
            if (popItem !== ']') {
                return false;
            }
        }

        if (item === '}') {
            const popItem = stack.pop();
            if (popItem !== '}') {
                return false;
            }
        }

    }
    return !stack.length;
}

4. 2进阶，给定一个只包含三种字符的字符串：（ ，） 和 * ，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则

有效的括号字符串
给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：

任何左括号 ( 必须有相应的右括号 )。
任何右括号 ) 必须有相应的左括号 ( 。
左括号 ( 必须在对应的右括号之前 )。

可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
一个空字符串也被视为有效字符串。

'()(*)' 这种形式也是符合要求的

解题思路： 这里是用两个栈存, 都是用栈但是和上边的那个存的方式完全不同， 这里是根据栈长度判断逻辑， 还有可能没有')'的情况，
所以栈中存的是对应（和 *的索引，之后比较（和 *的索引大小也有帮助,

因为 *还可以充当其他的还可以充当空， 括号这种需求用栈十分的合理， 和括号的行为非常的符合
最后的思路， 就是遇到（ 和*就装进两个栈的 数组中，遇到）就优先从（（数组中去（的索引去和）消掉， 就像开心消消乐一样， 如果（数组空了，在去从 *数组取值去消）， 如果 （和 * 的数组都是空的，没有去消）的， 那就直接return false, 当）都消没有了，
这个时候 （ 和*还剩的话， 那就比较 如果（的数量比 *的多那就直接return false因为肯定不够消了，如果是 *的数量多于(的数量那就在依次比较是不是所有的配对的（和 *， *都是在（后面的，如果不在后边就直接导致无法配对消除了直接返回false， 因为是用栈的所有后进先出， 越往后获取的是索引越靠前的，如果这些都过了, (数组也空了， 这个时候，就说明要么没有 *， 要么就剩 *了， 这个时候， 就说明字符串符合要求了 直接返回true

这里的题目要求也是对称或者挨着配对的符合要求， 我们这要把符合的消掉， 最后处理* 就可以了， *是可以充当任何的， 随意最后 * 只要是在 （ 后边， 那就是可以保证全部挨着或者对称消掉

诀窍就是要括号需要是挨着配对或者对称配对， 整好符合栈的特性

function isTrueString(string) {
    const stack = [];
    const star = [];

    // 将和）配对的消了, 多余的（ 和 * 存在数组中在处理
    for(let i = 0; i < string.length; i++) {
        const item = string[i];
        if (item === '(') {
            stack.push(i);
        }

        if (item === '*') {
            star.push(i);
        }

        if (item === ')') {
            // 如果 （ 和 * 都没有了，那就是错了， 直接返回false
            if (!stack.length && !star.length) {
                return false;
            } else {
                // 然后以为 * 可以替换任何， 并且自己就是空， 可以单独存在，所以先从（数组中取值
                if (stack.length) {
                    stack.pop();
                } else {
                    star.pop();
                }
            }
        }
    }

    // 处理完）的情况，然后判断处理剩余的* 和 （

    // 如果（的数量多余 *的数量，那直接就是返回false了， 不可能全部和（配对
    if(stack.length > star.length) {
        return false;
    } else {
        while(stack.length) {
            // 如果（ 的索引有大于 *的对应的索引的， 那就说明有 （ 和 *不能配对的情况了， 就出现错误了， 就返回false了
            if (stack.pop() > star.pop()) {
                return false;
            }
        }
    }

    return true;
}

5. leecode 316. 去除重复字母 就是去除重复字母的同时，在将能排序的元素从小到大排序就是这个意思

var removeDuplicateLetters = function(s) {
    let arr = [];
    // 字典序最小就是字符串直接比较的从小到大的顺序，将能排序的元素
    for(let i = 0; i < s.length; i++) {
        const item = s[i];

        // 这里主要是处理挨着的重复的元素， 和普通的重复元素， 因为下面已经排序完成了， 所有只要重复
        // 直接就过滤掉就完事了
        if(arr.includes(item)) {
            continue;
        }

        // 这里关键， 只要不符合从小到大的顺序的， 并且是字符串后面还有的字符， 那就直接在数组中删除掉， 循环这个操作， 得到最符合条件的1. 数组内容
        while(arr.length > 0 && arr[arr.length - 1] > item && s.indexOf(arr[arr.length - 1], i + 1) !== -1) {
           arr.pop();
        }

        arr.push(item);
    }

    return arr.join('');
};


### 排序

1. 冒泡排序

记忆口诀： 两成for循环， 每一层都是从索引0 开始， 在第二层中比较调换位置，arr.length - 1, arr.length - 1 - i;

function sort (arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            const tmp = arr[j];
            if (tmp > arr[j + 1]) {
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp;
            }
        }
    }

    return arr;
}

冒泡排序的时间复杂度是n2，就是两层循环嵌套, 原理就是两边循环都从0 开始这样才能将所有项排序正确

#### 位运算   这是一个题型， 也是一种解法，就是使用位运算符解题但是这个位运算不好理解，可以用其他解法，比较简单好懂的就是哈希表或者叫字典， 就是使用一个对象存储， 或者使用一个map存储

这道题注意边界情况，在有多个判断的情况下， 考虑一下数组只有一项的特殊情况边界
1. 简单

leecode 169. 多数元素
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 这是哈希表的解法解决的, 肯定会发生不需要判断直接前置， 然后后面在判断需要判断的情况
var majorityElement = function(nums) {
    const map = {}
    for(let num of nums) {
        map[num] = (map[num] || 0) + 1;
        const flag = nums.length / 2;
        if(map[num] > flag) {
            return num;
        }
    }
};

leecode 268. 丢失的数字
给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

// 不使用位运算符， 只for循环实现， 这道题就是查找不在数组中的索引， 但是这个索引需要包含nums.length
var missingNumber = function(nums) {
    const len = nums.length;
    for(let i = 0; i < len + 1; i++) {
        if (!nums.includes(i)) {
            return i;
        }
    }
};

2. 中等

面试题 16.01. 交换数字
编写一个函数，不用临时变量，直接交换numbers = [a, b]中a与b的值。

// 主要思路就是一个es6的知识点， 就是数组结构赋值，如果接收值不是变量， 而是一个数字的索引取值的形式， 实际就是在给这个数组设置对应位置的值

var swapNumbers = function(numbers) {
    [numbers[1], numbers[0]] = [numbers[0], numbers[1]]
    return numbers;
};

### 二分查找
1. 这种是除了二分查找最快的方式
var search = function(nums, target) {
    let num = 0;
    for(let item of nums) {
        if (item === target) {
            num++;
        }
    }
    return num;
};

2. 矩阵在js中就是每一个子数组都排过序的二维数组

// 查看矩阵的规则,根据规则判断做判断， 解决矩阵的问题
var searchMatrix = function(matrix, target) {
    for (let item of matrix) {
        if (item[0] > target) {
            return false;
        }

        if (item[item.length - 1] < target) {
            continue;
        }

        if (item.includes(target)) {
            return true;
        }

    }

    return false;
}

数字在升序数组中出现的次数js解法(数组、二分)

0 arr.length first + 1/2就是一半， 不够加一个接着二分够了，last设置为二分结果接着二分

function getCount (arr, k) {
  let first = 0;
  let last = arr.length;

  while(last > first) {
    const mid = first + Math.floor((last - first) / 2);
    if (arr[mid] < k) {
      first = mid + 1;
    } else {
      last = mid;
    }
  }

  let left = first;

  first = 0;
  last = arr.length;

  while(last > first) {
    const mid = first + Math.floor((last - first) / 2);
    if (arr[mid] > k) {
      last = mid;
    } else {
      first = mid + 1;
    }
  }

  let right = last;

  return right - left;
}

console.log(getCount([1,2,3,3,4,5,6],3))

### 动态规划

动态规划，我理解就是一层循环， 然后通过变量存储之前的结果， 然后一次循环实现所有可能得到结果

1. 面试题 16.17. 连续数列
给定一个整数数组，找出总和最大的连续数列，并返回总和。

示例：

输入： [-2,1,-3,4,-1,2,1,-5,4]
输出： 6
解释： 连续子数组 [4,-1,2,1] 的和最大，为 6。

// 第一两个变量，分别储存和，和最大值，然后用和加上下一项和和比， 大的，赋值给和， 然后在用这个和和最大值比， 大的赋值给最大值， 一个循环下来，得出结果
var maxSubArray = function(nums) {
   if (!nums) {
       return null
   }

   let max = nums[0];
   let sum = nums[0];

   for(let i = 1; i < nums.length; i++) {
       sum = Math.max(sum + nums[i], nums[i])
       max = Math.max(sum, max)
   }

   return max;
};

2. 面试题 01.05. 一次编辑
字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

比较两个东西是否相等，那就把两个东西搞成一样标准的比较， 就可以了


var oneEditAway = function (first, second) {
    if (first == null && second == null) {
        return false;
    }

    const diff = first.length - second.length;

    if (Math.abs(diff) > 1) {
        return false;
    }

    let farr = Array.from(first)
    let sarr = Array.from(second)

    const maxLenth = diff > 0 ? first.length : second.length;

    for(let i = 0; i < maxLenth; i++) {
        if (farr[i] !== sarr[i]) {
            if (diff === 0) {
                farr.splice(i, 1, sarr[i]);
            } else if (diff > 0) {
                sarr.splice(i, 0, farr[i]);
            } else {
                farr.splice(i, 0, sarr[i]);
            }
            break;
        }
    }

    return farr.join('') === sarr.join('')
};

3. 青蛙跳台阶

这个就是斐波那契数列
### 二叉树

1. 二叉树的前中后序遍历, 命名是根据root节点的位置定义的
llet arr = [];
let prev = (node) => {
    if (node === null) {
        return;
    }

    arr.push(node.val);
    prev(node.left);
    prev(node.right);

}

// prev(tree)
const center = (node) => {
  if(node === null) {
    return;
  }

  center(node.left);
  arr.push(node.val);
  center(node.right);
}

// center(tree)
console.log(arr)

const after = (node) => {
  if(node === null) {
    return
  }

  after(node.left);
  
  after(node.right);
  arr.push(node.val);
}


2. 二叉树求和, 就是求二叉树中所有值的和,就是使用递归，规定好第一层的逻辑， 其他深层的left和right， 都是调用递归函数，按照相同的逻辑让他自己执行，然后在递归函数中使用一个变量缓存和的数据， 最后返回这个变量， 得到总和的值

诀窍背诵： 二叉树的结构就是val， left， right


function treeSum(tree) {
let sum = 0;
if (tree.val) {
sum += tree.val;
}

    if (tree.left) {
        sum += treeSum(tree.left)
    }

    if (tree.right) {
        sum += treeSum(tree.right);
    }

    return sum;

}

const tree = {
val: 0,
left: {
val: 0,
left: {
val: 2,
left: null,
right: {
val: 2,
left: null,
right: null,
},
},
right: null,
},
right: {
val: 2,
right: {
val: 2,
left: null,
right: null,

        },
        left: {
            val: 2,
            left: null,
            right: null,
        }
    }

}

{
    val: 1,
    left: {
        val: 1,
        left: 3,
        right: 2
    },
    right: {
        val: 2,
        left: 2,
        right: 3
    }
}

function sumNum(tree) {
    let sum = 0;
    if (tree.val) {
        sum += tree.val;
    }

    if (tree.left) {
        sum += sumNum(tree.left);
    }

    if (tree.right) {
        sum += sumNum(tree.right);
    }

    return sum;
}

求二叉树中所有值的和第二遍

function treeSum(tree) {
    if (!tree) {
        return null;
    }

    let sum = 0;

    function deep(tree) {
        if (tree.val) {
            sum+=tree.val;
        }

        if (tree.left) {
            deep(tree.left);
        }

        if (tree.right) {
            deep(tree.right);
        }
    }

    deep(tree);

    return sum ? sum : null;

}

3. 获得二叉树的最小深度

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

思路写一个递归函数， 初始化出入节点数，然后在root没有left和right的时候将节点数push进外层存储数组， 由left和right， 就将当前节点数加1， 递归调用left和right， 最后通过Math.min,获取数组中最小值，返回

var minDepth = function(root) {
    if (!root) {
        return null;
    }
    const result = [];
    const deepCallback = (root, num) => {
        if (!root.left && !root.right) {
            result.push(num);
            return;
        }

        if (root.left) {
            deepCallback(root.left, num + 1);
        }

        if (root.right) {
            deepCallback(root.right, num + 1);
        }
    }

    deepCallback(root, 1);

    return Math.min.apply(null, result);
};

leecode 面试题 04.02. 最小高度树
4. 给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。

首先理解二叉搜索树是啥，而是所有搜索树就是左边永远比根节点小，右边永远比根结点大，包括子节点也是这个规则的二叉树, 这个搜索二叉树的原理就是，写好一个每次分一半的逻辑，然后递归操作，left和right

二叉树的本质就是left和right和根节点也是一样的， 也是有val和left和right的, 因为是最小高度， 所以要尽可能做到平分, 所以在取中间值的index的时候需要向下取整才尽可能做到平分和兼容特殊情况， 如数组中只有一个值的时候取中间值, 但是实现的时候没有用到

var sortedArrayToBST = function(nums) {
    if (!nums || !nums.length) {
        return null;
    }

    if (nums.length === 1) {
        return {
            val: nums[0],
            left: null,
            right: null
        };
    }

    let result = nums.sort((a,b) => a - b);
    const rootIndex = Math.floor(result.length/2);

    return {
        val: nums[rootIndex],
        left: sortedArrayToBST(nums.slice(0, rootIndex)),
        right: sortedArrayToBST(nums.slice(rootIndex + 1))
    }
};

5. 求和路径
给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)。设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。

这道题我没有理解，完全是背下来的，还需要理解

示例:
给定如下二叉树，以及目标和 sum = 22，

var pathSum = function(root, sum) {
    if(!root) {
        return 0;
    }
    return helper(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)

    function helper(root, sum) {
       if(!root) {
           return 0;
       }
       if (root.val === sum) {
           return 1 + helper(root.left, sum - root.val) + helper(root.right, sum - root.val)
       }

       return helper(root.left, sum - root.val) + helper(root.right, sum - root.val);
    }
};


深度遍历就是 就是递归处理的就是深度遍历，循环加递归处理的就是深度遍历， 只要后递归的就是深度遍历 先执行完一个路径的最深， 在执行另一个路径的最深， for循环内部执行递归，就是纵向处理，
就是用时间换空间

广度遍历就是二叉树每一层每一层的处理， 就是横向处理， 用空间换时间
广度遍历， 就是 设置 一个结果数组， 设置一个中间暂存值的数组， 然后从暂存值的数组中取值处理后，在放进结果数组中， 广度运算用for 和 while 循环完成， 如果复杂度高， 那就是在一维循环里边在加一层循环， 然后内部在定义一个内部的临时结果数组和一个临时中间暂存数组，就可以解决广度遍历的问题了, 先进行while 循环， 判断这个中间存值这个数组，还有内容就循环， 然后在里边的for循环遍历这个中间存值的数组，每一先有值就存起来， 有left和right也存在里边的暂存数组中, 最后本次for循环完， 就将本地的结果push进 中的结果数组， 将本次存储的待处理数组， 直接赋值给总的待处理数组， 在开始新的一次while循环

广度优先的算法总结就是 先在while循环判断暂存数组有没有值， 有值在while循环内部在循环这个数组， 不管是用while还是for循环

同一道题可以使用深度优先也可以使用广度优先解， 深度优先适合结果是纵向，用深度优先比较合适， 如果结果是横向的用广度优先合适

6. 广度遍历解的题
剑指 Offer 32 - II. 从上到下打印二叉树 II

const levelOrder = (root) => {
  // 狗不理
  if (!root) {
    return [];
  }

  // 1. 设置结果集
  const result = [];

  // 2. 设置当前层
  let nowRoot = [root];

  // 3. 广度优先搜索（BFS）
  while (nowRoot.length) {
    // 3.1 设置下一层
    const nextRoot = [];

    // 3.2 设置当前层的值
    const nowResult = [];

    // 3.3 遍历当前层，取值以及添加下一层
    for (let i = 0; i < nowRoot.length; i++) {
      // 3.3.1 添加值
      nowResult.push(nowRoot[i].val);

      // 3.3.2 如果存在左子树
      if (nowRoot[i].left) {
        nextRoot.push(nowRoot[i].left);
      }

      // 3.3.3 如果存在右子树
      if (nowRoot[i].right) {
        nextRoot.push(nowRoot[i].right);
      }
    }

    // 3.4 收集完毕，开始交接
    nowRoot = nextRoot;
    result.push(nowResult);
  }

  // 4. 返回结果
  return result;
};

看看用递归能不实现，就不会用深度遍历， 就直接用两层循环广度遍历，广度遍历的定义的几个数组也都是差不多的

### 深度遍历和广度遍历
// 广度优先遍历二叉树
function breadth(tree) {
  let queue = [];
  queue.unshift(tree);
  while(queue.length) {
    const current = queue.pop();
    if (current) {

      if (current.left) {
        queue.unshift(current.left);
      }

      if (current.right) {
        queue.unshift(current.right);
      }
    }
  }
}

// 深度遍历二叉树

function deep(tree) {
    if (tree) {
      console.log(tree.val)
      if (tree.left) {
        deep(tree.left)
      }

      if (tree.right) {
        deep(tree.right)
      }
    }
}

### 取到二叉树中的第K小值， 使用中序遍历
function getMin (tree, k) {
  let result = [];
  function getValue(tree) {
    if (!tree) {
      return;
    }
  
    getValue(tree.left);
    result.push(tree.val)
    getValue(tree.right);
  }

  getValue(tree);

  return result[k - 1];
}

let tree = {
  val: 5,
  left: {
    val: 3,
    left: {
      val: 2
    },
    right: {
      val: 4
    }
  },
  right: {
    val: 7,
    left: {
      val: 6
    },
    right: {
      val: 8
    }
  }
}

console.log(getMin(tree, 2))


二叉树路径求和1、2、3
1. 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false。

var hasPathSum = function(root, targetSum) {
  if (!root) {
      return false;
  }

  if (root.left === null && root.right === null) {
      return root.val === targetSum;
  }

  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

2. 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

var pathSum = function(root, targetSum) {
    const result = [];
    let currentSum = 0;
    const getPath = (root, sum, arr, currentSum, result) => {
        arr.push(root.val);
        currentSum += root.val;
        if (root.left === null && root.right === null) {
            if (sum === currentSum) {
                result.push(arr);
                return;
            }
        }

        if (root.left) {
             getPath(root.left, targetSum, [...arr], currentSum, result);
        }

        if (root.right) {
             getPath(root.right, targetSum, [...arr], currentSum, result);
        }
    }

    if (root) {
        getPath(root, targetSum, [], currentSum, result);
    }
    return result;
};

3. 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
var pathSum = function(root, targetSum) {
    if (!root) {
        return 0;
    }
    function dfs(root, sum) {
        if (!root) {
            return 0;
        }
        sum -= root.val;
        return (sum === 0 ? 1 : 0) + dfs(root.left, sum) + dfs(root.right, sum);
    }

    return pathSum(root.left, targetSum) + pathSum(root.right, targetSum) + dfs(root, targetSum);
};
### 数组中调换项的位置，并且不新增数组总结口诀
要么第一个标识变量，一层for循环 就是给数组两个位置相互设值， 要么就是两层for循环，然后在第二层循环中将数组中两个位置相互设值


### 双指针
1. 斐波那契数列
斐波那契数，指的是这样一个数列 0、1、1、2、3、5、8、13、21 ,求第n个返回啥
// 双指针移动 实现
function getSum(n) {
  if (n <= 0) {
    return 0
  }

  if (n === 1) {
    return 1;
  }
  let num1 = 0;
  let num2 = 1;
  let result = 0;
  for(let i = 2; i <= n; i++)  {
    result = num1 + num2;
    num1 = num2;
    num2 = result;
  }

  return result;
}

// 动态规划实现

### 算法方式

双指针、双变量、单变量、哈希表、贪心、动态规划、二分、栈、队列、set