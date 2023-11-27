const express = require("express");
const app = require("../index");
const conexao = require("../bd/connection");


class slack {

    configurarSlack(dados, res) {

        const sql = `UPDATE Empresa SET url = "${dados.formValues.urlSlack}" WHERE idEmpresa = ${dados.formValues.fkEmpresa}`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                console.log(erro);
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        }
        );
    }
}

module.exports = new slack();
