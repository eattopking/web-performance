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


## 浏览器性能调试总结

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
