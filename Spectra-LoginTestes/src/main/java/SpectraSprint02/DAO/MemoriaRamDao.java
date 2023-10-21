package SpectraSprint02.DAO;

import SpectraSprint02.DTO.MemoriaRam;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class MemoriaRamDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    MemoriaRam memoriaRam = new MemoriaRam();

    public void getFkComponenteRAM(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 2";

        Integer idComponenteRAM = null;

        try{
            idComponenteRAM = con.queryForObject(sql, Integer.class);
            memoriaRam.setFkComponenteRAM(idComponenteRAM);
            getfkMaquina();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na RAM!");
        }
    }

    public void getfkMaquina(){
        String sql = "SELECT idMaquina FROM Maquina";
        Integer idMaquina = null;

        try {
            idMaquina = con.queryForObject(sql, Integer.class);
            memoriaRam.setFkMaquina(idMaquina);
            salvarDadosRam();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado no idMaquina na ram!");
        }
    }

    public void salvarDadosRam(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoAtual, armazenamentoTotal, armazenamentoDisponivel, fkComponente, fkMaquina) VALUES (?, ?, ?, ?, ?, ?)",
                memoriaRam.getIdRegistroMemoriaRAM(), memoriaRam.getConsumoAtual(), memoriaRam.getArmazenamentoTotal(), memoriaRam.getArmazenamentoDisponivel(), memoriaRam.getFkComponenteRAM(), memoriaRam.getFkMaquina());
    }
}
