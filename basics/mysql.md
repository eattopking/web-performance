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

创建容器指令

docker run -p 3306:3306 --name mysql -v /mydocker/mysql/conf:/etc/mysql/conf.d -v /mydocker/mysql/logs:/var/log/mysql -v /mydocker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

mydocker 就是我们自己创建的存储容器数据的主机目录
```

3. 这就是数据链接成功的意思
Executing (default): SELECT 1+1 AS result


### 数据库相关的知识

#### 单例模式

```
单例模式就是只创建一个数据库连接实例, 全局引用这一个实例进行操作, 这种方式可以避免重复创建TCP连接耗时和创建多个实例占用系统内存

```

### 连接池

```
连接池是在应用初始化的时候就创建多个数据库连接实例, 在需要操作数据库的时候直接获取连接实例进行操作, 不需要在创建连接, 节省了创建连接的时间, 连接池里面可以有多个连接实例, 可以是相同数据库的连接对象, 也可以是不同数据库的连接对象
```

### sqlite3 数据库理解
```
sqlite3 是一个文件类型数据库
```
### sqlite3 支持的模式

```
单线程、多线程、串行(多进程同步), 标准的sqlite3初始化的时候就是串行模式的
```

### sqlite3事务

```
sqlite3数据库的事务是和数据库连接关联的, 每个数据库连接都对应一个自己的事务, 事务提交了才是真正的的写入数据库
```

#### sqlite3的锁

```
sqlite3事务都是依赖sqlite3的锁实现的, 通过锁实现事务的各种限制

sqlite3 有五种锁状态

1. unlocked锁状态表示sqlite3没有被读和写

2. shared锁状态表示数据库可以被读取, 可以多个线程都拥有shared锁状态, 当线程拥有shared锁状态的时候不允许线程进入exclusive锁状态, 但是允许线程进入reserved锁状态和pending锁状态

3. reserved锁状态表示准备写入数据库, reserved只能被一个线程拥有, 以后他们进入pending状态

4. pending锁状态表示即将写入数据库, 一旦有一个线程拥有pending锁状态, 其他的线程就不能再拥有shared锁状态了, 等之前所有的shared锁状态线程读完, 将pending锁状态线程变为exclusive锁状态, 然后就写入数据库了, 进入这个状态, 所以线程都不能获取任何锁状态了




```

#### 关系型数据库
```
1. 关系型数据库的like搜索, 就是模糊搜索, 就是像、如的意思

2. 关系型数据库的创建索引就是对列创建索引, 创建索引后在搜索的时候会更快, 但是插入、更新、删除的时候会更慢, 搜索的时候如果有索引会自动使用. 索引不一定是只有列能加比如倒排索引, 在搜索的时候就需要

3. 关系型数据库的主键, 就是表示一行数据的唯一标识

4. 关系型数据库外键就是数据库一行数据关联到其他表的主键, 用于查找其他表的数据, 加外键效率会降低, 所有一般用一个普通列充当外键列

5. 约束一列值不能相同, 需要加给这列加唯一标识或者唯一索引

```

#### 非关系型数据库就是索引数据库

elasticsearch 是支持存储和和搜索的性能很好的, 分词搜索搜索这个的搜索引擎, 包括存储数据的索引数据库和搜索算法

### 每个数据库实现的sql语言都是不同的, 但是他们依据的规范都相同, 所以语法都是相通的, 只有在函数什么的有不同

### SQL 语句后面的分号？
某些数据库系统要求在每条 SQL 语句的末端使用分号。

分号是在数据库系统中分隔每条 SQL 语句的标准方法，这样就可以在对服务器的相同请求中执行一条以上的 SQL 语句。

但是分号在具体是值中就不会影响sql执行, 比如一个字段的值中, 或者查询的一个值中有分号

### 一些最重要的 SQL 命令
SELECT - 从数据库中提取数据

select 是查询一些列的数据, select 相关的语句都是以列为单位查询的

UPDATE - 更新数据库中的数据
DELETE - 从数据库中删除数据
INSERT INTO - 向数据库中插入新数据
CREATE DATABASE - 创建新数据库
ALTER DATABASE - 修改数据库
CREATE TABLE - 创建新表
ALTER TABLE - 变更（改变）数据库表
DROP TABLE - 删除表
CREATE INDEX - 创建索引（搜索键）
DROP INDEX - 删除索引





 