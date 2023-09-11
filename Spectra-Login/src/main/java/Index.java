import java.util.Scanner;

public class Index {
    public static void main(String[] args) {

        Scanner leitorOpcao = new Scanner(System.in);
        Scanner leitorEmail = new Scanner(System.in);
        Scanner leitorSenha = new Scanner(System.in);
        Scanner leitorSalvaEmVariaveis = new Scanner(System.in);

        ClasseAcesso acessarMetodo = new ClasseAcesso();

        Boolean travarWhile = true;
        Integer opcaoSelecionada;

        String emailDigitado;
        String senhaDigitada;
        String ipMaquinaDigitada;

        Double CPU;
        Double MemoriaRAM;
        Double MemoriaDeDisco;
        Double CapturaDeDadosDeRede;

        String msgBemVindo = String.format("""
                *------------------------------------------*
                |   Seja bem vindo ao sistema da Spectra!  |
                *------------------------------------------*""");

        String msgMenu = String.format("""
                *------------------------------------------*
                | Escolha uma opção:                       |
                | 1-) Logar no sistema                     |
                | 2-) Cadastrar Máquina                    |
                | 3-) Sair do sistema                      |
                *------------------------------------------*""");

        System.out.println(msgBemVindo);

        do {

            System.out.println(msgMenu);
            opcaoSelecionada = leitorOpcao.nextInt();

            switch (opcaoSelecionada){
                case 1 -> {

                    System.out.println("Digite seu email:");
                    emailDigitado = leitorEmail.nextLine();

                    System.out.println("Digite sua Senha:");
                    senhaDigitada = leitorSenha.nextLine();
                    
                    acessarMetodo.login(emailDigitado,senhaDigitada);
                }

                case 2 -> {
                    System.out.println("""
                            Digite o ip de sua máquina:""");
                    ipMaquinaDigitada = leitorSalvaEmVariaveis.nextLine();

                    acessarMetodo.cadastrar(ipMaquinaDigitada);
                }

                case 3 -> {
                    System.out.println("Sistema Spectra finalizado! Obrigado pelo uso do sistema!");
                    travarWhile = false;
                }

                default -> {
                    System.out.println("Valor inválido!!");
                    travarWhile = false;
                }

            }
        } while (travarWhile);
    }
}
