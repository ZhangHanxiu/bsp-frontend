<template>
	<el-container>
	  <el-header>
	    <div class="page-header position-relative">
	      <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
	        借卖方BVO
	        <small style="font-size:14px;">
	          <i class="el-icon-d-arrow-right"></i> 商品浏览Product Browse
	        </small>
	      </h1>
	    </div>
	  </el-header>
	  <el-main style="width:100%">
        <el-row :gutter="20">
            <el-col :span="4" v-for="item in products" :key="item">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="grid-content bg-purple">
                    <el-link :underline="false" @click="openDetail(item.proId)">
                        <div style="text-align:center">
                          <img  :src="item.imgPath" alt="" style="width: 160px;height: 160px">
                        </div>
                        <div style="margin-left:7px;">
                          <p>{{item.name}}</p>
                          <span class="red">{{item.price}}</span>
                          <p>sku:{{item.sku}}</p>
                        </div>

                    </el-link>
                </div>
              </el-card>
              <br/>
              <br/>
            </el-col>
        </el-row>
    </el-main>
    <!-- 商品详情!!!!!! -->
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
              <el-button class="pan-btn tiffany-btn" @click="addtoWish()">Add to Wish List</el-button>
            </el-link>
          </el-table-column>
        </el-table>
        <br/>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
						<span style="color:#339966;font-size:18px;margin-left:15px;">Item Description</span>
					</div>
					<div style="padding: 12px;">{{product.description}}</div>
				</el-card>
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
                <el-checkbox v-for="item in amazon" :label="item.storeName" :key="item.storeName">{{item.storeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="eBay">
              <el-checkbox-group v-model="checkedStores" >
                <el-checkbox v-for="item in ebay" :label="item.storeName" :key="item.storeName">{{item.storeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
            <div style="text-align: right">

              <p>{{checkedStores}}</p>

              <el-button class="pan-btn tiffany-btn" @click="addinStore = false">Cancel</el-button>
              <el-button class="pan-btn tiffany-btn" :disabled="checkedStores.length == 0" @click="addinStore = false">Push</el-button>
            </div>
          </div>
      </el-dialog>
  </el-container>
</template>

<script>
    import { addToWish, getProduct, productDetail } from '../../api/bvo';
    import { delMenu } from '../../api/menu';

export default {
  data() {
    return {
      detail:false,
      addinStore:false,
      checkedStores:[],
      detailProduct:{},
      product: [],
      products: [],
      mystores:[
              {
                plataeformType:'1',
                storeName:'Amazon1',
                dsrId:1,
                strId:1
              },{
                plataeformType:'2',
                storeName:'ebay1',
                dsrId:1,
                strId:2
              },{
                plataeformType:'1',
                storeName:'Amazon2',
                dsrId:1,
                strId:3
              },{
                plataeformType:'2',
                storeName:'ebay2',
                dsrId:1,
                strId:4
              },{
                plataeformType:'1',
                storeName:'Amazon3',
                dsrId:1,
                strId:5
              },{
                plataeformType:'2',
                storeName:'ebay3',
                dsrId:1,
                strId:6
              }],
    }
  },
  created() {
      this.getProduct();
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

    getProduct(){
      getProduct().then(res =>{
          if (res.code === 0){
              this.products = res.data;
          }
      })
    },

      openDetail(id){
        this.detail = true;
        this.detailProduct.proId = id;
        productDetail(id).then(res =>{
            if (res.code === 0){
                this.product = [res.data];
            }
        })
      },

    toDetail(){
        this.$router.push('/bvo/prodetail')
    },
    toadd(){
      this.addinStore = true,
      this.detail = false
    },
    addtoWish(){
      this.$confirm('是否将该商品加入心愿单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action =>{
            if (action === 'confirm'){
                addToWish(this.detailProduct.proId).then(res =>{
                    if (res.code === 0){
                        this.$message.success('添加心愿单成功');
                    }else{
                        this.$message.error('添加心愿单失败');
                    }
                })
            }
        })
    },
    push(){
      addinStore = false;
      console.log(this.checkedStores);
      this.checkedStores=[]
    }
  }
}
</script>

<style>
  .red{
    color: red;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width:150px;
    height:150px;
    /* position: absolute;
    display: block; */
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  /* .card{
    width:100%;
    height:0;
    position: relative;
    padding-bottom: 100%
  } */

</style>
