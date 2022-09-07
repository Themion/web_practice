package hello.spring_practice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// import hello.spring_practice.aop.TimeTraceAop;
import hello.spring_practice.repository.MemberRepository;
import hello.spring_practice.service.MemberService;

@Configuration
public class SpringSetting {

    private final MemberRepository memberRepository;

    @Autowired
    public SpringSetting(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }
    
    /* @Bean
    public TimeTraceAop timeTraceAop() {
        return new TimeTraceAop();
    } */

}
/* 
import javax.persistence.EntityManager;

import hello.spring_practice.repository.JpaMemberRepository;

@Configuration
public class SpringSetting {

    private final EntityManager em;

    @Autowired
    public SpringSetting(EntityManager em) {
        this.em = em;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new JpaMemberRepository(em);
    }
}
 */
/* 
import javax.sql.DataSource;

import hello.spring_practice.repository.JdbcTemplatememberRepository;

@Configuration
class JdbcSpringSetting {

    private final DataSource dataSource;

    @Autowired
    public JdbcSpringSetting(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new JdbcTemplatememberRepository(dataSource);
    }
}
 */
/* 
import hello.spring_practice.repository.MemoryMemberRepository;
@Configuration
class MemorySpringSetting {

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}
 */