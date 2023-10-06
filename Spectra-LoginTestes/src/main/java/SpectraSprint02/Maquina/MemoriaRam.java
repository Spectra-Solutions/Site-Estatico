package SpectraSprint02.Maquina;

import java.util.Map;

public class MemoriaRam {
    private String tipoMemoria;
    private Long armazenamentoTotalRAM;
    private Long consumoAtualRAM;
    private Long armazenamentoDisponivel;

    public String getTipoMemoria() {
        return tipoMemoria;
    }

    public void setTipoMemoria(String tipoMemoria) {
        this.tipoMemoria = tipoMemoria;
    }

    public Long getArmazenamentoTotalRAM() {
        return armazenamentoTotalRAM;
    }

    public void setArmazenamentoTotalRAM(Long armazenamentoTotalRAM) {
        this.armazenamentoTotalRAM = armazenamentoTotalRAM;
    }

    public Long getConsumoAtualRAM() {
        return consumoAtualRAM;
    }

    public void setConsumoAtualRAM(Long consumoAtualRAM) {
        this.consumoAtualRAM = consumoAtualRAM;
    }

    public Long getArmazenamentoDisponivel() {
        return armazenamentoDisponivel;
    }

    public void setArmazenamentoDisponivel(Long armazenamentoDisponivel) {
        this.armazenamentoDisponivel = armazenamentoDisponivel;
    }

}
