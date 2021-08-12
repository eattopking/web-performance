*** 此文档用于记录面试的问题以及探讨的问题答案

一、箭头函数特性：
    1、没有自己的this，指向外层普通函数的作用域
    2、没有constructor，不能被new操作符当做构造函数调用
    3、不能通过bind，call等绑定this
    4、没有new.target属性，普通函数中，new.target等于undefined
二、instanceof
    A  instanceof B , 检查 B.prototype 是否在 A.__proto__，右边的原型是否在左边的原型链上

三. 跨域请求如何携带cookie

ajax 设置withCredentials: true, set-cookie samesite 属性设置为none


4. 传输大文件的手段

1. 分段传输

2. 通过类似于node中的stream 流的形式传输

3. gzip压缩后传输

4. 通过设置content-type : multipart/form-data, 进行二进制数据传输, 然后在使用像protocal buffer 对二进制进行压缩后在传输