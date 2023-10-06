package SpectraSprint02.Maquina;

public class DiscoClasse {
    private String tipoDisco;
    private Long armazenamentoTotal;
    private Long consumoAtual;
    private Long armazenamentoDisponivelDisco;

    public String getTipoDisco() {
        return tipoDisco;
    }

    public void setTipoDisco(String tipoDisco) {
        this.tipoDisco = tipoDisco;
    }

    public Long getArmazenamentoTotal() {
        return armazenamentoTotal;
    }

    public void setArmazenamentoTotal(Long armazenamentoTotal) {
        this.armazenamentoTotal = armazenamentoTotal;
    }

    public Long getConsumoAtual() {
        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
    }

    public Long getArmazenamentoDisponivelDisco() {
        return armazenamentoDisponivelDisco;
    }

    public void setArmazenamentoDisponivelDisco(Long armazenamentoDisponivelDisco) {
        this.armazenamentoDisponivelDisco = armazenamentoDisponivelDisco;
    }
}
