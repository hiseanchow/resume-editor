Vue.component('login-dialog',{
   template: `
<div class="dialog-box" @click.stop="" v-cloak>
    <span class="close-btn" @click="$parent.closeDialog('loginVisible')" title="关闭">&times;</span>
    <div class="dialog-header">登录账号</div>
    <form action="" @submit.prevent="onLogin">
        <ul>
            <li>
                <span class="error-message iconfont" v-if="logInForm.emailError">{{logInForm.emailError}}</span>
                <label for="userID"><i class="iconfont icon-zhanghao"></i></label>
                <input type="text" name="userID" id="userID" placeholder="邮箱" v-model="logInForm.email">
            </li>
            <li>
                <span class="error-message iconfont" v-if="logInForm.passwdError">{{logInForm.passwdError}}</span>
                <label for="userID"><i class="iconfont icon-mima"></i></label>
                <input type="password" name="userPass" placeholder="密码" v-model="logInForm.passwd">
            </li>

            <li><button>登录</button></li>
        </ul>
    </form>
    <div class="links-area"><a href="#">忘记密码</a><a href="#" @click.prevent="$parent.showSignUp">立即注册</a></div>
</div>`,
    data(){
       return {
           logInForm:{
               email: '',
               passwd: '',
               emailError: '',
               passwdError: '',
           },
       }
    },
    methods:{
        /*登录*/
        onLogin(){
            console.log('a');
            let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let reg = /^[\w]{8,14}$/;
            let emailError = '',
                passwdError = '';

            if(!this.logInForm.email){
                emailError = '邮箱不能为空';
                this.logInForm.emailError = emailError;
                return
            } else if(!pattern.test(this.logInForm.email)){
                emailError = '邮箱格式不正确';
                this.logInForm.emailError = emailError;
                return
            } else{
                this.logInForm.emailError = '';
            }

            if(!this.logInForm.passwd){
                passwdError = '密码不能为空';
                this.logInForm.passwdError = passwdError;
                return
            }else{
                this.logInForm.passwdError = ''
            }

            AV.User.logIn(this.logInForm.email, this.logInForm.passwd).then((res) => {
                this.currentUser = res.attributes.username;
                // this.closeDialog();
                window.location.reload();
            }, (error) => {
                switch (error.code){
                    case 210:
                        passwdError = '邮箱和密码不匹配！';
                        break;
                    case 211:
                        emailError = '邮箱不存在！';
                        break;
                    case 216:
                        emailError = '电子邮件地址未经过验证。';
                        break;
                    case 219:
                        passwdError = '登录失败次数超过限制，请稍候再试！';
                        break;
                    default :
                        passwdError = error.code+'：'+error.error;
                }
                this.logInForm.emailError = emailError;
                this.logInForm.passwdError = passwdError;
            });
        },
    },
});