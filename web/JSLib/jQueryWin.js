//显示浮动窗口的方法
function showwin() {
    //获取元素节点
    var wind = $("#win");
    //1.修改节点的css样式
    //wind.css("display", "block");
    //2.jQuery内置方法show
    // wind.show("slow");
    //3.jQuery内置方法fadeIn
    wind.fadeIn("slow");
}
//关闭窗口的方法
function hide() {
    //找到对应节点
    var win = $("#close");

    //1.隐藏窗口
    $("#win").css("display","none");
}