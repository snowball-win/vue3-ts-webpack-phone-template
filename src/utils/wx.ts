// import wx from 'weixin-js-sdk'
import wx from 'jweixin-1.6.0'
import { Progress } from 'vant'
export const config = (data: {
  debug: boolean // 开启调试模式调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: string // 必填，公众号的唯一标识
  timestamp: string // 必填，生成签名的时间戳
  nonceStr: string // 必填，生成签名的随机串
  signature: string // 必填，签名
  jsApiList: string[] // 必填，需要使用的JS接口列表
}) => {
  wx.config(data)
}


let VersionMobile = ''
const ua = navigator.userAgent.toLowerCase()
type VersionMobileType = 'android' | 'ios' | 'iPhone' | 'iPad' | ''
export function getMobile(): VersionMobileType {
  if (ua.indexOf('android') > 0) {
    VersionMobile = 'android'
  } else if (ua.indexOf('ios') > 0) {
    VersionMobile = 'ios'
  } else if (ua.indexOf('iPhone') > 0 || ua.indexOf('iphone') > 0) {
    VersionMobile = 'iPhone'
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('ipad') > 0) {
    VersionMobile = 'iPad'
  }
  return VersionMobile as VersionMobileType
}
export function isWeixin() {
  if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
    return true
  } else {
    return false
  }
}
interface IDocument {
  attachEvent: any
}
export function setHtmlFontSize() {
  if (typeof window === 'object') {
    const windowHtml = (window.document.body.parentElement as HTMLElement)
    const fontSize = 16
    // 动态计算html的font-size
    const bodyWidth = document.body.clientWidth
    const size = bodyWidth * fontSize / 375
    windowHtml.style.fontSize = size + 'px'
  }
}

export function setHtmltitle(title?: string) {
  document.title = title || ''
  if (getMobile() === 'iPhone') {
    const iframe = document.createElement('iframe')
    iframe.src = `${process.env.PUBLIC_PATH || '/'}favicon.ico`
    iframe.style.display = 'none'
    iframe.onload = () => {
      setTimeout(iframe.remove.bind(iframe), 9)
    }
    document.body.appendChild(iframe)
  }
}

export function initFont() {
  const doc = (document as unknown as IDocument)
  if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
      handleFontSize()
  } else {
      if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
      } else if (doc.attachEvent) {
          doc.attachEvent('WeixinJSBridgeReady', handleFontSize)
          doc.attachEvent('onWeixinJSBridgeReady', handleFontSize) }
  }
  function handleFontSize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function name() {
          WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      })
  }
}
export default wx
