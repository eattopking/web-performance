
// flat实现
function flat(arr, num) {
    return num > 0 ? arr.reduce((result, current) => {
        return result.concat(Array.isArray(current) ? flat(current, num - 1) : current);
    }, []) : arr;
}

// flat 去重并升序排序

function flat(arr) {
    const isObj = (obj) => {
        return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
    };
    const _flat = (arr) => {
        return arr.reduce((res, cur) => {
            const list = Array.isArray(cur) ? _flat(cur) : isObj(cur) ? flat(Object.values(cur)) : cur.valueOf();
            return res.concat(list);
        }, []);
    }

    let newArr = _flat(arr);
    newArr = [...new Set(newArr)];
    return newArr.sort((a, b) => a - b);
}

// instanceof 
function _instanceof(child, parent) {
    let childProtoType = child.__proto__;
    const  parentProtoType = parent.ptotoyype;
    while(childProtoType) {
        if (childProtoType === parentProtoType) {
            return true;
        } else {
            childProtoType = childProtoType.__proto__;
        }
    }
    return false;
}

// 截流

function throttle(func, time) {
    let prev = null;
    return (...rest) => {
        const now = Date.now();
        if (!prev || now - prev > time) {
            prev = now;
            func(...rest);
        }
    }
}

// 防抖
function debounce(func, time) {
    let timerId = null;
    return (...rest) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...rest);
        }, time);
    }
}

// call

Function.prototype.call = function(sccpe, ...rest) {
    if (sccpe === null || scope === undefined) {
        return this(...rest);
    }

    scope = Object(scope);
    scope.fn = this;
    const result =  scope.fn(...rest);
    Object.deleteProperty(scope, 'fn');
    return result.valueOf();

}

// apply 
Function.prototype.apply = function(scope, rest) {
    if (scope === null || scope === undefiend) {
        return this(...rest)
    }

    scope = Object(scope);
    scope.fn = this;
    const result = scope.fn(...rest);
    Object.deleteProperty(scope, 'fn');
    return result.valueOf();
}

// bind
Function.prototype.bind = function(scope, ...rest) {
    return (...params) => {
        if (scope === null || scope === undefiend) {
            return this(...[...rest, ...params]);
        }

        scope = Object(scope);
        scope.fn = this;
        result = scope.fn(...[...rest, ...params]);
        Object.deleteProperty(scope, 'fn');
        return result.valueOf();
    }
}

// 失败重连
function wrongConnect(func, times, delay) {
    return new Promise((resolve, reject) => {
        const callback = () => {
            Promise.resolve(func()).then(resolve).catch((err) => {
                if (times > 0) {
                    times--;
                    setTimeout(callback, delay);
                    return;
                }
                reject(err);
            });
        }
        callback();
    });
}
// promise.all \ promise.allSettled

Promise.all = function(arr) {
    if (!Array.isArray(arr)) {
        throw new Error();
    }

    const result = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then((data) => {
                count++
                result[i] = data;
                if (count === arr.length) {
                    resolve(result);
                }
            }).catch((err) => {
                reject(err);
            });
        }
    });
}

Promise.allSettled = function(arr) {
    return new Promise((resolve) => {
        if (!Array.isArray(arr)) {
            throw new Error();
        }

        let result = [];
        let count = 0;

        for(let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then((data) => {
                count++;
                result[i] = {
                    status: 'fulfilled',
                    value: data
                };
                if (count === arr.length) {
                    resolve(result);
                }
            }).catch((err) => {
                count++;
                result[i] = {
                    status: 'rejected',
                    reason: err
                };
                if (count === arr.length) {
                    resolve(result);
                }
            })
        }
    });
}

// promisify

function promisify(orginFun) {
    return (...rest) => {
        return new Promise((resolve, reject) => {
            rest.push((err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                }
            });
            orginFun.apply(null, rest);
        });
    }
}

// 错误并发
async function asyncPool(limit, arr, callback) {
    let result = [];
    let working = [];
    for(let i = 0; i < arr.length; i++) {
        const item = Promise.resolve(callback(arr[i]));
        result.push(item);

        if (arr.length >= limit) {
            const w = item.then(() => {
                working.splice(working.indexOf(w), 1);
            }).catch(() => {
                working.splice(working.indexOf(w), 1);
            })
            working.push(w);
            if (working.length >= limit) {
                await Promise.rece(working);
            }
        }
    }
    return Promise.allSettled(result);
}

// new 实现
function myNew(fun, ...rest) {
    const that = Object.create(fun.prototype);
    const result = fun.apply(that, rest)
    const type = typeof result;
    if ((type === 'object' && result !== null) || type == 'function') {
        return result;
    }

    return that;
}

// 观察者模式

class Event {
    eventList = {};

    addEvent = (eventName, callback) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName].push(callback);
        } else {
            this.eventList[eventName] = [callback];
        }
    }

    removeEvent = (eventName, callback) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName] = this.eventList[eventName].filter((item) => item !== callback);
        }
    }

    emitEvent = (eventName, ...rest) => {
        if (this.eventList[eventName]) {
            this.eventList[eventName].forEach((event) => {
                event && event(...rest);
            });
        }
    }
}