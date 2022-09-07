package hello.spring_practice.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimeTraceAop {
    
    @Around("execution(* hello.spring_practice..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("\tSTART: " + joinPoint.toString());

        try {
            return joinPoint.proceed();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            long end = System.currentTimeMillis();
            System.out.println("\tEND: " + joinPoint.toString());
            System.out.println("\tTIME: " + (end - start) + "(ms)");
        }
        
        return null;
    }

}
