### electron 知识记录

一、electron自动更新流程

1. 使用electron-updateer封装的autoUpdater 模块进行跟新检测和安装工作

2. 在package.json或者electron-builder.yml中设置好, 版本安装包的的请求地址
通过 
win:
publish:
        - provider: generic
          url: '资源存放目录地址'
          channel: latest-windows

mac: 
publish:
        - provider: generic
          url: '资源存放目录地址'
          channel: latest

windows和mac要分别设置

3. 新版本下载完成没有重启更新, 在下次重新启动客户端的时候会自动应用新版本