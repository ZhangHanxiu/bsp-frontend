<template>


    <div class="app-container">
        <el-button type="success" @click="layout">退出登陆</el-button>
        <el-button type="success" @click="account">账户余额</el-button>
        <el-button type="success" @click="saveMoney">存钱</el-button>

        <div :style="{display:table1}">
            <div style="margin-top: 50px;margin-bottom: 20px">
                <el-button icon="el-icon-search" style="width: 100px">搜索</el-button>
                <div><p style="font-size: 30px;color: #20a0ff">品牌商>>账户余额</p></div>
            </div>
            <el-table
                    :data="testList"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column label="账户" >
                    <template slot-scope="scope">
                        {{ scope.row.accountNumber }}
                    </template>
                </el-table-column>
                <el-table-column label="余额"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.account }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>



            </el-table>
        </div>

        <div :style="{display:table2}">
            <div style="margin-top: 50px;margin-bottom: 20px">
                <el-button icon="el-icon-search" style="width: 100px">搜索</el-button>
                <div><p style="font-size: 30px;color: #20a0ff">品牌商>>提现明细</p></div>
            </div>
            <el-table
                    :data="testList2"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column label="交易流水号" >
                    <template slot-scope="scope">
                        {{ scope.row.accountNumber }}
                    </template>
                </el-table-column>
                <el-table-column label="余额" >
                    <template slot-scope="scope">
                        {{ scope.row.account }}
                    </template>
                </el-table-column>
                <el-table-column label="时间"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                    </template>
                </el-table-column>



            </el-table>
        </div>

        <div :style="{display:table3}" style="margin-top: 50px;">
            <el-form label-width="80px" :model="form">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.account_name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" style="margin-left: 800px" @click="registerWallet">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div :style="{display:table4}" style="margin-top: 50px;">
            <el-form label-width="80px" :model="form">
                <el-form-item label="账号">
                    <el-input v-model="form.accountname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" style="margin-left: 800px" @click="loginWallet">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { registerWallet,loginWallet } from '../../api/wallet'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                };
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                table1:'none',
                table2:"none",
                table3:'none',
                table4:'none',
                button1:'',
                button2:'none',
                button3:'none',
                form:{},
                listLoading: true,
                testList:[
                    {
                        accountNumber:'ace.com',
                        account:145,
                    }
                ],
                testList2:[{
                    accountNumber:'ace.com',
                    account:145,
                    createTime:'2020-09-04 09:12:11',
                    status:'处理中'
                },
                    {
                        accountNumber:'bbb.com',
                        account:165,
                        createTime:'2020-10-04 09:12:11',
                        status:'完成'
                    }
                ]
            }
        },
        created() {
            // this.fetchData()
        },
        methods: {

            layout(){
                this.$router.push('/bvo-wallet')
            },
            account(){
                this.table1 = '';
                this.table2 = 'none';
                this.table3 = 'none';
                this.table4 = 'none';
            },

            saveMoney(){

            },

            // fetchData() {
            //   // this.listLoading = true
            //   // getList().then(response => {
            //   //   this.list = response.data.items
            //   //   this.listLoading = false
            //   // })
            // }
        }
    }
</script>
