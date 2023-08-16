package hello.servlet.basic.response;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "responseHeaderServlet", urlPatterns = "/response-header")
public class ResponseHeaderServlet extends HttpServlet {

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // [status-line]
    resp.setStatus(HttpServletResponse.SC_OK);

    // [reponse-header]
    resp.setHeader("Content-Type", "text/plain");
    resp.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    resp.setHeader("Pragma", "no-cache");
    resp.setHeader("my-header", "hello");

    // [Header 편의 메서드]
    this.content(resp);
    this.redirect(resp);
    this.cookie(resp);

    resp.getWriter().write("ok");

  }

  private void content(HttpServletResponse response) {
    // response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.setContentType("text/plain");
    response.setCharacterEncoding("utf-8");
    // response.setContentLength(2);
  }

  private void cookie(HttpServletResponse response) {
    Cookie cookie = new Cookie("myCookie", "myValue");
    cookie.setMaxAge(600);
    response.addCookie(cookie);
  }

  private void redirect(HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_FOUND);
    response.setHeader("Location", "/basic/hello-form.html");
    // response.sendRedirect("/basic/hello-form.html");
  }
}
