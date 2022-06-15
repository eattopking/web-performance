### node 检测进程分配内存大小和进程当前内存使用情况

使用 process.memoryUsage 获取

[详细使用链接](https://www.lema.fun/post/47e93hs9s)

### node 四种创建子进程的方法的理解

1. execFile 和 exec, 他们都是可以执行主命令的可执行文件或者主命令的环境变量
2. execFile 只需要将 shell 参数设置为 true, 就可以和 exec 一样将主命令和参数放在一个字符串中执行了
3. 所有创建子进程的方法都会返回子进程实例, 都可以监听 error、exit、close 等事件, 都可以监听 stdout、stderr 标准输出、标准错误
4. spawn 就像是 execFile 和 fork 的结合体, 只是 spawn 没有回调参数, spawn 可以设置 shell 参数, 直接当作 exec 使用

### node 中 I/O 操作 和 CPU 密集型操作

1. cpu 使用过多的操作 js 计算, 就像大循环比较, 这样就会占用线程, 这就会阻塞循环后面的代码执行, 也会导致异步 I/O 操作后的回调函数无法被执行

2. I/O 操作就是读写文件的操作

3. cpu 占用就是 js 计算过多占用 cpu 比较多, 本身和 I/O 操作没有关系, 对 I/O 没有任何影响, 执行如果大循环后面有 I/O 操作, 在大循环结束之前无法被触发

### commonjs 规范的理解

1. node 是根据 commonjs 规范实现的
2. commonjs module 只是对 commonjs 规范中的一个模块规范, commonjs 规范还有很多其他规范, 比如文件系统规范、I/O 规范、Packages 规范(包规范, npm 就是根据这个规范实现的 node 包管理系统)
3. js 最主要的三个规范分别是 W3c 规范(主要是 bom 和 dom 根据这个规范实现)、Ecmascript 规范(主要是 js 的一些语法根据这个规范实现, 还有 esmoudle 也是根据这个规范实现)、Commonjs 规范

### node 模块化理解

1. node 模块化加载(require)有三个流程, 路径分析(确定加载的路径)、文件定位(找到文件的具体位置)、编译执行(就只把加载的 js 文件模块的导致部分执行的代码执行一遍在导出结果), 最后获取到导出的模块

2. node 有两种模块 node 中本来就有的叫做核心模块(加载核心模块没有路径分析、文件定位、编译执行这三个流程, 因为已经是编译执行完的了)、 还有就是我们自己写的 js 文件, 叫做文件模块(文件模块的加载过程就是经历上面三个步骤了, 但是不管是核心模块还是文件模块加载过一次之后导出结果都会被缓存, 所以第二次加载就同一个文件模块, 就不会路径分析、文件定位、编译执行这三个流程了)

3. 加载自定义模块的时候, 只有这条加载路径完全没有查找到的可能才会去换下一个, 路径查找

4. node require 的时候可以不添加后缀名, node 会根据.js 、.josn 、.node 的顺序依次尝试查找, node 默认只能加载这三种后缀的文件, 其他后缀的会按照 js 后缀加载执行

5. 只有自定义模块是去 node_modules 中查找的

6. 模块内部可以直接引用 require、 exports、 module、**dirname、**filename , 是因为 node 内部进行了作用域隔离, 模块内的内容被一个函数包裹,
   这个函数的五个参数就是 require、 exports、 module、**dirname、**filename, 在调用函数执行模块内容的时候直接会传进来对应的五个参数, 所以可以直接用这五个变量

7. 引用非核心模块的加载文件执行的原理

7.1 C/C++模块的编译

.node 的模块文件并不需要编译，因为它是编写 C/C++模块之后编译生成的，所以这
里只有加载和执行的过程。在执行的过程中，模块的 exports 对象与.node 模块产生联系，然后返
回给调用者。

7.2 JSON 文件的编译

.json 文件的编译是 3 种编译方式中最简单的。 Node 利用 fs 模块同步读取 JSON 文件的内容之
后，调用 JSON.parse()方法得到对象，然后将它赋给模块对象的 exports，以供外部调用。

7.3 JavaScript模块的编译

在编译的过程中， Node 对获取的 JavaScript 文件内容进行了头尾包装。在头部添加
了(function (exports, require, module, **filename, **dirname) {\n，在尾部添加了\n});。
一个正常的 JavaScript 文件会被包装成如下的样子：
```
(function (exports, require, module, **filename, **dirname) {
var math = require('math');
exports.area = function (radius) {
return Math.PI _ radius _ radius;
};
});
```
这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过 vm 原生模块的
runInThisContext()方法执行（类似 eval，只是具有明确上下文，不污染全局），返回一个具体的
function 对象。最后，将当前模块对象的 exports 属性、 require()方法、 module（模块对象自身），
以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个 function()执行。
这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的 exports
属性被返回给了调用方。 exports 属性上的任何方法和属性都可以被外部调用到，但是模块中的
其余变量或属性则不可直接被调用

8. C/C++文件存放在Node项目的src目录下，JavaScript文件存放在lib目录下

9. 核心模块的js源文件编译成c++代码后，通过process.binding('natives')取出， 这就是核心模块的js源文件的编译过程，最后把取出这个c++代码拿去执行， process.binding还可以取出内建模块

10. 核心模块缓存到NativeModule._cache对象上，文件模块则缓存到Module._cache对象上

11. node中的模块有全部是c++开发的（内建模块， 一般不用户不会使用，一般用于核心模块引用）， 也有c++和js混合开发的（核心模块一般就是这样的）

12. 

#### npm 理解

1. npm install 执行时，如果 package.json 和 package-lock.json 中的版本兼容，会根据 package-lock.json 中的版本下载；如果不兼容，将会根据 package.json 的版本，更新 package-lock.json 中的版本，已保证 package-lock.json 中的版本兼容 package.json。

2. package-lock.json 就是用来锁定项目中依赖的版本, 还有依赖的依赖的版本, 保证所以人在相同项目中 npm install 安装的依赖都是版本相同的

3. 如果 package.json 中有更新, 更新的按照 package.json 中版本进行安装, 然后将版本信息更新到 package-lock.json 中, 其他没有更新的依赖还是按照 package-lock.json 中锁定的版本安装

4. npm3 及以后的 node_modules 安装依赖后层级设置, 按照顺序安装依赖, 正常都是安装到第一层级, 如果有多个依赖的依赖相同的包的不同版本, 后面安装的依赖就在自己的安装到 node_modules 的目录中在创建一个 node_modules 目录用户安装不同版本的依赖, 前面的那个依赖的依赖还是安装在第一层

### node 中流(stream)的理解

什么是流, 流就是通过片段的形式持续输出和写入内容, 提高效率了, 而不需要全部都准备好在输出或者写入, 准备好一部分就输出或者写入一部分

1. stream 的主要 api 有 pipe 通过管道读取可读流中数据, stream1.pipe(stream2) stream2 通过管道读取 stream1 可读流中的数据,
   pipe 方法就是将可以可读流和可写流的读取这套流程封装了一下, 并且处理了这个过程中的异常, 让使用者更加方便的读写

2. 可读流的特有操作

```
stream.push(111);  向可读流中写入数据
stream.read();  获取可读流中内容, 不指定参数size(一次读多少字节), 直接取出所有内容


可读流分为流动态和静止态,只有流动态的时候才可以从中读取内容
stream.pause(); 设置可读流静止态
stream.resume(); 设置可读流流动态

可读流在注册data事件后, 会自动切换成流动态, 不断触发data事件, 回调返回读到的内容
stream.on('data', (data) => {
  data是可读流中读取到的内容
});

可读流内容被读取完毕后, 会触发可读流的end事件
stream.on('end', () => {
  可读流被读取完了触发end事件
});

可读流当存在内容的时候readable事件就会调用, 然后我们就可以通过stream.read()获取流内容


```

3. 可写流的特有操作

```
stream.write(111)  向可写流中写入数据
当可写流写入太快的时候stream.write会返回false, 这个时候就不能在写入了,否则会报错, 所以需要设置可读流为静止态
只有当可写流调用 drain 事件的时候表示可写流可以继续写入
stream.on('drain', () => {
  可写流可以继续写入了, 将可读流设置为流动态继续向可写流中写入
})

stream.end()  设置可写流不能在写入了

可写流的finish的事件, 表示可写流已经写入完毕

stream.on('finish', () => {

})

可写流的error的事件, 表示可写流写入过程中报错
stream.on('error', () => {

})

可写流的destroy方法
```

4. 流的种类

```
Readable: 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
Writable: 可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据）。
Duplex: 可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合。
Transform: 类似于双工流、但其输出是其输入的转换的转换流。
```

5. 很多 node 原生 api 有流的能力

### node 句柄理解

句柄是一种可以用来标识资源的引用，它的内部包含了指向对象的文件描述符。比如句柄可以用来标识一个服务器端 socket 对象、一个客户端 socket 对象、一个 UDP 套接字、一个管道等。

### node 进程间通信理解

1. node 进程间通信使用 IPC 通信, 只有 fork 出来的子进程能和主进程通信

2. 通信的 send 方法, 只能传递消息和特定类型的句柄, 例如一个 const server = createServer(), 得到的 server 实例就是一个句柄

3. node 能够实现 IPC 通信是通过 libuv 实现的, node 对系统的底层是操作, 例如文件操作也是通过 libuv 实现的, libuv 是通过 c++实现的

4. fork 出来的子进程和父进程建立连接的过程: 首先父进程将建 IPC 通道, 然后在创建子进程的时候将 IPC 通道的文件描述符告知子进程, 然后子进程根据文件描述符找到已有的 IPC 通道和父进程建立连接

5. 通过 send 方法在进程中只是可以传递消息, 不能传递对象, 能够传递对象只是内部处理后给到使用者的假象, 通过 IPC 通道传递的消息都是需要通过 JSON.stringfy 序列化之后在传递的, send 方法在通过 IPC 通道传递之前会将需要传递的内容, 组装成两个对象一个是 handler, 一个 message, 子进程就是根据父进程传递过来的 JSON.stringfy 之后的 message 配置还原父进程传递的真实内容, 子进程发给父进程的同理

```
message的结构如下:

{
    cmd:'NODE_HANDLE',
    type:'net.Server',
    msg:message
}

```

6. 所以说 send 不能发送所有的句柄, 因为需要还原的支持, 所以 node 就是根据 JOSN.parse 解析 message 的配置和 IPC 通道文件描述符还原 send 方法传递的对应内容

### node Buffer 理解

1. buffer 是一个可以根据字符编码或者说字符集编码编码字符串后并进行存储的数据结构

2. buffer 的结构和数组类似, 都是可以通过索引取值, buffer 存的是二进制数据, 可以将 buffer 中二进制字节解码成对应的字符串

3. buffer 的每一项都是一个字节(B), 每一项都是表示字符编码编码后的结果(就是转换为对应编码类型后每个字节对应的字符编码)

4. 字符编码就是用来转换字符串的, 就是根据对应的字符编码对字符串进行编码和解码, 编码和解码字符串的时候都是一个字符一个字符来的

5. buffer 就是一个用来存储二进制数据的数据结构

6. 1 个字节 等于 8bit(位);

7. http 发送请求和响应请求都是最终都是以二进制的形式传输的, 所以 node 响应最后都是以 buffer 的形式响应的, 响应的是字符串, 最后也会被转成 buffer 二进制
