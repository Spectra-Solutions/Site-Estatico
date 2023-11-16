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

