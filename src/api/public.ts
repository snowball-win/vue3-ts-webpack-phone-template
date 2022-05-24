/* eslint-disable */
import request from '@/utils/request'

export type CaptchaResponse = HTMLOrSVGElement
export interface CaptchaRequest { id: string }

export function getCaptcha(params: CaptchaRequest) {
  return request<CaptchaResponse>({
    url: '/public/captcha',
    method: 'get',
    params
  })
}

export function initCsrfToken() {
  return request({
    url: '/public/csrf-token',
    method: 'get'
  })
}
