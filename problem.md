一、移动端问题

1. 移动端文字垂直居中问题, height和line-height值的省略方式不同, 所以相同的时候, 转成rem后也会出现偏差, 所以移动端不能使用height和line-height设置文字垂直居中, 但是有的手机上是没有这个问题的 

解决方案:  将按钮设置成display: flex, align-items: center

2. 移动端遇到问题的解决步骤, 首先清除缓存, 看看有没有明显的报错, 最后在看代码

3. 微信x5浏览器内核是自己研发的, 在安卓端微信x5浏览器内核会在vadio标签开始播放的时候, 会将vadio的zindex设置成max,导致自定义设置vadio的层级失效, 其他元素无法超过vadio的zindex

解决方案: 
1. 解决办法是在滚动开始时暂停视频播放

var video = document.getElementsByTagName("video")[0];
      myScroll.on('scrollStart', function() {
        video.pause(); //暂停播放
        video.style.display = "none"; //隐藏
      });
滚动结束后显示视频：

myScroll.on('scrollEnd', function() {
        if(this.y > -_wh/2 && this.y < 0) {
            myScroll.scrollTo(0,0,500);
          }
          if(this.y > -_wh && this.y < -_wh/2) {
            myScroll.scrollTo(0,-_wh,500);
          }
            video.style.display = "block"; // 重新展示视频
      });

2. 我的解决办法是任何操作后直接设置video ０px

这是两个解决方案, 有待验证


二. 语法代码规范问题

1. const 重复声明会导致编译后, 原来俩个名字相同的变量, 变成不同名字的变量, 比如变成 (_name和name)

2. react 不要犯的错误, 不要将父组件的this直接传到子组件, 这样可能会发生报错, (现在移动端发生了疑似的报错, pc端是没有问题的) ,
3. 不要将组件内的对象或者createref通过props传入子组件,然后在子组件内更改, 在父组件内获取跟新的值, 就是不要直接更改props, 这样做违背的react的单向数据流原则, 可能出现不可预测的问题, 可以通过传一个函数给子组件, 然后在函数内更改父组件内的对象的值, 这就是render props, 这样是可以的
4. 






