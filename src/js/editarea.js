Vue.component('editarea',{
    props:['value'],
    template: `<div class="editarea" contenteditable="true" @blur="enter" >{{value}}</div>
    `,
    methods:{
        enter(e){
            this.$emit('edit',e.target.innerText)
        }
    }
});