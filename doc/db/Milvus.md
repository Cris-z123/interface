# 向量数据库
一种专门用于大规模存储、索引和查询高维向量数据的数据库

## 工作原理
1. 创建Collection
2. 插入向量数据
3. 创建索引
4. 执行ANN搜索，返回Top-k
5. 查看并处理结果

### 部署方式
* milvus lite: 轻量化
* milvus Standalone: 单机版单容器 Docker-compose-单机多组件容器(3容器)
* milvus Distributed：集群版
Attu - 专用可视化数据库管理工具

## 核心概念
* 向量
* Embedding: 通过嵌入模型将数据向量化
* Collection: 类似于表，必须先定义Schema再插入数据
* Field: 字段，Primary Key(实体唯一标识)、Vector Field（高维向量）、Scalar Field（结构化数据）
* Entity: 实体，也就是一条完整记录
* 主键

### 数据建模
* Schema 模式
* Index: 索引；向量字段必须索引，没建索引的Collection无法搜索
* Partition: 分区，用于数据逻辑隔离，是Collection内部的逻辑数据子集
* Shard: 分片，是Collection内部的数据量子集
* Metric Type: 距离量度，必须与 Embedding 模型训练时的度量方式一致; 欧氏距离（L2）内积（IP）余弦相似度（COSINE）JACCARD（杰卡德距离）HAMMING（汉明距离）BM25（稀疏向量检索）

### 数据操作
* Search：向量搜索
* Query：普通查询
* 过滤搜索
* 范围搜索
* 混合搜索

### 向量数据类型
* Float32
* Float16\BFloat16
* Binary

## 核心架构 v2.6
访问层(Proxy) -> Workers层 -> 存储层

## 写入数据完整流程 v2.6
SDK通过gRPC发送请求 -> Proxy层验证Schema -> 认证/限流检查 -> 哈希分片确定分片 -> 路由到StreamingNode -> 请求TSO全局时间戳 -> 原子写入WAL（RocksMQ/Kafka/woodpecker）-> 放入Growing Segment（内存）
-> 立即可查 -> Flush触发 -> binlog 持久化到MinIO -> Segment标记为 Sealed -> DataNode异步构建索引 -> 索引写入MinIO -> QueryNode加载 -> 高效索引可用

## WAL关键机制-数据可靠性
任何操作先写WAL，再执行；保证数据可靠性。

## v3 重要升级
1. External Collection
2. Storage v3：面向s3的兼容对象存储、基于Manifest管理的列式存储引擎
3. 湖原生检索
4. 在线增删字段
5. Snapshot
6. 服务端排序
7. 索引、检索算法升级

## 注意事项
1. 连接需要显式管理，用完不释放会连接泄露
2. 插入是批量操作，单条插入性能极差

## 常用场景
1. RAG，目前常用场景
2. 多模态语义搜索
3. 非结构化数据
4. 推荐系统
5. 智能客服
6. 代码智能

## 不适用场景
1. 数据量小
2. 复杂关系查询
3. 强事务一致性
4. 精确关键词匹配
5. 纯结构化数据分析
