## 对http的一些理解
磁盘包括硬盘和软盘（就是光盘）， 断电不会清空数据

内存包括断电会清空数据


### 一. 零散知识点理解

2. location的host就是当前地址栏中的host
3. http 报文头， 分为通用报头（请求和响应都能用的）， 请求报头（只有请求能用的），实体报头（用来描述请求实体或者响应实体的）
4. accept 表示客户端希望得到的数据类型， 就是客户端能处理的数据类型， content-type是一个实体头可以描述请求实体也可以描述响应实体，
它表示客户端或者服务端发送的实体的数据类型

5. host 、referer、origin 的区别

域名就是表示ip地址

host 就是请求的nginx服务器需要匹配的虚拟主机 server_name, 匹配上了对应的虚拟主机， 就去请求这个服务

origin 表示请求从哪个页面发出去的，跨域的时候就是发出跨域请求的这个页面的协议+域名+端口，如果没有端口，那就是默认端口， 同源的请求就是发送请求页面的：协议+域名+端口，只有在跨域请求和同源到post请求才携带origin字段, 当请求满足post或者跨域请求时， 但是此时获取不到发出请求的页面的：协议+域名+端口， 此时origin是null， 比如从一个新页签直接请求页面的时候， 如果满足post那么origin有，但是是null

referer 表示通过链接跳转到当前页面的前一个页面的地址栏中的完整请求路径, 或者在一个页面跨域请求其他域名时，当前页面的完整请求路径，包括协议 + 域名 + 端口 + 查询字符串（不包括hash部分）, 如果没有跳转操作或者跨域请求那么referer字段就没有

在js中document.referer 和 referer表示的相同



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

// 简单jsonp实现
const jsonp(url, callback) {
    const script = document.createElement('script);
    const id = Date.now();
    const callbackName = id + 'callback';
    script.src = `${url}?callback=${callbackName}`;
    window[callbackName] = callback;
    document.body.appendChild(script);
}

2. Nginx处理, 在请求中添加标识字段, 然后Nginx识别， 进行代理转发，代理到目标服务器， 然后目标服务器返回数据， 最后浏览器获取到的数据是目标服务器的数据

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
 12. cookies是存储在硬盘中的


 浏览器查找缓存的顺序是: service worker、memory cache、disk cache、push cache


### http 的理解和面试

https协议的版本和差别和特点

1. 首先http协议是一个无状态协议
2. http的起源是http0.9和https1.0，一开始http协议非常的简单1.0版本只有get、post、head三种请求方法， 没有默认开启TCP的长连接

3. http协议一次比较大的更新是1.1版本的诞生，1.1版本在请求方法上增加了五种，分别是 put，options（options请求就是cors的预请求的请求方式）、delete、trace、connect, 新增的这五种请求方式，除了跨域的时候浏览器自动发起options预请求，其他的四种请求方法在平时比较少用

4. http1.1 除了在请求方法方面增加了五种， 还添加了比较重要的host请求头， 在http1.0的时候请求访问同一个ip同一个端口只能访问一个服务，但是随着虚拟服务的出现，在一台物理服务器上可以设置多个虚拟服务，这时客户端在请求虚拟服务时就需要添加一个请求标识，host字段就是我们请求的标识（一般就是域名）

5. 由于我们的http协议是无状态协议， 所以通信之前都需要建立tcp连接， 这个过程是比较耗时的， 但是在http1.0的时候没有默认开启TCP长连接这种机制， 所以性能比较低， 在http1.1的时候将默认开启了TCP长连接，避免了每次通信之前都需要重新建立连接， 提高了性能（Connection: keep-alive）,http1.1默认开启长连接， 因为还有情况不需要开始长连接，比如： 客户端和服务端需要频繁通信的情况，如果每次都重新建立TCP连接那么将会非常的耗时，保持长连接提高了性能， 但是也不是所以的时候都要保持长连接，在通信不频繁的时候还是要断开连接， 因为每一个连接服务端都需要一个线程去处理，如果这样没要的长连接多了也是占用服务端线程的影响服务端的性能，但是如果真的通信频繁需要保持长连接， 那么服务端也可以通过微服务来提高服务端性能

6. tcp三次握手和四次挥手

7. http常见的状态码 200 响应成功并返回响应数据， 204 响应成功，没有返回响应数据， 206响应成功， 分段响应数据， 会返回响应数据的大小，301 永久重定向 302 暂时重定向  304 协商缓存状态码  404没有发现请求的资源  500 服务端错误

8. http 缓存分为两种， 一种是强缓存， 为什么叫强缓存呢，就是强制缓存的意思，强制缓存也分两种形式，一种是第一次请求资源时， 通过在响应头上添加expires: 资源的有效期，下次请求时在请求头上也添加上expires字段用于判断资源有没有过期（但是这个时间只能精确到秒），第二种在请求资源的时候在响应头添加cache-control：max-age=10000: 资源的有效时长, 单位是秒, max-age=0和no-cache是一样的就是没有强缓存，再请求头上会加上cache-control字段，如果cache-control和expires字段同时存在，那以cache-control字段的设置为准

expires和cache-control比较， expires没有cache-control靠谱， 因为expires返回的时服务器时间，可能和本地事件有很大的偏差，导致缓存出现问题， 而cache-control是一个时间段，本地时间是啥都无所谓

强缓存的不会发请求， 返回的状态码是200

9. 第二种协商缓存，协商缓存是在没有设置强缓存的情况下才会去触发，强缓存和协商缓存取的数据是一个都存在硬盘中, 协商缓存也包括两种，第一种是响应头返回last-modified字段包含文件最后修改日期，如果触发协商缓存机制，那就会在下一次请求的请求头上加上if-modified-since携带上文件的最后修改时间，去和服务端的文件最后修改时间比较，如果没有改变说明可以使用缓存，但是这样的比较是有问题，因为有的文件在服务端会定期更新，并且时间修改时间在秒以内，这就不会认为发生改变，或者服务端文件内容没有改变，但是文件最后修改时间变了，
第二种是响应头返回Etag字段，值是文件的唯一标识， 这个标识根据文件内容生成，文件内容改变这个标识也就改变, 第二次请求时请求头上带着if-none-match字段， 值就是文件的标识， 服务器会将请求的发过来文件标识和服务器中存储的文件标识做比对，如果没有改变说明可以使用缓存


10. 下一次请求时，如果last-modified和Etag都存在，需要if-modified-since和if-none-match携带的信息和服务器中保存的信息都相同这个是时候才能认为协商缓存还在有效， 直接返回304状态码， 使用本地缓存数据

11. 协商缓存生效时返回304状态码， 强缓存生效时返回200状态码

12. 强刷浏览器协商缓存机制和强缓存机制都失效了，缓存数据还在， 重新请求数据会把原来的缓存数据替换掉

13. F5刷新,强缓存机制和协商缓存机制还有效， 缓存还存在硬盘中， 刷新的时候浏览器线程强缓存和协商缓存还在，如果文件在内存中存在就直接从内存中取， 如果内存中没有那就取硬盘中的， 刷新不会清空内存中的缓存，关闭页签会清空内存中的缓存

14. 其他操作浏览器的情况， http强缓存机制和协商缓存机制都生效

15. form memory cache 是存储在内存中的缓存数据, 存储在内存是存在浏览器线程的内存中
16. form disk cache 是存储在硬盘中的缓存数据

17. 强缓存和协商缓存首先将数据缓存在硬盘中， 然后js和图片解析执行后还会存在浏览器线程内存中一份，取的时候首先取内存中的， 内存中没有了，再取硬盘中的， css执行后不会存在内存中存一份，只有最初缓存的时候存在硬盘中一份

18. html不能缓存， 因为html名字需要固定， 不能每次请求页面都带上html的文件的完成名称， 所以html需要是固定名字，这样在nginx中才能匹配到对应的html文件, 所以一般http缓存的资源都是 图片、css 和js文件

### 三次握手和四次分手

三次握手就是建立连接: 首先也客户端给服务端发送请求， 服务端收到请求， 确认可以接受到服务端的请求，2. 然后服务端给客户端再发送一个请求验证客户端是否可以接收到服务端的响应，客户端接收到服务端的响应说明接收响应没问题， 3. 然后客户端在给服务端发送一个请求告诉服务端我可以接收响应， 服务端接收到这个请求，知道了客户端可以接收到请求， 建立连接

四次分手包括停止发送请求， 和断开连接

1. 客户端发请求给服务器， 告诉服务器，我不在发请求了
2. 服务端接收到客户端的请求之后， 给客户端发消息我确认你不再发了
3. 服务端在准备好关闭连接的时候,给客户端发消息高度客户端我要关闭连接了
4. 客户端收到服务端的请求， 然后响应确认包给服务端服务端确认断开，这个时候客户端进入等待状态,因为这个时候服务端可能要求客户端重发确认包（ACK）， 如果一段时间内，没有要求重发确认包(ACK)， 那么客户端认为服务端已经关闭连接，所以客户端也关闭连接


### 浏览器本地存储

cookie和sessionStorage 是存在内存中的， cookie退出浏览器会被删除， sessionStorage关闭页签就会被删除

localStorage， 退出浏览器或者是卸载浏览器，还有重启电脑都不会被删除， 因为localStorage是存在硬盘中的

indexDB是浏览器提供的本地数据库，也是存在硬盘中，存储的数据更大，是非关系型数据库，就是不能用sql查询

webSQL 也是浏览器提供的本地数据库， 也是存在硬盘中，存储的数据更大，是关系型数据库， 可以使用sql查询数据

### Charls 实用使用


1. 使用charls将手机代理到电脑上, 就是将手机的请求通过代理利用电脑本地的ip和环境, 去进行请求, 将请求到的结果在返回给手机, 然后charls抓到的手机的请求也是以电脑为载体, 以电脑的ip和环境发的请求

2. ![charls将请求的资源代理为本地的资源用于调试](../images/charls1.png);
3. [charls激活账号](https://zhuanlan.zhihu.com/p/72138226);
4. [charls pc 代理抓包和手机代理代理抓包的方式](https://www.jianshu.com/p/4e748e481a1a)
4. [charls 设置https抓包](https://juejin.cn/post/6844904128104103943)
移动端抓包一定要先手动代理配置成pc端的ip, 然后在安装移动端证书, 然后在charls中点击允许就可以抓包移动端和代理移动端了

移动端抓包就是手机的手动代理端口设置为8888, charls也需要将端口设置为8888



puppeteer 可以爬虫、自动化测试

pyppeteer python 爬虫、自动化测试

爬虫相关

爬虫流程 发起请求（控制器）-》获取请求资源（解析器）-》存储爬到的数据

robots.txt协议格式

User-agent: Baiduspider
Disallow: /baidu
Disallow: /s?
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Googlebot
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: MSNBot
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Baiduspider-image
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: YoudaoBot
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou web spider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou inst spider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou spider2
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou blog
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou News Spider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sogou Orion spider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: ChinasoSpider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: Sosospider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh


User-agent: yisouspider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: EasouSpider
Disallow: /baidu
Disallow: /s?
Disallow: /shifen/
Disallow: /homepage/
Disallow: /cpro
Disallow: /ulink?
Disallow: /link?
Disallow: /home/news/data/
Disallow: /bh

User-agent: *
Disallow: /