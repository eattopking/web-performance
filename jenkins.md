# Jenkins总结

1. Jenkins需要安装jdk(就是需要java环境)
2. Jenkins需要安装(使用docker的jenkins镜像完成jenkins搭建更加方便)
3. Jenkins需要安装插件(功能通过jenkins扩展)
4. Jenkins打包的时候需要的node环境，需要安装nodejs插件
5. Jenkins打包后需要将构建结果传递给前端服务器， 需要使用Publish Over SSH插件， 这里需要配置jenkins所在服务器的密钥(这个私钥只能rsa开头的，不能师openssh开头的)， 也要配置需要发布到远端的服务器密码
6. Jenkins所有的一切需要依据插件完成， 不能使用所在服务器的环境资源， jenkins会开辟一个空间存储和自己相关的资源， 和它所在的环境资源无关
7. 一个电脑可以生成多对公钥和私钥
8.




