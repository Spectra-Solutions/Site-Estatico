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
    // app.post("/pesquisarColaboradores", (req, res) => {

    //     const dados = req.body;
    //     dashboard.pesquisarColaboradores(dados, res);
    // });

    // app.post("/listarColaboradoresSemanal", (req, res) => {

    //     const idUsuario = req.body;
    //     dashboard.listarColaboradoresSemanal(idUsuario, res);
    // });

    // app.post("/colaboradorBusca", (req, res) => {

    //     const id = req.body;

    //     dashboard.buscaPorId(id, res);
    // });

    // app.post("/avaliarColab", (req, res) => {

    //     const dados = req.body;

    //     dashboard.avaliarColab(dados, res);
    // });

    // app.post("/contarColab", (req, res) => {

    //     const id = req.body;

    //     dashboard.contarColab(id, res);
    // });

    // app.post("/contarLider", (req, res) => {

    //     const id = req.body;

    //     dashboard.contarLider(id, res);
    // });

    // app.post("/desempenhoColab", (req, res) => {

    //     const id = req.body;

    //     console.log(id)

    //     dashboard.desempenhoColab(id, res);
    // });

    // app.post("/calcularDesempenho", (req, res) => {

    //     const id = req.body;

    //     dashboard.calcularDesempenho(id, res);
    // });

}

