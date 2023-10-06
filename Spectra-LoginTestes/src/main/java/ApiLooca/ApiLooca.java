package ApiLooca;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.sistema.Sistema;

import java.awt.*;
import java.sql.SQLOutput;
import java.util.List;

public class ApiLooca {

    public static void main(String[] args) {
        // Objeto
        Looca looca = new Looca();

//         Sistema Operacional
        System.out.println("Parte do Sistema Operacional -- ass: Murilo");
//        Sistema sistema = looca.getSistema();
//        System.out.println(sistema.getSistemaOperacional()); // Winsdows
//        System.out.println(sistema.getArquitetura()); // X64
//        System.out.println(sistema.getFabricante()); // Microsoft
//        System.out.println(sistema.getInicializado()); // Data e hora em que o computador foi iniciado pela ultima vez
//        System.out.println(sistema.getPermissao()); // Não sei
//        System.out.println(sistema.getTempoDeAtividade()); // Não sei

        // Disco
//        System.out.println("Parte Discos -- ass: Murilo");
//        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
//        System.out.println(grupoDeDiscos.getDiscos()); // tras um grupo de informações
        // (nome: (\\.\PHYSICALDRIVE0), Modelo: NVMe WDC PC SN530 SDBPNPZ-512G-1114 (Unidades de disco padrão), Serial: (E823_8FA6_BF53_0001_001B_444A_49D8_2F33.),
        // tamanho: (512105932800), Leituras: 2397502, Bytes de leitura: 78496825344, Escritas: 889886, Bytes de escritas: 34306997760, Tamanho atual da fila: 0,
        // Tempo de transferência: 1977562);


//        System.out.println(grupoDeDiscos.getQuantidadeDeDiscos()); // Quantidade de discos que tem na maquina
//        System.out.println(grupoDeDiscos.getTamanhoTotal()); // tamanho total que tem no disco --> converter esse numero em (MB);
//        System.out.println(grupoDeDiscos.getVolumes()); // tras um grupo informações
        // (nome: Local (c:), volume: (\\?\Volume{ba3bd46e-2718-4a8b-bc52-0a3c760093f3}), total: numero aleatorio (510745636864), disponivel: (334065348608), tipo: NTFS);
//        System.out.println(grupoDeDiscos.getQuantidadeDeVolumes()); // quantidade de volumes que possuem no disco;

        //Memoria
//        System.out.println("Memoria -- ass: Murilo");
//        Memoria mem = looca.getMemoria();
//        System.out.println(mem.getDisponivel()); // espaço disponivel na memoria ram
//        System.out.println(mem.getEmUso()); // memoria em uso da memoria ram
//        System.out.println(mem.getTotal()); // espaço total na memoria ram

        // Rede
//        System.out.println("Rede -- ass: Murilo");
//        Rede rede = looca.getRede();
//        System.out.println(rede.getGrupoDeInterfaces()); // nao sei o que é;
//        System.out.println(rede.getParametros()); // parametros da rede;

        //CPU
        System.out.println("CPU -- ass: Murilo");
        Processador cpu = looca.getProcessador();
//        System.out.println(cpu.getFabricante()); // fabricante da cpu
//        System.out.println(cpu.getFrequencia()); // frequencia da cpu
//        System.out.println(cpu.getId()); // id da cpu
//        System.out.println(cpu.getNumeroCpusFisicas()); // qtd de cpus fisicas
//        System.out.println(cpu.getNome()); // nome da cpu
//        System.out.println(cpu.getIdentificador()); // nome de identificação da cpu
//        System.out.println(cpu.getNumeroPacotesFisicos()); // qtd de numero de pacotes fisicos
//        System.out.println(cpu.getNumeroCpusLogicas()); // qtd de numeros de cpus logicos
//        System.out.println(cpu.getUso()); // uso da cpu
        System.out.println(cpu.getUso());
        System.out.println(cpu.getNumeroPacotesFisicos());
        System.out.println(cpu.getIdentificador());
        System.out.println(cpu.getId());
    }
}