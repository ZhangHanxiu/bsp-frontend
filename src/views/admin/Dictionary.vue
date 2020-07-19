<template>
    <div>
        <el-button type="success"  @click="addDictionary">数据字典</el-button>
        <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change=""
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="105" align="center"></el-table-column>
            <el-table-column prop="code_type" label="字典类型" align="center"></el-table-column>
            <el-table-column prop="description" label="用途描述" align="center"></el-table-column>
            <el-table-column prop="type_cd" label="编码" align="center"></el-table-column>
            <el-table-column prop="code_val" label="编码值" align="center"></el-table-column>
            <el-table-column label="操作" width="380" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="delDictionaryInfo(scope.row.cdm_id)"
                    >删除</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="red"
                            @click="editDictionaryInfo(scope.row)"
                    >修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-right: 800px">
            <el-dialog title="添加" :modal="false" top="390px" :visible.sync="dialogVisible" width="20%" >
                <el-form ref="add" :model="dictionary">
                    <el-form-item label="字典类型">
                        <el-input v-model="dictionary.code_type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="dictionary.type_cd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编码值">
                        <el-input v-model="dictionary.code_val" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dictionary.description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="">取 消</el-button>
                    <el-button type="primary" @click="saveDictionary">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="margin-right: 800px">
            <el-dialog title="编辑" :modal="false" top="390px" :visible.sync="dialogVisible2" width="30%" >
                <el-form ref="add1" :model="editInfo">
                    <el-form-item label="字典类型">
                        <el-input v-model="editInfo.code_type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="editInfo.type_cd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编码值">
                        <el-input v-model="editInfo.code_val" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="editInfo.description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="">取 消</el-button>
                    <el-button type="primary" @click="updateDictionary">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑角色信息" :visible.sync="editVisible" width="33%">
            <el-form ref="form" :model="editAuth" label-width="100px">
                <el-form-item >
                    <el-tree :data="roleListTree" :props="roleTree"
                             show-checkbox node-key="id" :check-strictly="true"
                             :default-checked-keys="defKeys" ref="roleTree">
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRoleAccess()">确 定</el-button>
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
                        this.$message.error('获取字典信息出现异常')
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
                        this.$message.success('更新成功');
                    }else {
                        this.$message.error('更新失败');
                    }
                })
            },

            //单个删除
            delDictionaryInfo(id){
                this.$confirm('确定要删除这个数据字典信息吗?','提示',{
                    type:'warning'
                }).then(action =>{
                    if (action === 'confirm'){
                        delDictionaryInfo(id).then(res =>{
                            if (res.code == 200){
                                this.$message.success('删除成功!');
                                this.getDictionary();
                            }else{
                                this.$message.error('删除失败');
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
                        this.$message.success('保存成功')
                    }else {
                        this.$message.error('保存失败')
                    }
                })
            }

        }
    };
</script>

<style scoped>

</style>
