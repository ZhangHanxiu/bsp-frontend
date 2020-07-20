<template>

    <el-container id="main-content" class="clearfix">
      <el-header>
        <div class="page-header position-relative">
          <h1 style="color: #2679b5;font-size:30px;font-weight:normal;">
            BVO
            <small style="font-size:16px;">
              <i class="el-icon-d-arrow-right"></i> My Information
            </small>
          </h1>
        </div>
      </el-header>
      <el-main id="page-content" class="clearfix">
        <el-row :gutter="20">
          <el-col :span="8" :xs="24">
            <el-card >
              <div slot="header" class="clearfix">
                <span style="font-size:17px">My Information</span>
              </div>
              <br/>
              <el-form :model="myInfo" ref="mydInfo" label-width="auto" class="demo-ruleForm">
                <el-form-item label="Name:" prop="name">
                  <el-input v-model="myInfo.name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="Email:" prop="email">
                  <el-input v-model="myInfo.email" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="Phone:" prop="phone">
                  <el-input v-model="myInfo.phone" :readonly="true"></el-input>
                </el-form-item>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div style="text-align: right">
                  <el-button  type="primary" plain size="mini" @click="editMyinfo()">Edit</el-button>
                </div>
              </el-form>
            </el-card>
          </el-col>

          <el-col :span="8" :xs="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="font-size:17px">My Stores</span>
              </div>
              <div class="stores">
                <div class="store">
                  <h3 class="blue">Amamzon</h3>
                  <ul v-for="(item,index) in mystores" :key="index">
                    <li v-if="item.plataeformType == '1'">{{item.storeName}}</li>
                  </ul>
                </div>
                <div class="store">
                  <h3 class="blue">ebay</h3>
                  <ul v-for="(item,index) in mystores" :key="index">
                    <li v-if="item.plataeformType == '2'">{{item.storeName}}</li>
                  </ul>
                </div>
                <div style="text-align: right">
                  <el-button type="primary" plain @click="toAdd = true">Add a new store</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <!-- Edit My Info!!!!!!!!!! -->
      <el-dialog title="Edit My Info" :visible.sync="toedit" width="40%">
        <el-form :model="editInfo" :rules="myinfoRules" ref="editInfo" label-width="auto" class="demo-ruleForm">
          <el-form-item label="Name" prop="name">
            <el-input v-model="editInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="editInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="editInfo.phone"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="success" plain size="mini" @click="toedit = false">Cancel</el-button>
            <el-button type="success" size="mini" @click="saveMyinfo('editInfo')">Save</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- Add a new store!!!!!!!!!! -->
      <el-dialog title="Add a new store" :visible.sync="toAdd" width="40%">
        <span></span>
          <div style="margin:0 auto;text-align:left;" >
            <span></span>
            <span>Set up API connection with your store by account authorisation</span><br/>
            <br />
            <br />
            <el-select v-model="newstore.plateformType" placeholder="Choose a store" style="width:150px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <br/>
          <div style="margin:0 auto;text-align:left;">
            <span></span>
            <br/>
            <div  class="demo-input-suffix">
              <label style="width: 120px;margin-top:7px;font-size:16px" class="control-label">Store name</label><br>
              <el-input style="width:300px" placeholder v-model="newstore.storeName"></el-input>
            </div>
            <br/>
            <br/>
            <div  class="demo-input-suffix">
              <label style="width: 120px;margin-top:7px;font-size:16px" class="control-label">Seller ID</label><br>
              <el-input style="width:300px" v-model="newstore.dsrId"></el-input>
            </div>
          </div>
          <br />
          <br />
          <br />
          <span slot="footer" class="dialog-footer">
            <el-button class="pan-btn blue-btn" @click="toAdd = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="addstore()">Add</el-button>
          </span>
          <!-- <div style="float:right">
            <el-button class="pan-btn blue-btn">Empty</el-button>
            <el-button class="pan-btn tiffany-btn">Add</el-button>
          </div> -->

        <!-- </div>  -->
      </el-dialog>
    </el-container>

</template>

<script>
  import { addStore, editMyInfo, getBvoInfo, getStoreInfo } from '../../api/bvo';

    export default {
        data(){
          return{
            toAdd:false,
            myInfo:{
              name:'',
              email:'',
              phone:''
            },
            editInfo:{
              name:'',
              email:'',
              phone:''
            },
            myinfoRules:{
              name: [
                  { required: true, message: 'Can not be empty', trigger: 'blur' },
                  { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
              ],
              email: [
                  { required: true, message: 'Can not be empty', trigger: 'blur' },
                  { min: 3, max: 10, message: 'Must be 3-20 characters', trigger: 'blur' }
              ],
              phone: [
                  { required: true, message: 'Can not be empty', trigger: 'blur' },
                  { min: 3, max: 10, message: 'Must be 3-20 characters', trigger: 'blur' }
              ],
            },
            toedit:false,
            mystores:[],
            options:[
              {
                value: '1',
                label: 'Amazon'
              },
              {
                value: '2',
                label: 'eBay'
              }],
            value:'',
            newstore:{
              storeName:'',
              dsrId:0,
              plateformType:'',
            }
          }
        },

      created() {
        this.getBvoInfo();
        this.getStoreInfo();
      },
      methods:{

          getStoreInfo(){
            getStoreInfo().then( res =>{
              if (res.code === 0){
                this.mystores = res.data;
              }
            })
          },
          getBvoInfo(){
            getBvoInfo().then(res =>{
              if (res.code === 0){
                this.myInfo = res.data;
              }else {
                this.$message.error('Abnormal data echo')
              }
            })
          },
          editMyinfo() {
            this.toedit = true;
            getBvoInfo().then(res => {
              if (res.code === 0) {
                this.editInfo = res.data;
              } else {
                this.$message.error('Abnormal data echo')
              }
            })
          },
          saveMyinfo(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
              editMyInfo(this.editInfo).then(res =>{
                if (res.code === 0){
                  this.toedit = false;
                  this.getBvoInfo();
                  this.$message.success('Update succeeded');
                }else {
                  this.$message.error('Update failed')
                }
              })
            }else {
              this.$message.error('Please enter the correct information!!')
            }
          });

          },
          addstore() {
            addStore(this.newstore).then(res =>{
              if (res.code === 0){
                getStoreInfo().then(res =>{
                  if (res.code === 1){
                    this.mystores = res.data;
                  }
                })
                this.toAdd = false;
                this.$message.success('Added successfully');
              }else {
                this.$message.error('Add failed')
              }
            })
          }
        }
    }
</script>

<style>
.el-container {
  margin: 0;
  background: #fff;
  padding: 8px 20px 24px;
}
.el-main {
  padding-bottom: 0;
  background-color: #ffffff;
  font-family: "Open Sans";
  font-size: 13px;
  min-height: 100%;
  width: 100%;
}
.stores{
  margin:0 auto;
  width:50%;
}
.store {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px 0 20px 0;
  padding-left: 3%;
}
.p {
  line-height: 40px;
  color: #666;
  border-top: 1px solid #ccc;
}
.btn-primary {
    background-color: #2283c5!important;
    border-color: #2283c5;
}
.btn {
    display: inline-block;
    padding: 0 12px 1px;
    line-height: 32px;
    color: #FFF!important;
    font-size: 14px;
    background-image: none!important;
    border: 5px solid #abbac3;
    border-radius: 0!important;
    box-shadow: none!important;
    -moz-transition: all .1s ease-in-out;
    -webkit-transition: all .1s ease-in-out;
    -o-transition: all .1s ease-in-out;
    -ms-transition: all .1s ease-in-out;
    transition: all .1s ease-in-out;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
    position: relative;
}
input, button, select, textarea {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
.div{
    padding-bottom: 0;
    background-color: #e4e6e9;
    font-family: 'Open Sans';
    font-size: 13px;
    min-height: 100%;
}
.el-button{
    color: #2283c5;
}
</style>
