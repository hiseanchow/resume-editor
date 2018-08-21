{
    lay('.resume .setdate').each(function() {
        laydate.render({
            elem: this,
            type: 'month',
            range: true,
            trigger: 'click',
            theme: '#00c091'
        })
    });
}