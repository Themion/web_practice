package hello.core.scope;

import static org.assertj.core.api.Assertions.assertThat;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Scope;

import lombok.AllArgsConstructor;

public class SingletonWithPrototypeTest1 {
  @Test
  void prototypeFind() {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(
        PrototypeBean.class, ClientBean.class);
    PrototypeBean prototypeBean1 = ac.getBean(PrototypeBean.class);
    PrototypeBean prototypeBean2 = ac.getBean(PrototypeBean.class);

    assertThat(prototypeBean1).isNotEqualTo(prototypeBean2);

    prototypeBean1.increment();
    assertThat(prototypeBean1.getCount()).isEqualTo(1);
    prototypeBean2.increment();
    assertThat(prototypeBean2.getCount()).isEqualTo(1);

    ac.close();
  }

  @Test
  void singletonClientUsePrototype() {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(
        PrototypeBean.class, ClientBean1.class, ClientBean2.class);

    ClientBean clientBean1 = ac.getBean(ClientBean1.class);
    ClientBean clientBean2 = ac.getBean(ClientBean2.class);

    assertThat(clientBean1.getPrototypeBean()).isNotEqualTo(clientBean2.getPrototypeBean());

    assertThat(clientBean1.logic()).isEqualTo(1);
    assertThat(clientBean2.logic()).isEqualTo(1);

    ac.close();
  }

  @Scope("prototype")
  static class PrototypeBean {
    private int count = 0;

    public void increment() {
      count += 1;
    }

    public int getCount() {
      return count;
    }

    @PostConstruct
    public void init() {
      System.out.println("PrototypeBean.init " + this);
    }

    @PreDestroy
    public void destroy() {
      System.out.println("PrototypeBean.destroy " + this);
    }
  }

  @AllArgsConstructor
  static class ClientBean {
    private final PrototypeBean prototypeBean;

    public PrototypeBean getPrototypeBean() {
      return prototypeBean;
    }

    public int logic() {
      this.prototypeBean.increment();
      return this.prototypeBean.getCount();
    }
  }

  @Scope("singleton")
  static class ClientBean1 extends ClientBean {
    @Autowired
    public ClientBean1(PrototypeBean prototypeBean) {
      super(prototypeBean);
    };
  }

  @Scope("singleton")
  static class ClientBean2 extends ClientBean {
    @Autowired
    public ClientBean2(PrototypeBean prototypeBean) {
      super(prototypeBean);
    };
  }
}
