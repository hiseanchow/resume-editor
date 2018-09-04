<template>
    <header class="header">
        <div class="logo">
            <h1>简历编辑器</h1>
        </div>
        <div class="prompt update-prompt">{{prompt}}</div>
        <div class="header-right">
            <div class="login-signup" v-if="!islogin" v-cloak>
                <router-link to="/login" class="login">登录</router-link>
                <router-link to="signup" class="sign-up">注册</router-link>
            </div>
            <div class="current-user" v-if="islogin">
                <span class="username">{{currentuser}}</span>
                <a href="" class="logout" @click="logout">注销</a>
            </div>
        </div>
    </header>
</template>

<script>
import AV from 'leancloud-storage'
import _Bus from '../bus.js'
export default{
  props: ['currentuser', 'islogin'],
  data () {
    return {
      prompt: '请注意，当前处于预览状态，数据不会被保存，请登录后制作!'
    }
  },
  methods: {
    logout () {
      AV.User.logOut()
      window.location.reload()
    }
  },
  mounted () {
    _Bus.$on('updatePrompt', (data) => {
      this.prompt = data
    })
  }
}
</script>

<style lang="scss">
    .header{
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        left: 0;
        height: 60px;
        width: 100%;
        padding: 0 50px;
        line-height: 60px;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        background-color: #fff;
        border-bottom: 1px solid #eee;
        z-index: 20;
        .logo{
            color: #00c091;
            font-size: 20px;
            font-weight: 700;
        }
        .header-right{
            position: relative;
            > div{
                display: flex;
                justify-content: flex-end;
            }
            a{
                color: #00c091;
                transition: .3s;
                height: 30px;
                line-height: 28px;
                padding: 0 10px;
                display: block;
                white-space:nowrap;
            }
            .login-signup{
                position: absolute;
                min-width: 100%;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                background-color: #fff;
            }
            .login{
                margin-right: 20px;
            }
            .sign-up{
                color: #fff;
                border-radius: 5px;
                background-color: #00c091;
            }
            .sign-up:hover{
                background-color: #00C06D;
            }
            .login:hover{
                color: #00C06D;
            }
            .username{
                color: #00c091;
                font-weight: bold;
            }
            .logout{
                line-height: inherit;
                font-size: 14px;
                color: #999;
            }
            .logout:hover{
                color: #00c091;
            }
        }
        .prompt{
            color: #13CE66;
            font-size: 14px;
        }
    }
</style>
