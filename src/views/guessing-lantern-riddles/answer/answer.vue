<template>
  <div :class="$style.guessingLanternRiddlesAnswer">
    <div :class="{[$style.bgImg]: true}">
      <div :class="$style.leftTop">
        {{count}}/5
      </div>
      <div :class="$style.content">
        <p v-for="(item, index) in contentList" :key="index">
          <span v-if="index < contentList.length - 1">
            {{item + '，'}}
          </span>
          <span v-else>
            {{item}}
          </span>
        </p>
      </div>
      <div :class="$style.tip">
        {{tipContent}}
      </div>
      <!-- <div :class="$style.answer">
        <span>
          <input v-model="answerValue" type="text">
        </span>
      </div> -->
      <div :class="$style.answer">
        <van-form :class="$style.form">
          <van-field
            :class="$style.phone"
            :style="{padding: '5px'}"
            v-model="answerValue"
            name="请输入答案"
            placeholder="请输入答案"
            @input="inputPhoneNoHandler"
            :rules="[{validator: answerValidator, message: '请输入'}, {}]"
          />
        </van-form>
      </div>
      <div :class="$style.confirmImgWrap" @click="confirmAnswer">
        <img :class="$style.confirmImg" :src="confirmImg" alt="enter">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Component } from 'vue-property-decorator';
import { activitySubmit } from '@/api/index'; // @ is an alias to /src
import { ActivityModule} from '@/store/modules/activity'
import { Notify } from 'vant'

export type valueType = {questionName: string, questionId :string, questionTips: string}
@Options({})
export default class Home extends Vue {
  @Prop({ required: true }) private value!: valueType
  @Prop({ required: true }) private count!: number
  private confirmImg = require("@/assets/images/guessing-lantern-riddles/queren.png")
  private answerValue = ''
  private viewport = true
  private get contentList() {
    if (this.value) {
      return String(this.value.questionName + '。').split('，')
    }
  }
  private get questionId() {
    if (this.value) {
      return this.value.questionId
    }
  }
  private get tipContent() {
    if (this.value) {
      return this.value.questionTips
    }
  }
  private answerValidator(val:string) {
    return Boolean(val.trim())
  }
  private async confirmAnswer() {
    const submitAnswer = String(this.answerValue).trim()
    if (!submitAnswer) {
      // Notify({ type: 'warning', message: '请输入答案' })
      return;
    }
    const params = {
      userId: ActivityModule.userId,
      activityId: ActivityModule.activityId,
      questionId: String(this.questionId),
      submitAnswer
    }
    await activitySubmit(params).then((res:any) => {
      if (res.code === '0') {
        this.$emit('result', res.payload)
      }
      console.log('22res', res)
    }).catch((err:any) => {
      console.log('24err', err)
    })
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesAnswer{
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  .bgImg{
    width: 590px;
    height: 770px;
    background: url('../../../assets/images/guessing-lantern-riddles/caidengmi.png') no-repeat center center;
    background-size: cover;
    position: relative;
    position: fixed;
    top: 220px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    .confirmImgWrap{
      width: 158px;
      height: 53px;
      position: absolute;
      left: 220px;
      bottom: 130px;
      .confirmImg{
        width: 100%;
        height: 100%;
      }
    }
  }
  .leftTop {
    position: absolute;
    right: 80px;
    top: 140px;
    font-size: 0.6875rem;
    color: #fcfe64;
  }
  .content {
    margin: 180px auto 0 auto;
    max-width: 450px;
    font-size: 0.9375rem;
    color: #fcfe64;
    line-height: 2;
    text-align: center;
    letter-spacing: 5px;
  }
  .tip {
    margin-top: 20px;
    font-size: 0.6875rem;
    color: #fcfe64;
    line-height: 2;
    text-align: center;
    letter-spacing: 5px;
  }
  .answer {
    background: #FFFFFF;
    margin: 10px auto 0 auto;
    color: #000;
    width: 380px;
    // height: 55px;
    text-align: center;
    span > input {
      display: inline-block;
      width: 350px;
      height: 40px;
      line-height: 55px;
      font-size: 0.6875rem;
    }
  }
}
</style>