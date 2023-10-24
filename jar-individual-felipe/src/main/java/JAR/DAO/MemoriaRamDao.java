package JAR.DAO;

import JAR.DTO.MemoriaRam;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class MemoriaRamDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    MemoriaRam memoriaRam = new MemoriaRam();

    public Integer pegarIdRam(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 2";
        Integer idComponenteRam = null;

        try {
            idComponenteRam = con.queryForObject(sql, Integer.class);
            memoriaRam.setFkComponenteRAM(idComponenteRam);
            insertDadosMemoriaRam();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na RAM!!");
        }

        return idComponenteRam;
    }

    public void insertDadosMemoriaRam(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente,consumoAtual, armazenamentoDisponivel, armazenamentoTotal, fkComponente) VALUES (?, ?, ?, ?, ?)",
                    memoriaRam.getIdRegistroMemoriaRam(), memoriaRam.getConsumoAtual(), memoriaRam.getArmazenamentoDisponivel(), memoriaRam.getArmazenamentoTotal(), memoriaRam.getFkComponenteRAM());
    }
}
