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