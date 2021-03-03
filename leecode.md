### 算法练习

1. 斐波那契数列

```
递归思路， 确定好退出条件， 第一个和第二个都是为 1， 然后就是构造出前两个加前一个数的这种规律， 然后就让他自己算

function fibonacci(n) {
    if (n <= 2) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
};
```