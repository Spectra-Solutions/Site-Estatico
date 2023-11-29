const express = require('express');
const dashboard = require("../controllers/dashboard");

module.exports = app => {

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());


    app.post("/listarMaquinas", (req, res) => {

        const { id } = req.body;

        dashboard.listarMaquinas(id, res);
    });

    app.post("/buscarInformacoesMaquina", (req, res) => {

        const { id } = req.body;

        dashboard.listarInformacoesMaquina(id, res);
    });

    app.post("/atualizarTaxa", (req, res) => {

        const { fkEmpresa, taxaAlerta, taxaCritica } = req.body;

        const alterar = {fkEmpresa, taxaAlerta, taxaCritica}

        dashboard.atualizarTaxa(alterar, res);
    });

    app.post("/atualizarTaxaTotal", (req, res) => {

        const {id} = req.body;

        dashboard.atualizarTaxaTotal(id, res);
    });


    app.post("/atualizarTaxaDisco", (req, res) => {

        const { fkEmpresa, taxaAlerta, taxaCritica } = req.body;

        const alterar = {fkEmpresa, taxaAlerta, taxaCritica}

        dashboard.atualizarTaxaDisco(alterar, res);
    });


    app.post("/atualizarTaxaRAM", (req, res) => {

        const { fkEmpresa, taxaAlerta, taxaCritica } = req.body;

        const alterar = {fkEmpresa, taxaAlerta, taxaCritica}

        dashboard.atualizarTaxaRAM(alterar, res);
    });


    app.post("/restaurarTaxaCpu", (req, res) => {

        const { fkEmpresa } = req.body;

        const alterar = {fkEmpresa}

        dashboard.restaurarTaxaCpu(alterar, res);
    });
  
    app.post("/restaurarTaxaDisco", (req, res) => {

        const { fkEmpresa } = req.body;

        const alterar = {fkEmpresa}

        dashboard.restaurarTaxaDisco(alterar, res);
    });

    app.post("/restaurarTaxaRam", (req, res) => {

        const { fkEmpresa } = req.body;

        const alterar = {fkEmpresa}

        dashboard.restaurarTaxaRam(alterar, res);
    });

    app.post("/listarTaxaMaquina", (req, res) => {

        const dados = { idMaquina } = req.body;

        dashboard.listarTaxaMaquina(dados, res);
    });

    app.post("/executarComandosInovacao", (req, res) => {

        const dados = { idMaquina, comando, fkMaquina, fkUser, status } = req.body;

        dashboard.executarComandosInovacao(dados, res);
    });

    app.post("/validarComandosInovacao", (req, res) => {

        const { id } = req.body;

        dashboard.validarComandosInovacao(id, res);
    });

    app.post("/listarNotificacao", (req, res) => {

        const dados = { idEmpresa, idAviso } = req.body;
        dashboard.listarAviso(dados, res);
    });

    app.post("/listarAvisoKPI", (req, res) => {

        const dados = { idEmpresa } = req.body;
        dashboard.listarAvisoKPI(dados, res);
    });

    app.post("/listarDadosCPU", (req, res) => {

        const dados = { idMaquina } = req.body;
        dashboard.listarCPU(dados, res);
    });

    app.post("/listarDadosRAM", (req, res) => {

        const dados = { idMaquina } = req.body;
        dashboard.listarRAM(dados, res);
    });

    app.post("/listarDadosDisco", (req, res) => {

        const dados = { idMaquina } = req.body;
        dashboard.listarDisco(dados, res);
    });

    app.post("/listarDadosRede", (req, res) => {

        const dados = { idMaquina } = req.body;
        dashboard.listarRede(dados, res);
    });

    app.post("/listarTaxaComponente", (req, res) => {

        const dados = { idEmpresa } = req.body;
        dashboard.listarTaxaComponente(dados, res);
    });

}

