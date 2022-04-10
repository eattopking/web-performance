### node 检测进程分配内存大小和进程当前内存使用情况

使用process.memoryUsage获取

 [详细使用链接](https://www.lema.fun/post/47e93hs9s)


  ### node 四种创建子进程的方法的理解
1. execFile 和 exec, 他们都是可以执行主命令的可执行文件或者主命令的环境变量
2. execFile 只需要将shell参数设置为true, 就可以和exec一样将主命令和参数放在一个字符串中执行了
3. 所有创建子进程的方法都会返回子进程实例, 都可以监听error、exit、close等事件, 都可以监听stdout、stderr 标准输出、标准错误
4. spawn 就像是execFile和fork的结合体, 只是spawn没有回调参数, spawn可以设置shell参数, 直接当作exec使用