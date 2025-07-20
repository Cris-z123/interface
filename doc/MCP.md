## MCP通过​​标准化协议​​统一工具交互：
​​1. 动态工具加载​​：按需检索工具说明，突破提示词长度限制。
​​2. 安全沙箱机制​​：默认隔离工具执行环境，权限控制精确到文件/API端点。
​3. ​状态持久化​​：记录多步骤任务上下文，支持断点续作（如先查航班再订酒店）。​
## 技术架构：三层组件协同
* ​MCP Host​​：用户交互入口（如Claude Desktop、AI增强型IDE），负责发起任务请求。
​​* MCP Client​​：协议转换层，维护与服务器的连接，管理请求路由与安全策略。
​​* MCP Server​​：工具功能提供者，分为三类：
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