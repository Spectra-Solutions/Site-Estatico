package SpectraSprint02.VIEW;

import SpectraSprint02.DAO.FuncionarioDao;
import SpectraSprint02.DAO.MaquinaDao;
import SpectraSprint02.DTO.Funcionario;
import SpectraSprint02.DTO.Maquina;

import javax.swing.*;

public class IniciarSistema {
    FuncionarioDao validarFuncionario = new FuncionarioDao();
    MaquinaDao maquinaDao = new MaquinaDao();
    Maquina maquina = new Maquina();
    Funcionario func = new Funcionario();

    public void validarLogin(){
        String emailJframe, senhaJframe;
        Integer comprimentoMinino = 8;

        emailJframe = JOptionPane.showInputDialog("""
                Digite seu email:""");
        func.setEmail(emailJframe);

        senhaJframe = JOptionPane.showInputDialog("""
                Digite sua senha:""");
        func.setSenha(senhaJframe);

        if (emailJframe.equals("")){
            JOptionPane.showMessageDialog(null, "Não pode deixar o campo vazio");
        }

        else
        {
            if (emailJframe.indexOf("@") >= 0 && emailJframe.indexOf(".") >= 0 && senhaJframe.length() >= comprimentoMinino) {
                if (validarFuncionario.existEmail(func.getEmail(), func.getSenha())) {
                    JOptionPane.showMessageDialog(null, "Usuário logado com sucesso!!");
                    validarFuncionario.pegarIdEmpresa(func.getEmail(), func.getSenha());
                    validarMaquina();
                } else {
                    JOptionPane.showMessageDialog(null, "Usuário não existe no sistema!!");
                }
            }
            else {
                JOptionPane.showMessageDialog(null, "Falta @ no seu emailJframe!! ou falta . no seu emailJframe!! ou sua senhaJframe está incorreta!!");
            }
        }
    }

    public void validarMaquina(){
        String nomeJframe, secaoJframe;

//        if (maquinaDao.existEmail(maquina.getHostName())){
//            System.out.println("Maquina existe, não precisa fazer um novo cadastro");
//        } else {
//            maquinaDao.Salvar(maquina.getNome(), maquina.getSecao());
//            JOptionPane.showMessageDialog(null, """
//                    Cadastrando nova maquina...
//                    """);
//        }


        nomeJframe = JOptionPane.showInputDialog("""
                Digite o nome que você quer atribuir a maquina:""");
        maquina.setNome(nomeJframe);

        secaoJframe = JOptionPane.showInputDialog("""
                Digite a seção que a máquina se encontra: """);
        maquina.setSecao(secaoJframe);

        maquinaDao.Salvar(maquina.getNome(), maquina.getSecao());
    }
}
