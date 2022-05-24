import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { ActivityModule } from '@/store/modules/activity';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/activity',
    name: 'guessingactivity',
    meta: {
      title: ActivityModule && ActivityModule.gzhName || '',
    },
    component: () => import(/* webpackChunkName: "guessingLanternRiddles" */ '../views/guessing-lantern-riddles/index.vue')
  },
  {
    path: '/lanternRiddles',
    // redirect: '/activity',
    // redirect: (to) => {
    //   // 方法接收 目标路由 作为参数
    //   // return 重定向的 字符串路径/路径对象
    //   if (to.query.redirect) {
    //     location.href =  decodeURIComponent(String(to.query.redirect))
    //   }
    //   ActivityModule.getUidAndAcitivityId({
    //     activityId: String(to.query.act),
    //     wxOpenId: String(to.query.uid),
    //   })
    //   return {
    //     name: 'guessingactivity',
    //     query: {}
    //   }
    // },
    name: 'guessingLanternRiddles',
    meta: {
      title: ActivityModule.gzhName || '',
    },
    component: () => import(/* webpackChunkName: "guessingLanternRiddles" */ '../views/guessing-lantern-riddles/index.vue')
  },
  {
    path: '/answer',
    name: 'answer',
    meta: {
      title: ActivityModule.gzhName,
    },
    component: () => import(/* webpackChunkName: "answer" */ '../views/guessing-lantern-riddles/answer/index.vue')
  },
  {
    path: '/activityRules',
    name: 'activityRules',
    meta: {
      title: ActivityModule.gzhName,
    },
    component: () => import(/* webpackChunkName: "activityRules" */ '../views/guessing-lantern-riddles/activity-rules/index.vue')
  },
  {
    path: '/historicalRecords',
    name: 'historicalRecords',
    meta: {
      title: ActivityModule.gzhName,
    },
    component: () => import(/* webpackChunkName: "historicalRecords" */ '../views/guessing-lantern-riddles/historical-records/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
