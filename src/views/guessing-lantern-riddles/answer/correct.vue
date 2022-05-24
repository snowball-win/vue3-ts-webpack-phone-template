<template>
  <div :class="$style.guessingLanternRiddlesAnswer">
    <div :class="$style.bgImg">
      <!-- 答案 -->
      <div :class="$style.correctAnswer" v-if="result.userAnswerResult">
        <span>
          {{result.userAnswerResult.correctAnswer || ''}}
        </span>
      </div>
      <div :class="$style.confirmImgWrap">
        <!-- 答题结果 -->
        <div :class="$style.tip">
          <span>{{resultTips}}</span>
        </div>
        <!-- 描述 -->
        <div :class="$style.desc">{{desc}}</div>
        <!-- 继续答题 -->
        <div :class="$style.next" v-if="continueAnswer === 1">
          <span @click="$emit('status-change', 'GOING')">下一题</span>
        </div>
        <!-- 返回首页 -->
        <div :class="$style.next" v-if="continueAnswer === 0" @click="$router.replace('/activity')">
          <span>返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ActivityModule } from '@/store/modules/activity'
import { Prop, Component } from 'vue-property-decorator';

export type resultType = {
  continueAnswer?: number
  userAnswerResult?: {
    questionId?: number
    answerResult?: number
    resultDesc?: string
    correctAnswer?: string
  }
  prizeResult?: number
  unPrizeTitle?: string
  unPrizeDesc?: string
  userPrizeRecord?: {
    answerCount?: number
    prizeStatus?: number
    prizeTips?: string
    prizeTitle?: string
    showShare?: number
  }
}
@Options({
  components: {
  },
})
export default class Home extends Vue {
  @Prop({ required: true }) private result!: resultType
  private correctImg = require("@/assets/images/guessing-lantern-riddles/daduile2.png")
  private buzhengqueImg = require("@/assets/images/guessing-lantern-riddles/buzhengque2.png")
  private fanhuishouyeImg = require("@/assets/images/guessing-lantern-riddles/fanhuishouye.png")
  private get status() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      return userAnswerResult && userAnswerResult.answerResult
    }
  }
  private get prizeResult() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      return prizeResult
    }
  }
  private get continueAnswer() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      return continueAnswer
    }
  }
  private get resultTips() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      if (continueAnswer === 1) {
        return userAnswerResult && userAnswerResult.resultDesc
      }
      if (continueAnswer === 0 && prizeResult === 0) {
        return unPrizeTitle
      }
      if (continueAnswer === 0 && prizeResult === 1) {
        return userPrizeRecord && userPrizeRecord.prizeTitle
      }
    }
  }
  private get desc() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      if (continueAnswer === 1) {
        return ''
      }
      if (continueAnswer === 0 && prizeResult === 0) {
        return unPrizeDesc
      }
      if (continueAnswer === 0 && prizeResult === 1) {
        return '待领奖'
      }
    }
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesAnswer{
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  .bgImg {
    width: 700px;
    height: 797px;
    background: url('../../../assets/images/guessing-lantern-riddles/zhengquedaan.png') no-repeat center center;
    background-size: cover;
    position: relative;
    position: fixed;
    top: 140px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    .correctAnswer{
      position: absolute;
      font-family:Comic Sans MS;
      vertical-align: center;
      bottom: 90px;
      text-align: center;
      // text-shadow:5px 5px 5px gray;
      top: 330px;
      left: 260px;
      right: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.4375rem;
    }
    .confirmImgWrap{
      width: 100%;
      position: absolute;
      margin: 0 auto;
      top: 100%;
      left: 0;
      right: 0;
      text-align: center;
      .correctImg{
        width: 380px;
      }
      .buzhengqueImg{
        width: 280px;
      }
    }
    .desc {
      margin: 20px auto 0 auto;
      padding: 0 20px;
      color: #fff;
      font-weight: bold;
      font-size: 1.25rem;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
    }
    .next {
      margin: 20px auto 0 auto;
      display: inline-block;
      padding: 0 20px;
      height: 60px;
      color: #f0ff00;
      font-weight: bold;
      text-align: center;
      border-radius: 10px;
      background: #f8d270;
      color: #333;
      font-size: 1rem;
      span {
        line-height: 60px;
      }
    }
    .tip {
      margin: 20px auto 0 auto;
      display: inline-block;
      height: 80px;
      padding: 0 30px;
      color: #f0ff00;
      text-align: center;
      border-radius: 30px;
      background: #f8d270;
      color: #d62423;
      font-weight: bold;
      font-size: 1.25rem;
      span {
        line-height: 80px;
      }
    }
  }
}
</style>