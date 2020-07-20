<template>
  <el-container style='margin-left:10px'>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i>  Company Information
          </small>
        </h1>
      </div>
    </el-header>

    <el-main>
      <span>
      公司信息Company Information：
      </span>
      <br />
      <br />
      <el-table :data="companyInfo" style="width: 100%" highlight-current-row>
        <el-table-column prop="name_cn" label="Company Name(zh))"></el-table-column>
        <el-table-column prop="name_en" label="Company Name(en)"></el-table-column>
        <el-table-column prop="gmc_report_type" label="GMC Report Type"></el-table-column>
        <el-table-column prop="gmc_report_url" label="GMC Report Url"></el-table-column>
        <el-table-column prop="description" label="description"></el-table-column>
        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-button type="primary"   icon="el-icon-edit" size="mini" to="/mvo/mvo-myInfo" @click="editcompany(scope.row)"></el-button>
          </template>
        </el-table-column>

      </el-table>
      <br/>
      <br/>
      <span>
        品牌信息Brand Information：
      </span>
      <br/>
      <br/>
      <el-table :data="brandInfo" style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="name_en"  label="品牌名称Brand Name"></el-table-column>
        <el-table-column prop="url" label="品牌图片Brand Logo">
          <template slot-scope="scope">
            <img  :src="scope.row.url" alt="" style="width: 150px;height: 150px">
          </template>
        </el-table-column>
        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-button type="primary" plain  icon="el-icon-edit" size="mini" @click="editbrand(scope.$index)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deletebrand(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-button type="primary" plain icon="el-icon-plus" @click="toaddbrand = true">Add</el-button>
      <el-button type="primary" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deleteAll()">Delete All</el-button>
    </el-main>


    <!-- Add Brand -->
    <el-dialog title="Add Brand" :visible.sync="toaddbrand" width="40%">
      <span>
        <el-form :model="newbrand" :rules="brandRules" ref="newbrand" label-width="auto" class="demo-ruleForm">
          <el-form-item label="Brand Name" prop="brandName">
            <el-input v-model="newbrand.brandName"></el-input>
          </el-form-item>
          <span style="color:red;font-size:12px">The recommended image size and format is 150*150 jpg/png</span>
          <!-- <el-form-item label-width="0px">
            <span style="color:red;font-size:12px">建议图片大小150*150的jpg/png格式</span>
          </el-form-item> -->
          <el-form-item label="Brand Logo" prop="logo">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
          </el-form-item>
          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="dialogVisible = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="addbrand('newbrand')">Save</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>

    <!-- edit Brand -->
    <el-dialog title="Edit Brand" :visible.sync="toeditbrand" width="40%">
      <span>
        <el-form :model="editbrandInfo" :rules="brandRules" ref="editbrandInfo" label-width="auto" class="demo-ruleForm">
          <el-form-item label="Brand Name" prop="brandName">
            <el-input v-model="editbrandInfo.brandName"></el-input>
          </el-form-item>
          <span style="color:red;font-size:12px">The recommended image size and format is 150*150 jpg/png</span>
          <!-- <el-form-item label-width="0px">
            <span style="color:red;font-size:12px">建议图片大小150*150的jpg/png格式</span>
          </el-form-item> -->
          <el-form-item label="Brand Logo" prop="logo">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
          </el-form-item>
          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="editbrand = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="savebrandEdit('editbrandInfo')">Save</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>

    <!-- edit company info -->

    <el-dialog title="Company Information" :visible.sync="changeCompanyinfo" width="50%">
      <el-form :model="editcompanyInfo" :rules="companyRules" ref="editcompanyInfo" label-width="auto" class="demo-ruleForm" >
          <el-form-item label="Company Name(en)" prop="name_en">
            <el-input v-model="editcompanyInfo.name_cn"></el-input>
          </el-form-item>
          <el-form-item label="Company Name(zh)" prop="name_zh">
            <el-input v-model="editcompanyInfo.name_en"></el-input>
          </el-form-item>
          <el-form-item label="Brief Introduction" prop="introduction">
            <markdown-editor ref="markdownEditor" v-model="editcompanyInfo.description" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
          </el-form-item>
          <el-form-item label="GMC Report Type" prop="reportType">
            <el-input v-model="editcompanyInfo.gmc_report_type"></el-input>
          </el-form-item>
          <el-form-item label="GMC Report Url" prop="reportUrl">
            <el-input v-model="editcompanyInfo.gmc_report_url"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button class="pan-btn blue-btn" @click="changeinfo = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="savecompanyEdit('editcompanyInfo')">Save</el-button>
          </el-form-item>
      </el-form>

    </el-dialog>
  </el-container>
</template>

<script>
import Dropzone from '@/components/Dropzone'
import MarkdownEditor from '@/components/MarkdownEditor'
import { getMyInfo } from '../../api/mvo';
import { getBrand, saveCompanyEdit } from '../../api/bvo';
export default {
  components: { MarkdownEditor,Dropzone },
  data() {
    return {
      companyInfo: [
        {
          // name_zh:"老干妈",
          // name_en: "Laoganma",
          // introduction:'好好好好',
          // reportType: 34,
          // reportUrl: 8888
        }
      ],

      brand:{
        pageNum:1,
        pageSize:10,
      },

      newbrand: {
        brandName:'',
        logo:'',
      },
      editbrandInfo: {
        brandName:'',
        logo:'',
        index:''
      },
      companyRules: {
          name_cn: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            // { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          name_en: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            // { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          gmc_report_type: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          gmc_report_url: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            // { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          description: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
      },
      brandRules:{
        brandName: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
      },
      brandInfo: [
      ],
      editcompanyInfo:{
        name_zh:'',
        name_en: '',
        introduction:'',
        reportType:'',
        reportUrl: '',
        index:''
      },
      multipleSelection: [],
      toaddbrand: false,
      toeditbrand:false,
      changeCompanyinfo:false,
      // editBrand = false,
      deleteBrand:false,
      brandName:'',


    };
  },
  // create(){
  //   axios.get('http://localhost8181/brand/brandList')
	// 						.then(res=>{
	// 							//inside arrow function(new feature in es6), this==app
	// 							this.brandInfo = res.data
	// 						})

	// 						.catch(function(err){

	// 						})
  // },
  mounted() {},
  created() {
    this.getMyInfo();
    this.getBrand();
  },
  methods: {

    getBrand(){
      let userId = localStorage.getItem('userId');
      this.brand.userId = userId;
      getBrand(userId).then(res =>{
        if (res.code === 200){
          this.brandInfo = res.data.list;
        }
      })
    },

    getMyInfo(){
      let userId = localStorage.getItem('userId');
      getMyInfo(userId).then(res =>{
        if (res.code === 200){
          this.companyInfo = [res.data];
        }else {
          this.$message.error('数据回显异常');
        }
      })
    },

    editcompany(row) {
      this.editcompanyInfo = row;
      this.changeCompanyinfo = true;
    },
    savecompanyEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editcompanyInfo.userId = localStorage.getItem('userId');
            saveCompanyEdit(this.editcompanyInfo).then(res =>{
              if (res.code === 200){
                this.changeCompanyinfo = false;
                this.$message.success('更新成功');
              }else {
                this.$message.error('更新失败')
              }
            })
          } else {
            console.log('error submit!!');
            alert('请正确填写信息!!');
            return false;
          }
        });
    },
    addbrand(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.toaddbrand = false;
            this.brandInfo.push({
              bName:this.newbrand.brandName,
              logo:this.newbrand.logo,
            });
            console.log(this.brandInfo);
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            alert('请正确填写信息!!');
            return false;
          }
          this.newbrand = {
              brandName: '',
              logo: '',
          };
       });
    },
    editbrand(i) {
      // this.editcompanyInfo = this.companyInfo;
      this.editbrandInfo.brandName = this.brandInfo[i].bName;
      this.editbrandInfo.logo = this.brandInfo[i].bLogo;
      this.editbrandInfo.index = i
      this.toeditbrand = true;


      console.log(this.editbrandInfo);
    },
    savebrandEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var i = this.editbrandInfo.index;
            this.brandInfo[i].bName = this.editbrandInfo.brandName;
            this.brandInfo[i].bLogo = this.editbrandInfo.logo;
            this.toeditbrand = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            alert('信息不能为空!!');
            return false;
          }
        });
    },
    deletebrand(i) {
      this.$confirm('是否确认删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.brandInfo.splice(i, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    deleteAll(){
        this.$confirm('是否确认删除这些商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            for (let i = 0; i < this.brandInfo.length; i++) {
              if (this.brandInfo[i].bName === item.bName) {
                this.brandInfo.splice(i, 1);
                 break;
              }
            }
          });
          this.multipleSelection = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    // changeinfo(){
    //   changeinfo = true;

    // }
  }
};
</script>

<style>
.container{
  margin-left:20px;
}
.top {
  display: flex;
  flex-direction: row;
  width: 20%;
  font-size: 15px;
  font-weight: bold;
  justify-content: space-between;
}
.text{
  color:red;
  font-size:12px
}

</style>
