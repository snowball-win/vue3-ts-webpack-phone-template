import { AxiosRequestConfig } from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import service from './axios'

interface BaseResponse<T> {
  code: string
  payload: T
  mas?: string
}
// interface BaseResponse<T> {
//   code: number
//   status: boolean
//   data: T
//   message?: string
// }

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    console.log('20', config)
    service.request<BaseResponse<T>>(config).then(
      (res) => {
        console.log('22', res)
        // res.data.payload
        resolve(res.data)
      },
      (err) => {
        console.log('27', err)
        switch (err?.code) {
          case 401:
            // token失效
            Dialog.alert({
              title: '提示',
              message: '您还未登录或登录已过期，请重新登录'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
            break
          default:
            Toast(err.msg)
            break
        }
        reject(err)
      }
    )
  })
}

export default request
