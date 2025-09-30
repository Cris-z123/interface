1. stages: 阶段，类型数组, 分别为自定义的jobs, 规定各个任务的执行顺序，任务名称相同，则同时执行
   * build
   * test
   * deploy
2. include: 应用的yml或yaml配置文件, key: 包括，local、remote、file、template, local 一般是本地文件，remote 可以是远程其他可访问的地址，filter一般是其他项目下的文件路径，template是官方提供的模版
3. variables: 变量, 预定义或自定义, 根据变量位置不同，优先级不同，相同的变量会根据优先级进行覆盖
4. workflow: 工作流, rules, 用来定义CI/CD何时触发，和jobs中的rules、only相似
5. 定义任务：如
   ```yml
   build-job：
    stage: build
    script:
        - echo "build the application"
   ```
