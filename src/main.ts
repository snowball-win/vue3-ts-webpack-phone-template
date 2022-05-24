import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { isWeixin, initFont} from '@/utils/wx'
import 'vant/lib/index.css'
import '@/utils/permission'
if (isWeixin()) {
  initFont()
}
createApp(App)
.use(store)
.use(router)
.use(Vant)
.mount('#app')
