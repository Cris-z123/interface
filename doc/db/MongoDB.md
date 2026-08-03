# 文档数据库
非关系型数据库（NoSQL）是指不采用传统关系模型（表格+行+列+SQL）的数据库，设计上更强调水平扩展性、灵活的数据模型和高性能读写。
以MongoDB为例

## 核心概念
* Database: 库
* Collection: 集合，类似表
* Document: 文档，基本存储单元，BSON格式
* Field: 字段
* Index: 索引，单字段索引、复合索引、多键索引
* _id: 文档主键，默认自动生成 ObjectId

## 常用命令（CRUD）
#### 插入
    db.users.insertOne({ name: "cris", age: 25 })
    db.users.insertMany([{...}, {...}])
#### 查询
    db.users.find({ age: { $gt: 20 } })          # 条件查询
    db.users.findOne({ name: "cris" })
    db.users.find().sort({ age: -1 }).limit(10)  # 排序 + 分页
    db.users.countDocuments({ age: { $gt: 20 } }) # 计数
#### 更新
    db.users.updateOne({ name: "cris" }, { $set: { age: 26 } })
    db.users.updateMany({ age: 30 }, { $inc: { age: 1 } })
#### 删除
    db.users.deleteOne({ name: "cris" })
    db.users.deleteMany({ age: { $lt: 18 } })

## 常用操作符
* 比较: $eq $ne $gt $gte $lt $lte $in $nin
* 逻辑: $and $or $not $nor
* 更新: $set $unset $inc $push $pull $rename
* 数组: $elemMatch $size $all

## 索引类型
* 单字段索引: db.users.createIndex({ age: 1 })
* 复合索引: db.users.createIndex({ age: 1, name: -1 })
* 唯一索引: db.users.createIndex({ email: 1 }, { unique: true })
* TTL索引: 过期自动删除，适合验证码、会话等临时数据
* 全文索引: db.articles.createIndex({ content: "text" })，配合 $text 搜索
* 地理空间索引: 支持 2d / 2dsphere，适合 LBS 场景
* 哈希索引: 用于分片键

## 聚合管道
    db.orders.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: "$user_id", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 10 }
    ])
* $lookup: 关联其他集合，实现类似 join 的功能
* $project: 字段投影，$unwind: 展开数组

## 高可用与扩展
* 副本集（Replica Set）: 一主多从 + 自动故障转移，保证高可用；只有主节点可写，从节点分担读
* 分片集群（Sharding）: 按分片键将数据水平分布到多个节点，解决单机容量与写入瓶颈
* 事务: 支持多文档事务，但仅限副本集/分片集群部署，且性能开销大

## 注意事项
1. 单文档最大 16MB，不适合存大文件（用 GridFS 或对象存储）
2. 嵌套层级过深会导致查询复杂、性能差，建议适度冗余或拆分
3. 建索引前要先评估查询模式，索引不是越多越好，会拖慢写入
4. 内存吃紧时优先淘汰缓存而不是 MongoDB，写入抖动风险大
5. 慎用 $lookup 关联大表，性能开销高，必要时冗余存储

## 常用场景
1. 内容管理
2. 大量json数据
3. 电商产品目录
4. 用户资料

## 不适用场景
1. 复杂的多表关联事务
2. 关系型数据
3. 复杂的数据分析和计算
4. 搜索引擎级全文检索（相关性打分、复杂分词，如 ES 场景）
5. 复杂图关系查询
6. 大量小文件存储
7. 高频低延迟的键值缓存
