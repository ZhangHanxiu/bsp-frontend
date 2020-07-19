<template>
	<el-container>
	  <el-header>
	    <div class="page-header position-relative">
	      <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
	        借卖方BVO
	        <small style="font-size:14px;">
	          <i class="el-icon-d-arrow-right"></i> 心愿单
	        </small>
	      </h1>
	    </div>
	  </el-header>
	  <el-main>
      <el-button type="success" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deletewish()">Delete</el-button>
      <br/>
      <br/>
      <el-table show-header="false" :data="wishlist" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="imgPath" min-width="28%">
          <template slot-scope="scope">
            <img  :src="scope.row.imgPath" alt="" style="width: 180px;height: 180px">
          </template>
        </el-table-column>
        <el-table-column min-width="72%">
          <el-link :underline="false" slot-scope="scope" @click="detail = true">
            <p>{{scope.row.name}}</p>
            <span class="red">{{scope.row.price}}</span>
            <p>sku:{{scope.row.sku}}</p>
          </el-link>
        </el-table-column>
      </el-table>
    </el-main>
    <!-- 商品详情!!!! -->
    <el-dialog title="商品详情" :visible.sync="detail" width="50%">
        <el-table :data="product" show-header="false" style="width: 100%" >
          <el-table-column prop="imgPath" min-width="30%">
            <template slot-scope="scope">
              <img  :src="scope.row.imgPath" alt="" style="width: 180px;height: 180px">
            </template>
          </el-table-column>
          <el-table-column min-width="70%">
            <el-link :underline="false" slot-scope="scope">
              <p>{{scope.row.name}}</p>
              <span class="red">{{scope.row.price}}</span>
              <p>sku:{{scope.row.sku}}</p>
              <p>Brand：{{scope.row.brand}}</p>
              <p>Stock in US：{{scope.row.stock}}</p>
              <el-button class="pan-btn tiffany-btn" @click="toadd()">Dropship Now</el-button>
            </el-link>
          </el-table-column>
        </el-table>
        <br/>
        <br/>
        <span style="color:#339966;font-size:18px;margin-left:15px;">Item Description</span>
        <br/>
        <br/>
        <el-tabs type="border-card">
          <el-tab-pane label="eBay Description">Raw denim you probably haven't heard of them jean shorts Austin.</el-tab-pane>
          <el-tab-pane label="Amazon Description">Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.</el-tab-pane>
        </el-tabs>
      </el-dialog>

      <!-- Selete stores!!!!! -->
      <el-dialog title="Selete stores" :visible.sync="addinStore" width="60%">
        <span></span>
        <!-- <br /> -->
        <!-- <br /> -->
        <div class="stores">
          <el-form  label-width="80px" label-position="top">
            <el-form-item label="Amazon">
              <el-checkbox-group v-model="checkedStores" >
                <el-checkbox v-for="(item,index) in amazon" :label="item.storeName" :key="index">{{item.storeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="eBay">
              <el-checkbox-group v-model="checkedStores" >
                <el-checkbox v-for="(item,index) in ebay" :label="item.storeName" :key="index">{{item.storeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
            <div style="text-align: right">
              <el-button class="pan-btn tiffany-btn" @click="addinStore = false">Cancel</el-button>
              <el-button class="pan-btn tiffany-btn" @click="addinStore = false">Push</el-button>
            </div>
          </div>
      </el-dialog>
  </el-container>
</template>

<script>
    import { addToWish, deleteWish, getProduct, getWish } from '../../api/bvo';

export default {
  data() {
    return {
      detail:false,
      addinStore:false,
      checkedStores:[],
        delList:[],
      product: [
        {
          imgPath: 'https://img.alicdn.com/imgextra/i1/2200731938403/O1CN01qNHAwk2BwcfVUVp4z_!!0-item_pic.jpg_430x430q90.jpg',
          name:"Glass Housing Multi-purpose 12L Portable Convection Oven",
          price: '$300',
          sku:'GM08713',
          brand:"GMY",
          stock:32,
        }
      ],
      wishlist: [],
      mystores:[
              {
                plataeformType:'1',
                storeName:'Amazon1',
                sellerId:1
              },{
                plataeformType:'2',
                storeName:'ebay1',
                sellerId:1
              },{
                plataeformType:'1',
                storeName:'Amazon2',
                sellerId:1
              },{
                plataeformType:'2',
                storeName:'ebay2',
                sellerId:1
              },{
                plataeformType:'1',
                storeName:'Amazon3',
                sellerId:1
              },{
                plataeformType:'2',
                storeName:'ebay3',
                sellerId:1
              }],
      multipleSelection: [],
    }
  },
  created() {
      this.getWish();
  },
    computed: {
    amazon() {
      return this.mystores.filter(function (store) {
        return store.plataeformType == '1'
      })
    },
    ebay() {
      return this.mystores.filter(function (store) {
        return store.plataeformType == '2'
      })
    }
  },
     methods: {
      getWish(){
        getWish().then(res =>{
            if (res.code === 0){
                this.wishlist = res.data;
            }else {
                this.$message.error('数据回显异常')
            }
        })
      },

    handleSelectionChange(val){
      this.multipleSelection = val
    },
    toadd(){
      this.addinStore = true,
      this.detail = false
    },

         deletewish(){
             let length = this.multipleSelection.length;
             console.log(length)
             this.$confirm('确定要删除所选择的心愿单信息吗?','提示',{
                 type:'warning'
             }).then(action =>{
                 if (action === 'confirm'){
                     for (let i=0;i<length;i++){
                         this.delList.push(this.multipleSelection[i].proId)
                     }
                 }
                 deleteWish(this.delList.join(",")).then(res =>{
                     if (res.code == 0){
                         this.multipleSelection = [];
                         this.delList = [];
                         this.$message.success('删除成功');
                         this.getProduct()
                     }else{
                         this.multipleSelection = [];
                         this.delList = [];
                         this.$message.error('删除失败');
                     }
                 })
             })
         },
  }
}
</script>

<style>
  .red{
    color: red;
  }
</style>

