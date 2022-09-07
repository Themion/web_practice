package themion7.spring_security.dao;

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

import themion7.spring_security.domain.Permission;

@Transactional
public class JdbcPermissionDao implements PermissionDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcPermissionDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    private RowMapper<Permission> mapper() {
        return new RowMapper<Permission>() {

            @Override
            public Permission mapRow(ResultSet rs, int rowNum) throws SQLException {
                return Permission.builder()
                    .userId(rs.getLong("user_id"))
                    .permission(rs.getString("permission"))
                    .build();
            }
            
        };
    } 

    @Override
    public Permission save(Permission permission) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("permission");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("user_id", permission.getUserId());
        parameters.put("permission", permission.getPermission());

        jdbcInsert.execute(new MapSqlParameterSource(parameters));

        return permission;
    }

    @Override
    public List<Permission> saveAll(List<Permission> permissions) {
        List<Permission> result = new ArrayList<>();
        permissions.forEach(permission -> result.add(this.save(permission)));
        return result;
    }

    @Override
    public List<Permission> findByUserId(Long userId) {
        return jdbcTemplate.query("select * from permission where user_id = ?", mapper(), userId);
    }
    
}
