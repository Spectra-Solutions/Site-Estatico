package SpectraSprint02.Maquina;

import java.util.Map;

public class Cpu {
    private String especificacaoCPU;
    private Double consumoAtualCPU;
    private Double consumoPorCoreCPU;
    private Map<String, Double> consumoPorProcessoCPU;
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

    public Double getConsumoPorCoreCPU() {
        return consumoPorCoreCPU;
    }

    public void setConsumoPorCoreCPU(Double consumoPorCoreCPU) {
        this.consumoPorCoreCPU = consumoPorCoreCPU;
    }

    public Map<String, Double> getConsumoPorProcessoCPU() {
        return consumoPorProcessoCPU;
    }

    public void setConsumoPorProcessoCPU(Map<String, Double> consumoPorProcessoCPU) {
        this.consumoPorProcessoCPU = consumoPorProcessoCPU;
    }

    public long getTempoAtividade() {
        return tempoAtividade;
    }

    public void setTempoAtividade(long tempoAtividade) {
        this.tempoAtividade = tempoAtividade;
    }
}
