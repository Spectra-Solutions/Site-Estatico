package JAR.DAO;

import JAR.DTO.JanelasAbertas;
import com.github.britooo.looca.api.group.janelas.Janela;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class JanelasAbertasDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public List <String> getJanelasProibidas(Integer idMaquina) {
        String sql = "SELECT janelaProibida FROM proibicoesJanela WHERE fkMaquinaProibida = ?";
        List<String> janelasProibidas = null;
        try {
            janelasProibidas = con.queryForObject(sql, List.class, idMaquina);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado");
        }
        return janelasProibidas;
    }
    public void registrarInfracao(Integer idMaquina, String janelaInfratora){
        con.update("""
                INSERT INTO infracaoJanela(fkMaquinaInfratora, janelaProibidaAberta) 
                VALUES (?, ?)""", idMaquina, janelaInfratora);
    }
}
