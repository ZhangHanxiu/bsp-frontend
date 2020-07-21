<template>
  <el-container style='margin-left:10px'>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> Goods Input
          </small>
        </h1>
      </div>
    </el-header>

    <el-main>
      <span>
      Title：
      <el-input style="width:200px" placeholder @input="search" v-model="search"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search" @click="searchgood()"></el-button>
      <el-button type="primary" plain icon="el-icon-plus" @click="add = true">add</el-button>
      <el-button type="primary" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deleteAll()">Delete All</el-button>

      <br />
      <br />
      <el-table :data="searchInfo" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" />
        <!-- <el-table-column prop="id" sortable label="ID"></el-table-column> -->
        <el-table-column prop="title" label="Name"></el-table-column>
        <el-table-column prop="retail_price" label="Price"></el-table-column>
        <el-table-column prop="stock" label="Stock"></el-table-column>
        <el-table-column prop="sku_cd" label="SKU"></el-table-column>

        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="Edit" placement="top">
              <el-button type="primary"  icon="el-icon-edit" size="mini" @click="editgoods(scope.$index)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Delete" placement="top">
              <el-button type="primary" plain icon="el-icon-delete" size="mini" @click="deletegood(scope.$index)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- edit goods -->
    <el-dialog title="Edit" :visible.sync="edit" width="45%">
      <el-form :model="editgood" :rules="rules" ref="editgood" label-width="auto" class="demo-ruleForm" text-align="center">
          <span class="text">Product title contains search keywords, brand name, color, size, model</span>
          <el-form-item label="Product name" prop="title">
            <el-input v-model="editgood.title"></el-input>
          </el-form-item>
          <el-form-item label="SKU" prop="sku_cd">
            <el-input v-model="editgood.sku_cd"></el-input>
          </el-form-item>
          <el-form-item label="UPC" prop="upc">
            <el-input v-model="editgood.upc"></el-input>
          </el-form-item>
          <el-form-item label="EAN" prop="ean">
            <el-input v-model="editgood.ean"></el-input>
          </el-form-item>
          <el-form-item label="Volume weight">
            <el-col :span="11">
              <el-form-item label="Length" prop="length" size="mini">
                <el-input v-model="editgood.length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Height" prop="height" size="mini">
                <el-input v-model="editgood.height"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Width" prop="width" size="mini">
                <el-input v-model="editgood.width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Weight " prop="weight" size="mini">
                <el-input v-model="editgood.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Model" prop="model">
            <el-input v-model="editgood.model"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="retail_price">
            <el-input v-model="editgood.retail_price"></el-input>
          </el-form-item>
          <el-form-item label="Stock" prop="stock">
            <el-input v-model="editgood.stock"></el-input>
          </el-form-item>
          <el-form-item label="Warranty Period" prop="warranty_day">
            <el-input v-model="editgood.warranty_day"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <markdown-editor ref="markdownEditor" v-model="editgood.description" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
          </el-form-item>
          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="edit = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="saveEdit('editgood')">Save</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>

    <!-- Add goods -->
    <el-dialog title="Add" :visible.sync="add" width="45%">
      <el-form :model="newgood" :rules="rules" ref="newgood" label-width="auto" class="demo-ruleForm" text-align="center">
          <span class="text">Product title contains search keywords, brand name, color, size, model</span>
          <el-form-item label="Product name" prop="title">
            <el-input v-model="newgood.title"></el-input>
          </el-form-item>
          <el-form-item label="SKU" prop="sku_cd">
            <el-input v-model="newgood.sku_cd"></el-input>
          </el-form-item>
          <span class="text">Brands can choose not to provide UPC and ean codes</span>
          <el-form-item label="UPC" prop="upc">
            <el-input v-model="newgood.upc"></el-input>
          </el-form-item>
          <el-form-item label="EAN" prop="ean">
            <el-input v-model="newgood.ean"></el-input>
          </el-form-item>
          <el-form-item label="Volume weight">
            <el-col :span="11">
              <el-form-item label="Length" prop="length" size="mini">
                <el-input v-model="newgood.length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Height" prop="height" size="mini">
                <el-input v-model="newgood.height"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Width" prop="width" size="mini">
                <el-input v-model="newgood.width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Weight " prop="weight " size="mini">
                <el-input v-model="newgood.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Model" prop="model">
            <el-input v-model="newgood.model"></el-input>
          </el-form-item>
          <span class="text">Before the goods are officially put on the shelves, please review the borrowing price and select the validity period of the borrowing price</span>
          <el-form-item label="Price" prop="retail_price">
            <el-input v-model="newgood.retail_price"></el-input>
          </el-form-item>
          <el-form-item label="Stock" prop="stock">
            <el-input v-model="newgood.stock"></el-input>
          </el-form-item>
          <span class="text">Promise of commodity quality guarantee will greatly enhance market confidence (not available)</span>
          <el-form-item label="Warranty Period" prop="warranty_day">
            <el-input v-model="newgood.warranty_day"></el-input>
          </el-form-item>
          <span class="text">Note: product details can be pushed with pictures and text</span>
          <el-form-item label="Description" prop="description">
            <markdown-editor ref="markdownEditor" v-model="newgood.description" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
          </el-form-item>

          <el-form-item style="text-align:center" >
            <el-button class="pan-btn blue-btn" @click="add = false">Cancel</el-button>
            <el-button class="pan-btn tiffany-btn" @click="addgood('newgood')">Save</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { getProduct } from '../../api/bvo';
import { alterGood, getMvoProduct } from '../../api/mvo';
export default {
  components: { MarkdownEditor },
  data() {
    return {
      newgood:{
        proId:0,
        title: '',
        retail_price: '',
        stock: '',
        sku_cd: '',
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:'1',
      },
      goodsInfo: [
      // {
      //   title: "phone",
      //   retail_price: 3400,
      //   stock: 8888,
      //   sku_cd: "GM001031",
      //   upc:'',
      //   ean:'',
      //   length:'',
      //   height:'',
      //   width:'',
      //   weight:'',
      //   model:'',
      //   warranty_day:'',
      //   description:'',
      //   sts_cd:''
      // },
      // {
      //   title: "huawei",
      //   retail_price: 3900,
      //   stock: 88,
      //   sku_cd: "GM001031",
      //   upc:'',
      //   ean:'',
      //   length:'',
      //   height:'',
      //   width:'',
      //   weight:'',
      //   model:'',
      //   warranty_day:'',
      //   description:'',
      //   sts_cd:''
      // },
      // {
      //   title: "iphone",
      //   retail_price: 5500,
      //   stock: 80,
      //   sku_cd: "GM001031",
      //   upc:'',
      //   ean:'',
      //   length:'',
      //   height:'',
      //   width:'',
      //   weight:'',
      //   model:'',
      //   warranty_day:'',
      //   description:'',
      //   sts_cd:''
      // },
      // {
      //   title: "iphone",
      //   retail_price: 5500,
      //   stock: 80,
      //   sku_cd: "GM001031",
      //   upc:'',
      //   ean:'',
      //   length:'',
      //   height:'',
      //   width:'',
      //   weight:'',
      //   model:'',
      //   warranty_day:'',
      //   description:'',
      //   sts_cd:''
      // }
      ],
      searchInfo:{
        title:'',
        retail_price:'',
        stock:'',
        sku_cd:'',
      },
      editgood:{
        proId:0,
        title:'',
        retail_price:0,
        stock:0,
        sku_cd:'',
        upc:'',
        ean:'',
        length:0,
        height:0,
        width:0,
        weight:0,
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:'1',
      },
      edit:false,
      orginTableData: [],
      add: false,
      multipleSelection: [],
      search:'',

      rules: {
          title: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          upc: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          sku_cd: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          ean: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          model: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
            { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
          ],
          retail_price: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          length: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          height: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          width: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          weight: [
            { required: true, message: ' ', trigger: 'blur' },
          ]


      },

    };
  },
  created(){
    this.getMvoProduct();
  },
  mounted() {},
  methods:{
      getMvoProduct(){
          getMvoProduct().then(res =>{
              if (res.code === 200){
                  this.searchInfo = res.data.list;
              }
          })
      },

    addgood(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alterGood(this.newgood,localStorage.getItem("userId")).then(res =>{
                if (res.code ===200){
                    this.add = false
                    this.getMvoProduct()
                    this.$message.success('Saved successfully');
                }else {
                    this.$message.error('Save failed')
                }
            }) ;
          } else {
            console.log('error submit!!');
            alert('Please fill in the information correctly!!');
            return false;
          }
        });


    },
    editgoods(i) {
      this.edit = true;
      console.log(this.searchInfo[i])
      this.editgood.proId=this.searchInfo[i].proId;
      this.editgood.title = this.searchInfo[i].title;
      this.editgood.retail_price = this.searchInfo[i].retail_price;
      this.editgood.stock = this.searchInfo[i].stock;
      this.editgood.sku_cd = this.searchInfo[i].sku_cd;
      this.editgood.upc = this.searchInfo[i].upc;
      this.editgood.ean = this.searchInfo[i].ean;

      this.editgood.length = this.searchInfo[i].length;
      this.editgood.width = this.searchInfo[i].width;
      this.editgood.height = this.searchInfo[i].height;
      this.editgood.weight = this.searchInfo[i].weight;

      this.editgood.model = this.searchInfo[i].model;
      this.editgood.warranty_day = this.searchInfo[i].warranty_day;
      this.editgood.description = this.searchInfo[i].description;
      this.editgood.sts_cd=this.searchInfo[i].sts_cd
      console.log(this.editgood);
    },
    saveEdit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.editgood)
              alterGood(this.editgood,localStorage.getItem("userId")).then(res => {
                  if (res.code === 200) {
                      this.edit = false;
                      this.getMvoProduct()
                      this.$message({
                          message: 'Modification succeeded',
                          type: 'success'
                      });
                  }
              })

          } else {
            console.log('error submit!!');
            alert('Please fill in the information correctly!!');
            return false;
          }
        });

    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    deleteAll(){
        this.$confirm('Are you sure you want to delete these items?', 'Tips', {
          confirmButtonText: 'Yse',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            for (let i = 0; i < this.searchInfo.length; i++) {
              if (this.searchInfo[i].title === item.title) {
                  var productVo = {
                      proId: item.proId,
                      sku_cd: item.sku_cd,
                      title: item.title,
                      upc: item.upc,
                      Ean: item.ean,
                      model: item.model,
                      warranty_day: item.warranty_day,
                      retail_price: item.retail_price,
                      description: item.description,
                      width: item.width,
                      height: item.height,
                      length: item.length,
                      weight: item.weight,
                      stock: item.stock,
                      sts_cd: '4'
                  }
                  alterGood(productVo, localStorage.getItem("userId"))
              }
            }
          }).then(()=> {
              this.searchInfo = []
              this.getMvoProduct()
              this.multipleSelection = [];
              this.$message({
                  type: 'success',
                  message: 'Deletion succeeded!'
              });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Deletion cancelled'
          });
        });
    },
    deletegood(i) {
        this.$confirm('Are you sure you want to delete this product?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          var productVo={
              proId: this.searchInfo[i].proId,
              sku_cd: this.searchInfo[i].sku_cd,
              title: this.searchInfo[i].title,
              upc: this.searchInfo[i].upc,
              Ean: this.searchInfo[i].ean,
              model: this.searchInfo[i].model,
              warranty_day: this.searchInfo[i].warranty_day,
              retail_price: this.searchInfo[i].retail_price,
              description: this.searchInfo[i].description,
              width: this.searchInfo[i].width,
              height: this.searchInfo[i].height,
              length: this.searchInfo[i].length,
              weight: this.searchInfo[i].weight,
              stock: this.searchInfo[i].stock,
              sts_cd: '4'
          }
          alterGood(productVo,localStorage.getItem("userId")).then(res => {
              if (res.code === 200) {
                  this.add = false
                  this.getMvoProduct()
                  this.$message({
                      type: 'success',
                      message: 'Deletion succeeded!'
                  });
              }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Deletion cancelled'
          });
        });
    },
    searchgood() {
        if (this.search == "") {
          this.searchInfo = this.goodsInfo;
        }else{
          this.searchInfo = [];
          for(let i = 0; i < this.goodsInfo.length; i++) {
            if(this.goodsInfo[i].title === this.search) {
              this.searchInfo.push(this.goodsInfo[i]);
              // this.searchInfo.push({
              //   title:this.goodsInfo[i].title,
              //   retail_price:this.goodsInfo[i].retail_price,
              //   stock:this.goodsInfo[i].stock,
              //   sku_cd:this.goodsInfo[i].sku_cd,
              // });
              console.log(this.searchInfo);
              break;
              }
            }
        }
    }
  }
}
</script>

<style scoped>
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
