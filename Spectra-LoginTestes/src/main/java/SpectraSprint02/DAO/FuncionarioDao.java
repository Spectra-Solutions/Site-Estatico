package SpectraSprint02.DAO;

import SpectraSprint02.DTO.Funcionario;
import SpectraSprint02.DTO.Maquina;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class FuncionarioDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Maquina maquina = new Maquina();

    public Integer pegarIdEmpresa(String email, String senha){
        String sql = "SELECT fkEmpresa FROM Funcionario WHERE emailFunc = ? and senhaFunc = ? ";
        Integer idEmpresa = null;

        try {
            idEmpresa = con.queryForObject(sql, Integer.class, email, senha);
            System.out.println("estou no try do pegar id");
            maquina.setFkEmpresaMaquina(idEmpresa);
            System.out.println("Estou no pegar idEmpresa " + maquina.getFkEmpresaMaquina());
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado");
        }

        return idEmpresa;
    }

    public Boolean existEmail(String email, String senha){
        return con.queryForObject("SELECT EXISTS(select 2 FROM Funcionario WHERE emailFunc = ? and senhaFunc = ?) as existe",
        new Object[] {email, senha}, Boolean.class);
    }
}
