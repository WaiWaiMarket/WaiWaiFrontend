<template>
	<div class="userinfo" id="userinfoid">
		<h2>个人信息：</h2>
		<el-card shadow="always">
			<el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules"
				ref="formLabelAlign">
				<el-row :gutter="100">
					<el-col :span="9" :offset="2">
						<el-form-item label="学号">
							<el-input v-model="formLabelAlign.stuid" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9" :offset="1">
						<el-form-item label="用户昵称">
							<el-input v-model="formLabelAlign.username"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="100">
					<el-col :span="9" :offset="2">
						<el-form-item label="手机号">
							<el-input v-model="formLabelAlign.usertel"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9" :offset="1">
						<el-form-item label="性别">
							<el-select v-model="formLabelAlign.usersex" placeholder="还没有性别" style="width: 100%;">
								<el-option label="男" :value='1'></el-option>
								<el-option label="女" :value='2'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="100">
					<el-col :span="9" :offset="2">
						<el-form-item label="邮箱">
							<el-input v-model="formLabelAlign.useremail"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9" :offset="1">
						<el-form-item label="账户验证状态">
							<el-input v-model="formLabelAlign.userstatus" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="100" style="margin-top: 20px;">
					<el-col :span="9" :offset="2">
						<el-button type="primary" @click="submitForm('formLabelAlign')" style="width: 100%;">保存
						</el-button>
					</el-col>
					<el-col :span="9" :offset="1">
						<el-button type="primary" @click="submitForm('formLabelAlign')" style="width: 100%;">修改密码
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<!--      弹出提示框-->
		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
			<div style="text-align: center">
				<h4>{{ dialogValue }}</h4>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="clickButton" style="margin-top: 30px;">确 定</el-button>
				</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>

import request from '@/utils/request'

export default {
	name: "person-info",
	data() {
		return {
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
			rules: {
				password: [{ trigger: 'blur' }]
			},
			dialogValue: '',
			centerDialogVisible: false,
		}
	},
	mounted() {
		var userId = window.sessionStorage.getItem("user")
		console.log(userId)
		request.get("/api/user/UserDataSelect?userid=" + userId)
			.then(res => {
				this.formLabelAlign = res.data;
				// 处理男女显示
				if (res.data.usersex === 1)
					this.formLabelAlign.usersex = "男";
				else
					this.formLabelAlign.usersex = "女";
				
				// 处理账户状态
				if(res.data.userstatus == 0)
					this.formLabelAlign.userstatus = "正常"
				else if(res.data.userstatus == 1)
					this.formLabelAlign.userstatus = "临时封禁"
				else 
					this.formLabelAlign.userstatus = "永久封禁"
				console.log(this.formLabelAlign);
			})
	},
	methods: {

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
