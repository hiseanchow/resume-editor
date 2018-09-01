let app = new Vue({
    el: "#app",
    data: {
        resume: {
            name: "你的名字",
            objective: "前端工程师",
            city: '郑州',
            education: '本科',
            age: '24',
            phone: '12345678910',
            email: 'example@example.com',
            site: 'example.com',
            introduction:'用一段简短的文字介绍自己，凸出自己的优势。',
            workexpe: [
                {
                    startDate: '2016-06',
                    endDate: '2018-06',
                    company: '公司名称',
                    post: '所任职位',
                    description: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。',
                },
            ],
            eduexpe: [
                {
                    startDate: '2012-09',
                    endDate: '2016-06',
                    school: '学校名称',
                    discipline: '所学专业',
                    description: '尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息，如：GPA：3.72/4（专业前10%）GRE：324'
                },
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
                },
            ],
            projects: [
                {
                    startDate: '2018-04',
                    endDate: '2018-05',
                    name: "项目名称",
                    role: "项目中承担的角色",
                    description: "描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩，建议加入超链接。",
                },
                {
                    startDate: '2018-05',
                    endDate: '2018-07',
                    name: "项目名称",
                    role: "项目中承担的角色",
                    description: "描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩，建议加入超链接。",
                },
            ],
        },
        addToItemData: {
            workexpe:{
                startDate: '2016-06',
                endDate: '2018-06',
                company: '公司名称',
                post: '所任职位',
                description: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，工作经验的描述与目标岗位的招聘要求尽量匹配。',
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
            projects:{
                startDate: '2018-04',
                endDate: '2018-05',
                name: "项目名称",
                role: "项目中承担的角色",
                description: "描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩。",
            },
            customize: {
                startDate: '2017-06',
                endDate: '2018-06',
                sSupplement: "补充描述",
                sSupplement2: "补充描述",
                description: "补充详细描述。",
            }
        },
        module: {
            personalInfo: {
                name: '基本信息',
                visible: true,
            },
            introduction:{
                name: '个人简介',
                visible: true,
            },
            workexpe:{
                name: '工作经历',
                visible: true,
            },
            eduexpe:{
                name: '教育经历',
                visible: true,
            },
            skills:{
                name: '技能描述',
                visible: true,
            },
            projects:{
                name: '项目经历',
                visible: true,
            }
        },
        dialog:{
            signUpVisible: false,
            loginVisible: false,
            signUpSuccessVisible: false,
            maskVisible: false,
        },
        headerPrompt: '请注意，当前处于预览状态，数据不会被保存，请登录后制作!',
        currentUser: '',
        isLogIn: false,
        maskVisible: false,
        preview: false,
        inPrint: false
    },
    methods: {
        /*关闭对话框*/
        closeDialog(dialogName){
            if(dialogName){
                this.dialog[dialogName] = false;
            }else{
                let dialog = this.dialog;
                Object.keys(dialog).forEach((key)=>{
                    if(dialog[key]){
                        dialog[key] = false
                    }
                });
            }
            this.dialog.maskVisible = false;
        },
        /*显示登录对话框*/
        showLogin(){
            if(this.dialog.signUpVisible){
                this.dialog.signUpVisible = false;
            }else if(this.dialog.signUpSuccessVisible){
                this.dialog.signUpSuccessVisible = false;
            }
            this.dialog.loginVisible = true;
        },
        /*显示注册对话框*/
        showSignUp(){
            if(this.dialog.loginVisible){
                this.dialog.loginVisible = false;
            }
            this.dialog.signUpVisible = true;
        },
        /*登录成功*/
        signUpSuccess(){
            this.dialog.signUpVisible = false;
            this.dialog.signUpSuccessVisible = true;
        },
        /*时间格式转换*/
        timeConversion(time){
             let date = new Date(time);
             return date.getFullYear() + '/' +
                (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/' +
                date.getDate() + ' ' +
                date.getHours() + ':' +
                date.getMinutes() + ':' +
                date.getSeconds();
        },
        clickSaveResume(){
            let currentUser = AV.User.current();
            if(currentUser){
                let id = currentUser.id;
                this.saveResume(id)
            }else{
                this.showLogin();
            }
        },
        /*保存简历*/
        saveResume(id){
            let user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume', this.resume);
            user.set('module', this.module);
            // 保存到云端
            user.save().then((res)=>{
                let updateTime = this.timeConversion(res.updatedAt);
                this.headerPrompt = '保存成功，' + updateTime;
            },(error)=>{
                console.log(error);
                console.log('保存失败');
            });
        },
        /*每5分钟自动保存一次*/
        autoSave(id){
            setInterval(()=>{ this.saveResume(id) }, 300000)
        },
        /*登出*/
        logout(){
            AV.User.logOut();
            window.location.reload();
        },
        /*获取简历*/
        getResume(id){
            let query = new AV.Query('User');
            query.get(id).then((user) => {
                if(user.attributes.resume){
                    Object.assign(this.resume, user.attributes.resume);
                    Object.assign(this.module, user.attributes.module);
                    let updateTime = this.timeConversion(user.updatedAt);
                    this.headerPrompt = '上次更新时间：' + updateTime;
                }
            }, (error) => {
                console.log(error);
            });
        },
        /*查询当前是否登录*/
        hasLogin(){
            let current = AV.User.current();
            if(current){
                this.currentUser = current.attributes.username;
                this.isLogIn = true;
                this.getResume(current.id);
                /*自动保存*/
                /*this.autoSave(current.id);*/
            }else{
                this.currentUser = '';
                this.headerPrompt = '请注意，当前处于预览状态，数据不会被保存，请登录后制作!'
            }
        },
        print(){
            this.preview = true;
            console.dir(this.$el);
        },
        backEdit(){
            this.preview = false
        },
        clickPrint(){
            this.inPrint = true;
            setTimeout(()=>{
                window.print();
                this.inPrint = false;
            },500)
        },
        downloadPdf(){


        }
    },
    created(){
        this.hasLogin();
        /*window.onbeforeunload = function(event){
            return '您可能有数据没有保存';
        };*/
    }
});