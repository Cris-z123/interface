// 前端页面水印
let watermark = {}

let setWatermark = (str) => {
  let id = '123456789'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let canvas = document.createElement('canvas')
  canvas.width = 250
  canvas.height = 120

  let ctx = canvas.getContext('2d')
  ctx.rotate(-15 * Math.PI / 150)
  ctx.font = '14px Vedana'
  ctx.fillStyle = 'rgba(100, 100, 100, 0.10)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'Middle'
  ctx.fillText(str, canvas.width / 8, canvas.height / 2)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '35px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '99999'
  div.style.width = `${document.documentElement.clientWidth}px`
  div.style.height = `${document.documentElement.clientHeight}px`
  div.style.background = `url('${canvas.toDataURL('image/png')}') left top repeat`
  document.body.appendChild(div)

  // 监听DOM变更（https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver）
  let observer = new MutationObserver(() => setWatermark(str))

  observer.observe(document.getElementById(id), { attributes: true, childList: true, subtree: true })

  return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
  let id = setWatermark(str)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(str)
  }
}

const outWatermark = (id) => {
  if (document.getElementById(id) !== null) {
    const div = document.getElementById(id)
    div.style.display = 'none'
  }
}
watermark.out = () => {
  const str = '123456789'
  outWatermark(str)
}

export default watermark



// 基于node.js的后端生成水印
const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();

/**
 * 为图片生成水印
 * @param {*} bgImg 背景图片
 * @param {*} font 水印内容
 * @param {*} filePath 新图片生成路径
 */
// 添加水印
const addText = async(bgImg, font = {}, filePath) => {
  const { 
    fontSize = 14, 
    text = '机密内容', 
    color = 'rgba(240,241,243, 0.4)', 
    left = 0, 
    top = 0
  } = font;

  // 设置文字属性
  const attributes = {
    fill: color
  };

  const options = {
    fontSize,
    anchor: 'top',
    attributes
  };

  // 文字转svg 再buffer
  const svgTextBuffer = Buffer.from(textToSVG.getSVG(text, options));

  // 写入文字水印
  await sharp(bgImg || {
    create: {
      width: 200,
      height: 200,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    }
  })
  .rotate(0)
  .resize(200, 200)
  .composite([
    {
      input: svgTextBuffer,
      top,
      left,
    }
  ])
  .png()
  .toFile(filePath)
  .catch(err => {
    console.log(err)
  });
};