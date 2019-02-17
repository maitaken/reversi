import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'othello',
      component: require('@/components/Reversi').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
