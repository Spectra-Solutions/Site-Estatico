package JAR.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.rede.RedeInterface;

import java.util.List;

public class Rede {
    private Integer fkComponenteRede;
    private Integer idRegistroRede;
    private Integer latecia;
    private Long consumoUpload;
    private Long consumoDownload;
    private Looca looca= new Looca();
    private List<RedeInterface> redeInterfaces = looca.getRede().getGrupoDeInterfaces().getInterfaces();

    public Rede(Integer latecia, Long consumoUpload, Long consumoDownload) {
        this.fkComponenteRede = null;
        this.idRegistroRede = null;
        this.latecia = latecia;
        this.consumoUpload = consumoUpload;
        this.consumoDownload = consumoDownload;
    }

    public Rede(){

    }

    public Integer getFkComponenteRede() {
        return fkComponenteRede;
    }

    public void setFkComponenteRede(Integer fkComponenteRede) {
        this.fkComponenteRede = fkComponenteRede;
    }

    public Integer getIdRegistroRede() {
        return idRegistroRede;
    }

    public void setIdRegistroRede(Integer idRegistroRede) {
        this.idRegistroRede = idRegistroRede;
    }

    public Integer getLatecia() {
        return latecia;
    }

    public void setLatecia(Integer latecia) {
        this.latecia = latecia;
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
            consumoDownload = r.getPacotesRecebidos();
        }

        return consumoDownload;
    }

    public void setConsumoDownload(Long consumoDownload) {
        this.consumoDownload = consumoDownload;
    }

    @Override
    public String toString() {
        return "Rede{" +
                "latecia=" + latecia +
                ", consumoUpload=" + consumoUpload +
                ", consumoDownload=" + consumoDownload +
                '}';
    }
}
