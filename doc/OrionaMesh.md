一个工程级的C端RAG应用

## 产品设计

### 产品路径

1. 用户上传`pdf`、`word`、`markdown`、`text`等文本类资料，构建知识库，用户级别隔离知识库
2. 参考知识库的情况下，用户可以连续对话

### 产品功能

- 支持用户批量上传资料，构建个人知识库，可以增删改查源文件
- 支持连续对话，并保存历史对话

## 技术架构

### 项目约束

1. 使用monorepo的方案，所有代码在一个仓库，纯目录约定，零工具，Makefile作为统一的任务入口

### 实现方案

#### 知识库构建

1. 文本分块
2. 文本嵌入并入库

#### 检索

1. 查询改写
2. 双路召回，使用向量查询和BM25
3. 重排序
4. 上下文打包，整合、去重、压缩上下文
5. 输出内容

#### 技术栈

#### Front-end

- Next.js
- React
- Ts
- Tailwind
- Shadcn
- pino
- Sentry

#### Back-end

- Langchain
- Pydantic
- FastAPI
- Redis
- Postgre
- Celery
- pgvector
- JWT
- Loguru

#### Deploy

- Docker
- Github

### 数据模型

#### 概览（实体关系）

```
users
  └── knowledge_bases (1:N)
        └── documents (1:N)
              └── chunks (1:N，含 embedding 向量)

users
  └── conversations (1:N)
        └── messages (1:N)
              └── message_citations (1:N，关联 chunks + documents)
```

---

##### 1. users — 用户表

```sql
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name  VARCHAR(100),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

|字段|类型|说明|
|---|---|---|
|id|UUID|主键|
|email|VARCHAR(255)|唯一，登录凭证|
|password_hash|VARCHAR(255)|bcrypt 哈希|
|display_name|VARCHAR(100)|展示名称，可为空|
|created_at / updated_at|TIMESTAMPTZ|创建/更新时间|

---

##### 2. knowledge_bases — 知识库表

```sql
CREATE TABLE knowledge_bases (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_kb_user_id ON knowledge_bases(user_id);
```

|字段|类型|说明|
|---|---|---|
|id|UUID|主键|
|user_id|UUID|外键，用户隔离核心字段|
|name|VARCHAR(200)|知识库名称|
|description|TEXT|描述，可为空|

> **用户隔离策略**：所有查询必须携带 `user_id` 条件。行级安全（RLS）可在后期启用。

---

##### 3. documents — 文档表

```sql
CREATE TABLE documents (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knowledge_base_id UUID NOT NULL REFERENCES knowledge_bases(id) ON DELETE CASCADE,
    user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename          VARCHAR(500) NOT NULL,
    file_type         VARCHAR(20) NOT NULL,   -- pdf | docx | md | txt
    file_size         BIGINT NOT NULL,         -- 字节
    storage_path      TEXT NOT NULL,           -- 对象存储路径（如 S3 key）
    status            VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- pending | processing | completed | failed
    error_message     TEXT,
    chunk_count       INTEGER DEFAULT 0,
    version           INTEGER NOT NULL DEFAULT 1,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_doc_kb_id   ON documents(knowledge_base_id);
CREATE INDEX idx_doc_user_id ON documents(user_id);
CREATE INDEX idx_doc_status  ON documents(status);
```

|字段|类型|说明|
|---|---|---|
|status|VARCHAR|`pending` → `processing` → `completed` / `failed`|
|storage_path|TEXT|原始文件存储路径，与 chunks 分离|
|chunk_count|INTEGER|入库成功后回写，方便展示|

---

##### 4. chunks — 分块表（核心向量表）

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id       UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    knowledge_base_id UUID NOT NULL REFERENCES knowledge_bases(id) ON DELETE CASCADE,
    user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content           TEXT NOT NULL,            -- 原始文本
    content_tokens    INTEGER,                  -- token 数量（估算）
    chunk_index       INTEGER NOT NULL,         -- 在文档中的顺序（从 0 开始）
    embedding         VECTOR(1536),             -- text-embedding-3-small 维度
    metadata          JSONB DEFAULT '{}',       -- 页码、标题、章节等
    document_version  INTEGER NOT NULL,         -- 对应源文件内容版本
    chunk_strategy_version VARCHAR(32) NOT NULL DEFAULT 'v1',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 向量相似度索引（HNSW，召回效果优于 IVFFlat）
CREATE INDEX idx_chunks_embedding ON chunks
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- 过滤索引
CREATE INDEX idx_chunks_kb_id   ON chunks(knowledge_base_id);
CREATE INDEX idx_chunks_user_id ON chunks(user_id);

-- BM25 全文检索索引
-- ⚠️ 需要服务器安装 pg_jieba 或 zhparser 扩展，部署前确认
ALTER TABLE chunks ADD COLUMN content_ts TSVECTOR
    GENERATED ALWAYS AS (to_tsvector('jieba', content)) STORED;
CREATE INDEX idx_chunks_fts ON chunks USING GIN(content_ts);

-- 备选方案（无需中文扩展，零额外依赖）：
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- CREATE INDEX idx_chunks_trgm ON chunks USING GIN(content gin_trgm_ops);
```

**分块参数（MVP 默认值）：**

|参数|值|说明|
|---|---|---|
|chunk_size|512 tokens|适合大多数中文语料|
|chunk_overlap|64 tokens|保留上下文连接|
|分块策略|段落优先，超长则截断||

**metadata 示例：**

```json
{
  "page": 3,
  "section": "第二章 引言",
  "source_filename": "report.pdf"
}
```

---

##### 5. conversations — 对话表

```sql
CREATE TABLE conversations (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    knowledge_base_id UUID REFERENCES knowledge_bases(id) ON DELETE SET NULL,
    title             VARCHAR(500),
    last_message_at   TIMESTAMPTZ,             -- 每次发送消息后由应用层更新，用于列表排序
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conv_user_id  ON conversations(user_id);
CREATE INDEX idx_conv_last_msg ON conversations(user_id, last_message_at DESC);
```

|字段|类型|说明|
|---|---|---|
|knowledge_base_id|UUID|可为空，表示不绑定知识库（纯对话模式）|
|title|VARCHAR|首轮消息自动截取或 AI 生成|
|last_message_at|TIMESTAMPTZ|与 updated_at 分离，专用于"最近对话"排序|

---

##### 6. messages — 消息表

```sql
CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role            VARCHAR(20) NOT NULL,   -- user | assistant
    content         TEXT NOT NULL,
    rewritten_query TEXT,                   -- 查询改写后的内容（仅 user 消息）
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_msg_conv_id      ON messages(conversation_id);
CREATE INDEX idx_msg_conv_created ON messages(conversation_id, created_at ASC);
```

---

##### 7. message_citations — 引用溯源表

```sql
CREATE TABLE message_citations (
    id          UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id  UUID             NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    chunk_id    UUID             NOT NULL REFERENCES chunks(id) ON DELETE CASCADE,
    document_id UUID             NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    -- ↑ 冗余存储，避免前端展示引用时的多层 JOIN（chunks → documents）
    score       DOUBLE PRECISION,  -- 召回融合分数（0~1），FLOAT 精度不足
    rank        INTEGER,            -- 最终展示顺序（1 = 最相关）
    document_version INTEGER NOT NULL,
);

CREATE INDEX idx_cite_msg_id ON message_citations(message_id);
```

> 此表支持"查看引用来源"功能，方便用户核查 AI 回答出处。`document_id` 冗余存储是有意为之，前端展示"来源：report.pdf 第3页"时无需多层 JOIN。

---
##### 8. document_tasks — 文档任务表

```sql
CREATE TABLE document_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    knowledge_base_id UUID NOT NULL REFERENCES knowledge_bases(id) ON DELETE CASCADE,

    task_type VARCHAR(32) NOT NULL,
    -- parse | chunk | embed | finalize | cleanup

    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- pending | queued | running | succeeded | failed | cancelled

    idempotency_key VARCHAR(128) NOT NULL,
    task_payload JSONB NOT NULL DEFAULT '{}',
    task_result JSONB,
    error_message TEXT,

    depends_on_task_id UUID REFERENCES document_tasks(id) ON DELETE SET NULL,

    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 3,

    queued_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX uniq_document_task_idempotency
ON document_tasks(idempotency_key);

CREATE INDEX idx_document_tasks_document_id
ON document_tasks(document_id);

CREATE INDEX idx_document_tasks_status
ON document_tasks(status);

CREATE INDEX idx_document_tasks_doc_type
ON document_tasks(document_id, task_type);
```

#### API 接口文档

**Base URL：** `https://api.orionamesh.com/v1`

**认证：** 所有接口（除 `POST /users`、`POST /auth/sessions` 外）需携带 Header：

```
Authorization: Bearer <access_token>
```

**统一响应格式：**

```json
{ "data": { ... } }
```

```json
{ "error": { "code": "NOT_FOUND", "message": "知识库不存在" } }
```

---

##### 模块一：认证与用户

##### `POST /users` — 注册

> 注册只创建用户资源，Token 需调用登录接口获取，两步分离语义清晰。

**Request Body：**

```json
{
  "email": "user@example.com",
  "password": "Str0ngP@ss",
  "display_name": "张三"
}
```

**Response 201：**

```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "display_name": "张三",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**错误码：**

- `400 INVALID_REQUEST` — 参数校验失败（密码强度不足等）
- `409 EMAIL_ALREADY_EXISTS` — 邮箱已注册

---

##### `POST /auth/sessions` — 登录

> 登录本质是"创建一个 session"，用资源名词而非动词。

**Request Body：**

```json
{
  "email": "user@example.com",
  "password": "Str0ngP@ss"
}
```

**Response 201：**

```json
{
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "display_name": "张三"
    }
  }
}
```

**错误码：**

- `401 INVALID_CREDENTIALS` — 邮箱或密码错误

---

##### `PUT /auth/sessions` — 刷新 Token

> 使用 `PUT` 表示替换当前 session，旧 refresh_token 同时失效。

**Request Body：**

```json
{
  "refresh_token": "eyJ..."
}
```

**Response 200：**

```json
{
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "expires_in": 3600
  }
}
```

**错误码：**

- `401 INVALID_TOKEN` — refresh_token 无效或已过期

---

##### `DELETE /auth/sessions` — 登出

> 使当前 refresh_token 失效（Redis 黑名单或直接删除）。

**Response 204：** No Content

---

##### `GET /users/me` — 获取当前用户信息

**Response 200：**

```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "display_name": "张三",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

##### `PATCH /users/me` — 更新当前用户信息

**Request Body（字段均可选）：**

```json
{
  "display_name": "李四"
}
```

**Response 200：** 返回更新后的用户对象

---

#### 模块二：知识库

##### `GET /knowledge-bases` — 获取知识库列表

**Query Params：**

|参数|类型|说明|
|---|---|---|
|page|int|页码，默认 1|
|page_size|int|每页数量，默认 20，最大 100|

**Response 200：**

```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "产品手册",
        "description": "Q3 版本",
        "document_count": 12,
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-02T00:00:00Z"
      }
    ],
    "total": 3,
    "page": 1,
    "page_size": 20
  }
}
```

---

##### `POST /knowledge-bases` — 创建知识库

**Request Body：**

```json
{
  "name": "产品手册",
  "description": "Q3 版本相关资料"
}
```

**Response 201：**

```json
{
  "data": {
    "id": "uuid",
    "name": "产品手册",
    "description": "Q3 版本相关资料",
    "document_count": 0,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

##### `GET /knowledge-bases/{kb_id}` — 获取知识库详情

**Response 200：** 返回单个知识库对象（含完整字段）

**错误码：**

- `404 NOT_FOUND`

---

##### `PATCH /knowledge-bases/{kb_id}` — 更新知识库信息

**Request Body（字段均可选）：**

```json
{
  "name": "新名称",
  "description": "新描述"
}
```

**Response 200：** 返回更新后的知识库对象

**错误码：**

- `404 NOT_FOUND`

---

##### `DELETE /knowledge-bases/{kb_id}` — 删除知识库

> 级联删除该知识库下所有文档和 chunks。

**Response 204：** No Content

**错误码：**

- `404 NOT_FOUND`

---

#### 模块三：文档

##### `POST /knowledge-bases/{kb_id}/documents` — 上传文档

**Content-Type：** `multipart/form-data`

|字段|类型|是否必须|说明|
|---|---|---|---|
|file|File|是|支持 PDF / DOCX / MD / TXT|
|filename|string|否|覆盖原始文件名|

**Response 202：**（异步处理，立即返回，状态为 `pending`）

```json
{
  "data": {
    "id": "uuid",
    "knowledge_base_id": "uuid",
    "filename": "report.pdf",
    "file_type": "pdf",
    "file_size": 204800,
    "status": "pending",
    "chunk_count": 0,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**错误码：**

- `400 UNSUPPORTED_FILE_TYPE` — 不支持的文件类型
- `400 FILE_TOO_LARGE` — 文件超过大小限制（MVP 默认 50MB）
- `404 NOT_FOUND` — 知识库不存在

---

##### `GET /knowledge-bases/{kb_id}/documents` — 获取文档列表

**Query Params：**

|参数|类型|说明|
|---|---|---|
|page|int|页码，默认 1|
|page_size|int|每页数量，默认 20，最大 100|
|status|string|可选，按状态过滤|

**Response 200：**

```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "filename": "report.pdf",
        "file_type": "pdf",
        "file_size": 204800,
        "status": "completed",
        "chunk_count": 43,
        "error_message": null,
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-01T00:01:00Z"
      }
    ],
    "total": 12,
    "page": 1,
    "page_size": 20
  }
}
```

---

##### `GET /knowledge-bases/{kb_id}/documents/{doc_id}` — 获取文档详情

> 同时用于轮询文档处理状态，前端上传后轮询此接口直到 `status` 为 `completed` 或 `failed`，无需独立 `/status` 子路径。

**Response 200：**

```json
{
  "data": {
    "id": "uuid",
    "knowledge_base_id": "uuid",
    "filename": "report.pdf",
    "file_type": "pdf",
    "file_size": 204800,
    "status": "processing",
    "chunk_count": 0,
    "error_message": null,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:10Z"
  }
}
```

**错误码：**

- `404 NOT_FOUND`

---

##### `DELETE /knowledge-bases/{kb_id}/documents/{doc_id}` — 删除文档

> 级联删除该文档所有 chunks 及向量数据。

**Response 204：** No Content

**错误码：**

- `404 NOT_FOUND`

---

#### 模块四：对话

##### `GET /conversations` — 获取对话列表

**Query Params：**

|参数|类型|说明|
|---|---|---|
|page|int|页码，默认 1|
|page_size|int|每页数量，默认 20|

**Response 200：**

```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "关于 Q3 报告的问题",
        "knowledge_base_id": "uuid",
        "last_message_at": "2025-01-02T10:00:00Z",
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "total": 8,
    "page": 1,
    "page_size": 20
  }
}
```

---

##### `POST /conversations` — 创建对话

**Request Body：**

```json
{
  "knowledge_base_id": "uuid",
  "title": "关于 Q3 报告的问题"
}
```

> `knowledge_base_id` 可为 null（纯对话模式）；`title` 可为空，后端在首条消息后自动生成。

**Response 201：**

```json
{
  "data": {
    "id": "uuid",
    "title": null,
    "knowledge_base_id": "uuid",
    "last_message_at": null,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

##### `GET /conversations/{conv_id}` — 获取对话详情

**Response 200：** 返回单个对话对象

**错误码：**

- `404 NOT_FOUND`

---

##### `PATCH /conversations/{conv_id}` — 更新对话（如重命名标题）

**Request Body：**

```json
{
  "title": "新标题"
}
```

**Response 200：** 返回更新后的对话对象

---

##### `DELETE /conversations/{conv_id}` — 删除对话

**Response 204：** No Content

---

##### `GET /conversations/{conv_id}/messages` — 获取历史消息

**Query Params：**

|参数|类型|说明|
|---|---|---|
|before|string|游标（message_id），返回此条消息之前的记录|
|limit|int|返回条数，默认 50，最大 100|

**Response 200：**

```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "role": "user",
        "content": "Q3 的销售额是多少？",
        "rewritten_query": null,
        "created_at": "2025-01-01T00:00:00Z"
      },
      {
        "id": "uuid",
        "role": "assistant",
        "content": "根据报告，Q3 销售额为 1200 万元……",
        "rewritten_query": null,
        "created_at": "2025-01-01T00:01:00Z"
      }
    ],
    "has_more": false
  }
}
```

> citations 不在列表中内嵌，由前端在用户点击"查看来源"时按需拉取（见下方接口），避免响应体过重。

---

##### `POST /conversations/{conv_id}/messages` — 发送消息（SSE 流式）

> 核心接口，触发完整 RAG 链路。响应为 **SSE 流**（Server-Sent Events）。

**Request Body：**

```json
{
  "content": "Q3 的销售额是多少？"
}
```

**Response 200：** `Content-Type: text/event-stream`

```
event: message_start
data: {"message_id": "uuid"}

event: retrieval_done
data: {"citations": [{"rank": 1, "score": 0.92, "chunk_id": "uuid", "document_id": "uuid", "filename": "report.pdf", "page": 3}]}

event: delta
data: {"text": "根据"}

event: delta
data: {"text": "报告，"}

event: delta
data: {"text": "Q3 销售额为 1200 万元……"}

event: message_end
data: {"message_id": "uuid", "finish_reason": "stop"}
```

**RAG 链路（后端执行顺序）：**

1. 查询改写（结合近 N 轮历史消息）
2. 向量召回（pgvector cosine，Top-K=10）
3. BM25 全文召回（Top-K=10）
4. RRF 融合排序
5. 重排序（Reranker）
6. 上下文打包（去重 + token 截断）
7. 流式生成回答

**错误码：**

- `404 NOT_FOUND` — 对话不存在
- `409 KNOWLEDGE_BASE_NOT_READY` — 知识库仍有文档处理中

---

##### `GET /conversations/{conv_id}/messages/{msg_id}/citations` — 获取消息引用来源

> 前端在用户点击"查看来源"时按需调用，不在消息列表中预加载。

**Response 200：**

```json
{
  "data": {
    "items": [
      {
        "rank": 1,
        "score": 0.9234567891234,
        "chunk_id": "uuid",
        "document_id": "uuid",
        "filename": "report.pdf",
        "file_type": "pdf",
        "page": 3,
        "section": "第二章 引言",
        "content": "……Q3 销售总额达 1200 万元，同比增长 15%……"
      }
    ]
  }
}
```

**错误码：**

- `404 NOT_FOUND`

---

### HTTP 状态码使用规范

|场景|状态码|
|---|---|
|创建资源成功|`201 Created`|
|异步任务已接受（文档上传）|`202 Accepted`|
|查询 / 更新成功|`200 OK`|
|删除成功|`204 No Content`|
|参数校验失败|`400 Bad Request`|
|未携带 Token / Token 无效|`401 Unauthorized`|
|无权访问他人资源|`403 Forbidden`|
|资源不存在|`404 Not Found`|
|资源冲突（邮箱重复等）|`409 Conflict`|
|服务端内部错误|`500 Internal Server Error`|

---

### 错误码总表

|Code|HTTP Status|说明|
|---|---|---|
|`INVALID_REQUEST`|400|请求参数校验失败|
|`UNSUPPORTED_FILE_TYPE`|400|不支持的文件格式|
|`FILE_TOO_LARGE`|400|文件超过大小限制（50MB）|
|`INVALID_CREDENTIALS`|401|邮箱或密码错误|
|`UNAUTHORIZED`|401|Token 无效或已过期|
|`INVALID_TOKEN`|401|refresh_token 无效|
|`FORBIDDEN`|403|无权访问该资源|
|`NOT_FOUND`|404|资源不存在|
|`EMAIL_ALREADY_EXISTS`|409|邮箱已注册|
|`KNOWLEDGE_BASE_NOT_READY`|409|知识库有文档仍在处理|
|`INTERNAL_ERROR`|500|服务端内部错误|