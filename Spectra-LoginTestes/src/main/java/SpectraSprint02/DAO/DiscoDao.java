package SpectraSprint02.DAO;

import SpectraSprint02.DTO.Disco;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class DiscoDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Disco disco01 = new Disco();
    Disco disco02 = new Disco();
    public Integer pegarIdDisco(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 3";
        Integer idComponenteDisco = null;

        try{
            idComponenteDisco = con.queryForObject(sql, Integer.class);
            disco01.setFkComponenteDisco(idComponenteDisco);
            disco02.setFkComponenteDisco(idComponenteDisco);
            insertDadosCpu();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado no Disco!!");
        }

        return idComponenteDisco;
    }

    public void insertDadosCpu(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoAtual, armazenamentoDisponivel, armazenamentoTotal, armazenamentoEmUso, fkComponente) VALUES (?, ?, ?, ?, ?, ?)",
                disco01.getIdRegistroDisco(), disco01.getConsumoAtual(), disco01.getArmazenamentoDisponivel(), disco01.getArmazenamentoTotal(), disco01.getArmazenamentoEmUso(), disco01.getFkComponenteDisco());

        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoAtual, armazenamentoDisponivel, armazenamentoTotal, armazenamentoEmUso, fkComponente) VALUES (?, ?, ?, ?, ?, ?)",
                disco02.getIdRegistroDisco(), disco02.getConsumoAtual(), disco02.getArmazenamentoDisponivel(), disco02.getArmazenamentoTotal(), disco02.getArmazenamentoEmUso(), disco02.getFkComponenteDisco());
    }

}
