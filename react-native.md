### react-native xcode 起项目 步骤

1. 在项目目录下, npm install 安装依赖

2. 切换到ios 目录下 pod install， 如果构建报错或者pod install 报错可以删除Podfile.lock, 多次pod install

3. ![react-native ios 起项目 步骤](./images/react-native1.png)
4. ![react-native ios 起项目 步骤](./images/react-native2.png)
5. ![react-native ios 起项目 步骤](./images/react-native3.png)
6. ![react-native ios 起项目 步骤](./images/react-native4.png)

7. 基本上在ios上开发就行， 只需要在用安卓环境比较是否有差异就行了

8. 开发的ios的时候只需要xcode 启动一次项目就行了， 就可以热更新监听react-native代码的更新， 并编译成最新的ios代码

9. 只需要开发完使用npm run build 打包一个生产环境的包， 别的时候不需要执行npm 指令

10. ![react-native ios 起项目 步骤](./images/react-native5.png)
11. ![react-native ios 起项目 步骤](./images/react-native6.png)
12. ![react-native ios 起项目 步骤](./images/react-native7.png)

```
搭建环境


1.. ios项目pods的安装可能有问题， 需要在ios目录下手动pod install 重新安装


2. [!] No podspec found for `RNVectorIcons` in `../node_modules/react-native-vector-icons`  缺少图标依赖  ， 解决方式 yarn add react-native-vector-icons

3. 要先启动安卓模拟器， 才能启动安卓项目， 如果模拟器不自动启动的话

4. 安卓除了编译器还有很多jdk的版本需要符合

5. java 版本需要是11

6. 安卓启动报错 Error:Execution failed for task ':app:validateSigningDebug'. > Keystore file D:\Android_keystore\deb  解决方式： 把安卓staio里面把Store File里指定的Keystore文件的路径删除就可以了
```


### react native 调试

1. ![react-native ios 调试](./images/react-native8.png)

2. 审查元素时需要在模拟器上审查元素，然后查找对应的组件， 看看最后面的那个元素选中可以选中全部哪个就是我们要找的组件

3. debug 只能在console 中打印， 或者给react-native源码打断点， 不能查看网络请求

4. 在安卓和ios上都可以使用 yarn start 构建rn服务后， 在测试包的调试模式下配置起服务的电脑和端口（8081）， 这样测试包上就可以执行本地的业务代码了
[react-native ios 调试](./images/react-native16.jpeg)
[react-native ios 调试](./images/react-native17.png)

5. react-native 摇一摇那个调试页面，只有在rn构建后， 在xcode 和 安卓构建工具上只有构建debug包，才会展示rn内代码才会判断这个调试界面能展示出来，如果是正式包rn判断这个调试界面不会出来

6. 如果其它配置都没问题 ，但是摇一摇连接就是连接不上, 这个时候就按照报错上面展示的链接，在浏览器打开这个链接， 这个链接就是代理到我们手机的rn打包后的js文件，这个时候我们通过手机相机扫一扫这个页面在chrome上生成的二维码，之后就可以进行代理了， 然后我们在通过摇一摇重新连接一次
就好了
### 安卓发包流程


1. 在项目根目录下执行yarn build-android生成main.jsbundle和资源文件包assets

2. 将rn 项目生成的 main.jsbundle 文件替换掉原生项目中的main.jsbundle

3. 用第二步生成的/build/android中的其他所有文件夹替换掉 原生项目中/app/src/main/res中的同名文件夹

4. 根据需要打debug/release包，按照图示位置选择不同的打包方式：WeiShiDebug/WeiShiRelease
[react-native ios 调试](./images/react-native9.png)

5. 点击图一位置开始打包，然后会弹出图二所示弹框，选择APK，点击Next，在图三选择打包需要的签名文件（文件路径在原生项目的.keystore文件中），填写签名密码和keyAlias（在build.gradle中搜索storePassword和keyAlias可以看到具体值）。在图四选择包输出路径和打包环境（注意跟第五步对应），然后就能在指定路径输出apk安装包。debug和release安装包都可以直接上传蒲公英供下载。


[react-native ios 调试](./images/react-native10.png)
[react-native ios 调试](./images/react-native11.png)
[react-native ios 调试](./images/react-native12.png)

6. 最终要发布的包，出于安全考虑，需要利用工具进行加固+重签名，然后在 oms(就是内部的安装包管理平台) 上传。下载安装打开360加固助手，注册登录之后，如图一所示位置先添加签名（和第六步中图三一样的签名），然后将第六步生成的apk安装包拖动到指定位置等待加固和重签名。打开oms（就是内部的安装包管理平台），在图二位置填写相关内容，其中md5可以打开终端：md5 安装包路径  获取md5值（如图三所示）。之后点Submit，上传完成之后，在最终结果页点立即生效/立即更新， 安卓包发布完毕， 让pm发到各个应用商店

7. 报错解决 Cannot run program "node" /@react-native-community/cli-platform-android/native_modules.gradle'

解决方案：

open -a /Applications/Android\ Studio.app ./android/weishi-app-android

8.  java.io.IOException: Unable to tunnel through proxy. Proxy returns "HTTP/1.1 405 Method Not Allowed"

这是因为没有引用grade包，需要手动下载引入

[react-native ios 调试](./images/react-native13.png)
[react-native ios 调试](./images/react-native14.png)

9. ReactNative报'event2/event-config.h' file not found解决方案

查阅是因为Flipper-Folly版本导致的，将iOS文件下的 Podfile 文件做如下修改
use_flipper! 修改为 use_flipper!({ 'Flipper-Folly' => '2.3.0' })
改完后保存，将Podfile.lock文件删除，然后重新 pod install
installed完成后，返回上层目录执行 yarn ios (或react-native run-ios)就可以启动了

### ios 发布流程

xcode 构建注意
[react-native ios 调试](./images/react-native15.png)


### react-native 热更新

1. 只有是用react-native 写的代码，不包括新增和更新npm包， 并且不是针对之前的版本更新， 不是发新的版本， 那就可以使用热更新, 热更新需要有一个热更新的平台

2. react-native的热更新需要 在rn代码里引入react-native-code-push这个npm包， 并且配置， 安卓和ios的native端也需要进行配置

3. 然后在rn端编写shell 热更新脚本， 将热更新通过code-push将更新内容传到公司的热更新平台， 然后App杀死进程,重新进入app，就可以查看更新内容了

```
rn 配置如下

import CodePush from 'react-native-code-push';

const codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  //安装模式
  //ON_NEXT_RESUME 下次恢复到前台时
  //ON_NEXT_RESTART 下一次重启时
  //IMMEDIATE 马上更新
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  minimumBackgroundDuration: 60 * 10,
};

//App 是我们的rn，入口组件
export default CodePush(codePushOptions)(App);
```

### 手机上的抓包工具

ios 手机、pad 上使用 stream 软件抓包

安卓手机上一般还是时候用charles

### 踩坑

1. 在做手机中， 如果元素绝对定位超出了父元素的范围， 超出的子元素的点击事件就失效了，
解决方案就是给父元素写固定高度， 不让定位的元素超出父元素的范围

2. react-native App.js这个组件只有app启动初始化的时候才初始化一次, 其他的时候不会有任何的更新\

3. 安卓打包勾选v1，V2导致打的报出现bug， 只勾选v2就没问题

4. 安卓加固后会把签名弄掉， 需要重新签名


常用依赖

    "@ant-design/react-native": "^4.0.5",
    解压缩的包
    "@自己要改/react-native-gzip": "^2.0.0",
    "@自己要改/react-native-smart-tip": "^2.2.6",
    下载资源的包
    "@自己要改/rn-fetch-blob": "^0.12.2",
    rn提供的组件
    "@react-native-community/art": "^1.2.0",
    "@react-native-community/async-storage": "^1.11.0",
    "@react-native-community/cameraroll": "^4.0.0",
    "@react-native-community/clipboard": "^1.5.1",
    "@react-native-community/cookies": "^4.0.1",
    "@react-native-community/image-editor": "^2.3.0",
    "@react-native-community/netinfo": "^5.9.5",
    "@react-native-community/picker": "^1.6.6",
    "@react-native-community/segmented-control": "^2.1.1",
    "@react-native-community/slider": "^3.0.3",
    "@react-native-community/viewpager": "^4.1.6",
    "@yz1311/react-native-http-cache": "^0.3.1",
    "axios": "^0.19.2",
    "babel-plugin-transform-remove-console": "^6.9.4",
    "moment": "^2.27.0",
    "ramda": "^0.27.1",
    "rc-form": "^2.4.12",
    "react": "16.13.1",
    "react-native": "0.63.2",
    // 热更新codepush、包
    "react-native-code-push": "^6.3.0",
    获取设备信息的包
    "react-native-device-info": "^8.1.2",
    // 快速渲染图片组件
    "react-native-fast-image": "^8.3.2",
    提供监听用户手机切换组件的组件
    "react-native-gesture-handler": "^1.8.0",
    // 渲染html标签字符串的的组件
    "react-native-htmlview": "^0.15.0",
    // 调起原生的拍照和图片选择组件
    "react-native-image-picker": "^3.2.1",
    过渡效果展示组件
    "react-native-linear-gradient": "^2.5.6",
    rn的md5加密
    "react-native-md5": "^1.0.0",
    rn的modal组件
    "react-native-modal": "^11.5.6",
    rn展示的进度条组件
    "react-native-progress": "^4.1.2",
    有用要安装上
    "react-native-reanimated": "^1.10.1",
    用于rn 在在兄弟元素外层添加元素， 类似于react-protals
    "react-native-root-siblings": "^4.1.0",
    用于rn路由跳转
    "react-native-router-flux": "^4.2.0",
    用于原生层释放未展示的页面，改善 app 内存使用
    "react-native-screens": "^2.9.0",
    rn sentry上报组件
    "react-native-sentry": "^0.43.2",
    rn 全局toast提醒组件
    "react-native-smart-tip": "^2.2.1",
    rn 轮播图组件
    "react-native-snap-carousel": "^3.9.1",
    rn播放音频组件
    "react-native-sound": "^0.11.0",
    rn使用tab切换组件
    "react-native-tab-view": "^2.15.0",
    rn 展示图标组件
    "react-native-vector-icons": "^7.0.0",
    // rn 播放视频组件
    "react-native-video": "^5.1.1",
    // rn 使用webview引入h5页面等
    "react-native-webview": "^11.0.3",
    // rn 调微信功能
    "react-native-wechat-lib": "^1.1.25",
    "react-redux": "^7.2.1",
    "redux": "^4.0.5",
    // redux 设置异步action，就是设置action可以使用函数
    "redux-thunk": "^2.3.0"


### rn中应用原生的方法

安卓中   在原生代码中使用package com.app_rn; 暴露这个文件出去， rn中就可以引用这个模块了

ios中 在原生代码中使用 @implementation SSSSPayModule 暴露模块名称，然后在rn中就可以获取原生的API方法了



问题：

1. 为什么选择Rn

当时在调研的时候也看过flutter，了解到flutter确实在开发复杂的app的时候，比rn开发性能要好， 但是结合但是我们情况， 首先是当时项目要求能快速完成app的重构，并且团队中也没有熟悉flutter的伙伴，再有我们和其他团队的伙伴交流，其他团队有比较成熟的开发rn经验可以借鉴， 而且开发rn主要使用react， 比较好上手，在有就是rn的社区支持比较好，解决问题比较容易，所以结合这几点情况我们选择了rn

2. rn 如何实现的热更新
1. 全局安装code-push-cli,  编写shell 脚本代码， 测试环境和线上环境的热更新推送

首先通过 code-push login 登录code-push 管理后台获取到登录code-push平台的token，然后输入在终端输入token 登录code-push平台， 然后构建js bandle  推动代码到codepush 用于热更， 然后APP杀掉进程重启， 热更完成

2. 项目中安装react-native-code-push

3. 通过react-native-code-push，获取到的这个高阶组件包裹app.js这个这个入口组件，在代码上初始化热更新

3. rn 如何引用native的方法

nativeModules






