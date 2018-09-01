Vue.component('preview-header',{
    template:`
<div class="header preview-header" v-cloak>
    <div @click="$parent.backEdit" class="btn back-btn">返回编辑</div>
    <div @click="$parent.clickPrint" class="btn print-btn">打印</div>
</div>`
})