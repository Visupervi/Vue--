<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <!--<credit-result></credit-result>-->
  </div>
</template>

<script>
  // import creditResult from "../../components/creditAuditResult/CreditAuditResultComponent"
  export default {
    name: "creditApp",
    // components:{creditResult}
  }
</script>

<style lang="less">
  html, body {
    /*padding: 10px;*/
    height: 100%;
    background-color: #ECECEC;
    #app {
      height: 100%;
      .mui-toast-container{
        top: 0;
      }
    }
  }

  html {
    padding: 10px;
  }
</style>
