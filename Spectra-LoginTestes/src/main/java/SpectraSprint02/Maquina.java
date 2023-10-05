package SpectraSprint02;

import com.github.britooo.looca.api.group.sistema.Sistema;
import javax.swing.*;
import java.util.Map;

public class Maquina {
    private Integer numeroIP;
    private String SistemaOperacional;
    private Integer qtdDiscos;

//  Cpu
    private String especificacaoCPU;
    private Double consumoAtualCPU;
    private Double consumoPorCoreCPU;
    private Map<String, Double> consumoPorProcessoCPU;
    private long tempoAtividade;

//  Memoria RAM
    private String tipoMemoria;
    private Integer armazenamentoTotalRAM;
    private Integer consumoAtualRAM;
    private Integer armazenamentoDisponivel;
    private Map<String, Double> consumoPorProcessoRAM;

//  Disco
    private String tipoDisco;
    private Integer armazenamentoTotal;
    private Integer consumoAtual;
    private Integer armazenamentoDisponivelDisco;

//  Rede
    private Integer latencia;
    private Double consumoDownload;
    private Double consumoUpload;
}