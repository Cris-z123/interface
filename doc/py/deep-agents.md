1. DeepAgents
    * DeepAgents重点整合Sub-Agent、Planning、Skills、FileSystem核心能力，是harness engineering设计范式的具体实现
    * Prompt engineering：优化提示词本身，引导模型产生更准确、更符合格式要求的输出
    * Context Engineering：管理和构建传递给的整体上下文（Context），包括输入上下文、运行时上下文 、上下文压缩、上下文隔离、长期记忆等
    * Harness Engineering: 聚焦构建包裹在模型之外的一整套系统化基础设施，包括但不限于工具、记忆、规划、安全护栏、执行循环、状态管理等
    * Backend：用于提供文件管理后端，支持StateBackend-临时状态 FilesystemBackend-本地文件 LocalShellBackend-本地脚本执行 Sandbox-沙箱后端 StoreBackend-持久化存储 ContextHubBackend-链接ContextHub CompositeBackend-混合使用多种backend CustomBackend-自定义实现
    * SubAgent：直接配置`subagents`，也可以通过`CompiledSubAgent`配置LangChain的agent和LangGraph的图；主智能体的Config数据会共享子智能体，其他都不会
    * Sandbox: 沙箱后端，主要应用于Agents运行环境与用户主机隔离风险
    * Agent Skills与 Multi Agents架构：主agent+渐进式skill，主Agent+subAgent
    * deepAgents的Context Engineering：1. 系统提示词、AGENTS.md（记忆文件）skills；2.基于langchain的运行时上下文；3. 基于工具卸载（输入剪裁和输出剪裁）和对话摘要的上下文压缩；4.基于文件的长期记忆
