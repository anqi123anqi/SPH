<template>
    <div>
        <!-- 商品分类列表 -->
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread  面包屑-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i
                                @click="removeCategory">x</i></li>
                        <!-- 关键字面包屑 -->
                        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i
                                @click="removekeyword">x</i>
                        </li>
                        <!-- 品牌面包屑 -->
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i
                                @click="removetradeMark">x</i>
                        </li>
                        <!--  平台售卖属性的面包屑 -->
                        <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">
                            {{attr.split(':')[2]}}<i @click="removeattr(index)">x</i>
                        </li>
                    </ul>
                </div>
                <!--selector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li class="active">
                                    <a href="#">综合</a>
                                </li>
                                <li>
                                    <a href="#">销量</a>
                                </li>
                                <li>
                                    <a href="#">新品</a>
                                </li>
                                <li>
                                    <a href="#">评价</a>
                                </li>
                                <li>
                                    <a href="#">价格⬆</a>
                                </li>
                                <li>
                                    <a href="#">价格⬇</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank"><img :src="goods.defaultImg" /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i> {{goods.price}}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>
                    <div class="fr page">
                        <div class="sui-pagination clearfix">
                            <ul>
                                <li class="prev disabled">
                                    <a href="#">«上一页</a>
                                </li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                                <li class="dotted"><span>...</span></li>
                                <li class="next">
                                    <a href="#">下一页»</a>
                                </li>
                            </ul>
                            <div><span>共10页&nbsp;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters, } from 'vuex';

    import SearchSelector from './SearchSelector/SearchSelector'
    export default {
        name: 'MySearch',
        components: {
            SearchSelector
        },
        data () {
            return {
                //带服务器参数
                searchParams: {
                    //一级分类
                    "category1Id": "",
                    //二级分类
                    "category2Id": "",
                    //三级分类
                    "category3Id": "",
                    //分类名称
                    "categoryName": "",
                    //关键字
                    "keyword": "",
                    //排序
                    "order": "",
                    //分页器：代表当前的页数
                    "pageNo": 1,
                    //每一页展示数据的个数
                    "pageSize": 10,
                    //平台售卖属性操作带的属性
                    "props": [],
                    // 品牌
                    "trademark": "",
                }
            }
        },
        //在组件挂载完毕之前执行一次
        beforeMount () {
            // this.searchParams.category1Id = this.$route.query.category1Id;
            // this.searchParams.category2Id = this.$route.query.category2Id;
            // this.searchParams.category3Id = this.$route.query.category3Id;
            // Object.assign()ES6新增语法，合并对象
            Object.assign(this.searchParams, this.$route.params, this.$route.query)
        },
        mounted () {
            // //发起请求之前带给服务器参数【searchParams已更新】
            // this.$store.dispatch('search/getSearchList',);
            this.getData()
        },
        computed: {
            //...mapGetters:传递的数组，
            ...mapGetters('search', ['goodsList', 'trademarkList', 'attrsList']),
        },
        methods: {
            //向服务器发起请求获取Search模块数据（根据参数不同返回不同的数据进行展示）
            //把这次请求封装成函数，需要时调用即可
            getData () {
                this.$store.dispatch('search/getSearchList', this.searchParams)
            },
            //删除分类的名字
            removeCategory () {
                //带给服务器的可无可有数据：如果属性时为空，空字符也会带给服务器，如果是undefined，当前属性不会带给服务器
                this.searchParams.categoryName = undefined;
                this.searchParams.category1Id = undefined;
                this.searchParams.category2Id = undefined;
                this.searchParams.category3Id = undefined;
                this.getData();
                //严谨：本意是删除query，如果历经中出现params应保留，路由跳转应携带params参数
                if (this.$route.params) {
                    this.$router.push({ name: 'search', params: this.$route.params })
                }
            },
            //删除关键字
            removekeyword () {
                //给服务器带的参数searchParams的keyword清空
                this.searchParams.keyword = undefined;
                //再次发请求
                this.getData();
                //通知兄弟组件Header清空字
                this.$bus.$emit('clear');
                //进行路由跳转
                if (this.$route.query) {
                    this.$router.push({ name: 'search', query: this.$route.query })
                }
            },
            //自定义事件的回调
            trademarkInfo (trademark) {   //  1:小米  
                this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
                //再次发请求获取search模块列表数据进行展示
                this.getData();
            },
            //删除品牌信息
            removetradeMark () {
                this.searchParams.trademark = undefined;
                //再次发请求
                this.getData();
            },
            //删除售卖属性
            removeattr (index) {
                //再次整理参数
                this.searchParams.props.splice(index, 1);
                this.getData();
            },
            //收集平台属性 （自定义事件）
            attrInfo (attr, attrValue) {
                ///整理数据格式
                let props = `${attr.attrId}:${attr.attrName}:${attrValue}`;
                //数组去重
                if (this.searchParams.props.indexOf(props) == -1) {
                    this.searchParams.props.push(props);
                }
                //再次发起请求
                this.getData();
            }
        },
        //数据监听：监听组件实例身上的属性的属性值变化
        watch: {
            //监听路由的信息是否发生变化，如果发生变化，再次发起请求
            $route () {
                //每一次请求完毕，应该把相应的category1Id，category2Id，category3Id的数据清空
                this.searchParams.category1Id = undefined;
                this.searchParams.category2Id = undefined;
                this.searchParams.category3Id = undefined;
                //再一次发起请求之前，整理参数
                Object.assign(this.searchParams, this.$route.query, this.$route.params);
                this.getData();
            }
        }

    }
</script>

<style lang="less" scoped>
    .main {
        margin: 10px 0;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .bread {
                margin-bottom: 5px;
                overflow: hidden;

                .sui-breadcrumb {
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float: left;

                    li {
                        display: inline-block;
                        line-height: 18px;

                        a {
                            color: #666;
                            text-decoration: none;

                            &:hover {
                                color: #4cb9fc;
                            }
                        }
                    }
                }

                .sui-tag {
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;

                    .with-x {
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition: color 400ms;
                        cursor: pointer;

                        i {
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }

                        &:hover {
                            color: #28a3ef;
                        }
                    }
                }
            }

            .details {
                margin-bottom: 5px;

                .sui-navbar {
                    overflow: visible;
                    margin-bottom: 0;

                    .filter {
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                        .sui-nav {
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;

                            li {
                                float: left;
                                line-height: 18px;

                                a {
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }

                                &.active {
                                    a {
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }

                .goods-list {
                    margin: 20px 0;

                    ul {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;

                            .list-wrap {
                                .p-img {
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;

                                    a {
                                        color: #666;

                                        img {
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }

                                .price {
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;

                                    strong {
                                        font-weight: 700;

                                        i {
                                            margin-left: -5px;
                                        }
                                    }
                                }

                                .attr {
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;

                                    a {
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }

                                .commit {
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;

                                    span {
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }

                                .operate {
                                    padding: 12px 15px;

                                    .sui-btn {
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }

                                    .btn-bordered {
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;

                                        &:hover {
                                            border: 1px solid #666;
                                            color: #fff !important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }

                                    .btn-danger {
                                        border: 1px solid #e1251b;
                                        color: #e1251b;

                                        &:hover {
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color: white !important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .page {
                    width: 733px;
                    height: 66px;
                    overflow: hidden;
                    float: right;

                    .sui-pagination {
                        margin: 18px 0;

                        ul {
                            margin-left: 0;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 490px;
                            float: left;

                            li {
                                line-height: 18px;
                                display: inline-block;

                                a {
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    border: 1px solid #e0e9ee;
                                    margin-left: -1px;
                                    font-size: 14px;
                                    padding: 9px 18px;
                                    color: #333;
                                }

                                &.active {
                                    a {
                                        background-color: #fff;
                                        color: #e1251b;
                                        border-color: #fff;
                                        cursor: default;
                                    }
                                }

                                &.prev {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }

                                &.disabled {
                                    a {
                                        color: #999;
                                        cursor: default;
                                    }
                                }

                                &.dotted {
                                    span {
                                        margin-left: -1px;
                                        position: relative;
                                        float: left;
                                        line-height: 18px;
                                        text-decoration: none;
                                        background-color: #fff;
                                        font-size: 14px;
                                        border: 0;
                                        padding: 9px 18px;
                                        color: #333;
                                    }
                                }

                                &.next {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }
                            }
                        }

                        div {
                            color: #333;
                            font-size: 14px;
                            float: right;
                            width: 241px;
                        }
                    }
                }
            }
        }
    }
</style>