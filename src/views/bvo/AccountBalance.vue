<template>
  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:30px;font-weight:normal;">
          BVO
          <small style="font-size:16px;">
            <i class="el-icon-d-arrow-right"></i> My Wallet
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
      <el-button type="success" @click="registerUser">Registered</el-button>
      <el-button type="success" @click="login">Login</el-button>
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
    </el-main>

  </el-container>
</template>

<script>
  import { registerWallet,loginWallet } from '../../api/wallet'

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
        button3:'none',
        form:{},
        listLoading: true,
        testList:[
          {
            accountNumber:'ace.com',
            account:145,
          }
        ],
        testList2:[{
          accountNumber:'ace.com',
          account:145,
          createTime:'2020-09-04 09:12:11',
          status:'Processing'
        },
          {
            accountNumber:'bbb.com',
            account:165,
            createTime:'2020-10-04 09:12:11',
            status:' Finish'
          }
        ]
      }
    },
    created() {
      // this.fetchData()
    },
    methods: {
      registerWallet(){
        this.form.account_type = 1;
        registerWallet(this.form).then(res =>{
          if (res.code === 200){
            this.$message.success('Successful registration, you can return to the login interface')
          }else {
            this.$message.error("Registration failed")
          }
        })
      },
      registerUser(){
        this.table1 = 'none';
        this.table2 = 'none';
        this.table3 = '';
        this.table4 = 'none';
      },

      login(){
        this.table1 = 'none';
        this.table2 = 'none';
        this.table3 = 'none';
        this.table4 = '';
      },
      loginWallet(){
        loginWallet(this.form).then(res =>{
          if (res.code ===200 ){
            this.$message.success('Login successful!');
            localStorage.setItem('accountName',res.data.account_name);
            this.$router.push('/bvo-interface'+res.data.buyer_id);
          }else {
            this.$message.error('Login failed, user name or password error, please login again!')
          }
        })
      },

      account(){
        this.table1 = '';
        this.table2 = 'none';
        this.table3 = 'none';
        this.table4 = 'none';
      },

      tixian(){
        this.table1 = 'none';
        this.table2 = '';
        this.table3 = 'none';
        this.table4 = 'none';
      },

      // fetchData() {
      //   // this.listLoading = true
      //   // getList().then(response => {
      //   //   this.list = response.data.items
      //   //   this.listLoading = false
      //   // })
      // }
    }
  }
</script>
