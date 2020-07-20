<template>
    <div id="login">
        <div id="bgd">
            <canvas
                    id='myCanvas'
                    :width='width'
                    :height='height'
            >
            </canvas>
        </div>
        <div id="loginBox">
            <h4 style="text-align: center;margin-bottom: 20px;margin-top: -10px;font-size: 26px;color: #ffffff">E-commerce Borrow-Sell Platform</h4>
            <el-form ref="form":model="loginForm" :rules="loginRules" class="form">
                <el-row>
                    <div style="display: inline-flex;margin-left: 5%;height: 30pt">
                        <el-form-item prop="username">
                        </el-form-item>
                        <el-col :span="6">
                            <div style="font-size: 15px">Username</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                    class="log-input"
                                    style="width: 300px"
                                    v-model="loginForm.username"
                                    placeholder="Please enter your username"
                                    prefix-icon="icon-login_user">
                            </el-input>
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div style="display: inline-flex;margin-left: 5%;height: 30pt">
                        <el-form-item prop="password">
                        </el-form-item>
                        <el-col :span="6">
                            <div style="font-size: 15px">Password</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                    :key="passwordType"
                                    class="log-input"
                                    :type="passwordType"
                                    style="width: 300px"
                                    v-model="loginForm.password"
                                    placeholder="Please enter your password"
                                    prefix-icon="icon-login_user"/>
                            <span class="show-pwd" @click="showPwd">
                                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                             </span>
                        </el-col>
                    </div>
                </el-row>
                <el-row>
                    <div style="display: inline-flex;margin-left: 5%">
                        <el-form-item
                                prop="seccode"
                                class="inputbar"
                        >
                            <div style="display: inline-flex;margin-right: 0%">
                                <el-col :span="8">
                                    <div style="font-size: 15px">Identify code</div>
                                </el-col>
                                <el-col :span="8">
                                    <el-input
                                            class="log-input"
                                            style="width: 120px;margin-left: 0%"
                                            v-model="loginForm.seccode"
                                            placeholder=""
                                            prefix-icon="icon-login_auth"
                                    >
                                    </el-input>
                                </el-col>
                                <el-col :span="8">
                                    <!--                    <span style="margin-left: 20px;height:90px;width:50px;background: #00d1b2" class="" @click="createCode">{{ checkCode}}</span>-->
                                    <el-button type="primary" style="width: 100px;margin-left: 30pt" @click="createCode">{{checkCode}}</el-button>
                                </el-col>
                            </div>
                        </el-form-item>
                    </div>
                </el-row>

                <el-row>
                <el-form-item  style="text-align: center">
                    <el-button
                            type="primary"
                            class="btn"
                            style="width: 50%;text-align: center"
                            @click="submitForm"
                    >Login</el-button>
                </el-form-item>
                </el-row>
                <el-row>
                <el-form-item>
                    <p @click="registerAccount">Click here to register an account!</p>
                </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Login} from '../../api/user'
    export default {
        data() {
            return {
                passwordType: 'password',
                canvas: null,
                context: null,
                stars: [], //星星数组
                shadowColorList: [
                    "#39f",
                    "#ec5707",
                    "#b031d4",
                    "#22e6c7",
                    "#92d819",
                    "#14d7f1",
                    "#e23c66"
                ], //阴影颜色列表
                directionList: ["leftTop", "leftBottom", "rightTop", "rightBottom"], //星星运行方向
                speed: 50, //星星运行速度
                last_star_created_time: new Date(), //上次重绘星星时间
                Ball: class Ball {
                    constructor(radius) {
                        this.x = 0;
                        this.y = 0;
                        this.radius = radius;
                        this.color = "";
                        this.shadowColor = "";
                        this.direction = "";
                    }

                    draw(context) {
                        context.save();
                        context.translate(this.x, this.y);
                        context.lineWidth = this.lineWidth;
                        var my_gradient = context.createLinearGradient(0, 0, 0, 8);
                        my_gradient.addColorStop(0, this.color);
                        my_gradient.addColorStop(1, this.shadowColor);
                        context.fillStyle = my_gradient;
                        context.beginPath();
                        context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
                        context.closePath();

                        context.shadowColor = this.shadowColor;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 0;
                        context.shadowBlur = 10;

                        context.fill();
                        context.restore();
                    }
                }, //工厂模式定义Ball类
                width: window.innerWidth,
                height: window.innerHeight,
                loginForm: {
                    username: "wx",
                    password: "171024",
                    seccode:'',
                },
                checkCode:'',
                loginRules: {
                    username: [{ required: true, message: "Please enter your username", trigger: "blur" }],
                    password: [{ required: true, message: "Please enter your password", trigger: "blur" }],
                    seccode: [{ required: true, message: "Please enter the identify code", trigger: "blur" }]
                },
            };
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            //提交登录
            submitForm() {
                if(this.loginForm.seccode !== this.checkCode) {
                    this.$message({
                        message: "Identify code incorrect",
                        type: "error"
                    });
                    this.createCode();
                    return false;
                };
                Login(this.loginForm).then(res =>{
                    if (res.code === 200){
                        this.$message.success('Login success!');
                        console.log(res.user_id);
                        localStorage.setItem("token",res.token);
                        localStorage.setItem("userId",res.user_id);
                        this.$store.commit('setItems',res.menu);
                        localStorage.setItem('ms_username', this.loginForm.username);
                        sessionStorage.setItem('Authorization',res.token);
                        //console.log(sessionStorage.getItem('Autorization'));
                        this.$router.push('/');
                    }else {
                        this.$message.error('Login fail');
                        this.createCode();
                        this.loginForm.seccode = '';
                        this.$router.push('/login');
                    }
                })

            },

            //注册
            registerAccount(){

                this.$router.push('/register')
            },
            createCode() {
                let code = "";
                const codeLength = 4; //验证码的长度
                const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
                for(let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    code += random[index]; //根据索引取得随机数加到code上
                }
                this.checkCode = code; //把code值赋给验证码
            },

            //重复动画
            drawFrame() {
                let animation = requestAnimationFrame(this.drawFrame);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.createStar(false);
                this.stars.forEach(this.moveStar);
            },
            //展示所有的星星
            createStar(params) {
                let now = new Date();
                if (params) {
                    //初始化星星
                    for (var i = 0; i < 50; i++) {
                        const radius = Math.random() * 3 + 2;
                        let star = new this.Ball(radius);
                        star.x = Math.random() * this.canvas.width + 1;
                        star.y = Math.random() * this.canvas.height + 1;
                        star.color = "#ffffff";
                        star.shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                        star.direction = this.directionList[
                            Math.floor(Math.random() * this.directionList.length)
                            ];
                        this.stars.push(star);
                    }
                } else if (!params && now - this.last_star_created_time > 3000) {
                    //每隔3秒重绘修改颜色其中30个球阴影颜色
                    for (var i = 0; i < 30; i++) {
                        this.stars[i].shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                    }
                    this.last_star_created_time = now;
                }
            },
            //移动
            moveStar(star, index) {
                if (star.y - this.canvas.height > 0) {
                    //触底
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftTop";
                    } else {
                        star.direction = "rightTop";
                    }
                } else if (star.y < 2) {
                    //触顶
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightBottom";
                    } else {
                        star.direction = "leftBottom";
                    }
                } else if (star.x < 2) {
                    //左边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightTop";
                    } else {
                        star.direction = "rightBottom";
                    }
                } else if (star.x - this.canvas.width > 0) {
                    //右边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftBottom";
                    } else {
                        star.direction = "leftTop";
                    }
                }
                if (star.direction === "leftTop") {
                    star.y -= star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightBottom") {
                    star.y += star.radius / this.speed;
                    star.x += star.radius / this.speed;
                } else if (star.direction === "leftBottom") {
                    star.y += star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightTop") {
                    star.y -= star.radius / this.speed;
                    star.x += star.radius / this.speed;
                }
                star.draw(this.context);
            }
        },
        mounted() {
            this.canvas = document.getElementById("myCanvas");
            this.context = this.canvas.getContext("2d");
            this.createStar(true);
            this.drawFrame();
            this.createCode();
        }
    };
</script>

<style lang='less' scoped>
    @-webkit-keyframes masked-animation {
        0% {
            background-position: 0 0
        }
        to {
            background-position: -100% 0
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #97a8be;
        cursor: pointer;
        user-select: none;
    }

    p {

        margin-left: -80px;
        margin-top: -30px;
        width: 600px;
        height: 500px;
        line-height: 100px;
        text-align: center;
        color: #fff;
        font-weight: 800;
        font-size: 20px;
        background-image: -webkit-linear-gradient(left, #cddc39, #6cb1a1 25%, #cddc39 50%, #ff9800 75%, #cddc39);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 2s infinite linear;
    }

    p:hover {
        -webkit-animation: masked-animation 0.5s infinite linear;
    }


    #login {
        width: 100vw;
        padding: 0;
        margin: 0;
        height: 100vh;
        font-size: 16px;
        background-repeat: no-repeat;
        background-position: left top;
        background-color: #242645;
        color: #fff;
        font-family: "Source Sans Pro";
        background-size: 100%;
        background-image: url("../../assets/img/22.png");
        position: relative;
        #bgd {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        #loginBox {
            width: 440px;
            height: 280px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 50px 40px 40px 40px;
            box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
            opacity: 1;
            background: linear-gradient(
                    230deg,
                    rgba(53, 57, 74, 0) 0%,
                    rgb(0, 0, 0) 100%
            );
            /deep/ .inps input {
                border: none;
                color: #fff;
                background-color: transparent;
                font-size: 12px;
            }
            .submitBtn {
                background-color: transparent;
                color: #39f;
                width: 200px;
            }
            .iconfont {
                color: #fff;
            }
        }
    }
</style>
