<template>
  <main id="main">
    <div class="resume">
      <section class="personal-info" :class="{ active: moduleEditing.personalInfo && !preview}" @click="editing('personalInfo')">
        <div class="left">
          <editarea class="name" :value="resume.name" @edit="onEdit('name', $event)"></editarea>
          <p class="areer-objective">求职意向：<editarea :value="resume.objective" @edit="onEdit('objective', $event)"></editarea></p>
        </div>
        <div class="right">
          <ul>
            <li>城市：<editarea :value="resume.city" @edit="onEdit('city', $event)"></editarea></li>
            <li>学历：<editarea :value="resume.education" @edit="onEdit('education', $event)"></editarea></li>
            <li>年龄：<editarea :value="resume.age" @edit="onEdit('age', $event)"></editarea></li>
          </ul>
          <ul>
            <li>电话：<editarea :value="resume.phone" @edit="onEdit('phone', $event)"></editarea></li>
            <li>邮箱：<editarea :value="resume.email" @edit="onEdit('email', $event)"></editarea></li>
            <li>主页：<editarea :value="resume.site" @edit="onEdit('site', $event)"></editarea></li>
          </ul>
        </div>
      </section>
      <section class="introduction" :class="{ active: moduleEditing.introduction && !preview }" v-if="module.introduction.visible" @click="editing('introduction')">
        <h2>个人简介</h2>
        <div class="content">
          <editarea :value="resume.introduction" @edit="onEdit('introduction', $event)"></editarea>
        </div>
        <div class="section-btn-group">
          <!--<span class="btn add-item-btn"><i class="iconfont icon-shanchu"></i></span>-->
        </div>
      </section>
      <section class="work" :class="{active: moduleEditing.workexpe && !preview}" v-if="module.workexpe.visible" @click="editing('workexpe')">
        <h2>工作经历</h2>
        <div class="content">
          <div class="expe-item" v-for="(workexpe, key) in resume.workexpe" :key="workexpe.id">
            <ul class="expe-title">
              <li>
                <editarea :value="workexpe.company" @edit="onEdit('workexpe['+key+'].company', $event)"></editarea>
              </li>
              <li>
                <editarea :value="workexpe.post" @edit="onEdit('workexpe['+key+'].post', $event)"></editarea>
              </li>
              <li class="date">
                <el-date-picker
                  v-model="workexpe.startDate"
                  type="month"
                  placeholder="开始日期">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="workexpe.endDate"
                  type="month"
                  placeholder="结束日期">
                </el-date-picker>
              </li>
            </ul>
            <p class="description">
              <editarea :value="workexpe.description" @edit="onEdit('workexpe['+key+'].description', $event)"></editarea>
            </p>
            <div class="item-btn-group">
              <span class="btn" @click.stop="moveUp('workexpe', key, $event)"><i class="iconfont icon-arrow-up"></i></span>
              <span class="btn" @click.stop="moveDown('workexpe', key, $event)"><i class="iconfont icon-arrow-down"></i></span>
              <span class="btn" @click.stop="removeItem('workexpe', key, $event)"><i class="iconfont icon-shanchu"></i></span>
            </div>
          </div>
        </div>
        <div class="section-btn-group">
          <span class="btn" @click="addItem('workexpe', $event)"><i class="iconfont icon-jiahao"></i></span>
        </div>
      </section>
      <section class="edu" :class="{active: moduleEditing.eduexpe && !preview}" v-if="module.eduexpe.visible" @click="editing('eduexpe')">
        <h2>教育经历</h2>
        <div class="content">
          <div class="expe-item" v-for="(eduexpe, key) in resume.eduexpe" :key="eduexpe.id">
            <ul class="expe-title">
              <li>
                <editarea :value="eduexpe.school" @edit="onEdit('eduexpe['+key+'].school', $event)"></editarea>
              </li>
              <li>
                <editarea :value="eduexpe.discipline" @edit="onEdit('eduexpe['+key+'].discipline', $event)"></editarea>
              </li>
              <li class="date">
                <el-date-picker
                  v-model="eduexpe.startDate"
                  type="month"
                  placeholder="开始日期">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="eduexpe.endDate"
                  type="month"
                  placeholder="结束日期">
                </el-date-picker>
              </li>
            </ul>
            <p class="description">
              <editarea :value="eduexpe.description" @edit="onEdit('eduexpe['+ key +'].description', $event)"></editarea>
            </p>
            <div class="item-btn-group">
              <span class="btn" @click.stop="moveUp('eduexpe', key, $event)"><i class="iconfont icon-arrow-up"></i></span>
              <span class="btn" @click.stop="moveDown('eduexpe', key, $event)"><i class="iconfont icon-arrow-down"></i></span>
              <span class="btn" @click.stop="removeItem('eduexpe', key, $event)"><i class="iconfont icon-shanchu"></i></span>
            </div>
          </div>
        </div>
        <div class="section-btn-group">
          <span class="btn" @click="addItem('eduexpe', $event)"><i class="iconfont icon-jiahao"></i></span>
        </div>
      </section>
      <section class="skill" :class="{active: moduleEditing.skills && !preview}" v-if="module.skills.visible" @click="editing('skills')">
        <h2>技能描述</h2>
        <div class="content">
          <div class="expe-item skill-item" v-for="(skills, key) in resume.skills" :key="skills.id">
            <h3>
              <editarea :value="skills.name" @edit="onEdit('skills['+key+'].name', $event)"></editarea>
            </h3>
            <p>
              <editarea :value="skills.description" @edit="onEdit('skills['+key+'].description', $event)"></editarea>
            </p>
            <div class="item-btn-group">
              <span class="btn" @click.stop="moveUp('skills', key, $event)"><i class="iconfont icon-arrow-up"></i></span>
              <span class="btn" @click.stop="moveDown('skills', key, $event)"><i class="iconfont icon-arrow-down"></i></span>
              <span class="btn" @click.stop="removeItem('skills', key, $event)"><i class="iconfont icon-shanchu"></i></span>
            </div>
          </div>
        </div>
        <div class="section-btn-group">
          <span class="btn" @click="addItem('skills', $event)"><i class="iconfont icon-jiahao"></i></span>
        </div>
      </section>
      <section class="project" :class="{ active: moduleEditing.projects && !preview }" v-if="module.projects.visible" @click="editing('projects')">
        <h2>项目经历</h2>
        <div class="content">
          <div class="expe-item" v-for="(projects, key) in resume.projects" :key="projects.id">
            <ul class="expe-title">
              <li>
                <editarea :value="projects.name" @edit="onEdit('projects['+key+'].name', $event)"></editarea>
              </li>
              <li>
                <editarea :value="projects.role" @edit="onEdit('projects['+key+'].role', $event)"></editarea>
              </li>
              <li class="date">
                <el-date-picker
                  v-model="projects.startDate"
                  type="month"
                  placeholder="开始日期">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="projects.endDate"
                  type="month"
                  placeholder="结束日期">
                </el-date-picker>
              </li>
            </ul>
            <p class="description">
              <editarea :value="projects.description" @edit="onEdit('projects['+key+'].description', $event)"></editarea>
            </p>
            <div class="item-btn-group">
              <span class="btn" @click.stop="moveUp('projects', key, $event)"><i class="iconfont icon-arrow-up"></i></span>
              <span class="btn" @click.stop="moveDown('projects', key, $event)"><i class="iconfont icon-arrow-down"></i></span>
              <span class="btn" @click.stop="removeItem('projects', key, $event)"><i class="iconfont icon-shanchu"></i></span>
            </div>
          </div>
        </div>
        <div class="section-btn-group">
          <span class="btn" @click="addItem('projects', $event)"><i class="iconfont icon-jiahao"></i></span>
        </div>
      </section>
      <div class="mask" v-if="maskVisible" @click="quitEditing" v-cloak></div>
    </div>
  </main>
</template>

<script>
import AV from 'leancloud-storage'
import _Bus from '../bus.js'
import editarea from './editarea.vue'

export default {
  props: ['preview'],
  components: {
    editarea
  },
  data () {
    return {
      resume: {
        name: '你的名字',
        objective: '前端工程师',
        city: '郑州',
        education: '本科',
        age: '24',
        phone: '12345678910',
        email: 'example@example.com',
        site: 'example.com',
        introduction: '用一段简短的文字介绍自己，凸出自己的优势。',
        workexpe: [
          {
            startDate: '',
            endDate: '',
            company: '公司名称',
            post: '所任职位',
            description: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。'
          }
        ],
        eduexpe: [
          {
            startDate: '',
            endDate: '',
            school: '学校名称',
            discipline: '所学专业',
            description: '尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息，如：GPA：3.72/4（专业前10%）GRE：324'
          }
        ],
        skills: [
          {
            name: '技能名称',
            description: 'PHP/ Python/ Node/ Ruby/ Elixir （掌握/基础/理解/熟练应用/使用XXX开发Web应用/开发API/)'
          },
          {
            name: '前端框架',
            description: 'Bootstrap/ AngularJS/ EmberJS/ Vue/ React （掌握/基础/熟练应用/使用XXX开发XXX）'
          },
          {
            name: '前端框架',
            description: 'Bootstrap/ AngularJS/ EmberJS/ Vue/ React （掌握/基础/熟练应用/使用XXX开发XXX）'
          }
        ],
        projects: [
          {
            startDate: '',
            endDate: '',
            name: '项目名称',
            role: '项目中承担的角色',
            description: '描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩，建议加入超链接。'
          },
          {
            startDate: '',
            endDate: '',
            name: '项目名称',
            role: '项目中承担的角色',
            description: '描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩，建议加入超链接。'
          }
        ]
      },
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
      },
      maskVisible: false,
      moduleEditing: {
        personalInfo: false,
        introduction: false,
        workexpe: false,
        eduexpe: false,
        skills: false,
        projects: false
      },
      addToItemData: {
        workexpe: {
          startDate: '2016-06',
          endDate: '2018-06',
          company: '公司名称',
          post: '所任职位',
          description: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，工作经验的描述与目标岗位的招聘要求尽量匹配。'
        },
        eduexpe: {
          startDate: '2012-09',
          endDate: '2016-06',
          school: '学校名称',
          discipline: '所学专业',
          description: '尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息。'
        },
        skills: {
          name: '技能名称',
          description: '这里填写技能描述。'
        },
        projects: {
          startDate: '2018-04',
          endDate: '2018-05',
          name: '项目名称',
          role: '项目中承担的角色',
          description: '描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩。'
        },
        customize: {
          startDate: '2017-06',
          endDate: '2018-06',
          sSupplement: '补充描述',
          sSupplement2: '补充描述',
          description: '补充详细描述。'
        }
      },
      prompt: ''
    }
  },
  methods: {
    /* 时间格式转换 */
    timeConversion (time) {
      let date = new Date(time)
      return date.getFullYear() + '/' +
        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds()
    },
    /* 保存简历 */
    saveResume (id) {
      let user = AV.Object.createWithoutData('User', id)
      // 修改属性
      user.set('resume', this.resume)
      user.set('module', this.module)
      // 保存到云端
      user.save().then((res) => {
        let updateTime = this.timeConversion(res.updatedAt)
        this.prompt = '保存成功，' + updateTime
      }, (error) => {
        console.log(error)
        console.log('保存失败')
      })
    },
    /* 每5分钟自动保存一次 */
    autoSave (id) {
      setInterval(() => { this.saveResume(id) }, 300000)
    },
    /* 获取简历 */
    getResume (id) {
      let query = new AV.Query('User')
      query.get(id).then((user) => {
        if (user.attributes.resume) {
          Object.assign(this.resume, user.attributes.resume)
          Object.assign(this.module, user.attributes.module)
          let updateTime = this.timeConversion(user.updatedAt)
          this.prompt = '上次更新时间：' + updateTime
        }
      }, (error) => {
        console.log(error)
      })
    },
    /* 编辑框 */
    onEdit (key, value) {
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number) => `.${number}`)
      let keys = key.split('.')
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
        }
      }
    },
    /* 编辑模块时打开遮罩层 */
    editing (name) {
      this.quitEditing()
      this.moduleEditing[name] = true
      this.maskVisible = true
    },
    /* 退出编辑模式，关闭遮罩 */
    quitEditing () {
      let module = this.moduleEditing
      Object.keys(module).forEach((key) => {
        if (module[key]) {
          module[key] = false
        }
      })
      this.maskVisible = false
    },
    addItem (key) {
      let itemData = this.addToItemData[key]
      this.resume[key].push(itemData)
    },
    removeItem (key, index) {
      this.quitEditing()
      if (window.confirm('确认删除吗？删除后不可恢复')) {
        this.resume[key].splice(index, 1)
      }
    },
    moveUp (key, index) {
      let arr = this.resume[key]
      if (index <= 0) {
        console.log('到顶了！')
      } else {
        let temp = arr[index]
        arr.splice(index, 1, arr[index - 1])
        arr.splice(index - 1, 1, temp)
      }
    },
    moveDown (key, index) {
      let arr = this.resume[key]
      if (index >= arr.length - 1) {
        console.log('到底了！')
      } else {
        let temp = arr[index]
        arr.splice(index, 1, arr[index + 1])
        arr.splice(index + 1, 1, temp)
      }
    }
  },
  mounted () {
    _Bus.$on('saveResume', (id) => {
      this.saveResume(id)
    })
    let data = { resume: this.resume, module: this.module }
    _Bus.$emit('passResumeData', data)
  },
  watch: {
    prompt: function () {
      _Bus.$emit('updatePrompt', this.prompt)
    },
    preview: function () {
      console.log(this.preview)
      if (!this.preview) {

      }
    }
  }
}
</script>

<style lang="scss">
  #main{
    width: 800px;
    min-height: 1066px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin: 100px auto 40px auto;
    background-color: #fff;
    position: relative;
    .resume{
      font-size: 14px;
      .personal-info{
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;
        .name{
          font-size: 30px;
          color: #333;
          font-weight: 600;
        }
        .areer-objective{
          margin-top: 36px;
          font-size: 16px;
          color: #333333;
          div{
            display: inline;
          }
        }
        .right{
          display: flex;
          justify-content: space-between;
          ul{
            li{
              color: #666;
              line-height: 30px;
              div{
                display: inline;
              }
            }
          }
          ul:last-child{
            margin-left: 50px;
          }
        }
      }
      section{
        padding: 15px 6mm 0;
        border: 2px transparent dashed;
        position: relative;
        h2{
          font-size: 20px;
          color: #333;
          margin: 10px 0 20px;
          font-weight: 600;
          position: relative;
        }
        h2:after{
          content: '';
          display: block;
          width: 85%;
          height: 1px;
          position: absolute;
          right: 0;
          top: 50%;
          background-color: #ccc;
        }
        .content{
          div{
            line-height: 1.8;
          }
          .expe-item{
            padding: 15px 20px;
            color: #444;
            position: relative;
            .date{
              display: flex;
              justify-content: left;
              .el-date-editor.el-input{
                width: 100px;
                .el-input__inner{
                  padding-right: 0;
                }
                .el-input__icon{
                  line-height: inherit;
                }
              }
            }
          }
          .expe-item::after{
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: #eee;
            left: 0;
            bottom: 0;
          }
          .expe-title{
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            line-height: 1.8em;
          }
          .expe-item:hover{
            background-color: #E7F2FF;
            .item-btn-group{
              display: flex;
            }
          }
          .expe-item:last-child::after{
            display: none;
          }
        }
        .skill .skill-item{
          padding: 10px 20px;
          h3{
            color: #444;
            font-size: 16px;
            line-height: 1.2em;
            padding-left: 15px;
            position: relative;
          }
          h3:before{
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -2px;
            background-color: #444;
          }
          p{
            padding: 0 15px;
          }
        }
        input[type=text]{
          border: none;
          outline: none;
          font-size: 100%;
          color: inherit;
          height: 1.5em;
          line-height: 1.5em;
        }
        .section-btn-group{
          position: absolute;
          right: 0;
          top: 0;
          padding: 3px;
          display: none;
        }
        .item-btn-group{
          position: absolute;
          left: -30px;
          top: 0;
          display: none;
          flex-direction: column;
          .btn{
            margin-left: 0;
            background-color: #E7F2FF;
            color: #00c091;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }
        }
        .btn{
          display: block;
          width: 30px;
          height: 30px;
          margin-left: 5px;
          margin-bottom: 5px;
          background-color: #00c091;
          color: #fff;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          border-radius: 3px;
        }
      }
      section:hover,
      section.active{
        position: relative;
        background-color: #fff;
        border-color: #00c091;
      }
      section.active{
        z-index: 60;
      }
      section.active .section-btn-group,
      section:hover .section-btn-group{
        display: flex;
      }
    }
    .mask{
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.6);
      z-index: 25;
    }
  }
  @media screen and (max-width: 1200px) {
    #main{
      transform: translateX(100px);
    }
  }
</style>
