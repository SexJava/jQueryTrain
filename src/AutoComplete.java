import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author LiuYunDa
 * @date 2019/9/27 - 19:11
 * 接收用户端信息
 */
public class AutoComplete extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //表示页面穿过来的字符串,用于和服务器端的单词进行完整匹配
        String word = req.getParameter("word");
        //将字符串保存在request对象中
        req.setAttribute("word",word);
        //将请求转发个视图层(注意AJAX中,这个所谓的视图层不返回页面,只返回数据,所以也可以称作一个数据层)
        req.getRequestDispatcher("wordxml.jsp").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
