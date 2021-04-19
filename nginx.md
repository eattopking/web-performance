# Nginx总结

### Nginx 是什么

nginx是一个可以跨平台的， web服务器程序(提供了nginx服务执行环境，可以执行nginx配置文件起nginx服务), 起nginx服务就是起一个后端服务的程序（就和我们用node写一个http服务监听，然后node 执行这个服务，服务起来后， 然后客户端去访问这个服务一样的， 写nginx配置文件， 就是我们写node服务的代码， 使用nginx指令 起nginx服务， 就和我们使用node 指令执行node 脚本起服务一样）

### Nginx 的特点

1. 响应快， 单次响应更快， 高并发响应也快
2. 扩展性高，nginx的设计耦合性低，各个模块之间没有耦合性，可以很好的扩展模块， nginx 模块是嵌入到二进制文件中执行
3. 可靠性高，nginx设计的是， 使用一个master管理进程，管理多个worker进程，各个进程之间是独立的，互不干扰， 这样在一个worker进程挂了之后， master进程可以快速起新的worker进程顶上
4. 内存消耗低， 进行多个keep-alive连接, nginx处理连接需要消耗的内存很小, 这也是支持高并发的前提
5. 支持高并发
6. 支持热部署， 就是在nginx服务不停的情况下，支持更新配置文件等， 更改完了应该就是不用重启服务就生效了
7. 支持BSD协议， 用户可以免费使用，还可以使用和改nginx源码并提交


### Nginx机制规则总结
```
1. 浏览器请求文件的时候，我们写的文件路径会和地址栏的host + pathname 组成文件请求路径
2. 在浏览器ajax请求接口的时候， 接口（接口就是pathname）会和地址栏里的host 组成请求路径，此时ajax请求时， 不会使用地址栏里的pathname， 而是使用接口替换地址栏中的pathname，这是ajax原理和规则
3. 在请求的pathname， 不会被location匹配到的时候， 这个时候才会去匹配root， 去查找文件
```

### nginx 基础

nginx 分为多个块包括全局块， http块， event块等

### server_name

server_name是nginx的虚拟域名， 根据虚拟域名，可以将相同端口服务， 分为多个部分，根据请求头的host不同， 可以匹配到相同端口的不同server块中处理

### root

例如：
root /apps/website/test.weishi100.com;

root用来表示nginx服务的静态资源获取目录

### alias

alias /apps/website/test.weishi100.com/;

alias 用来表示nginx服务的静态资源获取目录

这个只能配置在location的配置中

### index

index 用来表示nginx服务的静态资源获取默认文件

 例如：
 index index.html /m/index.html;

1. （root或alias）和请求的pathname组合，如果组合后的结果是访问一个文件， 那就直接在服务器查找这个文件， 没有这个文件就报错

2. （root或alias）和请求的pathname组合，如果组合后的结果还是目录路径，那就用这个结果在和index中设置的第一项组合，如果有对应文件就返回， 没有就在匹配index的其余设置项， index中的设置项都没有匹配， 那就直接报错

### include

include 是用来引入其他nginx配置的

使用include 将nginx配置引入到一个总的配置中， 然后一起执行nginx配置

nginx -t 获取正在启动的nginx 服务器， 这样可以比较方便的获取到nginx的配置文件路径




