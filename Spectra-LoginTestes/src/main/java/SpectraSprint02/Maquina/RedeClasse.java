package SpectraSprint02.Maquina;

import java.util.List;

public class RedeClasse {
    private Integer latencia;
    private Double consumoDownload;
    private Double consumoUpload;
    private List<Maquina> maquinas;

    public Integer getLatencia() {
        return latencia;
    }

    public void setLatencia(Integer latencia) {
        this.latencia = latencia;
    }

    public Double getConsumoDownload() {
        return consumoDownload;
    }

    public void setConsumoDownload(Double consumoDownload) {
        this.consumoDownload = consumoDownload;
    }

    public Double getConsumoUpload() {
        return consumoUpload;
    }

    public void setConsumoUpload(Double consumoUpload) {
        this.consumoUpload = consumoUpload;
    }

    public List<Maquina> getMaquinas() {
        return maquinas;
    }

    public void setMaquinas(List<Maquina> maquinas) {
        this.maquinas = maquinas;
    }
}
