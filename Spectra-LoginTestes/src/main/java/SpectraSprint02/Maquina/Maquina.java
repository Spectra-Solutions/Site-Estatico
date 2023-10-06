package SpectraSprint02.Maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;
import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Maquina {
    private Integer numeroIP;
    private String sistemaOperacional;
    private Integer qtdDiscos;
    private List<Cpu> cpuS;
    private List<MemoriaRam> memoriasRam;
    private List<Disco> discos;

    private Looca looca;

    public Maquina(Integer numeroIP, String sistemaOperacional, Integer qtdDisco) {
        this.numeroIP = numeroIP;
        this.sistemaOperacional = sistemaOperacional;
        this.qtdDiscos = qtdDiscos;
        this.cpuS = new ArrayList<>();
        this.memoriasRam = new ArrayList<>();
        this.discos = new ArrayList<>();
        this.looca = new Looca();
    }

    public void adicionarCpu(){
        Processador processador = looca.getProcessador();
        Cpu cpu = new Cpu();
        cpu.setConsumoAtualCPU(processador.getUso());
        cpu.setConsumoPorCoreCPU(processador.);
    }
}