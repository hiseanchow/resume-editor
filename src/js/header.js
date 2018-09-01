Vue.component('header-default',{
    props: ['currentuser','prompt','islogin'],
    template: `
<header class="header">
    <div class="logo">
        <h1>简历编辑器</h1>
    </div>
    <div class="prompt update-prompt">{{prompt}}</div>
    <div class="header-right">
        <div class="login-signup" v-if="!islogin" v-cloak>
            <a href="" class="login" @click.prevent="$parent.showLogin">登录</a>
            <a href="" class="sign-up" @click.prevent="$parent.showSignUp">注册</a>
        </div>
        <div class="current-user" v-if="islogin">
            <span class="username">{{currentuser}}</span>
            <a href="" class="logout" @click="$parent.logout">注销</a>
        </div>
    </div>
</header>`,
});