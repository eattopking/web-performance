### 脚手架的使用指令规范
主命令 + command（command 可以理解为是子命令） + command的参数 + option(子命令执行时的选项) + option的参数 + option(子命令执行时的选项) + option的参数

option 就是对应的主命令或者子命令执行时的约束条件，option就是附属命令，服务于命令的，option自己啥也不是，
命令通过它对应的option，在代码内部判断，这个命令的执行结果是什么

比如 vue create app --force -r http://baidu.com, 这个指令就符合上面的规范

还有一种情况直接是 主命令 + option的参数 + option(主命令执行时的选项) + option的参数 + option(主命令执行时的选项) + option的参数 , 这情况是主命令的option

在子命令或者主命令后面添加多个option（选项），支不支持多个选项， 怎么支持多个选项， 多个选项连写支不支持比如： taro -vh ， 这都要看开发的cli内部代码支不支持


### 开发前端脚手架（cli）原理
1. 在终端中输入一个命令， 首先操作系统会使用which去查找PATH环境变量中是否有这个命令，是否有这个命令就是PATH环境变量设置的值那（设置的值都是目录路径）中，目录中是否和这个命令名称相同的可执行文件或者相同名称的软链接，， 就直接执行对应的可执行文件实现功能，添加到包含在PATH环境变量目录中的软链接，软链接直接对应可执行文件的路径，通过which 主命令，获取PATH环境变量配置的路径中是否有和主命令相同的名称的可执行文件或者软链接

2. 生成一个软链接， 如果这个软链接所在的目录在PATH环境变量中，那么在终端就可以直接时候和软链接相同名称的主命令，这个执行，就是执行软链接对应的可执行文件路径

3. 终端中可以执行的主命令, 它们的可执行文件所在目录都在PATH环境变量的值中（linux提供的主命令也是这样的）

4. bin目录表示可执行文件目录

5. 通过which 主命令， 获取到的可执行文件路径， 如果不是软链接的话， 那这个路径就是主命令对应的应用程序的安装路径 ，比如which node 就是获取到了node的可执行文件路径， 也是node的安装路径

6. /Users/bjhl/.nvm/versions/node/v10.16.1/bin/node 这个就是node的可执行文件的路径

7. npm i -g 全局安装的cli都被安装在node 安装文件的lib 目录下的node_modules目录中了，就是这个lib目录
/Users/bjhl/.nvm/versions/node/v10.16.1/lib

npm i -D 非全局安装的cli，都在项目的node_modules的bin目录下， 在npm指令 中使用到对应cli的命令时，会到node_modules的bin目录下的项目中去匹配的package.json的bin的字段中的key， 如果匹配到了就是就直接使用这个key对应的可执行文件执行

8. cli 项目中， package.json 中 bin: {
    taro: taro.js
}, bin中的配置，taro 就表示这个cli安装后的主命令 就是taro， 主命令对应的可执行文件就是taro.js (就是实现这个命令的功能的文件), 全局安装cli的时候将cli安装在node安装目录的lib目录的node_modules目录中， 并解析package.json 中的bin配置，将bin中配置的key作为软链接的名称， value作为软链接对应的可执行文件，形成一个软链接， 这个时候这个软链所在的目录在PATH环境变量的值中， 所以就可以直接使用软链的名称作为主命令在终端执行

9. node test.js  表示用node解释器执行js， 用node解释器执行js，所以js就运行在node中

10. 当js 文件中包含#!/usr/bin/env node，我们在终端直接执行js文件，js文件可以被执行，例如  test.js, 这是因为#!/usr/bin/env node告知操作系统去PATH环境变量中找node这个命令来执行js文件， 就和我们在终端通过 node test.js执行test.js这个脚本一样, /usr/bin/env 这个命令就是查找出全部的环境变量,

#!/usr/bin/env node 可以使用本地的node可执行文件路径代替 如#!/Users/bjhl/.nvm/versions/node/v10.16.1/bin/node, 但是这样查找node 可执行文件的路径就固定了， 其他人就用不了这个脚本了， #!/usr/bin/env node 它的本质就是让操作系统查找node的可执行文件， 通过执行node的可执行文件来执行js脚本


11. 脚手架是运行在node应用程序（就是一个客户端）中的（脚手架就是js）， node应用程序是运行在操作系统中的

12. 软链接是可以嵌套设置的， 就是可以将一个软链接设置为另一个软链接的可执行文件

13. where node 可以获得node的所有可执行文件的路径，这里说的可执行文件包括软链接， 因为软链接如果软链接最后指向的是可执行文件话，可执行文件一样可以被执行

14. ln -s /Users/bjhl/.nvm/versions/node/v10.16.1/lib/index.js mynode, 在一个目录下执行这个命令，就是在这个目录中创建一个名称为 mynode 可执行文件路径为/Users/bjhl/.nvm/versions/node/v10.16.1/lib/index.js的软链

15. 手动创建一个可以软链， 如果修改可执行文件， 可以在终端实时测试修改的可执行文件的修改， 通过软链名称这个命令

16. linux 的环境变量有很多， 比如PATH环境变量， HOME环境变量等，PATH环境变量比较常用, 就是设置我们主命令所在的目录的，设置完了， 在终端中通过主命令直接可以执行目录中主命令的可执行文件

17.  /Users/bjhl/.nvm/versions/node/v10.16.1/bin/node* 带这个星号， 表示node是可执行文件

18. mac 安装的软件都是可执行文件， windows 安装的软件都是.exe文件， 但是mac上的可执行文件不一定就是软件

19. 在软链接所在目录下操作软链的时候， 把软链当成一个文件就行， 比如给test 这个软链改名成test2  就可以这样

ln -s ./test test2

20. #!/usr/bin/env node 中, /usr/bin/env就表示env 这个文件的所在路径，env这个文件就包含所有环境变量，
#!/usr/bin/env node 就是让操作系统使用在env中的PATH环境变量所设置的目录中node命令的可执行文件执行脚本

如果#!/usr/bin/node， 这样设置就是表示直接使用/usr/bin/node 这个可执行文件执行脚本

21. npm link 将本地开发包进行全局安装

22. 开发脚手架分包， 就是一个脚手架的功能分成多个包，然后最后统一引用

23. 在脚手架的根目录下 执行npm link 可以在node的安装目录下的lib目录的node_modules中生成一个名字为package.json 中name字段的软链， 还有接着识别package.json中的bin配置， 在node的安装目录下的bin目录下生成一个bin中key名称的，value为脚手架可执行文件的软链，可以本地调试, 如果想删除npm link创建的这个两个软链， 直接在脚手架项目目录下执行npm unlink就可以了, 通过npm unlink将本地项目中通过npm link安装的包移除调的同时还会将对应包在package.json中的依赖删除调， 通过npm link安装不会将package.json的依赖中添加对应的包

24. 然后可以被其他项目在其项目的根目录下执行（npm link node的安装目录下的lib目录的node_modules中的包名），将node的安装目录下的lib目录的node_modules中包，安装到这个项目的node_modules中， 如果想从node_modules中卸载安装的这个包，直接执行 （npm unlink node的安装目录下的lib目录的node_modules中的包名），可以本地调试

25. 如果在普通库的项目根目录下执行npm link，那么就是只会在node的安装目录下的lib目录的node_modules中生成一个名字为package.json 中name字段的软链

26. 软链就是指向对应可执行文件，就是可以通过软链访问这个文件，啥时候想用这个软链访问就可以用它

27. process.argv （vue -v） 获取到的值的一个数组， 第一个值是解释器的可执行文件路径（node的可执行文件）， 第二个是解释器执行的脚本的文件路径（vue-vli的可执行文件）， 第三个是option -v， 这个就是 process.argv获取值的规则

28. 全局安装cli的过程是， 想通过项目名称 将项目下载到node的安装目录下的lib目录的node_modules中， 然后解析这个项目中的package.json中的bin配置， 然后在node的安装目录下的bin目录下，生成一个bin中key为名称， value为可执行文件的软链， 然后就可以在全局中使用key对应的这个命令了

29. 把脚手架安装在本地node_modules中，我们在代码中引用这个脚手架当做一个包， 我们引用的代码是脚手架项目中的package.json中main字段暴露的代码，作为脚手架在终端执行命令时， 对应的代码是package.json中bin的key对应的可执行文件

30. 把一个包发布到npm上， 然后在这个包项目所在目录中下执行npm i -g 这个包， 这时不会在node的安装目录下的lib目录中的node_modules中安装远程的包，而是因为在当前执行（npm i -g 包名） 这个命令的目录下可以找到这个包， 所以直接会在node的安装目录下的lib目录中的node_modules中创建一个指向本地项目路径的软链， 软链名称是报包名， 所以我们就可以通过这种方式进行本地调试，然后如果这个包是一个cli那么在node的安装目录下的bin目录还会根据这个包的package.json中的配置， 生成一个value 指向cli可执行文件的软链， 这个软链的获取路径都是从node安装目录下lib目录的node_modules目录为基准的，如果node安装目录下lib目录的node_modules目录中的包为软链， 那么再找包的可执行文件的时候， 就以这个软链为基准接着往下找, 这个软链就表示软链指向的路径

31. 更好的本质依赖调试  在package.json的依赖中将依赖的版本号， 修改为 'file:// ../utils'(本地项目的文件地址)， 然后在全局安装这个包，然后就在node 安装目录下就

32. yargs npm 包可以帮助创建脚手架，就是接收命令， 作用和commomd相同， 但是这个更好用

33.



### lerna 源码解析学习

1. lerna 是一个项目管理工具， 它也是一个脚手架, 可以多个项目代码git提交， 多个项目npm包发布， 基于npm+git实现， 实现重复操作， 版本一致性

2. 统一管理多个项目

3. lerna使用的配置文件
package.json

{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "lerna": "^3.22.1"
  }
}

lerna.json
lerna 需要处理的目录
{
  "packages": [
    "packages/*"
  ],
  // 独立模式的版本不一定所有版本都一致
  "version": "independent",
  "useWorkspaces": true,
  // 使用什么npm安装工具
  "npmClient": "yarn"
}
#### lerna使用流程
1. lerna init 初始化创建git初始化, 创建packages目录

2. lerna create 目录名称  在packages目录中创建一个项目

3. @test/babel @test这个名字需要在npm注册，然后才能用，才能将我们这个名字的包发布到npm成功

4. 常用lerna执行命令

lerna add 默认给所有的package（项目）安装依赖， 也可以给单个项目安装依赖（lerna add + 包名 + packages/项目目录）

lerna clean 删除所有项目的node_modules 目录

lerna link 就是lerna 项目中相互依赖，可以通过lerna link 将所有项目中相互依赖设置为本地的软链接

lerna exec 默认在所有项目下执行linux 执行 例如  lerna exec -- rm -rf node_modules 删除所有项目中node_modules， 也可以在单个项目下执行命令(lerna exec --scope + 包名 + -- + 要执行的命令)

lerna run 默认执行所有项目下的 npm 指令， 也可以执行单个项目的npm指令(lerna run --scope + 包名 + npm指令)

lerna version 默认给所有项目添加版本号，也可以给单个项目添加版本号

lerna publish 只有项目git commit 了之后， 才可以执行，git commit 之后l执行过lerna publish， lerna publish后选择项目的版本号， 渲染版本号之后，lerna 会修改项目的版本号，
然后将修改的部分自动add + commit，然后在这次的commit上加一个以项目名称和版本号组成的tag， 然后将所有commit 和tag 全都push到线上

lerna bootstrap 删除项目的node_modules 目录之后， 根据项目中的package.json重新安装依赖， 默认重新安装所有项目的依赖

lerna 是和git 配合使用的，lerna不能完全替代git


npm发布流程

1. npm login 登录npm

2. npm publish 发布npm包

3. 需要给包加前缀名， 要先去npm网站上注册

4. npm 发布 想发布到哪个npm服务就 在npm镜像 通过nrm 切换到对应的npm镜像， 然后npm login 登录，
就是登录的对应镜像的npm 服务， 然后npm publish 就可以将npm包发布到对应的镜像的npm服务了


lerna源码分析

找到入口文件可以调试

打断点调试我们源码执行

使用import-local npm包  lerna 的实现




















