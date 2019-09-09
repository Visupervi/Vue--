import Vue from 'vue'
import Router from 'vue-router'
import credit from "../components/creditAudit/CreditAssessment"

Vue.use(Router)

export default new Router({
  // base:"../src/pages",
  // mode:"history",
  routes: [
    {
      path: '/',
      name: 'creditSearch',
      component: credit,
      meta:{
        title:'资信评估申请',
        keepAlive:true
      }
    }
  ]
})
