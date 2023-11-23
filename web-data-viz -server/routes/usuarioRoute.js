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

    app.post("/autenticarUser", (req, res) => {

        const { emailUser, senhaUser } = req.body;

        const usuarioInfo = {
            emailUser, senhaUser
        };

        usuario.autenticarUser(usuarioInfo, res);
    });

}

