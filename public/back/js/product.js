$(function () {
   var currentPage=1;
   var pageSize=5;
  var imgs=[]
  function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        // 渲染页面
        $("tbody").html(template("tmp",info));
        
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:currentPage,
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              //如果是page，说明就是数字，只需要返回对应的数字即可
              default:
                return page;
            }
          },
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,page) {
            currentPage=page;
            render();
          }
        })
      }
    })
  }
  render()
  
  $(".btn_add").click(function () {
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        $(".dropdown-menu").html(template("tmp1",info))
      }
    });
  })
  $(".dropdown-menu").on("click","a",function () {
    $(".dropdown_text").text($(this).text());
    $('[ name="brandId"]').val($(this).data("id"));
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  
  });
  var $form=$("form");
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      
      brandId: {
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName: {
        validators:{
          notEmpty:{
            message:"请输入商品的名称"
          }
        }
      },
      proDesc: {
        validators:{
          notEmpty:{
            message:"请输入商品的描述"
          }
        }
      },
      num: {
        validators:{
          notEmpty:{
            message:"请输入商品的库存"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp:/^[1-9]\d*$/,
            message:"请输入合法的库存"
          }
        }
      },
      size: {
        validators:{
          notEmpty:{
            message:"请输入商品的尺码"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price: {
        validators:{
          notEmpty:{
            message:"请输入商品的价格"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
      
    }
  });
 
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e,data) {
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
      imgs.push(data.result);
      if(imgs.length===3){
        $form.data("bootstrapValidator").updateStatus("brandLogo","VALID")
      }else{
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }

  });
  $form.on("success.form.bv",function (e) {
    var param=$form.serialize();
    param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
    console.log(param);
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:param,
      success:function (info) {
        if(info.success){
          $("#addModal").modal("hide");
          currentPage=1;
          render();
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
  
          //下拉菜单重置
          $(".dropdown_text").text("请选择二级分类");
          $("[name='brandId']").val('');
  
          //重置图片
          $(".img_box img").remove();
          imgs = [];
        }
      }
      
    })
  })
  
})
