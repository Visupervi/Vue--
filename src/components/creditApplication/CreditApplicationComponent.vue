<template>
  <div class="app">
    <p class="creditTitle">信贷申请</p>
    <div class="mui-input-row">
      <label>企业名称：</label>
      <input type="text" name="" readonly="readonly"  class="mui-input-clear note" v-model="reasonVal" placeholder="上海一零一塑料模具有限公司">
    </div>
    <div class="mui-input-row">
      <label>信用代码：</label>
      <input type="text" name="" readonly="readonly"  class="mui-input-clear note" v-model="reasonVal" placeholder="123456789012345678">
    </div>
    <div class="mui-input-row StyleTop">
      <label>客户姓名：</label>
      <input type="text" name=""  readonly="readonly" class="mui-input-clear note" v-model="reasonVal" placeholder="李贷贷">
    </div>
    <div class="mui-input-row">
      <label>联系方式：</label>
      <input type="text" name="" readonly="readonly"  class="mui-input-clear note" v-model="reasonVal" placeholder="155****9988">
    </div>
    <div class="mui-input-row">
      <label>选择银行：</label>
      <input type="text" name=""  class="mui-input-clear" @focus="showMask" v-model="bankVal">
    </div>
    <div class="mui-input-row">
      <label>申请原由：</label>
      <input type="text" name=""  class="mui-input-clear note" v-model="reasonVal">
    </div>

    <div class="mui-button-row">
      <button type="button" data-loading-icon="mui-spinner mui-spinner-custom " class="mui-btn mui-btn-danger"
              @click="submitClick">提交
      </button>
      <button type="button" class="mui-btn mui-btn-primary " @click="cancelSubmit">取消</button>
    </div>
    <div :class="isShow ? 'mask show':'mask'">
      <div class="page-picker-wrapper">
        <mt-picker :slots="bankSlot" @change="bankChange"></mt-picker>
        <div class="picker-toolbar">
          <div  class="picker-cancel" @click="cancelSel">取消</div>
          <div  class="picker-sure" @click="sureSel">确定</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CreditApplicationComponent",
    data() {
      return {
        bankSlot: [
          {
            flex: 1,
            values: ["选择银行","平安银行","上海银行","中国银行", "中国建设银行", "中国工商银行", "中国招商银行"],
            className: "bankSlot",
            textAlign:"center",
            toolbar:true
          }
        ],
        isShow:false,
        bankVal:"",
        reasonVal:""
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {

      //弹出银行选择
      showMask(){
        this.isShow = true;
      },
      //选择银行
      bankChange(pick,value) {
        this.bankVal = value[0];
        if(value[0] ==="选择银行"){
          this.bankVal = "";
        }else{
          this.bankVal = value[0];
        }
        console.log(this.bankVal)
      },
      //取消选择
      cancelSel(){
        this.isShow = false;
        this.bankVal = "";
      },
      //确认选择
      sureSel(){
        this.isShow = false;
      },
      //提交
      submitClick(){
        console.log(123)
      },
      //取消提交
      cancelSubmit(){
        this.reasonVal ="";
        this.bankVal = "";
      }
    }

  }
</script>

<style scoped lang="less">
  .app {
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    height: 100%;
    .creditTitle{
      padding: 10px 0;
      box-sizing: border-box;
      text-align: center;
      font-size: 16px;
      color: #000;
      font-weight: 600;
    }
    .mui-input-row{
      font-size: 14px;
      margin-bottom: 10px;
      label{
        width: 26%;
        margin-left: 17px;
        padding: 10px 4px;
      }
      input, select {
        font-size: 14px;
        box-sizing: border-box;
      }
      .mui-input-clear{
        border: 1px solid #ccc;
        width: 64%;
        margin-right: 15px;
        text-indent: 1rem;
        padding: 10px 5px;
      }
    }
    .mask{
      font-size: 14px;
      position: absolute;
      display: none;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color:rgba(0,0,0,.6);
      .page-picker-wrapper{
        position: absolute;
        background-color: #fff;
        bottom: 0;
        font-size: 14px !important;
        width: 100%;
        .picker-toolbar{
          position: absolute;
          width: 100%;
          top: 0;
          background-color: #ccc;
          .picker-cancel{
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translate(0, -50%);
          }
          .picker-sure{
            color: #007aff;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(0,-50%);
          }
        }
      }
    }
    .show{
      display: block;
    }
    .mui-button-row {
      bottom: -5%;
      .mui-btn-primary, .mui-btn-danger {
        outline: none;
        border: none;
        width: 40%;
        padding: 8px 12px;
      }
      .note
      .mui-btn-primary {
        background-color: #fece86;//#FF8C69
      }
      .mui-btn-danger{
        background-color:#FF8C69;
      }
    }
  }
</style>
