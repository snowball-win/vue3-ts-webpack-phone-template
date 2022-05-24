<template>
  <div :class="$style.guessingLanternRiddlesActivityRulesPage">
    <!-- <div :class="$style.ruleName">
      <p><span>过春节闹元宵</span></p>
    </div>
    <div :class="$style.rulesTitle">
      <p><span style="text-decoration:none;">活动规则</span></p>
    </div> -->
    <div :style="{width: '100vw'}">
      <img :style="{width: '100vw'}" :src="activityRuleImg" alt="">
    </div>
    <div :class="$style.rulecontentWrap">
      <div :class="$style.rulesContent">
        <p :class="$style.ruleTitle"><span>一、活动时间</span></p>
        <p><span>01/31-02/15</span></p>
        <p :class="$style.ruleTitle"><span>二、主办单位</span></p>
        <p><span>即墨古城</span></p>
        <p :class="$style.ruleTitle"><span>三、参与方式</span></p>
        <p><span>1、扫描二维码关注“墨小牛”公众号，或微信搜索“墨小牛”公众号关注；</span></p>
        <p><span>2、活动期间，每天均可参加活动获得奖品；</span></p>
        <p><span>3、中奖规则，如下：</span></p>
        <p><span>（1）、5题答对3或4题，获得二等奖，分享朋友圈，并积30个赞，凭截图至墨小牛商店兑换领取一等奖；</span></p>
        <p><span>（2）、5题答对5题，获得一等奖大奖，可至墨小牛商店兑换领取奖品；</span></p>
        <p><span>4、活动期间，每位用户仅限领取一次奖品；</span></p>
        <p><span>5、活动最终解释权归青岛市即墨区鼎泰德开发建设有限公司所有。</span></p>
      </div>
    </div>
    <!-- 活动进行中 -->
    <!-- <div v-show="activityStatus === '102'" :class="$style.kaishitiaozhanWrap" @click="$router.replace('/answer')">
      <img :class="$style.kaishitiaozhan" :src="kaishitiaozhanJinxingzhong" alt="enter">
    </div> -->
    <!-- <div :class="$style.kaishitiaozhanWrap" @click="$router.replace('/activity')">
      <img :class="$style.kaishitiaozhan" :src="fanhuishouye" alt="enter">
    </div> -->
    <!-- <div v-show="activityStatus === '102'" :class="$style.kaishitiaozhanWrap" @click="$router.replace('/answer')">
      <span>开始挑战</span>
    </div> -->
    <div :style="{textAlign: 'center'}">
      <div :class="$style.kaishitiaozhanWrap" @click="$router.replace('/activity')">
        <span>返回首页</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ActivityModule } from '@/store/modules/activity';
import { Options, Vue } from 'vue-class-component';
import { getUserDetails } from '@/api/index'; // @ is an alias to /src

@Options({
  components: {
  },
})
export default class Home extends Vue {
  private kaishitiaozhanJinxingzhong = require("@/assets/images/guessing-lantern-riddles/kaishitiaozhan2.png")
  private fanhuishouye = require("@/assets/images/guessing-lantern-riddles/fanhuishouye.png")
  private activityRuleImg = require("@/assets/images/guessing-lantern-riddles/activity_rule.png")
  private get activityStatus() {
    return ActivityModule.activityStatus.toString()
  }
  mounted() {
    console.log('lantern-riddles')
    ActivityModule.initShare()
    document.title = ActivityModule.gzhName || ''
  }

  private async getListTest11() {
    await getUserDetails().then((res:any) => {
      console.log('33res', res)
    }).catch((err:any) => {
      console.log('36err', err)
    })
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesActivityRulesPage{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 90px;
  background: url('../../../assets/images/guessing-lantern-riddles/shouyebeijing.png') no-repeat center center;
  background-size: cover;
}
.rulesContent {
  line-height: 2;
  margin: 0 150px;
}
.rulecontentWrap {
  padding-top: 50px;
  padding-bottom: 100px;
  color: rgb(242, 199, 170);
  // font-size: 0.5625rem;
  font-size: 0.6625rem;
}
.ruleTitle {
  // font-size: 25px;
}
.kaishitiaozhanWrap{
  display: inline-block;
  height: 60px;
  top: 600px;
  left: 50%;
  padding: 0 20px;
  text-align: center;
  font-weight: bold;
  margin: 20px auto 0 auto;
  .kaishitiaozhan{
    width: 100%;
    height: 100%;
  }
  border-radius: 10px;
  background: #f8d270;
  color: #333;
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 1rem;
  }
}
</style>