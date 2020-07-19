<template>


  <div class="app-container">
    <el-button type="success" @click="registerUser">注册</el-button>
    <el-button type="success" @click="login">登陆</el-button>
    <div :style="{display:table3}" style="margin-top: 50px;">
      <el-form label-width="80px" :model="form">
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="margin-left: 800px" @click="registerWallet">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :style="{display:table4}" style="margin-top: 50px;">
      <el-form label-width="80px" :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.accountname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="margin-left: 800px" @click="loginWallet">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
        status:'处理中'
      },
        {
          accountNumber:'bbb.com',
          account:165,
          createTime:'2020-10-04 09:12:11',
          status:'完成'
        }
        ]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    registerWallet(){
      this.form.account_type = 2;
      registerWallet(this.form).then(res =>{
        if (res.code === 200){
          this.$message.success('注册成功,可以返回登陆界面登陆啦')
        }else {
          this.$message.error("注册失败")
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
          this.$message.success('登陆成功!');
          localStorage.setItem('accountName',res.data.account_name);
          this.$router.push('/interface/'+res.data.buyer_id);
        }else {
          this.$message.error('登录失败,用户名或密码错误,请重新登陆!')
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
