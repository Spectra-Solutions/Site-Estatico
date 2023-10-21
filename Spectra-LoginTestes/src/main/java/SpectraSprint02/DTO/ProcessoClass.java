package SpectraSprint02.DTO;

public class ProcessoClass {
    private Integer idProcesso;
    private Integer pidProcesso;
    private String nomeProcesso;
    private Double usoCpu;
    private Double usoMemoria;
    private Integer fkMaquinaProcesso;

    public ProcessoClass(Integer pidProcesso, String nomeProcesso, Double usoCpu, Double usoMemoria) {
        this.idProcesso = null;
        this.pidProcesso = pidProcesso;
        this.nomeProcesso = nomeProcesso;
        this.usoCpu = usoCpu;
        this.usoMemoria = usoMemoria;
        this.fkMaquinaProcesso = null;
    }

    public ProcessoClass(){}

    public Integer getPidProcesso() {
        return pidProcesso;
    }

    public void setPidProcesso(Integer pidProcesso) {
        this.pidProcesso = pidProcesso;
    }

    public Integer getIdProcesso() {
        return idProcesso;
    }

    public void setIdProcesso(Integer idProcesso) {
        this.idProcesso = idProcesso;
    }

    public String getNomeProcesso() {
        return nomeProcesso;
    }

    public void setNomeProcesso(String nomeProcesso) {
        this.nomeProcesso = nomeProcesso;
    }

    public Double getUsoCpu() {
        return usoCpu;
    }

    public void setUsoCpu(Double usoCpu) {
        this.usoCpu = usoCpu;
    }

    public Double getUsoMemoria() {
        return usoMemoria;
    }

    public void setUsoMemoria(Double usoMemoria) {
        this.usoMemoria = usoMemoria;
    }

    public Integer getFkMaquinaProcesso() {
        return fkMaquinaProcesso;
    }

    public void setFkMaquinaProcesso(Integer fkMaquinaProcesso) {
        this.fkMaquinaProcesso = fkMaquinaProcesso;
    }
}
