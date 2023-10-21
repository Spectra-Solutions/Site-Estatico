package SpectraSprint02.DAO;

import SpectraSprint02.DTO.Maquina;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class MaquinaDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Maquina maquina = new Maquina();

    public void getFkEmpresa(String nome, String secao, String email, String senha){
        String sql = "SELECT fkEmpresa FROM Funcionario WHERE emailFunc = ? and senhaFunc = ?";

        Integer idEmpresa = null;

        try{
            idEmpresa = con.queryForObject(sql, Integer.class, email, senha);
            maquina.setFkEmpresa(idEmpresa);
            salvarMaquina(nome, secao, idEmpresa);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na fkEmpresa!!");
        }
    }

    public Boolean existHostName(String hostName){
        return con.queryForObject("SELECT EXISTS (select 1 FROM Maquina WHERE hostName = ?) as existe",
                new Object[] {hostName}, Boolean.class);
    }

    public void salvarMaquina(String nome, String secao, Integer idEmpresa){
        con.update("INSERT INTO Maquina (idMaquina, hostName, nome, sistemaOperacional, secao, qtdDisco, fkEmpresaMaquina) VALUES (?, ?, ?, ?, ?, ?, ?)",
                maquina.getIdMaquina(), maquina.getHostName(), nome, maquina.getSistemaOperacional(), secao, maquina.getQtdDisco(), maquina.getFkEmpresa());
    }
}
