## MCP通过​​标准化协议​​统一工具交互：
​​1. 动态工具加载​​：按需检索工具说明，突破提示词长度限制。
​​2. 安全沙箱机制​​：默认隔离工具执行环境，权限控制精确到文件/API端点。
​3. ​状态持久化​​：记录多步骤任务上下文，支持断点续作（如先查航班再订酒店）。​
## 技术架构：三层组件协同，构成了其客户端-服务器架构
* ​MCP Host​（主机）​：这是最终的用户界面。承载AI模型的应用程序（如Claude Desktop、Cursor IDE或自定义的AI应用），用户通过它与模型交互，模型再通过内置的MCP客户端调用外部能力。
​​* MCP Client​（客户端）​：这是连接的桥梁。它嵌入在主机应用程序中，与MCP服务器建立1:1的连接，负责管理通信协议、发现服务器可用的能力，并转发模型的请求
。
​​* MCP Server​（服务器）​：这是能力的提供者。它们是轻量级的程序，负责封装对特定资源（如数据库、API、文件系统）的访问逻辑，并将其以标准化的“工具（Tools）”或“资源（Resources）”的形式暴露出来，分为三类：
    1. 资源型​​：访问本地文件/数据库（如读取用户文档）。
    2. 工具型​​：执行操作（如发邮件、查天气）。
    3. 提示型​​：提供预设模板（如生成周报）。
​* ​通信机制​​支持本地（STDIO）与远程（HTTP+SSE）连接，消息格式采用JSON-RPC 2.0，确保跨平台兼容性。

```py
from mcp.server import FastMCP
import httpx

app = FastMCP('web-search')  # 初始化服务

@app.tool()
async def web_search(query: str) -> str:
    """执行网络搜索并返回总结"""
    async with httpx.AsyncClient() as client:
        # 实际中替换为你的搜索 API（如 SERP API）
        response = await client.get(f"https://api.search.com?q={query}")
        return response.json()["summary"]
    
if __name__ == "__main__":
    app.run(transport="stdio")  # 使用 stdio 通信
```

```py
from mcp.client.stdio import stdio_client
from mcp import ClientSession
import asyncio

async def main():
    # 配置服务器启动命令
    server_params = {"command": "uv", "args": ["run", "web_search.py"]}
    
    async with ClientSession(stdio_client(server_params)) as session:
        # 列出可用工具
        tools = await session.list_tools()
        print(f"可用工具: {[t.name for t in tools]}")
        
        # 调用搜索工具
        result = await session.execute_tool("web_search", {"query": "MCP 协议是什么？"})
        print(f"结果: {result}")

asyncio.run(main())
```
## 开源工具
* OpenAI Agents SDK	生产级Agent开发，原生支持MCP
* MCP Python SDK	快速构建自定义MCP服务端
* LangChain MCP Adapters	已有LangChain项目扩展工具调用能力

## 一些MCP服务

### 数据库交互
这类服务让LLM能直接与数据库对话，用自然语言查询数据。

• ​​MongoDB MCP Server​​：轻松实现MongoDB这类NoSQL数据库的无缝集成。

• ​​MySQL MCP Server​​：提供MySQL数据库集成，通常具有可配置的访问控制和模式检查功能。

### 网络搜索
为LLM注入实时搜索能力，基于最新信息生成回答，减少模型“幻觉”。

• ​​Tavily MCP​​：提供快速且免费的JSON格式搜索结果，让数据对接更轻松。

• ​​WebSearch​​：一个无需API密钥即可使用Google搜索结果进行免费网络搜索的MCP服务。

### 文件与知识管理
高效存储、检索和管理信息，适合长期存储和个性化偏好设置。

• ​​Filesystem MCP Server​​：基础且实用，允许通过MCP完成各类文件系统操作。

• ​​Memory MCP Server​​：为AI系统集成记忆功能，常用于基于知识图谱的持久化记忆系统，维持上下文。

### 编程与开发工具
为开发者提供代码生成、运行与调试支持，助力自动化开发流程。

• ​​Python MCP Server​​：允许执行Python代码，管理运行时环境。

• ​​JavaScript MCP Server​​：为JavaScript开发流程提供支持。

• ​​GitHub MCP Connector​​：使AI能够与代码库和API交互，例如自动生成提交信息，减少代码审查时间。
