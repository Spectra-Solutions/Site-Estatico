package SpectraSprint02.DAO;

import SpectraSprint02.DTO.ProcessoClass;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processos.Processo;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ProcessoDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    ProcessoClass processoClass = new ProcessoClass();
    Looca looca = new Looca();
    List<Processo> processos = looca.getGrupoDeProcessos().getProcessos();

    public void getfkMaquina(){
        String sql = "SELECT idMaquina FROM Maquina";
        Integer idMaquina = null;

        try {
            idMaquina = con.queryForObject(sql, Integer.class);
            processoClass.setFkMaquinaProcesso(idMaquina);
            salvarDadosProcessos();
        } catch (EmptyResultDataAccessException e){
            System.out.println("Nenhum resultado no idMaquina no processo!");
        }
    }

    public void salvarDadosProcessos(){
        for (int i = 0; i < processos.size(); i++) {
            Processo processoDaVez = processos.get(i);

            processoClass.setPidProcesso(processoDaVez.getPid());
            processoClass.setNomeProcesso(processoDaVez.getNome());
            processoClass.setUsoCpu(processoDaVez.getUsoCpu());
            processoClass.setUsoMemoria(processoDaVez.getUsoMemoria());

            con.update("INSERT INTO Processo (idProcesso, PidProcesso, nomeProcesso, usoCpu, usoMemoria, fkMaquinaProcesso) VALUES (?, ?, ?, ?, ?, ?)",
                    processoClass.getIdProcesso(), processoClass.getPidProcesso(), processoClass.getNomeProcesso(), processoClass.getUsoCpu(), processoClass.getUsoMemoria(), processoClass.getFkMaquinaProcesso());
        }
    }
}
