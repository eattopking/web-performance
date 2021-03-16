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

2. 截流


3. 防抖, 防抖就可以理解为，防止多次点击， 防止多次请求
```
function debounce(fun, time) {
    const obj = {};
    return (...rest) => {
        clearTimeout(obj.id);
        obj.id = setTimeout(() => {
            fun(...rest);
        }, time)
    }
}
```

4. 深拷贝

```

```