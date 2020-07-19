<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in menuList">
                <template v-if="item.subs">
                    <el-submenu :index="item.menu_index" :key="item.menu_id">
                        <template slot="title">
                            <i :class="item.menu_icon"></i>
                            <span slot="title">{{ item.menu_name }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.menu_index"
                                :key="subItem.menu_id"
                            >
                                <template slot="title">{{ subItem.menu_name }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.menu_index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.menu_index"
                                :key="subItem.menu_id"
                            >{{ subItem.menu_name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import {mapState} from 'vuex'
export default {
    data() {
        return {
            collapse: false,
        //     items: [
        //         {
        //             icon: 'el-icon-lx-home',
        //             index: 'dashboard',
        //             title: '首系统页'
        //         },
        //         {
        //             icon: 'el-icon-lx-global',
        //             index: '1',
        //             title: 'MVO',
        //             subs: [
        //                 {
        //                     index: 'mvo-myInfo',
        //                     title: 'My Information'
        //                 },
        //                 {
        //                     index: 'info',
        //                     title: 'MVO Info'
        //                 },
        //                 {
        //                     index:'goodsinput',
        //                     title:'Goods Input'
        //                 },
        //                 {
        //                     index:'export-merge-header',
        //                     title:'Goods Picture'
        //                 },
        //                 {
        //                     index:'MVOordermanagement',
        //                     title:'Order Management'
        //                 },
        //                 {
        //                     index:'MVOwallet',
        //                     title:'My Wallet'
        //                 },
        //
        //             ]
        //         },
        //         {
        //             icon: 'el-icon-lx-warn',
        //             index: '2',
        //             title: 'BVO',
        //             subs: [
        //                 {
        //                     index: 'bvo-myInfo',
        //                     title: 'My Information'
        //                 },
        //                 {
        //                     index: 'stores',
        //                     title: 'Stores'
        //                 },
        //                 {
        //                     index: 'goodsList',
        //                     title: 'Goods List'
        //                 },
        //                 {
        //                     index: 'wishList',
        //                     title: 'Wish List'
        //                 },
        //                 {
        //                     index:'BVOorder',
        //                     title:'Order Management'
        //                 },
        //                 {
        //                     index:'bvo-wallet',
        //                     title:'My Wallet'
        //                 },
        //
        //
        //             ]
        //         },
        //         {
        //             icon: 'el-icon-lx-warn',
        //             index: '3',
        //             title: 'Admin',
        //             subs: [
        //                 {
        //                     index: 'admin-myInfo',
        //                     title: '充值提现审核'
        //                 },
        //
        //                 {
        //                     index:'menu',
        //                     title:'菜单/角色管理'
        //                 },
        //                 {
        //                     index: 'parameter',
        //                     title: '参数管理'
        //                 },
        //                 {
        //                     index: 'dictionary',
        //                     title: '数据字典管理'
        //                 },
        //                 {
        //                     index:'upload-excel3',
        //                     title:'My Wallet'
        //                 }
        //
        //             ]
        //         },
        // ],
            menuList:[],
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        ...mapState(['items'])
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.menuList = this.items;
    },
    methods:{

    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
