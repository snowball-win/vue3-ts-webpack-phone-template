// 2022年春节灯谜活动相关接口
/* eslint-disable */
import request from '@/utils/request'
// 灯谜基础信息
export type wechatActivityGetBaseInfoParams = { activityId: string, wxOpenId: string }
export function wechatActivityGetBaseInfo(data: wechatActivityGetBaseInfoParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/getBaseInfo',
    method: 'post',
    data
  })
}
// 发送验证码
export type smsManagerSendSmsCodeParams = { phoneNo: string, operateType: number }
export function smsManagerSendSmsCode(data: smsManagerSendSmsCodeParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/smsManager/sendSmsCode',
    method: 'post',
    data
  })
}
// 验证验证码
export type smsManagerValidateSmsCodeParams = { phoneNo: string, operateType: number, verifyCode: string }
export function smsManagerValidateSmsCode(data: smsManagerValidateSmsCodeParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/smsManager/validateSmsCode',
    method: 'post',
    data
  })
}

interface ParamsExtends {
  [key: string]: string,
}
type BaseParams = {
  userId: string, // 终端用户ID
  activityId: string // 活动ID
  userToken?: string, // 用户token
} & ParamsExtends

// 查看答题记录
export function activityAnswerRecord(data: BaseParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/answerRecord',
    method: 'post',
    data
  })
}

// 活动绑定用户手机号
type activityBindPhoneNumberParams = {
  "userId": string,
	"userToken": string,
	"phoneNumber": string,
	"verifyCode": string
}
export function activityBindPhoneNumber(data: activityBindPhoneNumberParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/bindPhoneNumber',
    method: 'post',
    data
  })
}

// 获取分享信息
type activityShareParams = BaseParams & {
  url: string
}
export function activityShare(data: activityShareParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/share',
    method: 'post',
    data
  })
}

// 开始答题
export function activityStart(data: BaseParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/start',
    method: 'post',
    data
  })
}

// 提交答案
type activitySubmitParams = BaseParams & {
  questionId: string,
  submitAnswer: string,
}
export function activitySubmit(data: activitySubmitParams) {
  return request({
    url: '/zkrx-supply-chain/api/v1/wechat/activity/submit',
    method: 'post',
    data
  })
}
