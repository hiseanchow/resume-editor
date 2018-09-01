Vue.component('editarea',{
    props:['value','preview'],
    template: `<div class="editarea" :contenteditable="preview" @blur="enter" >{{value}}</div>
    `,
    methods:{
        enter(e){
            this.$emit('edit',e.target.innerText);
        }
    }
});