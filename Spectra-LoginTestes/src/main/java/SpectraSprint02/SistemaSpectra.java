package SpectraSprint02;

import java.util.Scanner;

public class SistemaSpectra {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        Scanner inText = new Scanner(System.in);
        Funcionario func01 = new Funcionario("Murilo");

        Integer opcao;
        String emailDigitado;
        String senhaDigitada;

        Boolean travarWhile = true;

        do {
            System.out.println("""
                    Bem vindo ao sistema Spectra!!
                    
                    Escolha uma opção:
                    1- Logar
                    2- Encerrar sistema
                    """);
            opcao = in.nextInt();

            switch (opcao){
                case 1 -> {
                    System.out.println("""
                            Digite seu email:""");
                    emailDigitado = inText.nextLine();

                    System.out.println("""
                            Digite sua senha:""");
                    senhaDigitada = inText.nextLine();

                    func01.validarLogin(emailDigitado, senhaDigitada);
                }

                case 2 -> {
                    System.out.println("Obrigado por usar o sistema Spectra!!");
                    travarWhile = false;
                }

                default -> {
                    System.out.println("Opção inválida, escolha umas das opções acima!!");
                }
            }
        }while (travarWhile);
    }
}