import com.sun.net.httpserver.HttpServer;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 * @author LiuYunDa
 * @date 2019/9/20 - 19:23
 * 返回股票当前信息的sevlet
 */
public class getStockInfo extends HttpServlet {

    //保存股票对象的Map
    private HashMap<String, Stock> stocks;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //返回两只股票的价格信息
        //1.计算两个随机数
        double sz = Math.random() * 20;
        double pf = Math.random() * 0.5;
        //通过随机数是奇数还是偶数控制涨跌
        boolean flagsz = ((int) (Math.random() * 10)) % 2 == 0;
        boolean flagpf = ((int) (Math.random() * 10)) % 2 == 0;
        //2.将随机数和股票的当前价格进行算术操作,得到新的当前价格
        Stock szzs = stocks.get("300001");
        Stock pfyh = stocks.get("300002");
        double temp;
        if (flagsz) {
            temp = szzs.getNow() + sz;
        } else {
            temp = szzs.getNow() - sz;
        }
        //需要对新的当前价格进行截取,保留小数点后两位
        temp = (int) (temp * 100) / 100.0;
        szzs.setNow(temp);
        double temp1;
        if (flagpf) {
            temp1 = pfyh.getNow() + pf;
        } else {
            temp1 = pfyh.getNow() - pf;
        }
        temp1 = (int) (temp1 * 100) / 100.0;
        pfyh.setNow(temp1);

        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        //out.println(szzs + "<br />"+pfyh);
        //3.返回两只股票的昨天收盘,今天开盘和当前价格
        //采用Json数组的数据格式返回股票的信息
        StringBuilder builder = new StringBuilder();
//        builder.append("[{name:\"").append(szzs.getName()).append("\",id:\"").append(szzs.getId())
//                .append("\",yes:").append(szzs.getYesterday()).append(",tod:").append(szzs.getToday())
//                .append(",now:").append(szzs.getNow())
//                .append("},<br/>")
//                .append("{name:\"").append(pfyh.getName()).append("\",id:\"").append(pfyh.getId())
//                .append("\",yes:").append(pfyh.getYesterday()).append(",tod:").append(pfyh.getToday())
//                .append(",now:").append(pfyh.getNow())
//                .append("}]");
        //采用Json对象的数据格式返回股票的信息
        //如果回传表示对象的json,需要在最外层加上括号,否则页面会解析错误
        builder.append("({")
                .append("\"").append(szzs.getId()).append("\":{name:\"").append(szzs.getName())
                .append("\",yes:").append(szzs.getYesterday()).append(",tod:").append(szzs.getToday())
                .append(",now:").append(szzs.getNow())
                .append("},")
                .append("\"").append(pfyh.getId()).append("\":{name:\"").append(pfyh.getName())
                .append("\",yes:").append(pfyh.getYesterday()).append(",tod:").append(pfyh.getToday())
                .append(",now:").append(pfyh.getNow())
                .append("}})");
        out.print(builder);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    public void init(ServletConfig config) {
        stocks = new HashMap<>();
        //创建股票
        Stock szzs = new Stock(3000.0, 2990.1, "上证指数", "300001");
        Stock pfyh = new Stock(222.22, 2944.1, "浦发银行", "300002");
        //将两只股票放到Map里去
        stocks.put(szzs.getId(), szzs);
        stocks.put(pfyh.getId(), pfyh);
//        System.out.println(stocks);
    }
}
