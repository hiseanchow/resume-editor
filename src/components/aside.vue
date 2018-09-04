<template>
  <aside id="aside">
    <div class="resume-operation">
      <ul>
        <li>
          <a href="" id="sava-resume" @click.prevent="clickSaveResume">
            <i class="iconfont icon-baocun"></i>保存编辑
          </a>
        </li>
        <li>
          <router-link to="preview">
            <i class="iconfont icon-print"></i>打印预览
          </router-link>
        </li>
        <li>
          <a href="">
            <i class="iconfont icon-zhifeiji"></i>分享简历
          </a>
        </li>
        <li>
          <a href="" @click.prevent="openModuleAside">
            <i class="iconfont icon-mokuaiguanli"></i>模块管理
          </a>
        </li>
      </ul>
      <div class="contact">
        <p>此项目仅用于学习交流，如果你有任何问题或建议都可以发邮件给我。</p>
        <div>Email: <a href="mailto:zhoushuozh@gmail.com">zhoushuozh@gmail.com</a></div>
      </div>
    </div>
    <div class="module-management" :class="{active: asideVisible}">
      <ul>
        <li v-for="(section, key) in module" :key="section.id">
          <span>{{section.name}}</span>
          <switchBtn :value="section.visible" @toggle="onToggle(key, section.visible, $event)"></switchBtn>
        </li>
      </ul>
      <div class="close-module-btn" @click="closeModuleAside">&lt;&lt; 收起</div>
    </div>
  </aside>
</template>

<script>
import AV from 'leancloud-storage'
import switchBtn from './switch-btn.vue'
import router from '../router'
import _Bus from '../bus.js'

export default {
  router: router,
  data () {
    return {
      resume: {},
      module: {},
      asideVisible: false
    }
  },
  components: {
    switchBtn
  },
  methods: {
    /* 模块管理 */
    onToggle (key, status) {
      this.module[key].visible = !status
    },
    /* 打开模块管理 */
    openModuleAside () {
      this.asideVisible = true
    },
    /* 关闭模块管理 */
    closeModuleAside () {
      this.asideVisible = false
    },
    clickSaveResume () {
      let currentUser = AV.User.current()
      if (currentUser) {
        let id = currentUser.id
        // this.$parent.saveResume(id)
        _Bus.$emit('saveResume', id)
      } else {
        this.$router.replace('/login')
      }
    }
  },
  mounted () {
    _Bus.$on('passResumeData', (data) => {
      this.resume = data.resume
      this.module = data.module
    })
  }
}
</script>

<style lang="scss">
  #aside{
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    padding-top: 100px;
    border-right: 1px solid #2bd8ae;
    z-index: 19;
    .resume-operation,
    .resume-content-editor{
      display: flex;
      flex-direction: column;
    }
    a{
      color: #666;
      transition: .3s;
    }
    a:hover{
      color: #00c091;
    }
    .resume-operation{
      margin-bottom: 30px;
      height: 100%;
      ul{
        height: 100%;
        li{
          text-align: center;
          padding: 30px 0;
        }
      }
      .contact{
        font-size: 12px;
        color: #ccc;
        line-height: 1.5em;
        padding: 0 30px 30px 30px;
        p{
          margin-bottom: 10px;
        }
        a{
          color: inherit;
        }
        a:hover{
          color: #eee;
        }
      }
    }
    .resume-content-editor{
      padding-top: 30px;
      border-top: 1px solid #e5e5e5;
    }
    ul li a{
      color: #fff;
      line-height: 30px;
      i,
      #aside .close-module-btn i{
        margin-right: 10px;
        font-size: 18px;
      }
    }
    ul li a:hover{
      color: #eee;
    }
    .module-management{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #fff;
      padding-top: 100px;
      transform: translateX(-100%);
      transition: 0.3s;
      h3{
        font-size: 18px;
        color: #00c091;
        text-align: center;
        margin-bottom: 30px;
      }
      > ul{
        margin-bottom: 30px;
        li{
          color: #666;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          padding: 15px 45px;
        }
        li:first-child .switch-btn:before{
          display: block;
          content: '必填';
          top: 0;
          left: 0;
          width: 100%;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 18px;
        }
        li:first-child .switch-btn:after{
          display: none;
        }
      }
      .close-module-btn{
        display: block;
        width: 120px;
        margin: 0 auto;
        border: 1px solid #00c091;
        color: #00c091;
        border-radius: 5px;
        transition: 0.3s;
        text-align: center;
        font-size: 14px;
        user-select: none;
        cursor: pointer;
        line-height: 30px;
      }
      .close-module-btn:hover{
        background-color: #00c091;
        color: #fff;
      }
    }
    .module-management.active{
      transform: translateX(0);
    }
  }
</style>
