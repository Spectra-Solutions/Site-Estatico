package SpectraSprint02.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.rede.RedeInterface;

import java.util.List;

public class Rede {
    private Integer idRegistroRede;
    private Integer latencia;
    private Long consumoUpload;
    private Long consumoDownload;
    private Integer fkComponenteRede;
    private Integer fkMaquina;
    private Looca looca = new Looca();
    private List<RedeInterface> redeInterfaces = looca.getRede().getGrupoDeInterfaces().getInterfaces();

    public Rede(){};

    public Rede(Integer latencia, Long consumoUpload, Long consumoDownload) {
        this.idRegistroRede = null;
        this.latencia = latencia;
        this.consumoUpload = consumoUpload;
        this.consumoDownload = consumoDownload;
        this.fkComponenteRede = null;
        this.fkMaquina = null;
    }

    public Integer getIdRegistroRede() {
        return idRegistroRede;
    }

    public void setIdRegistroRede(Integer idRegistroRede) {
        this.idRegistroRede = idRegistroRede;
    }

    public Integer getLatencia() {
        return latencia;
    }

    public void setLatencia(Integer latencia) {
        this.latencia = latencia;
    }

    public Long getConsumoUpload() {
        for (RedeInterface r: redeInterfaces){
            consumoUpload = r.getBytesEnviados();
        }
        return consumoUpload;
    }

    public void setConsumoUpload(Long consumoUpload) {
        this.consumoUpload = consumoUpload;
    }

    public Long getConsumoDownload() {
        for (RedeInterface r: redeInterfaces){
            consumoDownload = r.getBytesRecebidos();
        }
        return consumoDownload;
    }

    public void setConsumoDownload(Long consumoDownload) {
        this.consumoDownload = consumoDownload;
    }

    public Integer getFkComponenteRede() {
        return fkComponenteRede;
    }

    public void setFkComponenteRede(Integer fkComponenteRede) {
        this.fkComponenteRede = fkComponenteRede;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }
}