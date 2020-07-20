<template>

  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:30px;font-weight:normal;">
          MVO
          <small style="font-size:16px;">
            <i class="el-icon-d-arrow-right"></i> Account information
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
      <el-button type="success" @click="logout">Log Out</el-button>
      <el-button type="success" @click="accountMoney">Account Balance</el-button>
      <el-button type="success" @click="withdrawalSubsidiary">View Record</el-button>

      <div :style="{display:table1}">
        <div style="margin-top: 50px;margin-bottom: 20px">
          <el-input icon="el-icon-search" style="width: 170px"></el-input> <el-button style="margin-left: 15px" @click="accountBalance" type="success">搜索</el-button>
          <div><p style="font-size: 18px;color: #20a0ff">Record</p></div>

        </div>
        <el-table
                :data="testList"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
        >
          <el-table-column label="Account" >
            <template slot-scope="scope">
              {{ scope.row.accountNumber }}
            </template>
          </el-table-column>
          <el-table-column label="Balance"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.account }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Operating" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="saveMoney" size="small">Save money</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div :style="{display:table2}">
        <div style="margin-top: 50px;margin-bottom: 20px">
          <el-button icon="el-icon-search" style="width: 100px">Search</el-button>
          <div><p style="font-size: 30px;color: #20a0ff">Withdrawal Details</p></div>
        </div>
        <el-table
                :data="testList2"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
        >
          <el-table-column label="Transaction record number" >
            <template slot-scope="scope">
              {{ scope.row.transaction_id }}
            </template>
          </el-table-column>
          <el-table-column label="Balance" >
            <template slot-scope="scope">
              {{ scope.row.transaction_money }}
            </template>
          </el-table-column>
          <el-table-column label="Transaction Time"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.transaction_time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Status" align="center" :formatter="formatterType">

          </el-table-column>
        </el-table>
      </div>
      <div style="margin-right: 800px">
        <el-dialog title="Save money" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
          <el-form ref="add" :model="account">
            <el-form-item label="Amount">
              <el-input v-model="account.amount" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="">Cancel</el-button>
            <el-button type="primary" @click="saveAccount">Sure</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>

  </el-container>
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
          this.$message.success('Withdraw successfully');
        }else {
          this.$message.error('Withdrawal failed');
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
          this.$message.success('Save money successfully!')
        }else {
          this.$message.error('Failed to save money!')
        }
      })
    },

    formatterType(row, column){
      switch(row.status) {
        case -1:
          return 'Failure';
          break;
        case 2:
          return 'Apply';
          break;
        case 3:
          return 'Finish';
          break;
        default:
          return 'Nnknown';
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
