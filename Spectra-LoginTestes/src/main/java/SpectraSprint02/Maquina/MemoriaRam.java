package SpectraSprint02.Maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;

public class MemoriaRam {
    private Long armazenamentoTotalRAM;
    private Long consumoAtualRAM;
    private Long armazenamentoDisponivel;
    private Looca looca = new Looca();
    Memoria memoriaRam = looca.getMemoria();

    public Long getArmazenamentoTotalRAM() {
        return armazenamentoTotalRAM;
    }

    public void setArmazenamentoTotalRAM(Long armazenamentoTotalRAM) {
        this.armazenamentoTotalRAM = memoriaRam.getTotal();
    }

    public Long getConsumoAtualRAM() {
        return consumoAtualRAM;
    }

    public void setConsumoAtualRAM(Long consumoAtualRAM) {
        this.consumoAtualRAM = memoriaRam.getEmUso();
    }

    public Long getArmazenamentoDisponivel() {
        return armazenamentoDisponivel;
    }

    public void setArmazenamentoDisponivel(Long armazenamentoDisponivel) {
        this.armazenamentoDisponivel = memoriaRam.getDisponivel();
    }

}
