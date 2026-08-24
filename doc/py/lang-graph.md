1. LangGraph
    * deepAgent -> LangChain -> LangGraph 封装程度依次降低
    * 核心特点：持久化、HITL、Streaming、Memory、调试和可观测性
    * 图、线、状态：`StateGraph`-构建图 `add_node()`-增加节点 `add_edge()`-连接节点 `add_conditional_edges()` -条件连接 `compile()`-编译图 `MessageState`-状态
    * 设计方法论：1.将业务流程拆解成离散步骤（梳理流程图和节点）；2.识别每个步骤的操作类型（LLM、数据、操作、人工输入步骤）；3.设计状态结构（`TypedDict`定义状态）；4.实现每个步骤对应的节点函数（具体的python函数）；5.将节点连接成完整图（编译图）
    * 工作流模式-提示链：每个节点，依赖上个节点输入进行输出
    * 工作流模式-并行化：多个节点并行处理后，整理结果
    * 工作流模式-路由：通过路由节点推理判断，分发给不同的分支节点
    * 工作流模式-编排者-工作者：编排者拆分任务，然后动态生成工作者任务节点，最后汇总结果
    * 工作流模式-评估器-优化器：一个节点输出，一个节点审查输出，如果不满足要求，带上反馈重新输出，直到达标
    * ToolRuntime、ToolNode：工具上下文、预置工具节点
    * Checkpointer：与LangChain的checkpoint相同，用于状态保存，通过指定Thread和config，进行状态的持久化（内存或数据库）。
        `get_state()`-获取当前节点状态 `get_state_history()`-获取历史所有节点状态 `update_state`-创建一个新的checkpoint并更新状态 `invoke(None, 历史节点checkpoint_id)`-重放历史节点状态
        super-step（每一轮节点并发执行完成后才更新状态并记录checkpoint，然后继续下一轮）
    * Store：与LangChain的store相同，用于状态保存，通过指定命名空间和key，进行状态的持久化（内存或数据库）。增删改查（`put` `delete` `get` `search`）。也可以通过文本嵌入，进行语义搜索
    * 错误处理：`RetryPolicy`-节点处理重试配置 `TimeoutPolicy`-节点处理超时配置，仅支持异步节点 `error_handle`-节点错误自定义处理 `set_node_defaults`-节点默认错误处理配置
    * 流式输出：stream v1与v2的区别-单模式是dict，多模式是（mode, data）tuple，v2统一输出StreamPart dict
    * 输出token过滤：message输出时过滤一些无需展示在前端的消息，1.根据`metadata`里的`langgraph_node`节点名称过滤；2.给节点配置`with_config("tags": ["xxx"})`，然后根据tag过滤；3. 节点配置`with_config("tags": ["nostream"})`，该节点的消息，不会出现在message流中
    * Event streaming：最新推荐的流式处理 `graph.stream_events({ "messages": [{"role": "user", "content": "xxx"}] }, version="v3")` 暴露-`messages`、`values`、`output`、`subgraph`、`interrupts`、`interrupted`、`interleave`投影属性；
    惰性流，只创建对象，不执行图，所以每次访问属性或者遍历messages才会驱动图
    * 人工介入：节点内直接使用`interrupt()`进行中断，调用`Command()`恢复中断继续执行。**恢复之后，会重新执行整个图。所以要保证各节点执行的幂等**。
    多个中断，需要通过中断ID来进行恢复；不要对interrupts使用Try/Except；多个中断使用`add_conditional_edges()`控制，不要循环；
