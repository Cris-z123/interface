# SQL
关系型数据库，通过结构化查询语言来管理、操作和定义数据的数据库
例如：MySql、PostgreSQL、Oracle、SQLite、DB2

DQL：数据查询语言-数据查询  `SELECT` `FROM` `WHERE` `GROUP BY` `ORDER BY` `JOIN` `LIMIT`
DML：数据操作语言-数据增删改查 `INSERT` `UPDATE` `DELETE`
DDL：数据定义语言-操作数据库对象 `DROP` `CREATE` `COMMENT` `ALTER` `TRUNCATE`
DCL：数据控制语言-控制数据库权限
TCL：事务控制语言-数据库事务管理

### 数据类型
* int: INT
* float：DOUBLE
* string: CHAR VARCHAR BLOB TEXT
* time: DATE DATETIME TIMESTAMP

### 约束
* 主键约束: `PRIMARY KEY`
* 非空约束：`NOT NULL`
* 唯一约束: `UNIQUE`
* 检查约束: `CHECK` `constraint`
* 默认值约束: `DEFAULT`
* 自增约束: `AUTO INCREMENT`
* 外键约束(外键就是两张表之间的关联列): `FOREIGN KEY` 外键策略-不允许操作、级联删除、级联置空

### 单表操作
```sql
SELECT column, group_function(column) # 选列，使用聚合函数
FROM table # 选表
WHERE [condition] # 过滤行
GROUP BY [group_by_expression] # 分组
HAVING [group_condition] # 过滤分组
ORDER BY [column] # 排序
```
执行顺序：from -> where -> group by -> 聚合函数 -> having -> select -> order by

### 多表操作
```sql
cross join # 交叉连接
natural join # 自然连接
inner join # 内连接
full outer join # 全外连接
left outer join # 外连接
right outer join # 外连接
```

### 子查询
一个SQL语句，包含多个select

```sql
# 单行不相关子查询
select ename, sal
from emp
where sal > (select avg(sal) from emp)
```

```sql
# 多行不相关子查询
select * from emp
where deptno = 20
and 
job in (selcet job from emp where deptno = 10)
```

```sql
# 相关子查询
select * from emp e where sal = (select max(sal) from emp where deptno = e.deptno) order by deptno
```

## 核心特性
* ACID 特性：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability），保证数据可靠性
* 结构化数据：预定义 Schema，数据类型严格
* 表关联：通过主键、外键实现多表关联查询
* 事务支持：支持复杂业务逻辑的数据一致性

### 事务
* 开启事务后，没有提交前，执行的sql并不会修改真实数据
```sql
start transaction; # 开启事务
sql1
sql2
sql3
rollback; # 回滚操作
commit; # 提交事务
```
* 事务的并发问题：
    * 脏读（Dirty read）：当一个事务访问数据并修改，但是还没提交，另外一个事务访问了同一个数据，并使用了这个数据
    * 不可重复读（unrepeatable read）：一个事务两次读同一数据，在这个过程中，另一事务修改了这个数据，导致第一次的事务两次读取的数据不一致了
    * 幻读（phantom read）：一个事务两次读同几行数据，在这个过程中，另一事务增加或删除了这几行数据，导致第一次的事务两次读取到的数据不一致了
* 事务的隔离级别：
    * read uncommitted：最低级别 读未提交-一个事务可以读到另一个事务尚未提交的数据
    * read committed：避免脏读 读已提交-只能读到其他事务已经提交的数据
    * repeatable read：避免脏读和不可重复读 可重复读-保证同一事务内，多次读取同一数据的结果一致
    * serializable：最高 串行化

## 核心概念
1. Table: 最基本的存储单元，由行（Row/Record）和列（Column/Field）组成
2. Schema: 表、视图、索引等对象的逻辑集合，相当于数据库内的"文件夹"
3. 数据类型：INTEGER、VARCHAR、DATE、TIMESTAMP、BOOLEAN、JSON、NUMERIC、TEXT、UUID
4. Key：
5. Index：高并发B-Tree
6. View: 视图是存储在数据库中的查询语句，不实际存储数据，每次访问时动态执行，是一个虚拟表
7. Transaction: 事务，一组要么全部成功、要么全部失败的 SQL 操作
8. Row: 一条记录
9. Column: 一个属性
10. 主键: 唯一标识每行的列，且只能有一个
11. 外键: 关联其他表的列


## 适用场景
1. 需要强事务保障的业务（例如：金融场景）
2. 数据之间存在复杂关联的业务
3. 数据结构相对固定、Schema 明确的场景
4. 需要复杂查询和统计报表的场景
5. 数据一致性要求高的多用户并发场景
**如果业务数据有明确的结构、实体之间有关联、需要保证操作的原子性和一致性、经常需要做复杂查询和统计——关系型数据库几乎总是首选**

## 不适用
1. 海量非结构化数据（日志、图片、视频）
2. 极高并发简单读写
3. 数据结构极度灵活多变
4. 社交网络图谱查询（好友的好友）
5. 时序数据监控（每秒百万传感器数据）
