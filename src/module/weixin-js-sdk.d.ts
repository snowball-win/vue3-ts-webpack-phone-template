declare namespace global {
  interface window {
    wx: {
      config: (config:unknown) => void
      checkJsApi: (config:unknown) => void
      ready: (config:unknown) => void
      updateTimeAppMessageShareData: (config:unknown) => void
      updateTimelineShareData: (config:unknown) => void
    }
  }
}
declare let WeixinJSBridge: any
declare module 'weixin-js-sdk';
declare module 'jweixin-1.6.0';
