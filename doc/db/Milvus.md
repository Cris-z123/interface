# 向量数据库
一种专门用于存储、索引和查询高维向量数据的数据库

## 核心概念
* Collection: 类似于表，必须先定义Schema再插入数据
* Field: 字段，Primary Key(实体唯一标识)、Vector Field（高维向量）、Scalar Field（结构化数据）
* Entity: 实体，也就是一条完整记录
* Partition: 分区，用于数据逻辑隔离，是Collection内部的逻辑数据子集
* Shard: 分片，是Collection内部的数据量子集
* Index: 索引；向量字段必须索引，没建索引的Collection无法搜索
* Metric Type: 距离量度，必须与 Embedding 模型训练时的度量方式一致

## 注意事项
1. 连接需要显式管理，用完不释放会连接泄露
2. 插入是批量操作，单条插入性能极差

## 常用场景
1. RAG，目前常用场景
2. 多模态语义搜索
3. 非结构化数据
4. 推荐系统

## 不适用场景
1. 数据量小
2. 复杂关系查询
3. 强事务一致性
4. 精确关键词匹配
