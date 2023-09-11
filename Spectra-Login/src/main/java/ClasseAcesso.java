public class ClasseAcesso {

    String cadastrar(String ipMaquina) {
        Integer comprimentoMinino = 11;
        Integer comprimentoMaximo = 32;

        if (ipMaquina.length() >= comprimentoMinino && ipMaquina.length() <= comprimentoMaximo) {

            System.out.println(String.format("""
                    Maquina registrada com sucesso! %s""", ipMaquina));

            return ipMaquina;
        }

        else {
            System.out.println("Quantidade de caracteres para cadastro de máquina inválida!!!");

            return ipMaquina;
        }
    }

    String login(String email, String senha) {
        Integer comprimentoMinino = 8;

        if (email != "" && senha != ""){

            if (email.indexOf("@") >= 0 && email.indexOf(".") >= 0 && senha.length() >= comprimentoMinino) {
                System.out.println("Usuário logado com sucesso!!");
                return email;
            }

            else {
                System.out.println("Falta @ ou . no e-mail, ou senha inválida");
                return email;
            }
        }

        else {
            System.out.println("Campo do e-mail sem caractere, e campo da senha sem caractere");
            return email;
        }
    }
}
