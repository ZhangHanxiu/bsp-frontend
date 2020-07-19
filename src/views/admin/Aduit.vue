<template>

    <div class="app-container">
        <el-button type="success" @click="withdrawalAudit">流水审核</el-button>

        <div :style="{display:table2}">
            <div style="margin-top: 50px;margin-bottom: 20px">
                <el-button icon="el-icon-search" style="width: 100px">搜索</el-button>
                <div><p style="font-size: 30px;color: #20a0ff">管理员>>流水审核</p></div>
            </div>
            <el-table
                    :data="testList2"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column label="账户" >
                    <template slot-scope="scope">
                        {{ scope.row.account_name }}
                    </template>
                </el-table-column>
                <el-table-column label="交易类型" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.transaction_type === 1">充值</span>
                        <span v-if="scope.row.transaction_type === 2">提现</span>
                        <span v-if="scope.row.transaction_type === 3">消费</span>
                    </template>
                </el-table-column>
                <el-table-column label="金额"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.transaction_money }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="申请时间"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.transaction_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 2">申请</span>
                        <span v-if="scope.row.status === 4">完成</span>
                        <span v-if="scope.row.status === -1">失败</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核"  align="center" :formatter="formatStatus">
                    <template slot-scope="scope">
                        <el-button type="text" @click="AuditPre(scope.row.transaction_id)" size="small">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-right: 400px">
            <el-dialog title="审核" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
                <el-form ref="add" :model="account">
                    <el-form-item label="审核">
                        <el-select v-model="account.result_code" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="">取 消</el-button>
                    <el-button type="primary" @click="Audit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        withdrawalAudit, Audit
    } from '../../api/wallet';

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
                audit:'审核',
                button1:'',
                button2:'none',
                buyer_id:null,
                button3:'none',
                form:{},
                dialogAddVisible:false,
                account:{},
                listLoading: true,
                testList:[],
                testList2:[],
                check:{},
                options: [{
                    value: -1,
                    label: '失败'
                }, {
                    value: 4,
                    label: '完成'
                }, {
                    value: 2,
                    label: '申请'
                },
            ]
            }
        },
        created() {
        },
        methods: {

            withdrawalAudit(){
                withdrawalAudit().then(res =>{
                    if (res.code === 200){
                       this.$message.success('查询成功') ;
                       this.table2 = '';
                       this.testList2 = res.data;

                    }else {
                        this.$message.error('数据展示异常!')
                    }
                })
            },
            Audit(){
                Audit(this.account).then(res =>{
                    if (res.code === 200){
                        this.dialogAddVisible = false;
                        this.withdrawalAudit();
                        this.$message.success('审核成功');
                    }else {
                        this.$message.error('审核失败,请痛打程序员大大')
                    }
                })
            },

            AuditPre(id){
                this.account.transaction_id = id;
                this.dialogAddVisible = true;
            },

        }
    }
</script>
