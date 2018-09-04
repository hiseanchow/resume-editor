<template>
  <div>
    <headerDefault :currentuser="currentUser" :islogin="isLogIn"/>
    <asideLeft></asideLeft>
    <resume ref="resume" :preview=false></resume>
    <router-view name="dialog"></router-view>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import headerDefault from '../components/header.vue'
import asideLeft from '../components/aside.vue'
import resume from '../components/resume.vue'

export default {
  name: 'home',
  components: {
    headerDefault,
    asideLeft,
    resume
  },
  data () {
    return {
      headerPrompt: '请注意，当前处于预览状态，数据不会被保存，请登录后制作!',
      currentUser: '',
      isLogIn: false,
      maskVisible: false
    }
  },
  methods: {
    // 查询当前是否登录
    hasLogin () {
      let current = AV.User.current()
      if (current) {
        if (current.attributes.emailVerified) {
          this.currentUser = current.attributes.username
          this.isLogIn = true
          this.$refs.resume.getResume(current.id)
          /* this.$refs.resume.autoSave(current.id); */
        } else {
          AV.User.logOut()
        }
      } else {
        this.currentUser = ''
        this.headerPrompt = '请注意，当前处于预览状态，数据不会被保存，请登录后制作!'
      }
    }
  },
  mounted () {
    this.hasLogin()
  }
}
</script>
