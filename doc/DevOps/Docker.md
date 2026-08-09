# Docker
一个开源的容器化平台，它允许开发者将应用及其所有依赖项打包成一个标准化的单元，称为容器。

- **为什么用 Docker**：环境一致（"在我机器上能跑"问题）、秒级启动、资源占用远低于虚拟机、部署简单。
- **容器 vs 虚拟机**：容器共享宿主机内核，只隔离进程和文件系统，轻量；虚拟机每个都有完整操作系统，重量级。

## 安装
- **Windows / macOS**：安装 Docker Desktop（自带 CLI 和 Compose），装完即可用 `docker` 命令。
- **Linux（Ubuntu）**：安装官方软件源后执行：
  ```bash
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```
  验证安装：
  ```bash
  docker --version
  docker compose version        # V2，注意是 "compose" 不是 "docker-compose"
  sudo docker run hello-world  # 拉取并运行测试镜像，能打印信息即安装成功
  ```
  > 报 `permission denied` 时，说明当前用户不在 docker 组：`sudo usermod -aG docker $USER` 后重新登录即可免 sudo 执行。

## 核心概念
- **镜像（images）**：只读的打包模板，类似"类"或"安装包"。包含运行应用所需的代码、运行时、依赖。
- **容器（container）**：镜像运行后的实例，类似"类创建的对象"或"运行中的程序"。可启动、停止、删除，删除后数据默认丢失。
- **仓库（registry）**：存放镜像的应用商店，最常用的是 Docker Hub（官方仓库，公共镜像免费拉取）。

关系：`镜像(images) --docker run--> 容器(container)`

| 概念   | 类比       | 操作对象                      |
| ------ | ---------- | ----------------------------- |
| 镜像   | 类 / 模板  | `pull`、`build`、`images`、`rmi`、`tag` |
| 容器   | 类的实例   | `run`、`ps`、`start`、`stop`、`rm`、`exec` |
| 仓库   | 应用商店   | `pull`、`push`（上传需登录）  |

## 基础命令

### 镜像相关
| 命令 | 作用 |
| ---- | ---- |
| `docker pull <镜像名>` | 从仓库拉取镜像，如 `docker pull nginx` |
| `docker images` | 查看本地镜像列表 |
| `docker build -t 名称:标签 .` | 根据 Dockerfile 构建镜像（见下文） |
| `docker tag 旧名:旧标签 新名:新标签` | 给镜像打标签 |
| `docker rmi <镜像名或ID>` | 删除镜像（先删除依赖它的容器） |

### 容器相关
| 命令 | 作用 |
| ---- | ---- |
| `docker run <镜像>` | 创建并启动一个新容器 |
| `docker ps` | 查看运行中的容器（`docker ps -a` 查看包括已停止的全部容器） |
| `docker start / stop / restart <容器>` | 启动 / 停止 / 重启**已存在**的容器（`stop` 针对容器，不是镜像） |
| `docker rm <容器>` | 移除容器（停止的容器也要移除；`docker rm -f` 强制删除运行中的） |
| `docker exec -it <容器> bash` | 进入运行中容器的交互式 shell（`-i` 保持输入、`-t` 分配终端，**一起用**） |
| `docker logs -f <容器>` | 查看并实时跟踪容器日志 |
| `docker inspect <容器>` | 查看容器详细信息（IP、配置等） |

### `docker run` 常用参数
| 参数 | 作用 | 示例 |
| ---- | ---- | ---- |
| `-d` | 后台运行 | `docker run -d nginx` |
| `-p 宿主机端口:容器端口` | 端口映射，从外部访问容器 | `docker run -p 8080:80 nginx` |
| `-v 宿主机目录:容器目录` | 数据卷挂载（持久化） | `docker run -v /data:/app/data nginx` |
| `--name 名称` | 指定容器名（否则随机取名） | `docker run --name mynginx nginx` |
| `-it` | 交互模式，进入容器终端 | `docker run -it ubuntu bash` |
| `--rm` | 容器退出后自动删除（适合临时测试） | `docker run --rm -it ubuntu bash` |

入门示例：运行一个 nginx 并访问它
```bash
docker run -d --name mynginx -p 8080:80 nginx
curl http://localhost:8080        # 浏览器打开 http://localhost:8080 同理
docker exec -it mynginx bash      # 进入容器内部
docker stop mynginx && docker rm mynginx
```

## Dockerfile（构建自己的镜像）
Dockerfile 是构建镜像的说明书：从基础镜像出发，逐步拷贝代码、装依赖、定启动命令。

### 常用指令
| 指令 | 作用 |
| ---- | ---- |
| `FROM <基础镜像>` | 指定基础镜像，必须第一行 |
| `WORKDIR <目录>` | 设置工作目录 |
| `COPY <宿主机文件> <容器路径>` | 把文件拷进镜像 |
| `RUN <命令>` | 构建时执行的命令（装依赖、编译） |
| `ENV` | 设置环境变量 |
| `EXPOSE <端口>` | 声明容器对外端口（仅声明，实际映射仍靠 `-p`） |
| `CMD ["命令", "参数"]` | 启动容器时执行的命令，只有最后一条生效 |
| `ENTRYPOINT` | 固定启动命令，可被 `CMD` 补充参数（理解差别可先忽略） |

### 示例：一个简单的 Python Web 应用
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```
构建并运行：
```bash
docker build -t myapp:1.0 .          # 注意末尾的点：表示用当前目录作为构建上下文
docker run -d -p 8000:8000 myapp:1.0
```
> 建议在项目根目录加 `.dockerignore` 文件排除 `node_modules`、`__pycache__`、`.git` 等，避免这些文件被拷进镜像导致镜像过大。

## 数据持久化（Volume）
容器删除后，容器内的数据会**全部丢失**。需要保留的数据（数据库、上传文件）必须用卷挂载：
```bash
docker run -d --name myredis -v redis-data:/data redis   # 命名卷，数据由 Docker 管理
docker run -d -v /宿主机/路径:/容器/路径 nginx            # 绑定挂载，直接用宿主机目录（改文件立即生效，适合开发）
docker volume ls                                          # 查看卷
```
> 常见误区：只把 MySQL/Redis 的**镜像**跑起来以为数据安全了——容器删除时镜像没删，但容器内的数据文件已经没了。

## 端口映射与容器间通信
- **外部访问**：容器默认有自己的网络，外部无法直接访问，必须 `-p 宿主机端口:容器端口` 映射，如 `-p 8080:80`。
- **容器间通信**：同一条 Compose 网络（见下）中的容器，直接用**服务名**互访，如 web 容器里访问数据库用 `redis` 而不是 IP。

## Docker Compose
Docker 官方提供的容器编排工具，用一个 YAML 配置文件描述整个应用架构，用于定义和运行多容器 Docker 应用，主要用于**单机**的服务编排。

### 示例：nginx + redis 一栈启动
```yaml
# docker-compose.yml
services:
  web:
    image: nginx
    ports:
      - "8080:80"          # 宿主机 8080 → 容器 80
    volumes:
      - ./html:/usr/share/nginx/html   # 本地目录实时同步，改代码即生效
    depends_on:
      - redis              # 先启动 redis
  redis:
    image: redis
    volumes:
      - redis-data:/data   # 命名卷持久化
volumes:
  redis-data:              # 声明命名卷
```

### 常用命令（V2 语法，注意是 `docker compose`）
| 命令 | 作用 |
| ---- | ---- |
| `docker compose up -d` | 构建并后台启动所有服务（首次会构建/拉取镜像） |
| `docker compose ps` | 查看运行状态 |
| `docker compose logs -f` | 查看并实时跟踪日志 |
| `docker compose build` | 重新构建镜像（代码改了后重构建） |
| `docker compose exec -it <服务名> bash` | 进入指定服务的容器内部（`-it` 必须加） |
| `docker compose down` | 停止并移除容器、网络（数据卷默认保留，`-v` 参数连卷一起删） |

> 老教程里的 `docker-compose`（带连字符）是 V1 独立二进制，2023 年起已弃用；安装 `docker-compose-plugin` 后用 `docker compose`。

## 日常运维与排查
```bash
docker system df          # 查看磁盘占用
docker system prune       # 清理停止的容器、无用网络和悬空镜像（-a 连未使用的镜像一起清）
docker stats              # 实时查看容器 CPU / 内存占用
docker logs -f <容器>     # 排错第一步：看日志
```
- **找不到刚跑的容器**：它可能已退出，用 `docker ps -a` 查看；若反复退出，用 `docker logs` 看报错。
- **端口被占用**：`docker run -p 8080:80` 报错时换一个宿主机端口。
- **容器时间不对**：容器默认用 UTC，时区问题可在 run/compose 中设置 `TZ=Asia/Shanghai` 环境变量或挂载 `/etc/localtime`。
