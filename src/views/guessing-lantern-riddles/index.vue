<template>
  <div :class="$style.guessingLanternRiddlesHomePage">
    <!-- 活动主题 -->
    <div :class="$style.gzhName">
      {{activitySubject}}
    </div>
    <!-- 趣味答题 -->
    <div :class="$style.quweidati">
      <img :class="$style.kaishitiaozhan" :src="quweidati" alt="enter">
    </div>
    <!-- 活动时间 -->
    <div :class="$style.activityTimeRangeS">
      <span>活动时间： {{ activityTimeRange }}</span>
    </div>
    <!-- 主办单位 -->
    <div :class="$style.activityOrganizer">
      <span>主办单位： {{ activityOrganizer }}</span>
    </div>
    <!-- 101-未开始；102-进行中；103-已结束；104-用户未绑定手机号；105-活动用户已中奖 106-当天已无答题机会 -->
    <!-- 活动未开始 -->
    <div v-show="activityStatus === '101'" :class="$style.activityNotStarted">
      <img :class="$style.activityNotStartedImg" :src="kaishitiaozhanWeikaishi" alt="enter">
      <div :class="$style.activityNotStartedTips">活动还未开始</div>
    </div>
    <!-- 活动进行中 -->
    <div
      v-show="activityStatus === '102' || activityStatus === '105' || activityStatus === '106'" :class="$style.activityInProgress">
      <router-link replace to="/answer">
        <img :class="$style.activityInProgressImg" :src="kaishitiaozhanJinxingzhong" alt="enter">
      </router-link>
    </div>
     <!-- 参与数量 -->
    <div v-show="activityStatus === '102'" :class="$style.totalPartakeCount">
      已有 {{ totalPartakeCount }} 人参与活动
    </div>
    <!-- 活动已结束 -->
    <div v-show="activityStatus === '103'" :class="$style.activeEndWrap">
      <img :class="$style.activeEndImg" :src="kaishitiaozhanWeikaishi" alt="enter">
      <div :class="$style.activeEndTips">活动已结束</div>
    </div>
    <!-- 状态104用户未绑定手机号 -->
    <phone-code v-show="activityStatus === '104'" @bindPhoneSuccess="bindPhoneSuccess"></phone-code>
    <!-- 活动中奖待领将 prizeStatus 0 -->
    <!-- <div>{{activityStatus}}</div>
    <div>{{prizeStatus}}</div> -->
    <div v-show="activityStatus === '105'&&prizeStatus&&prizeStatus==='0'" :class="$style.dailingjiang">
      <div :class="$style.dailingjiangContent">
        <div :class="$style.prizeTitle" v-html="prizeTitle"></div>
        <div :class="$style.prizeStatusTips">待领奖</div>
        <div :class="$style.prizeTips" v-html="prizeTips"></div>
        <div :class="$style.showShare" v-show="showShare === '1'" @click="toShare">一键分享</div>
        <div :class="$style.toHistoricalRecords" @click="toHistoricalRecordsRules">历史记录</div>
      </div>
      <div :class="$style.guideToShare" v-show="showGuideToShare" @click="hideGuideToShare">
        <img :src="guide" alt="guide">
      </div>
    </div>
    <!-- 活动已领奖 prizeStatus 1 -->
    <div v-show="activityStatus === '105'&&prizeStatus&&prizeStatus==='1'" :class="$style.yilingjiang">
      <div :class="$style.yilingjiangContent">
        <div :class="$style.prizeTitle" v-html="prizeTitle"></div>
        <div :class="$style.prizeStatusTips">已领奖</div>
        <div :class="$style.prizeTips" v-html="prizeTips"></div>
        <div :class="$style.showShare" v-show="showShare === '1'" @click="toShare">一键分享</div>
        <div :class="$style.toHistoricalRecords" @click="toHistoricalRecordsRules">历史记录</div>
      </div>
      <div :class="$style.guideToShare" v-show="showGuideToShare" @click="hideGuideToShare">
        <img :src="guide" alt="guide">
      </div>
    </div>
    <!-- 当天无答题机会 -->
    <div v-show="activityStatus === '106'" :class="$style.noChanceToAnswer">
      <div :class="$style.noChanceToAnswerTltle">{{prizeTitle || '当天已无答题机会'}}</div>
      <div :class="$style.noChanceToAnswerTips" v-html="prizeTips"></div>
      <div :class="$style.toHistoricalRecords" @click="toHistoricalRecordsRules">历史记录</div>
    </div>
    <!-- 活动规则 -->
    <div :class="$style.huodongguize">
      <router-link replace to="/activityRules">
        <img :class="$style.huodongguize" :src="huodongguize" alt="历史记录">
      </router-link>
    </div>
    <!-- 历史记录 -->
    <div :class="$style.lishijilu">
      <router-link replace to="/historicalRecords">
        <img :class="$style.lishijilu" :src="lishijilu" alt="历史记录">
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { ActivityModule } from '@/store/modules/activity';
import { Options, Vue } from 'vue-class-component';
import phoneCode from './components/get-phone-number/index.vue';
import { routerKey, useRoute, useRouter, } from 'vue-router'

@Options({
  components: {
    phoneCode
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.redirect) {
      location.href =  decodeURIComponent(String(to.query.redirect))
    }
    if (to.query.act && to.query.uid) {
      ActivityModule.getUidAndAcitivityId({
        activityId: String(to.query.act),
        wxOpenId: String(to.query.uid),
      })
    }
    next()
  }
})
export default class Home extends Vue {
  private infoParams = {
    activityId: ActivityModule.activityId || '',
    wxOpenId: ActivityModule.wxOpenId || ''
  }
  private router = useRouter()
  created() {
    this.router.replace({})
  }
  mounted() {
    // store调用基础信息
    this.infoParams.activityId = ActivityModule.activityId || ''
    this.infoParams.wxOpenId = ActivityModule.wxOpenId || ''
    ActivityModule.getWechatActivityGetBaseInfo(this.infoParams)
    .then(()=>{
      alert(this.route && JSON.stringify(this.route.query))
      if (this.route && this.route.query && this.route.query.act) {
        location.reload()
        return
      }
      this.getBaseInfo()
      ActivityModule.initShare()
    })
  }

  private gzhName = '' // 公众号名称
  private prizeStatus:any = '' // 领奖状态
  private totalPartakeCount = '0' // 参与数量
  private activityStatus = '0' // 活动状态
  private activityTimeRange = '' // 活动时间
  private activityOrganizer = '' // 主办单位
  private prizeTitle = '' // 中奖提示
  private prizeTips = '' // 中奖提示
  private showShare = '' // 是否展示分享
  private activitySubject = '' // 活动主题
  private showGuideToShare = false // 是否展示分享引导
  private kaishitiaozhanWeikaishi = require("@/assets/images/guessing-lantern-riddles/kaishitiaozhan.png") // 活动未开始
  private kaishitiaozhanJinxingzhong = require("@/assets/images/guessing-lantern-riddles/kaishitiaozhan2.png") // 活动进行中
  private lishijilu = require("@/assets/images/guessing-lantern-riddles/lishijilu-rukou.png") // 历史记录
  private huodongguize = require("@/assets/images/guessing-lantern-riddles/huodongguize-rukou.png") // 活动规则
  private quweidati = require("@/assets/images/guessing-lantern-riddles/quweidati2.png") // 趣味答题
  private dailingjiang = require("@/assets/images/guessing-lantern-riddles/dailingjiang2.png") // 待领将
  private yilingjiang = require("@/assets/images/guessing-lantern-riddles/yilingjiang.png") // 待领将
  private guide = require("@/assets/images/guessing-lantern-riddles/guide.png") // 待领将
  private route = useRoute()
  private async getBaseInfo() {
    console.log('22store', ActivityModule)
    // 强化页面title展示
    document.title = ActivityModule.gzhName || ''
    this.totalPartakeCount = ActivityModule.totalPartakeCount
    // 101-未开始；102-进行中；103-已结束；104-用户未绑定手机号；105-活动用户已中奖；106-今天已无答题机会
    this.activityStatus = ActivityModule.activityStatus&&ActivityModule.activityStatus.toString()
    // this.activityStatus = '101'
    this.activityTimeRange = ActivityModule.activityTimeRange
    this.activityOrganizer = ActivityModule.activityOrganizer
    this.prizeStatus = ActivityModule.prizeStatus&&ActivityModule.prizeStatus.toString()
    this.prizeStatus = this.prizeStatus === 0 ? '0' : this.prizeStatus
    // this.prizeStatus = '1'
    this.prizeTitle = ActivityModule.prizeTitle
    this.prizeTips = ActivityModule.prizeTips
    this.gzhName = ActivityModule.gzhName
    this.showShare = ActivityModule.showShare&&ActivityModule.showShare.toString()
    // this.showShare = '1'
    this.activitySubject = ActivityModule.activitySubject&&ActivityModule.activitySubject.toString()
  }
  // 绑定手机成功
  private bindPhoneSuccess() {
    ActivityModule.getWechatActivityGetBaseInfo(this.infoParams)
    .then(()=>{
      this.getBaseInfo()
    })
  }
  // 去答题页面
  private toAnswer() {
    this.$router.replace(
      {
        path: 'answer'
      }
    )
  }
  // 去活动规则页面
  private toActivityRules() {
    this.$router.replace(
      {
        path: 'activityRules'
      }
    )
  }
  // 去历史记录页面
  private toHistoricalRecordsRules() {
    this.$router.replace(
      {
        path: 'historicalRecords'
      }
    )
  }
  // 引导分享
  private toShare() {
    this.showGuideToShare = true
  }
  // 关闭引导分享
  private hideGuideToShare() {
    this.showGuideToShare = false
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesHomePage{
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/guessing-lantern-riddles/shouyebeijing.png') no-repeat center center;
  background-size: cover;
  position: relative;
  .gzhName{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 60px;
    font-size: 1.25rem;
    letter-spacing: 10px;
  }
  .quweidati{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 160px;
    img{
      width: 358px;
    }
  }
  .activityNotStarted{
    width: 250px;
    height: 80px;
    position: absolute;
    top: 600px;
    left: 50%;
    margin-left: -125px;
    .activityNotStartedImg{
      width: 100%;
      height: 100%;
      margin-bottom: 40px;
    }
    .activityNotStartedTips{
      color: #fff;
      text-align: center;
      font-size: 1.09375rem;
    }
  }
  .activityInProgress{
    width: 250px;
    height: 80px;
    position: absolute;
    top: 600px;
    left: 50%;
    margin-left: -125px;
    cursor:pointer;
    z-index: 999;
    .activityInProgressImg{
      width: 100%;
      height: 100%;
      margin-bottom: 40px;
      cursor:pointer
    }
    img{
      width: 100%;
    }
  }
  .activeEndWrap{
    width: 300px;
    height: 80px;
    position: absolute;
    top: 600px;
    left: 50%;
    margin-left: -150px;
    .activeEndImg{
      width: 250px;
      height: 80px;
      margin: 0 auto;
      display: block;
      margin-bottom: 40px;
    }
    .activeEndTips{
      color: #fff;
      text-align: center;
      font-size: 1.09375rem;
    }
  }
  .noChanceToAnswer{
    width: 100vw;
    height: 100vh;
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 1000;
    background: rgba($color: #000000, $alpha: 0.85);
    .noChanceToAnswerTltle{
      width: 500px;
      text-align: center;
      display: block;
      font-size: 1.15625rem;
      position: absolute;
      top:500px;
      left: 50%;
      color: #ff0000;
      margin-left: -250px;
      min-height: 85px;
      line-height: 80px;
      background: url('../../assets/images/guessing-lantern-riddles/titlebackground.png') no-repeat;
      background-size: 100% 100%;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toHistoricalRecords{
      width: fit-content;
      height: 60px;
      line-height: 60px;
      // font-size: 37px;
      font-size: 1rem;
      border-radius: 10px;
      background: #f8d270;
      // background: url('../../assets/images/guessing-lantern-riddles/startbg.png') no-repeat;
      background-size: 100% 100%;
      color: #333;
      font-weight: bold;
      // border-radius: 40px;
      margin-left: -125px;
      position: absolute;
      padding: 0 20px;
      // top:630px;
      top:680px;
      margin: 0 auto;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
    }
    .noChanceToAnswerTips{
      width: 500px;
      text-align: center;
      color: #fff;
      text-align: center;
      font-size: 0.9375rem;
      position: absolute;
      // top:740px;
      top:605px;
      left: 50%;
      margin-left: -250px;
      line-height: 50px;
    }
  }
  .activityTimeRangeS{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 470px;
    // font-size: 37px;
    font-size: 1.15625rem;
    span{
      display: inline-block;
      width: 450px;
      text-align: left;
    }
  }
  .activityOrganizer{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 525px;
    font-size: 1.15625rem;
    span{
      display: inline-block;
      width: 450px;
      text-align: left;
    }
  }
  .totalPartakeCount{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 720px;
    font-size: 1.15625rem;
  }
  .dailingjiang{
    width: 100vw;
    height: 100vh;
    color: #fff;
    text-align: center;
    position: absolute;
    z-index: 1000;
    background: rgba($color: #000000, $alpha: 0.85);
    .dailingjiangContent{
      width: 530px;
      margin: 0 auto;
      margin-top: 40%;
      .prizeTitle{
        height: 85px;
        line-height: 80px;
        font-size: 1.15625rem;
        background: url('../../assets/images/guessing-lantern-riddles/titlebackground.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #ff0000;
        font-weight: bold;
      }
      .prizeStatusTips{
        width: 100%;
        font-size: 0.9375rem;
        margin-bottom: 20px;
      }
      .prizeTips{
        line-height: 50px;
        font-size: 0.75rem;
        margin-bottom: 0.9375rem;
        text-align: left;
      }
      .showShare{
        // width: 220px;
        width: fit-content;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        font-size: 1rem;
        border-radius: 10px;
        background: #f8d270;
        // font-size: 1.15625rem;
        // background: url('../../assets/images/guessing-lantern-riddles/startbg.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #333;
        font-weight: bold;
        // border-radius: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
      .toHistoricalRecords{
        // width: 220px;
        width: fit-content;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        font-size: 1rem;
        border-radius: 10px;
        background: #f8d270;
        // font-size: 1.15625rem;
        // background: url('../../assets/images/guessing-lantern-riddles/startbg.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #333;
        font-weight: bold;
        // border-radius: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
    }
    .guideToShare{
      position: absolute;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1001;
      background: rgba($color: #000000, $alpha: 0.85);
      img{
        width: 50vw;
        float: right;
      }
    }
  }
  .yilingjiang{
    width: 100vw;
    height: 100vh;
    color: #fff;
    text-align: center;
    position: absolute;
    z-index: 1000;
    background: rgba($color: #000000, $alpha: 0.85);
    padding-top: 55%;
    .yilingjiangContent{
      width: 530px;
      margin: 0 auto;
      .prizeTitle{
        height: 85px;
        line-height: 80px;
        font-size: 1.15625rem;
        background: url('../../assets/images/guessing-lantern-riddles/titlebackground.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #ff0000;
        font-weight: bold;
      }
      .prizeStatusTips{
        width: 100%;
        font-size: 0.9375rem;
        margin-bottom: 20px;
      }
      .prizeTips{
        line-height: 50px;
        font-size: 0.75rem;
        margin-bottom: 30px;
        text-align: left;
      }
      .showShare{
        width: fit-content;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        font-size: 1rem;
        border-radius: 10px;
        background: #f8d270;
        // font-size: 1.15625rem;
        // background: url('../../assets/images/guessing-lantern-riddles/startbg.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #333;
        font-weight: bold;
        // border-radius: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
      .toHistoricalRecords{
        width: fit-content;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        font-size: 1rem;
        border-radius: 10px;
        background: #f8d270;
        // font-size: 1.15625rem;
        // background: url('../../assets/images/guessing-lantern-riddles/startbg.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
        color: #333;
        font-weight: bold;
        // border-radius: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
    }
    .guideToShare{
      position: absolute;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1001;
      background: rgba($color: #000000, $alpha: 0.85);
      img{
        width: 50vw;
        float: right;
      }
    }
  }
  .huodongguize{
    width: 50px;
    position: absolute;
    top: 100px;
    right: 0px;
    img{
      width: 100%;
    }
  }
  .lishijilu{
    width: 50px;
    position: absolute;
    top: 200px;
    right: 0px;
    img{
      width: 100%;
    }
  }
}
</style>