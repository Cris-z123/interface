## 智能体运行机制

核心机制：
    1. 感知 (Perception): 即观察（Observation），可以是用户指令、外部环境的数据输入或者上一步行动的反馈
    2. 思考 (Thought)：通常是LLM内部的推理过程
        * 规划 (Planing)：基于观察和记忆，指定或调整行动计划
        * 工具选择 (tool selection)：根据当前计划，从可用工具库中，选择适合下一步骤的工具，并确定该工具所需参数
    3. 行动（Action）：决策完成后，通过执行器（Actuators）执行具体行动

交互协议（Interaction Protocol）：
    * Thought
    * Action


## 大语言模型

### 训练方式：
    * 监督学习
    * 强化学习
    * 预训练
    * 微调

分词: 自然语言文本给大语言模型之前，必须先将其转换成模型能够处理的数字格式的过程
分词器 (Tokenizer)：定义一套规则，将原始文本切分成一个个最小的单元（token）


## 智能体

### 经典设计范式
    * ReAct: 边思考边行动，Thought -> Action -> Observation, 适合不确定，需要与外部交互的任务
    * Plan-and-Solve：先指定计划，再依次行动, Planning -> Solving， 适合逻辑路径清晰，侧重内部推理和步骤分解的任务
    * Reflection: 行动后反思来指导继续行动, Execution -> Reflection -> Refinement，适合重视结果准确性和可靠性的任务

### 低代码智能体开发
    * Coze
    * Dify
    * n8n
### 智能体开发框架
    * AutoGen
    * AgentScope
    * CAMEL
    * LangGraph