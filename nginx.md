# Nginx总结

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




