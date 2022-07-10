<template>
    <div style="padding-left:10px; padding-right: 10px; width: calc(100vw - 200px)">
        <el-col :span="20" :offset="3" style="padding-top:30px;">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="goodsname" label="商品名称">
                </el-table-column>
                <el-table-column prop="goodsprice" label="商品价格">
                </el-table-column>
                <el-table-column prop="goodsdesc" label="商品描述">
                </el-table-column>
                <el-table-column prop="goodslevel" label="商品程度">
                </el-table-column>
                <el-table-column prop="goodsdate" label="发布时间">
                </el-table-column>

                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <div style="display: flex; align-content: space-between">
                            <el-button @click="addOrder(scope.row.goodsid)" type="primary">购买</el-button>
                            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.wantid)">
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>


    </div>
</template>

<script>


import request from "@/utils/request";

export default {
    name: 'WantView',
    components: {

    },
    data() {
        return {
            form: {},
            search: '',
            currentPage: 1,
            pageSize: 5,
            total: 0,
            dialogVisible: false,
            tableData: [],
            user: {}
        }
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            console.log(this.currentPage);
            console.log(this.pageSize);
			var userId = window.sessionStorage.getItem("user")

            request.get("/api/want/selectAllByPage", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    userId: userId,
                }
            })
			.then(res => {
				console.log(res)
				this.tableData=res.data.records;
			})

			/*request.get("/api/want/selectAllByPage?pageNum="+ this.currentPage +"&pageSize="+ this.pageSize +"&userId=" + userId)
			.then(res => {
				console.log(res)
				this.tableData=res.data.records;
                this.currentPage = res.data.current;
                this.pageSize = res.data.size;
			})*/
        },
        handleSizeChange(pageSize) {//改变当前页面个数
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {//改变当前页码
            this.currentPage = pageNum;
            this.load();
        },
        // currentPage(){
        //
        // },

        addOrder(id){
            console.log(id);
            var userId = window.sessionStorage.getItem("user")
            request.get("/api/order/create?goodsid=" + id + "&buyid=" + userId).then(res => {
                console.log(res)
                if (res.state == '0') {
                    this.$message({
                        type: "success",
                        message: "生成订单成功"
                    })
                    this.$router.push("/userinfo");
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
                this.load()//重新加载
            });

        },
        handleDelete(id) {
            console.log(id);
            request.get("/api/want/delete?id=" + id).then(res => {
                console.log(res)
                if (res.state == '0') {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    })
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
                this.load()//重新加载
            });
        },

        filesUploadSuccess(res) {
            console.log(res);
            this.form.cover = res.data;
            this.load();
        }

    }
}
</script>
