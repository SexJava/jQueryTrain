//期望进入页面后就可以开始从服务器端获取数据,然后显示股票价格
//保存服务器端返回的股票对象
var obj;
var sid;
$(document).ready(function () {
    //页面载入的时候隐藏弹出框
    var stockNode =  $("#stock").css("border","1px solid black")
        .width("150px").css("position","absolute").css("z-index","99").css("background","blue");
    stockNode.hide();
    //定义鼠标进入股票名称时的操作
    var as = $("a");
    as.mouseover(function (event) {
        //获取到当前股票的代码
        var aNode = $(this);
        var divNode = aNode.parent();
        sid = divNode.attr("id");
        //找到对应的股票对象
        updatediv();
        //需要控制弹出框的位置
        //1.找到当前连接的位置
        // var offset = aNode.offset();
        //2.设置弹出框的位置
        // stockNode.css("left",offset.left+"px").css("top",offset.top+aNode.height()+"px");
        //设置弹出框出现在鼠标的右下方
        var myEvent  = event || window.event;
        stockNode.css("left",myEvent.clientX+ 5 +"px").css("top",myEvent.clientY+ 5 +"px");

        stockNode.show();

    });
    //定义鼠标离开股票名称时的操作
    as.mouseout(function () {
        stockNode.hide();
    });
    //1.向服务器发起请求,获取数据
    getInfo();
    //3每隔一秒钟和服务器交互一次,用户不用刷新就可以看到最新的股票信息
    setInterval(getInfo,1000);
});
function getInfo() {
    $.get("getStockInfo",null,function (data) {
        //2.接收并解析数据
        obj = eval(data);
        //obj = data;
        //2.1获取两只股票的当前指数信息
        var szzs = obj["300001"];
        var pfyh = obj["300002"];
        /*遍历一个js对象
        * for(var stockid in obj){
        *   var Stock = obj[stockid];
        * }
        * */
        //2.2找到页面中对应的节点,然后填充最新的股票价格
        var span1 = $("#300001").children("span");
        span1.html(szzs.now);
        if (szzs.now>szzs.yes){
            //当前价格大于昨天收盘,则显示绿色
            span1.css("color","green");

        }else{
            span1.css("color","red");
        }
        var span2 = $("#300002").children("span");
        span2.html(pfyh.now);
        if (pfyh.now>pfyh.yes){
            //当前价格大于昨天收盘,则显示绿色
            span2.css("color","green");

        }else{
            span2.css("color","red");
        }
        updatediv();




    })
}
//同步弹出框的内容
function updatediv() {
    var stockobj = obj[sid];
    for (var proname in stockobj){
        if (proname != "name"){
            //找到对应的弹出框中的div节点,然后找到span节点将内容填充
            $("#" + proname).children("span").html(stockobj[proname]);
        }
    }
}