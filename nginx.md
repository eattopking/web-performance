# Nginx总结

### Nginx 是什么

nginx是一个可以跨平台的， web服务器程序(提供了nginx服务执行环境，可以执行nginx配置文件起nginx服务), 起nginx服务就是起一个后端服务的程序（就和我们用node写一个http服务监听，然后node 执行这个服务，服务起来后， 然后客户端去访问这个服务一样的， 写nginx配置文件， 就是我们写node服务的代码， 使用nginx指令 起nginx服务， 就和我们使用node 指令执行node 脚本起服务一样）

nginx 负载均衡的实质：nginx 起一个或者多个服务， 其中nginx中有很多帮手， 帮助客户端和nginx的各个服务进行tcp连接，并持续监听关注， 这样就避免了所有的活都一个人干，导致效率降低，这个很多帮手就是nginx的多个worker进程， nginx 默认会选择性能最好的事件模型处理负载均衡，性能最好的事件模型时epoll



### Nginx 的特点

1. 响应快， 单次响应更快， 高并发响应也快
2. 扩展性高，nginx的设计耦合性低，各个模块之间没有耦合性，可以很好的扩展模块， nginx 模块是嵌入到二进制文件中执行
3. 可靠性高，nginx设计的是， 使用一个master管理进程，管理多个worker进程，各个进程之间是独立的，互不干扰， 这样在一个worker进程挂了之后， master进程可以快速起新的worker进程顶上
4. 内存消耗低， 进行多个keep-alive连接, nginx处理连接需要消耗的内存很小, 这也是支持高并发的前提
5. 支持高并发
6. 支持热部署， 就是在nginx服务不停的情况下，支持更新配置文件等， 更改完了应该就是不用重启服务就生效了
7. 支持BSD协议， 用户可以免费使用，还可以使用和改nginx源码并提交

### nginx的工作方式

1. nginx 可以是一个进程工作(就是一个master进程处理所有的事)， 也可以是多个进程工作， 生产环境是多个进程工作 （就是一个master主进程， 控制多个worker进程， 所有nginx是分进程工作的， 因为各个进程是相互独立的， 一个进程崩了不会影响其他进程，一个进程中的一个线程崩了会导致其他线程也崩了， master进程就进行worker进程调度工作和fork出worker进程，worker进程才是进行具体的工作处理的进程， worker进程都是master进程的子进程）

2. nginx 默认是使用守护进程的方式工作的， 就是进程都在后台执行， 不在任何的终端上执行，不在任何终端上打印信息，
默认配置是 daemon: on 开启守护进程，也可以off 关闭守护进程用于调试


3. nginx 默认配置 master_process: on, 就是设置nginx 是以一个master进程和多个worker进程的方式工作的，
也可以设置 master_process: off, 将nginx的工作方式设置为一个master进程处理所有的事， 用于调试和测试

4. 正常就是将worker_processes 工作的进程的数量设置成和内核数相同， 使用多内核工作

5. 在 events {
    worker_connections: 100000; // 一个工作进程中可以建立的http请求的连接数， 只要服务器的内存够用， 连接数越大nginx 性能越高
}

6. 进程之间是通过信号进行通信的， 我们的很多nginx指令就是给master进程发动信号

7. 一个服务器可以有很多个进程， 不一定和内核数相同，nginx的worker进程数和内核数相同是因为这样性能更高

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

### nginx 执行指令问题

1. 使用第一种安装的方式，可以直接使用nginx 作为指令
2. 当不能够使用nginx 作为指令时， 直接将nginx的二进制文件， 也就是可执行文件当做 nginx 指令使用
3. 如果遇到权限不够的时候可以使用sudo临时提升权限
4. nginx的二进制文件，可以有多份，sbin目录下的和whereis nginx 找的二进制文件可能不是一个路径下的文件

### Nginx机制规则总结
```
1. 浏览器请求文件的时候，我们写的文件路径会和地址栏的host + pathname 组成文件请求路径
2. 在浏览器ajax请求接口的时候， 接口（接口就是pathname）会和地址栏里的host 组成请求路径，此时ajax请求时， 不会使用地址栏里的pathname， 而是使用接口替换地址栏中的pathname，这是ajax原理和规则
3. 在请求的pathname， 不会被location匹配到的时候， 这个时候才会去匹配root， 去查找文件
```

### nginx 配置

1. nginx 的配置项分为块配置项， 和非块配置项, 非块配置项就如：gzip: on; 后面没有大括号，

块配置项 就如 location /test {} 后面有大括号；


2. nginx的各种配置项的支持都是依赖于模块，例如 http {} 配置项就是 依赖于ngx_http_module 这个模块的支持，
模块就是一个软件包

3. location、http、server 虽然是包裹关系， 但是它们都是一个类型配置项， 都是块配置项， 非块配置项可以设置在块配置项中，比如 gzip: on ，在http 、location、server 下都可以设置，只是在父级设置可以被子级继承，子级设置相同配置项可以覆盖父级设置的配置项
### 调试相关的配置
1. error_log 、 master_process 、daemon 、debug_points、
debug_connection 、worker_rlimit_core、coredump

### nginx 正常运行必备的配置项

1. user 用户名 用户组名 : 如果只设置用户名， 那nginx 运行的用户和用户组名字相同

2. pid /test/nginx.pid :设置存储master进程id的文件路径

3. worker_rlimit_nofile 10000: worker进程可以打开文件的最大数量， 设置的越高nginx打开文件数量就没有限制了，就不会有 to many open files的问题了

4. worker_rlimit_sigpendding 100; 每个用户可以发往nginx的信号数量，如果一个用户的发送nginx的信号数量到数了，那么这本用户就不能在往nginx发信号了， 所以要设置大点避免这种情况, 这个配置目前还不好使， 所以应该是配置的层级不对还是咋回事，先放在这里

### nginx 性能优化的配置项
1. worker_processes 10: 表示在master/worker 模式下开启多少worker进程， 正常如果没有像读取磁盘中的数据这种阻塞操作的情况下， 开启worker进程的数量和cpu内核数同最好， 每个内核处理一个worker进程， 如果要是有阻塞操作那就要开启比cup内核多的worker进程了，用于处理这个阻塞操作, worker进程过多，会加大切换进程时的消耗， （因为linux时抢占式内核）

2. worker_cpu_affinity 0001, 0010, 0100, 1000: 表示进程和第几个cup内核绑定， 这个内核就处理绑定的worker进程， 避免内核利用分配不均, 0001这个数有四位表示cpu有四个内核， 1在第一位表示使用四个内核中的第一个内核，在worker_cpu_affinity 后面写几组数，就表示处理多少个worker进程， 这个配置只有在linux系统才好使

3. ssl_engine device: 开始ssl 加速， 提高ssl协议的处理速度

4. time_resolution 100s : 表示至少每100毫秒才调用一次gettimeofday(用内核时钟更新nginx的缓存时钟)， 默认执行一次事件都会去调用一次gettimeofday， 但是这样会有性能损耗， 所以设置gettimeofday的执行频率提高性能，如果想日志中的时间打印更准确也可以设置这个频率， 使时间打印更准确

5. worker_priority 0: 设置worker进程的处理优先级， 范围是 -19 ~ 20， 数值越大优先级越小， 但是worker进程的优先级不能小于 -5， 优先级越高worker获取的时间片段就越大， 就是处理这个进程的时间就越多

### 事件类配置项
这些都是配置在events {} 块中的配置项, 只有lock_file不是

1. accept_mutex on: nginx 的负载均衡锁， 开启这个锁后， 会调度worker进程合理的处理tcp连接，使各个worker的工作均衡， 达到负载均衡的作用，当每个worker进程处理的连接数达到最大值的7/8, 那accept_mutex 负载均衡锁， 就将减少这个worker的连接处理了

2. lock_file /path/nginx.log : 产生lock.log的文件地址，accept 锁可能需要这个文件

3. accept_mutex_delay 100ms： accept 锁给worker 进程分配任务后， 多久后还能去尝试给worker进程分配任务

4. use epoll: 处理负载均衡所选用的事件模型， 默认nginx 会选用最适合的事件模型

5. worker_connections 8: 每个worker进程能同时处理的最大的tcp连接数

6. multi_accept off: 尽可能将本次调度中，发起的tcp连接都连接上，默认是关闭的，没必要不好用开，影响性能
### error_log
1. 设置错误日志的输出路径和日志级别
```
error_log /path/error.log level
```
2. level就是错误日志的级别，设置错误级别后， 错误日志就会输出大于等于这级别的日志， 默认的level是error

3. 默认error_log 是有默认的输出路径的

4. 将错误日志的文件的位置放在磁盘空间比较大的位置

5. 将错误日志输出路径设置为 /dev/null 就可以关闭各种级别错误日志的输出, 这是关闭错误日志输出的唯一方式

6. 输出debug 级别的日志的时候， 需要在执行configure的时候, 加上--with-debug的配置参数


### server_name

server_name是nginx的虚拟域名， 根据虚拟域名，可以将相同端口服务， 分为多个部分，根据请求头的host不同， 可以匹配到相同端口的不同server块中处理

 server {
        listen       80;
        server_name  baidu.com;
 }

 server {
        listen       80;
        server_name  taobao.com;
 }

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

### 声明和使用变量，不同的配置项根据它们依赖的模块能够提供不同的默认变量
```
1. 自定义变量 变量名城以$开头 ， 自定义变量也有作用域， 在没有没定义之前使用变量会报错

定义变量
set $foo foo

使用变量 $foo

2. 内建变量， 就是nginx默认提供的全局变量

常用内建变量

$uri: 就是请求的不包含域名和端口还有请求参数的剩余请求路径, 对获取的路径进行了解码， 如果有编码部分的话， 比如: 23.34.4.4/test/index.html?a=1, $url 获取到的就是/test/index.html

$request_uri: 就是返回就是请求的不包含域名和端口的请求路径包含请求参数, 没有经过解码, 就是路径中是啥获取的就是啥 例如 23.34.4.4/test/index.html?a=1, $request_uri 获取到的就是 /index.html?a=1

$arg_XXX: arg 内建变量群，可以有很多种变量，就获取请求参数中arg_后面对应值的参数的值， 并且不限定路径中参数的大小写 例如 $arg_name 可以获取到路径中name参数的值也可以获取路径中Name参数的值
```

### 可以在 location 中的设置的配置项

1. 请求返回 状态码和响应的内容，这个内容会被浏览器当做文件下载

location /test/ {
    return 301 1111
}

2. 设置响应头

add_header ，多个响应头要调用多次add_header

3. 设置代理

proxy_pass https://test-m.weishi100.com443; 设置代理路径，要代理到哪里

proxy_set_header 设置代理响应头， 多个响应头要调用多次proxy_set_header

proxy_read_timeout 90; 代理超时时间， 代理请求超过这个时间才报错


### 可以在server中设置配置项

1. 起一个端口的服务就是一个server 块配置项

2. 在server块配置项中设置 压缩配置, gzip 压缩， 常用配置，这里有些必须都得配， 要不然nginx起服务报错

gzip    on; 开启压缩
gzip_min_length 1024; // 返回资源默认情况允许的最大大小， 超过这个大小就开启gzip压缩对资源
gzip_proxied    expired no-cache no-store private auth; 是否开启对代理结果数据的压缩，off就是不开启， 开启就是写入那种请情况进行压缩
gzip_types      text/plain text/css application/xml application/json application/javascript application/xhtml+xml; 进行压缩的资源类型
gzip_comp_level 9; 压缩比例， 比例1-9， 比例越大压缩的越小，压缩的时间越长

## 配置一个完整的web服务器

1. 虚拟主机设置和请求的分发


2. 文件路径的定义

3. 内存与磁盘资源的分配

4. 网络连接的设置

5. MIME类型的设置

6. 对客户端请求的限制

7. 文件操作的优化

8. 对客户端请求的特殊处理




