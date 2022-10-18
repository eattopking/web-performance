### python 需要命令行执行的错误

解决方法： ln -s /usr/local/bin/python3 /usr/local/bin/python  将python3映射到python，然后使用python的时候去使用python3就行了


### make 需要在命令行执行的错误

解决方法：
安装 CommandLineTools
xcode-select --install 详情可查看 Mac OS X中安装命令行工具Command Line Tools（无Xcode)

根据提示进行安装。安装完成之后，再配置
sudo xcode-select --switch /Library/Developer/CommandLineTools

验证 CommandLineTools 是否安装成功
xcode-select -p 打印的目录是否为上一步骤的目录。如果是，则ok

继续验证 make、gcc 命令
make --version 及 gcc --version 输出没问题，则安装正常。可以继续安装 Gitbook 了