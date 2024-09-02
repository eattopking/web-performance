//一、 运算符验证
var c = {
    a: {
        a: '1',
        c: '2',
        f: '6'
    }
};
// 非空运算符
var a = '11q';
a.length; // !表示a不可能是undefined和null
// 二、关键字验证
// 联合类型形式的key遍历 keyof， 遍历关键字，in，获取整体的类型结构 typeof
var obj = { a: 1, b: '2' };
// 代码中in 关键字 判断是否在包含对应字段
var obj1 = { test: 1111 };
console.log('test' in obj1);
