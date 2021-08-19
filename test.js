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