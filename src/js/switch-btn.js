Vue.component('switch-btn',{
    props:['value'],
    template: `<span class="switch-btn" :class="{on: status}" @click="onSwitch"></span>`,
    data(){
        return {
            status: this.value || false
        }
    },
    methods:{
        onSwitch(e){
            this.status = !this.status;
            this.$emit('toggle')
        }
    },
    watch: {
        value: function (value){
            this.status = value;
        }
    }
});