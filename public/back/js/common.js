/*1.进度显示功能*/
/*不显示转圈效果*/
NProgress.configure({
  showSpinner: false
});
// 当ajax开始请求的时候
$(document).ajaxStart(function () {
  NProgress.start();
});
// 当ajax结束请求的时候

$(document).ajaxStop(function () {
    NProgress.done();
});

//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf("login.html")==-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function (data) {
        if(data.error==400){
          location.href="login.html"
        }
    }
  })
}

// 2.二级菜单
$('.sort').on("click",function () {
  $(".child").slideToggle();
})
// 3.侧边栏显示和隐藏
$("[data-menu]").click(function () {
   $('aside').toggleClass('now');
   $('.main').toggleClass("now")
});
// 模态框
$("[data-logout]").click(function () {
  $('#logoutModal').modal("show");
})
// 退出
$(".logout").click(function () {
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function (data) {
      if(data.success){
        //退出成功
        location.href = "login.html";
      }
    }
  });
})