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
5. Promise.all

6. 二叉树求和

7. apply实现
8. call 实现
