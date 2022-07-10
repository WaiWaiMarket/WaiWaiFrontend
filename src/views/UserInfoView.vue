<template>
	<div class="userinfo" id="userinfoid">
		<el-container>
			<el-aside width="300px">
				<h2>个人信息：</h2>
				<el-card shadow="always">
					<el-form label-position="top" label-width="10px" :model="formLabelAlign" :rules="rules"
						ref="formLabelAlign">
						<el-row :gutter="8">
							<el-form-item label="学号">
								<el-input v-model="formLabelAlign.stuid" disabled></el-input>
							</el-form-item>
							<el-form-item label="用户昵称">
								<el-input v-model="formLabelAlign.username"></el-input>
							</el-form-item>
						</el-row>
						<el-row :gutter="8">
							<el-form-item label="手机号">
								<el-input v-model="formLabelAlign.usertel"></el-input>
							</el-form-item>
							<el-form-item label="性别">
								<el-select v-model="formLabelAlign.usersex" placeholder="还没有性别" style="width: 100%;">
									<el-option label="男" :value='1'></el-option>
									<el-option label="女" :value='2'></el-option>
								</el-select>
							</el-form-item>
						</el-row>
						<el-row :gutter="8">
							<el-form-item label="邮箱">
								<el-input v-model="formLabelAlign.useremail"></el-input>
							</el-form-item>
							<el-form-item label="账户验证状态">
								<el-input v-model="formLabelAlign.userstatus" disabled></el-input>
							</el-form-item>
						</el-row>
						<el-row :gutter="8" style="margin-top: 20px;">
							<el-button type="primary" @click="updateUserInfo()" style="width: 100%;">保存
							</el-button>
							<div style="margin-top: 20px;"></div>
							<el-button type="primary" @click="clickButton" style="width: 100%;">修改密码
							</el-button>
						</el-row>
					</el-form>
				</el-card>

				<!--弹出修改密码-->
				<el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="30%" center>
					<div style="text-align: center">
						<el-form :model="formPwd" size="normal" :rules="rules">
							<el-form-item prop="oldpwd">
								<el-input v-model="formPwd.oldpwd" prefix-icon="el-icon-lock" placeholder="请输入原密码"
									show-password>
								</el-input>
							</el-form-item>
							<el-form-item prop="newpwd">
								<el-input v-model="formPwd.newpwd" prefix-icon="el-icon-lock" placeholder="请输入新密码"
									show-password>
								</el-input>
							</el-form-item>
							<el-form-item prop="confirmpwd">
								<el-input v-model="formPwd.confirmpwd" prefix-icon="el-icon-lock" placeholder="请再次输入密码"
									show-password>
								</el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button type="warning" @click="cancelButton" style="margin-top: 30px;">取 消</el-button>
							<el-button type="primary" @click="updateUserPwd()" style="margin-top: 30px;">确 定</el-button>
						</span>
					</div>
				</el-dialog>
			</el-aside>
			<el-main>

				<el-row :gutter="20">
					<el-col :span="1" :offset="2">
						<h2>我的闲置</h2>
					</el-col>
					<el-col :span="19">
						<el-table :data="selldata" border stripe style="width: 100%">
							<el-table-column prop="goodsname" label="商品名称">
							</el-table-column>
							<el-table-column prop="goodsprice" :formatter="price1Format" label="商品价格">
							</el-table-column>
							<el-table-column prop="goodsdesc" label="商品描述">
							</el-table-column>
							<el-table-column prop="goodslevel" label="商品新旧程度">
							</el-table-column>
							<el-table-column prop="goodsdate" label="发布时间">
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template #default="scope">
									<div style="display: flex; align-content: space-between">
										<el-popconfirm title="确定删除吗？" @confirm="sellDelete(scope.row.goodsid)">
											<template #reference>
												<el-button type="danger">删除</el-button>
											</template>
										</el-popconfirm>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
							:current-page="currentPage1" :page-sizes="[5, 10]" :page-size="pageSize1"
							layout="total, sizes, prev, pager, next, jumper" :total="total1">
						</el-pagination>
					</el-col>
				</el-row>

				<!-- 我的订单-->
				<div style="margin-top:50px"></div>

				<el-row :gutter="20">
					<el-col :span="1" :offset="2">
						<h2>我的订单</h2>
					</el-col>
					<el-col :span="19">
						<el-table :data="orderData" border stripe style="width: 100%">
							<el-table-column prop="buyername" label="买家姓名">
							</el-table-column>
							<el-table-column prop="sellername" label="卖家姓名">
							</el-table-column>
							<el-table-column prop="goodname" label="商品名称">
							</el-table-column>
							<el-table-column prop="goodprice" :formatter="price2Format" label="商品价格">
							</el-table-column>
							<el-table-column prop="orderstatus" :formatter="statusFormat" label="订单状态">
							</el-table-column>
							<el-table-column prop="orderdate" label="订单时间">
							</el-table-column>

							<el-table-column fixed="right" label="操作">
								<template #default="scope">
									<div style="display: flex; align-content: space-between">
										<el-button @click="addfeedback(scope.row.orderid)" type="primary">反馈</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination background @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
							:current-page="currentPage2" :page-sizes="[5, 10]" :page-size="pageSize2"
							layout="total, sizes, prev, pager, next, jumper" :total="total2">
						</el-pagination>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>

import request from '@/utils/request'

export default {
	name: "user-info",
	data() {
		return {
			search1: '',
			search2: '',
            currentPage1: 1,
			currentPage2: 1,
            pageSize1: 5,
			pageSize2: 10,
            total1: 0,
			total2: 0,
			rules: {
				oldpwd: [
					{ required: true, message: '请输入原密码', trigger: 'blur' },
				],
				newpwd: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
				],
				confirmpwd: [
					{ required: true, message: '请再次输入密码', trigger: 'blur' },
				],
			},
			formLabelAlign: {
				stuid: '',
				userpwd: '',
				username: '',
				usersex: 1,
				useremail: '',
				userstatus: '',
				usertel: '',
				userid: '',
			},
			formPwd: {
				userid: '',
				oldpwd: '',
				newpwd: '',
				confirmpwd: '',
			},
			dialogValue: '',
			centerDialogVisible: false,
			orderData:[],
			selldata:[],
		}
	},
	mounted() {
		this.load();
		this.load1();
		this.load2();
	},
	methods: {
		price1Format(row) {
			return parseInt(row.goodsprice /= 100);
		},
		price2Format(row) {
			return parseInt(row.goodprice /= 100);
		},
		statusFormat(row) {
			return row.orderstatus==0?"进行中":"已结束"
		},
		load() {
			var userId = window.sessionStorage.getItem("user")
			console.log(userId)
			request.get("/api/user/UserDataSelect?userid=" + userId)
				.then(res => {
					this.formLabelAlign = res.data;
					console.log(res.data.usersex)
					// 处理男女显示
					if (res.data.usersex == 1) {
						this.formLabelAlign.usersex = "男";
					}
					else {
						this.formLabelAlign.usersex = "女";
					}
					// 处理账户状态
					if (res.data.userstatus == 0)
						this.formLabelAlign.userstatus = "正常"
					else if (res.data.userstatus == 1)
						this.formLabelAlign.userstatus = "临时封禁"
					else
						this.formLabelAlign.userstatus = "永久封禁"
					console.log(this.formLabelAlign);
				})
		},
		load1() {
			var userId = window.sessionStorage.getItem("user")
			request.get("/api/user/UserGoodsSelect", {
                params: {
                    pageNum: this.currentPage1,
                    pageSize: this.pageSize1,
                    userid: userId,
                }
            })
			.then(res => {
				console.log(res)
				this.selldata=res.data.records;
			})
		},
		load2() {
			var userId = window.sessionStorage.getItem("user")
			request.get("/api/order/select/userIdPage", {
                params: {
                    pageNum: this.currentPage2,
                    pageSize: this.pageSize2,
                    userId: userId,
                }
            })
			.then(res => {
				console.log(res)
				this.orderData=res.data.records;
			})
		},
		clickButton() {
			this.centerDialogVisible = true;
		},
		cancelButton() {
			this.centerDialogVisible = false;
		},
		updateUserInfo() {
			// alert('submit!');
			//
			this.formLabelAlign.usersex == "男" ? this.formLabelAlign.usersex = 1 : this.formLabelAlign.usersex = 2;
			// 处理账户状态
			if (this.formLabelAlign.userstatus == "正常")
				this.formLabelAlign.userstatus = 0
			else if (this.formLabelAlign.userstatus == "临时封禁")
				this.formLabelAlign.userstatus = 1
			else
				this.formLabelAlign.userstatus = 2
			let jsonMsg = JSON.stringify(this.formLabelAlign);
			let self = this;
			console.log(jsonMsg)
			console.log(this.formLabelAlign)
			///user/UserDataUpdate
			request.post("/api/user/UserDataUpdate", this.formLabelAlign).then(res => {
				console.log(res);
				if (res.state == '0') {
					this.$message({
						type: "success",
						message: "更新成功"
					})
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}
				this.load();//刷新表格数据
			});
		},
		updateUserPwd() {
			this.centerDialogVisible = true;
			console.log('hahaha');
			var retPwd = {}
			retPwd.userid = this.formLabelAlign.userid;
			retPwd.userpwd = this.formPwd.oldpwd;
			retPwd.newpwd = this.formPwd.newpwd;
			console.log(retPwd)
			request.post("/api/user/UserpwdUpdate", retPwd).then(res => {
				console.log(res);
				if (res.state == '0') {
					this.$message({
						type: "success",
						message: "更新成功"
					})
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}
				this.load();//刷新表格数据
			});
		},

		handleSizeChange1(pageSize) {//改变当前页面个数
            this.pageSize1 = pageSize;
            this.load1();
        },
        handleCurrentChange1(pageNum) {//改变当前页码
            this.currentPage1 = pageNum;
            this.load1();
        },
		handleSizeChange2(pageSize) {//改变当前页面个数
            this.pageSize2 = pageSize;
            this.load2();
        },
        handleCurrentChange2(pageNum) {//改变当前页码
            this.currentPage2 = pageNum;
            this.load2();
        },
		sellDelete(goodsid){
			console.log(goodsid);
			///good/delete
			request.get("/api/good/delete?goodsid="+goodsid).then(res => {
				console.log(res);
				if (res.state == '0') {
					this.$message({
						type: "success",
						message: "删除闲置信息成功"
					})
				} else {
					this.$message({
						type: "error",
						message: res.msg
					})
				}
				this.load1();//刷新表格数据
			});
		},
	}
}
</script>

<style scoped>
.userinfo {
	width: 80%;
	margin: 0 auto;
	padding-top: 80px;
}
</style>
