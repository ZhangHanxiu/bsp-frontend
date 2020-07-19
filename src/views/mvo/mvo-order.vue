<template>
  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          品牌商MVO
          <small style="font-size:14px;">
            <i class="el-icon-d-arrow-right"></i> 订单管理
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
        <span>
      Title：
      <el-input style="width:200px" placeholder @input="search" v-model="search_username"></el-input>
      </span>
      <el-button type="success" icon="el-icon-search"></el-button>
			<el-button type="success" icon="el-icon-download">
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
                    <el-button type="text" size="small"	@click="toDetail()" disable-transitions>
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
                <el-button type="text" size="small" @click="toDetail()" disable-transitions>
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
                  <el-button type="success" plain size="mini" @click="toShip(scope.$index)">发货</el-button>
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
                <el-button type="text" size="small" @click="toDetail()" disable-transitions>
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
                  <el-button type="success" plain size="mini" @click="toCancel(scope.$index)">取消</el-button>
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
                  <el-button type="text" size="small" @click="toDetail()" disable-transitions>
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
                  <el-button type="text" size="small" @click="toDetail()" disable-transitions>
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
            </el-link>
          </el-table-column>
        </el-table>
        <br/>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="color:#339966;font-size:18px;margin-left:15px;">Item Description</span>
					</div>
					<div style="padding: 12px;">{{product[0].description}}</div>
				</el-card>

      </el-dialog>

		<!-- !!!!!!物流跟踪!!!!!!!!!!! -->
    <el-dialog title="物流跟踪" :visible.sync="logistics" width="60%">
			<span></span>
			<el-steps :active="2" align-center>
				<el-step title="已出库" description="2017-07-13 09：00:00"></el-step>
				<el-step title="发往广州" description="2017-07-14 1：00:00"></el-step>
				<el-step title="到棠下村" description="2017-07-13 09：00:00"></el-step>
				<el-step title="正在派送" description="2017-07-15 22：10:00"></el-step>
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
    getAllOrder,
    getMvoAwaitingPaymentOrder,
    getMvoAwaitingShipmentOrder, getMvoCancelledTOrder,
    getMvoCompletedOrder,
    getMvoShippedOrder
  } from '../../api/mvo';

export default {
  name: 'Tab',

  data() {
    return {

      form:{

      },
			//商品详情
			product: [
        {
          imgPath: 'https://img.alicdn.com/imgextra/i1/2200731938403/O1CN01qNHAwk2BwcfVUVp4z_!!0-item_pic.jpg_430x430q90.jpg',
          name:"Glass Housing Multi-purpose 12L Portable Convection Oven",
          price: '$300',
          sku:'GM08713',
          brand:"GMY",
					stock:32,
					description:"Raw denim you probably haven't heard of them jean shorts Austin."
        }
      ],
			detail:false,
      logistics:false,
      AwaitingPaymentTableData: [
				],

			AwaitingShipmentTableData: [
				{
				  title: '2016-05-03',
					price: '$114',
					qty:114514,
					sku:'q1919810',
          orderNo:987489,
          createdTime:'2020-11-03',
				},
				{
				  title: '2016-05-03',
				  price: '$114',
				  qty:114514,
				  sku:'q1919810',
				  orderNo:987489,
				  createdTime:'2020-11-03',
				},
				{
					title: '2016-05-03',
					price: '$114',
					qty:114514,
					sku:'q1919810',
					orderNo:987489,
					createdTime:'2020-11-03',
				},
				{
	  	    title: '2016-05-03',
				  price: '$114',
				  qty:114514,
				  sku:'q1919810',
				  orderNo:987489,
				  createdTime:'2020-11-03',
				},
				{
				  title: '2016-05-03',
				  price: '$114',
				  qty:114514,
				  sku:'q1919810',
				  orderNo:987489,
				  createdTime:'2020-11-03',
				},
				{
				  title: '2016-05-03',
				  price: '$114',
				  qty:114514,
				  sku:'q1919810',
				  orderNo:987489,
				  createdTime:'2020-11-03',
				},
				{
				  title: '2016-05-03',
				  price: '$114',
				  qty:114514,
				  sku:'q1919810',
				  orderNo:987489,
				  createdTime:'2020-11-03',
				}],

			ShippedTableData: [
				{
			    title: '2016-05-03',
					price: '$114',
					qty:114514,
					sku:'q1919810',
					orderNo:987489,
					trackingno:456456,
					createdTime:'2020-11-03',
				},
				{
			    title: '2016-05-03',
			    price: '$114',
			    qty:114514,
			    sku:'q1919810',
			    orderNo:987489,
					trackingno:456456,
			    createdTime:'2020-11-03',
				},
				{
					title: '2016-05-03',
					price: '$114',
					qty:114514,
					sku:'q1919810',
					orderNo:987489,
					trackingno:456456,
					createdTime:'2020-11-03',
				},
				{
			    title: '2016-05-03',
			    price: '$114',
			    qty:114514,
			    sku:'q1919810',
					trackingno:456456,
			    orderNo:987489,
			    createdTime:'2020-11-03',
				},
				{
			    title: '2016-05-03',
			    price: '$114',
			    qty:114514,
			    sku:'q1919810',
			    orderNo:987489,
					trackingno:456456,
			    createdTime:'2020-11-03',
				},
				{
			    title: '2016-05-03',
			    price: '$114',
			    qty:114514,
			    sku:'q1919810',
			    orderNo:987489,
					trackingno:456456,
			    createdTime:'2020-11-03',
				},
				{
			    title: '2016-05-03',
			    price: '$114',
			    qty:114514,
			    sku:'q1919810',
			    orderNo:987489,
					trackingno:456456,
			    createdTime:'2020-11-03',
			  }],

			CompletedTableData: [
					{
			    	title: '2016-05-03',
						price: '$114',
						qty:114514,
						sku:'q1919810',
						orderNo:987489,
						trackingno:456456,
						createdTime:'2020-11-03',
					},
					{
						title: '2016-05-03',
						price: '$114',
						qty:114514,
						sku:'q1919810',
						orderNo:987489,
						trackingno:456456,
						createdTime:'2020-11-03',
					},
					{
						title: '2016-05-03',
						price: '$114',
						qty:114514,
						sku:'q1919810',
						orderNo:987489,
						trackingno:456456,
						createdTime:'2020-11-03',
					},
					{
						title: '2016-05-03',
						price: '$114',
						qty:114514,
						sku:'q1919810',
						trackingno:456456,
						orderNo:987489,
						createdTime:'2020-11-03',
					},
					{
			    	title: '2016-05-03',
			      price: '$114',
			      qty:114514,
			      sku:'q1919810',
			      orderNo:987489,
					  trackingno:456456,
			      createdTime:'2020-11-03',
					},
					{
			      title: '2016-05-03',
			      price: '$114',
			      qty:114514,
			      sku:'q1919810',
			      orderNo:987489,
					  trackingno:456456,
			      createdTime:'2020-11-03',
					},
					{
			      title: '2016-05-03',
			      price: '$114',
			      qty:114514,
			      sku:'q1919810',
			      orderNo:987489,
					  trackingno:456456,
			      createdTime:'2020-11-03',
			    }],

					CancelledTableData: [
						{
							title: '2016-05-03',
							price: '$114',
							qty:114514,
							sku:'q1919810',
							orderNo:987489,
							createdTime:'2020-11-03',
						},
						{
							title: '2016-05-03',
							price: '$114',
							qty:114514,
							sku:'q1919810',
							orderNo:987489,
							createdTime:'2020-11-03',
						},
						{
							title: '2016-05-03',
							price: '$114',
							qty:114514,
							sku:'q1919810',
							orderNo:987489,
							createdTime:'2020-11-03',
						},
						{
							title: '2016-05-03',
							price: '$114',
							qty:114514,
							sku:'q1919810',
							orderNo:987489,
							createdTime:'2020-11-03',
						},
						{
			    		title: '2016-05-03',
			        price: '$114',
			        qty:114514,
			        sku:'q1919810',
			        orderNo:987489,
			        createdTime:'2020-11-03',
						},
						{
			        title: '2016-05-03',
			        price: '$114',
			        qty:114514,
			        sku:'q1919810',
			        orderNo:987489,
			        createdTime:'2020-11-03',
						},
						{
			        title: '2016-05-03',
			        price: '$114',
			        qty:114514,
			        sku:'q1919810',
			        orderNo:987489,
			        createdTime:'2020-11-03',
			      }],
    }
  },


  created() {
    this.getMvoOrder();
  },
  methods: {

    getMvoOrder(){

      getAllOrder().then(res =>{
        if (res.code === 200){
          const orderList = res.data.list;
          console.log(orderList)
          for (let i =0;i<orderList.length;i++){
            if (orderList[i].orderSts === '1'){
              console.log(hh)
              this.AwaitingPaymentTableData.push(orderList[i]);
            }
          }
          this.AwaitingPaymentTableData = res.data;
        }else {
          this.$message.error('数据回显异常')
        }
      });
    },

    toDetail(){
        this.detail = true;
    },
    toShip(i){
			this.$confirm('是否确认发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ShippedTableData.push({
						title:this.AwaitingShipmentTableData[i].title,
						price:this.AwaitingShipmentTableData[i].price,
						qty:this.AwaitingShipmentTableData[i].qty,
						sku:this.AwaitingShipmentTableData[i].sku,
						orderNo:this.AwaitingShipmentTableData[i].orderNo,
						createdTime:this.AwaitingShipmentTableData[i].createdTime,
						trackingno:11111
					});
					this.AwaitingShipmentTableData.splice(i, 1);
          this.$message({
            type: 'success',
            message: '发货成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });
        });
		},
		toCancel(i){
			this.$confirm('是否取消发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.CompletedTableData.push(this.ShippedTableData[i]);
					this.ShippedTableData.splice(i, 1);
          this.$message({
            type: 'success',
            message: '取消发货成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已中止操作'
          });
        });
		}
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
