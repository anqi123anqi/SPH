<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer />
        <MyRecommend />
        <MyRank />
        <MyLike />
        <MyFloor />
        <MyFloor />
        <MyBrand />

    </div>
</template>

<script>
    //引入其余的组件
    import ListContainer from './ListContainer'
    import MyRecommend from './MyRecommend/index.vue'
    import MyRank from './MyRank';
    import MyLike from './MyLike/index.vue';
    import MyFloor from './MyFloor/index.vue';
    import MyBrand from './MyBrand/index.vue';

    export default {
        name: "MyHome",
        components: { ListContainer, MyRecommend, MyRank, MyLike, MyFloor, MyBrand },
    };
</script>

<style scoped></style>