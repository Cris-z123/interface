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
    LPUSH ("queue:task", "task-A", "task-B", "task-C")
    RPUSH
    LPOP
    RPOP
    BLPOP
#### Set（集合）
    SADD ("tags:post:1", "Python", "Redis", "后端")
    SERM
    SINTER
#### Sorted Set(ZSet)（有序集合）
    ZADD ("rank:week", {"Alice": 100, "Bob": 200, "Carol": 150})
    ZREM

### 适用场景
