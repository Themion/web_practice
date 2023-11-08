package hello.login.web.session;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import hello.login.domain.member.Member;

public class SessionManagetTest {
    private SessionManager sessionManager = new SessionManager();

    @Test
    void sessionTest() {
        MockHttpServletRequest req = new MockHttpServletRequest();
        MockHttpServletResponse res = new MockHttpServletResponse();

        Member member = Member.builder()
                .loginId("test")
                .password("test")
                .name("name")
                .build();

        sessionManager.createSeesion(member, res);
        req.setCookies(res.getCookies());

        Object result = sessionManager.getSession(req);
        Assertions.assertThat(result).isEqualTo(member);

        sessionManager.expire(req);
        result = sessionManager.getSession(req);
        Assertions.assertThat(result).isNull();
    }
}
