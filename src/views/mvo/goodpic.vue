<template>
  <el-container style='margin-left:10px'>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> Product main image & classification
          </small>
        </h1>
      </div>
    </el-header>

    <el-main>
      <span>
      Product title：
      <el-input style="width:200px" placeholder @input="search" v-model="search_username"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search"></el-button>
      <el-button type="primary" plain icon="el-icon-plus" @click="toaddpic = true">Add</el-button>
      <el-button type="primary" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deleteAll()">Delete All</el-button>
      <br />
      <br />

      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="category_name" label="Category"></el-table-column>
        <el-table-column prop="picture" label="Picture">
          <template slot-scope="scope">
            <img  :src="scope.row.picture" alt="" style="width: 150px;height: 150px">
          </template>
        </el-table-column>
        <el-table-column prop="sts_cd" label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.sts_cd == '1'"> To be stored</div>
            <div v-if="scope.row.sts_cd == '2'"> Pending</div>
            <div v-if="scope.row.sts_cd == '3'"> On the shelf</div>
          </template>
<!--          <div v-if="sts_cd == '1'"> To be stored</div>-->
<!--          <div v-if="sts_cd == '2'"> Pending</div>-->
<!--          <div v-if="sts_cd == '3'"> On the shelf</div>-->
        </el-table-column>

        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="Edit" placement="top">
              <el-button type="primary"  icon="el-icon-edit" size="mini" @click="editpic(scope.$index)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Delete" placement="top">
              <el-button type="primary" plain icon="el-icon-delete" size="mini" @click="deletepic(scope.$index)"></el-button>
            </el-tooltip>
            <el-button v-if="scope.row.sts_cd=='2'" size="mini"  @click="handleModifyStatus(scope.$index,'3')">
              ON
            </el-button>
            <el-button v-if="scope.row.sts_cd=='3'" size="mini" @click="handleModifyStatus(scope.$index,'2')">
              OFF
            </el-button>
            <el-button v-if="scope.row.sts_cd=='1'" size="mini" @click="handleModifyStatus(scope.$index,'2')">
              IN
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- 添加！！！！！！ -->
    <el-dialog title="Add product information" :visible.sync="toaddpic" width="60%">
      <el-form :model="newpic" :rules="rules" ref="newpic" label-width="auto" class="demo-ruleForm" text-align="center" >
          <el-form-item label="Product name" prop="title">
            <el-select v-model="newpic.title">
              <el-option
                v-for="item in goods"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <span class="text">Please select the product category of the GMC lending and selling platform first.
            This category determines the position of your product on the lending and selling platform </span>
          <el-form-item label="Categories" prop="category_name">
            <el-select v-model="newpic.category_name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <span class="text">图片要求： 最多可以上传12张图：eBay 12张、Amazon 9张； 分辨率1000像素（高度）X 1000像素（宽度）以上； 正方形，
            为无水印白底图或情景图，商品占图片80%； 可以是多角度拍摄商品图片，也可以是细节图</span>
          <el-form-item label="商品主图" prop="picture">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
          </el-form-item>                -->
          <div>
          <!-- 选择图片后展示 -->
          <img v-if="f" :src="f.src" width="100px" height="100px">
          <!-- 选择图片之前展示 -->
          <img v-else src="../../assets/upload.jpg" width="100px" height="100px" @click="add()">
          <input
            ref="file"
            class="value"
            style="display:none"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="getFile($event)"
          >
        <!--        <span @click="submitForm($event)">上传</span>-->
        <!--        <img :src="loadImage" width="100px" height="100px">-->
        </div>
          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="toaddpic = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="submitForm($event,'newpic')">Save</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>

    <!-- edit Picture -->
      <el-dialog title="Edit Picture" :visible.sync="toeditpic" width="40%">
        <el-form :model="editpicInfo" :rules="rules" ref="editpicInfo" label-width="auto" class="demo-ruleForm" text-align="center" >
          <el-form-item label="Product name" prop="title">
            <el-select v-model="editpicInfo.title">
              <el-option
                v-for="item in goods"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <span class="text">Please select the product category of the GMC lending and selling platform first.
            This category determines the position of your product on the lending and selling platform </span>
          <el-form-item label="Categories" prop="category_name">
            <el-select v-model="editpicInfo.category_name">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <span class="text">图片要求： 最多可以上传12张图：eBay 12张、Amazon 9张； 分辨率1000像素（高度）X 1000像素（宽度）以上； 正方形，
            为无水印白底图或情景图，商品占图片80%； 可以是多角度拍摄商品图片，也可以是细节图</span>
          <el-form-item label="商品主图" prop="picture">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
          </el-form-item>                -->
          <div>
            <!-- 选择图片后展示 -->
            <img v-if="f" :src="f.src" width="100px" height="100px">
            <!-- 选择图片之前展示 -->
            <img v-else src="../../assets/upload.jpg" width="100px" height="100px" @click="add()">
            <input
              ref="file"
              class="value"
              style="display:none"
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="getFile($event)"
            >
            <!--        <span @click="submitForm($event)">上传</span>-->
            <!--        <img :src="loadImage" width="100px" height="100px">-->
          </div>
          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="toeditpic = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="submitForm($event,'editpicInfo')">Save</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

  </el-container>
</template>

<script>
// import Dropzone from '@/components/Dropzone'
import axios from 'axios'
export default {
  // components: { Dropzone },
  data() {
    return {
      file: null,
      f: null,
      loadImage: '',
      tableData: [
        {
          title: "MP3",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2071684813,1084763777&fm=26&gp=0.jpg",
          sts_cd: "2"
        },
        {
          title: "电饭锅",
          category_name:"电器",
          picture:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3077643480,3270535916&fm=26&gp=0.jpg",
          sts_cd: "3"
        },
        {
          title: "耳机",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3936480169,2097530407&fm=26&gp=0.jpg",
          sts_cd: "2"
        },
        {
          title: "MP3",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2071684813,1084763777&fm=26&gp=0.jpg",
          sts_cd: "1"
        },
      ],
      goods:[
        {
          value: '1111',
          label: '1111'
        },
        {
          value: '2222',
          label: '2222'
        },
        {
          value: '3333',
          label: '3333'
        },
      ],
      options: [{
          value: '日配加工食品',
          label: '日配加工食品'
        },{
          value: '一般食品',
          label: '一般食品'
        },{
          value: '日用杂货',
          label: '日用杂货'
        },{
          value: '日用百货',
          label: '日用百货'
        },{
          value: '家用电器',
          label: '家用电器'
        },{
          value: '数码电子',
          label: '数码电子'
        },{
          value: '畜产',
          label: '畜产'
        },{
          value: '水产',
          label: '水产'
        },{
          value: '果菜',
          label: '果菜'
        }],
      orginTableData: [],
      toaddpic: false,
      toeditpic:false,
      multipleSelection: [],
      newpic:{
        title:'',
        category_name:'',
        picture:'',
        sts_cd:'1'
      },
      editpicInfo:{
        title:'',
        category_name:'',
        picture:'',
        index:''
      },
      rules: {
          title: [
            { required: true, message: 'Please select product', trigger: 'change' }
          ],
          category_name: [
            { required: true, message: 'Please select product category', trigger: 'change' }
          ],
      },
    };
  },
  mounted() {},
  methods: {
    add() {
      this.$refs.file.click()
    },
    getFile(event) {
      this.file = event.target.files[0]
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      }
      this.html5Reader(this.file, item)
      this.f = item
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader()
      reader.onload = e => {
        this.$set(item, 'src', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    submitForm(event, formName) {
      console.log('================================')
      event.preventDefault()
      var formData = new FormData()
      formData.append('file', this.file)
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios
        .post('http://localhost:8181/img/upload', formData, config)
        .then(res => {
          if (res.data.code === 200) {
            try {
              if (res.data.message !== 'undefined') {
                this.loadImage = 'http://localhost:8181/img/getImage/' + res.data.message
                if (formName === 'newpic') {
                  this.addpic(this.loadImage)
                } else if (formName === 'editpicInfo') {
                  this.addbrand(this.loadImage)
                }
              }
            } catch (e) {
              console.log('捕获到异常：', e)
            }
          } else {
            console.log('失败' + 400)
          }
        })
    },
    addpic(imgPath) {
      this.$refs['newpic'].validate((valid) => {
        if (valid) {
          var productDetailVo = {
            title: '',
            category_name: '',
            url: '',
            sts_cd: '1'
          }
          productDetailVo.title = this.newpic.name
          productDetailVo.category_name = this.newpic.sort
          productDetailVo.url = this.newpic.picture
          productDetailVo.sts_cd = this.newpic.status
          this.$store.dispatch('mvo/addProductDetail', productDetailVo)
            .then(() => {
            })
            .catch(() => {
            })
          this.f = ''
          this.toaddpic = false
          this.tableData.push({
            name: this.newpic.name,
            sort: this.newpic.sort,
            picture: this.newpic.picture,
            status: this.newpic.status
          })
          console.log(this.tableData)
          this.$message({
            message: 'Added successfully',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          alert('Please fill in the information correctly!!')
          return false
        }
        this.newpic = {
          name: '',
          sort: '',
          picture: ''
        }
      })
    },

    editpic(i) {
      this.toeditpic = true;
      this.editpicInfo.title = this.tableData[i].title;
      this.editpicInfo.category_name = this.tableData[i].category_name;
      this.editpicInfo.picture = this.tableData[i].picture;
      this.editpicInfo.index = i;
      console.log(this.editpicInfo);
    },
    savepicEdit(imgPaht) {
      this.$refs['editpicInfo'].validate((valid) => {
        if (valid) {
          var productDetailVo = {
            title: '',
            category_name: '',
            url: '',
            sts_cd: 'A'
          }
          productDetailVo.title = this.newpic.name
          productDetailVo.category_name = this.newpic.sort
          productDetailVo.url = this.newpic.picture
          productDetailVo.sts_cd = this.newpic.status
          this.$store.dispatch('mvo/addProductDetail', productDetailVo)
            .then(() => {
            })
            .catch(() => {
            })
          this.f = ''
          var i = this.editpicInfo.index
          this.tableData[i].name = this.editpicInfo.name
          this.tableData[i].sort = this.editpicInfo.sort
          this.tableData[i].picture = this.editpicInfo.picture
          this.toeditpic = false
          this.$message({
            message: 'Modification succeeded',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          alert('Please fill in the information correctly!!')
          return false
        }
      })
    },
    submitProductDetail() {
      this.productDetailVo.url = this.loadImage
      this.$store.dispatch('mvo/addProductDetail', this.productDetailVo)
        .then(() => {
        })
        .catch(() => {
        })
      this.dialogVisible = false
    },
    handleModifyStatus(i, sts_cd) {
      this.$message({
        message: 'Operation succeeded',
        type: 'success'
      });
      this.tableData[i].sts_cd = sts_cd
    },

    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    deleteall(){

    },
    deletepic(i) {
        this.$confirm('Are you sure you want to delete this product?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(i, 1);
          this.$message({
            type: 'success',
            message: 'Deletion succeeded!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Deletion cancelled'
          });
        });
    },
    deleteAll(){
        this.$confirm('Are you sure you want to delete these items?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].title === item.title) {
                this.tableData.splice(i, 1);
                 break;
              }
            }
          });
          this.multipleSelection = [];
          this.$message({
            type: 'success',
            message: 'Deletion succeeded!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Deletion cancelled'
          });
        });
    },
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
  font-size:8px
}

</style>
