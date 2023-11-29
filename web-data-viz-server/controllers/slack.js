const express = require("express");
const app = require("../index");
const conexao = require("../bd/connection");


class slack {

    configurarSlack(dados, res) {

        conexao.connect((erroConexao) => {
            if (erroConexao) {
                console.error(erroConexao);
                res.status(500).json({ message: 'Erro de conexão com o banco de dados.' });
                return;
            }
    
            const sql = `UPDATE Empresa SET url = "${dados.formValues.urlSlack}" WHERE idEmpresa = ${dados.formValues.fkEmpresa}`;
    
            conexao.query(sql, (erro, result) => {
                if (erro) {
                    console.log(erro);
                    res.status(400).json(erro);
                } else {
                    res.status(200).json(result);
                }
    
                conexao.close();  // Feche a conexão após as operações serem concluídas
            });
        });
    }
}

module.exports = new slack();
