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
