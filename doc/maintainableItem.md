## 如何建设一个可能可维护的项目

- 质量闸门
  确定一位好的 code owner
- 确定立场
  在项目中，你自己的立场
- 把规则落地
  用实际的工具强制落地规则，如 `Eslint`，用文档辅助
  清晰的目录结构
  好的命名风格
  | | 命名规范 |
  | ------ | ------ |
  | 常量 | TASK_EVENTS |
  | 类 | Task |
  | 类型 | ITask |
  | css | task-page-menu |
  | 变量 | taskList |
  | 方法 | onSubmit |
  | 文件 | edit-task.ts |
  | i18n | task_status_stop |
  不用 data、flag、ok、info 这类空泛的命名
  语义清晰，禁止拼音
  类/对象内部命名无需携带主体
  使用 be + adj.表达状态
  只在该注释的地方注释
  配置分离（`provide` `inject`

  > be 动词包括：is、am、are、was、were、being、been、to be

## 大型项目组件组织

- 动态组件插入
- 大数据表格：`canvas` 表格绘制
- Git 子模块
