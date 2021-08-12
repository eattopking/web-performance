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