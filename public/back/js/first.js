$(function () {
  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        // 渲染页面
        $("tbody").html(template("tpl",info));
      
        // 渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,page) {
            currentPage=page;
            render();
          
          }
        })
      }
    })
  }
  render();
  // 添加模态框
  $(".btn_add").click(function () {
    $("#addModal").modal("show");
  })

  // 表单校验
  var $form=$("form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名字"
          }
        }
      }
    }

  })
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (info) {
       if(info.success){
         $("#addModal").modal("hide");
         $form.data("bootstrapValidator").resetForm();
         $form[0].reset();
         render();
       }
      }
    })
  })
})

