import Vue from 'vue'
import Router from 'vue-router'
import creditResult from "../components/creditAuditResult/CreditAuditResultComponent"
import creditApply from"../components/creditApplication/CreditApplicationComponent"

Vue.use(Router)

export default new Router({
  // base:"../src/pages",
  // mode:"history",
  routes: [
    {
      path: '/',
      name: 'creditResult',
      component: creditResult,
      meta:{
        title:'资信报告',
        keepAlive:true
      }
    },
    {
      path: '/creditApply',
      name: 'creditApply',
      component: creditApply,
      meta:{
        title:'申请信贷',
        keepAlive:true
      }
    }
  ]
})
