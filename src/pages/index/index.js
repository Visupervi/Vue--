// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from "./App";
import router from '../../router/appRouter';
import Mui from 'vue-awesome-mui';
import 'vue-awesome-mui/mui/dist/css/mui.css';
import axios from 'axios';
import Mint from "mint-ui";
import 'mint-ui/lib/style.min.css'
import VueWechatTitle from "vue-wechat-title";
axios.defaults.headers['Content-Type'] = 'Access-Control-Allow-Origin:*';
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(Mui);
Vue.use(Mint);
Vue.use(VueWechatTitle);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c=>c(App),
  router
});
