/**
 * @author Visupervi
 * @date 2019/9/9 15:22
 * @name 
 * @param
 * @return 
 */
import Vue from 'vue';
import creditApp from "../credit/creditApp";
import router from '../../router/router';
import Mui from 'vue-awesome-mui';
import 'vue-awesome-mui/mui/dist/css/mui.css';
import Mint from "mint-ui";
import 'mint-ui/lib/style.min.css'
// import 'lib-flexible'
import axios from 'axios';
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
  el: '#credit',
  render: c=>c(creditApp),
  router
});
