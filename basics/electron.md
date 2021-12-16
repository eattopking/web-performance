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

#### electron 本地全文搜索方案总结

1. 使用https://github.com/wangfenjin/simple  

添加分词和使用fts5 将sqlite转化成倒排索引数据库, 保证搜索的速度

然后然后根据对应的node sqlite的例子进行开发

前期调研过程: 

    一.node 版本 elasticSearch
       1. 存取性能高, 搜索快速, 提供分词存储

       2. 需要部署服务, 不能打包到安装包中, 无法集成在electron中

    二. lunr.js js 搜索引擎 github star 7.8k

     1. 中文分词需要插件默认不支持分词 , 2021 年没有提交过, 使用内存存储

    三. search-index 结合 nodejieba分词实现全文搜索 
      nodejieba分词, 目前发现最好的中文分词

      search-index倒排索引数据库, 底层依赖的数据库是levelDB 

      优点: 实现了分词存储和索引

    四. flexSearch js 搜索引擎 github star 8.1k, 还在持续提交
      1. 使用内存存储, 不满足需求

 

    五. 使用https://github.com/wangfenjin/simple

      node sqlite3 结合fts5插件。实现分词和倒排索引

最后集合项目本身使用的就是sqlite3数据库, 并且测试后性能也是符合要求的, 所以避免复杂, 安装过多的其他依赖的前提下, 选择方案五