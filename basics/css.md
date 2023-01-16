1. 移动端适配

设备像素（也叫物理像素，就是具体的一个长度， 单位是pt， 我们的设计稿的长度就是设备像素， 这个长度是一个确定的真实的值）

css 像素（也叫逻辑像素， 就是我们写css的时候写的那个像素， 单位是px，css像素写了之后，也是一个确定的数， 就是这个数了）

dpr （设备像素比）=  物理像素/css像素 （任意一个方向上的），每个手机的设备像素比都是固定的， 设备像素比决定了，写代码写css的时候， 写的这个px的值， 在手机上的视口中， 真实所占的长度， 我们写rem适配移动端的时候， 完全用不到dpr和dpr没关系， 就根据我们设计稿提供的占满视口的宽度， 还有获取到的当前视口的css像素宽度（document.documentElement.clientWitch 获取到的是当前这个手机视口的宽度的 CSS像素）就可以实现适配了


移动端的视口是通过html中的meta标签， name属性为viewport， 然后在设置content的值，来设置视口宽度，高度， 缩放比等，
视口的设置对pc端没有影响， 对移动端很重要


2. width 100% 和 auto的区别：

width 100%, 表示子元素的内容宽度（content的宽度）等于父元素的内容宽度（content的宽度）

width auto 表示子元素的整体宽度（包括padding， 边框等），等于父元素的内容宽度（content的宽度）

3. css的一个规律， top 和left 是相对于父级的， bottom和right是相对于自己的


4. 解决安卓手机按钮文案不垂直居中， 设置这个属性 line-height: normal;


5. 移动端适配脚本
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
// 移动端自适应脚本
    (function (doc, win) {
      const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth > 414) {
            clientWidth = 414;
          }
          docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

### rem 做移动端适配的原理

1. 首先设计稿给的宽度都是物理像素， 我们开发的时候只是用到了设计稿中占满屏幕的宽度是多宽， 用到了这个占满屏幕的宽度的这个比例, 表示设计图宽度由多少份组成

2. document.documentElement.clientWitch 获取到的是当前这个手机视口的宽度的 CSS像素， 就是我们写多少css 像素，在渲染的时候可以占满这个手机的视口宽度. 这个值很关键， 因为有了这个值，才能进行根据设计图的比例对不同视口宽度的css像素值进行转换

3. 所以当设计稿给的屏幕宽度是375的时候，说明页面展示比例， 所以我们就预设好css像素的转化比例，进行适配不同视口宽度的css像素的转换， 然后我们用rem表示，当视口宽度发生改变的时候，css像素的转化比例发生变化， 这个时候我们只需要更新转化后的html 元素的font-size的值，适配不同视口宽度的css像素的转换，保证页面展示和设计稿比例相同, 我们也不需要修改我们的css代码

4. 所以在为了开发方便， 我们在转化的时候， 根据设计图的宽度，来决定我们转化代码的编写，
比如设计稿是375， 所以为了我们在写代码时和设计稿上的数值相同， 我们就将视口宽度为375px css像素的时候，设置为获取转化比例的分母，我们把计算html的font-size的时候的倍数设置为100， 是为了我们将px转化为rem的时候好算， 所以我们根据设计图将css像素转换为rem是视口宽度为375时候的css像素值，然后这个像素值在乘上不同视口宽度对应css像素的转换比例， 得到不同视口宽度说对应真实css像素值

```
以视口宽度为375作为分母的例子例如：

// 移动端自适应脚本
    (function (doc, win) {
      const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth > 414) {
            clientWidth = 414;
          }
          docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
```

### 定位

粘性定位： sticky

只有在有滚动条的时候粘性定位才生效， 粘性定位是设置在滚动的子元素的上边的，在没有滚动到固定的值时，是相对定位， 滚动到设置的阀值，就变成固定定位, 发生就是距离父元素， 顶部， 底部、左边， 右边的距离， 用子元素的top， bottom， left， right 设置

相对定位： relative

相对定位是相对于元素自身的定位，相对于自身顶部多远， 用top设置， 其他的同理， 相对定位不会脱离文档流， 所以当设置了相对定位的时候，元素还是在原来的位置占位的




svg使用

svg 是通过xml语法的一个矢量图， 也是html标签可以被浏览器直接渲染

1. svg 就是一个html标签， 可以被浏览器直接渲染， 改颜色直接改path标签的fill属性

2. 可以将svg标签放在一个.svg的文件中, 然后image标签可以直接引用这个文案的路径展示这个矢量图， 在react中是应用webpack的svg-url-loader实现的

3. 在react中, 可以将svg标签放在一个.svg的文件中, 然后在组件中直接引入这个文件就相当于引入了svg标签, 引入的就是组件了, 然后在react直接使用这个组件, 就相当于使用svg标签了, 这是因为webpack的@svgr/webpack， loader实现的

### 容器查询

给容器设置

.container {
  container-type: inline-size;
  
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
  // 这样就可以监听.container宽度变化改变.card的样式
  @container (max-width: 400px) {
    .card {
      grid-template-columns: 1fr;
    }
  }
}

### css :has 伪类

通过选择器判断父元素内是否有某个子元素，来控制样式展示
p:has(span) {
  /* magic styles */
}

figure:has(figcaption) {
  /* this figure has a figcaption */
}

### 新的 CSS 视口单位
为了解决移动端网页滚动时，动态工具栏自动收缩的问题，CSS 工作组规定了视口的各种状态。

Large viewport（大视口）：视口大小假设任何动态工具栏都是收缩状态。
Small Viewport（小视口）：视口大小假设任何动态工具栏都是扩展状态。
新的视口也分配了单位：

代表 Large viewport 的单位以 lv 为前缀：lvw、lvh、lvi、lvb、lvmin、lvmax。
代表 Small Viewport 的单位以 sv 为前缀：svw、svh、svi、svb、svmin、svmax。

另外还有一个  Dynamic viewport（动态视口）

当动态工具栏展开时，动态视口等于小视口的大小。当动态工具栏被缩回时，动态视口等于大视口的大小。

相应的，它的视口单位以 dv 为前缀：dvw, dvh, dvi, dvb, dvmin, dvmax。

目前，各大浏览器均已经对新的视口单位提供了支持：

### @layer 样式优先级
排在后面的样式优先级更高， 所以override样式的优先级更高
@layer 里边设置的类名可以是相同的，也可以是不同的，但是都是要在同一个元素上的

写优先级的时候必须的样式是一一对应的，这样才能显示出优先级， 比如color就都要有color


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
<style>
    
    @layer test2, test1;
    @layer test1 {
        .title1 {
            color: red;
        }
    }
    
    @layer test2 {
        .title {
            color: yellow;
        }
    }
</style>
</head>
<body>
    <h1 class="title title1">我的第一个标题</h1>

</body>
</html>
此时字体颜色是红色

### hwb（hue, whiteness, blackness）定义颜色

.text {
  color: hwb(30deg 0% 20%);
}

### 



