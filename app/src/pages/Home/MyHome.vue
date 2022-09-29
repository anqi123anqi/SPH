<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer />
    <MyRecommend />
    <MyRank />
    <MyLike />
    <MyFloor v-for="(floor) in floorList" :key="floor.id" :floor='floor' />
    <MyBrand />

  </div>
</template>

<script>
//引入其余的组件
import ListContainer from './ListContainer';
import MyRecommend from './MyRecommend/index.vue';
import MyRank from './MyRank';
import MyLike from './MyLike/index.vue';
import MyFloor from './MyFloor/index.vue';
import MyBrand from './MyBrand/index.vue';
import { mapState } from "vuex";
export default {
  name: "MyHome",
  components: { ListContainer, MyRecommend, MyRank, MyLike, MyFloor, MyBrand },
  computed: {
    ...mapState('home', ['floorList'])
  },
  mounted () {
    //派发action：通过vue发起AJAX请求，将数据存储在仓库中
    this.$store.dispatch('home/getFloorList');
  },
};
</script>

<style scoped></style>