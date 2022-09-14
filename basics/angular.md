## angular cli

1. ng new 创建新的angular项目

2. ng serve 构建项目启动本地服务

3. ng generate component xxx 创建组件所以需要的文件

4. 

## angular 主要构成部分

### service

### component

组件主要的三个属性

1. selector组件的 CSS 元素选择器，就是组件名称，用户识别父组件html中的对应组件

2. templateUrl组件模板文件的位置。

3. styleUrls组件私有样式表文件的位置。

### 指令

### 模块

@NgModule({
  // 引入外部模块的列表，引入后所有组件都可以使用
  imports: [],
  // 声明组件，组件只有声明在模块的declarations中才可以展示，声明在AppModule中或者其他模块中都可以
  declarations: [
    AppComponent,
    HeroesComponent
  ],
})
export class AppModule {}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

1. platformBrowserDynamic引入的模块是应用到整个应用，应用里的任意组件都可以使用AppModule模块中通过imports引用的模块

2. 模块除了上面的全局引入还可以局部引入，将一些模块引入到非全局模块中，只给这个非全局模块下的组件使用

3. 每个组件都必须声明在（且只能声明在）一个 模块（NgModule） 中，要不不能展示。

4. 

### 管道

使用 ｜ 调用管道

字符串 ｜ 管道， 字符串会被管道处理后返回新的字符串，管道就是将要显示的数据处理成想要的样子显示，

angular中内置的管道，也可以自定义管道

自定义管道的方式

### 双向数据绑定

[(ngModel)]="hero.name" 

### 动态添加css

<div [class.selected] = "value === 3">, 为true时j就给div上添加selected类名， 为false时会移除类名





