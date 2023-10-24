package JAR.DAO;

import JAR.DTO.CPU;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class CPUDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    CPU cpu = new CPU();

    public Integer pegarIdCPU(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 1";
        Integer idComponenteCPU = null;

        try {
            idComponenteCPU = con.queryForObject(sql, Integer.class);
            cpu.setFkComponenteCPU(idComponenteCPU);
            System.out.println("ESTOU NO TRY DA CPU");
            insertDadosCpu();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na CPU!!");
        }

        return idComponenteCPU;
    }

    public void insertDadosCpu(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoAtual, fkComponente) VALUES (?, ?, ?)",
                  cpu.getIdRegistroCPU(), cpu.getConsumoAtual(), cpu.getFkComponenteCPU());
    }
}
