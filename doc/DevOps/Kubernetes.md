# Kubernetes
解决分布式、多节点、高可用、自动扩缩容的容器编排问题

## 核心概念

| 概念                     | 类比/解释                                              |
| ---------------------- | -------------------------------------------------- |
| **Pod**                | K8s 最小调度单位，一个 Pod 可包含多个共享网络的容器           |
| **Deployment**         | 管理 Pod 的副本数、滚动更新、回滚（类似 Compose 的 `deploy` 增强版）     |
| **Service**            | 为 Pod 提供稳定的网络访问入口（ClusterIP/NodePort/LoadBalancer） |
| **ConfigMap / Secret** | 配置和敏感信息分离（替代 Compose 的 `env_file`）                 |
| **Namespace**          | 资源隔离（虚拟集群）                                         |
| **Ingress**            | 集群入口流量管理（类似 Nginx 反向代理）                            |

## 常用命令
```bash
kubectl apply  # 创建/更新资源
kubectl get pods -o wide  # 查看pod详情
kubectl describe pod <name>  # 排查问题
kubectl logs <pod> -f  # 查看日志
kubectl exec -it <pod>  # 进入容器
kubectl delete  # 删除资源
```
