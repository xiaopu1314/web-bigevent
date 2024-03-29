$(function(){
    var form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6-12位，且不能出现空格"],
        samePwd:function(value){
            if(value === $("[name=old_pwd]").val())
            {
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $("[name=new_pwd]").val()){
                return "两次密码不一致"
            }
        }
        

    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type: "PATCH",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !=0){
                    return layui.layer.msg("更新密码失败！")
                }
                layui.layer.msg("更新密码成功")
                $(".layui-form")[0].reset()
            }
        });
    })
})