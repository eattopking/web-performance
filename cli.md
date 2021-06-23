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









