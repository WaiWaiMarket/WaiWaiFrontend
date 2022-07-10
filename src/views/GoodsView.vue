<template>
    <div id="GoodsView">
        <el-row :gutter="20">
            <h2>二手商品浏览</h2>
            <el-col :span="5" :offset="16">
                <el-input placeholder="输入商品名、商品ID" v-model="search" clearable>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="load">搜索</el-button>
            </el-col>

            <!-- 二手商品浏览 -->
            <el-col :span="20" :offset="2" style="padding-top:30px;">
                
                <el-row>
                    <el-col :span="6" v-for="(item) in data1" :key="item.goodsid" :offset="3">
                        <el-card :body-style="{ padding: '0px' }" style="padding-right: 0;">
                            <img :src="urlimg + item.goodsimg"
                                class="image" width="30%">
                            <div style="padding: 14px;">
                                <span>{{ item.goodsname }}</span>
                                <div class="bottom clearfix">
                                    <span class="info-title">{{ item.goodsdesc }}</span>
                                    <el-button type="text" class="button" @click="clickGoodsInfoButton(item.goodsid)">
                                        查看详情</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row style="padding-top: 50px;">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[10]" :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </el-row>
            </el-col>

            <!-- 单个商品的详情 -->
            <el-col :span="20" :offset="0" style="padding-top:30px;">
                <el-dialog :title="goodsInfoName" :visible.sync="centerDialogVisible" width="418px" center>
                    <div style="text-align: center">
                        <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image" width="365px" height="300px">-->
                        <el-carousel direction="horizontal" :autoplay="true">
                            <el-carousel-item v-for="item in goodsInfoImg" :key="item.imgid"
                                style="width: 365px;height: 300px;">
                                <img :src="urlimg + item.imgurl" alt="请检查网络连接" width="93%">
                            </el-carousel-item>
                        </el-carousel> 
                        <h2><img src="@/assets/yuan.png" alt="￥" width="30px">:
                            {{ parseInt(goodsInfoPrice) / 100 }}</h2>
                        <p>{{ goodsInfoDscrip }}</p>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" style="margin-top: 30px;" @click="addWant()">加入我想要</el-button>
                        </span>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import request from '@/utils/request';

export default {
    name: 'GoodsView',
    data() {
        return {
            urlimg: 'http://localhost:9002/upload/',
            data1: [], //所有商品
            dataSearch: [], //用来保存搜索的全部结果
            search: "",
            goodsInfoId: "",
            goodsInfoImg: {},
            goodsInfoName: "",
            goodsInfoDscrip: "",
            goodsInfoPrice: 0,
            centerDialogVisible: false,
            dialogValue: "",
            centerDialogVisible2: false,
            goToShopCar: true,
            currentPage: 1, //初始页
            pageSize: 10, //每页的数据
            paginationShow: false, //默认不显示分页
            searchFlag: false, //用来避免频繁向服务器发送数据
            fullscreenLoading: false, //模拟加载
        }
    },
    components: {

    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            request.get("/api/good/selectAllByPage", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search,
                }
            }).then(res => {
                console.log(this.search)
                console.log(res);
                this.data1 = res.data.records;
                this.total = res.data.total;
            })
        },
        clickGoodsInfoButton(goodsId) {
            this.centerDialogVisible = true;
            this.goodsInfoId = goodsId;
            let self = this;
            request.get("/api/good/select/goodsid?goodsid=" + goodsId)
                .then(res => {
                    console.log(res);
                    var data = res.data
                    console.log(data)
                    self.goodsInfoName = data.goodsname;
                    self.goodsInfoPrice = data.goodsprice;
                    self.goodsInfoDscrip = data.goodsdesc;
                })
            request.get("/api/img/all?id=" + goodsId).then(res => {
                console.log(res);
                self.goodsInfoImg = res.data
                console.log(self.goodsInfoImg );
            })
        },
        handleSizeChange(pageSize) {//改变当前页面个数
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {//改变当前页码
            this.currentPage = pageNum;
            this.load();
        },
        addWant() {
            var goodsId = this.goodsInfoId;
            var userId = window.sessionStorage.getItem("user");
            request.get("/api/want/insert?goodsid=" + goodsId +"&userid="+userId).then(res => {
                console.log(res);
                if (res.state == '0') {
                    this.$message({
                        type: "success",
                        message: "加入我想要成功"
                    })
                    this.$router.push("/wantview");
                }
                else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.info-title {
    font-size: 13px;
    color: #999;
    width: 100%;
    /*一定要设置宽度，或者元素内含的百分比*/
    overflow: hidden;
    /*溢出的部分隐藏*/
    white-space: nowrap;
    /*文本不换行*/
    text-overflow: ellipsis;
    /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
</style>