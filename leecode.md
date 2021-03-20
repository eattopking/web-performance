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

6. 二叉树求和

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
