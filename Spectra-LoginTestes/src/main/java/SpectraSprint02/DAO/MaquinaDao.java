package SpectraSprint02.DAO;

import SpectraSprint02.DTO.Maquina;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class MaquinaDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Maquina maquina = new Maquina();

    public void Salvar(String nome, String secao){
        con.update("INSERT INTO Maquina (idMaquina ,hostName, nome, sistemaOperacional, secao, qtdDisco, fkEmpresaMaquina) VALUES (?, ?, ?, ?, ?, ?, ?)",
                   maquina.getIdMaquina(),maquina.getHostName(), nome, maquina.getSistemaOperacional(), secao, maquina.getQtdDisco(), maquina.getFkEmpresaMaquina());
    }

    public Boolean existEmail(String hostName){
        return con.queryForObject("SELECT EXISTS(select 1 FROM Maquina WHERE hostName = ?) as existe",
                new Object[] {hostName}, Boolean.class);
    }

    public List<Maquina> buscarTodos(){
        return con.query("SELECT * FROM Maquina",
                        new BeanPropertyRowMapper<>(Maquina.class));
    }
}
