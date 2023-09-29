package ApiLooca;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.sistema.Sistema;

import java.sql.SQLOutput;

public class ApiLooca {

    public static void main(String[] args) {

        // Objeto
        Looca looca = new Looca();

        // Sistema Op
        System.out.println("Sistema Operacional");
        Sistema sistema = looca.getSistema();
        System.out.println(sistema.getSistemaOperacional());
        System.out.println(sistema.getArquitetura());
        System.out.println(sistema.getFabricante());
        System.out.println(sistema.getInicializado());
        System.out.println(sistema.getPermissao());
        System.out.println(sistema.getTempoDeAtividade());

        // Disco
        System.out.println("Discos");
        DiscoGrupo disco = looca.getGrupoDeDiscos();
        System.out.println(disco.getQuantidadeDeDiscos());
        System.out.println(disco.getTamanhoTotal());
        System.out.println(disco.getVolumes());
        System.out.println(disco.getQuantidadeDeVolumes());

        //Memoria
        System.out.println("Memoria");
        Memoria mem = looca.getMemoria();
        System.out.println(mem.getDisponivel());
        System.out.println(mem.getEmUso());
        System.out.println(mem.getTotal());

        // Rede
        System.out.println("Rede");
        Rede rede = looca.getRede();
        System.out.println(rede.getGrupoDeInterfaces());
        System.out.println(rede.getParametros());

        //CPU
        System.out.println("CPU");
        Processador cpu = looca.getProcessador();
        System.out.println(cpu.getFabricante());
        System.out.println(cpu.getFrequencia());
        System.out.println(cpu.getId());
        System.out.println(cpu.getNumeroCpusFisicas());
        System.out.println(cpu.getNome());
        System.out.println(cpu.getIdentificador());
        System.out.println(cpu.getNumeroPacotesFisicos());
        System.out.println(cpu.getNumeroCpusLogicas());
        System.out.println(cpu.getUso());
    }
}
