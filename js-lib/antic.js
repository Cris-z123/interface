/**
 * 判断是否是工作日
 * @param {日期} data 
 */

const isWeekDay = (data) => {
    data.getDay() % 6 !== 0;
}

/**
 * 判断是否为苹果设备
 */

const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform)


/**
 * 一键返回顶部，ie不支持该方法
 */
const goToTop = () => window.scrollTo(0, 0);


/**
 * 两种方法，来获取特定年份的总周数
 * @param {年份} y 
 */

function computeWeeks(y) {
    const leapDay = p(y) === 4 || p(y - 1) === 3 ? 1 : 0
    return 52 + leapDay
}
function p(y) {
    return (y + Math.ceil(y / 4) + Math.ceil(y / 100) + Math.ceil(y / 400)) % 7;
}

function getWeeks(y) {
    const day = new Date(`${y}/12/28`).getDay();
    return day !== 0 && day <= 4 ? 53 : 52
}


/**
 * 生成随机HEX色值
 */

const randomColor = ()=> {
    "#" + Math.floor(Math.random() *  0xffff).toString(16).padEnd(6, "0")
}

/**
 * 生成星级评分
 * @param {分数} rate 
 */
const startScore = rate=> {
    "★★★★★☆☆☆☆☆".slice(5 - rate, 10-rate)
}

/**
 * 键盘
 */

(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"]
    .map(x=>
        (o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["Bs","Tab","Caps","Enter"][p++]||'Shift',p])}\\|`,m+=y+(x+'    ')
    .slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()