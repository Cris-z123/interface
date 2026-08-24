1. Agent的基本原理：根据输入，通过大模型思考，进行工具的选择和使用，不断循环这个过程，最后得到预期结果
    * 编排器-根据ReAct模式，调度模型和工具
    * 模型
    * 工具
    * 系统提示词
    * 状态 + 上下文
    * 中间件
    * 结构化输出
    * Skills
2. WorkFlow与Agent：从技术角度Agent是更小范围的WorkFlow，适合开放性任务，WorkFlow更适合预设和结构化的任务
3. LangChain
    * Agent创建方式: `create_agent()`
    * Models: 模型的创建（`ModelClass`、`init_chat_model()`）、调用(`invoke()`、`ainvoke()`、`batch()`、`abatch()`、`batch_as_completed()`、`stream()`、`astream()`)、配置(`config`)
    * 中间件(装饰器)：动态切换模型-`wrapper_model_call`、动态切换提示词-`dynamic_prompt`
    * Model结构化输出: 定义结构化输出（pydantic、`TypedDict`、JSON Schema）获取结构化输出（`with_structured_output()`、Output Parser）
    * 工具创建：`@tool`，工具参数 1.函数注释(google规范 `Args`、`Returns`、`Raise`)；2.`pydantic`；3.JSON Schema，工具错误处理 1. 工具函数内处理 2. 中间件`wrap_tool_call`
    * 工具结构化输出：`ToolStrategy` 定义结构（pydantic、JSON Schema、`Dataclass`、`TypedDict`）自定义消息（`tool_message_content`） 错误处理（`handle_errors`）
    * Agent流式输出：`agent.stream({ "message": [{"role": "user","content": "查询"}] }, stream_model="messages")` `stream_model`：`values` `updates` `messages` `tasks` `debug` `checkpoints` `custom`
    * 短期记忆: 一个会话线程中的状态（可以在内存和数据库中） 核心api`checkpointer` 内存-`InMemorySaver`DB-使用对应DB的checkpointer数据库依赖 `state`(适合管理当前会话信息，例如会话内容) `context`(适合管理固定信息，例如用户信息)
    * 短期记忆的管理：`AgentState`(短期记忆类) 通过`tool`的`ToolRuntime`(获取会话) `Command`(修改会话)  通过中间件`before_model`(agent运行前置中间件) `after_model`(agent运行后置中间件) 也可以操作会话
    * 会话上下文压缩：消息截断(通过`before_model`进行`RemoveMessage()`移除消息列表部分内容) 消息删除(通过`after_model` `RemoveMessage(id=REMOVE_ALL_MESSAGES)`清空消息) 消息摘要(`SummarizationMiddleware`中间件) 自定义摘要(`before_model` `after_model` `wrap_model_call` 都可以对消息列表进行管理)
    * 长期记忆：跨会话线程中的状态(可以放在内存和数据库中) 核心组件`Store` 内存-`InMemoryStore` DB-适用对应DB的`checkpointer`和`store`数据库依赖
    * 长期记忆的管理：通过`Store`组件，定义命名空间`namespace` 进行键值对存储，一般通过`tool`对长期记忆进行增删改查（`put` `delete` `get` `search`）
    * HITL(Human-in-the-loop - 人机协作)：核心实现-`HumanInTheLoopMiddleware`进行会话`interrupt_on`, 可以人工操作类型-`approve` `edit` `reject` `respond`，通过`Command`响应中断，可以单个也可以批量
    * 自定义HITL: 生命周期（model response -> `HumanInTheLoopMiddleware`通过`after_model`检查model response是否存在需要中断的`tool` -> 发起中断 -> 等待决策 -> 继续执行） 通过`after_model`中间件，获取大模型响应的工具信息，通过`interrupt()`自定义控制
    * Guardrails(安全护栏)：`PIIMiddleware()`有内置的敏感信息脱敏 `after_model`和`before_model`可以对模型输入输出进行敏感信息检测或自定义脱敏，可以通过正则、敏感词库或模型检测敏感信息 
    四层安全护栏架构 `before_agent`(对输入进行安全检测，例如过滤、取消回答) -> PII检测（对模型、工具调用进行敏感信息处理） -> HITL（对敏感操作进行人工审核） -> `after_model`（对模型输出进行基于模型驱动的安全检测）
    * 上下文：Model Context(包含系统提示词、消息列表、工具选择、模型选择)、Tool Context、Life-cycle Context, 主要来源`Runtime Context`、`State`、`Store`
    * 运行时：LangGraph构建的Runtime对象，包含`Context`、`Store`、`Stream Write`、`Execution Info`、`Server Info`
3. MCP
    * 核心概念：客户端-服务端结构，核心角色-MCP Host（使用端）、MCP Client（连接mcp服务端，解析和发送请求）、MCP Server（实际业务处理端，处理并响应请求）
    * 核心工具：fastmcp langchain-mcp-adapters
    * 模式：1.stdio（本机同时运行客户端和服务端通信） 2.Streamable HTTP（客户端和服务端通过http通信）
    * 认证与安全：核心原理-OAuth&JWT，具体流程-1.生成RAS密钥对，私钥签发JWT Token;2.Client携带Token，请求Server端;3.Server用公钥验证Token,通过后正常调用工具，否则401认证失败
    * tool_interceptors拦截器：相当于一个洋葱模型的中间件，可以自定义Client请求和Server响应的Tool上下文
    * Resource、Prompt: MCP Server端暴露的只读数据 `@mcp.resource("scheme://path")` 和 只读提示词模板 `@mcp.prompt`，客户端通过`get_resources("server_name", uris=["stock://AAPL", "config://tags"])` `get_prompt("server_name")`获取后由程序决定使用方式
    * 回调函数：Server端通过`tool`的`ctx: Context`参数传递信息，Client端通过`callbacks`函数的`context: CallbackContext`接收
    * Elicitation(交互式信息收集): MCP Server端工具执行时，向客户端请求额外信息，Server端通过tool的`ctx: Context`参数，通过`ctx.elicit(message="", response_type="")`发送询问，Client端通过`Callbacks`的`ElicitResult(action="", content="")`回复
