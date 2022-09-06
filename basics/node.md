### node 检测进程分配内存大小和进程当前内存使用情况

使用 process.memoryUsage 获取

[详细使用链接](https://www.lema.fun/post/47e93hs9s)

### node 版本

1. 从16版本开始才有arm的node安装包，所以在arm的机器上使用nvm 安装低于16的版本，要在终端线输入 arch -x86_64 zsh 将终端转成X64的才能安装x64版本的node包

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

4. node require 的时候可以不添加后缀名, node 会根据.js 、.josn 、.node 的顺序依次尝试查找, node 默认只能加载这三种后缀的文件, 其他后缀的会按照 js 后缀加载执行, .node文件是c++扩展模块编译后生成的文件

5. 只有自定义模块是去 node_modules 中查找的

6. 模块内部可以直接引用 require、 exports、 module、**dirname、**filename , 是因为 node 内部进行了作用域隔离, 模块内的内容被一个函数包裹,
   这个函数的五个参数就是 require、 exports、 module、**dirname、**filename, 在调用函数执行模块内容的时候直接会传进来对应的五个参数, 所以可以直接用这五个变量

7. 引用非核心模块的加载文件执行的原理

7.1 C/C++模块的编译

1. .node 的模块文件并不需要编译，因为它是编写 C/C++模块之后编译生成的，所以这
里只有加载和执行的过程。在执行的过程中，模块的 exports 对象与.node 模块产生联系，然后返
回给调用者，.node文件是c++扩展模块编译后生成的文件， node在加载c++扩展的时候加载对应平台的.node文件，加载不同平台的.node文件是不可以的

2. node在处理npm安装跨平台的问题时使用node-gyp，将安装下来的c++扩展源码，根据当前所在的平台， 编译成对应平台的.node文件然后安装下来，使用时node直接加载编译过后的.node文件是

3. node-gyp就是可以一套编译文件，根据所在不同的平台自动根据不同的平台的方式编译c++代码, 这样就不用每个平台都写一套编译代码，并只能在对应平台上使用对应平台上的编译工具来编译产出了（make进行linux平台编译，vcbuild进行windows平台编译）

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

7.4

C++扩展模块动态链接库的加载
1. 动态链接库也是通过require加载的， 然后require内部判断，动态链接库使用process.dlopen()加载
2. 不同平台的动态链接库底层的加载方式不同， 是通过libuv实现的跨平台
3. 加载c++动态链接库，不需要编译，直接执行之后就可以导出，所以比js的模块require加载要快
4. process.dlopen()加载动态链接库的加载过程分为两步：第一个步骤是调用uv_dlopen()方法去打开动态链接
库，第二个步骤是调用uv_dlsym()方法找到动态链接库中通过NODE_MODULE宏定义的方法地址。这
两个过程都是通过libuv库进行封装的：在*nix平台下实际上调用的是dlfcn.h头文件中定义的
dlopen()和dlsym()两个方法；在Windows平台则是通过LoadLibraryExW()和GetProcAddress()这两
个方法实现的，它们分别加载.so和.dll文件（实际为.node文件）。

### 各个模块的关系

1. node内部js调用C++内建模块封装成核心模块给开发者自己写用文件模块用

2. 开发者自己写的文件模块通过require核心模块加载C++扩展模块（动态链接库），在文件模块中使用

#### npm 理解

1. npm install 执行时，如果 package.json 和 package-lock.json 中的版本兼容，会根据 package-lock.json 中的版本下载；如果不兼容，将会根据 package.json 的版本，更新 package-lock.json 中的版本，已保证 package-lock.json 中的版本兼容 package.json。

2. package-lock.json 就是用来锁定项目中依赖的版本, 还有依赖的依赖的版本, 保证所以人在相同项目中 npm install 安装的依赖都是版本相同的

3. 如果 package.json 中有更新, 更新的按照 package.json 中版本进行安装, 然后将版本信息更新到 package-lock.json 中, 其他没有更新的依赖还是按照 package-lock.json 中锁定的版本安装

4. npm3 及以后的 node_modules 安装依赖后层级设置, 按照顺序安装依赖, 正常都是安装到第一层级, 如果有多个依赖的依赖相同的包的不同版本, 后面安装的依赖就在自己的安装到 node_modules 的目录中在创建一个 node_modules 目录用户安装不同版本的依赖, 前面的那个依赖的依赖还是安装在第一层

5. npm安装包的过程就是先创建一个node_modules目录， 然后在其中创建一个以包的package.json中name命名的目录，最后将下载的包内容解压到这个目录中

6. 全局安装包不是安装一个全局可以引用的包， 而是安装一个可执行命令， 全局安装的包的位置在node可执行文件所在bin目录的同级的lib目录的node_modules目录中， npm和node遵循commonjs的规范， bin目录中就存放可执行的二进制文件，lib目录中就存放js代码，然后在通过全局安装包package.json中bin字段配置的执行文件路径，在存放node可执行目录中创建一个软链， 这个软链获取可执行文件的方式是通过相对路径，这个软链就是全局命令

7. 全局安装的npm包就是无法在项目中引用到, 全局安装的npm包就不是用来被引用的， 而是创建了一个全局命令

8. where node 查看node的可执行文件地址

9. npm可以本地的包安装到node_modules中，（npm install 包含package.json的目录地址或者包含package.json的存档文件或者一个URL地址），通过npm install 包含package.json的目录地址 安装的包， 在package.json中的版本信息是一个file地址 ，例如file:resources/fs-extra

10. npm install underscore --registry=http://registry.url， 制定自定义下载源，--registry=http://registry.url就是一个格式例子

11. npm ls 可以找到当前目录中可以被引用到的所有包

12. package.json 包的下载版本可以是 file:resources/fs-extra、版本号或者是git地址等，都可以通过npm安装包
#### package.json中主要字段说明

1. name。包名。规范定义它需要由小写的字母和数字组成，可以包含.、 _和-，但不允许出
现空格。包名必须是唯一的，以免对外公布时产生重名冲突的误解。除此之外， NPM还
建议不要在包名中附带上node或js来重复标识它是JavaScript或Node模块。
2. description。包简介。
3. version。版本号。一个语义化的版本号，这在http://semver.org/上有详细定义，通常为
major.minor.revision格式。该版本号十分重要，常常用于一些版本控制的场合。
4. keywords。关键词数组， NPM中主要用来做分类搜索。一个好的关键词数组有利于用户
快速找到你编写的包。
5 maintainers。包维护者列表。每个维护者由name、 email和web这3个属性组成。示例如下：
"maintainers": [{ "name": "Jackson Tian", "email": "shyvo1987@gmail.com", "web": "http://html5ify.
com" }]
NPM通过该属性进行权限认证。
6. contributors。贡献者列表。在开源社区中，为开源项目提供代码是经常出现的事情，如
果名字能出现在知名项目的contributors列表中，是一件比较有荣誉感的事。列表中的第
一个贡献应当是包的作者本人。它的格式与维护者列表相同。
7. bugs。一个可以反馈bug的网页地址或邮件地址。
图灵社区会员 swht 专享 尊重版权2.6 包与 NPM 35

8. licenses。当前包所使用的许可证列表，表示这个包可以在哪些许可证下使用。它的格式
如下：
"licenses": [{ "type": "GPLv2", "url": "http://www.example.com/licenses/gpl.html", }]
9. repositories。托管源代码的位置列表，表明可以通过哪些方式和地址访问包的源代码。
10. dependencies。使用当前包所需要依赖的包列表。这个属性十分重要， NPM会通过这个属
性帮助自动加载依赖的包。
除了必选字段外，规范还定义了一部分可选字段，具体如下所示。
11. homepage。当前包的网站地址。
12. os。操作系统支持列表。这些操作系统的取值包括aix、 freebsd、 linux、 macos、 solaris、
vxworks、 windows。如果设置了列表为空，则不对操作系统做任何假设。
13. cpu。 CPU架构的支持列表，有效的架构名称有arm、 mips、 ppc、 sparc、 x86和x86_64。同
os一样，如果列表为空，则不对CPU架构做任何假设。
14. engine。支持的JavaScript引擎列表，有效的引擎取值包括ejs、 flusspferd、 gpsee、 jsc、
spidermonkey、 narwhal、 node和v8。
15. builtin。标志当前包是否是内建在底层系统的标准组件。
16. directories。包目录说明。
17. implements。实现规范的列表。标志当前包实现了CommonJS的哪些规范。
18. scripts。脚本说明对象。它主要被包管理器用来安装、编译、测试和卸载包。示例如下：
"scripts": { "install": "install.js",
"uninstall": "uninstall.js",
"build": "build.js",
"doc": "make-doc.js",
"test": "test.js" }
包规范的定义可以帮助Node解决依赖包安装的问题，而NPM正是基于该规范进行了实现。
最初， NPM工具是由Isaac Z. Schlueter单独创建，提供给Node服务的Node包管理器，需要单独安
装。后来，在v0.6.3版本时集成进Node中作为默认包管理器，作为软件包的一部分一起安装。之
后， Isaac Z. Schlueter也成为Node的掌门人。
在包描述文件的规范中， NPM实际需要的字段主要有name、 version、 description、 keywords、
repositories、 author、 bin、 main、 scripts、 engines、 dependencies、 devDependencies。
与包规范的区别在于多了author、 bin、 main和devDependencies这4个字段，下面补充说明一下。
19. author。包作者。
20. bin。一些包作者希望包可以作为命令行工具使用。配置好bin字段后，通过npm install
package_name -g命令可以将脚本添加到执行路径中，之后可以在命令行中直接执行。前
面的node-gyp即是这样安装的。通过-g命令安装的模块包称为全局模式。
21. main。模块引入方法require()在引入包时，会优先检查这个字段，并将其作为包中其余
模块的入口。如果不存在这个字段， require()方法会查找包目录下的index.js、 index.node、
图灵社区会员 swht 专享 尊重版权36 第 2 章 模块机制
index.json文件作为默认入口。
22. devDependencies。一些模块只在开发时需要依赖。配置这个属性，可以提示包的后续开
发者安装依赖包。

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

1. node 进程间通信叫做 IPC 通信, 只有 fork 出来的子进程能和主进程通信, IPC通信就是进程间通信的意思

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

## node 异步I/O


### cpu理解
1. node的多进程可以更好的利用多核CPU
2. 多核CPU，多个进程在执行的时候， 需要计算资源， 就可以每个进程用一个核，就可以同时并行了， 这叫并行，
如果只是单核cpu那就需要多个进程，分时间段利用计算资源执行了，这叫并发， 一个进程只会利用一个cpu核，所以多核cpu，在只执行一个进程的时候就浪费了


### 阻塞I/O和非阻塞I/O

1. 阻塞I/O 会在等数据完全读出来之后才释放cpu，造成CPU浪费

2. 非阻塞I/O 会直接返回状态， 然后不阻塞，然后轮询看看数据是否返回了

3. 非阻塞I/O虽然没有完全卡住CPU但是解放出来的也是做一些轮询相关的工作， 相当于还是同步的，不是最好的


### node异步I/O实现

1. *nix 异步I/O实现原理， Node在*nix平台下采用了libeio配合libev实现I/O部分

2. Windows平台下采用了IOCP实现异步I/O

3. Windows iopc的含义： 是支持多个同时发生的异步I/O操作的应用程序编程接口，在Windows NT的3.5版本以后[1]，或AIX 5版以后[2]或Solaris第十版以后，开始支持。

4. I/O操作不只有磁盘I/O，还有网路I/O等

5. I/O操作需要用到CPU

Node中也是js执行的时候是单线程的， 但是node本身是可以多线程的

### node异步I/O事件循环， 专指I/O操作
在Windows下，这个循环基于IOCP创建，而在*nix下则基于多线程创建

###  node异步I/O事件循环的事件对象
1. 在js出发异步操作， 这个时候就会创建一个事件对象， 这个对象中包括异步操作的回调函数等，然后将这个事件对象放入到事件队列中等待回调执行， 只有异步I/O中使用使用了I/O线程池

2. node异步回调执行的原理， I/O观察者回调函数的行为就是取出请求对象的result属性作为参数，取出oncomplete_sym属性作为方法，然后调用执行，以此达到调用JavaScript中传入的回调函数的目的。
至此，整个异步I/O的流程完全结束

3. 事件循环、观察者、请求对象、 I/O线程池这四者共同构成了Node异步I/O模型的基本要素。
Windows下主要通过IOCP来向系统内核发送I/O调用和从内核获取已完成的I/O操作，配以事
件循环，以此完成异步I/O的过程。在Linux下通过epoll实现这个过程， FreeBSD下通过kqueue实
现， Solaris下通过Event ports实现。不同的是线程池在Windows下由内核（ IOCP）直接提供， *nix
系列下由libuv自行实现。

4. 在Node中，除了JavaScript是单线程外， Node自身其实是多线程的

5. 除了用户代码无法并行执行外，所有的I/O（磁盘I/O和网络I/O等）则是可以并行起来的。

6. process.nextTick(callback) 会在主线程执行完之后立即执行， 并且比setTimeout(callback, 0)性能更好， 因为settimeout用到了红黑树所以消耗性能， setTimeout(callback, 0)中采用红黑树的操作时间复杂度为O(lg(n))， process.nextTick()的时间复杂度为O(1)。相较之下，process.nextTick()更高效

7. 事件队列不是只有一个的， 每个类型的事件都会有一个队列，idle观察者（优先级最高）就是process.nextTick()的类型，它的事件队列是个数组，每次事件循环会将数组中的回调都执行完，然后就是I/O观察者（优先级第二高）就是settimeout这些定时器和异步I/O和事件等，它的事件队列也是一个数组， 每次事件循环都会将数组中的回调都执行完，
然后就是check观察者就是setImmediate(callback)(优先级最低)，他的事件队列是一个链表， 每次事件循环只会有执行里面的一个回调，setImmediate(callback)之所以这样设计，是为了保证每轮循环能够较快地执行结束，防止CPU占用过多而阻塞后续I/O，但是真实的执行结果可能是有偏差的

8. Node也应用到了异步I/O，网络套接字上侦听到的请求都会形成事件交给I/O观察者（就是注册的事件）， 然后将回调放到事件队列， 事件循环执行回调

9. node 和nginx都是事件驱动的

9. node异步I/O和其他的异步操作就是依赖事件循环实现的


### node内存控制
1. node的内存控制都是通过js的执行引擎V8引擎控制的

2. node一个进程能占的最大内存就是： 64位系统下约为1.4 GB， 32位系统下约为0.7 GB，用内存的地方就是v8引擎执行js的时候， 这个内存也是v8引擎自己控制的， 如果node单进程中内存超过最大分配内存，进程就可能会崩溃