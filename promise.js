// promise 简单实现

// promise的机制就是利用了，递归、事件队列、闭包的原理

// callbacks 只存当前promise 实例没有改变状态的时的catch和then回调

// 执行行then和catch promise内部不会区分, 执行then和catch执行的方法一样, 都是执行handleThenAndCatch, 只是在handleThenAndCatch内部根据当前promise的状态
// 看有没有和当前状态对应的执行函数, 有就执行, 没有就把当前状态和值传给下一个promise, 状态和回调的判断是核型, 改变完状态要循环处理callbacks内部的then, catch的配置
// 调用then和catch, 他们的回调必定会先进入到callbacks

const Promise = function(fn) {
    const callbacks = [];
    this.promiseResult = undefined;
    this.promiseState = 'pending';

    const handleThen = (callback) => {
        if (this.promiseState === 'pending') {
            callbacks.push(callback);
            return;
        }

        if (this.promiseState === 'fulfilled') {
            const {
                thenFn,
                resolve,
                reject
            } = callback;

            try {
                if (typeof thenFn === 'function') {
                    const res = thenFn(this.promiseResult);
                    resolve(res);
                } else {
                    resolve(this.promiseResult);
                }
            } catch(err) {
                reject(err)
            }
        }

        if (this.promiseState === 'rejected') {
            const {
                catchFn,
                resolve,
                reject
            } = callback;

            try {
                if(typeof catchFn === 'function') {
                    const res = catchFn(this.promiseResult);
                    resolve(res);
                } else {
                    reject(this.promiseResult)
                }
            } catch(err) {
                reject(err)
            }
        }
    }

    this.then = (thenFn, catchFn) => {
        return new Promise((resolve, reject) => {
            handleThen({
                thenFn,
                catchFn,
                resolve,
                reject
            })
        })
    }

    this.catch = (catchFn) => {
        return new Promise((resolve, reject) => {
            handleThen({
                catchFn,
                resolve,
                reject
            })
        })
    }

    const resolve = (value) => {
        const fn = () => {
            if (this.promiseState !== 'pending') {
                return;
            }

            this.promiseResult = value;
            this.promiseState = 'fulfilled';
            handleCallback();
        }

        setTimeout(fn, 0);
    }

    const reject = (value) => {
        const fn = () => {
            if (this.promiseState !== 'pending') {
                return;
            }

            this.promiseResult = value;
            this.promiseState = 'rejected';
            handleCallback();
        }

        setTimeout(fn, 0);
    }

    function handleCallback() {
        while(callbacks.length) {
            const item = callbacks.shift();
            handleThen(item);
        }
    }

    try {
        fn(resolve, reject);
    } catch(err) {
        reject(err);
    }
}


Promise.all实现的原理就是本质就是返回一个promise实例, 并且数组是可以随意给哪个索引赋值的


const Promise = function(fn) {
    const callbacks = [];
    this.promiseResult = undefined;
    this.promiseState = 'pending'

    const handleThenAndCatch = (option) => {
        if (this.promiseState === 'pending') {
            return callbacks.push(option);
        }

        const {
            thenCallback,
            catchCallback,
            reject,
            resolve
        } = option;

        if (this.promiseState === 'fulfilled') {
            if (typeof thenCallback === 'function') {
                try {
                    const result = thenCallback(this.promiseResult);
                    resolve(result);
                } catch(err) {
                    reject(err);
                }
            } else {
                resolve(this.promiseResult);
            }
        }

        if (this.promiseState === 'rejected') {
            if (typeof catchCallback === 'function') {
                try {
                    const result = catchCallback(this.promiseResult);
                    resolve(result);
                } catch(err) {
                    reject(err);
                }
            } else {
                reject(this.promiseResult);
            }
        }
    }

    const handleCallback = () => {
        while(callbacks.length) {
            const item = callbacks.shift();
            handleThenAndCatch(item);
        }
    }

    const resolve = (res) => {
        const fn = () => {
            if (this.promiseState !== 'pending') {
                return;
            }

            this.promiseResult = res;
            this.promiseState = 'fulfilled';
            handleCallback();
        }
        
        setTimeout(fn, 0);
    }

    const reject = (rej) => {
        const fn = () => {
            if (this.promiseState !== 'pending') {
                return;
            }

            this.promiseResult = rej;
            this.promiseState = 'rejected';
            handleCallback();
        }

        setTimeout(fn, 0);
    }

    this.then = (thenCallback, catchCallback) => {
        return new Promise((resolve, reject) => {
            handleThenAndCatch({
                resolve,
                reject,
                thenCallback,
                catchCallback
            });
        });
    }

    this.catch = catchCallback => {
        return new Promise((resolve, reject) => {
            handleThenAndCatch({
                resolve,
                reject,
                catchCallback
            });
        });
    }

    try {
        fn(resolve, reject)
    } catch(err) {
        reject(err);
    }
}