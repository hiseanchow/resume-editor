Vue.component('resume', {
    props: ['resume', 'module','preview'],
    data(){
        return{
            maskVisible: false,
            moduleEditing: {
                personalInfo: false,
                introduction: false,
                workexpe: false,
                eduexpe: false,
                skills: false,
                projects: false,
            },
        }
    },
    template: `
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
                        <li class="date">
                            <editarea class="date-input" :value="workexpe.startDate" @edit="onEdit('workexpe['+key+'].startDate', $event)"></editarea>
                            ~
                            <editarea class="date-input" :value="workexpe.endDate" @edit="onEdit('workexpe['+key+'].endDate', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="workexpe.company" @edit="onEdit('workexpe['+key+'].company', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="workexpe.post" @edit="onEdit('workexpe['+key+'].post', $event)"></editarea>
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
                        <li class="date">
                            <editarea class="date-input" :value="eduexpe.startDate" @edit="onEdit('eduexpe['+key+'].startDate', $event)"></editarea>
                            ~
                            <editarea class="date-input" :value="eduexpe.endDate" @edit="onEdit('eduexpe['+key+'].endDate', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="eduexpe.school" @edit="onEdit('eduexpe['+key+'].school', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="eduexpe.discipline" @edit="onEdit('eduexpe['+key+'].discipline', $event)"></editarea>
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
                        <li class="date">
                            <editarea class="date-input" :value="projects.startDate" @edit="onEdit('projects['+key+'].startDate', $event)"></editarea>
                            ~
                            <editarea class="date-input" :value="projects.endDate" @edit="onEdit('projects['+key+'].endDate', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="projects.name" @edit="onEdit('projects['+key+'].name', $event)"></editarea>
                        </li>
                        <li>
                            <editarea :value="projects.role" @edit="onEdit('projects['+key+'].role', $event)"></editarea>
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
</main>`,
    methods:{
        /*编辑框*/
        onEdit(key,value){
            let regex = /\[(\d+)\]/g;
            key = key.replace(regex, (match, number) => `.${number}`);
            let keys = key.split('.');
            let result = this.resume;
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }
        },
        /*编辑模块时打开遮罩层*/
        editing(name){
            this.quitEditing();
            this.moduleEditing[name] = true;
            this.maskVisible = true;
        },
        /*退出编辑模式，关闭遮罩*/
        quitEditing(){
            let module = this.moduleEditing;
            Object.keys(module).forEach((key)=>{
                if(module[key]){
                    module[key] = false;
                }
            });
            this.maskVisible = false;
        },
        addItem(key){
            let itemData = this.addToItemData[key];
            this.resume[key].push(itemData);
        },
        removeItem(key, index){
            this.quitEditing();
            // this.showMessageDialog('确定删除当前子模块吗？','删除后将无法恢复。')
            if (window.confirm("确认删除吗？删除后不可恢复")) {
                this.resume[key].splice(index,1)
            }
        },
        moveUp(key,index){
            let arr = this.resume[key];
            if(index <= 0){
                console.log('到顶了！')
            }else{
                let temp = arr[index];
                arr.splice(index,1, arr[index - 1]);
                arr.splice(index - 1, 1, temp);
            }
        },
        moveDown(key,index){
            let arr = this.resume[key];
            if(index >= arr.length - 1){
                console.log('到底了！')
            }else{
                let temp = arr[index];
                arr.splice(index,1, arr[index + 1]);
                arr.splice(index + 1, 1, temp);
            }
        },
    },
});