<template>
  <div :class="$style.guessingLanternRiddlesPhoneCode">
    <div>
      <van-form :class="$style.content">
        <van-field
          :class="$style.phone"
          v-model="phoneNo"
          name="请输入手机号"
          placeholder="请输入手机号"
          @input="inputPhoneNoHandler"
          :rules="[{validator: asyncValidator, message: '请输入正确手机号'}]"
        />
        
        <div :class="$style.codeWrap">
          <van-field
            :class="$style.code"
            v-model="verifyCode"
            type="text"
            name="验证码"
            pattern="\d{4}"
            maxlength=4
            placeholder="验证码"
            autocomplete="one-time-code"
            :rules="[{required: true, message: '请填写验证码'}]"
          />
          <div :class="$style.getCode" :aria-disabled="captchaCountdown<60" @click="sendSmsCode">
            <span>发送验证码 </span>
            <span v-if="captchaCountdown<60"> {{ captchaCountdown + 's'}}</span>
          </div>
        </div>
        <div :class="$style.confirmImgWrap" @click="validateSmsCode">
          <img :class="$style.confirmImg" :src="confirmImg" alt="enter" @click="validateSmsCode">
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Form, Toast } from 'vant'
import { Options, Vue } from 'vue-class-component';
import { 
  smsManagerSendSmsCode,
  activityBindPhoneNumber
} from '@/api/index';
import { ActivityModule } from '@/store/modules/activity';

@Options({
  components: {
    Form
  },
})
export default class Home extends Vue {
  mounted() {
    console.log('lantern-riddles')
  }
  private phoneNo = ''
  private verifyCode = ''
  private confirmImg = require("@/assets/images/guessing-lantern-riddles/queren.png")
  // 校验手机号
  private asyncValidator(val:any) {
    return new Promise((resolve) => {
      Toast.loading('验证中...');
      setTimeout(() => {
        Toast.clear();
        resolve(/^1[3456789]\d{9}$/.test(val));
      }, 500);
    });
  }
  private inputPhoneNoHandler(val:any) {
    console.log(val.srcElement._value.length)
    if(val.srcElement._value.length > 11) {
      Toast.fail('手机号超出11位');
    }
  }
  // 倒计时
  private captchaCountdown = 60;
  // 发送验证码
  private async sendSmsCode() {
    // 60s发送一次
    if (this.captchaCountdown < 60) {
      Toast.fail('正在获取验证码，请稍后再试')
      return false
    }
    // 校验手机号
    if(!/^1[3456789]\d{9}$/.test(this.phoneNo)){
      Toast.fail('请输入正确手机号');
      return false
    }
    let params = {
      phoneNo: this.phoneNo,
      operateType: 5
    }
    await smsManagerSendSmsCode(params).then((res:any) => {
      console.log('54res1', res)
      const timer = setInterval(() => {
        this.captchaCountdown -= 1
        if (this.captchaCountdown === 1) {
          this.captchaCountdown = 60
          clearInterval(timer)
        }
      }, 1000)
    }).catch((err:any) => {
      console.log('56err2', err)
    })
  }
  // 提交
  private shake = true
  private async validateSmsCode() {
    if(!this.shake)return
    this.shake = false
    if(!/^1[3456789]\d{9}$/.test(this.phoneNo)){
      Toast.fail('请输入正确手机号、验证码');
      return false
    }
    let params = {
      userId: ActivityModule.userId,
      phoneNumber: this.phoneNo,
      userToken: '',
      verifyCode: this.verifyCode
    }
    await activityBindPhoneNumber(params).then((res:any) => {
      console.log('117res', res)
      if(res.code === '0'){
        Toast.success('绑定手机号成功')
        this.$emit('bindPhoneSuccess')
      }
    }).catch((err:any) => {
      console.log('56err', err)
    }).finally(()=>{
      this.shake = true
    })
  }
}
</script>
<style lang="scss" module>
.guessingLanternRiddlesPhoneCode{
  position: fixed;
  margin: 0 auto;
  top: 100px;
  left: 0;
  right: 0;
  width: 590px;
  height: 797px;
  background: url('../../../../assets/images/guessing-lantern-riddles/yanzhengshoujihao.png') no-repeat center center;
  background-size: cover;
  position: relative;
  .content{
    position: absolute;
    top: 200px;
    left: 80px;
    .phone{
      width: 430px;
      // background: #ce8f90;
      background: transparent;
      margin-bottom: 5px;
      input{
        background: #fff;
        padding-left: 20px;
        height: 55px;
      }
      input::-webkit-input-placeholder { /* WebKit browsers */  
        color: #82595a;  
      }
      input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
        color: #82595a;
      }
      input::-moz-placeholder { /* Mozilla Firefox 19+ */  
        color: #82595a;  
      }
      input:-ms-input-placeholder { /* Internet Explorer 10+ */  
        color: #82595a; 
      }
    }
    .codeWrap{
      display: flex;
      justify-content: space-between;
      position: relative;
      .code{
        width: 230px;
        // background: #ce8f90;
        background: transparent;
        padding-top: 0;
        input{
          background: #fff;
          padding-left: 20px;
          height: 55px;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */  
          color: #82595a;  
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
          color: #82595a;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */  
          color: #82595a;  
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+ */  
          color: #82595a; 
        }
      }
      .getCode{
        background: #c67457;
        line-height: 55px;
        padding: 0 15px;
        height: 55px;
        font-size: 20px;
        margin-right: 32px;
        color: #fff000;
        position: absolute;
        top: 0;
        right: 0;
      }
      margin-bottom: 125px;
    }
    .confirmImgWrap{
      width: 158px;
      height: 53px;
      margin: 0 auto;
      line-height: 80px;
      text-align: center;
      .confirmImg{
        width: 100%;
        height: 100%;
      }
    }
  }
  :global(.van-cell::after){
    border-bottom: none;
  }
  :global(.van-field__error-message){
    color: #fff000;
  }
}
</style>