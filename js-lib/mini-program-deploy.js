const ci = require('miniprogram-ci')
const path = require('path');
const call = async (bin, args) => (await execa(bin, args)).stdout
const isChina = (s) => {
    var reg = new RegExp("[\u4E00-\u9FFF]+", "g");
    if (reg.test(s)) {
        return true
    } else {
        return false
    }
}
// 获取版本号
const packageJsonData = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
const version = packageJsonData.version
// 获取提交信息（版本变更信息）
let res = await call('git', ['log', '-1'])
let resArr = res.split('\n')
let commitMsg = resArr[resArr.length - 1].trim()
if (!isChina(commitMsg)) {
    res = await call('git', ['log', '-2'])
    resArr = res.split('\n')
    commitMsg = resArr[resArr.length - 1].trim()
}

// 创建项目对象
const project = new ci.Project({
    appid: '******',  // 小程序appid
    type: 'miniProgram',  // 类型
    projectPath: path.join(__dirname, projectPath), // 项目路径
    privateKeyPath: path.join(__dirname, './private.********.key'),  // 密钥路径
    ignores: ['node_modules/**/*'],  // 忽略的文件
})

// 调用上传方法
ci.upload({
    project,
    version,
    desc,
    setting: {
        es6: true, // 是否 "es6 转 es5"
        minify: true,  // 是否压缩代码
        disableUseStrict: true,
        autoPrefixWXSS: true, // 上传时样式自动补全
        minifyJS: true,
        minifyWXML: true,
        minifyWXSS: true,
    },
}).then(res => {
    console.log(res)
    console.log('上传成功')
}).catch(error => {
    if (error.errCode == -1) {
        console.log('上传成功')
    }
    console.log(error)
    console.log('上传失败')
    process.exit(-1)
})
