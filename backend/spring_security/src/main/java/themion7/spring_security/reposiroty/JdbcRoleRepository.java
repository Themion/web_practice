package themion7.spring_security.reposiroty;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.transaction.annotation.Transactional;

import themion7.spring_security.domain.Role;

@Transactional
public class JdbcRoleRepository implements RoleRepository{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcRoleRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    private RowMapper<Role> mapper() {
        return new RowMapper<Role>() {

            @Override
            public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
                return Role.builder()
                    .userId(rs.getLong("user_id"))
                    .role(rs.getString("role"))
                    .build();
            }
            
        };
    } 

    @Override
    public Role save(Role role) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("role");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("user_id", role.getUserId());
        parameters.put("role", role.getRole());

        jdbcInsert.execute(new MapSqlParameterSource(parameters));

        return role;
    }

    @Override
    public List<Role> saveAll(List<Role> roles) {
        List<Role> result = new ArrayList<>();
        roles.forEach(role -> result.add(this.save(role)));
        return result;
    }

    @Override
    public List<Role> findByUserId(Long userId) {
        return jdbcTemplate.query("select * from role where user_id = ?", mapper(), userId);
    }
    
}
