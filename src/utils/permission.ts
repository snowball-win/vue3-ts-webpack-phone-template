import router from '@/router'
import { setHtmltitle } from '@/utils/wx'
// import store from '@/store'
// import { Toast, Notify } from 'vant'
// import { getToken, blackList } from './auth'

// eslint-disable-next-line
router.beforeEach(async (to, from, next) => {
  // 设置标题
  // if (to.meta.title === undefined ) {
  //   document.title = '云游古今'
  // } else {
  //   document.title = to.meta.title || ''
  // }
  setHtmltitle((to.meta && to.meta.title) as string)

  next()

  // 根据token判断用户是否登录
  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/signin') {
  //     // 如果已经登录了，而去的又是login页就重定向到首页
  //     next({ path: '/' })
  //   } else {
  //     const hasUserInfo = store.getters.getUid
  //     if (hasUserInfo) {
  //       next()
  //     } else {
  //       // 如果用户刷新了浏览器，那么需要重新请求基本信息塞到vuex中进行状态管理
  //       try {
  //         await store.dispatch('user/GET_INFO')
  //         next()
  //       } catch (error: any) {
  //         // 清空token重新去登录
  //         await store.dispatch('user/SING_OUT')
  //         Toast.fail(error.message || '出错了')
  //         next(`/login?redirect=${encodeURI(location.href)}`)
  //       }
  //     }
  //   }
  // } else {
  //   if (blackList.indexOf(to.path) > -1) {
  //     // 白名单没有token也直接放行
  //     next()
  //   } else {
  //     Notify({ type: 'primary', message: '请先登录后再操作' })
  //     next(`/signin?redirect=${to.fullPath}`)
  //   }
  // }
})
