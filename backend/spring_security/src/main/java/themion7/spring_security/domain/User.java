package themion7.spring_security.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Singular;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class User {

    private Long id;

    @NonNull
    private String username;

    @NonNull
    private String password;

    private int active;
    
    @Singular
    private List<String> roles;
    
    @Singular
    private List<String> permissions;

    public static class UserBuilder {
        public UserBuilder() {
            super();
            this.active = 1;
        }
    }

}
