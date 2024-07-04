<template>
<el-container>
    <el-header class="header">
      <span class="left-title">
        NeuSoft 体检报告管理系统
      </span>
      <span class="right-title">
        医生：孙思邈
      </span>
    </el-header >
    
    <el-container>
      <el-aside width="350px" class="aside">
        <span class="as-title">
          体检客户查询
        </span> 
        <el-form :model="searchForm" label-width="80px">
          <el-form-item label="手机号码">
            <el-input v-model="searchForm.user_Id" placeholder="请输入手机号码" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
          <el-input v-model="searchForm.real_name" placeholder="请输入姓名" style="width: 250px;">姓名</el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="searchForm.sex" label="男"></el-radio>
        <el-radio v-model="searchForm.sex" label="女"></el-radio>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select v-model="searchForm.sname" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="searchForm.order_Date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否归档">
          <el-radio v-model="searchForm.archived" label="1">未归档</el-radio>
          <el-radio v-model="searchForm.archived" label="2">已归档</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>

        
        </el-form>
      </el-aside>

      <el-main class="main">
        <el-table :data="filteredData" border style="width=100%">
            <el-table-column prop="order_Id" label="预约编号" width="120">
            </el-table-column>
            <el-table-column prop="user_Id" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="real_name" label="真实姓名">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="sname" label="体检套餐类型">
            </el-table-column>
            <el-table-column prop="hname" label="体检医院">
            </el-table-column>
            <el-table-column prop="order_Date" label="体检日期">
            </el-table-column>
            <el-table-column label="操作">
            <template v-slot="scope">
            <el-button type="text" @click="viewReport(scope.row.order_Id)">查看报告详情</el-button>
            </template>
          </el-table-column>
          </el-table></el-main>
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
  text-align: left;
  font-size: 18px; /* 左侧标题字体大小 */
  color: #333; /* 左侧标题颜色 */
}
  .el-aside {
    background-color: #b5c9e0;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

   .el-form-item__content {
  text-align: center;
}
  </style>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      searchForm: {
        user_Id: '',
        real_name: '',
        sex: '',
        sname: '',
        order_Date: '',
        //archived: ''
      },
      options: [
        { value: '普通男士客户-基础套餐', label: '普通男士客户-基础套餐' },
        { value: '普通女士客户-基础套餐', label: '普通女士客户-基础套餐' }
      ],
      tableData:[],
      filteredData: []
    };
  },
  created(){
    this.loadData();
  },
  watch: {
    searchForm: {
      handler() {
        this.filterData();
      },
      deep:true
    }
  },
  methods: {
    loadData(){
      let url="/orders/getAll";
      this.$axios.get(url)
        .then(response => {
          this.tableData = response.data.data.map(item => {
            return {
              ...item,
              sex: item.sex === 1 ? '男' : '女'
            };
          });
          this.filteredData=this.tableData;
          //this.filterData = response.data.data;
        })
        .catch(e => {
          console.log("Error loading data", e);
        });
    }, 
    /*filterData() {
      this.filteredData = this.tableData.filter(item => {
        return ( 
          (!this.searchForm.user_Id || item.user_Id.toString().includes(this.searchForm.user_Id)) &&
          (!this.searchForm.real_name || item.real_name.tostring().includes(this.searchForm.real_name)) &&
          (!this.searchForm.sex || item.sex === this.searchForm.sex) &&
          (!this.searchForm.sname || item.sname === this.searchForm.sname) &&
          (!this.searchForm.order_Date || item.date === this.searchForm.order_Date) 
          //&&
          //(!this.searchForm.archived || item.archived === this.searchForm.archived)
        );
      });
    }*/
    filterData() {
  console.log("Starting filter with searchForm:", this.searchForm);
  this.filteredData = this.tableData.filter(item => {
    const matchesUserId = !this.searchForm.user_Id || item.user_Id===this.searchForm.user_Id;
    const matchesRealName = !this.searchForm.real_name || item.real_name.includes(this.searchForm.real_name);
    const matchesSex = !this.searchForm.sex || item.sex === this.searchForm.sex;
    const matchesSname = !this.searchForm.sname || item.sname === this.searchForm.sname;
    const matchesOrderDate = !this.searchForm.order_Date || moment(item.order_Date).format('YYYY-MM-DD') === moment(this.searchForm.order_Date).format('YYYY-MM-DD');

    console.log({
      item,
      matchesUserId,
      matchesRealName,
      matchesSex,
      matchesSname,
      matchesOrderDate
    });

    return matchesUserId && matchesRealName && matchesSex && matchesSname && matchesOrderDate;
  });

  console.log("Filtered data:", this.filteredData);
},
    search() {
      // 触发计算属性重新计算
      this.filterData();
    },
    viewReport(order_Id) {
      this.$router.push({ path: '/clidata', query: { orderId: order_Id } });
    }

  }
};
</script>