Vue.component('signup-success',{
   template:`
<div class="dialog-mask" @click="$parent.closeDialog('signUpSuccess')">
   <div class="dialog-box" @click.stop="">
       <span class="close-btn" @click="$parent.closeDialog('signUpSuccess')" title="关闭">&times;</span>
       <div class="dialog-message">注册成功，请检查邮箱并验证，邮箱验证后才可登录。</div>
       <button @click="$parent.showLogin">已验证，立即登录</button>
   </div>
</div>`,
});