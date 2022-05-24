import Cookies from 'js-cookie'
// key
const snowKey = 'snow'
// get
export const getSnow = () => Cookies.get(snowKey)
// set
export const setSnow = (snow: string) => Cookies.set(snowKey, snow)
// remove
export const removeSnow = () => Cookies.remove(snowKey)
// 2022春节灯谜活动
export const getActivityId = () => Cookies.get('activityId')
export const setActivityId = (activityId: string) => Cookies.set('activityId', activityId)

export const getActivityName = () => Cookies.get('activityName')
export const setActivityName = (activityName: string) => Cookies.set('activityName', activityName)

export const getActivityTimeRange = () => Cookies.get('activityTimeRange')
export const setActivityTimeRange = (activityTimeRange: string) => Cookies.set('activityTimeRange', activityTimeRange)

export const getGzhName = () => Cookies.get('gzhName')
export const setGzhName = (gzhName: string) => Cookies.set('gzhName', gzhName)

export const getTotalPartakeCount = () => Cookies.get('totalPartakeCount')
export const setTotalPartakeCount = (totalPartakeCount: string) => Cookies.set('totalPartakeCount', totalPartakeCount)

export const getUserId = () => Cookies.get('userId')
export const setUserId = (userId: string) => Cookies.set('userId', userId)

export const getActivityStatus = () => Cookies.get('activityStatus')
export const setActivityStatus = (activityStatus: string) => Cookies.set('activityStatus', activityStatus)

export const getActivityOrganizer = () => Cookies.get('activityOrganizer')
export const setActivityOrganizer = (activityOrganizer: string) => Cookies.set('activityOrganizer', activityOrganizer)

export const getPrizeStatus = () => Cookies.get('prizeStatus')
export const setPrizeStatus = (prizeStatus: string) => Cookies.set('prizeStatus', prizeStatus)

export const getWxOpenId = () => Cookies.get('wxOpenId')
export const setWxOpenId = (wxOpenId: string) => Cookies.set('wxOpenId', wxOpenId)

export const getPrizeTitle = () => Cookies.get('prizeTitle')
export const setPrizeTitle = (prizeTitle: string) => Cookies.set('prizeTitle', prizeTitle)

export const getPrizeTips = () => Cookies.get('prizeTips')
export const setPrizeTips = (prizeTips: string) => Cookies.set('prizeTips', prizeTips)

export const getShowShare = () => Cookies.get('showShare')
export const setShowShare = (showShare: string) => Cookies.set('showShare', showShare)

export const getActivitySubject = () => Cookies.get('activitySubject')
export const setActivitySubject = (activitySubject: string) => Cookies.set('activitySubject', activitySubject)