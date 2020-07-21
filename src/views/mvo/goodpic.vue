<template>
  <el-container style='margin-left:10px'>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          品牌商MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> 商品主图&分类
          </small>
        </h1>
      </div>
    </el-header>

    <el-main>
      <span>
      商品标题title：
      <el-input style="width:200px" placeholder @input="search" v-model="search_username"></el-input>
      </span>
      <el-button type="success" icon="el-icon-search"></el-button>
<!--      <el-button type="success" plain icon="el-icon-plus" @click="add_1()">Add</el-button>-->
      <el-button type="success" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deleteAll()">Delete All</el-button>
      <br />
      <br />

      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="proId" v-if="false" />
        <el-table-column prop="title" label="商品标题"></el-table-column>
        <el-table-column prop="category_name" label="类别"></el-table-column>
        <el-table-column prop="ufl" label="图片">
          <template slot-scope="scope">
            <img  :src="scope.row.url" alt="" style="width: 150px;height: 150px">
          </template>
        </el-table-column>
        <el-table-column prop="sts_cd" label="状态">
          <template slot-scope="scope">
          <p v-if="scope.row.sts_cd === '1'">待入库</p>
          <p v-if="scope.row.sts_cd === '2'">待上架</p>
          <p v-if="scope.row.sts_cd === '3'">上架中</p>
          </template>
        </el-table-column>

        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="Edit" placement="top">
              <el-button type="success"  icon="el-icon-edit" size="mini" @click="editpic(scope.$index)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Delete" placement="top">
              <el-button type="success" plain icon="el-icon-delete" size="mini" @click="deletepic(scope.$index)"></el-button>
            </el-tooltip>
            <el-button v-if="scope.row.sts_cd=='2'" size="mini" type="success" @click="handleModifyStatus(scope.$index,'3')">
              上架
            </el-button>
            <el-button v-if="scope.row.sts_cd=='3'" size="mini" @click="handleModifyStatus(scope.$index,'2')">
              下架
            </el-button>
            <el-button v-if="scope.row.sts_cd=='1'" size="mini" @click="handleModifyStatus(scope.$index,'2')">
              入仓
            </el-button>            
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    
    <!-- 添加！！！！！！ -->
<!--    <el-dialog title="添加商品信息" :visible.sync="toaddpic" width="60%">-->
<!--      <el-form :model="newpic" :rules="rules" ref="newpic" label-width="auto" class="demo-ruleForm" text-align="center" >-->
<!--          <el-form-item label="Product name" prop="title">-->
<!--            <el-select v-model="newpic.title">-->
<!--              <el-option-->
<!--                v-for="item in goods"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <span class="text">请先选择GMC借卖平台商品大类，此分类决定了您的商品在借卖平台中展示的位置</span>-->
<!--          <el-form-item label="商品分类" prop="category_name">-->
<!--            <el-select v-model="newpic.category_name">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash; <span class="text">图片要求： 最多可以上传12张图：eBay 12张、Amazon 9张； 分辨率1000像素（高度）X 1000像素（宽度）以上； 正方形，-->
<!--            为无水印白底图或情景图，商品占图片80%； 可以是多角度拍摄商品图片，也可以是细节图</span>-->
<!--          <el-form-item label="商品主图" prop="picture">-->
<!--            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />-->
<!--          </el-form-item>                &ndash;&gt;-->
<!--          <div>-->
<!--          &lt;!&ndash; 选择图片后展示 &ndash;&gt;-->
<!--          <img v-if="f" :src="f.src" width="100px" height="100px">-->
<!--          &lt;!&ndash; 选择图片之前展示 &ndash;&gt;-->
<!--          <img v-else src="../../assets/upload.jpg" width="100px" height="100px" @click="add()">-->
<!--          <input-->
<!--            ref="file"-->
<!--            class="value"-->
<!--            style="display:none"-->
<!--            type="file"-->
<!--            accept="image/*"-->
<!--            multiple="multiple"-->
<!--            @change="getFile($event)"-->
<!--          >-->
<!--        &lt;!&ndash;        <span @click="submitForm($event)">上传</span>&ndash;&gt;-->
<!--        &lt;!&ndash;        <img :src="loadImage" width="100px" height="100px">&ndash;&gt;-->
<!--        </div>-->
<!--          <el-form-item style="text-align:center" >-->
<!--            <el-button class="pan-btn blue-btn" @click="toaddpic = false">Cancel</el-button>-->
<!--            <el-button class="pan-btn tiffany-btn" @click="submitForm($event,'newpic')">Save</el-button>-->
<!--          </el-form-item>-->
<!--      </el-form> -->
<!--    </el-dialog>-->

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
          <span class="text">请先选择GMC借卖平台商品大类，此分类决定了您的商品在借卖平台中展示的位置</span>
          <el-form-item label="商品分类" prop="category_name">
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
import { alterProductDetail, getProductDetail, getMyInfo, alterBrand, deleteBrand } from '../../api/mvo';

export default {
  // components: { Dropzone },
  data() {
    return {
      file: null,
      f: null,
      loadImage: '',
      tableData: [
        /*{
          title: "MP3",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2071684813,1084763777&fm=26&gp=0.jpg", 
          sts_cd: "待上架" 
        },
        { 
          title: "电饭锅",
          category_name:"电器",
          picture:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3077643480,3270535916&fm=26&gp=0.jpg", 
          sts_cd: "上架" 
        },
        { 
          title: "耳机",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3936480169,2097530407&fm=26&gp=0.jpg", 
          sts_cd: "待上架"
        },
        { 
          title: "MP3",
          category_name:"电子产品",
          picture:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2071684813,1084763777&fm=26&gp=0.jpg", 
          sts_cd: "待入仓" 
        },*/
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
      // toaddpic: false,
      toeditpic:false,
      multipleSelection: [],
      // newpic:{
      //   title:'',
      //   category_name:'',
      //   picture:'',
      //   sts_cd:'1'
      // },
      editpicInfo:{
        proId:0,
        title:'',
        category_name:'',
        url:'',
        index:'',
        sts_cd:''
      },
      rules: {
          title: [
            { required: true, message: '请选择商品', trigger: 'change' }
          ],
          category_name: [
            { required: true, message: '请选择商品类别', trigger: 'change' }
          ],         
      },
    };
  },
  mounted() {},
  created() {
    this.getProductDetail()
  },
  methods: {
    getProductDetail(){
      const userId = localStorage.getItem('userId')
      this.goods=[]
      getProductDetail(userId).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          for (let i = 0; i <res.data.total; i++) {
            var newGood={
              label:res.data.list[i].title,
              value:res.data.list[i].title
            }
            console.log(newGood)
            this.goods.push(newGood)
          }

        }
      })
    },
    add() {
      this.$refs.file.click()
    },
    // add_1(){
    //   this.toaddpic=true
    // },
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
      if (this.f === null) {
          this.savepicEdit(null)
      } else {
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
                          this.savepicEdit(this.loadImage)
                      }
                    } catch (e) {
                      console.log('捕获到异常：', e)
                    }
                  } else {
                    console.log('失败' + 400)
                  }
                })
      }
    },
    // addpic(imgPath) {
    //   this.$refs['newpic'].validate((valid) => {
    //     if (valid) {
    //       var productDetailVo = {
    //         proId:0,
    //         title: '',
    //         category_name: '',
    //         url: '',
    //         sts_cd: '1'
    //       }
    //       productDetailVo.title = this.newpic.title
    //       productDetailVo.category_name = this.newpic.category_name
    //       productDetailVo.url = imgPath
    //       productDetailVo.sts_cd = this.newpic.sts_cd
    //       alterProductDetail(productDetailVo,localStorage.getItem("userId")).then(res => {
    //         if (res.code === 200) {
    //           this.tableData = res.data.list
    //           this.f = ''
    //           this.toaddpic = false
    //           console.log(this.tableData)
    //           this.tableData=[]
    //           this.getProductDetail()
    //           this.$message({
    //             message: '添加成功',
    //             type: 'success'
    //           })
    //       }
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       alert('请正确填写信息!!')
    //       return false
    //     }
    //     this.newpic = {
    //       name: '',
    //       sort: '',
    //       picture: ''
    //     }
    //   })
    // },
    //
    editpic(i) {
      this.toeditpic = true;
      this.editpicInfo.proId=this.tableData[i].proId;
      this.editpicInfo.title = this.tableData[i].title;
      this.editpicInfo.category_name = this.tableData[i].category_name;
      this.editpicInfo.url = this.tableData[i].url;
      this.editpicInfo.sts_cd=this.tableData[i].sts_cd
      this.editpicInfo.index = i;
      console.log(this.editpicInfo);
    },
    savepicEdit(imgPath) {
      this.$refs['editpicInfo'].validate((valid) => {
        if (valid) {
          if (imgPath != null) {
            this.editpicInfo.url = imgPath
          }
          var productDetailVo = {
            proId: 0,
            title: '',
            category_name: '',
            url: '',
            sts_cd: ''
          }
          productDetailVo.proId = this.editpicInfo.proId
          productDetailVo.title = this.editpicInfo.title
          productDetailVo.category_name = this.editpicInfo.category_name
          productDetailVo.url = this.editpicInfo.url
          productDetailVo.sts_cd = this.editpicInfo.sts_cd
          alterProductDetail(productDetailVo, localStorage.getItem("userId")).then(res => {
            if (res.code === 200) {
              this.f = ''
              this.toeditpic = false
              this.tableData = []
              this.getProductDetail()
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
        }
        else {
          console.log('error submit!!')
          alert('请正确填写信息!!')
          return false
        }
      })
    },
   /* submitProductDetail() {
      this.productDetailVo.url = this.loadImage
      this.$store.dispatch('mvo/addProductDetail', this.productDetailVo)
        .then(() => {
        })
        .catch(() => {
        })
      this.dialogVisible = false
    },*/
    handleModifyStatus(i, sts_cd) {
      var productDetailVo = {
        proId: 0,
        title: '',
        category_name: '',
        url: '',
        sts_cd: ''
      }
      productDetailVo.proId = this.tableData[i].proId
      productDetailVo.title = this.tableData[i].title
      productDetailVo.category_name = this.tableData[i].category_name
      productDetailVo.url = this.tableData[i].url
      productDetailVo.sts_cd = sts_cd
      const userId = localStorage.getItem('userId')
      alterProductDetail(productDetailVo, userId).then(res => {
        if(res.code==200){
          this.$message({
            message: '操作Success',
            type: 'success'
          });
          this.tableData[i].sts_cd = sts_cd
        }
      })
    },

   /* dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },*/
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    deleteall(){
      
    },
    deletepic(i) {
        this.$confirm('是否确认删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var productDetailVo = {
            proId: 0,
            title: '',
            category_name: '',
            url: '',
            sts_cd: ''
          }
          productDetailVo.proId = this.tableData[i].proId
          productDetailVo.title = this.tableData[i].title
          productDetailVo.category_name = this.tableData[i].category_name
          productDetailVo.url = this.tableData[i].url
          productDetailVo.sts_cd = '4'
          const userId = localStorage.getItem('userId')
          alterProductDetail(productDetailVo, userId).then(res => {
            if(res.code===200){
              this.tableData=[]
              this.getProductDetail()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }
          )

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteAll(){
        this.$confirm('是否确认删除这些商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].title === item.title) {
                var productDetailVo = {
                  proId: 0,
                  title: '',
                  category_name: '',
                  url: '',
                  sts_cd: ''
                }
                productDetailVo.proId = item.proId
                productDetailVo.title = item.title
                productDetailVo.category_name = item.category_name
                productDetailVo.url = item.url
                productDetailVo.sts_cd = '4'
                const userId = localStorage.getItem('userId')
                alterProductDetail(productDetailVo, userId)
              }
              if(i===this.tableData.length-1){
                this.tableData=[]
                this.getProductDetail()
                this.multipleSelection = [];
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
