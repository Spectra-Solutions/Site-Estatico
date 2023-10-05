package SpectraSprint02;

public class Funcionario {
    String nome;
    String email;
    String senha;

    public Funcionario() {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public Funcionario(String nome) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public void validarLogin(String email, String senha){
        this.email = email;
        this.senha = senha;
        Integer comprimentoMinimo = 8;

        if (email != "" && senha != ""){
            if (email.indexOf("@") >= 0 && email.indexOf(".") >= 0){
                if (senha.length() >= comprimentoMinimo){
                    exibirFuncionario();
                }
                else {
                    System.out.println("Senhe deve conter mais de 8 digitos");
                }
            }
            else {
                System.out.println("Email deve conter (@) e (.)");
            }
        }

        else {
            System.out.println("Preencha os campos corretamente!!");
        }
    }

    public void exibirFuncionario(){
        System.out.println(String.format("""
                Olá %s, seu login foi realizado com sucesso!!
                agora você será redirecionado para o sistema interno da Spectra!!
                """, nome));
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
