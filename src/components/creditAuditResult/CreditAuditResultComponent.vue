<template>
  <div id="App">
    <!--财务诊断开始-->
    <div class="illustration mui-content">
      <div class="tb_header">
        <div class="mui-row">
          <div class="mui-col-sm-12 mui-col-xs-12" v-for="(item, index) in chargeTitle" :key="index">
            <li class="mui-table-view-cell tb_header_li" :id="generateId(index,'tb_header_')">
              {{item}}
            </li>
          </div>
        </div>
      </div>
      <div class="tb_body">
        <div class="mui-row" v-for="(item, index) in chargeContent" :key="index" :id="generateId(index,'tb_row')">
          <div class="mui-col-sm-4 mui-col-xs-4">
            <li class="mui-table-view-cell" :id="generateId(index+20,'tb_header_')">
              {{item.title}}
            </li>
          </div>
          <div class="mui-col-sm-8 mui-col-xs-8">
            <li class="mui-table-view-cell" :id="generateId(index+10,'tb_header_')">
              {{item.illustrate}}
            </li>
          </div>
        </div>
      </div>
    </div>
    <!--财务诊断结束-->
    <!--风险事件开始-->
    <div class="illustration mui-content">
      <div class="tb_header">
        <div class="mui-row">
          <div class="mui-col-sm-12 mui-col-xs-12" v-for="(item, index) in riskEvents" :key="index" :id="(index,'div_')">
            <li class="mui-table-view-cell tb_header_li" :id="generateId(index,'tb_header_')">
              {{item}}
            </li>
          </div>
        </div>
      </div>
      <div class="tb_body">
        <div class="mui-row" v-for="(item, index) in riskContent" :key="index" :id="generateId(index+60,'tb_row')">
          <div class="mui-col-sm-3 mui-col-xs-3 styHeight">
            <li  v-if="item.title !== ''" class="mui-table-view-cell" :id="generateId(index+30,'tb_header_')">
              {{item.title}}
            </li>
          </div>
          <div class="mui-col-sm-2 mui-col-xs-2 styHeight">
            <li class="mui-table-view-cell" :id="generateId(index+40,'tb_header_')" ref="elements">
              {{item.institution}}
            </li>
          </div>
          <div class="mui-col-sm-7 mui-col-xs-7 styHeight" >
            <li class="mui-table-view-cell" :id="generateId(index+50,'tb_header_')" ref="element">
              {{item.content}}
            </li>
          </div>
        </div>
      </div>
    </div>
    <!--风险事件结束-->
    <!--风险总结开始-->
    <div class="illustration mui-content">
      <div class="tb_header">
        <div class="mui-row">
          <div class="mui-col-sm-12 mui-col-xs-12" v-for="(item, index) in riskResult" :key="index">
            <li class="mui-table-view-cell tb_header_li" :id="generateId(index+90,'tb_header_')">
              {{item}}
            </li>
          </div>
        </div>
      </div>
      <div class="tb_body riskSummary">
        <div class="mui-row" v-for="(item, index) in riskResultContent" :key="index" :id="generateId(index+80,'tb_row')">
          <div class="mui-col-sm-12 mui-col-xs-12">
            <li class="mui-table-view-cell" :id="generateId(index+70,'tb_header_')">
              {{item.content}}
            </li>
          </div>
        </div>
      </div>
    </div>
    <!--风险总结结束-->
    <div class="mui-button-row">
      <button type="button" data-loading-icon="mui-spinner mui-spinner-custom " class="mui-btn mui-btn-danger"
              @click="downloadPDf">
        详细报告下载
      </button>
      <button type="button" data-loading-icon="mui-spinner mui-spinner-custom " class="mui-btn mui-btn-primary"
              @click="creditApply">
        信贷申请
      </button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "PayComponent",
    data() {
      return {
        chargeTitle: ["财务诊断"],
        chargeContent: [
          {
            title: "诊断内容",
            illustrate: "诊断分析"
          },
          {
            title: "总体结论        ",
            illustrate: "B",
          },
          {
            title: "结论分析     ",
            illustrate: "企业财务状况良好，风险水平较低"
          }
        ],
        riskEvents:["风险事件"],
        riskContent:[
          {
            title:"诊断内容",
            institution:"机关",
            content:"诊断分析"
          },
          {
            title:"企业主",
            institution:"工商",
            content:"两年前，有一条处罚记录"
          },
          {
            title:"",
            institution:"司法",
            content:"近两年内，有一条执行记录，执行标的为329388"
          },
          {
            title:"",
            institution:"税务",
            content:"近两年有赋税"
          },
          {
            title:"业主配偶",
            institution:"风险筛",
            content:"涉案人员"
          },
          {
            title:"企业",
            institution:"司法",
            content:"两年前，有一条开庭公告记录；近两年内，有一条裁判记录"
          },
        ],
        riskResult:["风险总结"],
        riskResultContent:[
          {
            content:"1、企业主要在工商方面存在风险事件，当前有一笔案件处于执行中。企业主配偶在风险名单存在风险事件。"
          },
          {
            content:"2、企业在司法方面存在风险事件，涉嫌法律纠纷较多，当前有一笔案件处于执行中。"
          },
          {
            content:"3、整体信用风险较高，建议重点关注谨慎介入。"
          }
        ]
      }
    },
    created() {
    },
    mounted() {
      this.computeHeight();
    },

    methods: {
      generateId(index, name) {
        return `${name}${index}`
      },
      //pdf下载
      downloadPDf(){

        this.axios({
          method:'get',
          responseType: 'blob',
          url:"http://localhost:8080/static/doc/360风控报告（样例）含税务.pdf"
        }).then(res =>{
          const url = window.URL.createObjectURL(new Blob([res.data]));
          let head = res.headers['content-disposition'];
          const link = document.createElement('a');
          let fname = '风控报告（样例）含税务.pdf';
          if(head){
            try {
              fname = head.split(';')[1].split('=')[1]
            } catch (err){
              console.log('can not get pdf name');
            }
          }
          link.href = url;
          link.setAttribute('download', fname);
          document.body.appendChild(link);
          link.click();
        })
      },
      //申请信贷
      creditApply(){
        this.$router.push({
          path:'/creditApply'
        })
      },
      computeHeight(){
        console.log(this.$refs);
        let maxH1 = 0;
        let maxH2 = 0;
        this.$refs.element.map((value, index, array)=>{
          console.log(value.id)
          console.log(value.offsetHeight)
          if(value.id==="tb_header_52"){
            maxH1 = value.offsetHeight;
          }
          if(value.id==="tb_header_55"){
            maxH2 = value.offsetHeight;
          }
        });
        this.$refs.elements.map((value, index, array)=>{
          if(value.id === "tb_header_42"){
            value.style.height = maxH1  +"px"
          }
          if(value.id === "tb_header_45"){
            value.style.height = maxH2 +"px"
          }
        })
        console.log(maxH1);
        return maxH1;
      }
    },
    updated() {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #App {
    height: 100%;
    background-color: #fff;
    position: relative;
    /*清除浮动以后直接写这个调用*/
    /*清除浮动最现代、最流行、最简单的方式*/
    .clearfix::before, .clearfix::after {
      content: "";
      display: table;
    }
    .clearfix::after {
      clear: both;
    }
    /*兼容IE67*/
    .clearfix {
      *zoom: 1;
    }

    .companyName {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 10px;
      left: 50%;
      -webkit-transform: translate(-50%);
      -moz-transform: translate(-50%);
      -ms-transform: translate(-50%);
      -o-transform: translate(-50%);
      transform: translate(-50%);
      font-size: 12px;
    }

    .illustration {
      position: relative;
      padding: 0 5px;
      box-sizing: border-box;
      background-color: #fff;
      overflow: scroll;
      p {
        color: #000;
        font-size: 13px;
        padding: 5px 0px 0px 0px;
        margin: 0px;
        text-indent: 1.5rem;
        box-sizing: border-box;

        span {
          top: -5px;
          font-size: 10px;
          font-weight: 500;
          position: relative;
        }
      }
      .mui-table-view-cell{
        padding: 5px 15px;
      }
      .tb_header {
        li {
          list-style: none;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          box-sizing: border-box;
        }

        #tb_header_2 {
          border-right: none;
        }

      }
      /*风险总结样式*/
      .riskSummary{
        border: 1px solid #000;
      }
      /*表格样式开始*/
      .tb_body {
        overflow: scroll;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
        li {
          list-style: none;
          text-align: center;
          font-size: 12px;
          font-weight: 400;
          padding: 0px 5px;
          box-sizing: border-box;
        }
        #tb_header_3, #tb_header_4, #tb_header_5, #tb_header_6, #tb_header_7 {
          border-right: none;
        }

        #tb_header_10, #tb_header_11, #tb_header_12, #tb_header_13, #tb_header_14 {
         border: 1px solid #000;
          border-right: none;
          box-sizing: border-box;
        }
        #tb_header_11{
          border-bottom: none;
          border-top: none;
        }
        #tb_header_20, #tb_header_21, #tb_header_22, #tb_header_23, #tb_header_24 {
          border: 1px solid #000;
          box-sizing: border-box;
          border-left: none;
          border-right: none;
        }
        #tb_header_21{
          border-bottom: none;
          border-top: none;
        }
        #tb_header_22,#tb_header_12{
          border-bottom: none;
        }
        #tb_header_10,#tb_header_20,#tb_header_30,#tb_header_40,#tb_header_50{
          background-color: #cbebec;
        }

        /*风险事件样式开始*/
        #tb_header_30,#tb_header_31,#tb_header_32,#tb_header_33,#tb_header_34,#tb_header_35{
          /*border: 1px solid #000;*/
        }
        #tb_header_30,#tb_header_40,#tb_header_50{
          border: 1px solid #000;
        }
        #tb_header_40{
          border-right: none;
        }
        #tb_header_30{
          border-left: none;
          border-right: none;
        }
        #tb_header_50{
          border-right: none;
        }
        #tb_header_40,#tb_header_41,#tb_header_42,#tb_header_43,#tb_header_44,#tb_header_45,#tb_header_50,#tb_header_51,#tb_header_52,#tb_header_53,#tb_header_54,#tb_header_55{
          /*border-left: 1px solid #000;*/
        }
         #tb_row62,#tb_row63,#tb_row64,#tb_row66{
           border-bottom: 1px solid #000;
         }

        #tb_header_41,#tb_header_51{
          border-bottom: 1px solid #000;
          border-left: 1px solid #000;
        }
        #tb_header_52,#tb_header_42{
          border-left: 1px solid #000;
          border-bottom: 1px solid #000;
        }
        #tb_header_53,#tb_header_43{
          border-left: 1px solid #000;
        }
        #tb_header_54,#tb_header_44{
          border-left: 1px solid #000;
        }
        #tb_header_55,#tb_header_45{
          border-left: 1px solid #000;
        }
        #tb_row62{
          border-bottom: none !important;
        }
        #tb_row61,#tb_row62,#tb_row63,#tb_row64,#tb_row65,#tb_row66{
          border-top: none;
        }
        #tb_header_70,#tb_header_71,#tb_header_72{
          text-align: left;
        }
        .styHeight{
        }
      }
      /*表格样式结束*/
    }
    .mui-button-row {
      /*background-color: #fff;*/
      position: fixed;
      bottom: 20px;
      right: 0px;
      left: 0px;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      line-height: 1;

      button {
        width: 40%;
        padding: 10px 20px;
        font-size: 14px;
        line-height: 1;
        background-color: #FFD700;
        border: none;
        border-radius: 10px;
        color: #FF5151;

      }
    }
  }


</style>
