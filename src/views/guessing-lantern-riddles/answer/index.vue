<template>
  <div :class="$style.guessingLanternRiddlesAnswerIndex">
    <!-- 趣味答题 -->
    <div :class="$style.quweidati">
      <img :class="$style.kaishitiaozhan" :src="quweidati" alt="enter">
    </div>
    <answer-riddles @result="getResult" :value="value" :count="num + 1" @status-change="change" v-if="status === 'GOING' && list.length > 0"></answer-riddles>
    <answer-correct :result="result" @status-change="change" v-if="status === 'NEXT'"></answer-correct>
    <AnswerEnd :result="result" @status-change="change" v-if="status === 'END'"></AnswerEnd>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AnswerRiddles from './answer.vue';
import AnswerCorrect from './correct.vue';
import AnswerEnd from './end.vue';
import { ActivityModule} from '@/store/modules/activity'
import { activityStart } from '@/api/index'; // @ is an alias to /src
import { resultType } from './correct.vue'; // @ is an alias to /src
import { valueType } from './answer.vue'; // @ is an alias to /src

@Options({
  components: {
    AnswerRiddles,
    AnswerCorrect,
    AnswerEnd
  },
})
export default class Home extends Vue {
  private quweidati = require("@/assets/images/guessing-lantern-riddles/quweidati.png") // 趣味答题
  // 是否展示答题窗口
  private status: 'GOING' | 'NEXT' | 'END' = 'GOING'
  private num = 0
  private value: valueType | {} = {}
  private list: valueType[] = []
  mounted() {
    this.getQuestion()
    ActivityModule.initShare()
    document.title = ActivityModule.gzhName || ''
  }
  private async getQuestion() {
    const params = {
      userId: ActivityModule.userId,
      activityId: ActivityModule.activityId,
    }
    await activityStart(params).then((res: { code?: string, payload?: unknown }) => {
      if (res.code === '0') {
        this.list = (res.payload || []) as valueType[]
        this.value = this.list[0]
        console.log(this.list)
      }
    }).catch((err) => {
      console.log('36err2', err)
    })
  }
  private async change(val:'GOING' | 'NEXT' | 'END') {
    this.status = val
  }
  private result = {}
  private getResult(val: resultType) {
    const {continueAnswer, userAnswerResult, prizeResult, unPrizeTitle, unPrizeDesc, userPrizeRecord} = val;
    this.result = val
    this.status = 'NEXT'
    if (continueAnswer === 1) {
      this.num ++
      this.value = this.list[this.num]
    }
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesAnswerIndex{
  width: 100vw;
  height: 100vh;
  background: url('../../../assets/images/guessing-lantern-riddles/shouyebeijing.png') no-repeat center center;
  background-size: cover;
  .quweidati{
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 60px;
    img{
      width: 358px;
    }
  }
}
</style>