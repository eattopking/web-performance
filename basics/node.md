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

6. 只有fork出来的字子进程中才可以使用process.send()给父进程中的子进程实例发消息，然后父进程中的子进程实例监听message事件，接收消息，不是fork处理进程中process.send不是一个函数，是undefiend

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

#### fs-extra各方法介绍

异步文件操作方法
copy 复制文件或文件夹
emptyDir 清空文件夹（文件夹目录不删，内容清空）
ensureFile 确保文件存在(文件目录结构没有会新建)
ensureDir 确保文件夹存在(文件夹目录结构没有会新建)
ensureLink 确保链接存在(链接目录结构没有会新建)
ensureSymlink 确保符号链接存在(目录结构没有会新建)
mkdirp 同ensureDir
mkdirs 同ensureDir
move 移动文件或文件夹
outputFile 同fs.writeFile()，写文件(目录结构没有会新建)
outputJson 写json文件(目录结构没有会新建)
pathExists 判断文件是否存在
readJson 读取JSON文件，将其解析为对象
remove 删除文件或文件夹，类似rm -rf
writeJson 将对象写入JSON文件。

同步文件操作方法（异步方法名后面加上Sync即可）
copySync
emptyDirSync
ensureFileSync
ensureDirSync
ensureLinkSync
ensureSymlinkSync
mkdirpSync
mkdirsSync
moveSync
outputFileSync
outputJsonSync
pathExistsSync
readJsonSync
removeSync
writeJsonSync


### node内存控制
1. node的内存控制都是通过js的执行引擎V8引擎控制的

2. node一个进程能占的最大内存就是： 64位系统下老生代内存约为1.4 GB， 32位系统下老生代内存约为0.7 GB，用内存的地方就是v8引擎执行js的时候， 这个内存也是v8引擎自己控制的， 如果node单进程中内存超过最大分配内存，进程就可能会崩溃

3. 新生代内存的最大值在64位系统和32位系统上分别为32 MB和16 MB

4. 查询node 内存使用情况process.memoryUsage();
```
{
  rss: 14958592, node 进程所分配的内存，这个值是随时变化的，根据需要
  heapTotal: 7195904, node单进程 已经申请到的内存，就是单进程v8引擎申请到的内存
  heapUsed: 2821496 node单进程 已经使用的内存
}

```

5. node 改变内存限制

V8堆内存分为新生代内存和老生代内存

* 新生代内存就是存活时间比较短的对象占用的内存
* 老生代内存就是存活时间比较长的对象占用的内存

老生代内存和新生代内存共同组成node进程V8引擎的内存大小

```
node --max-old-space-size=1700 test.js // 单位为MB 设置老生代内存最大值 设置的是V8堆内存
// 或者
node --max-new-space-size=1024 test.js // 单位为KB  设置新生代内存最大值 设置的是V8堆内存

这样可以改变node 主进程执行时，V8分配的内存大小，避免内存占满，进程崩溃

上述参数在V8初始化的时候生效， 一旦生效就不能在改变了
```

* V8的垃圾回收策略主要基于分代式垃圾回收机制。

* node --trace_gc -e "var a = [];for (var i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log 得到evel执行的js的垃圾回收日志到gc.log文件

* cli 命令行 的 --version和-v都是命令行的参数， 只是规范表示-表示缩写，--表示全拼， 作用相同

* npm -s ，-s表示静默执行， npm start -- --version表示把 --version参数传递给start真实对应的指令不作为npm start的参数，这是npm特有的

* node -e "console.log(222)", -e 表示可以在命令行像evel一样执行js代码

* node --prof test01.js 产生V8执行时的性能日志v8.log，就在命令行执行的目录下

6. 作用域

* 函数执行的时候内部会形成局部作用域，函数执行完之后作用域会被销毁， 作用域内定义的变量占用的内存会在下次垃圾回收的时候被回收，局部变量作用变量所占用的内存是新生代内存

* 全局作用域就是node进程创建时候建立的作用域， 没有被变量声明的变量或者在global上面的变量都是全局变量，或者在全局作用域内定义的变量也是全局变量，全局变量正常不会失效不会被垃圾回收，
只有node进程结束， 全局作用域才会销毁，全局作用域内的变量所占用的内存才会释放

* 可以将全局变量的值赋值成 null， 就可以释放变量的内存，在下一次垃圾回收的时候就可以将变量所占内存回收

* 如果想释放对象上的属性的内存，可以通过delete 删除这个属性也可以，下次垃圾回收的时候就会将这个被删除属性的内存回收

* 但是在V8中通过delete 删除对象属性，可能会影响V8的优化，所以最好使用赋值的形式释放内存


7. 内存指标

* os模块中的totalmem()和freemem()这两个方法用于查看操作系统的内存使用情况，它们分别返回系统的总内存和闲置内存，以字节为单位

* v8分配的内存叫做堆内存，就是heapTotal的值，heapUsed就是对内存的使用情况，node中的垃圾回收也是针对V8堆内存的, 也只有v8的堆内存超过限制才有导致进程奔溃， node进程分到的内存就是rss，这个内存由两部分组成，一个是V8的堆内存， 还有就是除了V8堆内存以外的堆外内存，堆外内存没有限制，不会导致进程奔溃

* buffer和其他对象不同， buffer占用的堆外内存， 所有内存过大不会导致进程崩溃

8. node中的缓存

* node进程中的对象缓存要慎重，要控制大小和清空机制， 否则容易内存泄漏，导致进程崩溃

* node比较好的方式是使用进程外的缓存，只能不会占用进程的V8内存，可以使垃圾回收更高效

* node进程中的内存是不可以和其他进程共享的，因为进程和进程是隔离的，使用进程外缓存可以缓存共享


9. node的内存泄漏排查

* npm安装 node-heapdump， npm install heapdump，然后在需要排查代码引入var heapdump = require('heapdump');， 引入后node执行相应代码，然后堆内存进行一段时间的积累之后在命令行执行（
kill -USR2 进程id），这命令就可以抓取进程中的堆内存快照，到一个
heapdump-<sec>.<usec>.heapsnapshot 文件中，然后我们在浏览器控制台的Profiles（内存）右键加载这个文件，就可以看到快照了，根据快照，快照中显示的leak部分就是内存泄漏的部分

* npm安装 node-memwatch ，npm install memwatch，然后在然后在需要排查代码引入var heapdump = require('heapdump');，然后在要排查的代码前面调用 var hd = new memwatch.HeapDiff();，
然后在想要排查的代码执行完之后执行var diff = hd.end();， 这样就可以拿到要代码代码执行完之后的内存变化了，就可以排查内存泄漏了

10. 大内存应用

* 在读写大内存的文件的时候不能直接使用，fs.readFile()和fs.writeFile()，因为这两个APi操作的时候占用的是V8的堆内存，文件太大会导致堆内存超过限制，进程奔溃，所以我们使用fs.createReadStream()和fs.createWriteStream()， 通过流的方式操作大文件， 因为流是通过buffer实现的，buffer占用的堆外内存所以不用担心进程奔溃的问题， 但是要进行字符串层面的处理，都是需要V8引擎来处理的，就必须用到V8堆内存


### node网路编程模块

1. node有四个模块net 、dgram、http、https， 分别是创建TCP、UDP、http、https的模块

2. 他们四个模块既可以作为服务端创建对应的服务，可以作为客户端发动请求，接收响应

3. EventEmitter的实例都是流， 都有data和end事件

### net

#### 作为服务端使用
// 创建服务端实例server， server实例是可读可写的流
var server = net.createServer();

// close方法是禁止客户端和服务端在建立新的连接，原有连接保留
server.close();

服务端事件

listening 事件： 在调用server.listen的使用出发，在server.listen的第二个参数注册listening事件回掉
server.listen(port,listeningListener)

connection事件： 在有客户端和服务端建立连接的时候触发，在server.listen的最后一个参数注册事件回调

error事件： 只要服务发生一场就会触发

node中注册事件的方法都是on，所以服务端注册事件的方法是server.on('error', () => {});



#### 作为客户端使用
// 创建客户端实例client
var client = net.connect({port: 8124}, function () { //'connect' listener
    console.log('client connected');
    client.write('world!\r\n');
});

客户端事件：

connect事件： 客户端和服务端连接成功，就会触发connect事件


客户端和服务端都有的事件

data事件： 任意一方发送数据，另一端就会触发data事件并获取数据
end事件： 任意一放发送结束连接，另一端就会触发end事件
drain事件： 任何一方通过write方法发送数据（客户端和服务端都可以调用write方法发送数据），都会触发自己的drain事件
error事件： 任意一方发生错误的时候都会触发error事件
timeout事件： 连接被闲置了，两端就会触发timeout事件
close事件： 连接断开的时候，就会触发close事件，客户端和服务端


### UDP dgram
UDP 套接字这个实例既是客户端也是服务端创建的方式就一种，作为客户端时候也会创建一个监听，然后服务端的message事件第二个参数会收到
客户端起的这个服务的端口，服务端可以利用这个端口通过send方法给客户端发送数据

客户端和服务端方法和事件都是一样的，因为创建头套接字方式一样

send方法传的值必须是buffer， 不管是客户端还是服务端

close 方法就是关闭套接字，不管是服务端还是客户端，close方法触发close事件

error事件 不管是服务端还是客户端报错就是触发
#### 作为服务端
// 创建UDP套接字
const dgram = require('dgram');

// 创建UDP套接字
const server = dgram.createSocket('udp4');

server.on("message", function (msg, rinfo) {
  // 客户端send方法出触发message事件
  // rinfo 具体字段
  // {"address":"127.0.0.1","family":"IPv4","port":52286,"size":21}
  
  
  const buffer = new Buffer('upd服务端端发消息');
  // 服务端给客户端发消息也是send方法，参数也相同
  server.send(buffer, 0, buffer.length, rinfo.port, "localhost");
});

server.on('listening', function() {
 // 创建监听成功之后触发listening事件
 var address = server.address();
 console.log('address', address)
});

// 创建服务端监听
server.bind(41234);

#### 作为客户端

// udp 创建一个套接字，作为客户端可以访问多个后端多个ip,不需要创建链接，tcp套接字作为客户端需要创建一个连接，只能和创建连接的后端通信，祥和其它后端通信需要在创建一个套接字来创建新的连接

cconst dgram = require('dgram');
const client = dgram.createSocket('udp4');
const buffer = new Buffer('upd客户端发消息');

// udp套接字作为客户端发送消息的方法
// 参数 1. 要发送的buffer 2. buffer的偏移量 3. Buffer的长度 4. 目标端口 5. 目标地址
client.send(buffer, 0, buffer.length, 41234, "localhost", () => {
    console.log('发送成功')
});

client.on('message', (data, rinfo) => {
    // 服务端通过send方法发送数据是客户端触发
    // rinfo 具体字段
    // {"address":"127.0.0.1","family":"IPv4","port":52286,"size":21}
    console.log('datadatadatadatadata', data, info);
});


### http 模版 

#### 作为服务端

const http = require('http');

const server = http.createServer((req, res) => {
  // setHeader可以多次调用设置多个header，但是只有在调用writeHead的时候才会一起发出去
  // 并且setHeader和writeHead只能在res.wrire和res.end之前执行，执行到res.wrire和res.end的时候setHeader和writeHead就不能在执行了
  res.setHeader('aaa', '111');
  res.setHeader('bbbb', '111');
  // 直接在全在这个对象里设置header不通过setHeader设置也是一样的
  res.writeHead(200, {ccc: '1111'});
  
  // res.end执行包括 res.write响应数据， 并且告诉服务器响应结束，然后服务器就会做响应结束的连接处理，也会告诉客户端响应结束
  res.end('222222');
});
server.listen(7777);

server.on('connection', () => {
  console.log('建立TCP连接后触发这个事件');
});

server.on('request', () => {
  console.log('解析请求头后触发这个事件');
});

server.on('close', () => {
  console.log('server.close()方法调用后触发这个事件， tcp连接断开触发这个事件');
});

// 客户端请求升级通信的协议的时候触发
// 客户端的请求头上添加这字段 Connection: Upgrade, ec-WebSocket-Extensions: permessage-deflate; client_max_window_bits, Sec-WebSocket-Key: TDO3gzgtqO9g+gXKw/L4mQ==, Sec-WebSocket-Version: 13, Upgrade: websocket

server.on('upgrade', () => {
  console.log('客户端请求升级通信的协议的时候触发');
});

// 传大数据浏览器发送Expect: 100-continue进行预请求的时候服务端触发这个事件，不过不同意直接返回404
// 这个事件和request事件互斥，checkContinue验证通过之后，再次请求才会触发request事件
// 如果不处理checkContinue事件那么就默认允许支持传大数据
server.on('checkContinue', () => {
  console.log('传递大数据浏览器发送Expect: 100-continue进行预请求的时候服务端触发这个事件，不过不同意直接返回404');
});

// 客户端发生error事件服务端会触发clientError
server.on('clientError', () => {
  console.log('客户端发生error事件服务端会触发clientError');
});

##### req参数解析

1. req.method 获取请求方法，值全是大写
2. req.url 获取请求路径, url.parse 方法可以将完成路径解析成为不同的功能模块的字段对应的字符串
url是一个node模块，专门用来处理请求地址的
如下 ：
{
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?foo=bar&foo=baz',
  query: 'foo=bar&foo=baz',
  pathname: '/test/333/',
  path: '/test/333/?foo=bar&foo=baz',
  href: '/test/333/?foo=bar&foo=baz'
}

querystring 也是一个node模块，专门用来处理query字符串的

querystring.parse('foo=bar&foo=baz'), 结果为 { foo: ['bar', 'baz'] },有重复的参数，值放在数组中, 就算是'foo=bar&foo=bar', 结果也是{ foo: ['bar', 'bar'] }

querystring.parse('foo=bar'), 结果为 { foo: 'bar' }

3. req.headers 请求头
4. req.headers.cookie， 获取请求所带的cookie

### res参数解析

1. res.setHeader('Set-Cookie', ['cookie标准字符串', 'cookie标准字符串1']), 同时设置两个响应头Set-Cookie字段，也就是同时设置了两个cookie的字段的值，cookie 字段的值在后端是一个Set-Cookie只能设置一个字段的值，每个字段可以有不同cookie限定属性，在浏览器中展示的时候也能体现出来，只是我们通过document.cookie 取值的时候，将允许取到的cookie字段的值通过; 分割在一个字符串中返回了,(如： 'aaa=111; bbb=333', 然后在客户端可以给document.cookie一次性赋值来改变多个cookie字段的值，也可以多次给document.cookie赋值改变cookie的值，如 document.cookie = 'aaa=111; bbb=333');

2. 

#### 作为客户端

const http = require('http');

const agent = new http.Agent({
    maxSockets: 10
});

// 创建http客户端
const req = http.request({
    port: 7777,
    hostname: '127.0.0.1',
    headers: {aaaa: 11111, bbbb: 2222},
    method: 'GET',
    // 设置最多可以同时请求的数量，agent设置为false就是不限制http客户端同时请求的数量
    agent
});

// 服务端响应事件
req.on('response', (res) => {
    //设置是指解析响应的内容的编码
    res.setEncoding('utf-8');
    // 获取响应数据的事件
    res.on('data', (data) => {
        console.log('data', data);
    });
});

// 客户端向服务器端发起升级通信协议请求时，如果服务器端响应了这个请求，101 Switching Protocols状态，客户端将会触发该事件
req.on('upgrade', () => {
   console.log('Switching Protocols状态');
});

// 服务端对提交大数据的预请求做出响应后，触发这个事件
req.on('continue', () => {
   console.log('服务端对提交大数据的预请求做出响应');
});

// 客户端使用连接进行请求事件
req.on('socket', () => {
   console.log('客户端使用连接进行请求事件')
});

// 发送请求， 请求体就是通过req.end()发送
req.end();

#### http 代理是设置客户端连接池或者关闭连接池，设置连接池就是设置http客户端最多同时发送的请求数，http客户端默认可以同时发送五个请求

const agent = new http.Agent({
    maxSockets: 10
});


### WebSocket 

1. WebSocket 也是应用层协议，也是依赖TCP协议

2. 客户端和服务端在使用WebSocket协议之前，会先客户端通过http协议发送升级成WebSocket协议的请求给服务端，服务端同意后，两端建立WebSocket协议通信


可以使用socket.io库进行客户端和服务端的WebSocket通信

#### 客户端

<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
    // io.connect 创建socket客户端
    const socket = io.connect('http://localhost:8877/'); // 这里用http和ws都行，但是还不知道有啥不同
    socket.on('reload', function() {
        console.log('更新代码刷新页面');
        window.location.reload();
    });
</script>

#### 服务端

const server = http.createServer(() => {
    console.log('开启监听');
});

server.listen(8877);

// socket包裹一个http服务，如果有 socket请求了就自动转成 socket通信，这个是必须的，就是这种方式
// 创建socket服务端
const io = require('socket.io')(server); 

// emit触发事件，这个事件名称都是自定义的，客户端注册啥事件名，这里触发就用啥事件名
io.sockets.emit('reload');

### tls模块 ，tls/ssl协议是传输层协议， 是安全的tcp的协议，本质就是加密的tcp协议
var tls = require('tls');


### https 模块

https其他的都和http一样， 就是https需要私钥和签名证书, https就是继承tls/ssl协议实现的http协议，是安全的http协议
https就是在应用层是明文的，在传输层是加密的，通过tls/ssl传输层协议创建加密的tcp连接，所以才是安全的

#### 服务端

var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);


#### 客户端

var https = require('https');
var fs = require('fs');
var options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./keys/client.key'),
  cert: fs.readFileSync('./keys/client.crt'),
  ca: [fs.readFileSync('./keys/ca.crt')]
};

options.agent = new https.Agent(options);
var req = https.request(options, function(res) {
  res.setEncoding('utf-8');
  res.on('data', function(d) {
    console.log(d);
  });
});

req.end();
req.on('error', function(e) {
  console.log(e);
});

### node cookie

1. cookie 在req.headers上， req.headers.cookie

2. 给静态资源网站和其他非静态资源网区分域名，这样可以避免访问静态资源网站的时候，携带不必要的cookie，导致带宽浪费，降低传输错误

3. DNS解析是有缓存的

4. 为了保证cookie的安全可以对登陆校验的cookie进行签名

### node session

1. session存储数据和cookie中的值进行匹配，做登陆校验

2. 如果将session存储在内存中，起多个进程的话，因为进程间隔离会导致session不同步，所以通常的方式是使用redis这样的缓存服务统一存储session，
这样做的也是有一些问题的，这样做会导致我们去发送请求获取session，会比直接从内存中取值慢，但是这样的影响小之又小

### crypto 模块提供加密解密api的模块 可以进行SHA1、 MD5等加密解密

const crypto = require('crypto');


### Koa 使用流程

// 引入koa
const Koa = require('koa');
const KoaBody = require('koa-body');
const compress = require('koa-compress');
const Router = require('koa-router');
// koa-mount 就是可以自定义路由，挂载很多东西, koa-mount默认匹配/ 路由， koa-mount就是注册一个get 请求的路由，mount可以挂在一个静态服务，也可以挂载一个新的koa实/例（例如： const app1 = new Koa();）

const mount = require('koa-mount');
// 创建Koa实例
const app = new Koa();

// 使用KoaBody中间件，可以然后router监听post请求，可以获取请求体的内容，koa默认获取不到请求体的内容， 所以需要借助KoaBody中间件实现
app.use(KoaBody());

// koa 开启压缩， 返回给客户端压缩的结果，快速影响给客户端，客户端解析压缩，应用响应，提高响应效率
// 请求头添加 accept-encoding: gzip, deflate, br， 表示客户端能够支持解析的压缩缩法
// 响应头添加 content-encoding: gzip， 说明服务端压缩的方式
app.use(compress(
  {
    // 资源文件大于2048b，会被压缩返回
    threshold: 2048,
    // 客户端可以解析gzip压缩的结果，就返回gzip压缩结果
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    // 客户端可以解析deflate压缩的结果，就返回deflate压缩结果
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false, // 禁用br解决https gzip不生效加载缓慢问题
  }
));

// 嵌套router

const routerApi = new Router();

// 定义api路由路径
routerApi.get('/list', () => {});

const router = new Router();

// 将routerApi路由嵌套到router中，然后注册routerApi路由
router.use('/api', routerApi.routes(), routerApi.allowedMethods());

// 注册router路由使路由真正生效，router是主路由，routerApi是，主路由/api下的二级路由，这样做就可以拆分逻辑
// 主路由的逻辑单一的时候可以直接用一级路由写逻辑， 如果主路由涉及多个逻辑拆分，就可以用二级路由的方式，拆多个接口拆逻辑
app.use(router.routes()).use(router.allowedMethods());

// 挂载静态资源请求服务
// Static('public') 默认只能匹配 从/开始的路径/后面必须是默认资源目录下的路径，mount可以设置一个路由指向资源的默认目录，这个路由后面加的路径指向资源的默认目录中的路径
// Static('public') 一直都是值在项目根目录下的public目录中获取资源, 也可以设置具体的绝对路径
app.use(mount('/world', Static('public')));

// 直接注册一个中间件函数，只要有请求就会执行返回'9999999'
app.use(async (cxt) => {
  cxt.body = '9999999';
});

// 挂载 app1
const app1 = new Koa();
app1.use(async (cxt) => {
  cxt.body = 'app1';
});
// 请求/app1路由直接返回结果是'app1'
app.use(mount('/app1', app1));

// 当app.use和mount都匹配/的时候谁在前边注册，路由为/的时候,如果前边的中间件不执行await next()调用后面的中间件就返回前面的结果，如果执行那就后面返回结果覆盖前面的返回结果，作为最终的返回结果
// app.use(async (cxt) => {
//   cxt.body = '9999999';
// })
// app1.use(async (cxt) => {
//   cxt.body = '8888888';
// })
// app.use(mount('/', app1));


// 启动监听
app.listen(8000);

### 其他中间件

koa-session 使用cookie鉴权的时候使用

koa-jwt 使用token鉴权的时候使用

koa-views 需要使用模版渲染时使用

koa-helmet 需要增加安全响应头时候使用

koa-logger 需要输出日志时可以使用

koa-bunyan-logger 需要输出日志时可以使用



#### koa 中间件原理
一. 调用原理

koa的中间件就是拥有一个ctx参数和一个next参数的异步函数

// ctx是req和res的整合， next表示下一个注册中间键函数
调用koa中间的方式是通过app.use(async (ctx, next) => {


});

app.use() 美执行一次会把this 返回，这样就可以实现链式调用


二. 实现原理

1. 通过app.use((ctx,next) => {}), 就是注册中间件，将每个定义的中间件push到一个队列中， 在队列中存放这些函数

2. 然后在把这些函数按照规则调用，组成一个函数，给每个函数调用时都穿入下一个中间件函数，这个洋葱模型实现的原理，想从头执行到尾，然后在从尾执行到头

3. 然后注册http 请求监听回调时， 在回调中触发执行封装好的中间件调用函数，这样就实现了洋葱模型执行

4. 所以中间件函数只要是有请求了，就会被执行


三. koa理解

const app = new koa(); 是创建了一个实例，不是直接创建了一个http的server实例，app中包括很多方法和存储的内容，只有在app.listen(), 调用的时候才会在listen函数内部创建一个server实例，并调用server实例的listen方法启动一个http server的监听


#### node 监控

easy-monitor 3.0 很不错的node监控