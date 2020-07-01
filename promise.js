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

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let self = this;
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e)
                }
            })
        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        } else if (self.status === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
        }
    });
    return promise2;
}

function resolvePromise (promise2, x, resolve, reject) {
    let self = this;
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }

    if (x && typeof x === 'object' || typeof x === 'function') {
        let used;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, () => {
                    if (used) return;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (used) return;
                    used = true;
                    reject(r);
                })
            } else {
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch(e) {
            if (used) return;
            used  = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}