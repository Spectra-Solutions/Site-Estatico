package SpectraSprint02.DAO;

import SpectraSprint02.DTO.CPU;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class CPUDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    CPU cpu = new CPU();

    public void getFkComponenteCPU(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 1";

        Integer idComponenteCpu = null;

        try{
            idComponenteCpu = con.queryForObject(sql, Integer.class);
            cpu.setFkComponenteCPU(idComponenteCpu);
            getfkMaquina();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na CPU!");
        }
    }

    public void getfkMaquina(){
        String sql = "SELECT idMaquina FROM Maquina";
        Integer idMaquina = null;

        try {
            idMaquina = con.queryForObject(sql, Integer.class);
            cpu.setFkMaquina(idMaquina);
            salvarDadosCPU();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado no idMaquina na CPU!");
        }
    }

    public void salvarDadosCPU(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, especificacao, consumoAtual, fkComponente, fkMaquina) VALUES (?, ?, ?, ?, ?)",
                cpu.getIdRegistroCPU(), cpu.getEspecificacao(), cpu.getConsumoAtual(), cpu.getFkComponenteCPU(), cpu.getFkMaquina());
    }
}
