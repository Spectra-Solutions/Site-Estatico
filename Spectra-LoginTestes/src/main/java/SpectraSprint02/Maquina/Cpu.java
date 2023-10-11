package SpectraSprint02.Maquina;

import com.github.britooo.looca.api.core.Looca;

public class Cpu {
    private String especificacaoCPU;
    private Double consumoAtualCPU;
    private long tempoAtividade;


    public String getEspecificacaoCPU() {
        return especificacaoCPU;
    }

    public void setEspecificacaoCPU(String especificacaoCPU) {
        this.especificacaoCPU = especificacaoCPU;
    }

    public Double getConsumoAtualCPU() {
        return consumoAtualCPU;
    }

    public void setConsumoAtualCPU(Double consumoAtualCPU) {
        this.consumoAtualCPU = consumoAtualCPU;
    }

    public long getTempoAtividade() {
        return tempoAtividade;
    }

    public void setTempoAtividade(long tempoAtividade) {
        this.tempoAtividade = tempoAtividade;
    }

//    public Cpu getCpu(){
//        Processador processador = looca.getProcessador();
//        Cpu cpu = new Cpu();
//        cpu.setConsumoAtualCPU(processador.getUso());
//        cpu.setEspecificacaoCPU(processador.getNome());
//        return cpu;
//    }
}
