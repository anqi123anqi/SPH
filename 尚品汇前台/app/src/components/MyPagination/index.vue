<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled="pageNo==1" @click="$emit('getpageno',(pageNo-1))">上一页</button>
        <button v-if="startNumAndEdnNum.start>1" @click="$emit('getpageno',1)">1</button>
        <button v-if="startNumAndEdnNum.start>2">···</button>

        <!-- 中间结构 -->
        <button v-for="(page,index) in  startNumAndEdnNum.end" :key="index" @click="$emit('getpageno',page)"
            v-show="page>=startNumAndEdnNum.start" :class="{active:pageNo==page}">{{page}}</button>

        <!-- 下 -->
        <button v-show="startNumAndEdnNum.end<(totalPag-1)">···</button>
        <button v-show="startNumAndEdnNum.end<totalPag" @click="$emit('getpageno',totalPag)">{{totalPag}}</button>
        <button :disabled="pageNo==totalPag" @click="$emit('getpageno',(pageNo+1))">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
        <h1>---{{pageNo}}---{{startNumAndEdnNum}}</h1>
    </div>
</template>

<script>
    export default {
        name: "MyPagination",
        props: ['pageNo', 'pageSize', 'total', 'continue'],
        //计算属性 
        computed: {
            //计算总页数
            totalPag () {
                //向上取整
                return Math.ceil(this.total / this.pageSize);
            },
            //计算连续的页码的起始数字和结束数字 
            startNumAndEdnNum () {
                let start = 0, end = 0;
                //连续页码数5，至少5页，
                if (this.continue > this.totalPag) {
                    start = 1;
                    end = this.totalPag
                } else {
                    start = this.pageNo - (this.continue - 1) / 2;
                    end = this.pageNo + (this.continue - 1) / 2;
                    //前边界：当前pageNo是1，2的情况
                    if (start < 1) {
                        start = 1;
                        end = this.continue;
                    };
                    //后边界：当前页为最后一，二页
                    if (end > this.totalPag) {
                        end = this.totalPag;
                        start = end - (this.continue - 1);
                    };
                }
                return { start, end };

            },
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;

        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>