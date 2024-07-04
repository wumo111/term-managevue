<template>
    <el-container>
        <el-header class="header">
          <span class="left-title">
            NeuSoft 东软体检报告管理系统
          </span>
          <span class="right-title">
            医生：孙思邈
          </span>
        </el-header >

        <el-container>
        <el-aside class="aside">
            <span class="as-title">预约客户信息</span>
            <div class="custom-table">
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">预约编号</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.orderId }}</el-col>
                </el-row>
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">手机号码</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.user_Id }}</el-col>
                </el-row>
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">真实姓名</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.real_name }}</el-col>
                </el-row>
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">性别</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.sex }}</el-col>
                </el-row>
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">套餐类型</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.sname }}</el-col>
                </el-row>
                <el-row class="custom-row">
                    <el-col :span="12" class="left-column">体检日期</el-col>
                    <el-col :span="12" class="right-column">{{ selectedUser.order_Date }}</el-col>
                </el-row>
            </div>
            <div class="button-container">
                <el-button type="primary">查询体检用户</el-button>
            </div>
            </el-aside>
        
        
          <el-main class="main">
            <div v-for="block in blocks" :key="block.ciId" class="block-container">
        <span class="main-title">{{ block.ciName }}</span>
        <el-form label-width="120px">
          <div class="grid-container">
            <div v-for="(item, index) in block.items" :key="index" class="input-with-append">
              <el-form-item :label="item.name" style="white-space: nowrap;">
                <el-input v-model="item.value" style="width: 250px;"></el-input>
                <span class="append-text" style="width: 250px;">{{ item.unit }} 正常值范围: {{ item.minRange }}-{{ item.maxRange }}</span>
              </el-form-item>

            </div>
            <div class="button-section">
              <el-button type="primary" @click="submitData">提交{{ block.ciName }}</el-button>
            </div>
          </div>
        </el-form>
      </div>


      <el-table :data="comment" style="width: 100%">
      <el-table-column prop="title" label="总检结论标题" >
        <template slot-scope="{ row }">
            <el-input v-model="row.title"></el-input>
          </template>
      </el-table-column>
      <el-table-column prop="content" label="总检结论项内容" >
          <template slot-scope="{ row }">
            <el-input v-model="row.content"></el-input>
          </template>
        </el-table-column>
    </el-table>
    <el-form :model="newConclusion" label-width="120px">
      <el-form-item>
        <el-button type="primary" @click="addConclusion">添加结论</el-button>
        <el-button type="primary" @click="submitConclusion">提交</el-button>
      </el-form-item>
      </el-form>
          </el-main>
        </el-container>

      </el-container>
    </template>
    
      <style scoped>
      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        background-color: #7d94b3;
        color: #333;
        line-height: 80px;
      }
      .left-title {
      font-size: 24px; /* 左侧标题字体大小 */
      color: #333; /* 左侧标题颜色 */
    }
    
    .right-title {
      text-align: end;
      font-size: 16px; /* 右侧标题字体大小 */
      color: #666; /* 右侧标题颜色 */
    }
    .as-title {
        padding-left: 15px;
      text-align: left;
      font-size: 20px;
      color: #242424; 
      margin-top: 5px;
      line-height: 50px;
      font-weight: bold;

    }
    .main-title {
      padding-left:5px;
      text-align: left;
      margin-bottom:20px;
      font-size: 20px;
      color: #131212; 
      font-weight: bold;
      line-height:40px;
    }
      .aside {
        
        background-color: #b5c9e0;
        color: #333;
      }
      .main {
        background-color: #ffffff;
        color: #333;
      }
      .custom-table {
        margin-top: 10px;
        margin: 15px;
        padding-right:5px;
        }
    .custom-row{
        border: 1px solid #9e9c9c;
        height: 60px;
        line-height: 60px;
        }
    .left-column {
         background-color: #cfcccc; /* 左列背景颜色 */
         text-align: center;
         font-weight: bold;
    }
    .right-column {
         background-color: #fcfbfb; 
         text-align: center;
    }
    .button-container {
        margin: 15px;
        text-align: left;
        margin-top: 30px;
    }
    .input-with-append {
    display: grid;
    grid-template-columns:auto 1fr ; /* 一个自动扩展的列和一个固定大小的列 */  
    margin-left:20px
}
.append-text {
    text-align: left; 
}
      </style>
    
    <script>
    export default {
      data() {
        return {
          selectedUser : {
          orderId: this.$route.query.orderId,
          user_Id: '',
          real_name: '',
          sex: '',
          sname: '',
          hname: '',
          order_Date: ''
        },
        newConclusion:{
            order_Id:'',
            title:'',
            content:'',
        },
        blocks:[],
        comment:[],
    };
      },
      created(){
        this.loadData();
      },
      methods: {
        addConclusion() {
    // 创建新结论对象
        const newBlock = {
            //order_Id: this.newConclusion.order_Id,
            title: this.newConclusion.title,
            content: this.newConclusion.content
        };

    // 添加到comment数组中
        this.comment.push(newBlock);

        this.newConclusion.title = '';
        this.newConclusion.content = '';
        },
    submitConclusion() {

      const data = {
        orderId: this.$route.query.orderId,
        item: this.comment
      };
      this.$axios.post('/overallresult/add', data)
        .then(response => {
          console.log('Data submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    },
      submitData() {
        const item = this.blocks.flatMap(block =>
            block.items.map(item => ({
              cdId: item.cdId,
              value: item.value,
              siError: item.value < item.minRange || item.value > item.maxRange
            }))
        );
      // 构建需要发送的数据对象
      const data = {
        orderId: this.$route.query.orderId,
        item: item
      };
      console.log('提交的数据:', data);
      this.$axios.post('/truecidetailedreport/add', data)
        .then(response => {
          console.log('数据提交成功:', response.data);
        })
        .catch(error => {
          console.error('数据提交失败:', error);
        });
      },
      loadData(){
        const orderId = this.$route.query.orderId;
        let url_2="/orders/getByOrderId?orderId="+orderId;
        this.$axios.get(url_2)
        .then(response => {
          this.selectedUser= response.data.data;
          this.selectedUser.orderId=this.$route.query.orderId;
        })
        .catch(e => {
          console.log("Error loading user data", e);
        });

            let url=`/checkitemdetailed/getCiDetailedReportsByOrderId?orderId=${orderId}`;
            this.$axios.get(url).then(response=>{
              const data=response.data.data;
              this.blocks = data.map(item => ({
            ...item,
            value: null
          }));
            }).catch(e=>{console.log("error loading",e);})
            }
  },

        
        
        };
    </script>