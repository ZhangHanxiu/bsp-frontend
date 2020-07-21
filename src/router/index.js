import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

//mvo
const mvoInfoRule = {
    path: 'mvo-myInfo',
    component: () => import('../views/mvo/mvo-info'),
    name: 'myInfo',
    meta: { title: 'My Information' },
};

const goodsInputRule = {
    path: 'goodsinput',
    component: () => import('../views/mvo/goodsinput'),
    name: 'goodsinput',
    meta: { title: 'Goods Input' }
};


const goodsPictureRule = {
    path: 'goodpic',
    component: () => import('../views/mvo/goodpic'),
    name: 'goodpic',
    meta: { title: 'Goods Picture' }
};

const mvoOrderRule = {
    path: 'mvo-order',
    component: () => import('../views/mvo/mvo-order'),
    name: 'MVOorder',
    meta: { title: 'Order Management' }
};

const mvoWalletRule = {
    path: 'mvo-wallet',
    component: () => import('../views/mvo/AccountBalance'),
    name: 'MVOwallet',
    meta: { title: 'My Wallet' }
};

//Bvo

const bvoInfoRule = {
    path: 'bvo-myInfo',
    component: () => import('../views/bvo/bvo-myInfo'),
    name: 'myInfo',
    meta: { title: 'My Information' }
};

const bvoOrderRule = {
    path: 'bvo-order',
    component: () => import('../views/bvo/bvo-order'),
    name: 'Order',
    meta: { title: 'Order' }
};

const goodListRule = {
    path: 'goodsList',
    component: () => import('../views/bvo/goodsList'),
    name: 'goodsList',
    meta: { title: 'Goods List' }
};

const wishListRule = {
    path: 'wishlist',
    component: () => import('../views/bvo/wishlist'),
    name: 'wishList',
    meta: { title: 'Wish List' }
};

const bvoWalletRule = {
    path: 'bvo-wallet',
    component: () => import('../views/bvo/AccountBalance'),
    name: 'UploadExcel',
    meta: { title: 'My Wallet' }
};

const bvoInterfaceRule = {
    path: 'bvo-interface:buyer_id',
    component: () => import('../views/bvo/BvoInterface'),
    name: 'UploadExcel',
    meta: { title: 'My Wallet' }
};

const aduitRule = {
    path: 'transaction',
    component: () => import('../views/admin/Aduit'),
    name: 'transaction-aduit',
    meta: { title: 'Flow Audit' }
}

const dictionaryRule = {
    path: 'cdm',
    component: () => import('../views/admin/Dictionary'),
    name: 'goodsList',
    meta: { title: 'Dictionary Management' }
};

const menuRule = {
    path: 'mrm',
    component: () => import('../views/admin/Menu'),
    name: 'goodsList',
    meta: { title: 'Menu Management' }
};

const roleRule = {
    path: 'role-management',
    component: () => import('../views/admin/Role'),
    name: 'role',
    meta: { title: 'Role Management' }
};


const ruleMapping = {
    //mvo
    'mvo-myInfo':mvoInfoRule,
    'goodsinput':goodsInputRule,
    'goodpic':goodsPictureRule,
    'mvo-order':mvoOrderRule,
    'mvo-wallet':mvoWalletRule,

    //bvo
    'bvo-myInfo':bvoInfoRule,
    'goodsList':goodListRule,
    'wishlist':wishListRule,
    'bvo-wallet':bvoWalletRule,
    'bvo-order':bvoOrderRule,

    //admin
    'transaction':aduitRule,
    'cdm':dictionaryRule,
    'mrm':menuRule,
    'role-management':roleRule,
};

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [

                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: 'Borrow-Sell Platform' }
                },

                // mvo
                {
                    path: 'account',
                    component: () => import('../views/mvo/AccountBalance'),
                    name: 'myInfo',
                    meta: { title: '品牌商' },

                },
                {
                    path: 'interface/:buyer_id',
                    component: () => import('../views/mvo/Interface'),
                    name: 'interface',
                    meta: { title: 'interface' }
                },


                //Bvo
                // {
                //     path: 'bvo-myInfo',
                //     component: () => import('../views/bvo/bvo-myInfo'),
                //     name: 'myInfo',
                //     meta: { title: 'My Information' }
                // },
                //
                //
                // {
                //     path: 'bvo-order',
                //     component: () => import('../views/bvo/bvo-order'),
                //     name: 'Order',
                //     meta: { title: 'Order' }
                // },
                //
                // {
                //     path: 'goodsList',
                //     component: () => import('../views/bvo/goodsList'),
                //     name: 'goodsList',
                //     meta: { title: 'Goods List' }
                // },
                //
                // {
                //     path: 'wishlist',
                //     component: () => import('../views/bvo/wishlist'),
                //     name: 'wishList',
                //     meta: { title: 'Wish List' }
                // },
                //
                // {
                //     path: 'bvo-wallet',
                //     component: () => import('../views/bvo/AccountBalance'),
                //     name: 'UploadExcel',
                //     meta: { title: 'My Wallet' }
                // },

                {
                    path: 'bvo-interface:buyer_id',
                    component: () => import('../views/bvo/BvoInterface'),
                    name: 'bvo-wallet',
                    meta: { title: 'My Wallet' }
                },

                
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: 'Login' },
        },

        {
            path: '/register',
            component: () => import(/* webpackChunkName: "home" */ '../components/page/Register'),
            meta: { title: 'Register' },
        },


    ]
});

router.beforeEach((to,from,next) =>{

    // const role = sessionStorage.getItem('Authorization');
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        const token = sessionStorage.getItem('Authorization');
        if (!token) {
            next('/login')
        } else {
            next();
        }
    }
});


export function initDynamicRoutes() {
    //根据权限对路由规则进行动态添加
    const currentRouters = router.options.routes;
    console.log(currentRouters);
    const rightList = store.state.items;
    console.log(rightList);
    rightList.forEach(item1 =>{
        if (item1.subs !=null) {
            item1.subs.forEach(item2 => {
                const temp = ruleMapping[item2.menu_index];
                currentRouters[1].children.push(temp);
            })
        }
    });
    currentRouters.push(  {
        path: '*',
        redirect: '/404',
    },);


    router.addRoutes(currentRouters);

}

export default router


