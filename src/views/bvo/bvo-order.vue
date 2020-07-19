<template>
  <el-container>
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;font-size:24px;font-weight:normal;">
          借卖方BVO
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
										<el-button type="text" size="small"	@click="toDetail(scope.row.proId)" disable-transitions>
											{{scope.row.title}}
										</el-button>
									</template>
							</el-table-column>
							<el-table-column prop="price" label="Price"></el-table-column>
							<el-table-column prop="qty" label="QTY" show-overflow-tooltip></el-table-column>
							<el-table-column prop="sku" label="Sku"></el-table-column>
							<el-table-column prop="orderno" label="Order No"></el-table-column>
							<el-table-column prop="total" label="Total"></el-table-column>
							<el-table-column label="Operation">
								<template slot-scope="scope">
									<el-button type="success" plain size="mini" @click="loginwallet(scope.$index)">Pay Now</el-button>
								</template>
							</el-table-column>
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
						<el-table-column prop="qty" label="QTY" show-overflow-tooltip></el-table-column>
						<el-table-column prop="sku" label="Sku"></el-table-column>
						<el-table-column prop="orderno" label="Order No"></el-table-column>
						<el-table-column prop="total" label="Total"></el-table-column>
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
						<el-table-column prop="qty" label="QTY" show-overflow-tooltip></el-table-column>
						<el-table-column prop="sku" label="Sku"></el-table-column>
						<el-table-column prop="total" label="Total"></el-table-column>
						<el-table-column prop="orderno" label="Order No"></el-table-column>
						<el-table-column label="Tracking No">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="logistics = true" disable-transitions>
									{{scope.row.trackingNo}}
								</el-button>
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
							<el-table-column prop="qty" label="QTY" show-overflow-tooltip></el-table-column>
							<el-table-column prop="sku" label="Sku"></el-table-column>
							<el-table-column prop="total" label="Total"></el-table-column>
							<el-table-column prop="orderno" label="Order No"></el-table-column>
							<el-table-column label="Tracking No">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="logistics = true" disable-transitions>
										{{scope.row.trackingNo}}
									</el-button>
								</template>
							</el-table-column>
					</el-table>
				</el-tab-pane>

				<!-- 已取消!!!!!!!!! -->
				<el-tab-pane key="5" label="Cancelled Orders">
					<el-table
							:data="CancelledTableData"
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
							<el-table-column prop="qty" label="QTY" show-overflow-tooltip></el-table-column>
						<el-table-column prop="sku" label="Sku"></el-table-column>
						<el-table-column prop="orderno" label="Order No"></el-table-column>
						<el-table-column  prop="total" label="Total"></el-table-column>
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
					<div style="padding: 12px;">{{product.description}}</div>
				</el-card>
      </el-dialog>

		<!-- !!!!!物流跟踪!!!!!!! -->
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

		<!-- !!!!!钱包登录!!!!!!! -->
		<el-dialog title="钱包登录" :visible.sync="wallet" width="40%">
			<span></span>
			<el-form :model="walletInfo" :rules="walletRules" ref="walletInfo" label-width="auto" class="demo-ruleForm" >
				<el-form-item label="Accountn Name" prop="accountname">
					<el-input v-model="walletInfo.accountname"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password">
					<el-input v-model="walletInfo.password"></el-input>
				</el-form-item>
				<el-form-item style="text-align:center" >
					<el-button class="pan-btn tiffany-btn" @click="wallet = false">Cancel</el-button>
          <el-button class="pan-btn tiffany-btn" @click="toPay('walletInfo')">Log in</el-button>
        </el-form-item>
			</el-form>
			<!-- <span slot="footer" class="dialog-footer"></span> -->
		</el-dialog>

		<!-- !!!!!支付!!!!!!! -->
		<el-dialog title="支付" :visible.sync="pay" width="40%">
			<span></span>
			<span>Total:{{totalpay}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button class="pan-btn tiffany-btn" @click="pay = false">Cancel</el-button>
        <el-button class="pan-btn tiffany-btn" @click="finalPay()">Pay</el-button>
      </span>
		</el-dialog>

  </el-container>
</template>

<script>

	import {
		getAwaitingPaymentOrder,
		getAwaitingShipmentOrder, getCancelledTOrder,
		getCompletedOrder,
		getShippedOrder, productDetail
	} from '../../api/bvo';
	import { loginWallet } from '../../api/wallet';

export default {
  name: 'Tab',
  // components: {},
  data() {
    return {
      //商品详情
			product: [],
			detail:false,
			logistics:false,
			wallet:false,
			pay:false,
			orderindex:'',
			totalpay:'',
			walletInfo:{
				accountname:'',
				password:''
			},
			walletRules: {
        accountname: [
          { required: true, message: 'Can not be empty', trigger: 'blur' },
          { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Can not be empty', trigger: 'blur' },
          { min: 3, max: 10, message: 'Must be 3-10 characters', trigger: 'blur' }
        ],
      },
			logisticsinfo:[
				{
					title:'已出库',
					description:'2017-07-13 09：00:00'
				},
				{
					title:'发往广州',
					description:'2017-07-14 1：00:00'
				},
				{
					title:'到棠下村',
					description:'2017-07-13 09：00:00'
				},
				{
					title:'正在派送',
					description:'2017-07-15 22：10:00'
				}
			],

		    AwaitingPaymentTableData: [],

			AwaitingShipmentTableData: [],

			ShippedTableData: [],

		    CompletedTableData:[],

		    CancelledTableData: [],
    }
  },
  // watch: {
  //   activeName(val) {
  //     this.$router.push(`${this.$route.path}?tab=${val}`)
  //   }
  // },
  // created() {
  //   // init the default selected tab
  //   const tab = this.$route.query.tab
  //   if (tab) {
  //     this.activeName = tab
  //   }
  // }

	created() {
  	this.getOrder();
	},
	methods: {
	getOrder(){
	    getAwaitingPaymentOrder().then(res =>{
	    	if (res.code === 0){
	    		this.AwaitingPaymentTableData = res.data;
			}else {
	    		this.$message.error('数据回显异常')
			}
		});

		getAwaitingShipmentOrder().then(res =>{
			if (res.code === 0){
				this.AwaitingShipmentTableData = res.data;
			}else {
				this.$message.error('数据回显异常')
			}
		});

		getShippedOrder().then(res =>{
			if (res.code === 0){
				this.ShippedTableData = res.data;
			}else {
				this.$message.error('数据回显异常')
			}
		});

		getCompletedOrder().then(res =>{
			if (res.code === 0){
				this.CompletedTableData = res.data;
			}else {
				this.$message.error('数据回显异常')
			}
		});

		getCancelledTOrder().then(res =>{
			if (res.code === 0){
				this.CancelledTableData = res.data;
			}else {
				this.$message.error('数据回显异常')
			}
		});
	},

		toDetail(id){
		console.log(id);
			productDetail(id).then(res =>{
				if (res.code === 0){
					this.product = [res.data];
				}else {
					this.$message.error('详情数据回显异常!')
				}
			});
        this.detail = true;
    },
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    loginwallet(i){
			this.wallet = true,
			// this.orderindex = i;
			this.totalpay = this.AwaitingPaymentTableData[i].total;
		},
		toPay(formName) {
         this.$refs[formName].validate((valid) => {
         	if (valid) {
				loginWallet(this.walletInfo).then(res => {
					if (res.code === 200) {
						this.$message.success('登陆成功!');
						localStorage.setItem('accountName', res.data.account_name);
						this.$router.push('/bvo-interface' + res.data.buyer_id);
					} else {
						this.$message.error('登录失败,用户名或密码错误,请重新登陆!')
					}
				})
        } else {
          console.log('error submit!!');
          alert('error submit!!');
          return false;
        }
      });
		},
		finalPay(){
			this.pay = false;
		}
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
