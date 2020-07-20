import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import ZkTable from 'vue-table-with-tree-grid'
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './store';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// Vue.component('echartt', echarts)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ZkTable);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to,from,next) =>{
//
//     const role = sessionStorage.getItem('Authorization');
//     console.log("token: "+role);
//     console.log("to.path: "+to.path);
//     if (to.path === '/login' || to.path === 'register') {
//         next()
//     } else {
//         const token = sessionStorage.getItem('Authorization');
//         if (!token) {
//             next('/login')
//         } else {
//             next();
//         }
//     }
// });

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
