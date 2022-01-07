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


### electron-builder 打包

```
一、各端打包生成的文件格式
mac 打包

1. mac 可以打dmg包用于放在官网, 在浏览器下载安装
2. mac还可以打pkg包用于上传到 mac app store(mas), 让用户在app store中安装的

windows 打包
1. 打包成exe包, 在windows电脑上进行安装

linux 打包
1. 打包成deb包, 在liunx图形化系统上安装

electron-builder 打包文件地址

二、打包输出文件路径
electron-builder 打包的将文件打包到项目根目录的dist目录中

三、mac打包为什么要授权签名
mac 在打dmg和pkg包的时候都需要授权和签名, 要不然mac安装的时候需要让用户确认给权限去安装, 证书授权和签名之后, 就需要确认了, 直接就能安装了

四、electron-builder执行 默认是执行electron-builder.yml文件, electron-builder --config 可以自定义设置可执行文件

五、 electron-builder配置项, 这是正常打 exe, dmg ,deb的包, 是上传到mas的包的配置

// 安装包的包名就是安装后的目录名
appId: 'baidu'
// 应用可执行文件名称
productName: '百度'
// 带有后缀的应用可执行文件名称
artifactName: '${productName}_Setup_${version}.${ext}'
// 版权信息声明
copyright: baidu @ 2022 baidu
// 是否在开始编译前重构原生依赖,可先尝试true, 如果出现问题再修改为false,
npmRebuild: false
// 触发公证, 通过结合electron-notarize 写一个公正脚本, 对mac 进行公正, 否则安装时会提示恶意软件, mac包还需要进行签名, 而windows包只需要签名不需要公正
afterSign: ./notarize.js
// electron 打包的时候要打进去的文件, 写哪个哪个就是打进去
files:
    - ./test.js
    - ./page.js
    - ./tempate.js
    // 将项目的静态dll文件移动到根目录的resources目录的build目录中
extraResources:
    - build/**
// 软件安装时候的一些自定义配置, 如不过设置, 就是默认的意见安装不能自定义选择
nsis:
    // 允许修改安装目录
    allowToChangeInstallationDirectory: true
    // 网络安装程序（nsis-web）的默认设置
    differentialPackage: false
    // 一键安装
    oneClick: false
    // 是否开启安装时权限限制（此电脑或当前用户）
    perMachine: true
    // 在一键安装程序后是否在卸载时删除应用程序数据
    deleteAppDataOnUninstall: true
// 设置安装界面
dmg:
    writeUpdateInfo: false
// 打包windows环境的包, 默认打包是exe格式, 还可以是nsis格式, windows打包也需要签名, 签名时也需要证书
win:
    // 代表加密的方式，一般分为'sha256'与'sha1'两种方式，正常就是写sha256就行
    signingHashAlgorithms:
        - sha256
    // 是否签名DLL
    signDlls: true
    // 代表时间戳,一般使用'http://timestamp.digicert.com'来进行时间戳的覆盖即可
    rfc3161TimeStampServer: http://timestamp.digicert.com
    // 配置windows签名证书的文件路径, 证书的地址，必须位pfx格式
    certificateFile: xxx.pfx
    // 证书的私钥密码，这个在配置证书的时候进行设置, 配置了证书可以直接设置为''
    certificatePassword: ''
    // 配合electron-updater 配置windows包更新的相关配置, 用于生成latest-windows.yml更新文件
    publish:
        // 服务器提供商 正常generic就行
        - provider: generic
        // 更新安装包地址路径
          url: xxxx
          // 生成更新配置文件名称
          channel: latest-windows
// 配置channel: latest 最后生成的 更新配置文件是latest-mac.yml
mac:
    // 获取到证书的用户id
    identity: baidu (77Q6F9P39T)
    // hardenedRuntime就需要写成true
    hardenedRuntime: true
    // 配置签名文件, 申请到可以操作系统的权利
    entitlements: entitlements.mac.plist
    publish:
         // 服务器提供商 正常generic就行
        - provider: generic
          // 更新安装包地址路径
          url: xxxx
          // 生成更新配置文件名称
          channel: latest
// 生成linux包
linux:
    // app的类别
    category: Utility
    target:
        // deb格式的包
        - target: deb
          // 包的位数, 这就是64位的
          arch:
              - x64
    // 可执行参数      
    executableArgs:
    // 无沙盒
      - "--no-sandbox"


```