//需要点击主菜单时,子菜单显示出来,再点击隐藏
//需要编写在页面装载时,给所有主菜单添加onclick事件
//注册页面装载时执行的方法
$(document).ready(function () {
   //首先找到所有的主菜单
    var as = $("ul>a");
   //然后添加点击事件
    as.click(function () {
       //找到li,并显示
        var aNode = $(this);
        var lis = aNode.nextAll("li");
        lis.toggle("show");
    });
    $("li>a").click(function () {
       $("#content").load($(this).attr("id"));
    });
});