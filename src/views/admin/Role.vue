<template>
    <div>
        <el-button type="success"  @click="addRole">角色添加</el-button>
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
            <el-table-column prop="role_name" label="角色名称" align="center"></el-table-column>
            <el-table-column label="操作" width="380" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="delRoleInfo(scope.row.role_id)"
                    >删除</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="red"
                            @click="editRoleInfo(scope.row.role_id)"
                    >修改</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="authorityManagement(scope.row.role_id,scope.row)"
                    >权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-right: 800px">
            <el-dialog title="添加" :modal="false" top="390px" :visible.sync="dialogVisible" width="20%" >
                <el-form ref="add" :model="role">
                    <el-form-item label="角色名称">
                        <el-input v-model="role.role_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="role.role_description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="">取 消</el-button>
                    <el-button type="primary" @click="saveRole">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="margin-right: 800px">
            <el-dialog title="添加" :modal="false" top="390px" :visible.sync="dialogVisible2" width="40%" >
                <el-form ref="add" :model="edit">
                    <el-form-item label="角色名称">
                        <el-input v-model="edit.role_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="edit.role_description" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="">取 消</el-button>
                    <el-button type="primary" @click="updateRole">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑角色信息" :visible.sync="editVisible" width="33%">
            <el-form ref="form" :model="editAuth" label-width="100px">
                <el-form-item >
                    <el-tree :data="roleListTree" :props="roleTree"
                             show-checkbox node-key="menu_id" :check-strictly="true"
                             :default-checked-keys="defKeys" ref="addRoleTree">
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleAccess()">确 定</el-button>
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
                        this.$message.error('获取角色信息出现异常')
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
                        this.$message.success('成功');
                        this.getRole();
                    }else{
                        this.$message.error('失败');
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
                        this.$message.success('保存成功');
                    }else {
                        this.$message.error('保存失败');
                    }
                })
            },

            //单个删除
            delRoleInfo(id){
                this.$confirm('确定要删除这个角色信息吗?','提示',{
                    type:'warning'
                }).then(action =>{
                    if (action === 'confirm'){
                        delRoleInfo(id).then(res =>{
                            if (res.code == 200){
                                this.$message.success('删除成功!');
                                this.getRole();
                            }else{
                                this.$message.error('删除失败');
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
                        this.$message.success('更新成功');
                    }else {
                        this.$message.error('更新失败')
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
                        this.$message.error('数据回显异常')
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
