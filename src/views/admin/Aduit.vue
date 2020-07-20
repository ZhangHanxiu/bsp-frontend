<template>

    <el-container>
        <el-header>
        <div class="page-header position-relative">
          <h1 style="color: #2679b5;font-size:30px;font-weight:normal;">
            Admin
            <small style="font-size:16px;">
              <i class="el-icon-d-arrow-right"></i> My Information
            </small>
          </h1>
        </div>
      </el-header>
        <el-button type="success" @click="withdrawalAudit">Record review</el-button>

        <div :style="{display:table2}">
            <div style="margin-top: 50px;margin-bottom: 20px">
                <el-button icon="el-icon-search" style="width: 100px">Search</el-button>
                <div><p style="font-size: 18px;color: #20a0ff">Record review</p></div>
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
                <el-table-column label="Transaction Type" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.transaction_type === 1">Recharge</span>
                        <span v-if="scope.row.transaction_type === 2">Withdraw</span>
                        <span v-if="scope.row.transaction_type === 3">Consumption</span>
                    </template>
                </el-table-column>
                <el-table-column label="Amount"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.transaction_money }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Application Time"  align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.transaction_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status" align="center" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 2">Apply</span>
                        <span v-if="scope.row.status === 4">Finish</span>
                        <span v-if="scope.row.status === -1">Fail</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核"  align="center" :formatter="formatStatus">
                    <template slot-scope="scope">
                        <el-button type="text" @click="AuditPre(scope.row.transaction_id)" size="small">Audit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-right: 400px">
            <el-dialog title="Audit" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
                <el-form ref="add" :model="account">
                    <el-form-item label="Audit">
                        <el-select v-model="account.result_code" placeholder="Please choose">
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
                    <el-button @click="dialogAddVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="Audit">Sure</el-button>
                </div>
            </el-dialog>
        </div>
    </el-container>
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
                    label: 'Fail'
                }, {
                    value: 4,
                    label: 'Finish'
                }, {
                    value: 2,
                    label: 'Apply'
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
                       this.$message.success('Search successful') ;
                       this.table2 = '';
                       this.testList2 = res.data;

                    }else {
                        this.$message.error('Data presentation abnormal!')
                    }
                })
            },
            Audit(){
                Audit(this.account).then(res =>{
                    if (res.code === 200){
                        this.dialogAddVisible = false;
                        this.withdrawalAudit();
                        this.$message.success('Successful review');
                    }else {
                        this.$message.error('The audit failed, please beat up the programmer!')
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
