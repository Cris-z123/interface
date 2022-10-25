/**
 * 相似的RGB颜色
 * 红绿蓝三元色#AABBCC可以简写为#ABC。 例如，#15c是颜色#1155cc的简写。
 * 现在，定义两种颜色#ABCDEF和#UVWXYZ之间的相似度是abs((AB - UV)^2 + (CD - WX)^2 + (EF - YZ)^2)。
 * 给定颜色#ABCDEF，返回与#ABCDEF最相似（即相似度最小）且可以简写表示的7字符颜色
 * @param {string} RGB 
 */

const similarRGB = (RGB) => {
    let newRGB = '#'

    for (let i = 1; i < RGB.length; i+=2) {
        let j = i
        let hex = Number.parseInt(`0x${RGB.substring(i, j+2)}`)

        // 近似色值都是17的倍数（如0x00，0x11，0x22）
        let similarHex = hex % 17 >= 9 ? hex + (17 - hex % 17) : hex - (hex % 17)

        newRGB = similarHex === 0 ? newRGB.concat('00') : newRGB.concat(similarHex.toString(16))
    }
    return newRGB
}

similarRGB('#09f166')