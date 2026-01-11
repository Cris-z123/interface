### 智能体运行机制

核心机制：
    1. 感知 (Perception): 即观察（Observation），可以是用户指令、外部环境的数据输入或者上一步行动的反馈
    2. 思考 (Thought)：通常是LLM内部的推理过程
        * 规划 (Planing)：基于观察和记忆，指定或调整行动计划
        * 工具选择 (tool selection)：根据当前计划，从可用工具库中，选择适合下一步骤的工具，并确定该工具所需参数
    3. 行动（Action）：决策完成后，通过执行器（Actuators）执行具体行动

交互协议（Interaction Protocol）：
    * Thought
    * Action