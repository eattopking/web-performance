# 什么是shell
shell就是终端命令行，命令解释器。

shell可以解释命令行单独的命令，也可以解释在命令行执行的脚本文件

# 如何指定当前使用的命令行命令解释器
!/bin/bash ，bash表示当前使用的命令行解释器

# 有多少种命令行命令解释器
Bourne Shell（sh）
Bourne Again shell（bash）
C Shell（csh）
TENEX C Shell（tcsh）
Korn shell（ksh）
Z Shell（zsh）
Friendly Interactive Shell（fish）

# shell常用命令

查看当前shell：echo $SHELL
找到所有命令的可执行文件： which 命令名
查看 bash shell的版本：bash --version

# bash 命令和脚本语法

## echo  （在命令行打印信息，类似console.log）

1. 打印多行文本，需要将文本放在双/单引号中
```
echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"
```
2. echo 有参数 -n、-e

-e可以解析，echo字符串参数中的特殊字符，让他们其他特殊字符的作用后，打印出最终结果（比如 \n 换行符）

## bash 命令规范

1. 命令的参数多行一起执行，在前一行的后面加上\就可以
```
echo foo bar

# 等同于
$ echo foo \
bar
```








