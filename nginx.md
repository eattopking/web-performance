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

###  运行nginx 的linux 版本要求
1. linux 版本大于等于2.6， 这是因为linux版本大于等于2.6时，才支持epoll，nginx在linux系统就是依靠epoll实现多路复用的， 进而通过多路复用实现解决高并发的问题
2. 可以对linux的内核参数进行修改， 来提高nginx的性能, linux的内核参数在/etc/sysctl.conf中, 然后在这/etc 目录下执行 sysctl -p 使sysctl.conf 修改生效
3. 使用uname -a 查询 linux 内核版本

### linux 上 nginx的 安装方式

#### 第一种 简单无脑安装

```
yum install nginx
```
这样安装的问题的效果
1. nginx 配置路径: /etc/nginx
2. pid路径: /var/run/nginx.pid
3. 错误日志路径: /var/log/nginx/error.log
4. 访问日志路径: /var/log/nginx/access.log
5. nginx默认展示的页面文件路径: /usr/share/nginx/html

这样安装的缺点
1. 不能自定义安装的版本
2. 不能自定义选择编译的模块
3. 扩展不方便， 需要重新编译
4. 重启服务和修改配置都需要root权限
5. 性能差

#### 第二种

```
1. 在安装nginx 之前， 安装nginx依赖的代码包， 帮助nginx实现一些功能， 比如支持https请求、压缩响应文件等
2. 将nginx源码包安装在指定的目录下
3. 在放置nginx 源码包的目录下， 解压nginx源码包
4. 进入解压后的源码包目录
5. 依次执行 ./configure 、make、 make install 指令 完成nginx的安装,
6. ./configure主要就是生成Makefile文件、make就是根据Makefile文件编译Nginx工程，生成二进制文件，make install 就是完成nginx的安装, 文件都安装完成
6. nginx 默认 配置文件和 二进制文件路径（二进制文件路径 就是可以充当指令用的文件的路径） 默认都在 /usr/local/nginx 中， 默认二进制文件是 /usr/local/nginx/sbin/nginx, 默认配置路径是 /usr/local/nginx/conf/nginx.conf
7. /usr/local/nginx/sbin/nginx 我们可以设置成全局别名 nginx ， 直接使用nginx 指令就可以执行了，
只执行nginx指令， 就是执行nginx的默认配置文件

```

这种安装的优点就是 自定义程度大， 但是需要比较多的linux知识

### nginx 常用 指令

1. whereis nginx : 查询nginx的默认路径， 包括nginx的配置文件默认路径、错误日志默认路径等
2. nginx -c <文件路径> : 执行自定义的nginx配置文件
3. nginx -t : 在nginx 不启动时， 检查nginx的配置文件是否有错误，并返回信息， 在nginx启动时可以帮助我们找到nginx的配置文件路径
4. nginx -s reload: 重启nginx
5. nginx -v : 展示nginx的版本信息
6. nginx -s stop: 快速停止nginx 服务， 全停啥也不等，没干完就没干完
7. nginx -s quit: 优雅的停止nginx服务，会等没干完的干完才停止


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




