<template>
    <el-container>
        <el-header>
            <div class="page-header position-relative">
                <h1 style="color: #2679b5;font-size:30px;font-weight:normal;">
                    MVO
                    <small style="font-size:16px;">
                        <i class="el-icon-d-arrow-right"></i> My Wallet
                    </small>
                </h1>
            </div>
        </el-header>
        <el-main>
            <el-button type="success" @click="layout">Log Out</el-button>
            <el-button type="success" @click="account">Account Balance</el-button>
            <el-button type="success" @click="saveMoney">Save Money</el-button>

            <div :style="{display:table1}">
                <div style="margin-top: 50px;margin-bottom: 20px">
                    <el-button icon="el-icon-search" style="width: 100px">Search</el-button>
                    <div><p style="font-size: 18px;color: #20a0ff">Account Balance</p></div>
                </div>
                <el-table
                        :data="testList"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row
                >
                    <el-table-column label="Account" >
                        <template slot-scope="scope">
                            {{ scope.row.accountNumber }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Balance"  align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.account }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="Operating" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">Delete</el-button>
                        </template>
                    </el-table-column>



                </el-table>
            </div>

            <div :style="{display:table2}">
                <div style="margin-top: 50px;margin-bottom: 20px">
                    <el-button icon="el-icon-search" style="width: 100px">Search</el-button>
                    <div><p style="font-size: 18px;color: #20a0ff">Withdrawal details</p></div>
                </div>
                <el-table
                        :data="testList2"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row
                >
                    <el-table-column label="Transaction record number" >
                        <template slot-scope="scope">
                            {{ scope.row.accountNumber }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Balance" >
                        <template slot-scope="scope">
                            {{ scope.row.account }}
                        </template>
                    </el-table-column>
                    <el-table-column label="CreateTime"  align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="Status" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.status }}</span>
                        </template>
                    </el-table-column>



                </el-table>
            </div>

            <div :style="{display:table3}" style="margin-top: 50px;">
                <el-form label-width="80px" :model="form">
                    <el-form-item label="Email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Account">
                        <el-input v-model="form.account_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" style="margin-left: 800px" @click="registerWallet">Registered</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div :style="{display:table4}" style="margin-top: 50px;">
                <el-form label-width="80px" :model="form">
                    <el-form-item label="Account">
                        <el-input v-model="form.accountname"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" style="margin-left: 800px" @click="loginWallet">Login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>

    </el-container>
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
                    status:'Processing'
                },
                    {
                        accountNumber:'bbb.com',
                        account:165,
                        createTime:'2020-10-04 09:12:11',
                        status:'Finish'
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
