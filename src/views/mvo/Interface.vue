<template>

  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> Account Balance
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
      <el-button type="success" @click="logout">Log Out</el-button>
      <el-button type="success" @click="accountMoney">Account Balance</el-button>
      <el-button type="success" @click="withdrawalSubsidiary">Withdrawal Details</el-button>

      <div :style="{display:table1}">
        <div style="margin-top: 50px;margin-bottom: 20px">
          <el-input icon="el-icon-search" style="width: 170px"></el-input> <el-button style="margin-left: 15px" @click="accountBalance" type="success">搜索</el-button>
          <div><p style="font-size: 30px;color: #20a0ff">品牌商MVO>>Account Balance</p></div>

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
              <el-button type="text" @click="withDraw" size="small">Withdraw</el-button>
            </template>
          </el-table-column>



        </el-table>
      </div>

      <div :style="{display:table2}">
        <div style="margin-top: 50px;margin-bottom: 20px">
          <el-button icon="el-icon-search" style="width: 100px">搜索</el-button>
          <div><p style="font-size: 30px;color: #20a0ff">品牌商MVO>>提现明细Withdrawal Details</p></div>
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

      <div :style="{display:table3}" style="margin-top: 50px;">
        <el-form label-width="80px" :model="form">
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Account">
            <el-input v-model="form.account_name"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" style="margin-left: 800px" @click="registerWallet">Registered</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div :style="{display:table4}" style="margin-top: 50px;">
        <el-form label-width="80px" :model="form">
          <el-form-item label="Account">
            <el-input v-model="form.accountname"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" style="margin-left: 800px" @click="loginWallet">Login</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--    提现-->
      <div style="margin-right: 800px">
        <el-dialog title="Withdraw" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
          <el-form ref="add" :model="account">
            <el-form-item label="Withdrawal Amount">
              <el-input v-model="account.amount" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="">Cancel</el-button>
            <el-button type="primary" @click="withDrawAccount">Sure</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>

  </el-container>
</template>

<script>
 import { getAccountBalance,withDrawAccount,withdrawalSubsidiary } from '../../api/wallet'

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
      const id = this.buyer_id = this.$route.params.buyer_id;
      withdrawalSubsidiary(id).then(res =>{
        if (res.code === 200){
          this.testList2 = res.data;
        }else {
          this.$message.error('获取数据异常!')
        }
      })
    },

    //提现
    withDraw(){
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
      this.$router.push('/account')
    },

    accountMoney(){
      this.table1 = '';
      this.table2 = 'none';
      this.table3 = 'none';
      this.table4 = 'none';
    },


  }
}
</script>
