const express = require("express");
const app = require("../index");
const conexao = require("../bd/connection");


class slack {

    configurarSlack(dados, res) {

        if(dados.formValues.fkEmpresa == "" || dados.formValues.urlSlack == ""){
            return res.status(422).json({ message: 'Preencha todos os campos!' });

        }else if(dados.formValues.urlSlack === 'Insira a URL'){
            return res.status(400).json({ message: 'Preencha o campo URL!' });
        }else{
            conexao.connect((erroConexao) => {
                if (erroConexao) {
                    console.error(erroConexao);
                    res.status(500).json({ message: 'Erro de conexão com o banco de dados.' });
                    return;
                }
                console.log("SLACK DADOS:" + dados.formValues.urlSlack);
                console.log("SLACK DADOS:" + dados.formValues.fkEmpresa);
                const sql = `UPDATE Empresa SET url = '${dados.formValues.urlSlack}' WHERE idEmpresa = ${dados.formValues.fkEmpresa}`;
        
                conexao.query(sql, (erro, result) => {
                    if (erro) {
                        console.log(erro);
                        res.status(400).json(erro);
                    } else {
                        res.status(200).json(result);
                    }
        
                    // conexao.close();  // Feche a conexão após as operações serem concluídas
                });
            });
        }
        
    }
}

module.exports = new slack();
