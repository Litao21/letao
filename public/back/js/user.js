$(function () {
  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $("tbody").html(template("tmp",info));

        // 渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,page) {
            currentPage=page;
            render()
          }
        })
      }

    });
  }
  render();
  
  $("table").on("click","button",function () {
    $("#userModal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete=$(this).hasClass("btn-danger")?0:1;
    
    $(".ensure").off().click(function () {
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success){
            $("#userModal").modal("hide");
            render();
          }
        }
      })
  
    })
    
  })

 
})
