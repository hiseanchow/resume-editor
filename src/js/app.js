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
        moduleEditing: {
            personalInfo: false,
            introduction: false,
            workexpe: false,
            eduexpe: false,
            skills: false,
            projects: false,
        },
        dialog:{
            signUpVisible: false,
            loginVisible: false,
            messageVisible: false,
            signUpSuccess: false,
            maskVisible: false,
        },
        dialogMessage: {
            title: '',
            message: '',
        },
        signUpForm:{
            email: '',
            passwd: '',
            confirmPasswd: '',
            emailError: '',
            passwdError: '',
            confirmPasswdError: '',
        },
        logInForm:{
            email: '',
            passwd: '',
            emailError: '',
            passwdError: '',
        },
        loginReminder: '请注意，当前处于预览状态，数据不会被保存，请登录后制作!',
        updatePrompt: {
            visible: false,
            message: ''
        },
        currentUser: '',
        isLogIn: false,
        maskVisible: false,
        moduleAsideVisible: false,
        printPreview: false,
        inPrint: false
    },
    methods: {
        /*编辑框*/
        onEdit(key,value){
            let reg = /\[(\d+)\]/g;
            key = key.replace(reg, (match, number) => `.${number}`);
            let keys = key.split('.');
            let result = this.resume;
            for(let i = 0; i < keys.length; i++){
                if(i === keys.length - 1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
            }
            // result = value;
        },
        /*模块管理*/
        onToggle(key, status){
            this.module[key].visible = !status;
        },
        /*弹出对话框*/
        showDialog(){
            this.dialog.maskVisible = true;
        },
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
            this.showDialog();
            if(this.dialog.signUpVisible){
                this.dialog.signUpVisible = false;
            }else if(this.dialog.signUpSuccess){
                this.dialog.signUpSuccess = false;
            }
            this.dialog.loginVisible = true;
        },
        /*显示注册对话框*/
        showSignUp(){
            this.showDialog();
            if(this.dialog.loginVisible){
                this.dialog.loginVisible = false;
            }
            this.dialog.signUpVisible = true;
        },
        /*登录成功*/
        signUpSuccess(){
            this.dialog.signUpVisible = false;
            this.dialog.signUpSuccess = true;
        },
        showMessageDialog(title,message,btn){
            this.dialogMessage.title = title;
            this.dialogMessage.message = message;
            this.dialog.maskVisible = true;
            this.dialog.messageVisible = true;
            return new Promise((resolve, reject) => {
                if(btn === 'determine-btn'){
                    resolve();
                }else if(btn === 'cancel-btn'){
                    reject();
                }
            })
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
        /*点击保存按钮*/
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
                this.updatePrompt.message = '保存成功，' + updateTime;
            },(error)=>{
                console.log(error);
                console.log('保存失败');
            });
        },
        /*每5分钟自动保存一次*/
        autoSave(id){
            setInterval(()=>{ this.saveResume(id) }, 300000)
        },
        /*注册*/
        onSignUp(){
            let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let reg = /^[\w]{8,14}$/;
            let emailError = '',
                passwdError = '',
                confirmPasswdError = '';

            if(!this.signUpForm.email){
                emailError = "邮箱不能为空";
                this.signUpForm.emailError = emailError;
                return
            } else if(!pattern.test(this.signUpForm.email)){
                emailError = '邮箱格式不正确';
                this.signUpForm.emailError = emailError;
                return
            } else{
                this.signUpForm.emailError = '';
            }

            if(!this.signUpForm.passwd){
                passwdError = '密码不能为空！';
                this.signUpForm.passwdError = passwdError;
                return;
            } else if(!this.signUpForm.passwd.match(reg)){
                passwdError = '请输入8到14位的密码！';
                this.signUpForm.passwdError = passwdError;
                return;
            } else{
                this.signUpForm.passwdError = '';
            }


            if(!this.signUpForm.confirmPasswd){
                confirmPasswdError = '请再次确认密码！';
                this.signUpForm.confirmPasswdError = confirmPasswdError;
                return
            } else if(!(this.signUpForm.passwd === this.signUpForm.confirmPasswd)){
                confirmPasswdError = '密码不一致！';
                this.signUpForm.confirmPasswdError = confirmPasswdError;
                return
            }else{
                this.signUpForm.confirmPasswdError = '';
            }

            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUpForm.email);
            // 设置密码
            user.setPassword(this.signUpForm.passwd);
            // 设置邮箱
            user.setEmail(this.signUpForm.email);
            user.signUp().then((user) => {
                console.log(user);
                this.signUpSuccess();
            }, (error) => {
                switch (error.code) {
                    case 203:
                        emailError = '此邮箱已被注册！';
                        break;
                    default:
                        emailError = error.code + '：' + error.error;
                }
                this.signUpForm.emailError = emailError;
            });
        },
        /*登录*/
        onLogin(){
            let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let reg = /^[\w]{8,14}$/;
            let emailError = '',
                passwdError = '';


            if(!this.logInForm.email){
                emailError = '邮箱不能为空';
                this.logInForm.emailError = emailError;
                return
            } else if(!pattern.test(this.logInForm.email)){
                emailError = '邮箱格式不正确';
                this.logInForm.emailError = emailError;
                return
            } else{
                this.logInForm.emailError = '';
            }

            if(!this.logInForm.passwd){
                passwdError = '密码不能为空';
                this.logInForm.passwdError = passwdError;
                return
            }else{
                this.logInForm.passwdError = ''
            }

            AV.User.logIn(this.logInForm.email, this.logInForm.passwd).then((res) => {
                this.currentUser = res.attributes.username;
                this.closeDialog();
                window.location.reload();
            }, (error) => {
                switch (error.code){
                    case 210:
                        passwdError = '邮箱和密码不匹配！';
                        break;
                    case 211:
                        emailError = '邮箱不存在！';
                        break;
                    case 216:
                        emailError = '电子邮件地址未经过验证。';
                        break;
                    case 219:
                        passwdError = '登录失败次数超过限制，请稍候再试！';
                        break;
                    default :
                        passwdError = error.code+'：'+error.error;
                }
                this.logInForm.emailError = emailError;
                this.logInForm.passwdError = passwdError;
            });
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
                    this.updatePrompt.message = '上次更新时间：' + updateTime;
                }
            }, (error) => {
                console.log(error);
            });
        },
        /*查询当前是否登录*/
        hasLogin(){
            let current = AV.User.current();
            if(current){
                this.getResume(current.id);
                this.currentUser = current.attributes.username;
                this.isLogIn = true;
                this.updatePrompt.visible = true;
                /*自动保存*/
                /*this.autoSave(current.id);*/
            }else{
                this.currentUser = '';
                this.updatePrompt.visible = false
            }
        },
        /*编辑模块时打开遮罩层*/
        editing(name){
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
        /*打开模块管理*/
        openModuleAside(){
            this.moduleAsideVisible = true
        },
        /*关闭模块管理*/
        closeModuleAside(){
            this.moduleAsideVisible = false
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
                console.log('到头了！')
            }else{
                let temp = arr[index];
                arr.splice(index,1, arr[index - 1]);
                arr.splice(index - 1, 1, temp);
            }
        },
        moveDown(key,index){
            let arr = this.resume[key];
            if(index >= arr.length - 1){
                console.log('到头了！')
            }else{
                let temp = arr[index];
                arr.splice(index,1, arr[index + 1]);
                arr.splice(index + 1, 1, temp);
            }
        },
        print(){
            this.printPreview = true
            /*let newWindow = window.open("_blank");
            let printHtml = document.getElementById("main").innerHTML;
            let printBox = document.getElementById("print-div");
            printBox.innerHTML = printHtml;*/
            // newWindow.print();
        },
        backEdit(){
            this.printPreview = false
        },
        clickPrint(){
            this.inPrint = true;
            setTimeout(()=>{
                window.print();
                this.inPrint = false;
            },500)
        }
    },
    created(){
        this.hasLogin();
        /*window.onbeforeunload = function(event){
            return '您可能有数据没有保存';
        };*/
    }
});