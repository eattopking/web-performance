## 一、移动端问题

1. 移动端文字垂直居中问题, height 和 line-height 值的省略方式不同, 所以相同的时候, 转成 rem 后也会出现偏差, 所以移动端不能使用 height 和 line-height 设置文字垂直居中, 但是有的手机上是没有这个问题的

解决方案: 将按钮设置成 display: flex, align-items: center

2. 移动端遇到问题的解决步骤, 首先清除缓存, 看看有没有明显的报错, 最后在看代码

3. 微信 x5 浏览器内核是自己研发的, 在安卓端微信 x5 浏览器内核会在 vadio 标签开始播放的时候, 会将 vadio 的 zindex 设置成 max,导致自定义设置 vadio 的层级失效, 其他元素无法超过 vadio 的 zindex

4. ios 输入法的键盘会输入一串文字会出现， 会带出来很多其他没有用的英文， 这个需要控制输入框的事件， 具体方案
还需要再看看

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

2. location.href跳转页面， 路径前面不加/  ,会和当前路径拼接请求， 出现错误， 这是个坑

3. charles可以代理文件的响应值， 也可以代理数据的响应值

4.
```
<input type="file"/ > 上传图片的时候，ie浏览器会把png的图片，解析成x-png的格式，把jpg和jpeg的图片转成pjpeg格式， 而其他浏览器将png的图片转成png， 将jpeg和jpg转为jpeg了， 所有在前端类型判断的时候就踩了坑

```

## 四. react问题

1. 路由问题，Router 刷新界面 state 就没了 ，state 刷新界面不会保留, 所以种不是一锤子买卖的， 需要用 search, 因为 search 是在地址栏中保留的, 所以跳路由的需求, 需要在目标界面发送请求, 只通过 router 传递参数, 我还得看看为啥 state 刷新界面后就不会保留了

2. state取得值，不是最新的问题

3. 路由可以穿透， 设置父组件的路由参数， 在子组件内也可以直接取到， 这个是学到了

```
const componentSelectConfig = [
        {
            label: '课堂组件',
            icon: 'icon-ic_Left-guide_Classroom-components',
            key: 1,
            children: [
                {
                    label: '导航栏',
                    icon: 'icon-ic_Left-guide_navigation',
                    key: 1,
                    disabled: hasNav(),
                    onClick: () => {
                        // 在这里addNav里面加的配置里面的使用state 定义fixedConfig话，
                        // 在deleteNav中取到的就是fixedConfig没有新增之前值， 这就不对
                        // 在当前层取到的fixedConfig就是正确的
                        // 使用useref定义fixedConfig就能取到最新正确的值
                        // state在这种情况下，多一层就取不到最新的值了
                        addNav();
                    },
                }
            ],
        },
    ];
// 增加导航栏
    function addNav() {
        const key = 'nav';
        const type = 'nav';
        const addItem = {
            type,
            key,
            onClick: () => {
                setCurrentlySelectedKey(key);
                setCurrentlySelectedType(type);
            },
        };
        btnConfig[key] = [
            {
                label: '上移',
                key: 'up',
            },
            {label: '下移', key: 'down'},
            {
                label: '删除',
                key: 'delete',
                onClick: () => {
                    deleteNav(key);
                },
            },
        ];
        // 更新全部配置
        fixedConfig.current = [...fixedConfig.current, addItem];
        // 更新当前选中组件key
        setCurrentlySelectedKey(key);
        // 更新当前选中组件类型
        setCurrentlySelectedType(type);
    }
```

## 五. antd 问题

1. form 自定义分组, 设值和取值, 现在探究的方式的通过 formitem 包裹自定义的受控组件实现

## 六 prettier 配置vscode 问题

1. vscode只有一个setting.json配置文件，所有的东西都是在这里面配置的
2. prettier 的一些配置可以在vscode的setting.json配置文件中配置， 有些不行配置了不生效
3. prettier可以在项目根目录的.prettierrc文件中配置
4. 还有一点很重要，在vscode的setting.json中配置prettier， 一定要重启vscode


### css 问题

1. 父元素设置felx， 子元素就不能给他撑高了， 这是个坑


2. 是值overfolw-y : auto , 这时候x也会出滚动条莫名的， 此时只要设置overflow-x：hidden就可以解决了

