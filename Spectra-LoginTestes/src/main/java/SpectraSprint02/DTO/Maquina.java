package SpectraSprint02.DTO;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.rede.RedeParametros;
import com.github.britooo.looca.api.group.sistema.Sistema;

import java.util.List;

public class Maquina {
    private Integer idMaquina;
    private String hostName;
    private String nome;
    private String sistemaOperacional;
    private String secao;
    private Integer qtdDisco;
    private Integer fkEmpresa;
    private Looca looca = new Looca();

    public Maquina(String hostName, String nome, String sistemaOperacional, String secao, Integer qtdDisco) {
        this.idMaquina = null;
        this.hostName = hostName;
        this.nome = nome;
        this.sistemaOperacional = sistemaOperacional;
        this.secao = secao;
        this.qtdDisco = qtdDisco;
        this.fkEmpresa = null;
    }

    public Maquina(){}

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public void setIdMaquina(Integer idMaquina) {
        this.idMaquina = idMaquina;
    }

    public String getHostName() {
        RedeParametros redeParametro = looca.getRede().getParametros();
        hostName = redeParametro.getHostName();
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSistemaOperacional() {
        Sistema sistema = looca.getSistema();
        sistemaOperacional = sistema.getSistemaOperacional();
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    public String getSecao() {
        return secao;
    }

    public void setSecao(String secao) {
        this.secao = secao;
    }

    public Integer getQtdDisco() {
        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
        qtdDisco = grupoDeDiscos.getQuantidadeDeDiscos();
        return qtdDisco;
    }

    public void setQtdDisco(Integer qtdDisco) {
        this.qtdDisco = qtdDisco;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }
}