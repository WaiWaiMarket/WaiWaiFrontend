<template>
    <el-container>
        <el-main>
            <div class="app-container" width="80%">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="商品基本信息"></el-step>
                    <el-step title="商品图片增加"></el-step>
                </el-steps>
                <div v-if="active == 0">
                    <h1>商品基本信息</h1>
                    <div style="width: 60%;margin-left: 20%" class="app-container">
                        <template>
                            <el-form label-position="top" label-width="10px" :model="submitGoodsForm" :rules="rules"
                                ref="formLabelAlign">
                                <el-col :span="9" :offset="2" style="margin-top: 50px;">
                                    <el-form-item label="商品名称" prop="goodsname">
                                        <el-input v-model="submitGoodsForm.goodsname" maxlength="25" show-word-limit>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9" :offset="2" style="margin-top: 50px;">
                                    <el-form-item label="商品价格" prop="goodsprice">
                                        <el-input v-model="submitGoodsForm.goodsprice"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9" :offset="2" style="margin-top: 20px;">
                                    <el-form-item label="商品新旧程度 %" prop="goodsLevel">
                                        <el-input v-model="submitGoodsForm.goodsLevel"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="9" :offset="2" style="margin-top: 20px;">
                                    <el-form-item label="商品介绍" prop="goodsdesc">
                                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8 }"
                                            placeholder="请输入内容" v-model="submitGoodsForm.goodsdesc" maxlength="100"
                                            show-word-limit>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </template>
                    </div>
                    <el-button style="margin-top: 12px;margin-left: 20%" type="primary" @click="next">下一步</el-button>
                </div>
                <div v-if="active == 1">
                    <h1>商品图片编辑</h1>
                    <el-row>
                        <el-col :span="10">
                            <h2>封面图片</h2>
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :data="goodsid" :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                        <el-col :span="10">
                            <h2>其他补充图片上传</h2>
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-col>
                    </el-row>

                    <el-button style="margin-top:12px;" type="primary" @click="prev">上一步</el-button>
                    <el-button style="margin-top: 12px;" type="primary" @click="finish">完成</el-button>
                </div>
                <!--<div v-if="active == 2">
                    <h1>其他设置</h1>
                    <el-button style="margin-top:12px;" type="primary" @click="prev">上一步</el-button>
                    <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
                </div>-->
            </div>
        </el-main>
    </el-container>
</template>
 
 
<script>
export default {
    data() {
        return {
            dialogVisible: false,//弹出层
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],
            imageUrl: '',
            active: 0,//步骤条初始化
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
            submitGoodsForm: {
                stuid: '',
                userpwd: '',
                username: '',
                usersex: 1,
                useremail: '',
                userstatus: '',
                usertel: '',
                userid: '',
            },
        };
    },

    methods: {
        //下一页
        next() {
            if (this.active++ > 3) this.active = 0;
        },
        //上一页
        prev() {
            if (this.active > 0) this.active--;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }

    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>