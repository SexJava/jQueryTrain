//在页面装载时,让所有的td都拥有一个点击事件
$(document).ready(function () {
    //找到所有td节点
    var tds = $("td");
    //给所有td添加点击事件
    tds.click(tdclick)

    
});
//被点击事件
function tdclick() {
    var td = $(this);
    //取出当前td的文本内容
    var text = td.text();
    //清空td里面的内容
    td.html("");//也可以是td.empty()
    //简历一个文本框,也就是input元素戒蒂娜
    var input = $("<input>");
    //设置文本框的值是保存起来的文本内容
    input.attr("value", text);
    //让input响应键盘按下的事件
    input.keyup(function (event) {
        //获取当前用户按下的键值
        //针对不同浏览器获取事件对象的差异
        var myEvent = event || window.event;
        var kcode = myEvent.keyCode;
        //判断是否是回车按下
        if (kcode == 13) {
            var inputnode = $(this);
            //保存当前文本框的内容
            var inputtext = inputnode.val();
            //清空td里的内容
            var tdNode = inputnode.parent();

            //将保存的文本框内容填充到td
            tdNode.html(inputtext);
            //让td重新获取点击事件
            tdNode.click(tdclick);
        }

    });
    //将文本框加入td中
    td.append(input);
    //让文本框里面的文字被高亮选中
    //需要将jQuery的对象转换成dom对象
    var inputdom = input.get(0);
    inputdom.select();
    //6.需要消除td上的点击事件
    td.unbind("click");
}