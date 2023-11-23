const express = require("express");
const processos = require("../controllers/processos");


module.exports = app => {
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());

    app.post("/ultimos", function (req, res) {

        const idMaquina = req.body.idMaquina;

        processos.buscarUltimosProcessos(idMaquina, res);
    });
    app.post("/info", function (req, res) {

        const idMaquina = req.body.idMaquina;

        processos.buscarInfo(idMaquina, res);
    });
};