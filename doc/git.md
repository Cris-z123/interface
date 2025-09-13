## 本地仓库由 工作目录（working dir） 缓存区（Index） HEAD 三部分组成

`git init` - 初始化仓库
`git clone` - 克隆仓库
`git add <filename>` - 将改动提交到缓存区
`git commit -m "内容"` - 提交改动
`git push origin master` - 提交到远程分支
`git checkout -b feature` - 创建一个feature分支并切换过去
`git checkout master` - 切换回主分支
`git branch -d feature` - 删除本地feature分支
`git push origin <branch>` - 推送分支到远程仓库
`git pull` - 更新本地仓库到最新
`gir merge <branch>` - 获取（fetch）并合并（merge）远端改动
`git add <filename>` - 
`git diff <source_branch> <target_branch>` - 合并改动前，可以查看
`git tag 1.0.0 1b2e1d63ff` - 创建一个叫1.0.0标签
`git log` - 获取提交ID
`git checkout -- <filename>` - 使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到缓存区的改动，以及新文件，都不受影响
`git fetch origin` `git reset --hard origin/master` - 丢弃你所有的本地改动与提交，可以到服务器上获取最新的版本并将你本地主分支指向到它



## git 提交规范

<type>(scope):<subject>

type:
* feature: 新功能
* fix: 修补bug
* docs: 文档
* style: 格式
* refactor: 重构
* test: 增加测试
* chore: 构建过程或辅助工具的变动
* 其他可自定义

scope:
影响的范围

subject:
对本次提交做简单描述

远程分支已经删除了，但是本地仍然可以看到
查看本地所有分支
git branch -a
查看远程分支
git remote show origin
删除或同步本地分支
git remote prune origin

同步远程指定分支
git clone -b
