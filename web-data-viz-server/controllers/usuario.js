const express = require("express");
const path = require("path");
const app = require("../index");

const conexao = require("../bd/connection");

class usuario {

    autenticarUser(usuarioInfo, res) {

        var email = usuarioInfo.emailUser;
        var senha = usuarioInfo.senhaUser;

        if (email == "" || senha == "") {
            res.status(422).json({ message: "Preencha todos os campos!" });
        } else {
            const sqlQuery = `
                SELECT func.idFuncionario, func.NomeFunc, func.EmailFunc, func.SenhaFunc, func.fkEmpresa, 
                func.fkFuncao, emp.IdEmpresa, emp.NomeEmpresa, funca.idFuncao, funca.tipoFuncao
                FROM Funcionario as func
                JOIN Empresa as emp ON func.fkEmpresa = emp.IdEmpresa
                JOIN Funcao as funca ON func.fkFuncao = funca.idFuncao
                WHERE func.EmailFunc = '${usuarioInfo.emailUser}';
            `;

            conexao.connect().then(() => {
                return conexao.query(sqlQuery);
            }).then(result => {
                if (result.recordset.length === 0 || result.recordset[0].SenhaFunc !== usuarioInfo.senhaUser) {
                    // Se não encontrou o email ou a senha está incorreta
                    res.status(400).json({ message: "Email ou senha incorretos!" });
                } else {
                    // Usuário autenticado
                    res.status(200).json({ message: "Bem-vindo!", valores: result.recordset[0] });
                    // Sessões para identificação do usuário
                }
            }).catch(erro => {
                res.status(400).json(erro);
            }).finally(() => {
                conexao.close(); // Fechando a conexão após a consulta ou em caso de erro
            });
        }
    }

    cadastrarEmpresa(empresa, res) {

    const senhaUser = empresa.senha;
    const senhaConfUser = empresa.confSenha;

    if (
        !empresa.nomeEmpresa ||
        !empresa.razaoSocial ||
        !empresa.cnpj ||
        !empresa.emailRepresentante ||
        !empresa.senha ||
        !empresa.confSenha ||
        !empresa.nomeRepresentante
    ) {
        res.status(422).json({ message: "Preencha todos os campos!" });
    } else if (
        empresa.emailRepresentante.indexOf("@") === -1 ||
        empresa.emailRepresentante.indexOf(".") === -1
    ) {
        res.status(400).json({ message: "Email inválido, é necessário possuir @ e ." });
    } else if (senhaUser.length !== 8 || senhaConfUser.length !== 8) {
        res.status(400).json({ message: "Senha inválida, é necessário possuir 8 caracteres" });
    } else if (senhaUser !== senhaConfUser) {
        res.status(400).json({ message: "Senhas não coincidem!" });
    } else {

        const sqlCheckCNPJ = `SELECT CNPJ FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`;

        conexao.query(sqlCheckCNPJ, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else if (result[0]) {
                res.status(203).json({ message: "CNPJ já em uso!" });
            } else {

                const sqlCheckEmail = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = '${empresa.emailRepresentante}'`;

                conexao.query(sqlCheckEmail, (erro, result) => {

                    if (erro) {
                        res.status(400).json(erro);
                    } else if (result[0]) {
                        res.status(203).json({ message: "Email já em uso!" });
                    } else {

                        // Empresa pode ser cadastrada
                        const sqlInsertEmpresa =
                            "INSERT INTO Empresa(NomeEmpresa, RazaoSocial, CNPJ) VALUES (?, ?, ?)";

                        conexao.query(
                            sqlInsertEmpresa,
                            [
                                empresa.nomeEmpresa,
                                empresa.razaoSocial,
                                empresa.cnpj
                            ],
                            (erro, results) => {
                                if (erro) {
                                    res.status(400).json(erro);
                                } else {

                                    const sqlGetIdEmpresa = `SELECT IdEmpresa FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`;

                                    conexao.query(sqlGetIdEmpresa, (erro, result) => {
                                        if (erro) {
                                            res.status(400).json(erro);
                                        } else {

                                            // Cadastro do representante
                                            const idEmpresa = result[0].IdEmpresa;

                                            const sqlInsertFuncionario =
                                                "INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES (?, ?, ?, ?, ?)";

                                            conexao.query(
                                                sqlInsertFuncionario,
                                                [
                                                    empresa.nomeRepresentante,
                                                    empresa.emailRepresentante,
                                                    empresa.senha,
                                                    idEmpresa,
                                                    1
                                                ],
                                                (erro, results) => {
                                                    if (erro) {
                                                        res.status(400).json(erro);
                                                    } else {

                                                        const sqlGetIdFuncionario = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = '${empresa.emailRepresentante}'`;

                                                        conexao.query(sqlGetIdFuncionario, (erro, result) => {
                                                            if (erro) {
                                                                res.status(400).json(erro);
                                                            } else {

                                                                // Cadastro na tabela
                                                                const idFuncionario = result[0].idFuncionario;

                                                                const sqlInsertChamado =
                                                                    "INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (?, ?)";

                                                                conexao.query(
                                                                    sqlInsertChamado,
                                                                    [
                                                                        idFuncionario,
                                                                        1
                                                                    ],
                                                                    (erro, results) => {
                                                                        if (erro) {
                                                                            res.status(400).json(erro);
                                                                        } else {
                                                                            res.status(200).json({ message: "Cadastrado com sucesso, faça seu login!" });
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    });

                                }
                            }
                        );

                    }


                });
            }
        });
    }
}



}

module.exports = new usuario();
