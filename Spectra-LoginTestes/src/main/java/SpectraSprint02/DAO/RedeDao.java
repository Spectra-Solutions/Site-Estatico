package SpectraSprint02.DAO;

import SpectraSprint02.DTO.Rede;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

public class RedeDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Rede rede = new Rede();

    public void getFkComponenteRede(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 4";
        Integer idComponenteRede = null;

        try{
            idComponenteRede = con.queryForObject(sql, Integer.class);
            rede.setFkComponenteRede(idComponenteRede);
            getfkMaquina();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado na Rede!");
        }
    }

    public void getfkMaquina(){
        String sql = "SELECT idMaquina FROM Maquina";
        Integer idMaquina = null;

        try {
            idMaquina = con.queryForObject(sql, Integer.class);
            rede.setFkMaquina(idMaquina);
            salvarDadosRede();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado no idMaquina na rede!");
        }
    }

    public void salvarDadosRede(){
        con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoUpload, consumoDownload, fkComponente, fkMaquina) VALUES (?, ?, ?, ?, ?)",
                rede.getIdRegistroRede(), rede.getConsumoUpload(), rede.getConsumoDownload(), rede.getFkComponenteRede(), rede.getFkMaquina());
    }
}