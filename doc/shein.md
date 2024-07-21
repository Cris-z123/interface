1. ts 接口和类型别名的区别
2. ts 强制断言
3. ts 泛型赋值
4. ts 什么是字面量
5. react fiber
6. 性能优化 webP格式优缺点 长任务优化 性能指标
7. `cookie` 的 `same-site` 属性 同源和同站的关系
  * 同源`same-site`：scheme、主机域名、端口相同
  * 同站`same-origin`：scheme、部分域名+有效顶级域名(eTLD+1)相同eTLD: (effective top-level domain) 有效顶级域名，注册于 Mozilla 维护的公共后缀列表（PublicSuffix List）中,如.com、.co.uk、.github.io,.top 等eTLD+1: 有效顶级域名+二级域名，如 taobao.com,baidu.com,sugarat.top
8. PWA `ServiceWork` 实现前端缓存及其他前端缓存的方式
9.  `npm install` 经历了什么
    1. 检查config
    2. 获取包信息
    3. 检查是否有lock文件
    4. 构建依赖树，扁平化
    5. 检查缓存 有就解压到`node_modules`
    6. 没有就下载包并检查完整性然后添加到缓存并解压到到`node_modules`
    7. 生成lock文件
10. `pnpm` 的优缺点 与 `yarn` `npm` 的区别
    区别：1. 速度更快，并行执行任务，同时支持缓存，但后续npm的版本也支持了该方式
         2. 安装版本统一，因为会生产一个锁定文件（lock file），但后续的npm版本，也支持生成锁定文件
