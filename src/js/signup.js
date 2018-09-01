Vue.component('sign-up',{
    template: `
<div class="dialog-box" @click.stop="" v-cloak>
    <span class="close-btn" @click="$parent.closeDialog('signUpVisible')" title="关闭">&times;</span>
    <div class="dialog-header">注册账号</div>
    <form name="sign-up-form" action="" @submit.prevent="onSignUp">
        <ul>
            <li>
                <span class="error-message iconfont icon-cuowu" v-if="signUpForm.nameError">{{signUpForm.nameError}}</span>
                <label for="sign-up-name"><i class="iconfont icon-zhanghao"></i></label>
                <input type="text" id="sign-up-name" name="name" placeholder="请输入用户名" v-model="signUpForm.name">
            </li>
            <li>
                <span class="error-message iconfont icon-cuowu" v-if="signUpForm.emailError">{{signUpForm.emailError}}</span>
                <label for="sign-up-email"><i class="iconfont icon-zhanghao"></i></label>
                <input type="text" id="sign-up-email" name="email" placeholder="请输入注册邮箱" v-model="signUpForm.email" @blur="validator('required|email', $event)">
            </li>
            <li>
                <span class="error-message iconfont" v-if="signUpForm.passwdError">{{signUpForm.passwdError}}</span>
                <label for="sign-up-userPass"><i class="iconfont icon-mima"></i></label>
                <input type="password" name="password" id="sign-up-userPass" placeholder="请输入6到24位的密码" v-model="signUpForm.passwd">
            </li>
            <li>
                <span class="error-message iconfont" v-if="signUpForm.confirmPasswdError">{{signUpForm.confirmPasswdError}}</span>
                <label for="signup-passwd-confirm"><i class="iconfont icon-querenmima"></i></label>
                <input type="password" name="passwdConfirm" id="signup-passwd-confirm" placeholder="请再次确认密码" v-model="signUpForm.confirmPasswd">
            </li>
            <li><button type="submit">注册</button></li>
        </ul>
    </form>
    <div class="links-area">已有账号？<a href="#" @click.prevent="$parent.showLogin">立即登录</a></div>
</div>`,
    data(){
        return {
            signUpForm:{
                name: '',
                email: '',
                passwd: '',
                confirmPasswd: '',
                nameError: '',
                emailError: '',
                passwdError: '',
                signupPasswdConfirm: '',
            },
        }
    },
    methods: {
        /*注册*/
        onSignUp(){
            let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let reg = /^[\w]{8,14}$/;
            let emailError = '',
                passwdError = '',
                confirmPasswdError = '';

            if(!this.signUpForm.email){
                emailError = "邮箱不能为空";
                this.signUpForm.emailError = emailError;
                return
            } else if(!pattern.test(this.signUpForm.email)){
                emailError = '邮箱格式不正确';
                this.signUpForm.emailError = emailError;
                return
            } else{
                this.signUpForm.emailError = '';
            }

            if(!this.signUpForm.passwd){
                passwdError = '密码不能为空！';
                this.signUpForm.passwdError = passwdError;
                return;
            } else if(!this.signUpForm.passwd.match(reg)){
                passwdError = '请输入8到14位的密码！';
                this.signUpForm.passwdError = passwdError;
                return;
            } else{
                this.signUpForm.passwdError = '';
            }

            if(!this.signUpForm.confirmPasswd){
                confirmPasswdError = '请再次确认密码！';
                this.signUpForm.confirmPasswdError = confirmPasswdError;
                return
            } else if(!(this.signUpForm.passwd === this.signUpForm.confirmPasswd)){
                confirmPasswdError = '密码不一致！';
                this.signUpForm.confirmPasswdError = confirmPasswdError;
                return
            }else{
                this.signUpForm.confirmPasswdError = '';
            }

            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUpForm.name);
            // 设置密码
            user.setPassword(this.signUpForm.passwd);
            // 设置邮箱
            user.setEmail(this.signUpForm.email);
            user.signUp().then((user) => {
                console.log(user);
                this.$parent.signUpSuccess();
            }, (error) => {
                switch (error.code) {
                    case 203:
                        emailError = '此邮箱已被注册！';
                        break;
                    default:
                        emailError = error.code + '：' + error.error;
                }
                this.signUpForm.emailError = emailError;
            });
        },
    }
});