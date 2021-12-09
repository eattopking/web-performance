### electron 知识记录

一、electron更新流程

1. 使用electron-updateer封装的autoUpdater 模块进行跟新检测和安装工作

2. 在package.json或者electron-builder.yml中设置好,版本安装包的的请求地址
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

electron-builder打包的时候将生成一个latest-windows.yml和latest-mac.yml存放更新信息, 然后将打出来的包, 部署到更新地址中, 然后进行更新请求, 通过判断latest-windows.yml和latest-mac.yml中的更新信息判断有没有更新,和展示什么更新信息

3. 新版本下载完成没有重启更新, 在下次重新启动客户端的时候会自动应用新版本

#### electron 本地搜索方案记录