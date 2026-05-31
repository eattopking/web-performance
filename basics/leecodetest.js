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

// 反转单链表1
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
// 解法二
function reverseList(li) {
  let queue = [];
  let cur = li;
  while (cur) {
    queue.push(cur.val);
    cur = cur.next;
  }

  let head = null;

  while (queue.length > 0) {
    const val = queue.shift();
    const newNode = {
      val,
      next: head,
    };
    head = newNode;
  }

  return head;
}

// let a = {
//   val: 1,
//   next: {
//     val: 2,
//     next: {
//       val: 3,
//       next: null
//     }
//   }
// }

// let f = reverseList(a)
// console.log(f)

// LRU 缓存实现

class LRU {
  data = new Map();
  constructor(length) {
    if (length < 1) throw new Error('invalid length');
    this.length = length;
  }

  set(key, value) {
    const data = this.data;

    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    if (data.size > this.length) {
      // 如果超出了容量，则删除 Map 最老的元素
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const data = this.data;

    if (!data.has(key)) return null;

    const value = data.get(key);

    data.delete(key);
    data.set(key, value);

    return value;
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
  const isObj = (o) =>
    Object.prototype.toString.call(o).slice(-8, 1) === 'object';
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

// 最大回文子串 回文数分为两种aba、c(奇数)  abba、bb(偶数)
const childSum = (s) => {
  let startIndex = 0;
  let maxLen = 1;
  for (let i = 0; i < s.length; i++) {
    let left1 = i;
    let right1 = i;

    while (left1 >= 0 && right1 < s.length && s[left1] === s[right1]) {
      const len = right1 - left1 + 1;
      if (len > maxLen) {
        maxLen = len;
        startIndex = left1;
      }
      left1--;
      right1++;
    }
    let left2 = i;
    let right2 = i + 1;
    while (left2 >= 0 && right2 < s.length && s[left2] === s[right2]) {
      const len = right2 - left2 + 1;
      if (len > maxLen) {
        maxLen = len;
        startIndex = left2;
      }
      left2--;
      right2++;
    }
  }

  return s.substring(startIndex, startIndex + maxLen);
};

// 链表相加
// 算法题:两个很大的数用单向链表表示，链表的每个节点表示数的每一位，例如1->2->3表示整数123，7->8->9->5表示整数7895。把这两个数相加，相加结果也用链表表示。

const addTwoNumbers = (l1, l2) => {
  const stack1 = [];
  const stack2 = [];

  let cur1 = l1;
  while (cur1) {
    stack1.push(cur1.val);
    cur1 = l1.next;
  }

  let cur2 = l2;
  while (cur2) {
    stack2.push(cur2.val);
    cur2 = l2.next;
  }

  let carry = 0;
  let head = null;

  while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
    const val1 = stack1.length > 0 ? stack1.pop() : 0;
    const val2 = stack2.length > 0 ? stack2.pop() : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    const val = sum % 10;

    const newNode = {
      val,
      next: head,
    };

    head = newNode;
  }

  return head;
};

// 合并数组

const mergeArr = (arr1, arr2) => {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    const val1 = arr1[i];
    const val2 = arr2[j];

    if (val1 < val2) {
      result.push(val1);
      i++;
    } else {
      result.push(val2);
      j++;
    }
  }

  if (i < arr1.length) {
    result.push(...arr1.slice(i));
  }

  if (j < arr2.length) {
    result.push(...arr2.slice(j));
  }

  return result;
};

// console.log(mergeArr([1,3,4], [1,2,5]))

// 求二叉搜索树的第k小值
const getNum = (tree, count) => {
  const arr = [];
  const getSortList = (node) => {
    if (node === null) return;
    getSortList(node.left);
    arr.push(node.value);
    getSortList(node.right);
  };
  getSortList(tree);
  return arr[count - 1];
};
// const tree = {
//     value: 5,
//     left: {
//         value: 3,
//         left: {
//             value: 2,
//             left: null,
//             right: null
//         },
//         right: {
//             value: 4,
//             left: null,
//             right: null,
//         }
//     },
//     right: {
//         value: 7,
//         left: {
//             value: 6,
//             left: null,
//             right: null
//         },
//         right: {
//             value: 8,
//             left: null,
//             right: null
//         }
//     }
// }

// console.log(getNum(tree, 3))

// 斐波那契数列的两种算法 核心就是索引和数值已经关联上了

function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let n1 = 1;
  let n2 = 0;
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = n1 + n2;
    n2 = n1;
    n1 = res;
  }

  return res;
}

// console.log(fib(6))

// 青蛙跳台阶有几种方式
const numWays = function (n) {
  if (n === 0) return 1;
  let arr = [null, 1, 2];
  for (let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 1000000007;
  }
  return arr[n];
};
// console.log(numWays(4))

// 字符串中连续最多的字符，以及次数

const getNumAndStr = (str) => {
  let res = {
    str: 0,
    len: 0,
  };
  if (str.length === 0) return res;
  let maxLen = 0;
  let i = 0;
  let j = 0;
  for (; i < str.length; i++) {
    if (str[i] === str[j]) {
      maxLen++;
    }

    if (str[i] !== str[j] || i === str.length - 1) {
      if (maxLen > res.len) {
        res.len = maxLen;
        res.str = str[j];
      }
      maxLen = 0;

      if (i < str.length - 1) {
        j = i;
        i--;
      }
    }
  }
  return res;
};

// const str = 'aabbcccddeeee11223'
// console.log(getNumAndStr(str))

// 数组快速排序

const fastSort = (arr) => {
  if (arr.length === 0) return arr;
  const mIndex = Math.floor(arr.length / 2);
  const mVal = arr[mIndex];

  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== mIndex) {
      if (arr[i] < mVal) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  }

  return fastSort(left).concat([mVal], fastSort(right));
};

// 用JS实现数字千分位格式化
const format = (str) => {
  const arr = str.split('').reverse();
  return arr.reduce((result, cur, index) => {
    if (index % 3 === 0) {
      if (result) {
        return `${cur},${result}`;
      } else {
        return cur;
      }
    }
    return cur + result;
  }, '');
};

// 获取求1-10000之间的所有对称数（回文）

const getArr = (num) => {
  const result = [];
  for (let i = i; i <= num; i++) {
    const str = i.toString();
    if (str === str.split('').reverse().join()) {
      result.push(i);
    }
  }

  return result;
};

// 把一个数组旋转k步
const moveArr = (arr, k) => {
  if (!k) return arr;
  const num = Math.abs(k % arr.length);
  const haed = arr.slice(-num);
  const end = arr.slice(0, arr.length - num);
  return haed.concat(end);
};

// 判断一个字符串是否括号匹配

const isMatchStr = (str) => {
  const stack = [];
  const leftStr = '({[';
  const rightStr = ')}]';
  const isMatch = (l, r) => {
    if (l === '(' && r === ')') return true;
    if (l === '[' && r === ']') return true;
    if (l === '{' && r === '}') return true;
    return false;
  };
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (leftStr.includes(s)) {
      stack.push(s);
    } else if (rightStr.includes(s)) {
      if ((isMatch(stack[stack.length - 1]), s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

// 如何用两个栈实现个队列

class Queue {
  stack1 = [];
  stack2 = [];
  add(val) {
    this.stack1.push(val);
  }

  delete() {
    let res;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    while (stack1.length) {
      const val = stack1.pop();
      if (val != null) {
        stack2.push(val);
      }
    }

    res = stack2.pop();

    while (stack2.length) {
      const val = stack2.pop();
      if (val != null) {
        stack1.push(val);
      }
    }

    return res;
  }

  length() {
    return this.stack1.length;
  }
}

// curry 实现

function curry(fn) {
  const len = fn.length;
  let args = [];

  function calc(...rest) {
    args = [...args, ...rest];

    if (args.length < len) {
      return calc;
    } else {
      return fn.apply(null, args.slice(0, len));
    }
  }
  return calc;
}

// 二分查找

const find = (arr, target) => {
  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {
    const mIndex = Math.floor((startIndex + endIndex) / 2);
    const mVal = arr[mIndex];

    if (mVal < target) {
      startIndex = mIndex + 1;
    } else if (mVal > target) {
      endIndex = mIndex - 1;
    } else {
      return mIndex;
    }
  }
  return -1;
};

// 找出一个数组中和为n的两个数
const findNum = (arr, n) => {
  const res = [];
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    const n1 = arr[i];
    const n2 = arr[j];
    const sum = n1 + n2;
    if (sum > n) {
      j--;
    } else if (sum < n) {
      i++;
    } else {
      res.push(n1);
      res.push(n2);
      return res;
    }
  }
  return res;
};

// 给定一个二叉树和一个给定值，要求找到和为给定值的全部路径

const getPath = (tree, sum) => {
  const result = [];
  const callback = (node, sum, path) => {
    if (!node) return;
    path.push(node.val);
    if (!node.left && node.right && sum === node.val) {
      result.push([...path]);
    }
    callback(node.left, sum - node.val, path);
    callback(node.right, sum - node.val, path);
    path.pop();
  };

  callback(tree, sum, []);
  return result;
};

// 给定一个整数数组，判断是否存在重复元素。如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
const sameNum = (arr) => {
  if (!arr.length) return false;
  const map = new Map();
  for (let item of arr) {
    if (map.has(item)) {
      return true;
    }
    map.set(item, 1);
  }
  return false;
};

// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
const onlyStr = (str) => {
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }

  for (let j = 0; j < str.length; j++) {
    const item = str[i];
    if (map.get(item) === 1) {
      return j;
    }
  }

  return -1;
};

// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。你可以假设数组是非空的，并且给定的数组总是存在多数元素。
const moreItem = (arr) => {
  const map = new Map();
  for(let item of arr) {
    if (map.has(map)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  for(let [key, value] of map) {
    if (value > arr.length / 2) {
      return key;
    }
  }
}

// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

const onlyNum = (arr) => {
  const map = new Map();
  for(let item of arr) {
    if (map.has(item)) {
      map.set(item, map.get(map) + 1);
    } else {
      map.set(item, 1);
    }
  }
  for(let [key, value] of map) {
    if (value === 1) {
      return key;
    }
  }
}

// 两个数组的交集 Ⅱ (给定两个数组，编写一个函数来计算它们的交集)
const intersect = (arr1, arr2) => {
  const map = new Map();
  const result = [];
  for (let n of arr1) {
    if (map.has(n)) {
      map.set(n, map.get(n) + 1);
    } else {
      map.set(n, 1)
    }
  }

  for(let n of arr2) {
    if (map.has(n)) {
      map.push(n);
      map.set(n, map.get(n) - 1);
    }
  }
  return result;
}