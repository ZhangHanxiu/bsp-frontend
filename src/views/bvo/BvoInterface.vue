<template>

  <div class="app-container">
    <el-button type="success" @click="logout">退出登陆</el-button>
    <el-button type="success" @click="accountMoney">账户余额</el-button>
    <el-button type="success" @click="withdrawalSubsidiary">查看流水</el-button>

    <div :style="{display:table1}">
    <div style="margin-top: 50px;margin-bottom: 20px">
      <el-input icon="el-icon-search" style="width: 170px"></el-input> <el-button style="margin-left: 15px" @click="accountBalance" type="success">搜索</el-button>
      <div><p style="font-size: 30px;color: #20a0ff">品牌商>>流水</p></div>

    </div>
    <el-table
      :data="testList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="账户" >
        <template slot-scope="scope">
          {{ scope.row.accountNumber }}
        </template>
      </el-table-column>
      <el-table-column label="余额"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="saveMoney" size="small">存钱</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div :style="{display:table2}">
      <div style="margin-top: 50px;margin-bottom: 20px">
        <el-button icon="el-icon-search" style="width: 100px">搜索</el-button>
        <div><p style="font-size: 30px;color: #20a0ff">品牌商>>提现明细</p></div>
      </div>
      <el-table
              :data="testList2"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
      >
        <el-table-column label="交易流水号" >
          <template slot-scope="scope">
            {{ scope.row.transaction_id }}
          </template>
        </el-table-column>
        <el-table-column label="余额" >
          <template slot-scope="scope">
            {{ scope.row.transaction_money }}
          </template>
        </el-table-column>
        <el-table-column label="时间6"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.transaction_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" :formatter="formatterType">

        </el-table-column>
      </el-table>
    </div>
    <div style="margin-right: 800px">
      <el-dialog title="存钱" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
        <el-form ref="add" :model="account">
          <el-form-item label="金额">
            <el-input v-model="account.amount" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="">取 消</el-button>
          <el-button type="primary" @click="saveAccount">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getAccountBalance, withDrawAccount, saveAccount, withdrawalSubsidiary } from '../../api/wallet';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      table1:'none',
      table2:"none",
      table3:'none',
      table4:'none',
      button1:'',
      button2:'none',
      buyer_id:null,
      button3:'none',
      form:{},
      dialogAddVisible:false,
      account:{},
      listLoading: true,
      testList:[],
      testList2:[],
    }
  },
  created() {
    this.buyer_id = this.$route.params.buyer_id;
    this.getAccountBalance(this.buyer_id);

  },
  methods: {

    getAccountBalance(buyer_id){

      getAccountBalance(buyer_id).then(res =>{
        if (res.code === 200){
          this.testList = [{
            accountNumber:localStorage.getItem("accountName"),
            account:res.data,
          }]
        }
      })
    },

    //提现明细
    withdrawalSubsidiary(){
      this.table1 = 'none';
      this.table2 = '';
      this.table3 = 'none';
      this.table4 = 'none';
      withdrawalSubsidiary(this.buyer_id).then(res =>{
        if (res.code === 200){
          this.testList2 = res.data;
        }
      })
    },

    //提现
    saveMoney(){
      this.dialogAddVisible = true;
    },
    withDrawAccount(){
      this.account.buyer_id = this.$route.params.buyer_id;
      withDrawAccount(this.account).then(res =>{
        if (res.code === 200){
          this.getAccountBalance(this.account.buyer_id);
          this.dialogAddVisible = false;
          this.$message.success('提现成功');
        }else {
          this.$message.error('提现失败');
        }
      })
    },

    //存钱
    saveAccount(){
      this.account.buyer_id = this.$route.params.buyer_id;
      saveAccount(this.account).then(res =>{
        if (res.code === 200){
          this.dialogAddVisible = false;
          this.getAccountBalance(this.account.buyer_id);
          this.$message.success('存钱成功!')
        }else {
          this.$message.error('存钱失败!')
        }
      })
    },

    formatterType(row, column){
      switch(row.status) {
        case -1:
          return '失败';
          break;
        case 2:
          return '申请';
          break;
        case 3:
          return '完成';
          break;
        default:
          return '未知';
      }
    },
    accountBalance(){

    },

    logout(){
      this.$router.push('/bvo-wallet')
    },

    accountMoney(){
      this.table1 = '';
      this.table2 = 'none';
    },


  }
}
</script>
