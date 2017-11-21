$(function () {
  // alert($)
  var $form=$('form');
  // 使用表单校验
  $form.bootstrapValidator({
    // 指定校验时图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名或密码错误"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
          
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"长度必须6-12位"
          },
          callback:{
            message:"用户名或密码错误"
          }
        }
      }


    }
  })
  // 给表单注册校验成功的事件
  $form.on("success.form.bv",function (e) {
      e.preventDefault();
      $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data: $form.serialize(),
      success:function (data) {
        if(data.success){
          location.href="index.html"
        }
        if(data.error===1000){
          // alert("用户名错误")
          //手动调用方法，updateStatus让username校验失败即可
          //第一个参数：改变哪个字段
          //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
          //第三个参数：选择提示的信息
          $form.data("bootstrapValidator").updateStatus('username',"INVALID","callback");
        }
        if(data.error===1001){
          // alert("密码错误")
          $form.data("bootstrapValidator").updateStatus('password',"INVALID","callback");
        }
        
      }
  
    });
    })
  
  // 重置功能,重置样式
  $("[type='reset']").on("click",function () {
    $form.data('bootstrapValidator').resetForm();
  })
  
  
})
