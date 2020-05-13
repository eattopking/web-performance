## 一、移动端问题

1. 移动端文字垂直居中问题, height 和 line-height 值的省略方式不同, 所以相同的时候, 转成 rem 后也会出现偏差, 所以移动端不能使用 height 和 line-height 设置文字垂直居中, 但是有的手机上是没有这个问题的

解决方案: 将按钮设置成 display: flex, align-items: center

2. 移动端遇到问题的解决步骤, 首先清除缓存, 看看有没有明显的报错, 最后在看代码

3. 微信 x5 浏览器内核是自己研发的, 在安卓端微信 x5 浏览器内核会在 vadio 标签开始播放的时候, 会将 vadio 的 zindex 设置成 max,导致自定义设置 vadio 的层级失效, 其他元素无法超过 vadio 的 zindex

### 解决方案:

1. 解决办法是在滚动开始时暂停视频播放

```
var video = document.getElementsByTagName("video")[0];
myScroll.on('scrollStart', function() {
    video.pause(); //暂停播放
    video.style.display = "none"; //隐藏
});
滚动结束后显示视频：

myScroll.on('scrollEnd', function() {
    if(this.y > -\_wh/2 && this.y < 0) {
        myScroll.scrollTo(0, 0, 500);
    }
    if(this.y > -\_wh && this.y < -\_wh/2) {
        myScroll.scrollTo(0, -\_wh, 500);
    }
    video.style.display = "block"; // 重新展示视频
});
```

2. 我的解决办法是任何操作后直接设置 video ０ px

这是两个解决方案, 有待验证

## 二. 语法代码规范问题

1. const 重复声明会导致编译后, 原来俩个名字相同的变量, 变成不同名字的变量, 比如变成 (\_name 和 name)

2. react 不要犯的错误, 不要将父组件的 this 直接传到子组件, 这样可能会发生报错, (现在移动端发生了疑似的报错, pc 端是没有问题的) ,
3. 不要将组件内的对象或者 createref 通过 props 传入子组件,然后在子组件内更改, 在父组件内获取跟新的值, 就是不要直接更改 props, 这样做违背的 react 的单向数据流原则, 可能出现不可预测的问题, 可以通过传一个函数给子组件, 然后在函数内更改父组件内的对象的值, 这就是 render props, 这样是可以的

4.

## 三. http 问题

1. 带参数的 post 请求跨域问题: 直接传全路径这种链接跨域 带参数的 post 请求，浏览器会先给后端发送一个 option 请求确认，如果后端返回的响应头和 post 一样，浏览器就会正常的发送 post 请求，给后端，Provisional headers are shown，可能原因就是， 后端的问题， 后端在浏览器第一次发送 option 请求时， 后端 response 的 Access-Control-Allow-Headers 中没有 content-type， 导致浏览器认为 post 请求返回的 content-type 是非法的，所以浏览器直接拦截 post 请求， 不带参数没事， 不会先发一次 option 请求, 现在后端处理跨域，两种方式， 一种是前端传和地址栏 host 不同的全路径请求， 二种是前端不改变正常的 host, 只是在 url 中加上特定的标识，后端再去判断

## 四. 路由问题

1. Router 刷新界面 state 就没了 ，state 刷新界面不会保留, 所以种不是一锤子买卖的， 需要用 search, 因为 search 是在地址栏中保留的, 所以跳路由的需求, 需要在目标界面发送请求, 只通过 router 传递参数, 我还得看看为啥 state 刷新界面后就不会保留了

## 五. antd 问题

1. form 自定义分组, 设值和取值, 现在探究的方式的通过 formitem 包裹自定义的受控组件实现
