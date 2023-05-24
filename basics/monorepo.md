### pnpm 创建momorepo

通过 pnpm 创建momorepo项目只需要 创建一个pnpm-workspace.yaml文件

然后里面配置想要存放momorepo项目的目录名，可以配置多个目录名，例如

packages:
  - 'packages/*'
  - 'app/*'

这样app目录和packages目录下都可以创建多个项目共同维护

pnpm -F (package.json 的name) run dev， 执行package.json 的name的项目的script指令

pnpm -C 目录名 ls -a 在指令执行的目录找到对应目录，然后在这个目录下执行ls -a 指令

### pnpm的webspace协议

packages:
  - 'packages/*'
  - 'app/*'
这些配置的目录下项目都可以相互引用通过webspace:*, 比如项目a在package.json中的name叫a， 在项目b中的package.json中的devDependencies中就可以使用
a:'webspace:*',声明依赖，这个时候就可pnpm安装依赖，a就被安装到b的node_modules中了

#### yarn 创建menorepo

#### tuborepo 创建menorepo