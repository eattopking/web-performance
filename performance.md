## 这里是对平时遇到的一些性能问题的总结

1. 强缓存协商缓

2. 本地存储 localstorage, indexdb, sessionstorage, 比如表格替换, 进行缓存数据, 跳转回来不用在了请求, 减少了http请求

3. 使用cdn 缓存图片, 使用webp压缩图片大小

4. 代码方面, react, 将功能拆分, 并且每个功能块, shouldupdate控制更新, 提供的api开关,使用批量更新, 差异更新, 减少和后台交互的字段, 较少数据量, 减少循环的嵌套, 使用高阶组件避免冗余

5. http请求这里使用dns预解析

6. 就是避免重排重绘, 比如获取宽度, js中设置样式

7. 避免内存泄漏

8. 移动端使用ssr优化首屏渲染速度

9. 防止重复请求, 截流防抖

10. 使用transfrom:translate实现移动, 避免使用定位, 因为定位会重复触发浏览器布局和之后的绘制的过程,而transfrom:translate直接跳过了, 布局和绘制, 直接执行了绘制之后的合成过程, 这样减小了浏览器的开销,优化了性能
11. service work 就是离线缓存， 在用户没有网的时候也可以用原来的数据进行操作界面

性能优化，先说性能优化指标， 然后再说使用什么手段优化哪个指标

## 浏览器控制台总结
### 浏览器性能调试总结

### 控制台简介

![控制台简介](./images/browser1.png)
### performance全局对象

```
在js中通过performance全局对象获取，当前网页的相关性能数据
```

### element 相关的总结

![element 相关的总结](./images/element1.png)

### memory 相关的总结

![memory 相关的总结](./images/memory1.png)

### network 相关的总结

1.

![network 详情](./images/network-first.png)

2.

![network 详情](./images/network-block-request.jpeg)

3.

![network 详情](./images/network-load.jpeg)

4.

![network 详情](./images/network-p-log.png)

5.

![network 详情](./images/network-alltime.png)

6.

![network 详情](./images/network-screen.png)

7.

![network 详情](./images/network-time-one.png)

8.

![network 详情](./images/network-time-two.png)

9.

![network 详情](./images/network-timing.png)

10.

![network 详情](./images/network-yilai.png)

### 使用Lighthouse 进行网页性能检测

一. 第一种使用lighthouse方式
```
npm install -g lighthouse 全局安装

lighthouse 网址地址

这样就可以进入网站检测网站了， 但是这样还需要自己加一些参数
```

二. 第二种方式
```
chrome 开发者工具提供的Lighthouse 核心模块
```
1. 使用Lighthouse检测页面性能， performance， 还有其他检测选项， 查看结果和performance相同

![开发者工具提供的Lighthouse 详情](./images/lighthouse1.png)

![开发者工具提供的Lighthouse 详情](./images/lighthouse2.jpeg)

![开发者工具提供的Lighthouse 详情](./images/lighthouse3.png)

![开发者工具提供的Lighthouse 详情](./images/lighthouse4.png)


### 使用layers 查看页面的图层

![使用layers](./images/layers.png)

### 使用performance 查看页面的图层

![performance](./images/performance1.png)

![performance](./images/performance2.png)

![performance](./images/performance3.png)

![performance](./images/performance4.png)

![performance](./images/performance5.png)

![performance](./images/performance6.jpeg)

![performance](./images/performance7.png)

![performance](./images/performance8.png)

![performance](./images/performance9.png)

![performance](./images/performance10.jpeg)

![performance](./images/performance11.png)

![performance](./images/performance12.png)

![performance](./images/performance14.png)