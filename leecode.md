### 算法练习

1. 斐波那契数列

```
递归思路， 确定好退出条件， 第一个和第二个都是为 1， 然后就是构造出前两个加前一个数的这种规律， 然后就让他自己算
// 低性能递归版本
function fibonacci(n) {
    if (n <= 2) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
};

高性能递归版本
思路：就是序号是递减的，但是v1 v2是递增的
function fibnc (n) {
    function fib(n, v1, v2) {
        if (n === 1) {
            return v1;
        }

        if (n === 2) {
            return v2;
        }

        return fib(n -1, v2, v1 + v2);
    }
    return fib(n, 1, 1);
}
```

2. 截流, 截流就是第一次操作之后，没有达到效果之前，不让他在点击操作, 也是利用闭包的缓存变量，在初始化的时候不处理， 在次调用的时候处理截流逻辑

```
function throttle (fun, time) {
    let delay = null;
    return (...rest) => {
        const currentDate = Date.now();
        if (!delay || currentDate - delay > time) {
            delay = currentDate;
            fun(...rest);
        }
    }
}
```


3. 防抖, 防抖就可以理解为，防止多次点击， 防止多次请求， 就是主要思路利用闭包缓存值， 然后初始化的时候不处理， 在次调用的时候处理防抖逻辑
```
function debounce(fun, time) {
    let id = null;
    return (...rest) => {
        clearTimeout(id);
        id = setTimeout(() => {
            fun(...rest);
        }, time)
    }
}
```

4. 深拷贝
```

```

5. Promise.all 原理就是Promise只能改变一次状态， 然后定义一个变量缓存resolve的次数， 用于和数组的长度比较，
当全部promise都变成resolve时候就将最外层的promise变为fulfilled状态返回数组， 如果有promise变成reject状态，直接返回这个reject状态的值，设置一个数组的index值， 前面没有值得索引会用空值占位
```
Promise.all = function(arr) {
    if(!Array.isArray(arr)) {
        throw new Error('params must array');
    }

    return new Promise((resolve, reject) => {
        let cont = 0;
        const result = [];
        const len = arr.length;
        arr.forEach((item, index) => {
            const promise = Promise.resolve(item);
            promise.then((data) => {
                ++cont;
                result[index] = data;
                if(len === cont) {
                    resolve(result);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
```

6. 二叉树求和, 就是使用递归，规定好第一层的逻辑， 其他深层的left和right， 都是调用递归函数，按照相同的逻辑让他自己执行，然后在递归函数中使用一个变量缓存和的数据， 最后返回这个变量， 得到总和的值

```
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
```

7. apply实现  使用的原理就是函数当作为谁属性调用的时候，这个函数的this指向就是谁， 还有只有null 和undefined == null， 内置构造函数创建实例， 用不用new都可以， Object 类似于Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf方法是获取对象的原始值的方法, 对象的toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的
```
Function.prototype.apply = function (newThis, arr) {
    if (newThis == null) {
         this(...arr);
         return;
    }

    const currentThis = Object(newThis);

    currentThis.fun = this;
    currentThis.fun(...arr);
    delete currentThis.fun;
}
```
8. call 实现  使用的原理就是函数当作为谁属性调用的时候，这个函数的this指向就是谁， 还有只有null 和undefined == null， 内置构造函数创建实例， 用不用new都可以， Object 类似于Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf方法是获取对象的原始值的方法, 对象的toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的
```
Function.prototype.call = function(newThis, ...rest) {
    if (newThis == null) {
        this(...rest);
        return;
    }
    const currentThis = Object(newThis);
    currentThis.fun = this;
    currentThis.fun(...rest);
    delete currentThis.fun;
}
```
9. bind 实现  使用的原理就是函数当作为谁属性调用的时候，这个函数的this指向就是谁， 还有只有null 和undefined == null， 内置构造函数创建实例， 用不用new都可以， Object 类似于Promise.resolve, 如果参数是对象直接解构， 返回这个对象，如果参数不是对象，将这个参数转成对象， 返回这个值的包装对象，然后这个对象的原始值是那个参数, valueOf方法是获取对象的原始值的方法, 对象的toString 方法返回对象的字符串，根据不同对象的实现返回的字符串规则也是不同的, 还是使用了闭包的原理缓存rest
```
Function.prototype.bind = function (newThis, ...rest) {
    return (...params) => {
        if (newThis == null) {
            return this(...[...rest, ...params]);
        }
        const currentThis = Object(newThis);
        currentThis.fun = this;
        currentThis.fun(...[...rest, ...params]);
        delete currentThis.fun;
    }
}
```
10. new 过程

new 实现的原理： 就是自定义一个new 函数， 然后参数是我们的构造函数和构造函数的参数， 创建一个最后返回的实例， 并将构造函数的原型对象设置给实例的原型，然后使用call调用new函数， 并将this指向设置为我们创建的实例， 函数的参数也设置为我们传入的参数，
再有就是判断一下构造函数是否返回对象， 如果返回对象new函数直接返回这个对象， 我们没有返回对象， new函数就返回我们创建的那个实例

function newFun(fun, ...rest) {
    const currentThis = Object.create(fun.prototype);

    const res = fun.call(currentThis, ...rest);

    if ((typeof res === 'object' || typeof res === 'function') && Object.prototype.toString.call(res).slice(8, -1) !== 'Null') {
        return res;
    }
    return currentThis;
}

11. 获得二叉树的最小深度

解题思路，定义一个数组用于手机深度的值， 还有有标志用于告诉最小深度已经找到， 不需要在递归了，设置一个函数接收tree， 然后在内部写一个递归函数， 然后在内部调用， 将初始化的参数传给递归函数， 在函数内部判断如果没有left或者right直接将上一层深度返回，这就是最小深度，并将最小深度标识设置为false， 否则继续递归执行， 如果判断最小深度标识为false，就直接返回了避免无用的计算， 最后调用Math.min返回最小深度， 传入的是空的就返回0

核心思想就是在外层准备收集深度的数组， 然后传入递归函数， 递归执行，在得到结果后用Math.min比较返回最小值
```
function minDepth (tree) {
    if (!tree) {
        return 0;
    }

    let depthList = [];
    let flagObj = {
        isNext: true
    };
    function depth (tree, list, currentDepth, flagObj) {
        if (!flagObj.isNext) {
            return;
        }

        if (!tree.left || !tree.right) {
            list.push(currentDepth);
            flagObj.isNext = false;
        } else {
            depth(tree.left, list, currentDepth + 1, flagObj);
            depth(tree.right, list, currentDepth + 1, flagObj);
        }
    }

    depth(tree, depthList, 1, flagObj);
    return Math.min(...depthList);
}
```

12. 判断 字符串是否如 {[()]} , [()]、{()} 等结构, 如果是就返回true， 不是就返回false, 这里栈中存的是对应括号的右侧部分 ， 不是右侧的索引

这题的解题思路就是：正确的结构都是对称的， 当遍历完全部左侧部分的时候， 就会按照栈的特性遍历全部的右侧部分（后进先出），所以我们在遍历全部左侧部分的时候要要在一个数组中，从前边插入对应的右边部分， 等到全部左侧遍历完成，按照栈的原理遍历右侧的时候就从这个数组中一次获取值对比， 如果没有比上那就是结构不符合就是false， 一直到最后都比上了就是true
```
function isTrueString(str) {
    if(!str.length) {
        return false;
    }

    let stack = [];
    for (let i = 0; i < str.length; i++) {
        const item = str[i];
        if (item === '[') {
            stack.push(']');
            continue;
        }
        if (item === '{') {
            stack.push('}');
            continue;
        }
        if (item === '(') {
            stack.push(')');
            continue;
        }

        const last = stack.pop();
        if (last !== item) {
            return false;
        }
    }
    return !stack.length
}
```

12.1 有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
```

题目要求的是紧挨着或者对称的位置有配对的才是对的

所以就是循环将对称或者挨着的配对项消掉， 如果最后的数组不是空的就不对， 返回false

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

```

13. 12题的进阶，给定一个只包含三种字符的字符串：（ ，） 和 * ，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则

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




14. 实现一个观察者模式

解题思路： 观察者模式就是发布订阅模式, 就是我们js中事件的实现原理， 我们要自己实现发布订阅模式就是先定义一个实例对象， 这个对象类似于dom对象， 拥有注册、移除、发布订阅的api，以为每个实例上可以注册多种观察类型， 所以特殊的在这个实例中需要有一个存储各种类型观察回调（事件回调）的字段， 因为每个被观察者（dom对象）的每种观察类型（类型）可以被订阅多次， 所以存储每种观察类型的观察回调（事件回调）的应该是数组， 然后发布订阅（触发事件）的时候循环执行对应类型的观察回调, 移除事件就是移除对象类型的一个回调， 因为相同类型的事件可能注册多个回调
```
// 写算法就是写这个类， 然后在创建实例在去演示， 不直接写下边的实例
class EventEmitter {
    constructor() {
        this.eventList = {}
    };
    subscribe(type, callback) {
        const eventList = this.eventList[type];
        if (eventList) {
            eventList.push(callback)
        } else {
            this.eventList[type] = [callback];
        }
    };
    unSubscribe(type, fn) {
        const eventList = this.eventList[type];
        if (eventList && eventList.length) {
            this.eventList[type] = eventList.filter((item) => {
                if(item !== fn) {
                    return true;
                }
                return false;
            })
        }
    };
    // 这里rest是触发事件的时候可以向下传自定义的参数给回调
    publish(type, ...rest) {
        const eventList = this.eventList[type];
        if (eventList && eventList.length) {
            eventList.forEach((item) => {
                item(...rest);
            });
        }
    }
}

const eventEmitter = {
    eventList: {},
    subscribe(type, callback) {
        const eventList = this.eventList[type];
        if (eventList) {
            eventList.push(callback)
        } else {
            this.eventList[type] = [callback];
        }
    },
    unSubscribe(type, fn) {
        const eventList = this.eventList[type];
        if (eventList && eventList.length) {
            this.eventList[type] = eventList.filter((item) => {
                if(item !== fn) {
                    return true;
                }
                return false;
            })
        }
    },
    // 这里rest是触发事件的时候可以向下传自定义的参数给回调
    publish(type, ...rest) {
        const eventList = this.eventList[type];
        if (eventList && eventList.length) {
            eventList.forEach((item) => {
                item(...rest);
            });
        }
    }
}
```

15. 链表相关题简单

16. 链表相关题中等

17. 队列相关题简单

18. 队列相关题中等

19. 栈相关题简单

20. 栈相关题中等

21. 冒泡排序

冒泡排序的时间复杂度是n2，就是两层循环嵌套

22. 快速排序

23.

