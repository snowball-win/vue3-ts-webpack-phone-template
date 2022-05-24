<template>
  <div class="home">
    <div>home page</div>
    <img alt="Vue logo" src="../assets/logo.png"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { getUserDetails } from '@/api/index';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mounted() {
    // this.getListTest11()
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
