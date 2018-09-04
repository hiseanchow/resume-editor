<template>
  <div class="preview" :class="{inprint: inPrint}">
    <headerPreview v-if="!inPrint"></headerPreview>
    <resume :resume="resume" :module="module" :preview=true></resume>
  </div>
</template>

<script>
import headerPreview from '../components/header-preview.vue'
import resume from '../components/resume.vue'

export default {
  name: 'preview',
  data () {
    return {
      inPrint: false,
      resume: {},
      module: {
        personalInfo: {
          name: '基本信息',
          visible: true
        },
        introduction: {
          name: '个人简介',
          visible: true
        },
        workexpe: {
          name: '工作经历',
          visible: true
        },
        eduexpe: {
          name: '教育经历',
          visible: true
        },
        skills: {
          name: '技能描述',
          visible: true
        },
        projects: {
          name: '项目经历',
          visible: true
        }
      }
    }
  },
  components: {
    headerPreview,
    resume
  },
  methods: {
    clickPrint () {
      this.inPrint = true
      setTimeout(() => {
        window.print()
        this.inPrint = false
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  .inprint{
    .preview-header{
      visibility: hidden;
    }
    #main{
      padding: 0;
      margin: 0 auto;
    }
  }
  .preview{
    background-color: #E7F2FF;
    padding: 1px 0;
    #main{
      transform: translateX(0);
      .resume{
        .section-btn-group,
        .item-btn-group{
          display: none;
        }
        section{
          .content{
            .expe-item:hover{
              background-color: transparent;
              border-color: transparent;
              .item-btn-group{
                display: none;
              }
            }
          }
        }
        .editarea:hover,
        .editarea:focus,
        section:hover,
        section.active{
          background-color: transparent;
          border-color: transparent;
          .section-btn-group{
            display: none;
          }
        }
        .mask{
          display: none;
        }
      }
    }
  }
</style>
