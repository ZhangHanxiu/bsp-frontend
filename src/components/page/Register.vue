<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">Register</div>
            <el-select v-model="type" style="margin-left: 30px;margin-top: 10px">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" style="margin-top: -10px;">
                <div :style="{display:bvo}">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="Your name">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="E-mail">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="param.phone" placeholder="Phone number">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn" style="margin-top: 30px">
                    <el-button type="primary" @click="registerBvo()">Register</el-button>
                </div>
                </div>


<!--                mvo注册-->
                <el-scrollbar style="height:50%">
                    <div :style="{display:mvo}">
                        <el-form-item prop="username">
                            <el-input v-model="param.username" placeholder="username">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    placeholder="password"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input v-model="param.name" placeholder="昵称">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-select v-model="param.gmc_report_type" placeholder="品牌商认证类型" style="margin-bottom: 20px">
                            <el-option key=1 label="TUV" value=1></el-option>
                            <el-option key=2 label="UL" value=2></el-option>
                        </el-select>
                        <el-form-item prop="username">
                            <el-input v-model="param.gmc_report_url" placeholder="证书地址">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="name_cn">
                            <el-input v-model="param.name_cn" placeholder="制造商中文名">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="name_en">
                            <el-input v-model="param.name_en" placeholder="制造商英文名">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input v-model="param.email" placeholder="邮箱">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="param.phone" placeholder="电话">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input v-model="param.description" placeholder="品牌商公司介绍">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn" style="margin-top: 30px">
                            <el-button type="primary" @click="registerMvo">注册</el-button>
                        </div>
                    </div>
                </el-scrollbar>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { registerBvo, registerMvo } from '../../api/user';
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
                company:'',
            },
            type:'Bvo',
            bvo:'',
            mvo:'none',
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            options: [{
                value: 1,
                label: 'Mvo'
            }, {
                value: 2,
                label: 'Bvo'
            },
                ]
        };
    },
    watch:{
        type(newId,oldId){
            console.log(newId);
            if (newId ===null || newId ===1){
                this.mvo = '';
                this.bvo = 'none';
            }
            else {
                this.mvo = 'none';
                this.bvo = '';
            }
        }
    },
    methods: {
        registerBvo(){
            registerBvo(this.param).then(res =>{
                if (res.code ===200){
                    this.$message.success('注册成功');
                    this.$router.push('/login');
                }else {
                    this.$message.error('注册失败！请重新注册或者联系管理员');
                    // this.param = {};
                }
            })
        },

        registerMvo(){
            registerMvo(this.param).then(res =>{
                if (res.code ===200){
                    this.$message.success('注册成功');
                    this.$router.push('/login');
                }else {
                    this.$message.error('注册失败！请重新注册或者联系管理员');
                    // this.param = {};
                }
            })
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    margin-top: 0%;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/register.jpg);
    background-size: 100%;
    overflow-y:scroll;

}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    margin-top: 0%;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 43%;
    top: 50%;
    width: 550px;
    height:120%;
    margin: -22% 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);

}
.ms-login2 {
    position: absolute;
    left: 70%;
    top: 50%;
    width: 450px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
