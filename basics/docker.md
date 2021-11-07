### 镜像
自己创建镜像主要是dockerFile 文件
### 容器
1. docker -p 主机的端口:容器的端口，是将docker容器中的端口映射到真实主机的端口， 端口书写顺序是这样的
2. docker -v 主机的目录:容器的文件，是将docker容器中的端口文件， 保存到主机的目录中
3. 利用docker-compose 可以使用.yaml后缀的配置文件， 一次性执行多条docker指令， 提高效率和可复用性， 配置文件中的字段都是和指令中参数达到的效果相同的
4. docker-compose在macos和windows中的docker 都是被集成好的， 但是在linux系统中是需要例外安装的
5. 可以在容器中设置全局环境变量， 在容器中的代码中就可以使用了
6. 容器和容器之间是可以通信的， 容器的宿主机之间也是可以通信的， 这依赖于docker提供的这种机制

7. docker run --name testname 是创建容器时设置容器的名称
8. docker run -d  在后台启动容器
8. docker run -v  将本地文件和容器中的文件相互共享， 哪一方没有对应目录， 会自动创建

linux 系统下容器通过访问docker0网桥中的第一个ip，来请求宿主环境的ip， 进而请求宿主环境的服务

mac 系统中通过docker.for.mac.host.internal获得宿主环境ip

### docker 常用指令

创建容器  docker run

常看容器 docker container ls -a

查看镜像  docker image ls -a

进入容器 docker exec -it containerid bash

操作镜像的指令 docker image ...

操作容器的指令 docker container ...

本地安装镜像的指令 docker pull 镜像名称: 版本号， 不添加版本号默认安装最新的版本latest

通过命令行登录docker hub，安装镜像， docker login， 自己会弹出用户名和密码的输入

通过命令行退出 docker hub docker logout

搜索下载库中 关键词对应的包信息  docker search 关键词，包括描述， star， 是否是官方的，是否是自动构建

docker search 关键词 --filter=stars=N 查找星数在n 以上的包

docker push 将自己创建的镜像推动到docker hub， 自己创建的镜像一定要使用自己的dockerhub用户名作为镜像命名的开头

使用docker 官方提供的 docker-registry 实现一个基础功能的镜像私有仓库，使用docker-compose实现一个高级的镜像私有仓库

在企业中使用nexus实现镜像是有仓库比较稳定

docker run -d -p 80:80 --name nginx-web -v /root/nginx/www:/usr/share/nginx/html -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/logs:/var/log/nginx nginx


#### docker run 参数

[react-native ios 调试](../images/docker1.png)

 //基本配置
	upstream eattopking.top {
                server    172.24.21.117:8000;
                keepalive 64;
       }
    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    #  include /etc/nginx/conf.d/*.conf;

    server {
	# 设置可以所以来源请求的80端口监听, server_name匹配不到host的值时，对应请求的默认处理server块就是这个块
	# 设置这个块的worker进程在没有请求时不处理刚刚建立的TCP连接
        listen       80 default_server deferred;
        server_name  eattopking;
        root         /home/lx/react-ssr-ts/public/;
        index       login.js;
        # Load configuration files for the default server block.
        # 开启gzip 压缩
	gzip    on;
    gzip_min_length 1024;
    gzip_proxied    expired no-cache no-store private auth;
    gzip_types      text/plain text/css application/xml application/json application/javascript application/xhtml+xml;
    gzip_comp_level 9;
       # include /etc/nginx/default.d/page.conf;

	#include /etc/nginx/conf.d/*.conf;
      	 location /public {
              root /home/lx/react-ssr-ts;
         }

       location /test {
              return 200 /home/lx/react-ssr-ts/public/index.js;
       }

	location /login {
                proxy_pass http://eattopking.top;
                proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
        }

	location /register {
                proxy_pass http://eattopking.top;
                proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
        }

 	location /page {
                proxy_pass http://eattopking.top;
                proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
        }

        location /api {
                proxy_pass http://eattopking.top;
                proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                 proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
        }

        location ^~ /fff {
		return 200 '11111';
        }

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }