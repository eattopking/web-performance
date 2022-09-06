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