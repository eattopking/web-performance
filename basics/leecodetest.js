
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
        arr.reduce((res, cur) => {
            const list = Array.isArray(cur) ? _flat(cur) : isObj(cur) ? flat(Object.values(cur)) : cur.valueOf();
            return res.concat(list);
        }, []);
    }

    let newArr = _flat(arr);
    newArr = [...new Set(newArr)];
    return newArr.sort((a, b) => a - b);
}

// instanceof 

