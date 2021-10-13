#!/usr/bin/env node

const process = require('process');

function deepClone(obj) {
    let result = null;
    if (typeof obj !== 'object') {
      if (typeof obj !== 'function') {
        return result;
      } else {
        return obj;
      }
    }

    if (obj === null) {
      return result;
    }

    if (obj instanceof Array) {
      result = [];
      for(let i = 0; i < obj.length; i++) {
        const item = obj[i];
        result[i] = deepClone(item);
      }
    } else if (obj instanceof Set){
      result = new Set();
      obj.forEach((val) => {
        result.add(deepClone(val));
      });
    } else if (obj instanceof Map){
      result = new Map();
      obj.forEach((val, key) => {
        result.set(key, deepClone(val));
      });
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      result = {};
      Objeck.keys(obj).forEach((key) => {
        result[key] = deepClone(obj[obj]);
      });
    }
    return result;
}

let a = [1,2,3];
let b = [];

function add(val) {
  a.push(val);
}

function get() {
  let alen = a.len;
  while(alen) {
    alen--;
    b.push(a.pop());
  }
  const reuslt = b.pop();
  const blen = b.length;
  while(blen) {
    blen--;
    a.push(b.pop());
  }
  return reuslt;
}


function New(fun, ...rest) {
  const obj = Object.create(fun.prototype);
  const scope = fun.apply(obj, rest);

  if (typeof scope === 'object' &&  scope !== null) {
    return scope;
  } else {
    return obj;
  }
}

let demoNode = ({
  tagName: 'ul',
  props: {'class': 'list'},
  children: [
  ({tagName: 'li', children: ['douyin']}),
  ({tagName: 'li', children: ['toutiao']})
  ]
 });
 
<ul class="list">
<li>douyin</li>
<li>toutiao</li>
</ul>

var elem = Element({
tagName: 'ul',
props: {'class': 'list'},
children: [
Element({tagName: 'li', children: ['item1']}),
Element({tagName: 'li', children: ['item2']})
]
});

elem.render();


class Element {
  constructor(options) {
    this.options = options;
  }

  getHtml() {
    const result = '';
    const next = ''
    while(this.options.children) {

    }
  };

  render() {

  }
}


function deep(str, cont) {
  if (!cont) {
    return '';
  }

  if (cont === 1) {
    return str;
  }

  if (cont === 2) {
    return str + str;
  }

  const yun = cont % 2;

  if (!yun) {
    return deep(str, Math.floor(cont / 2)) + str;
  } 
  return deep(str, cont / 2);
}



Function.prototype.call = function(that, ...rest) {
  if (that == null) {
    return this(...rest);
  } else {
    const symbol = Symbol();
    const scope = Object(that);
    scope[symbol] = this;
    const result  = scope[symbol](...rest);
    delete scope[symbol];
    return result;
  }
}


Promise.allSettled = async function(arr) {
    let result = [];
    let flag = 0;
    for(let i = 0; i < arr.length; i++) {
      const promise = Promise.resolve(arr[i]);
      const itemResult = await promise.catch(() => {
        result[i] = {status: 'rejected', reason: err};
        flag++;
        if (flag === arr.length) {
          return result;
        }
      });

      result[i] = {status: 'fulfilled', value: itemResult};
      flag++;
      if (flag === arr.length) {
        return result;
      }
    }
};

function throttle(fun, deley, that) {
  let current = Date.now();
  let prev = null;

  return (...rest) => {
      if (typeof fun === 'function') {
        if (!prev || current - prev > deley) {
          return fun.apply(that, rest);
        }
      }
  }
}

function debounce(fun, delay, that) {
  let timerId = null;
  return (...rest) => {
    clearTimeout(timeerId);
    timerId = setTimeout(() => {
      if (typeof fun === 'function') {
        return fun.apply(that, rest);
      }
    }, delay);
  }
}








class Stack {
  constructor() {
    this.content={val: null, next : null};
    this.last = null;
  }

  get() {
    let result = null;

    let 
    while(true) {

    }
  };

  add(val) {
    this.content.val = val;
    this.content.next = null;
  }

  remove() {
    let curret = this.content;
    
    while(true) {
      const next = curret.next;
      if(this.last === next) {
        this.last = curret;
        curret.next = null;
        return;
      } else {
        curret = next;
      }
    }
  }
}
