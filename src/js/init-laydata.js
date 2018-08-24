{
    lay('.resume .date-input').each(function() {
        laydate.render({
            elem: this,
            type: 'month',
            /*range: true,*/
            trigger: 'click',
            theme: '#00c091',
            btns: ['confirm'],
            change: (value) => {
                this.innerText = value;
                this.focus();
                this.blur();
            }
        })
    });
}