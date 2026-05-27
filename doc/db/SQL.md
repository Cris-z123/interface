# SQL
关系型数据库，通过结构化查询语言来管理、操作和定义数据的数据库
例如：MySql、PostgreSQL、Oracle、SQLite、DB2

## 核心特性
* ACID 特性：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability），保证数据可靠性
* 结构化数据：预定义 Schema，数据类型严格
* 表关联：通过主键、外键实现多表关联查询
* 事务支持：支持复杂业务逻辑的数据一致性

## 核心概念
1. Table: 最基本的存储单元，由行（Row/Record）和列（Column/Field）组成
2. Schema: 表、视图、索引等对象的逻辑集合，相当于数据库内的"文件夹"
3. 数据类型
4. Key
5. Index：高并发B-Tree
6. View: 视图是存储在数据库中的查询语句，不实际存储数据，每次访问时动态执行
7. Transaction: 事务，一组要么全部成功、要么全部失败的 SQL 操作
8. Row
9. Column: 
10. 主键
11. 外键
