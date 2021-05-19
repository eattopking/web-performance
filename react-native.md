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

只有是用react-native 写的代码，不包括新增和更新npm包， 并且不是针对之前的版本更新， 不是发新的版本， 那就可以使用热更新, 热更新需要有一个热更新的平台

### 手机上的抓包工具

ios 手机、pad 上使用 stream 软件抓包

安卓手机上一般还是时候用charles

###



