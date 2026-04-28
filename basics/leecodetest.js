// flat实现
function flat(arr, num) {
  return num > 0
    ? arr.reduce((result, current) => {
        return result.concat(
          Array.isArray(current) ? flat(current, num - 1) : current,
        );
      }, [])
    : arr;
}

// flat 去重并升序排序

function flat(arr) {
  const isObj = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
  };
  const _flat = (arr) => {
    return arr.reduce((res, cur) => {
      const list = Array.isArray(cur)
        ? _flat(cur)
        : isObj(cur)
          ? flat(Object.values(cur))
          : cur.valueOf();
      return res.concat(list);
    }, []);
  };

  let newArr = _flat(arr);
  newArr = [...new Set(newArr)];
  return newArr.sort((a, b) => a - b);
}

// instanceof
function _instanceof(child, parent) {
  let childProtoType = child.__proto__;
  const parentProtoType = parent.ptotoyype;
  while (childProtoType) {
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
  };
}

// 防抖
function debounce(func, time) {
  let timerId = null;
  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...rest);
    }, time);
  };
}

// call

Function.prototype.call = function (sccpe, ...rest) {
  if (sccpe === null || scope === undefined) {
    return this(...rest);
  }

  scope = Object(scope);
  scope.fn = this;
  const result = scope.fn(...rest);
  Object.deleteProperty(scope, 'fn');
  return result.valueOf();
};

// apply
Function.prototype.apply = function (scope, rest) {
  if (scope === null || scope === undefiend) {
    return this(...rest);
  }

  scope = Object(scope);
  scope.fn = this;
  const result = scope.fn(...rest);
  Object.deleteProperty(scope, 'fn');
  return result.valueOf();
};

// bind
Function.prototype.bind = function (scope, ...rest) {
  return (...params) => {
    if (scope === null || scope === undefiend) {
      return this(...[...rest, ...params]);
    }

    scope = Object(scope);
    scope.fn = this;
    result = scope.fn(...[...rest, ...params]);
    Object.deleteProperty(scope, 'fn');
    return result.valueOf();
  };
};

// 失败重连
function wrongConnect(func, times, delay) {
  return new Promise((resolve, reject) => {
    const callback = () => {
      Promise.resolve(func())
        .then(resolve)
        .catch((err) => {
          if (times > 0) {
            times--;
            setTimeout(callback, delay);
            return;
          }
          reject(err);
        });
    };
    callback();
  });
}
// promise.all \ promise.allSettled

Promise.all = function (arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      throw new Error();
    }

    const result = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((data) => {
          count++;
          result[i] = data;
          if (count === arr.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

Promise.allSettled = function (arr) {
  return new Promise((resolve) => {
    if (!Array.isArray(arr)) {
      throw new Error();
    }

    let result = [];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((data) => {
          count++;
          result[i] = {
            status: 'fulfilled',
            value: data,
          };
          if (count === arr.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          count++;
          result[i] = {
            status: 'rejected',
            reason: err,
          };
          if (count === arr.length) {
            resolve(result);
          }
        });
    }
  });
};

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
  };
}

// 错误并发
async function asyncPool(limit, arr, callback) {
  let result = [];
  let working = [];
  for (let i = 0; i < arr.length; i++) {
    const item = Promise.resolve(callback(arr[i]));
    result.push(item);

    if (arr.length >= limit) {
      const w = item
        .then(() => {
          working.splice(working.indexOf(w), 1);
        })
        .catch(() => {
          working.splice(working.indexOf(w), 1);
        });
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
  const result = fun.apply(that, rest);
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
  };

  removeEvent = (eventName, callback) => {
    if (this.eventList[eventName]) {
      this.eventList[eventName] = this.eventList[eventName].filter(
        (item) => item !== callback,
      );
    }
  };

  emitEvent = (eventName, ...rest) => {
    if (this.eventList[eventName]) {
      this.eventList[eventName].forEach((event) => {
        event && event(...rest);
      });
    }
  };
}

// 数组转树
function arrToTree(arr) {
  const map = new Map();
  let root = null;
  arr.forEach((item) => {
    const { id, name, parentId } = item;
    const treeNode = {
      id,
      name,
    };
    map.set(id, treeNode);
    const parentNode = map.get(parentId);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(treeNode);
    }
    if (parentId === 0) {
      root = treeNode;
    }
  });
  return root;
}

// 树转数组
function treeToArr(root) {
  const nodeAndParetn = new Map();
  const arr = [];
  const queue = [];
  queue.unshift(root);
  while (queue.length) {
    const curNode = queue.pop();
    if (!curNode) {
      break;
    }
    const { id, name, children = [] } = curNode;
    const parentNode = nodeAndParetn.get(curNode);
    const parentId = parentNode?.id || 0;
    const arrItem = { id, name, parentId };
    arr.push(arrItem);
    children.forEach((child) => {
      nodeAndParetn.set(child, curNode);
      queue.unshift(child);
    });
  }

  return arr;
}

// 反转单链表
function reverseList(node) {
  let curNode = undefined;
  let prevNode = undefined;
  let nextNode = node;

  while (nextNode) {
    if (curNode && !prevNode) {
      delete curNode.next;
    }

    if (curNode && prevNode) {
      curNode.next = prevNode;
    }

    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode.next;
  }
  curNode.next = prevNode;

  return curNode;
}

// LRU 缓存实现

class LRU {
    data = new Map();
    constructor(length) {
        if (length < 1) throw new Error('invalid length')
        this.length = length
    }

    set(key, value) {
        const data = this.data

        if (data.has(key)) {
            data.delete(key)
        }
        data.set(key, value)

        if (data.size > this.length) {
            // 如果超出了容量，则删除 Map 最老的元素
            const delKey = data.keys().next().value
            data.delete(delKey)
        }
    }

    get(key) {
        const data = this.data

        if (!data.has(key)) return null

        const value = data.get(key)

        data.delete(key)
        data.set(key, value)

        return value
    }
}

// 请实现一个 Scheduler 类，包含一个 add 方法。 add 接收一个返回 Promise 的任务生成函数。 无论 add 被调用多少次，同一时刻正在执行的任务数量不能超过 max（比如 2）。 当有任务完成时，自动从等待队列中取出下一个任务执行。”
class Scheduler {
  constructor(max) {
    // ...
  }
  add(task) {
    // ...
  }
}

// 测试用例
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));
const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// 期望输出顺序：2, 3, 1, 4
// 解释：
// 一开始 1, 2 进入执行。
// 500ms后，2 完成，输出 '2'。任务 3 补位。
// 800ms后，3 完成，输出 '3'。任务 4 补位。
// 1000ms后，1 完成，输出 '1'。
// 1200ms后，4 完成，输出 '4'。

class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }
  async add(task) {
    if (this.count >= this.max) {
      await new Promise((resolve) => {
        this.queue.unshift(resolve);
      });
    }

    this.count++;
    const result = await task();
    this.count--;

    if (this.queue.length) {
      const resolve = this.queue.pop();
      resolve();
    }
    return result;
  }
}

// 简版深拷贝
let deepcopy = (obj) => {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }
  const isObj = () => Object.prototype.toString().slice(-8, 1) === 'object';
  if (isObj(obj)) {
    let newData = {};
    let keys = Object.keys(obj);
    for (let key of keys) {
      newData[key] = deepcopy(obj[key]);
    }
    return newData;
  }

  if (Array.isArray(obj)) {
    let newArr = [];
    newArr = obj.reduce((result, cur) => {
      return result.push(deepcopy(cur));
    }, []);
    return newArr;
  }
};

let obj = { b: 1, c: { d: 9 }, d: [1, 3, 4, { f: [] }] };

console.log(deepcopy(obj));

// 将0移动到数组末尾，如输入[1, 0, 3, 0, 11, 0]，输出[1, 3, 11, 0, 0, 0]
function moveZero(arr) {
  let curZeroIndex = null;
  arr.forEach((item, index) => {
    if (item === 0 && curZeroIndex === null) {
      curZeroIndex = index;
    } else if (item !== 0 && curZeroIndex !== null) {
      arr[curZeroIndex] = item;
      arr[index] = 0;
      curZeroIndex = index;
    }
  });
  return arr;
}

console.log(moveZero([1, 0, 3, 0, 11, 0]));
