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