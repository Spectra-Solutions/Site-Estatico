package SpectraSprint01;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ClasseAcessoPoup {

    String msgBemVindo(String opcao){
//      ShowInputDialog == chama um input para entrada de dados.
        opcao =JOptionPane.showInputDialog("""
                -------------------------------------------------------------
                |   Seja bem vindo ao sistema da Spectra!   |
                |                                                                          |
                |   Escolha um opção:                                      |
                |                                                                          |
                | 1-) Logar no Sistema                                     |
                | 2-) Encerrar sistema                                      |
                -------------------------------------------------------------""");

            switch (opcao){
                case "1" ->{
                    validar();
                }

                case "2" ->{
                    JOptionPane.showMessageDialog(null,"Sistema encerrado!!");
                }

                default -> {
                    JOptionPane.showMessageDialog(null,"Numero inválido!!");
                }
            }

            System.exit(0);
            return opcao;
    }

    void validar(){
        String email;
        String senha;
        Integer comprimentoMinino = 8;
        String opcao = "";

        email = JOptionPane.showInputDialog("""
                Digite seu email:""");

        senha = JOptionPane.showInputDialog("""
                Digite sua senha:""");

        if (email.equals("")){
            JOptionPane.showMessageDialog(null, "Não pode deixar o campo vazio");
        }

        else
        {
            if (email.indexOf("@") >= 0 && email.indexOf(".") >= 0 && senha.length() >= comprimentoMinino) {
                JOptionPane.showMessageDialog(null, "Usuário logado com sucesso!!");
                logar();
            }
            else {
                JOptionPane.showMessageDialog(null, "Falta @ no seu email!! ou falta . no seu email!! ou sua senha está incorreta!!");
                msgBemVindo(opcao);
            }
        }

        System.exit(0);
    }

    void logar(){

//      CPU:
        Double consumoAtualCPU = 0.4 * 10;
        List<Double> consumoPorCoresCPU = new ArrayList<>();
//      Adicionando consumo de cada Core na Lista consumoPorCoreCPU:
        consumoPorCoresCPU.add(0.5);
        consumoPorCoresCPU.add(2.74);
        consumoPorCoresCPU.add(0.10);
        consumoPorCoresCPU.add(0.0);
        consumoPorCoresCPU.add(0.50);
        consumoPorCoresCPU.add(0.12);
        Map<String, Double> consumoPorProcessoCPU;
        long tempoDeAtividadeCPU;

//      DiscoClass:
        Double espacoTotalDisco = 487.085;
        Double memoriaDisponivelDisco = 290.963;
        Double consumoAtualDisco = espacoTotalDisco - memoriaDisponivelDisco;

//      Memória RAM:
        Integer espacoTotalRAM = 20259;
        Integer memoriaDisponivelRAM = 10425;
        Integer consumoAtualRAM = espacoTotalRAM - memoriaDisponivelRAM;
        Map<String, Double> consumoPorProcessoRAM;

//      Rede:
        Integer latênciaRede = 12;
        Double consumoUploadRede = 351.96;
        Double consumoDownloadRede = 89.75;

        Boolean travarWhile = true;
        String opcao;

        do {
            opcao = JOptionPane.showInputDialog("""
                    ---------------------------------------------------------
                    | Escolha uma opcao para visualizar!!     |
                    |                                                                     |
                    | 1-) CPU                                                      |
                    | 2-) Disco                                                    |
                    | 3-) Memória RAM                                      |
                    | 4-) Rede                                                     |
                    | 5-) Sair do sistema                                    |
                    --------------------------------------------------------""");

            switch (opcao){
                case "1" ->{
                    JOptionPane.showMessageDialog(null,String.format("""
                            O consumo atual da sua cpu é: %.0f%%
                            O consumo de cada core é:
                            O consumo de cada processo é:
                            O tempo de atividade da sua CPU está em:""", consumoAtualCPU));
                }

                case "2" ->{
                    JOptionPane.showMessageDialog(null,String.format("""
                            A memória total do seu disco: %.3fMB
                            A memória Disponível no disco: %.3fMB
                            O consumo atual do disco: %.3fMB""", espacoTotalDisco, memoriaDisponivelDisco, consumoAtualDisco));
                }

                case "3" ->{
                    JOptionPane.showMessageDialog(null,String.format("""
                            O espaço total da memória RAM: %dMB
                            A memória Disponível da memória RAM: %dMB
                            O consumo atual da memória RAM: %dMB
                            Consumo Por Processo: """, espacoTotalRAM, memoriaDisponivelRAM, consumoAtualRAM));
                }

                case "4" ->{
                    JOptionPane.showMessageDialog(null,String.format("""
                            O ping da sua Rede está em: %dms
                            O consumo de Upload: %.3f
                            O consumo de download: %.3f""", latênciaRede, consumoUploadRede, consumoDownloadRede));
                }

                case "5" ->{
                    JOptionPane.showMessageDialog(null, "Sistema encerrado!!");
                    travarWhile = false;
                    msgBemVindo(opcao);
                }

                default -> {
                    JOptionPane.showMessageDialog(null, "Opção inválida");
                }
            }
         } while (travarWhile);

        System.exit(0);
    }
}
