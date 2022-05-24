import { wechatActivityGetBaseInfo,  wechatActivityGetBaseInfoParams} from '@/api/index'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import wx, {config, isWeixin, getMobile, setHtmlFontSize} from '@/utils/wx'
import { activityShare } from '@/api/index'
import {
  getActivityId,
  setActivityId,
  getActivityName,
  setActivityName,
  getActivityTimeRange,
  setActivityTimeRange,
  getGzhName,
  setGzhName,
  getTotalPartakeCount,
  setTotalPartakeCount,
  getUserId,
  setUserId,
  getActivityStatus,
  setActivityStatus,
  getActivityOrganizer,
  setActivityOrganizer,
  getPrizeStatus,
  setPrizeStatus,
  getWxOpenId,
  setWxOpenId,
  getPrizeTitle,
  setPrizeTitle,
  getPrizeTips,
  setPrizeTips,
  getShowShare,
  setShowShare,
  getActivitySubject,
  setActivitySubject,
} from '@/utils/cookies'

setHtmlFontSize()
export type ActivityKey = keyof ActivityProp

export interface ActivityProp {
  activityId?: string | undefined
  activityName?: string | undefined
  activityStatus?: string | undefined
  activityTimeRange?: string | undefined
  gzhName?: string | ''
  totalPartakeCount?: string | undefined
  userId?: string | undefined
  activityOrganizer?: string | undefined
  prizeStatus?: string | undefined
  wxOpenId?: string | undefined
  prizeTitle?: string | undefined
  prizeTips?: string | undefined
  shareUrls?: string[]
  showShare?: string | undefined
  activitySubject?: string | undefined
}
@Module({ dynamic: true, store, name: 'settings', namespaced: true })
class Activity extends VuexModule implements ActivityProp {
    public activityId = getActivityId() || '' // 活动id
    public activityName = getActivityName() || '' // 活动名称
    public activityStatus = getActivityStatus() || '' // 活动状态 101-未开始；102-进行中；103-已结束；104-用户未绑定手机号；105-活动用户已中
    public activityTimeRange = getActivityTimeRange() || '' // 活动起止日期
    public gzhName = getGzhName() || '' // 公众号名称
    public totalPartakeCount = getTotalPartakeCount() || '' // 活动访问数量
    public userId = getUserId() || '' // 用户id
    public activityOrganizer = getActivityOrganizer() || '' // 主办单位
    public prizeStatus = getPrizeStatus() || '' // 领奖状态 1 已领奖 2 待领奖
    public wxOpenId = getWxOpenId() || '' // wxOpenId
    public prizeTitle = getPrizeTitle() || '' // 中奖提示
    public prizeTips = getPrizeTips() || '' // 中奖提示
    public shareUrls = [] // 中奖提示
    public showShare = getShowShare() || '' // 首页是否展示分享
    public activitySubject = getActivitySubject() || '' // 活动主题

    @Action
    public async getWechatActivityGetBaseInfo(params: wechatActivityGetBaseInfoParams): Promise<void> {
      await wechatActivityGetBaseInfo(params).then((res: any) => {
        console.log('16res', res)
        this.setLanternRiddlesBaseInfo(res.payload)
      }).catch((err: any) => {
        console.log('18err', err)
      })
    }
    @Action
    public getUidAndAcitivityId(data: {
      activityId: string
      wxOpenId: string
    }) {
      console.log(data, 'getUidAndAcitivityId')
      this.setLanternRiddlesBaseInfo(data)
      setWxOpenId(data.wxOpenId)
    }
    /**
     * @description sdk分享
     */
    @Action
    public async initShare() {
      if (!isWeixin()) {
        return
      }
      // console.log(getMobile())
      if (!this.userId || !this.activityId) {
        return
      }
      const params = {
        userId: this.userId,
        activityId: this.activityId,
        url: encodeURIComponent(location.href.split('#')[0])
      }
      if (getMobile() === 'iPhone') {
        // alert('苹果终端设备')
        // weixin给苹果的bug
        params.url = decodeURIComponent(wx.signurl())
      }
      if (this.shareUrls.includes(params.url as never)) {
        return
      }
      this.shareUrls.push(params.url as never)
      activityShare(params).then((res: any) => {
        if (res.code === '0') {
          const jsApiList: string[] = [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'updateAppMessageShareData',
            'updateTimelineShareData'
          ]
          const {appId, timestamp, nonceStr, signature, shareTitle, shareDesc, shareImageUrl, shareLink} = res.payload
          config({debug: false, appId, timestamp, nonceStr, signature, jsApiList })
          wx.ready(() => { // 需在用户可能点击分享按钮前就先调用
            wx.updateTimelineShareData({
              title: shareTitle, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImageUrl, // 分享图标
              success() {
                // 用户点击了分享后执行的回调函数
              }
            })
            wx.updateAppMessageShareData({
              title: shareTitle, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImageUrl, // 分享图标
              desc: shareDesc, // 分享描述
              success() {
                // 用户点击了分享后执行的回调函数
              }
            })
            wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImageUrl, // 分享图标
              desc: shareDesc, // 分享描述
              success() {
                // 用户点击了分享后执行的回调函数
              }
            })
            wx.onMenuShareTimeline({
              title: shareTitle, // 分享标题
              link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareImageUrl, // 分享图标
              success() {
                // 用户点击了分享后执行的回调函数
              }
            })
          })
        }
      })
    }
    @Mutation
    private setLanternRiddlesBaseInfo(data: ActivityProp) {
      Object.assign<ActivityProp, ActivityProp>(this, data)
      setActivityId(String(data.activityId))
      setActivityName(String(data.activityName))
      setActivityTimeRange(String(data.activityTimeRange))
      setGzhName(String(data.gzhName))
      setTotalPartakeCount(String(data.totalPartakeCount))
      setUserId(String(data.userId))
      setActivityStatus(String(data.activityStatus))
      setActivityOrganizer(String(data.activityOrganizer))
      setPrizeStatus(String(data.prizeStatus))
      setPrizeTitle(String(data.prizeTitle))
      setPrizeTips(String(data.prizeTips))
      setShowShare(String(data.showShare))
      setActivitySubject(String(data.activitySubject))
    }
}
export const ActivityModule = getModule(Activity)
