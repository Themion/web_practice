package hello.itemservice.message;

import static org.assertj.core.api.Assertions.*;

import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;

@SpringBootTest
public class MessageSourceTest {
    @Autowired
    MessageSource messageSource;

    @Test
    void helloMessage() {
        String message = messageSource.getMessage("hello", null, null);
        assertThat(message).isEqualTo("hello");
    }

    @Test
    void notFountMessageCode() {
        assertThatThrownBy(() -> messageSource.getMessage("no_code", null, null))
                .isInstanceOf(NoSuchMessageException.class);
    }

    @Test
    void defaultMessage() {
        String message = messageSource.getMessage("no_code", null, "기본 메세지", null);
        assertThat(message).isEqualTo("기본 메세지");
    }

    @Test
    void argumentMessage() {
        String message = messageSource.getMessage("hello.name", new Object[] { "Spring" }, null);
        assertThat(message).isEqualTo("hello Spring");
    }

    @Test
    void localeMessage() {
        String krMessage = messageSource.getMessage("hello", null, Locale.KOREA);
        String enMessage = messageSource.getMessage("hello", null, Locale.ENGLISH);
        assertThat(krMessage).isEqualTo("안녕");
        assertThat(enMessage).isEqualTo("hello");
    }
}
