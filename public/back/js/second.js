$(function () {
  var currendPage=1;
  var pageSize=5;
  function render() {
      $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:currendPage,
          pageSize:pageSize
        },
        success:function (info) {
          console.log(info);
          // 渲染页面
          $("tbody").html(template("tmp",info));
          // 渲染分页
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:currendPage,
            totalPages:Math.ceil(info.total/pageSize),
            onPageClicked:function (a,b,c,page) {
              currendPage=page;
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
      $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:1,
          pageSize:100
        },
        success:function (info) {
          $(".dropdown-menu").html(template("tmp1",info))
        }
      })
  });
  
  // 给下拉菜单添加点击事件
  var $form = $("form");
  $(".dropdown-menu").on("click","a",function () {
      $(".dropdown_text").text($(this).text());
    $("[name='categoryId']").val($(this).data("id"))
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      $(".img_box img").attr("src",data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      $("[name='brandLogo']").val(data.result.picAddr);
      
  
    }
  });
  // 表单校验功能
  $form.bootstrapValidator({
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });
  
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function (info) {
        if(info.success){
          $("#addModal").modal("hide")
          currendPage=1;
          render();
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
          $(".dropdown_text").text("请输入一个一级菜单");
          $("[name='categoryId']").val('');
          $(".img_box img").attr("src","images/default.png")
          $("[name='brandLogo']").val('');
        }
      }
    })
  })
})