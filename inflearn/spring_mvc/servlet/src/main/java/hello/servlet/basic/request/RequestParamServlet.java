package hello.servlet.basic.request;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "requestParamServlet", urlPatterns = "/request-param")
public class RequestParamServlet extends HttpServlet {

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    System.out.println("[전체 파라미터 조회] - start");

    req.getParameterNames().asIterator()
        .forEachRemaining(paramName -> System.out.println(paramName + "=" + req.getParameter(paramName)));

    System.out.println("[전체 파라미터 조회] - end\n");

    System.out.println("[단위 파라미터 조회] - start");

    String username = req.getParameter("username");
    String age = req.getParameter("age");

    System.out.println("username=" + username);
    System.out.println("age=" + age);
    System.out.println("[단위 파라미터 조회] - end\n");

    System.out.println("[이름이 같은 복수 파라미터 조회]");
    String[] foo = req.getParameterValues("foo");
    for (String f : foo)
      System.out.println("foo: " + f);

    res.getWriter().write("ok");
  }

}
