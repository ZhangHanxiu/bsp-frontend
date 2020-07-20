<template>
    <div>
        <el-button type="success"  @click="addRole">Role addition</el-button>
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
            <el-table-column prop="role_name" label="Role name" align="center"></el-table-column>
            <el-table-column label="OPeration" width="380" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="delRoleInfo(scope.row.role_id)"
                    >Delete</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="red"
                            @click="editRoleInfo(scope.row.role_id)"
                    >Edit</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="authorityManagement(scope.row.role_id,scope.row)"
                    >Authority management</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-right: 800px">
            <el-dialog title="Add" :modal="false" top="390px" :visible.sync="dialogVisible" width="20%" >
                <el-form ref="add" :model="role">
                    <el-form-item label="Role name">
                        <el-input v-model="role.role_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Role description">
                        <el-input v-model="role.role_description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = true">Cancel</el-button>
                    <el-button type="primary" @click="saveRole">Sure</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="margin-right: 800px">
            <el-dialog title="Add" :modal="false" top="390px" :visible.sync="dialogVisible2" width="40%" >
                <el-form ref="add" :model="edit">
                    <el-form-item label="Role name">
                        <el-input v-model="edit.role_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Role description">
                        <el-input v-model="edit.role_description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = true">Cancel</el-button>
                    <el-button type="primary" @click="updateRole">Sure</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="Edit role information" :visible.sync="editVisible" width="33%">
            <el-form ref="form" :model="editAuth" label-width="100px">
                <el-form-item >
                    <el-tree :data="roleListTree" :props="roleTree"
                             show-checkbox node-key="menu_id" :check-strictly="true"
                             :default-checked-keys="defKeys" ref="addRoleTree">
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">Cancel</el-button>
                <el-button type="primary" @click="saveRoleAccess()">Sure</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { delRoleInfo, echoRoleInfo, getRole, saveRole, saveRoleAccess, updateRole } from '../../api/role';
    import { getMenuList } from '../../api/menu';

    export default {
        name: 'Role',
        data(){
            return{
                tableData:[],
                dialogVisible:false,
                dialogVisible2:false,
                role:{},
                edit:{},
                editAuth:{},
                roleListTree:[],
                roleTree:{
                    label:'menu_name',
                    children:'children'
                },
                form:{},
                defKeys:[],
                editVisible:false,
            }
        },

        created() {
            this.getRole();
        },

        methods:{
            getRole(){
                getRole().then(res =>{
                    if (res.code === 200){
                        this.tableData = res.data;
                    }else {
                        this.$message.error('Exception in getting role information')
                    }
                })
            },


            //保存权限信息
            saveRoleAccess(){
                const keys = [
                    ...this.$refs.addRoleTree.
                    getHalfCheckedKeys(),
                    ...this.$refs.addRoleTree.
                    getCheckedKeys(),
                ];
                this.form.menu_ids = keys.join(",");
                saveRoleAccess(this.form).then(res =>{
                    if (res.code ==200){
                        this.editVisible = false;
                        this.form = {};
                        this.$message.success('Success');
                        this.getRole();
                    }else{
                        this.$message.error('Fail');
                    }
                })
            },

            addRole(){
                this.dialogVisible = true;
            },

            saveRole(){
                saveRole(this.role).then(res =>{
                    if (res.code === 200){
                        this.dialogVisible = false;
                        this.getRole();
                        this.role = {};
                        this.$message.success('Saved successfully');
                    }else {
                        this.$message.error('Save failed');
                    }
                })
            },

            //单个删除
            delRoleInfo(id){
                this.$confirm('Are you sure you want to delete this role information?','Tips',{
                    type:'warning'
                }).then(action =>{
                    if (action === 'confirm'){
                        delRoleInfo(id).then(res =>{
                            if (res.code == 200){
                                this.$message.success('Deletion succeeded!');
                                this.getRole();
                            }else{
                                this.$message.error('Deletion failed');
                            }
                        })
                    }
                })
            },

            editRoleInfo(id){
                this.edit.role_id = id;
                this.dialogVisible2 = true;
            },

            updateRole(){
                updateRole(this.edit).then(res =>{
                    if (res.code === 200){
                        this.getRole();
                        this.dialogVisible2 = false;
                        this.$message.success('Update succeeded');
                    }else {
                        this.$message.error('Update failed')
                    }
                })
            },
            authorityManagement(id,row){
                this.form.role_id = id;
                this.editVisible = true;
                this.defKeys = [];
                getMenuList().then(res =>{
                    if (res.code === 200) {
                        this.roleListTree = res.data;
                    }else {
                        this.$message.error('Abnormal data echo')
                    }
                });
                echoRoleInfo(id).then(res =>{
                    if (res.code === 200) {
                        this.defKeys = res.data;
                        console.log(this.defKeys);
                    }
                })
            },

        }
    };
</script>

<style scoped>

</style>
