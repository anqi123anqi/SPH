<template>
    <div id="app">
        <MyHeader></MyHeader>
        <!-- 路由组件出口的地方 -->
        <router-view></router-view>
        <!-- 在Home，Search显示与隐藏，在登录，注册隐藏 -->
        <MyFoot v-show="$route.path == '/home' || $route.path == '/search'"></MyFoot>
        <!-- <MyFoot v-show="$route.path.includes('/home', '/search', '/#')"></MyFoot> -->
        <!-- <MyFoot v-show="$route.meta.show"></MyFoot> -->
    </div>
</template>

<script>
    import MyHeader from "./components/Head/MyHeader";
    import MyFoot from "./components/Footer/MyFoot";

    export default {
        name: "App",
        components: {
            MyHeader,
            MyFoot,
        },
        mounted () {
            // 通过Vuex发起请求，获取数据，存储在仓库中
            this.$store.dispatch('home/CategortyList')
        },
    };
</script>

<style></style>