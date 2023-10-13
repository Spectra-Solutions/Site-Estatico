package SpectraSprint02.DTO;

import SpectraSprint02.DAO.FuncionarioDao;

public class Funcionario {
    private Integer idFuncionario;
    private String nome;
    private String email;
    private String senha;
    private Integer fkEmpresa;

    public Funcionario(Integer idFuncionario, String nome, String email, String senha, Integer fkEmpresa) {
        this.idFuncionario = idFuncionario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.fkEmpresa = fkEmpresa;
    }

    public Funcionario(String nome, String email, String senha) {
        this.idFuncionario = null;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public Funcionario(String email, String senha) {
        this.idFuncionario = null;
        this.nome = null;
        this.email = email;
        this.senha = senha;
    }

    public Funcionario() {}

    public Integer getId() {
        return idFuncionario;
    }

    public void setId(Integer id) {
        this.idFuncionario = id;
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

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    @Override
    public String toString() {
        return String.format("""
                ID: %d,
                Nome: %s,
                Email: %s,
                Senha: %s
                """, idFuncionario, nome, email, senha);
    }
}
