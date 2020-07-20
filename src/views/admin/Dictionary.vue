<template>
    <div>
        <el-button type="success"  @click="addDictionary">Data Dictionary</el-button>
        <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="Number" width="105" align="center"></el-table-column>
            <el-table-column prop="code_type" label="Type" align="center"></el-table-column>
            <el-table-column prop="description" label="Use description" align="center"></el-table-column>
            <el-table-column prop="type_cd" label="Coding" align="center"></el-table-column>
            <el-table-column prop="code_val" label="Coded value" align="center"></el-table-column>
            <el-table-column label="Operating" width="380" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="delDictionaryInfo(scope.row.cdm_id)"
                    >Delete</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="red"
                            @click="editDictionaryInfo(scope.row)"
                    >Edit</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-right: 800px">
            <el-dialog title="Add" :modal="false" top="390px" :visible.sync="dialogVisible" width="20%" >
                <el-form ref="add" :model="dictionary">
                    <el-form-item label="Type">
                        <el-input v-model="dictionary.code_type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Coding">
                        <el-input v-model="dictionary.type_cd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Coded value">
                        <el-input v-model="dictionary.code_val" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Description">
                        <el-input v-model="dictionary.description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="saveDictionary">Sure</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="margin-right: 800px">
            <el-dialog title="Edit" :modal="false" top="390px" :visible.sync="dialogVisible2" width="30%" >
                <el-form ref="add1" :model="editInfo">
                    <el-form-item label="Type">
                        <el-input v-model="editInfo.code_type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Coding">
                        <el-input v-model="editInfo.type_cd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Coded value">
                        <el-input v-model="editInfo.code_val" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Description">
                        <el-input v-model="editInfo.description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">Cancel</el-button>
                    <el-button type="primary" @click="updateDictionary">Sure</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="Edit role information" :visible.sync="editVisible" width="33%">
            <el-form ref="form" :model="editAuth" label-width="100px">
                <el-form-item >
                    <el-tree :data="roleListTree" :props="roleTree"
                             show-checkbox node-key="id" :check-strictly="true"
                             :default-checked-keys="defKeys" ref="roleTree">
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editRoleAccess()">Sure</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { delRoleInfo, echoRoleInfo, getRole, saveRole, updateRole } from '../../api/role';
    import { getMenuList } from '../../api/menu';
    import { delDictionaryInfo, getDictionary, saveDictionary, updateDictionary } from '../../api/dictionary';

    export default {
        name: 'Role',
        data(){
            return{
                tableData:[],
                dialogVisible:false,
                dialogVisible2:false,
                role:{},
                editInfo:{},
                edit:{},
                editAuth:{},
                roleListTree:[],
                roleTree:{
                    label:'menu_name',
                    children:'children'
                },
                dictionary:{},
                defKeys:[2,4],
                editVisible:false,
            }
        },

        created() {
            this.getDictionary();
        },

        methods:{
            getDictionary(){
                getDictionary().then(res =>{
                    if (res.code === 200){
                        this.tableData = res.data;
                    }else {
                        this.$message.error('An exception occurred while obtaining dictionary information')
                    }
                })
            },

            addDictionary(){
                this.dialogVisible = true;
            },

            updateDictionary(){
                updateDictionary(this.editInfo).then(res =>{
                    if (res.code === 200){
                        this.dialogVisible2 = false;
                        this.getDictionary();
                        this.dictionary = {};
                        this.$message.success('Update succeeded');
                    }else {
                        this.$message.error('Update failed');
                    }
                })
            },

            //单个删除
            delDictionaryInfo(id){
                this.$confirm('Are you sure you want to delete this data dictionary information?','Tips',{
                    type:'warning'
                }).then(action =>{
                    if (action === 'confirm'){
                        delDictionaryInfo(id).then(res =>{
                            if (res.code == 200){
                                this.$message.success('Deletion succeeded!');
                                this.getDictionary();
                            }else{
                                this.$message.error('Deletion failed');
                            }
                        })
                    }
                })
            },

            editDictionaryInfo(row){
                this.editInfo.cdm_id = row.cdm_id;
                this.editInfo = row;
                this.dialogVisible2 = true;
            },

            saveDictionary(){
                saveDictionary(this.dictionary).then(res =>{
                    if (res.code === 200){
                        this.dialogVisible = false;
                        this.getDictionary();
                        this.$message.success('Saved successfully')
                    }else {
                        this.$message.error('Save failed')
                    }
                })
            }

        }
    };
</script>

<style scoped>

</style>
