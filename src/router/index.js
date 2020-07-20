import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

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

                {
                    path: 'mvo-myInfo',
                    component: () => import('../views/mvo/mvo-info'),
                    name: 'myInfo',
                    meta: { title: 'My Information' },
                },

                {
                    path: 'goodsinput',
                    component: () => import('../views/mvo/goodsinput'),
                    name: 'goodsinput',
                    meta: { title: 'Goods Input' }
                },

                {
                    path: 'goodpic',
                    component: () => import('../views/mvo/goodpic'),
                    name: 'goodpic',
                    meta: { title: 'Goods Picture' }
                },

                {
                    path: 'mvo-order',
                    component: () => import('../views/mvo/mvo-order'),
                    name: 'MVOorder',
                    meta: { title: 'Order Management' }
                },
                {
                    path: 'mvo-wallet',
                    component: () => import('../views/mvo/AccountBalance'),
                    name: 'MVOwallet',
                    meta: { title: 'My Wallet' }
                },


                //Bvo
                {
                    path: 'bvo-myInfo',
                    component: () => import('../views/bvo/bvo-myInfo'),
                    name: 'myInfo',
                    meta: { title: 'My Information' }
                },


                {
                    path: 'bvo-order',
                    component: () => import('../views/bvo/bvo-order'),
                    name: 'Order',
                    meta: { title: 'Order' }
                },

                {
                    path: 'goodsList',
                    component: () => import('../views/bvo/goodsList'),
                    name: 'goodsList',
                    meta: { title: 'Goods List' }
                },

                {
                    path: 'wishlist',
                    component: () => import('../views/bvo/wishlist'),
                    name: 'wishList',
                    meta: { title: 'Wish List' }
                },

                {
                    path: 'bvo-wallet',
                    component: () => import('../views/bvo/AccountBalance'),
                    name: 'UploadExcel',
                    meta: { title: 'My Wallet' }
                },

                {
                    path: 'bvo-interface:buyer_id',
                    component: () => import('../views/bvo/BvoInterface'),
                    name: 'UploadExcel',
                    meta: { title: 'My Wallet' }
                },




                //admin

                {
                    path: 'transaction',
                    component: () => import('../views/admin/Aduit'),
                    name: 'transaction-aduit',
                    meta: { title: 'Flow Audit' }
                },
                {
                    path: 'cdm',
                    component: () => import('../views/admin/Dictionary'),
                    name: 'goodsList',
                    meta: { title: 'Dictionary Management' }
                },
                {
                    path: 'mrm',
                    component: () => import('../views/admin/Menu'),
                    name: 'goodsList',
                    meta: { title: 'Menu Management' }
                },

                {
                    path: 'role-management',
                    component: () => import('../views/admin/Role'),
                    name: 'role',
                    meta: { title: 'Role Management' }
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
        {
            path: '*',
            redirect: '/404'
        },


    ]
});

router.beforeEach((to,from,next) =>{

    const role = sessionStorage.getItem('Authorization');
    console.log(role);
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
export default router


