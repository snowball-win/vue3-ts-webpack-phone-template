<template>
  <div :class="$style.guessingLanternRiddlesHistoricalRecordsPage">
    <div :style="{width: '100vw'}">
      <img :style="{width: '100vw'}" :src="activityRecordsPng" alt="">
    </div>
    <div :class="$style.wrap">
      <div :class="$style.tip">今天已有{{alreadyPrizeCount}}人参与领奖</div>
      <div :class="$style.record">
        <div v-for="(item, index) in list" :key="index" :class="$style.recordItem">
          <span :class="$style.time">
            {{item.answerTime}}
          </span>
          <span :class="$style.answerResult">
            {{item.answerResult}}
          </span>
        </div>
      </div>
    </div>
    <!-- <div :class="$style.kaishitiaozhanWrap" @click="$router.replace('/activity')">
      <img :class="$style.kaishitiaozhan" :src="fanhuishouye" alt="enter">
    </div> -->
    <div :style="{textAlign: 'center'}">
      <div :class="$style.kaishitiaozhanWrap" @click="$router.replace('/activity')">
        <span>返回首页</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { activityAnswerRecord } from '@/api/index'; // @ is an alias to /src
import { ActivityModule } from '@/store/modules/activity'; // @ is an alias to /src

@Options({
  components: {
  },
})
export default class Home extends Vue {
  mounted() {
    this.getList()
    ActivityModule.initShare()
    document.title = ActivityModule.gzhName || ''
  }
  private alreadyPrizeCount = 0
  private activityRecordsPng = require("@/assets/images/guessing-lantern-riddles/activity_records.png")
  private list = []
  private async getList() {
    const params = {
      userId: ActivityModule.userId,
      activityId: ActivityModule.activityId,
    }
    await activityAnswerRecord(params).then((res:any) => {
      if (res.code === '0') {
        const answerRecordList = res.payload && res.payload.answerRecordList
        if (answerRecordList && answerRecordList.length > 0) {
          answerRecordList.forEach((item:any) => {
            item.answerTime = String(item.answerTime)
          })
          this.list = answerRecordList
        }
        this.alreadyPrizeCount = res.payload && res.payload.alreadyPrizeCount
      }
      console.log('33res3', res)
    }).catch((err:any) => {
      console.log('36err4', err)
    })
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesHistoricalRecordsPage{
  width: 100vw;
  height: 100vh;
  padding-top: 90px;
  box-sizing: border-box;
  background: url('../../../assets/images/guessing-lantern-riddles/shouyebeijing.png') no-repeat center center;
  background-size: cover;
}
.kaishitiaozhanWrap{
  display: inline-block;
  left: 50%;
  text-align: center;
  font-weight: bold;
  margin: 50px auto 0 auto;
  padding: 0 20px;
  border-radius: 10px;
  background: #f8d270;
  color: #333;
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 32px;
  }
}
.wrap {
  padding: 110px 150px 0 150px;
  line-height: 2;
}
.tip {
  font-size: 32px;
  font-weight: 900;
  color: #fff2d9;
  text-align: center;
}
.record {
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
  line-height: 3;
  height: 600px;
  overflow: scroll;
}
.recordItem {
  color: #fff2d9;
}
.time {
  padding-right: 10px;
}
.answerResult {

}
</style>