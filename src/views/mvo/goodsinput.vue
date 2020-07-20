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
          <span class="text">The product title contains search keywords, brand name, color, size, model</span>
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
          <el-form-item label="Bulk">
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
          <span class="text">The product title contains search keywords, brand name, color, size, model</span>
          <el-form-item label="Product name" prop="title">
            <el-input v-model="newgood.title"></el-input>
          </el-form-item>
          <el-form-item label="SKU" prop="sku_cd">
            <el-input v-model="newgood.sku_cd"></el-input>
          </el-form-item>
          <span class="text">You can choose not to provide UPC and ean codes</span>
          <el-form-item label="UPC" prop="upc">
            <el-input v-model="newgood.upc"></el-input>
          </el-form-item>
          <el-form-item label="EAN" prop="ean">
            <el-input v-model="newgood.ean"></el-input>
          </el-form-item>
          <el-form-item label="Bulk">
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
          <span class="text">Before the product is officially put on the shelves,
              please review the borrowing and selling price and select the validity period of the borrowing and selling price</span>
          <el-form-item label="Price" prop="retail_price">
            <el-input v-model="newgood.retail_price"></el-input>
          </el-form-item>
          <el-form-item label="Stock" prop="stock">
            <el-input v-model="newgood.stock"></el-input>
          </el-form-item>
          <span class="text">Commodity warranty commitment will greatly enhance market confidence (may not be provided)</span>
          <el-form-item label="Warranty Period" prop="warranty_day">
            <el-input v-model="newgood.warranty_day"></el-input>
          </el-form-item>
          <span class="text">Note: Product details can be pushed using pictures + text</span>
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
import { addGood, getMvoProduct } from '../../api/mvo';
export default {
  components: { MarkdownEditor },
  data() {
    return {
      newgood:{
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
        sts_cd:'a',
      },
      goodsInfo: [
      {
        title: "phone",
        retail_price: 3400,
        stock: 8888,
        sku_cd: "GM001031",
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:''
      },
      {
        title: "huawei",
        retail_price: 3900,
        stock: 88,
        sku_cd: "GM001031",
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:''
      },
      {
        title: "iphone",
        retail_price: 5500,
        stock: 80,
        sku_cd: "GM001031",
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:''
      },
      {
        title: "iphone",
        retail_price: 5500,
        stock: 80,
        sku_cd: "GM001031",
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        sts_cd:''
      }],
      searchInfo:{
        title:'',
        retail_price:'',
        stock:'',
        sku_cd:'',
      },
      editgood:{
        title:'',
        retail_price:'',
        stock:'',
        sku_cd:'',
        upc:'',
        ean:'',
        length:'',
        height:'',
        width:'',
        weight:'',
        model:'',
        warranty_day:'',
        description:'',
        index:''
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
          retail_price: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          length: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          height: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          width: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
          ],
          weight: [
            { required: true, message: 'Can not be empty', trigger: 'blur' },
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
            addGood(this.newgood).then(res =>{
                if (res.code ===200){
                    this.add = false;
                    this.$message.success('Saved successfully!');
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
      this.editgood.title = this.goodsInfo[i].title;
      this.editgood.retail_price = this.goodsInfo[i].retail_price;
      this.editgood.stock = this.goodsInfo[i].stock;
      this.editgood.sku_cd = this.goodsInfo[i].sku_cd;
      this.editgood.upc = this.goodsInfo[i].upc;
      this.editgood.ean = this.goodsInfo[i].ean;

      this.editgood.length = this.goodsInfo[i].length;
      this.editgood.width = this.goodsInfo[i].width;
      this.editgood.height = this.goodsInfo[i].height;
      this.editgood.weight = this.goodsInfo[i].weight;

      this.editgood.model = this.goodsInfo[i].model;
      this.editgood.warranty_day = this.goodsInfo[i].warranty_day;
      this.editgood.description = this.goodsInfo[i].description;
      this.editgood.index = i;
      console.log(this.editgood);
    },
    saveEdit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            var i = this.editgood.index;
            this.goodsInfo[i].title = this.editgood.title
            this.goodsInfo[i].retail_price = this.editgood.retail_price;
            this.goodsInfo[i].stock = this.editgood.stock;
            this.goodsInfo[i].sku_cd = this.editgood.sku_cd;
            this.goodsInfo[i].upc = this.editgood.upc;
            this.goodsInfo[i].ean = this.editgood.ean;

            this.goodsInfo[i].length = this.editgood.length;
            this.goodsInfo[i].width = this.editgood.width;
            this.goodsInfo[i].height = this.editgood.height;
            this.goodsInfo[i].weight = this.editgood.weight;

            this.goodsInfo[i].model = this.editgood.model;
            this.goodsInfo[i].warranty_day = this.editgood.warranty_day;
            this.goodsInfo[i].description = this.editgood.description;
            this.edit = false;
            this.$message({
              message: 'Successfully modified',
              type: 'success'
            });
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
        this.$confirm('Are you sure to delete these products?', 'Prompt', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            for (let i = 0; i < this.goodsInfo.length; i++) {
              if (this.goodsInfo[i].title === item.title) {
                this.goodsInfo.splice(i, 1);
                 break;
              }
            }
          });
          this.multipleSelection = [];
          this.$message({
            type: 'success',
            message: 'Successfully deleted!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted'
          });
        });
    },
    deletegood(i) {
        this.$confirm('Are you sure to delete the product?', 'Prompt', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.goodsInfo.splice(i, 1);
          this.goodsInfo[i].sts_cd = 'd';
          this.$message({
            type: 'success',
            message: 'Successfully deleted!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted'
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
