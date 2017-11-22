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
          $("tbody").html(template("tmp",info))
        }
      })
  }
  render();
})