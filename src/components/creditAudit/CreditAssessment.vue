<template>
  <div id="app">
    <div class="title"></div>
    <form class="mui-input-group">
      <div class="mui-input-row" v-for="(item,index) in userInfo" :key="index">
        <label><img :src=item.imageUrl alt=""></label>
        <input type="text" name="" v-model="item.formName.value" class="mui-input-clear" :placeholder=item.placeHolder>
      </div>
    </form>
    <div class="mui-button-row">
      <button type="button" data-loading-icon="mui-spinner mui-spinner-custom " class="mui-btn mui-btn-danger"
              @click="registerClick">提交
      </button>
      <button type="button" class="mui-btn mui-btn-primary " @click="cancelRegister">取消</button>
    </div>
  </div>
</template>

<script>
  import urlObj from "../../service/urlService"
  export default {
    data() {
      return {
        userInfo: [
          {
            title:"用户名",
            formName:{
              name:"userName",
              value:""
            },
            imageUrl: require("../../assets/images/name.png"),
            placeHolder:"请输入姓名(默认哆客用户名)"
          },
          {
            title: "企业名",
            formName: {
              name: "custName",
              value: ""
            },
            imageUrl: require("../../assets/images/enterprise.png"),
            placeHolder: "请输入完整企业名称(默认哆客客户名)"
          },
          {
            title: "手机号",
            formName: {
              name: "managerPhone",
              value: ""
            },
            imageUrl: require("../../assets/images/tel.png"),
            placeHolder: "请输入手机号(默认哆客联系手机号)"
          },
          {
            title: "邮箱",
            formName: {
              name: "eMail",
              value: ""
            },
            imageUrl: require("../../assets/images/yx.png"),
            placeHolder: "联系邮箱"
          },
          {
            title: "注册地址",
            formName: {
              name: "registerAddr",
              value: ""
            },
            imageUrl: require("../../assets/images/zc.png"),
            placeHolder: "注册地址"
          },
          {
            title: "经营地址",
            formName: {
              name: "managementAddr",
              value: ""
            },
            imageUrl: require("../../assets/images/jy.png"),
            placeHolder: "经营地址"
          },
          {
            title: "网站地址",
            formName: {
              name: "internetAddr",
              value: ""
            },
            imageUrl: require("../../assets/images/wz.png"),
            placeHolder: "公司网站地址"
          },
          {
            title: "登记机关",
            formName: {
              name: "registeAuthor",
              value: ""
            },
            imageUrl: require("../../assets/images/gs.png"),
            placeHolder: "工商登记机关"
          },
          {
            title: "资金",
            formName: {
              name: "funds",
              value: ""
            },
            imageUrl: require("../../assets/images/zj.png"),
            placeHolder: "注册资金(万)"
          }
        ],
        isChecked: false,
        userChecked: false
      }
    },
    mounted() {
    },
    created() {
      // this.checkValue();
      console.log(urlObj);
      this.clearThisInput();
    },
    methods: {
      registerClick() {
        // this.gotoPay();
        if (this.checkValue()) {
          // let userInfo = this.createData(this.userInfo);
          // this.axios(
          //   {
          //     method: "post",
          //     url: urlObj.registryUrl,
          //     data: userInfo,
          //   }
          // ).then(res => {
          //   //登录成功跳转到支付
          //   if (res.data.message === "注册成功!") {
          //     this.gotoPay();
          //   } else {
          //     mui.toast(res.data.message)
          //   }
          // }).catch(err => {
          //   mui.toast(err)

          // })
          this.gotoPay();
        } else {
          // mui.toast("您输入的数据有误")
        }

      },
      //取消按钮
      cancelRegister() {
        for (let key in this.userInfo) {
          this.userInfo[key].formName.value = "";
        }
      },
      //组装传输数据
      createData(obj) {
        let object = {};
        for (let key in obj) {
          object[obj[key].formName.name] = obj[key].formName.value;
        }
        let qrCodeVal = this.getQueryString("qrCodeRef");
        object.qrCodeRef = qrCodeVal !== null ? qrCodeVal : new Date().getTime();//固定参数xwbz，后续改成动态获取地址上的
        return object;
      },
      //数据校验
      checkValue() {
        let flag = true;
        for (let key in this.userInfo) {
          if (this.userInfo[key].formName.value === "") {
            if (this.userInfo[key].title === "手机号" && this.userInfo[key].formName.value !== "") {
              if (!(/^1[3456789]\d{9}$/.test(this.userInfo[key].formName.value))) {
                mui.toast("请填写正确的手机号");
                flag = false;
                break;
              }
            }else{
              mui.toast(this.userInfo[key].title + "不能为空");
              flag = false
              break;
            }
          }
        }

        return flag;
      },
      //路由跳转
      gotoPay() {
        this.$router.push({
          path: '/result'
        })
      },
      //获取参数值
      getQueryString(name) {
        let reg = new RegExp("[\?\&]" + name+ "=([^\&]+)","i");
        let r = window.location.hash.substr(1).match(reg);
        if (r != null) return decodeURI(r[1]);
        return null;
      },
      //点击叉号清除数据
      clearThisInput() {
        let that = this;
        mui("body").on("tap", ".mui-icon-clear", function () {
          for (let i = 0; i < that.userInfo.length; i++) {
            if (this.previousSibling.getAttribute("placeholder") === that.userInfo[i].placeHolder) {
              that.userInfo[i].formName.value = "";
            }
          }
        })
      }

    },
    components: {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #app {
    height: 100%;
    background-color: #fff;
    .mui-input-group {
      padding-top: 0.5rem;
      box-sizing: border-box;

      /*transform: translate(0,-50%);*/

      .mui-input-row {
        height: 2.8rem;
        padding: 2.5px 0;

        input, select {
          width: 80%;
          color: #000;
          font-size: 14px;
          box-sizing: border-box;
        }

        input::-webkit-input-placeholder {
          color: #cdcdcd;
        }

        select {
          padding: 0 2%;
        }

        label {
          width: 20%;
          text-align: center;
        }

        select option {
          width: 80%;
          color: #000;
        }
      }

      .mui-icon-eye {
        top: 0.34rem
      }

      .mui-select:before {
        right: 0.1rem;
        top: 0.34rem
      }

      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #cdcdcd;
      }
    }

    .mui-input-group:before {
      position: absolute;
      right: 0;
      top: 0.6rem;
      left: 0;
      height: 1px;
      content: '';
      -webkit-transform: scaleY(.5);
      -ms-transform: scaleY(.5);
      transform: scaleY(.5);
      background-color: #c8c7cc;
    }

    .mui-button-row {
      background-color: #fff;
      margin-top: 20%;
      .mui-btn-primary, .mui-btn-danger {
        outline: none;
        border: none;
        width: 40%;
        padding: 8px 12px;
      }

      .mui-btn-primary {
        background-color: #fece86;//#FF8C69
      }
      .mui-btn-danger{
        background-color:#FF8C69;
      }
    }
  }

</style>
