/* eslint-disable */
import request from '@/utils/request'

export function getUserDetails() {
  return request({
    url: '/zkrx-supply-chain/api/v1/userManager/userDetail',
    method: 'post'
  })
}
