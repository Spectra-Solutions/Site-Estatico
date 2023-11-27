const express = require('express');
const slack = require("../controllers/slack");

module.exports = app => {

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());


    app.post("/configurarSlack", (req, res) => {
        const dados = { urlSlack, fkEmpresa } = req.body;

        console.log(dados);

        slack.configurarSlack(dados, res);
    });

}

