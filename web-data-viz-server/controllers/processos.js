const express = require("express");
const path = require("path");
const app = require("../index");

const conexao = require("../bd/connection");


function buscarUltimosProcessos(req, res) {
    const limite_linhas = 50;
    const idMaquina = req;

    console.log(`Recuperando as últimas ${limite_linhas} medidas`);

    // Query SQL com placeholders
    const instrucaoSql = `
        SELECT TOP 20 * FROM Processo
        WHERE fkMaquinaProcesso = ${idMaquina}
        ORDER BY idProcesso DESC;
    `;

    // Conectar ao banco de dados
    conexao.connect()
        .then(() => {
            // Executar a consulta
            return conexao.query(instrucaoSql);
        })
        .then((result) => {
            // Enviar resposta com sucesso
            res.status(200).json(result);
        })
        .catch((erro) => {
            // Enviar resposta de erro
            res.status(400).json(erro);
        })
        .finally(() => {
            // Fechar conexão
            conexao.close();
        });
}

function buscarInfo(req, res) {
    const idMaquina = req;

    console.log(`Recuperando a info da máquina`);

    // Query SQL com placeholders
    const instrucaoSql = `
        SELECT * FROM Maquina
        WHERE idMaquina = ${idMaquina};
    `;

    // Conectar ao banco de dados
    conexao.connect()
        .then(() => {
            // Executar a consulta
            return conexao.query(instrucaoSql);
        })
        .then((result) => {
            // Enviar resposta com sucesso
            res.status(200).json(result);
        })
        .catch((erro) => {
            // Enviar resposta de erro
            res.status(400).json(erro);
        })
        .finally(() => {
            // Fechar conexão
            conexao.close();
        });
}



module.exports = { buscarUltimosProcessos, buscarInfo };