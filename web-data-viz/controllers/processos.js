const express = require("express");
const path = require("path");
const app = require("../index");

const conexao = require("../bd/connection");


function buscarUltimosProcessos(req, res) {

    const limite_linhas = 50;

    const idMaquina = req;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    const instrucaoSql = `SELECT * FROM Processo
        where fkMaquinaProcesso = ?
        order by idProcesso desc limit ?;`;

    conexao.query(instrucaoSql, [idMaquina, limite_linhas], (erro, result) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json(result);
        }
    });
}
function buscarInfo(req, res) {

    const idMaquina = req;

    console.log(`Recuperando a info da máquina`);

    const instrucaoSql = `SELECT * FROM Maquina
        where idMaquina = ?;`;

    conexao.query(instrucaoSql, [idMaquina], (erro, result) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = { buscarUltimosProcessos, buscarInfo };