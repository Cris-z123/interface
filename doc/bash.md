## Bash 是一个命令行解释器

作为一个前端，在当今这个环境中，对于服务端的东西也需要做一些了解，所以打算从最基本的东西入手，Linux和shell脚本。

### Linux系统目录结构
* /bin: Binaries常用命令
* /boot: 启动Linux时使用的核心文件
* /dev：Device 存放Linux的外部设备
* /etc: Etcetera 系统管理所需的配置文件和子目录
* /home: 用户主目录
* /lib: Library 最基本的动态连接共享库
* /lost+found: 一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
* /media: 外部设备连接后，使用
* /mnt: 让用户用于临时挂载别的文件系统
* /opt: Optional 给主机额外安装软件所使用的目录
* /proc: Processes 
* /root: 系统管理员
* /sbin: Super User Binaries 系统管理员使用的系统管理程序
* /selinux: 存放安全系统
* /srv: 服务启动之后所需要提取的数据
* /sys: 文件系统
* /temp: temporary 存放一些临时文件
* /usr: unix shared resources 用户的大多应用程序和文件都放在这个目录
* /usr/bin: 系统用户使用的应用程序
* /usr/sbin: 超级用户使用的比较高级的管理程序和系统守护程序
* /usr/src: 内核源代码默认的放置目录
* /var: variable 这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
* /run: 是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

### 基本语法
* `#!`(shebang): 每个基于Bash的Linux脚本都此开头，且后面的路径也不能有空格
* 声明变量: `variable_value=value`
  * 读取或打印变量时需要在变量名前加上`$`
  * 变量名区分大小写
  * 变量名可以包含字母、数字、下划线，但不能用数字开头的变量名
  * 变量名与值之间的等号，两边不能有空格
  * 变量没有类型
* `if`: 
expression 为真时，执行then与fi之间的语句
```shell
if [ expression ];
then
statement
fi
```
* `for`
执行do与done之间的语句,以下两种方式都可以
```shell
for variable in list
do
commands
done
```
```shell
for ((expression1; expression2; expression3;))
do
commands
done
```
* 输入输出重定向
  * `command > file`: 输出重定向到file,会原file内容
  * `command < file`: 输入重定向file,覆盖原file内容
  * `command >> file`: 输出以追加的方式重定向到file
  * `command << file`: 输入以追加的方式重定向到file
  * `n >& m`: 将输出文件 m 和 n 合并。
  * `n <& m`: 将输入文件 m 和 n 合并。
* 常用运算符
  * `expr item1 operator item2`
  * expr是一款表达式计算工具
  * 运算符: `+` `-` `*` `/` `%` `=` `==` `!=` 
  * 运算符`-gt`:比较左边数字是否大于右边 `-ge`: 比较左边数字是否大于等于右边

### 常用命令:
* `./`: 执行脚本前缀
* `pwd`: 打印当前目录文件绝对路径
* `cd`: 更改目录
* `touch`: 创建一个空文件作为shell脚本
* `echo`: 打印输出
* `ls -l`: 列出所有文件和目录
    * 第一列: 文件类型及其文件权限
    * 第二列: 存储块的数量
    * 第三列: 文件的所有者和具有管理权限的超级用户
    * 第四列: 所有者/超级用户组
    * 第五列: 文件大小
    * 第六列: 创建时间或最后修改日期和时间
    * 第七列: 文件或目录名称
* `chmod`: 更改文件权限 
    * `chmod [class][operator][permission] file_name`
    * class: `-u`(用户) `g`(组) `o`(其他) `a`(所有类)
    * operator: `+ -` (增加或删除权限)
    * permission: `r`(读) `w`(写) `x`(运行)
* `read`: 读取用户输入
* `date`: 日期,可以进行格式化 date +<format-option-codes><format-option-codes>
     * `-I` 用于生成符合ISO 8601的日期/时间字符串输出
     * `-r` 用于打印文件的最后修改时间
     * `+%F` 日期; 以YYYY-MM-DD格式显示
     * `+%T` 格式为HH:MM:SS的时间(小时，以24格式表示)
* `sleep`: 休眠 `sleep number[suffix]`
     * s -秒
     * m -分钟
     * h -小时
     * d -天

### 绝对路径
* 任何目录的绝对路径始终以斜杠(/)开头，代表目录根目录。除此之外，目录路径中的所有斜杠将目录分开。
* 绝对路径中的所有目录名称均按层次结构顺序编写，父目录名称写在左侧。
* 绝对路径中的姓氏可能属于文件或目录。除姓氏外，所有名称均属于目录。
* 可以使用`pwd`命令确定当前目录的绝对路径。

### 相对路径
* 单点(.)代表当前目录
* 双点(..)代表当前工作目录的父目录
* 波浪号(~)代表已登录用户的主目录

### 注释
* #为单行注释
* 通过在<< COMMENT和COMMENT之间加上注释，可以在bash脚本中编写多行注释。也可以通过将注释括在(:')和单引号(')之间来编写多行注释。
