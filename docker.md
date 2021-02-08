1. docker -p 主机的端口:容器的端口，是将docker容器中的端口映射到真实主机的端口， 端口书写顺序是这样的
2. docker -v 主机的目录:容器的文件，是将docker容器中的端口文件， 保存到主机的目录中
3. 利用docker-compose 可以使用.yaml后缀的配置文件， 一次性执行多条docker指令， 提高效率和可复用性， 配置文件中的字段都是和指令中参数达到的效果相同的
4. docker-compose在macos和windows中的docker 都是被集成好的， 但是在linux系统中是需要例外安装的
