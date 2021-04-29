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

1. 需要react-native link  在安卓和ios项目中全局安装

2. ios项目pods的安装可能有问题， 需要在ios目录下手动pod install 重新安装


3. [!] No podspec found for `RNVectorIcons` in `../node_modules/react-native-vector-icons`  缺少图标依赖  ， 解决方式 yarn add react-native-vector-icons

4. 要先启动安卓模拟器， 才能启动安卓项目， 如果模拟器不自动启动的话

5. 安卓除了编译器还有很多jdk的版本需要符合

6. java 版本需要是11

7. 安卓启动报错 Error:Execution failed for task ':app:validateSigningDebug'. > Keystore file D:\Android_keystore\deb  解决方式： 把安卓staio里面把Store File里指定的Keystore文件的路径删除就可以了
```


### react native 调试

1. ![react-native ios 调试](./images/react-native8.png)

2. 审查元素时需要在模拟器上审查元素，然后查找对应的组件， 看看最后面的那个元素选中可以选中全部哪个就是我们要找的组件

3. debug 只能在console 中打印， 或者给react-native源码打断点， 不能查看网络请求


### 安卓发包流程

1.


### ios 发布流程

### react-native 热更新

只有是用react-native 写的代码，不包括新增和更新npm包， 并且不是针对之前的版本更新， 不是发新的版本， 那就可以使用热更新



