1. mysql 8.x版本 只能通过 ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; 修改密码，
其他的方式都不支持了

2. 使用docker 创建mysql 容器, 要将容器内的文件映射到服务器本地的文件中， 并且在服务器本地初始化my.cnf文件
```
[mysqld]
user=mysql
character-set-server=utf8
// 这里是更改mysql的密码验证方式， 是我们sequlize可以链接上数据库
default_authentication_plugin=mysql_native_password

[client]
default-character-set=utf8

[mysql]
default-character-set=utf8
```