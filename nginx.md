# Nginx总结

### nginx 基础

nginx 分为多个块包括全局块， http块， event块等

### server_name

server_name是nginx的虚拟域名， 根据虚拟域名，可以将相同端口服务， 分为多个部分，根据请求头的host不同， 可以匹配到相同端口的不同server块中处理

### root

例如：
root /apps/website/test.weishi100.com;

root用来表示nginx服务的静态资源获取目录

### index

index 用来表示nginx服务的静态资源获取默认文件

 例如：
 index index.html /m/index.html;

1. root和请求的pathname组合，如果组合后的结果是访问一个文件， 那就直接在服务器查找这个文件， 没有这个文件就报错

2. root和请求的pathname组合，如果组合后的结果还是目录路径，那就用这个结果在和index中设置的第一项组合，如果有对应文件就返回， 没有就在匹配index的其余设置项， index中的设置项都没有匹配， 那就直接报错

