package SpectraSprint02.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;

public class MemoriaRam {
    private Integer idRegistroMemoriaRAM;
    private Long consumoAtual;
    private Double armazenamentoTotal;
    private Double armazenamentoDisponivel;
    private Integer fkComponenteRAM;
    private Integer fkMaquina;
    private Looca looca = new Looca();
    private Memoria memoriaRam = looca.getMemoria();
    private Integer GB = 1024 * 1024 * 1024;

    public MemoriaRam(Long consumoAtual, Double armazenamentoTotal, Double armazenamentoDisponivel) {
        this.idRegistroMemoriaRAM = null;
        this.consumoAtual = consumoAtual;
        this.armazenamentoTotal = armazenamentoTotal;
        this.armazenamentoDisponivel = armazenamentoDisponivel;
        this.fkComponenteRAM = null;
        this.fkMaquina = null;
    }

    public MemoriaRam(){}

    public Integer getIdRegistroMemoriaRAM() {
        return idRegistroMemoriaRAM;
    }

    public void setIdRegistroMemoriaRAM(Integer idRegistroMemoriaRAM) {
        this.idRegistroMemoriaRAM = idRegistroMemoriaRAM;
    }

    public Long getConsumoAtual() {
        consumoAtual = memoriaRam.getEmUso();
        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
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

    public Integer getFkComponenteRAM() {
        return fkComponenteRAM;
    }

    public void setFkComponenteRAM(Integer fkComponenteRAM) {
        this.fkComponenteRAM = fkComponenteRAM;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}