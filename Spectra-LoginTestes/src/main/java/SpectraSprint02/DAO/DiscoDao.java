package SpectraSprint02.DAO;

import SpectraSprint02.DTO.DiscoClass;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.Volume;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class DiscoDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    DiscoClass disco = new DiscoClass();
    Looca looca = new Looca();
    List<Volume> volumes = looca.getGrupoDeDiscos().getVolumes();
    private Integer GB = 1024 * 1024 * 1024;

    public void getFkComponenteDisco(){
        String sql = "SELECT idComponente FROM Componente WHERE idComponente = 3";

        Integer idComponenteDisco = null;

        try{
            idComponenteDisco = con.queryForObject(sql, Integer.class);
            disco.setFkComponenteDisco(idComponenteDisco);
            getfkMaquina();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado encontrado no Disco!");
        }
    }

    public void getfkMaquina(){
        String sql = "SELECT idMaquina FROM Maquina";
        Integer idMaquina = null;

        try {
            idMaquina = con.queryForObject(sql, Integer.class);
            disco.setFkMaquina(idMaquina);
            salvarDadosDisco();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado no idMaquina na ram!");
        }
    }

    public void salvarDadosDisco(){
        for (int i = 0; i < volumes.size(); i++){
            Volume volumeDaVez = volumes.get(i);

            disco.setConsumoAtual(volumeDaVez.getTotal() - volumeDaVez.getDisponivel());
            disco.setArmazenamentoTotal((double) (volumeDaVez.getTotal() / GB));
            disco.setArmazenamentoDisponivel((double) (volumeDaVez.getDisponivel() / GB));

            con.update("INSERT INTO RegistroComponente (idRegistroComponente, consumoAtual, armazenamentoTotal, armazenamentoDisponivel, fkComponente, fkMaquina) VALUES (?, ?, ?, ?, ?, ?)",
                    disco.getIdRegistroDisco(), disco.getConsumoAtual(), disco.getArmazenamentoTotal(), disco.getArmazenamentoDisponivel(), disco.getFkComponenteDisco(), disco.getFkMaquina());
        }
    }
}
