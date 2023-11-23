const express = require('express');
const path = require('path');

module.exports = app => {

    app.use(express.Router());

    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'index.html'));
    });

    app.get('/cadastro', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagCadastroEmpresa.html'));
    });

    app.get('/cadastroFuncionario', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagCadastroFuncionario.html'));
    });

    app.get('/monitoramentoGeral', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagMonitoramentoGeral.html'));
    });

    app.get('/duvidas', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagDuvidas.html'));
    });

    app.get('/configuracaoTaxas', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagConfiguracaoTaxas.html'));
    });

    app.get('/monitoramentoMaquina', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagMonitoramentoMaquina.html'));
    });
    app.get('/processosMaquina', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagProcessosMaquina.html'));
    });
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'pagLogin.html'));
    });
}
