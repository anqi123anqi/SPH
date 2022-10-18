<template>
    <div>
        <!-- 商品分类导航 -->
        <div class="type-nav" @mouseleave="leaveshow">
            <div class="container" @mouseleave="leaveIndex">
                <h2 class="all" @mouseenter="entershow">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 三级联动 -->
                <!-- 动画过渡 -->
                <transition name="sort">
                    <div class="sort" v-if="show">
                        <!-- 利用事件的委托+编程式导航实现路由的传参和跳转 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item bo" v-for="(c1,index) in categortyList.slice(0, 16) " :key="c1.categoryId"
                                :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryname="c1.categoryName"
                                        :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二，三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryname="c2.categoryName"
                                                    :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em>
                                                    <a v-for="c3 in c2.categoryChild"
                                                        :data-categoryname="c3.categoryName" :key="c3.ategoryId"
                                                        :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    import throttle from 'lodash/throttle'

    export default {
        name: 'TypeNav',
        data () {
            return {
                currentIndex: -1,
                show: true,
            }
        },
        mounted () {
            // // 通过Vuex发起请求，获取数据，存储在仓库中
            // this.$store.dispatch('home/CategortyList')
            // ...mapActions('home', ['reqCategortyList']),

            //当组件挂载完毕，判断当前路径是否为 search ，再看typenav显示否
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        computed: {
            //对象写法：右侧需要一个函数，当使用这个计算属性时，就会执行一次
            ...mapState({
                categortyList: state => state.home.categortyList
            })
            // ...mapState('home', ['categortyList'])
        },
        methods: {
            changeIndex: throttle(function (index) {
                this.currentIndex = index;
            }, 100),
            leaveIndex () {
                this.currentIndex = -1
            },
            //进行路由的跳转
            goSearch (e) {
                let Element = e.target;
                let { categoryname, category1id, category2id, category3id } = Element.dataset;
                if (categoryname) {
                    //整理路由参数
                    let loaction = { name: 'search' };
                    let query = { categoryName: categoryname }
                    //区分一级，二级，三级
                    if (category1id) {
                        query.category1Id = category1id;
                    }
                    else if (category2id) {
                        query.category2Id = category2id;
                    }
                    else if (category3id) {
                        query.category3Id = category3id;
                    }
                    //判断：如果路由跳转时,params有参数，稍带过去
                    if (this.$route.params) {
                        loaction.params = this.$route.params;
                    }
                    //动态的给loaction传递query参数
                    loaction.query = query
                    // console.log(loaction);
                    //路由跳转
                    this.$router.push(loaction)
                }
            },
            entershow () {
                if (this.$route.path != '/home') {
                    this.show = true
                }
            },
            leaveshow () {
                if (this.$route.path != '/home') {
                    this.show = false
                }
            }

        },
    }
</script>
<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {

                    .item {

                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        /* &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                        &:hover {
                            background-color: skyblue;
                        }

                    }


                }
            }

            /* 过渡动画 */
            /* 开始 */
            .sort-enter {
                height: 0;
            }

            /* 结束 */
            .sort-enter-to {
                height: 461px;
            }

            .sort-enter-active {
                transition: all .5s linear;
            }
        }
    }
</style>