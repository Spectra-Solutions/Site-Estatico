package SpectraSprint02.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;

public class CPU {
    private Integer idRegistroCPU;
    private String especificacao;
    private Long consumoAtual;
    private Long tempoAtividade;
    private Integer fkComponenteCPU;
    private Integer fkMaquina;
    private Looca looca = new Looca();
    private Processador processador = looca.getProcessador();

    public CPU( String especificacao, Long consumoAtual, Long tempoAtividade) {
        this.idRegistroCPU = null;
        this.especificacao = especificacao;
        this.consumoAtual = consumoAtual;
        this.tempoAtividade = tempoAtividade;
        this.fkComponenteCPU = null;
        this.fkMaquina = null;
    }

    public CPU(){}

    public Integer getIdRegistroCPU() {
        return idRegistroCPU;
    }

    public void setIdRegistroCPU(Integer idRegistroCPU) {
        this.idRegistroCPU = idRegistroCPU;
    }

    public String getEspecificacao() {
        especificacao = processador.getNome();
        return especificacao;
    }

    public void setEspecificacao(String especificacao) {
        this.especificacao = especificacao;
    }

    public Long getConsumoAtual() {
        consumoAtual = processador.getUso().longValue();
        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
    }

    public Long getTempoAtividade() {
        return tempoAtividade;
    }

    public void setTempoAtividade(Long tempoAtividade) {
        this.tempoAtividade = tempoAtividade;
    }

    public Integer getFkComponenteCPU() {
        return fkComponenteCPU;
    }

    public void setFkComponenteCPU(Integer fkComponenteCPU) {
        this.fkComponenteCPU = fkComponenteCPU;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}