<template>
  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> Order management
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
        <span>
      Title：
      <el-input style="width:200px" placeholder @input="search" v-model="search_username"></el-input>
      </span>
      <el-button type="primary" icon="el-icon-search"></el-button>
			<el-button type="primary" icon="el-icon-download">
        Pull Orders
      </el-button>
      <br />
      <br />

			<el-tabs type="border-card" >

      <!-- 待支付!!!!!!!!! -->
        <el-tab-pane label="Awaiting Payment">
          <el-table
              ref="multipleTable"
              :data="AwaitingPaymentTableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column label="Title">
                  <template slot-scope="scope">
                    <el-button type="text" size="small"	@click="toDetail(scope.row.proId)" disable-transitions>
                      {{scope.row.title}}
                    </el-button>
                  </template>
              </el-table-column>
              <el-table-column prop="price" label="Price"></el-table-column>
              <el-table-column prop="qty" label="Num" show-overflow-tooltip></el-table-column>
              <el-table-column prop="sku" label="Sku"></el-table-column>
              <el-table-column prop="orderNo" label="Order No"></el-table-column>
              <el-table-column prop="createdTime" label="Create Time"></el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 待发货!!!!!!!!! -->
        <el-tab-pane key="2" label="Awaiting Shipment" force-render>
          <el-table
              :data="AwaitingShipmentTableData"
              tooltip-effect="dark"
              style="width: 100%">
            <el-table-column label="Title">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toDetail(scope.row.proId)" disable-transitions>
                  {{scope.row.title}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="Price"></el-table-column>
            <el-table-column prop="qty" label="Num" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sku" label="Sku"></el-table-column>
            <el-table-column prop="orderNo" label="Order No"></el-table-column>
            <el-table-column prop="createdTime" label="Create Time"></el-table-column>
            <el-table-column label="Operation">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" @click="toShip(scope.$index)">Ship</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

      <!-- 已发货!!!!!!!!! -->
        <el-tab-pane key="3" label="Shipped">
          <el-table
              :data="ShippedTableData"
              tooltip-effect="dark"
              style="width: 100%">
            <el-table-column label="Title">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toDetail(scope.row.proId)" disable-transitions>
                  {{scope.row.title}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="Price"></el-table-column>
            <el-table-column prop="qty" label="Num" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sku" label="Sku"></el-table-column>
            <el-table-column prop="orderNo" label="Order No"></el-table-column>
            <el-table-column prop="createdTime" label="Create Time"></el-table-column>
            <el-table-column label="Tracking No">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="logistics = true" disable-transitions>
                  {{scope.row.trackingno}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="Operation">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" @click="toCancel(scope.$index)">Cancel</el-button>
                </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>


        <!-- 已完成!!!!!!!!! -->
        <el-tab-pane key="4" label="Completed Orders">
          <el-table
              :data="CompletedTableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column label="Title">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toDetail(scope.row.proId)" disable-transitions>
                    {{scope.row.title}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="Price"></el-table-column>
              <el-table-column prop="qty" label="Num"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="sku" label="Sku"></el-table-column>
            <el-table-column prop="orderNo"  label="Order No"></el-table-column>
            <el-table-column prop="createdTime" label="Create Time"></el-table-column>
            <el-table-column label="Tracking No">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="logistics = true" disable-transitions>
                  {{scope.row.trackingno}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 已取消!!!!!!!!! -->
        <el-tab-pane key="5" label="Cancelled Orders">
          <el-table :data="CancelledTableData" tooltip-effect="dark" style="width: 100%">
              <el-table-column label="Title">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toDetail(scope.row.proId)" disable-transitions>
                    {{scope.row.title}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="price"  label="Price"></el-table-column>
              <el-table-column prop="qty" label="Num" show-overflow-tooltip></el-table-column>
              <el-table-column prop="sku" label="Sku"></el-table-column>
              <el-table-column prop="orderNo" label="Order No"></el-table-column>
              <el-table-column prop="createdTime" label="Create Time"></el-table-column>

            </el-table>
          </el-tab-pane>
      </el-tabs>
    </el-main>

		<!-- !!!!!商品详情!!!!!!! -->
		<el-dialog title="Product Details" :visible.sync="detail" width="50%">
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
            </el-link>
          </el-table-column>
        </el-table>
        <br/>
			<el-card class="box-card">
               <div slot="header" class="clearfix">
                   <span style="color:#339966;font-size:18px;margin-left:15px;">Item Description</span>
               </div>
               <div v-for="item in product" :key="item" >
                    {{item.description}}
               </div>
			</el-card>
      </el-dialog>


    <!-- 添加弹出框 -->
    <el-dialog title="Add logistics information" :visible.sync="addVisible" width="33%" >
      <el-form ref="form" :model="order"   label-width="100px">
        <el-form-item label="Courier Number" prop="roleName">
          <el-input v-model="order.trackingNo"></el-input>
        </el-form-item>
        <el-form-item label="Courier Services Company">
          <el-input v-model="order.wspName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">Cancel</el-button>
                <el-button type="primary" @click="ship()">Sure</el-button>
            </span>
    </el-dialog>



    <!-- !!!!!!物流跟踪!!!!!!!!!!! -->
    <el-dialog title="Logistics tracking" :visible.sync="logistics" width="60%">
			<span></span>
			<el-steps :active="2" align-center>
				<el-step title="Out of stock" description="2017-07-13 09：00:00"></el-step>
				<el-step title="Ship to Guangzhou" description="2017-07-14 1：00:00"></el-step>
				<el-step title="Arrive in Shanghai" description="2017-07-15 09：00:00"></el-step>
				<el-step title="Sending" description="2017-07-15 22：10:00"></el-step>
			</el-steps>
			<!-- <span>
				<el-steps :active="2" align-center v-for="item in logisticsinfo" :key="item">
					<el-step :title="item.title" :description="item.description"></el-step>
				</el-steps>
			</span> -->
			<span slot="footer" class="dialog-footer">
        <el-button class="pan-btn tiffany-btn" @click="logistics = false">Sure</el-button>
      </span>
		</el-dialog>
  </el-container>
</template>

<script>

  import {

  } from '../../api/mvo';
  import { getAwaitingPaymentOrder } from '../../api/mvo';
  import { getAwaitingShipmentOrder } from '../../api/mvo';
  import { getShippedOrder } from '../../api/mvo';
  import { getCompletedOrder } from '../../api/mvo';
  import { getCancelledOrder } from '../../api/mvo';
  import { editOrderSts } from '../../api/mvo';
  import {productDetail} from "../../api/bvo";

export default {
  name: 'Tab',

  data() {
    return {

      form:{
        userId:0,
        orderSts:''
      },
      order:{
        createdTime: '',
        orderNo: '',
        orderSts: '',
        price: 0,
        qty: 0,
        sku: '',
        title: '',
        trackingNo: '',
        wspName: ''
      },

      addVisible:false,
			//商品详情
      product: [
        // {
        //   imgPath: 'https://img.alicdn.com/imgextra/i1/2200731938403/O1CN01qNHAwk2BwcfVUVp4z_!!0-item_pic.jpg_430x430q90.jpg',
        //   name:"Glass Housing Multi-purpose 12L Portable Convection Oven",
        //   price: '$300',
        //   sku:'GM08713',
        //   brand:"GMY",
		//   stock:32,
		//   description:"Raw denim you probably haven't heard of them jean shorts Austin."
        // }
      ],
      detail:false,
      logistics:false,
      AwaitingPaymentTableData: [],
      AwaitingShipmentTableData: [],
      ShippedTableData: [],
      CompletedTableData: [],
      CancelledTableData: [],
    }
  },


  created() {
    this.getAwaitingPaymentOrder()
    this.getAwaitingShipmentOrder()
    this.getShippedOrder()
    this.getCompletedOrder()
    this.getCancelledOrder()
  },
  methods: {

    getAwaitingPaymentOrder() {
      getAwaitingPaymentOrder(localStorage.getItem('userId'),'1').then(res => {
        if (res.code === 200) {
          this.AwaitingPaymentTableData = res.data;
        } else {
          this.$message.error('Abnormal data echo')
        }
      });
    },

    getAwaitingShipmentOrder() {
      getAwaitingShipmentOrder(localStorage.getItem('userId'),'2').then(res => {
        if (res.code === 200) {
          this.AwaitingShipmentTableData = res.data;
        } else {
          this.$message.error('Abnormal data echo')
        }
      });
    },

    getShippedOrder() {
      getShippedOrder(localStorage.getItem('userId'),'3').then(res => {
        if (res.code === 200) {
          this.ShippedTableData = res.data;
        } else {
          this.$message.error('Abnormal data echo')
        }
      });
    },


    getCompletedOrder() {
      getCompletedOrder(localStorage.getItem('userId'),'4').then(res => {
        if (res.code === 200) {
          this.CompletedTableData = res.data;
        } else {
          this.$message.error('Abnormal data echo')
        }
      });
    },


    getCancelledOrder() {
      getCancelledOrder(localStorage.getItem('userId'),'5').then(res => {
        if (res.code === 200) {
          this.CancelledTableData = res.data;
        } else {
          this.$message.error('Abnormal data echo')
        }
      });
    },

    toDetail(id){
      console.log(id);
      productDetail(id).then(res =>{
        if (res.code === 0){
          this.product = [res.data];
        }else {
          this.$message.error('Details data echo abnormal!')
        }
      });
      this.detail = true;
    },
    toShip(i) {
      this.order.title = this.AwaitingShipmentTableData[i].title
      this.order.price = this.AwaitingShipmentTableData[i].price
      this.order.qty = this.AwaitingShipmentTableData[i].qty
      this.order.sku = this.AwaitingShipmentTableData[i].sku
      this.order.orderNo = this.AwaitingShipmentTableData[i].orderNo
      this.order.createdTime = this.AwaitingShipmentTableData[i].createdTime
      this.order.orderSts = "3"
      this.addVisible = true
    },
    ship() {
      this.$confirm('Is delivery confirmed?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        console.log(this.order)
        editOrderSts(this.order).then(res => {
          if (res.code === 200) {
            this.getAwaitingPaymentOrder();
            this.getAwaitingShipmentOrder();
            this.getShippedOrder();
            this.getCompletedOrder();
            this.getCancelledOrder();
            this.addVisible = false;
          }
        }).then(()=>{this.$message({
          type: 'success',
          message: 'Delivery successful!'
        });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Shipment cancelled'
        });
      })
    },
    toCancel(i) {
      this.$confirm('Is cancel confirmed?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.order.title = this.ShippedTableData[i].title,
        this.order.price = this.ShippedTableData[i].price,
        this.order.qty = this.ShippedTableData[i].qty,
        this.order.sku = this.ShippedTableData[i].sku,
        this.order.orderNo = this.ShippedTableData[i].orderNo,
        this.order.createdTime = this.ShippedTableData[i].createdTime
        this.order.orderSts = "5"
        this.order.wspName = this.ShippedTableData[i].wspName
        this.order.trackingNo = this.ShippedTableData[i].trackingNo
        console.log(this.order)
        editOrderSts(this.order).then(res => {
          if (res.code === 200) {
            this.getAwaitingPaymentOrder();
            this.getAwaitingShipmentOrder();
            this.getShippedOrder();
            this.getCompletedOrder();
            this.getCancelledOrder();
          }
        }).then(()=>{
            this.$message({
            type: 'success',
            message: 'Canceled successful!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled failed'
        });
      })
    }
  }

    /*editOrderSts(orderSts){
      editOrderSts(this.order).then(res =>{
        if (res.code ===200){
          this.getShippedOrder();
          this.addVisible = false;
          this.$message.success('修改成功');
        }else{
          this.$message.error('修改失败');
        }
      })
    }
    },*/


}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
