package JAR.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;

public class CPU {
    private Integer fkComponenteCPU;
    private Integer idRegistroCPU;
    private String especificacao;
    private Long consumoAtual;
    private Long tempoAtividade;
    private Looca looca = new Looca();
    private Processador processador = looca.getProcessador();

    public CPU(String especificacao, Long consumoAtual, Long tempoAtividade) {
        this.fkComponenteCPU = null;
        this.idRegistroCPU = null;
        this.especificacao = especificacao;
        this.consumoAtual = consumoAtual;
        this.tempoAtividade = tempoAtividade;
    }

    public CPU(){}

    public Integer getFkComponenteCPU() {
        return fkComponenteCPU;
    }

    public void setFkComponenteCPU(Integer fkComponenteCPU) {
        this.fkComponenteCPU = fkComponenteCPU;
    }

    public Integer getIdRegistroCPU() {
        return idRegistroCPU;
    }

    public void setIdRegistroCPU(Integer idRegistroCPU) {
        this.idRegistroCPU = idRegistroCPU;
    }

    public String getEspecificacao() {
        especificacao = processador.getNome();
        System.out.println("Seu computador é: " + especificacao);
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

    @Override
    public String toString() {
        return "CPU{" +
                "fkComponenteCPU=" + fkComponenteCPU +
                ", idRegistroCPU=" + idRegistroCPU +
                ", especificacao='" + especificacao + '\'' +
                ", consumoAtual=" + consumoAtual +
                ", tempoAtividade=" + tempoAtividade +
                ", looca=" + looca +
                '}';
    }
}
