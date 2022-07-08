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
						<!--    搜索区域-->
						<div style="margin: 10px 0">

							<el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
							<el-button style="margin-left: 5px; background-color: #5defc1; color: white" @click="load"
								plain>查询
							</el-button>
						</div>
						<el-table :data="selldata" border stripe style="width: 100%">
							<el-table-column prop="goodsname" label="商品名称">
							</el-table-column>
							<el-table-column prop="goodsprice" label="商品价格">
							</el-table-column>
							<el-table-column prop="goodsdesc" label="商品描述">
							</el-table-column>
							<!--<el-table-column label="商品图片">
                <template #default="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>-->
							<el-table-column prop="goodslevel" label="商品程度">
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
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage4" :page-sizes="[5, 10]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="total">
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
						<!--    搜索区域-->
						<div style="margin: 10px 0">

							<el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
							<el-button style="margin-left: 5px; background-color: #5defc1; color: white" @click="load"
								plain>查询
							</el-button>
						</div>
						<el-table :data="orderData" border stripe style="width: 100%">
							<el-table-column prop="goodsname" label="商品名称">
							</el-table-column>
							<el-table-column prop="username" label="卖家姓名">
							</el-table-column>
							<el-table-column prop="goodsprice" label="商品价格">
							</el-table-column>
							<el-table-column prop="goodsdesc" label="商品描述">
							</el-table-column>
							<!--<el-table-column label="商品图片">
                <template #default="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>-->
							<el-table-column prop="goodslevel" label="商品程度">
							</el-table-column>
							<el-table-column prop="goodsdate" label="发布时间">
							</el-table-column>

							<el-table-column fixed="right" label="操作">
								<template #default="scope">
									<div style="display: flex; align-content: space-between">
										<el-button @click="addOrder(scope.row)" type="primary">反馈</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage4" :page-sizes="[5, 10]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="total">
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
		}
	},
	mounted() {
		this.load();
	},
	methods: {
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
			request.post("/api/user/UserpwdUpdate", this.formPwd).then(res => {
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
