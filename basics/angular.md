## angular cli

1. ng new 创建新的angular项目

2. ng serve 构建项目启动本地服务

3. ng generate component xxx 创建组件所以需要的文件和文件中的基本内容

4. ng generate service hero 创建服务所需文件和文件中的基本内容

## angular 主要构成部分

### http
1. angular http 返回Observable，就是一个和promise有相同作用的处理异步的一个实例

2. Observable.subscribe((data) => {}), Observable subscribe api 回调后返回正确的值， 就是和promise.then是一样的

3. import { HttpClient, HttpHeaders } from '@angular/common/http', 使用http相关的service

4. 继续学习RX.js的相关操作
全局使用
3. http service为什么可以在全局使用的原理，实现起来和理解的不同 TODO

4. http相关的其他知识的学习 TODO

### service
service 将数据处理或者一个独立的功能逻辑提取出出去，供组件等使用的方式
1. 
```
import { Injectable } from '@angular/core';

@Injectable({
  // service的作用域， root表示service可以应用到全局作用域，在任意位置都可以注入这个service
  // providedIn 也可以指定 service生效的模块，作用域可以全局也可以局部
  // providedIn: 'any', 对于非惰性模块共用一个service实例， 对于惰性模块会分别创建自己的实例
  // 组件、指令可以指定providers，指定和自身绑定的service
  // 模块中引入的模块中的组件、指令、管道或服务中也可以注入模块的providers配置的service
  // 这些就是service的作用域
  providedIn: 'root',
})
export class HeroService {

  constructor() { }
}

service是通过Injectable 装饰器创建的一个类
```

2. 使用service的时候需要先引入，然后在依赖注入，然后使用

```
提供单例服务

在 Angular 中有两种方式来生成单例服务：

1. 把 @Injectable() 的 providedIn 属性声明为 root。

2. 把该服务包含在 AppModule 或某个只会被 AppModule 导入的模块中。

3. 单例服务只会创建一个service实例，这个service中的数据都是共用的，所有地方用的service都是一个实例

4. 除了上面的情况，其他情况更具实际情况会产生多个独立的服务实例， 比如在组件中导入服务，那这个组件被引用几次，就会创建几个服务实例， 组件销毁的时候服务实例也被销毁

5. service 通过providedIn的方式设置作用域的时候，构建的时候如果服务没有被依赖注入，可以tree shaking优化，把这个service删除掉，减小代码体积

6. 设置单例service的好方式就是 providedIn: 'root'
```

4. providedIn: 'root'全局作用域提供单例service

5. 模块导入为模块下的组件提供一个共用的service，如果模块被多个模块导入，那么会创建为多个模块创建多个service实例互不影响
6. 组件导入service, 导入组件和其子组件公用一个service实例，组件被创建几次就会创建几个service实例，互不影响

7. 组件、指令、管道或服务中都可以依赖注入service， 组件、指令可以通过providers设置私有化的service

8. service和exports的作用域是反着的
### component

组件主要的三个属性

1. selector组件的 CSS 元素选择器，就是组件名称，用户识别父组件html中的对应组件

2. templateUrl组件模板文件的位置。

3. styleUrls组件私有样式表文件的位置。

import { Component } from '@angular/core';

@Component({
  selector: '',
  templateUrl: '',
  styleUrls: '',
  // 使用组件限定service的作用域
  // 配置只在本组件和其子组件中才能用的service
  providers: [UserService]
})

### 指令

* 创建属性型指令
```
import { Directive, ElementRef } from '@angular/core';

@Directive({
  // 定义css属性选择器，作为指令在调用时候的名称
  selector: '[appHighlight]'
})
export class HighlightDirective {
    // 注入ElementRef，通过ElementRef.nativeElement可以直接获取到指令作用的那个dom元素
    constructor(private el: ElementRef) {
       this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

* 结构型指令

```
```

### 模块
```
根模块AppModule（app.module.ts）

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  // 引入外部模块的列表，引入后所有组件都可以使用
  // 引入就是引入模块对外导出的声明的，就是声明的组件、指令和管道
  imports: [ 
    // 在浏览器展示的项目必须配这个
    BrowserModule,
    // 需要使用双向数据绑定需要引入这个模块
    FormsModule,
    // 根router module 需要在 AppModule中引入
    AppRoutingModule,
    // 要想全局使用 import { HttpClient, HttpHeaders } from '@angular/common/http', 需要在AppModule中引入HttpClientModule

    HttpClientModule
    ],
  // 声明组件、指令和管道的列表，组件、指令和管道只有声明在模块的declarations中才可以使用，声明在AppModule中或者其他模块中都可以
  // 组件、指令和管道只能在一个模块中声明，不能重复在多个模块中声明，否则会报错
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  // 指定模块下声明的组件和其子组件可以注入依赖的service（可以使用的service）
  // 模块中引入的模块中的组件、指令、管道或服务中也可以注入providers配置的service
  providers: [
    UserService
  ],
  // 要自动启动的组件列表，这里边正常应用放一个根组件就行
  bootstrap: [AppComponent],
  // 只有本模块导出了指令、管道、组件或者模块，其他模块导入了本模块，其他模块的指令、管道、组件中才可以使用本模块导出的指令、管道、组件，或者导出的模块中导出的指令、管道、组件
  // exports本质是导出指令、管道、组件
  // 导出的指令、管道、组件只会被导入的模块中的指令、管道、组件引用
  // exports 可以导出指令、管道、组件和模块，导致模块就是导出模块中的指令、管道、组件
  // 模块本身的声明的指令、管道、组件是可以相互引用的
  // 重新导出： A模块中引入B模块然后然后将B模块exports出去，就叫重新导出，这个时候A模块被C模块引用
  这个时候C模块就可以直接使用B模块中的指令、管道、组件
  // service不需要导出就可以使用，只要设定好作用域就可以了
  // 模块 B 不会因为它导入了模块 A，而模块 A 导入了 CommonModule 而能够使用 ngIf。 模块 B 必须自己导入 
  CommonModule， 除非A导出了CommonModule

  // 想使用模块的导出就需要先将模块导入

  exports: [module, component]

})
export class AppModule {}
```
### 入口文件 
main.ts

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));


1. platformBrowserDynamic引入的模块是应用到整个应用，应用里的任意组件都可以使用AppModule模块中通过imports引用的模块

2. 模块除了上面的全局引入还可以局部引入，将一些模块引入到非全局模块中，只给这个非全局模块下的组件使用

3. 每个组件都必须声明在（且只能声明在）一个 模块（NgModule） 中，要不不能使用。

4. 模块就是拥有NgModule 装饰器的一个类

### 管道

使用 ｜ 调用管道

字符串 ｜ 管道， 字符串会被管道处理后返回新的字符串，管道就是将要显示的数据处理成想要的样子显示，

angular中内置的管道，也可以自定义管道

自定义管道的方式

### 路由
1. 
```
// 根路由模块配置

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
// 路由配置
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

// 项目路由module
@NgModule({
  // 注册路由配置
  imports: [RouterModule.forRoot(routes)],
  // 导出路由RouterModule，AppModule引入后，RouterModule的导出可以被AppModule声明的组件、指令、管道使用，
  组件的子组件也可以使用
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
2. { path: '', redirectTo: '/dashboard', pathMatch: 'full' } 定义默认跳转路由

3. <a routerLink="/dashboard">Dashboard</a> ，routerLink指定跳转路由，点击跳转


### 双向数据绑定
1. 引入FormsModule 才可以使用ngModel

2. [(ngModel)]="hero.name" 

### 动态添加css

<div [class.selected] = "value === 3">, 为true时j就给div上添加selected类名， 为false时会移除类名


## angular加载过程

1. 组件最后都要统一汇总到模块中管理， 每个模块可以自定义设置要管理的组件

2. 每个模块可以导出组件、指令、管道被导入这个模块的模块的组件、指令、管道引用

3. 所有的模块最后都要汇总到AppModule(app.module.ts)中管理

4. AppModule 最后要通过 platformBrowserDynamic().bootstrapModule 创建所有module，构建这个应用

5. module可以导入module， module可以加载service， module可以声明组件




## angular项目的主要目录文件结构

// TODO


## angular其他知识细节学习，NgModule 问题解答等学习，看官方中文文档的一些内容学习

// TODO