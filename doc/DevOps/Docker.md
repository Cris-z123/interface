# Docker
一个开源的容器化平台，它允许开发者将应用及其所有依赖项打包成一个标准化的单元，称为容器。
基础组件：
    * docker-ce: 核心引擎
    * docker-ce-cli：命令行工具
    * containerd.io：底层运行时
    * docker-compose-plugin：多容器编排工具
基础命令：
    * `docker pull`: 拉取镜像
    * `docker build`：构建镜像
    * `docker run`：创建并启动一个新容器
    * `docker ps`：查看容器列表
    * `docker images`：查看镜像列表
    * `docker stop`：停止镜像
    * `docker rm`：移除容器
    * `docker rmi`：移除镜像
    * `docker exec`: 在运行的容器里执行命令
    * `docker logs`: 查看日志

## 核心概念
    * 镜像（images）：软件包 即源代码
    * 容器（container）：运行中的软件
    * 仓库（registry）：应用商店 即镜像商店


## Docker-compose
Docker 官方提供的容器编排工具，用于定义和运行多容器 Docker 应用。
