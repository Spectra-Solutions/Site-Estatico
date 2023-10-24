package JAR.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Volume;

import java.util.List;

public class Disco {
    private Integer fkComponenteDisco;
    private Integer idRegistroDisco;
    private Double armazenamentoTotal;
    private Double armazenamentoDisponivel;
    private Double armazenamentoEmUso;
    private Long consumoAtual;
    private Looca looca = new Looca();
    private List<Volume> volumes = looca.getGrupoDeDiscos().getVolumes();
    private Integer GB = 1024 * 1024 * 1024;

    public Disco(Double armazenamentoTotal, Double armazenamentoDisponivel, Double armazenamentoEmUso, Long consumoAtual) {
        this.fkComponenteDisco = null;
        this.idRegistroDisco = null;
        this.armazenamentoTotal = armazenamentoTotal;
        this.armazenamentoDisponivel = armazenamentoDisponivel;
        this.armazenamentoEmUso = armazenamentoEmUso;
        this.consumoAtual = consumoAtual;
    }
    public Disco(){

    }

    public Integer getFkComponenteDisco() {
        return fkComponenteDisco;
    }

    public void setFkComponenteDisco(Integer fkComponenteDisco) {
        this.fkComponenteDisco = fkComponenteDisco;
    }

    public Integer getIdRegistroDisco() {
        return idRegistroDisco;
    }

    public void setIdRegistroDisco(Integer idRegistroDisco) {
        this.idRegistroDisco = idRegistroDisco;
    }

    public Double getArmazenamentoTotal() {
        for (int i = 0; i < volumes.size(); i++) {
            Volume volumeAtual = volumes.get(i);

            armazenamentoTotal = (volumeAtual.getTotal().doubleValue() / GB);
            System.out.println("Volume Total: " + armazenamentoTotal);
        }

        return armazenamentoTotal;
    }

    public void setArmazenamentoTotal(Double armazenamentoTotal) {
        this.armazenamentoTotal = armazenamentoTotal;
    }

    public Double getArmazenamentoDisponivel() {
        for (int i = 0; i < volumes.size(); i++) {
            Volume volumeAtual = volumes.get(i);
            armazenamentoDisponivel = (volumeAtual.getDisponivel().doubleValue() / GB);
            System.out.println("Volume disponivel: " + armazenamentoDisponivel);
        }

        return armazenamentoDisponivel;
    }

    public void setArmazenamentoDisponivel(Double armazenamentoDisponivel) {
        this.armazenamentoDisponivel = armazenamentoDisponivel;
    }

    public Double getArmazenamentoEmUso() {
        for (int i = 0; i < volumes.size(); i++) {
            Volume volumeAtual = volumes.get(i);
            armazenamentoEmUso = ((volumeAtual.getTotal().doubleValue() - volumeAtual.getDisponivel().doubleValue()) / GB);
            System.out.println("Armazenamento em uso: " + armazenamentoEmUso);
        }

        return armazenamentoEmUso;
    }

    public void setArmazenamentoEmUso(Double armazenamentoEmUso) {
        this.armazenamentoEmUso = armazenamentoEmUso;
    }

    public Long getConsumoAtual() {
        for (int i = 0; i < volumes.size(); i++) {
            Volume volumeAtual = volumes.get(i);
            consumoAtual = volumeAtual.getTotal() - volumeAtual.getDisponivel() / GB;
            System.out.println("Consumo atual: " + consumoAtual);
        }

        return consumoAtual;
    }

    public void setConsumoAtual(Long consumoAtual) {
        this.consumoAtual = consumoAtual;
    }
}
