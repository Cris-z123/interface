# 向量数据库
一种专门用于存储、索引和查询高维向量数据的数据库

## 核心概念

* Collection: 类似于表
* Field: 字段，Primary Key(实体唯一标识)、Vector Field（高维向量）、Scalar Field（结构化数据）
* Entity: 实体，也就是一条完整记录
* Partition: 分区，用于数据逻辑隔离，是Collection内部的逻辑数据子集
* Shard: 分片，是Collection内部的数据量子集
* Index: 索引
* Metric Type: 距离量度，必须与 Embedding 模型训练时的度量方式一致

## 常用场景
1. RAG
2. 多模态语义搜索
3. 非结构化数据
4. 

## 不适用场景
1. 数据量小
2. 复杂关系查询
3. 强事务一致性
4. 精确关键词匹配
