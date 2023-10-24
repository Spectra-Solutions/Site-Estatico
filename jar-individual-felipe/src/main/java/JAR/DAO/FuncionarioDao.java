package JAR.DAO;

import org.springframework.jdbc.core.JdbcTemplate;

public class FuncionarioDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public Boolean existEmail(String email, String senha){
        return con.queryForObject("SELECT EXISTS(select 2 FROM Funcionario WHERE emailFunc = ? and senhaFunc = ?) as existe",
        new Object[] {email, senha}, Boolean.class);
    }
}
