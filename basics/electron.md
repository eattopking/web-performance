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
2. mac还可以打mas包用于上传到 mac app store(mas), 让用户在app store中安装的
3. mac还可以打pkg包, 在mac中下载的就是pkg包


windows 打包
1. 打包成exe包, 在windows电脑上进行安装

linux 打包
1. 打包成deb包, 在liunx图形化系统上安装

electron-builder 打包文件地址

二、打包输出文件路径
electron-builder 打包的将文件打包到项目根目录的dist目录中

三、mac打包为什么要授权签名
mac 在打dmg和mas包的时候都需要授权和签名, 要不然mac安装的时候需要让用户确认给权限去安装, 证书授权和签名之后, 就需要确认了, 直接就能安装了

四、electron-builder执行 默认是执行electron-builder.yml文件, electron-builder --config 可以自定义设置可执行文件
```

####五、 electron-builder配置项, 这是正常打 exe, dmg ,deb的包, 是上传到mas的包的配置
```

electron打包就是生成对应平台的安装文件，正常就是在本地打包就是生成到本地

1. 正常的electron-builder.yml配置

// 安装包的包名就是安装后的目录名
appId: 'baidu'
// 打包输出的安装包格式， mac默认输出dmg和zip
target: 
    - dmg
    - zip
// 应用可执行文件名称
productName: '百度'
// 带有后缀的应用可执行文件名称
artifactName: '${productName}_Setup_${version}.${ext}'
// 版权信息声明
copyright: baidu @ 2022 baidu
// 是否在开始编译前重构原生依赖,可先尝试true, 如果出现问题再修改为false,
npmRebuild: false
directories:
   // 打包后输出到本地和配置文件同级的目录名
   output: releases
// 触发公证, 通过结合electron-notarize 写一个公正脚本, 对mac 进行公正, 否则安装时会提示恶意软件, mac包还需要进行签名, 而windows包只需要签名不需要公正
afterSign: ./notarize.js
/* electron 打包的时候会把files配置打包到安装包的（/Applications/有道云笔记.app/Contents/Resources/app.asar）这个目录下的 app.asar压缩文件中, 配置的路径需要和项目中路径对应， 并且打包到app.asar中目录也被保留，app.asar是一个asar压缩文件， app.getAppPath获取的就是app.asar文件的路径 /Applications/有道云笔记.app/Contents/Resources/app.asar
*/
files:
    - dist/bridge.js
    - dist/collect.js
    - dist/context.js
    - dist/main.js
    // 设置打到包中的图标
    - icons

    // 将项目的build目录和里面的内容移动到应用程序的资源目录中, 安装应用程序后, 会存放在电脑本地的
    // 对应目录中  mac 就是在 应用程序安装包的Contents/Resources目录中，Linux 和 Windows 就是在安装包的resources目录中）
    // extraResources配置的路径需要和项目中路径对应， 并且打包后这个路径会在安装包内保存，extraResources配置会被打包到/Applications/有道云笔记.app/Contents/Resources/目录中
extraResources:
    // build配置的路径需要和项目中路径对应， 并且打包后这个路径会在安装包内保存，build会被打包到/Applications/有道云笔记.app/Contents/Resources/目录中
    - build/**
// extraFiles配置的路径需要和项目中路径对应， 并且打包后这个路径会在安装包内保存，extraFiles配置会被打包到/Applications/有道云笔记.app/Contents/目录中
extraFiles:
    // dll会被打包到/Applications/有道云笔记.app/Contents/目录中
    - dll/**
// 软件安装时候的一些自定义配置, 如不过设置, 就是默认的意见安装不能自定义选择, windows .exe包的配置
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
    writeUpdateInfo: false,
    // mac dmg安装时候的安装界面背景图片， 图片路径相对于打包配置文件可以取到就可以
    background: "build/mac-install/background.png"
// 打包windows环境的包, 默认打包是exe格式, 还可以是nsis格式, windows打包也需要签名, 签名时也需要证书
// electron-builder --windows --publish always 打包window的指令
win:
    // 代表加密的方式，一般分为'sha256'与'sha1'两种方式，正常就是写sha256就行
    signingHashAlgorithms:
        - sha256
    //安装包的格式，默认是"nsis"， nsis就是exe格式
    target: 
        - msi
        - nsis     
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
// electron-builder --mac --publish always 到包mac dmg包的指令
mac:
    // 获取到证书的用户id，就是要签名， 不签名的包需要mac开启很多的权限才能打开， 签名的包只需要进行一次二次确认就可以打开， 就是Apple 的开发者认证
    identity: baidu (77Q6F9P39T)
    // hardenedRuntime就需要写成true
    hardenedRuntime: true
    // 配置签名文件, 申请到可以操作系统的权利
    entitlements: entitlements.mac.plist
    publish:
         // 服务器提供商 正常generic就行
        - provider: generic
          // 检查更新的地址， 下载更新安装包的地址， 打包完成后上穿zip、exe、.yml更新配置文件的地址
          url: xxxx
          // 生成的更新配置文件的前缀名称
          channel: latest
// 生成linux包
// 构建linux包的指令 electron-builder --linux --publish always
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

```
2. electron-builder.mas.yml 配置

打mac端上传 appstore的包

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
    // 设置打到包中的图标
    - icons

    //  extraResources将项目的build目录和里面的内容移动到应用程序的资源目录中, 安装应用程序后, 会存放在电脑本地的
    // 对应目录中  mac 就是在 应用程序安装包的Contents/Resources目录中，Linux 和 Windows 就是在安装包的resources目录中）
extraResources:
    - build/**
    // extraFiles 将项目根目录下的dll目录打包进应用程序的安装包中, 在mac中Contents/Resources目录是同级, 在Linux 和 Windows中 就是和安装包的resources目录同级, 和extraResources作用一样只是存放额外的本地文件的, 可以在应用程序代码中读取
    extraResources和extraFiles配置的目录都会被签名, 不签名将会报错无法使用
extraFiles:
    - dll/**
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
mac:
    identity: 
    hardenedRuntime: true
    entitlements: ./entitlements.mac.inherit.plist
    publish:
        - provider: generic
          url: 
          channel: latest
  // electron-builder --config ./electron-builder-mas.yml --mac mas 打包mac mas包的指令
mas:
    identity: null
    asarUnpack:
        - '**/*.node'
    entitlements: ./entitlements.mas.plist
    // 配置可以授予Electron在内部访问权限文件时相同的权限, 打mas包和mac dmg 包的的entitlements配置文件是不同的, 只有打mas包才需要配置entitlementsInherit项
    entitlementsInherit: ./entitlements.mas.inherit.plist
    // 文件在开发者网站下载配置项
    provisioningProfile: ./dist.provisionprofile
    hardenedRuntime: false
    extendInfo:
        ITSAppUsesNonExemptEncryption: false
masDev:
    identity: null
    // 包的类型
    type: development
    // 压缩过滤node文件, 否则无法对node文件进行签名
    asarUnpack:
        - '**/*.node'
    entitlements: ./entitlements.mas.plist
    entitlementsInherit: ./entitlements.mas.inherit.plist
    provisioningProfile: ./dev.provisionprofile
    hardenedRuntime: false
```
### electron-notarize配置参数
```
const { notarize } = require('electron-notarize');
notarize({
  appPath: '',          // 应用的路径 xxx.app 结尾的 
  appBundleId: '',      // appid
  appleId: '',          // 苹果开发者 id
  appleIdPassword: '',  // 应用专用密码
  ascProvider: ''       // 证书提供者
})

1. appPath打包后应用的路径，.app 或者 .dmg 结尾。

2. appBundleId 跟 Electron-builder 配置的 appId 一致，这个 appId 要妥善命名。不要发布应用以后再修改，不然会导致应用无法自动更新。

3. 苹果开发者的账号 appleId，填写自己的开发者id 就可以，确保自己是属于开发者。应用专用密码 appleIdPassword, https://appleid.apple.com/
```
####  公正和签名步骤
其他公正和签名步骤在这里 https://www.cnblogs.com/mmykdbc/p/11468908.html

####  electron 个人理解
```
1. 构建什么哪个系统的包, 是更具执行的构建指令决定的, 比如 electron-builder --mac 就是构建macos 的包, 如果没有执行包格式, 默认就是构建dmg和zip格式包

2. win, mac ,liunx 在配置文件中就是对各个系统的打包配置, dmg, mas, deb, 这些配置都是对对应格式的包进行的单独配置

3. electron 主进程就是被node执行的脚本, 所以在electron 主进程就可以正常用node api, 并且在electron主进程中给node的一些模块附加了新的属性, 例如process模块, electron也是c++开发的, 所以可以扩展node

4. electron的工作模式, 就是将页面打包到应用程序中, 然后在应用程序中起本地node服务, 请求本地页面展示

5. package.json既是node项目中的配置文件, 也是electron的配置文件, main字段是我们electron应用程序的主进程启动文件

```

#### electron-updater 更新流程和安装更新原理

1. electron应用的更新依赖于electron应用中打包进来的electron-updater

2. electron-updater只包括了mac和windows的更新不包括linux

3. mac使用electron-updater，下载来的更新文件是 update-info.json和一个应用的zip压缩包

4.  windows使用electron-updater，下载来的更新文件是 update-info.json和.exe的windows可执行文件

5. mac 的下载内容{"fileName":"百度-7.1.6.zip","sha512":"HYSaPDxMpcACHoWbrdnLuz5QuC+yYv9Yhl6Odg8DRlDKczf95Yk4te0m0k","isAdminRightsRequired":false}， update-info.json安装文件具体内容，
6. 然后安装新的更新的时候会安装新的安装包， 然后更新update-info.json文件的内容为最新安装包的信息，然后更新的时候就用最新的安装包更新

7. Electron 打包要进行签名的原因是， 如果不签名打出来的包在打开的时候， 需要开很多的权限才能打开， 如果进行了签名，那就只会弹出一个确定时候打开的弹窗， 点击确定就可以打开

8. autoUpdater.setFeedURL({
    provider: 'generic',
    // 去检查更新的地址， 
    url: '',
    latest-arm64-mac.yml更新文件的前缀
    channel: 'latest-arm64',
});

electron-builder构建之后根据autoUpdater.setFeedURL的channel配置生成一个包含更新信息的形如latest-arm64-mac.yml的文件

9. 检查更新的时候就是autoUpdater 去autoUpdater.setFeedURL 配置的url地址检查形如latest-arm64-mac.yml的文件的内容， 有更新就通知更新，然后去下载， 没有更新就通知没有更新

10. zip、exe、dmg、 latest-arm64-mac.yml更新配置文件， 都是打包后生成到打包输出目录的

11. 打包后生成的文件的上传地址和更新配置的地址是一个地址

12. 更新版本的文件配置在哪里配还需要再问问, 更新配置文件和zip dmg啥的都会在打包完事之后穿到制品平台，然后我们检查更新那个地址也是我们资源上传的那个地址

13. electron autoUpdater模块的实现， windows是依赖 Squirrel.Windows， mac是依赖于 Squirrel.Mac

14. 如果本地已经下载了最新版本想直接更新，需要在从autoUpdater.checkForUpdates()，开始从新走一遍流程，经历所有的事件，然后触发autoUpdater.downloadUpdate();去下载，因为本地已经有了最新版本， 所有autoUpdater回去比对线上更新文件和本地更新文件的版本信息， 如果是最新的，就不会下载了， 直接执行update-downloadedupdate-downloaded事件回调，在这个回调中直接调用 autoUpdater.quitAndInstall(false);退出安装并重启

15. 分享包的使用首先要看看包源码ts配置中对外暴露的api，不要单纯看文档， 然后看看包如何log输出，要认真看输出的log，然后根据这两点分析实现想要的功能, 还有结合源码中对应的注释分析实现

#### electron中node 调用c/c++编写的动态链接库的是方法

1. 就是通过ffi-napi调用c/c++编写的动态链接库

[electron调用动态链接库](https://www.cnblogs.com/silenzio/p/11606389.html)


#### node调用的c++动态链接库的方法

1. 通过node-ffi 调用, 不需要进行c++操作

2. 通过官方的提供的方式 node-addons 调用, 需要进行c++操作了解c++;

3. 如果node-ffi不满足我们需求, 还需要自己重新修改编译node-ffi,获得满足自己需求的node-ffi,然后在调用

### electron 运行原理

1. 本地开发的时候使用electron .启动应用和进程，就是通过本地项目node_modules中的electron可执行文件（/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron）启动应用， 并执行package.json中的main字段配置的文件， 启动主进程，如果没有配置main字段， 执行项目根目录中的index.js启动主进程， 打包之后执行的原理和本地开发的时候差不多, 使用app.getPath('exe') (/Applications/有道云笔记.app/Contents/MacOS/有道云笔记)对应路径下的，应用可执行文件，去执行app.asar中package.json中的main字段配置的文件启动主进程





### 桌面端应用程序主要的目录

1. 桌面端安装后存放静态资源的目录, 通过process.env.resourcesPath 可以获取
2. 桌面端安装后应用程序的数据目录, 通过process.env.AppData 可以获取
3. 存放应用程序主进程需要执行的文件的目录, 通过app.getAppPath()获取, 这个路径在哪我还没有找到


### arm64和x64的区别

arm和x86是不同的指令集体系， arm64是指arm指令集体系中的64位体系， x64是指x86指令集体系中的64位体系，一般就是指对应体系对应位数的处理器芯片

node的 process.arch的取值的固定的， arm版本的node process.arch就是arm64， x64版本的node， process.arch就是x64，x64版本的node安装在arm系统的电脑上， process.arch的取值还是x64


### electron 另一个日志输出地址

/Users/your_userName/Library/Caches

### electron打日志的方式

1. Electron-log

Electron-log默认日志会被记录在如下位置：

on Linux: ~/.config/{app name}/logs/{process type}.log
on macOS: ~/Library/Logs/{app name}/{process type}.log
on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log


2. 自己将log写入本地文件

3. 在看看electron-updater是怎么打log的

### 遇到的问题

 一、macos 本身支持的指令，将background.png background@2x.png合成一个和background.png 图片尺寸一样的，但是更清晰的.tiff格式图片

1. tiffutil -cathidpicheck background.png background@2x.png -out background.tiff

2. 配置mac安装界面背景图，background.png 540x360的图片是糊的，所以需要处理成tiff


二、
1. mac下载完更新后，需要等一会在执行quitAndinstall 要不然会安装不上

2. mac本地已经下载过最新安装包，通过设置autoInstallOnAppQuit = true，退出后，在此重启正常会自动安装更新，但是退出后，快速重启这个时候mac还没有安装完毕， 就不会更新成功

3. 如果本地已经下载了最新版本想直接更新，需要在从autoUpdater.checkForUpdates()，开始从新走一遍流程，经历所有的事件，然后触发autoUpdater.downloadUpdate();去下载，因为本地已经有了最新版本， 所有autoUpdater回去比对线上更新文件和本地更新文件的版本信息， 如果是最新的，就不会下载了， 直接执行update-downloadedupdate-downloaded事件回调，在这个回调中直接调用 autoUpdater.quitAndInstall(false);退出安装并重启, m1电脑如果下载完退出，快速打开应用，这个时候没有更新成功，
然后执行上面路径的时候，就会报错， 所以需要在error事件中判断一下，然后直接qpp.relaunch() app.exit(0) 重启， 重启可以就可以更新成功了

### electron-updater灰度发布

* 通过js-yaml可以操作更新yaml文件，添加stagingPercentage字段，字段的取值是0-100，为20就是表示小于20的可以更新，就是20%可以更新， electron-builder构建后，用户安装后electron-updater 本身也包含了灰度发布的逻辑。它会生成一个不变的 stagingUserId 写到本地文件中，作为唯一 id，然后计算出一个 0-100 的数字后，和stagingPercentage字段值比对，如果小于stagingPercentage字段值就表示可以更新

```
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
try {
  const doc = yaml.load(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
```

* 可以上传两个yaml更新文件， 在一个是全量发布的， 一个是灰度发布的， 灰度更新的时候在网管控制一下，将请求全量更新文件的请求
代理到去请求灰度更新的文件

* electron-updater 可以做全量更新、增量更新、局部更新 参考这个文章 https://juejin.cn/post/7061607016036302861


