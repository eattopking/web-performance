// 学习promise的源码
// promise 的三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const Promise = (executor) => {
    const self = this;
    self.status = PENDING;
    self.onFulfilled = [];//存储成功的回调， 就是then里面注册进来的第一个参数
    self.onRejected = []; //存储失败的回调， 就是then里面注册进来的的第二个参数， 和catch的第一个参数

    // 改变成功状态api
    function resolve(value) {
        if(self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
        }
        // 每次改变promise为完成状态都执行一下完成的回调
        self.onFulfilled.forEach((fn) => {
            fn();
        });

    }

    // 改变失败状态api
    function reject(reason) {
        if(self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            // 每次改变promise为失败状态都执行一下失败的回调
            this.onRejected.forEach((fn) => fn());
        }
    }

    // 判断代码是否出错， 出错了直接将promise设置成失败状态
    try {
        executor(resolve, reject);
    } catch(err) {
        reject(err);
    }
}

// then 方法

