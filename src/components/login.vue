<template>
  <div class="dialog-mask">
    <div class="dialog-box">
      <router-link to="/" class="close-btn" title="关闭" replace>&times;</router-link>
      <div class="dialog-header">登录账号</div>
      <form action="" @submit.prevent="onLogin">
        <ul>
          <li>
            <span class="error-message iconfont" v-if="logInForm.emailError">{{logInForm.emailError}}</span>
            <label for="userID"><i class="iconfont icon-zhanghao"></i></label>
            <input type="text" name="userID" id="userID" placeholder="邮箱或用户名" v-model="logInForm.email">
          </li>
          <li>
            <span class="error-message iconfont" v-if="logInForm.passwdError">{{logInForm.passwdError}}</span>
            <label for="userID"><i class="iconfont icon-mima"></i></label>
            <input type="password" name="userPass" placeholder="密码" v-model="logInForm.passwd">
          </li>

          <li><button>登录</button></li>
        </ul>
      </form>
      <div class="links-area">
        <a href="#">忘记密码</a>
        <router-link to="signup" replace>立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import router from '../router'
export default {
  data () {
    return {
      logInForm: {
        email: '',
        passwd: '',
        emailError: '',
        passwdError: ''
      }
    }
  },
  router: router,
  methods: {
    onLogin () {
      let emailError,
        passwdError

      if (!this.logInForm.email) {
        this.logInForm.emailError = '账号不能为空'
        return
      } else {
        this.logInForm.emailError = ''
      }

      if (!this.logInForm.passwd) {
        this.logInForm.passwdError = '密码不能为空'
        return
      } else {
        this.logInForm.passwdError = ''
      }

      AV.User.logIn(this.logInForm.email, this.logInForm.passwd).then((res) => {
        this.$router.replace('/')
        this.$parent.hasLogin()
      }, (error) => {
        switch (error.code) {
          case 210:
            passwdError = '邮箱和密码不匹配！'
            break
          case 211:
            emailError = '邮箱不存在！'
            break
          case 216:
            emailError = '电子邮件地址未经过验证。'
            break
          case 219:
            passwdError = '登录失败次数超过限制，请稍候再试！'
            break
          default :
            passwdError = error.code + '：' + error.error
        }
        this.logInForm.emailError = emailError
        this.logInForm.passwdError = passwdError
      })
    }
  }
}
</script>
