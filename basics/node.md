### node 检测进程分配内存大小和进程当前内存使用情况

使用process.memoryUsage获取

 [详细使用链接](https://www.lema.fun/post/47e93hs9s)

### node 四种创建子进程的方法的理解
1. execFile 和 exec, 他们都是可以执行主命令的可执行文件或者主命令的环境变量
2. execFile 只需要将shell参数设置为true, 就可以和exec一样将主命令和参数放在一个字符串中执行了
3. 所有创建子进程的方法都会返回子进程实例, 都可以监听error、exit、close等事件, 都可以监听stdout、stderr 标准输出、标准错误
4. spawn 就像是execFile和fork的结合体, 只是spawn没有回调参数, spawn可以设置shell参数, 直接当作exec使用

### node中 I/O操作 和 CPU密集型操作

1. cpu使用过多的操作js计算, 就像大循环比较, 这样就会占用线程, 这就会阻塞循环后面的代码执行, 也会导致异步I/O操作后的回调函数无法被执行

2. I/O操作就是读写文件的操作

3. cpu占用就是js计算过多占用cpu比较多, 本身和I/O操作没有关系, 对I/O没有任何影响, 执行如果大循环后面有I/O操作, 在大循环结束之前无法被触发

### commonjs 规范的理解

1. node是根据commonjs规范实现的
2. commonjs module 只是对commonjs 规范中的一个模块规范, commonjs规范还有很多其他规范, 比如文件系统规范、I/O规范、Packages规范(包规范, npm就是根据这个规范实现的node包管理系统)
3. js最主要的三个规范分别是 W3c规范(主要是bom和dom根据这个规范实现)、Ecmascript规范(主要是js的一些语法根据这个规范实现, 还有esmoudle也是根据这个规范实现)、Commonjs规范

### node 模块化理解
1. node模块化加载(require)有三个流程, 路径分析(确定加载的路径)、文件定位(找到文件的具体位置)、编译执行(就只把加载的js文件模块的导致部分执行的代码执行一遍在导出结果), 最后获取到导出的模块

2. node有两种模块 node中本来就有的叫做核心模块(加载核心模块没有路径分析、文件定位、编译执行这三个流程, 因为已经是编译执行完的了)、 还有就是我们自己写的js文件, 叫做文件模块(文件模块的加载过程就是经历上面三个步骤了, 但是不管是核心模块还是文件模块加载过一次之后导出结果都会被缓存, 所以第二次加载就同一个文件模块, 就不会路径分析、文件定位、编译执行这三个流程了)


#### npm 理解
1. npm install 执行时，如果 package.json 和 package-lock.json 中的版本兼容，会根据 package-lock.json 中的版本下载；如果不兼容，将会根据 package.json 的版本，更新 package-lock.json 中的版本，已保证 package-lock.json 中的版本兼容 package.json。

2. package-lock.json 就是用来锁定项目中依赖的版本, 还有依赖的依赖的版本, 保证所以人在相同项目中npm install 安装的依赖都是版本相同的

3. 如果package.json中有更新, 更新的按照package.json中版本进行安装, 然后将版本信息更新到package-lock.json中, 其他没有更新的依赖还是按照package-lock.json中锁定的版本安装

4. npm3及以后的node_modules安装依赖后层级设置, 按照顺序安装依赖, 正常都是安装到第一层级, 如果有多个依赖的依赖相同的包的不同版本, 后面安装的依赖就在自己的安装到node_modules的目录中在创建一个node_modules目录用户安装不同版本的依赖, 前面的那个依赖的依赖还是安装在第一层

