<template>
   <div>
       <el-button type="success" @click="addMenu">菜单添加</el-button>
       <zk-table :data="list" :columns="columns"
                 :expand-type="false"
                 :show-row-hover="true"
                 :show-index="true" :stripe="true"  check-strictly="true"
                 ref="tree"
       >
           <template slot="operation"  slot-scope="scope">
               <el-button
                       type="text"
                       icon="el-icon-edit"
                       @click="editMenu(scope.row)"
               >修改</el-button>
               <el-button
                       type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="delMenu(scope.row.menu_id)"
               >删除</el-button>
               <el-button
                       type="text"
                       icon="el-icon-plus"
                       class="green"
                       @click="addNextNode(scope.row)"
               >添加下节点</el-button>
           </template>

       </zk-table>

       <div style="margin-right: 800px">
           <el-dialog title="添加" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
               <el-form ref="add" :model="menu">
                   <el-form-item label="资源路径">
                       <el-input v-model="menu.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="名称">
                       <el-input v-model="menu.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="排序">
                       <el-input v-model="menu.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="">取 消</el-button>
                   <el-button type="primary" @click="saveMenu">确 定</el-button>
               </div>
           </el-dialog>
       </div>
       <div style="margin-right: 800px">
           <el-dialog title="编辑" :modal="false" top="390px" :visible.sync="editDialogAddVisible" width="20%" >
               <el-form ref="add" :model="edit">
                   <el-form-item label="资源路径">
                       <el-input v-model="edit.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="名称">
                       <el-input v-model="edit.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="排序">
                       <el-input v-model="edit.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="">取 消</el-button>
                   <el-button type="primary" @click="updateMenu">确 定</el-button>
               </div>
           </el-dialog>
       </div>

       <div style="margin-right: 800px">
           <el-dialog title="添加" :modal="false" top="390px" :visible.sync="dialogAddVisible2" width="20%" >
               <el-form ref="add" :model="menu">
                   <el-form-item label="资源路径">
                       <el-input v-model="menu.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="名称">
                       <el-input v-model="menu.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="排序">
                       <el-input v-model="menu.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="">取 消</el-button>
                   <el-button type="primary" @click="saveNextMenu">确 定</el-button>
               </div>
           </el-dialog>
       </div>
   </div>
</template>

<script>

    import { delMenu, getMenuList, saveMenu, saveNextMenu, updateMenu } from '../../api/menu';
    export default {
        name: 'Menu',
        data(){
            return{
                list: [],
                //为table指定列的定义
                columns: [
                    {
                        label: '名称',
                        prop: 'menu_name',
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: '资源路径',
                        prop: 'menu_index',
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: '排序',
                        prop: 'menu_order',
                        headerAlign: 'center',
                        align: 'center'

                    },
                    {
                        label: '操作',
                        type: 'template',
                        headerAlign: 'center',
                        template: 'operation'

                    }
                ],
                dialogAddVisible:false,
                editDialogAddVisible:false,
                dialogAddVisible2:false,
                menu:{},
                edit:{},
            }
        },
        created() {
            this.getMenuList();
        },

        methods:{
            getMenuList(){
                getMenuList().then(res =>{
                    if (res.code === 200){
                        this.list = res.data;
                    }else {
                        this.$message.error('菜单数据返回异常')
                    }
                })
            },

            addMenu(){
                this.dialogAddVisible = true;
            },

            saveMenu(){
                saveMenu(this.menu).then(res =>{
                    if (res.code === 200){
                        this.getMenuList();
                        this.dialogAddVisible2 = false;
                        this.menu = {};
                    }else {
                        this.$message.error('保存失败')
                    }
                })
            },

            editMenu(row){
                this.edit = row;
                this.editDialogAddVisible = true;
            },
            updateMenu(){
                updateMenu(this.edit).then(res =>{
                    if (res.code === 200){
                        this.editDialogAddVisible = false;
                        this.edit = {};
                        this.getMenuList();
                        this.$message.success('更新成功');
                    }else {
                        this.$message.error('更新失败,我们正在痛打程序员小哥哥')
                    }
                })
            },

            delMenu(id){
                this.$confirm('您将要删除该菜单信息，是否继续？','提示', {
                    type: 'danger'
                }).then(action =>{
                    if (action === 'confirm'){
                        delMenu(id).then(res =>{
                            if (res.code === 200){
                                this.getMenuList();
                                this.$message.success('删除成功');
                            }else{
                                this.$message.error('删除失败');
                            }
                        })
                    }
                })
            },

            addNextNode(row){
                this.dialogAddVisible2 = true;
                this.menu.parent_id = row.menu_id;
            },

            saveNextMenu(){

                saveNextMenu(this.menu).then(res =>{
                    if (res.code === 200){
                        this.getMenuList();
                        this.dialogAddVisible = false;
                        this.menu = {};
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
