package SpectraSprint02.Maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import com.github.britooo.looca.api.group.rede.RedeParametros;
import com.github.britooo.looca.api.group.sistema.Sistema;
import oshi.SystemInfo;
import oshi.hardware.NetworkIF;

import java.util.ArrayList;
import java.util.List;

public class Maquina {
    private Integer numeroIP;
    private String sistemaOperacional;
    private Integer qtdDiscos;
    private Looca looca;

    public Maquina(Integer numeroIP, String sistemaOperacional, Integer qtdDisco) {
        this.numeroIP = numeroIP;
        this.sistemaOperacional = sistemaOperacional;
        this.qtdDiscos = qtdDiscos;
        this.looca = new Looca();
    }

    public Cpu getCpu(){
        Processador processador = looca.getProcessador();
        Cpu cpu = new Cpu();
        cpu.setConsumoAtualCPU(processador.getUso());
        cpu.setEspecificacaoCPU(processador.getNome());
        System.out.println();
        return cpu;
    }

    public List<RedeInterface> getRedes(){
        //Criação do gerenciador
        RedeInterfaceGroup redeInterfaceGroup;
        redeInterfaceGroup = looca.getRede().getGrupoDeInterfaces();
        //Obtendo lista de discos a partir do getter
        List<RedeInterface> redeInterfaces = redeInterfaceGroup.getInterfaces();
        return redeInterfaces;
    }
    public String getHostName(){
        Rede rede = looca.getRede();
        RedeParametros redeParametros = looca.getRede().getParametros();
        return redeParametros.getHostName();
    }
    public  List<Volume> getVolume(){

        //Criação do gerenciador
        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();

        //Obtendo lista de discos a partir do getter
        List <Volume> volumes = grupoDeDiscos.getVolumes();

        return volumes;
    }

    public List <Processo> getProcessos(){
        ProcessoGrupo processoGrupo = looca.getGrupoDeProcessos();
        List <Processo> processos = processoGrupo.getProcessos();
        return processos;
    }

    public Sistema getSistema(){
        Sistema sistema = looca.getSistema();
        return sistema;
    }

}