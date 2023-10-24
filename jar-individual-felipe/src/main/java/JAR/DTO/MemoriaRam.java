package JAR.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;

public class MemoriaRam {
    private Integer fkComponenteRAM;
    private Integer idRegistroMemoriaRam;
    private Double armazenamentoTotal;
    private Double armazenamentoDisponivel;
    private Double armazenamentoEmUso;
    private Long consumoAtual;
    private Looca looca = new Looca();
    private Memoria memoriaRam = looca.getMemoria();
    private Integer GB = 1024 * 1024 * 1024;

    public MemoriaRam(Double armazenamentoTotal, Double armazenamentoDisponivel, Long consumoAtual, Double armazenamentoEmUso) {
        this.fkComponenteRAM = null;
        this.idRegistroMemoriaRam = null;
        this.armazenamentoTotal = armazenamentoTotal;
        this.armazenamentoDisponivel = armazenamentoDisponivel;
        this.consumoAtual = consumoAtual;
        this.armazenamentoEmUso = armazenamentoEmUso;
    }
    public MemoriaRam(){}

    public Integer getFkComponenteRAM() {
        return fkComponenteRAM;
    }

    public void setFkComponenteRAM(Integer fkComponenteRAM) {
        this.fkComponenteRAM = fkComponenteRAM;
    }

    public Integer getIdRegistroMemoriaRam() {
        return idRegistroMemoriaRam;
    }

    public void setIdRegistroMemoriaRam(Integer idRegistroMemoriaRam) {
        this.idRegistroMemoriaRam = idRegistroMemoriaRam;
    }

    public Double getArmazenamentoTotal() {
        armazenamentoTotal = (double) (memoriaRam.getTotal() / GB);
        return armazenamentoTotal;
    }

    public void setArmazenamentoTotal(Double armazenamentoTotal) {
        this.armazenamentoTotal = armazenamentoTotal;
    }

    public Double getArmazenamentoDisponivel() {
        armazenamentoDisponivel = (double) (memoriaRam.getDisponivel() / GB);
        return armazenamentoDisponivel;
    }

    public void setArmazenamentoDisponivel(Double armazenamentoDisponivel) {
        this.armazenamentoDisponivel = armazenamentoDisponivel;
    }

    public Double getArmazenamentoEmUso() {
        armazenamentoEmUso = (double) (memoriaRam.getEmUso() / GB);
        return armazenamentoEmUso;
    }

    public void setArmazenamentoEmUso(Double armazenamentoEmUso) {
        this.armazenamentoEmUso = armazenamentoEmUso;
    }

    public Long getConsumoAtual() {
        consumoAtual = memoriaRam.getEmUso();
        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
    }

    @Override
    public String toString() {
        return "MemoriaRam{" +
                "armazenamentoTotal=" + armazenamentoTotal +
                ", armazenamentoDisponivel=" + armazenamentoDisponivel +
                ", ConsumoAtual=" + consumoAtual +
                '}';
    }
}
