Vue.component('editarea',{
    props:['value'],
    template: `<div class="editarea" contenteditable="true" @input="enter" v-once>{{value}}</div>
    `,
    methods:{
        enter(e){
            this.$emit('edit',e.target.innerText)
        }
    }
});