package JAR.DAO;

import JAR.DTO.Rede;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class RedeDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Rede rede = new Rede();

    public Integer pegarIdRede(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 4";
        Integer idComponenteRede = null;

        try {
            idComponenteRede = con.queryForObject(sql, Integer.class);
            rede.setFkComponenteRede(idComponenteRede);
            insertDadosRede();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na REDE!!");
        }

        return idComponenteRede;
    }

    public void insertDadosRede(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoUpload, consumoDownload, fkComponente) VALUES (?, ?, ?, ?)",
                        rede.getIdRegistroRede(), rede.getConsumoUpload(), rede.getConsumoDownload(), rede.getFkComponenteRede());
    }
}
