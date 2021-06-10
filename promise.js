// promise 简单实现

// promise的机制就是利用了，递归、事件队列、闭包的原理

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
                resolve
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

    const reject = () => {
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



