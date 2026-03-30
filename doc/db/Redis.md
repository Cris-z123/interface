# Redis
一个开源的、基于内存的键值对存储系统，NoSQL数据库。
分布式中主要提供最终一致性。

### 基本数据类型

#### String
    SET name "cris"
    GET name
    SET temp_key "temporary" EX 60
    TTL temp_key
#### Hash (存对象)
    HSET user:1 name "cris" age 25
    HGET user:1 name
    HGETALL user:1
#### List（队列/栈）

#### Set（集合）

#### Sorted Set(ZSet)（有序集合）
