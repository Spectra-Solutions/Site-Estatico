const express = require('express');
const usuario = require("../controllers/usuario");

module.exports = app => {

    /*
    PARA CRIAR UMA NOVA ROTA, BASTA COPIAR A ESTRUTURA PADRAO

    app.post("/autenticarUser", (req, res) => {

        const { emailUser, senhaUser } = req.body;

        const usuarioInfo = {
            emailUser, senhaUser
        };

        usuario.autenticarUser(usuarioInfo, res);
    });

    UTILIZE POST PARA ROTAS QUE VAO UTILIZAR PARAMETROS QUE ESTAO VINDO DA REQUISIÇÃO DO FETCH
    UTILIZE GET PARA ROTAS QUE APENAS FAZEM SELECT POR EXEMPLO: NÃO UTILIZA BODY NO FETCH
    */


    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());

    app.post("/cadastrarEmpresa", (req, res) => {

        const { nomeEmpresa, razaoSocial, cnpj, emailRepresentante, senha, confSenha, nomeRepresentante } = req.body;

        const empresa = {
            nomeEmpresa, razaoSocial, cnpj, emailRepresentante, senha, nomeRepresentante, confSenha
        };

        usuario.cadastrarEmpresa(empresa, res);
    });


    app.post("/cadastrarFuncionario", (req, res) => {

        const { nomeFuncionario, emailFuncionario, senha, idEmpresa, nivelAviso, nivelAcesso, idFuncionario, modoEdicao} = req.body;

        const funcionario = {
            nomeFuncionario, emailFuncionario, senha, idEmpresa, nivelAviso, nivelAcesso, idFuncionario, modoEdicao
        };

        usuario.cadastrarFuncionario(funcionario, res);
    });

    app.post("/atualizarUsuarios", (req, res) => {

        const { id } = req.body;

        usuario.atualizarUsuarios(id, res);
    });


    app.post("/deletarUsuario", (req, res) => {

        const { idFuncionario1 } = req.body;

        usuario.deletarUsuario(idFuncionario1, res);
    });


    app.post("/editarFuncionario", (req, res) => {

        const { idFuncionario } = req.body;

        usuario.editarFuncionario(idFuncionario, res);
    });

    app.post("/puxarNomeFuncionario", (req, res) => {

        const { digitado } = req.body;

        usuario.puxarNomeFuncionario(digitado, res);
    });


    app.post("/autenticarUser", (req, res) => {

        const { emailUser, senhaUser } = req.body;

        const usuarioInfo = {
            emailUser, senhaUser
        };

        usuario.autenticarUser(usuarioInfo, res);
    });

}

