<template>
    <div id="app">
        <transition name="fade">
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { initDynamicRoutes } from './router'
    export default {
        name:'app',
        created() {
            initDynamicRoutes();
        }
    }
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
