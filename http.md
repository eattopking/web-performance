## 对http的一些理解

### 一. 零散知识点理解

1. http的host  就是当前请求的域名
2. location的host就是当前地址栏中的host
3. http 报文头， 分为通用报头（请求和响应都能用的）， 请求报头（只有请求能用的），实体报头（用来描述请求实体或者响应实体的）
4. accept 表示客户端希望得到的数据类型， 就是客户端能处理的数据类型， content-type是一个实体头可以描述请求实体也可以描述响应实体，
它表示客户端或者服务端发送的实体的数据类型

5. host 、referer、origin 的区别

域名就是表示ip地址

host是将要请求的 域名 + 端口， 也可以就表示域名

origin 是用来表示请求是从哪个源发送的， 包括协议+域名

referer 表示发送请求的源, 原始的URI, 包括协议 + 域名 + 端口 + 查询字符串（不包括hash部分）



### 二. 请求跨域的理解
1. 同源策略是限制谁的？？？？

同源策略是浏览器对请求和一些东西的限制, 和服务端没有任何关系
(浏览器限制从脚本内发起的跨源HTTP请求)
同源策略限制内容有：

Cookie、LocalStorage、IndexedDB 等存储性内容
DOM 节点
AJAX请求

2. 同源策略的含义

同源策略的意思是, 当请求时请求的url地址, 与地址栏中的地址的协议, 域名, 端口这三者中有一个不同, 那么这次请求就是跨域了,
跨域请求时浏览器是可以向服务端发出请求的, 但是服务端返回的数据, 会被浏览器拦截, 认为不安全, 所以不会被浏览器响应, 所以同源策略就是浏览器自身的一种安全机制

3. 常见的跨域请求解决方案

1. 使用浏览器默认支持跨域的标签, 和后端配合实现跨域, (script标签实现的jsonp就是这个原理), 其他支持跨域的标签还有(img, link);

2. 纯后端处理, 在请求中添加标识字段, 然后后端识别， 在后端进行代理转发， 就是后端当做代理服务器， 然后直接请求真正的数据服务器， 因为后端是没有同源策略限制的，然后代理服务器在把数据返回给浏览器

3. 使用cors(跨域资源共享， 这里浏览器自身提供的一种跨域的机制)实现跨域, 使用cors不仅表示了客户端的权限，也表示了服务端的权限， 服务端允许访问（到这可以实现简单请求）， 并且客户端正式请求的请求头， 服务端都允许， 这样才能发送复杂请求


cors 分为两种： 简单请求、复杂请求

简单请求的标准：
    1. 请求的方法只能是post、get、HEAD
    2. 请求头只能包含在以下这些之中:
        accept(客户端能处理的数据类型)、
        Accept-Language、
        Content-Language、
        Last-Event-ID、
        content-type,
        并且content-type只能是以下几种类型:text/plain、multipart/form-data、application/x-www-form-urlencoded

复杂请求的标准：

    不满足简单请求标准的的就是复杂请求

简单请求和复杂请求的区别：

    1. 两者的标准不同

    2. 发送请求次数不同， 简单请求只发送一次请求， 复杂请求发送两次请求， 浏览器会先自动发送一个options的预请求，
    携带上正式请求的头部去和服务器确认， 如果服务器返回同意这些头部字段， 那浏览器就会发送正式的请求，然后服务器返回数据，浏览器响应解析数据

什么时候会触发cors：

    使用完整的跨域url进行ajax请求， 就是触发cors跨域了

简单请求成功的标准：

    响应头Access-Control-Allow-Origin: 这个字段的值包含当前地址栏中的协议+host（就是包括当前源），这就是表示服务端允许访问了，也表示浏览器看到这个响应头就知道了这个响应是安全的，就会去响应了

复杂请求成功的标准：

    预请求响应头Access-Control-Allow-Origin: 这个字段的值包含当前地址栏中的协议+host（就是包括当前源），表示服务端允许访问了

    预请求的特殊请求头：
        orign: 当前发送跨域请求时， 所在的源（就是地址栏中的协议+host，orign只有在cors跨域的时候才会使用
        Access-Control-Request-Method: POST (正式请求时使用的方法)
        Access-Control-Request-Headers: X-PINGOTHER, Content-Type （正式请求时将携带的请求头， 然后响应返回允许这些请求头， 才可以发送正式请求）

    预请求的特殊响应头：
        Access-Control-allow-origin: http//baidu.com  (表示服务端允许发起跨域请求的源， 如果我们的源包含在这里面才可以发送正式的请求)
        Access-Control-allow-Method: POST(正式请求时允许使用的方法，当正式请求的方法包含在其中时， 才能发起真是的请求)
        Access-Control-allow-Headers: X-PINGOTHER, Content-Type (正式请求时允许允许携带的请求头， 当正式请求的请求头包含这里面时， 才能发送正式请求)

        这三个响应头都满足了，就可以发送正式的请求了，可以发送正式请求就代表可以发送复杂请求了， 可以进行跨域了

### 三. token是什么

    token 称为jwt （json+web+token）

    token就是登录成功之后， 后端在响应体里面返回的，一个字符串， 这个字符串在响应体中对应的key，是前后端商量好的一个字段(不是必须叫token， 也可以叫token1 等等)， token也是起到验证的作用， 登录成功后的接口请求，必须带上token， 否则无法请求。

    token的组成：头部+有效载荷+签名，token是用.分割的字符串

### token和cookie的区别
 1. token是服务端在响应体数据中， 返回给客户端的， 而cookie是服务端在响应头返回给客户端的
 2. token需要前端开发在请求时在请求头上手动添加， 而cookie是在请求时，浏览器自动添加到请求头

 ### token和cookie的相同点

 1. 都是字符串

 ### 四 cookie的理解

 1. cookie是浏览器提供的一种在本地存储数据的方式
 2. 前端想要设置和读取cookie值， 需要通过document.cookie操作
 3. 前端想要对已有cookie进行取值和修改， 需要cookie没有设置httpOnly， httpOnly只有服务端在
 Response header 中通过Set-Cookie设置cookie时，才能设置到cookie上， 前端通过document.cookie
 创建cookie时不能设置这个属性
 4. 请求携带cookie时， 只能携带同源的cookie，和源为请求域名的父级域名的cookie
 5. 前端通过document.cookie设置cookie时和获取cookie时都是字符串， 设置cookie时是设置cookie中的一个值， 获取cookie时是获取所有cookie的值
 6. document.cookie获取的是"name=value;name=value;"的集合组成的字符串
 7. document.cookie设置一个cookie， 是通过一个字符串设置，形如：document.cookie='myname=huaminlai;path=/;domain=.google.com;expires=Feb,13-Mar-2018 11:47:50;secure';
 8. myname=huaminlai 表示name和value，path表示cookie在它作用的源的哪些文件路径下可以被携带，/表示所有路径，domain表示cookie作用的源域名，就是在这个域名下或者这个域名的子域名下，这个cookie请求时才能被携带，通过document.cookie获取时，才能生效, secure设置后表示只有请求时https或者时ssl加密的情况下，这个cookie在请求时才能携带, Expires表示cookie的过期时间， 设置的日期格式必须是GMT格式的
 9. 跨域的时候携带cookie， 只能携带源为自己请求域名或者请求的域名的上级域名
 10. 请求时cookie就是请求头上的一个字段， ajax不能自定义cookie这个请求头， 这个行为是被禁止的
 11. cors跨域携带cookie的是问题， 需要在ajax 中配置withCredentials为true， 让cors跨域的时候，能携带上cookie值
