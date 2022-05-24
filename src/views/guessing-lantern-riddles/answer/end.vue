<template>
  <div :class="$style.guessingLanternRiddlesAnswer">
    <div :class="$style.bgImg" v-if="result">
      <div :class="$style.correctAnswer">{{(result.userAnswerResult && result.userAnswerResult.correctAnswer) || ''}}</div>
      <div :class="$style.confirmImgWrap">
        <img v-if="status === 1" :class="$style.dailingjiang2Img" :src="dailingjiang2Img" alt="enter">
        <img v-if="status === 0" :class="$style.buzhengqueImg" :src="buzhengqueImg" alt="enter">
        <div :class="$style.desc">{{(result.userPrizeRecord && result.userPrizeRecord.prizeTips) || ''}}</div>
        <div :class="$style.next" v-if="(result && result.userPrizeRecord && result.userPrizeRecord.showShare)">
          <span @click="shareShow = true">分享</span>
        </div>
      </div>
    </div>
    <van-overlay :show="shareShow" @click="shareShow = false">
      <img :class="$style.share" :src="guideImg" alt="">
    </van-overlay>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Component } from 'vue-property-decorator';

@Options({
  components: {
  },
})
export default class Home extends Vue {
  @Prop({ required: true }) private result!: any
  private dailingjiang2Img = require("@/assets/images/guessing-lantern-riddles/dailingjiang2.png")
  private buzhengqueImg = require("@/assets/images/guessing-lantern-riddles/buzhengque2.png")
  private fanhuishouyeImg = require("@/assets/images/guessing-lantern-riddles/fanhuishouye.png")
  private guideImg = require("@/assets/images/guessing-lantern-riddles/guide.png")
  private shareShow = false
  private get status() {
    if (this.result) {
      const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = this.result;
      return prizeResult
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
    width: 590px;
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
      top: 400px;
      left: 250px;
      right: 150px;
      font-size: 50px;
    }
    .confirmImgWrap{
      width: 400px;
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
      margin-top: 20px;
      color: white;
      font-size: 37px;
      text-align: center;
    }
    .next {
      margin: 20px auto 0 auto;
      width: 180px;
      color: #f0ff00;
      text-align: center;
      border-radius: 5px;
      background: #c12a2e;
      span {
        line-height: 64px;
      }
    }
  }
  .share {
    position: fixed;
    right: 18px;
    top: 5px;
    width: 260px!important;
    height: 180px!important
  }
}
</style>