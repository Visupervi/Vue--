<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <!--<credit-audit></credit-audit>-->
  </div>
</template>

<script>
  // import creditAudit from "../../components/creditAudit/CreditAssessment"
  export default {
    name: 'App',
    // components:{creditAudit}
  }
</script>

<style lang="less">
  html, body {
    /*padding: 10px;*/
    height: 100%;
    background-color: #ECECEC;

    #app {
      height: 100%;
      background-color: #fff;
      .mui-toast-container{
        top: 0;
      }
    }
  }

  html {
    padding: 10px;
  }
</style>
