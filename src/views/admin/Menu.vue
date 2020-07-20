<template>
   <div>
       <el-button type="success" @click="addMenu">Menu addition</el-button>
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
               >Edit</el-button>
               <el-button
                       type="text"
                       icon="el-icon-delete"
                       class="red"
                       @click="delMenu(scope.row.menu_id)"
               >Delete</el-button>
               <el-button
                       type="text"
                       icon="el-icon-plus"
                       class="green"
                       @click="addNextNode(scope.row)"
               >Add Next node</el-button>
           </template>

       </zk-table>

       <div style="margin-right: 800px">
           <el-dialog title="Add" :modal="false" top="390px" :visible.sync="dialogAddVisible" width="20%" >
               <el-form ref="add" :model="menu">
                   <el-form-item label="Resource path">
                       <el-input v-model="menu.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Name">
                       <el-input v-model="menu.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Sort">
                       <el-input v-model="menu.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="dialogAddVisible = false">Cancel</el-button>
                   <el-button type="primary" @click="saveMenu">Sure</el-button>
               </div>
           </el-dialog>
       </div>
       <div style="margin-right: 800px">
           <el-dialog title="Edit" :modal="false" top="390px" :visible.sync="editDialogAddVisible" width="20%" >
               <el-form ref="add" :model="edit">
                   <el-form-item label="Resource path">
                       <el-input v-model="edit.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Name">
                       <el-input v-model="edit.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Sort">
                       <el-input v-model="edit.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="editDialogAddVisible = false">Cancel</el-button>
                   <el-button type="primary" @click="updateMenu">Sure</el-button>
               </div>
           </el-dialog>
       </div>

       <div style="margin-right: 800px">
           <el-dialog title="Add" :modal="false" top="390px" :visible.sync="dialogAddVisible2" width="20%" >
               <el-form ref="add" :model="menu">
                   <el-form-item label="Resource path">
                       <el-input v-model="menu.menu_index" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Name">
                       <el-input v-model="menu.menu_name" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="Sort">
                       <el-input v-model="menu.menu_order" autocomplete="off"></el-input>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="dialogAddVisible2 = false">Cancel</el-button>
                   <el-button type="primary" @click="saveNextMenu">Sure</el-button>
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
                        label: 'Name',
                        prop: 'menu_name',
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: 'Resource path',
                        prop: 'menu_index',
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: 'Sort',
                        prop: 'menu_order',
                        headerAlign: 'center',
                        align: 'center'

                    },
                    {
                        label: 'Operation',
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
                        this.$message.error('Menu data return exception')
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
                        this.$message.error('Save failed')
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
                        this.$message.success('Update succeeded');
                    }else {
                        this.$message.error('Update failed, we are beating programmers')
                    }
                })
            },

            delMenu(id){
                this.$confirm('You are about to delete the menu information. Do you want to continue？','Tips', {
                    type: 'danger'
                }).then(action =>{
                    if (action === 'confirm'){
                        delMenu(id).then(res =>{
                            if (res.code === 200){
                                this.getMenuList();
                                this.$message.success('Deletion succeeded');
                            }else{
                                this.$message.error('Deletion failed');
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
                        this.$message.error('Save failed')
                    }
                })
            }
        }
    };
</script>

<style scoped>

</style>
