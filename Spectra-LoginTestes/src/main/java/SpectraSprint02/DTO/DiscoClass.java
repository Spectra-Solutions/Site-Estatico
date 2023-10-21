package SpectraSprint02.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;

import java.util.List;

public class DiscoClass {
    private Integer idRegistroDisco;
    private Long consumoAtual;
    private Double armazenamentoTotal;
    private Double armazenamentoDisponivel;
    private Integer fkComponenteDisco;
    private Integer fkMaquina;

    public DiscoClass(Long consumoAtual, Double armazenamentoTotal, Double armazenamentoDisponivel) {
        this.idRegistroDisco = null;
        this.consumoAtual = consumoAtual;
        this.armazenamentoTotal = armazenamentoTotal;
        this.armazenamentoDisponivel = armazenamentoDisponivel;
        this.fkComponenteDisco = null;
        this.fkMaquina = null;
    }

    public DiscoClass(){}

    public Integer getIdRegistroDisco() {
        return idRegistroDisco;
    }

    public void setIdRegistroDisco(Integer idRegistroDisco) {
        this.idRegistroDisco = idRegistroDisco;
    }

    public Long getConsumoAtual() {
        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
    }

    public Double getArmazenamentoTotal() {
        return armazenamentoTotal;
    }

    public void setArmazenamentoTotal(Double armazenamentoTotal) {
        this.armazenamentoTotal = armazenamentoTotal;
    }

    public Double getArmazenamentoDisponivel() {
        return armazenamentoDisponivel;
    }

    public void setArmazenamentoDisponivel(Double armazenamentoDisponivel) {
        this.armazenamentoDisponivel = armazenamentoDisponivel;
    }

    public Integer getFkComponenteDisco() {
        return fkComponenteDisco;
    }

    public void setFkComponenteDisco(Integer fkComponenteDisco) {
        this.fkComponenteDisco = fkComponenteDisco;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}