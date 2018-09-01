Vue.component('aside-left',{
    props: ['resume','module'],
    data(){
        return {
            asideVisible: false
        }
    },
    template: `
<aside id="aside">
    <div class="resume-operation">
        <ul>
            <li><a href="" id="sava-resume" @click.prevent="$parent.clickSaveResume"><i class="iconfont icon-baocun"></i>保存编辑</a></li>
            <li><a href="" @click.prevent="$parent.print"><i class="iconfont icon-print"></i>打印预览</a></li>
            <li><a href=""><i class="iconfont icon-zhifeiji"></i>分享简历</a></li>
            <li><a href="" @click.prevent="openModuleAside"><i class="iconfont icon-mokuaiguanli"></i>模块管理</a></li>
        </ul>
    </div>
    <div class="module-management" :class="{active: asideVisible}">
        <ul>
            <li v-for="(section, key) in module" :key="section.id">
                <span>{{section.name}}</span>
                <switch-btn :value="section.visible" @toggle="onToggle(key, section.visible, $event)"></switch-btn>
            </li>
        </ul>
        <div class="close-module-btn" @click="closeModuleAside">&lt;&lt; 收起</div>
    </div>
</aside>`,
    methods:{
        /*模块管理*/
        onToggle(key, status){
            this.module[key].visible = !status;
        },
        /*打开模块管理*/
        openModuleAside(){
            this.asideVisible = true
        },
        /*关闭模块管理*/
        closeModuleAside(){
            this.asideVisible = false
        },
    }
});