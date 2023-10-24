package JAR.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.rede.RedeParametros;
import com.github.britooo.looca.api.group.sistema.Sistema;

public class Maquina {
    private Integer idMaquina;
    private String hostName;
    private String nome;
    private String sistemaOperacional;
    private String secao;
    private Integer qtdDisco;
    private Integer fkEmpresaMaquina;
    private Looca looca = new Looca();
    private Sistema sistema = looca.getSistema();

    public Maquina(String hostName, String nome, String sistemaOperacional, String secao, Integer qtdDisco, Integer fkEmpresaMaquina) {
        this.idMaquina = null;
        this.hostName = hostName;
        this.nome = nome;
        this.sistemaOperacional = sistemaOperacional;
        this.secao = secao;
        this.qtdDisco = qtdDisco;
        this.fkEmpresaMaquina = fkEmpresaMaquina;
    }

    public Maquina() {}

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public void setIdMaquina(Integer idMaquina) {
        this.idMaquina = idMaquina;
    }

    public String getSistemaOperacional() {
        sistemaOperacional = sistema.getSistemaOperacional();
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    public Integer getQtdDisco(){
        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
        qtdDisco = grupoDeDiscos.getQuantidadeDeDiscos();
        return qtdDisco;
    }

    public String getHostName(){
        RedeParametros redeParametro = looca.getRede().getParametros();
        hostName = redeParametro.getHostName();
        return hostName;
    }

    public void setHostName(String hostName){
        this.hostName = hostName;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSecao() {
        return secao;
    }

    public void setSecao(String secao) {
        this.secao = secao;
    }

    public Integer getFkEmpresaMaquina() {
        return fkEmpresaMaquina;
    }

    public void setFkEmpresaMaquina(Integer fkEmpresaMaquina) {
        this.fkEmpresaMaquina = fkEmpresaMaquina;
    }

    @Override
    public String toString() {
        return String.format("""
                HostName: %s,
                Nome: %s,
                SistemaOperacional: %s,
                Seção: %s,
                Quantidade de discos: %d
                """, hostName, nome, sistemaOperacional, secao, qtdDisco);
    }
}
