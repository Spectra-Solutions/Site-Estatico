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
            const sql = `
            SELECT func.idFuncionario, func.NomeFunc, func.EmailFunc, func.SenhaFunc, func.fkEmpresa, 
		    func.fkFuncao, emp.IdEmpresa, emp.NomeEmpresa, funca.idFuncao, funca.tipoFuncao
                FROM Funcionario as func
                JOIN Empresa as emp
                    ON func.fkEmpresa = emp.IdEmpresa
                        JOIN Funcao as funca
                            ON func.fkFuncao = funca.idFuncao
                                WHERE func.EmailFunc = (?);
            `;

            conexao.query(sql, [usuarioInfo.emailUser], (erro, result) => {
                if (erro) {
                    res.status(400).json(erro);
                } else if (result.length === 0 || result[0].SenhaFunc !== usuarioInfo.senhaUser) {
                    // se achou o email já cadastrado
                    res.status(400).json({ message: "Email ou senha incorretos!" });

                } else {
                    // usuario autenticado
                    res.status(200).json({ message: "Bem vindo!", valores: result[0] });

                    // sessoes para identificacao do usuario
                }
            });
        }

    }

    // apagarusuario(dados, res) {
    //     console.log(dados.id);

    //     const sql = `DELETE FROM desempenhoSemanal
    //             WHERE fkColaboradorDesempenho IN (
    //                 SELECT idColaborador
    //                 FROM colaborador
    //                 WHERE fkusuario = ${dados.id}
    //             );`;

    //     conexao.query(sql, (erro) => {
    //         if (erro) {
    //             res.status(400).json({ erro: 'Ocorreu um erro ao excluir os dados.' });
    //         } else {
    //             const sql2 = `DELETE FROM lideranca
    //                       WHERE fkColaborador IN (
    //                           SELECT idColaborador
    //                           FROM colaborador
    //                           WHERE fkusuario = ${dados.id}
    //                       );`;
    //             conexao.query(sql2, (erro) => {
    //                 if (erro) {
    //                     res.status(400).json({ erro: 'Ocorreu um erro ao excluir os dados.' });
    //                 } else {
    //                     const sql3 = `DELETE FROM colaborador
    //                               WHERE fkusuario = ${dados.id};`;
    //                     conexao.query(sql3, (erro) => {
    //                         if (erro) {
    //                             res.status(400).json({ erro: 'Ocorreu um erro ao excluir os dados.' });
    //                         } else {
    //                             const sql4 = `DELETE FROM usuario
    //                                       WHERE idusuario = ${dados.id};`;
    //                             conexao.query(sql4, (erro) => {
    //                                 if (erro) {
    //                                     res.status(400).json({ erro: 'Ocorreu um erro ao excluir os dados.' });
    //                                 } else {
    //                                     res.status(200).end();
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }


    // alterarUsuario(usuario, res) {
    //     console.log(usuario);

    //     if (
    //         usuario.nome == "" ||
    //         usuario.sobrenome == "" ||
    //         usuario.email == "" ||
    //         usuario.senha == "" ||
    //         usuario.foto == ""
    //     ) {
    //         res.status(422).json({ message: "Preencha todos os campos!" });
    //     } else {
    //         const sql = `UPDATE usuario SET nome = ?, sobrenome = ?, email = ?, senha = ?, foto = ? WHERE idUsuario = (?)`;

    //         conexao.query(sql, [usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.foto, usuario.idUser], (erro) => {
    //             if (erro) {
    //                 res.status(400).json({ message: "Algo aconteceu!" });
    //             } else {
    //                 res.status(200).json({ message: "Seus dados foram atualizados! Faça login novamente" });
    //             }
    //         });
    //     }
    // }

    cadastrarEmpresa(empresa, res) {

        const senhaUser = empresa.senha;
        const senhaConfUser = empresa.confSenha;

        if (
            [empresa.nomeEmpresa] == "" ||
            [empresa.razaoSocial] == "" ||
            [empresa.cnpj] == "" ||
            [empresa.emailRepresentante] == "" ||
            [empresa.senha] == "" ||
            [empresa.confSenha] == "" ||
            [empresa.nomeRepresentante] == ""
        ) {
            res.status(422).json({ message: "Preencha todos os campos!" });

        } else if (
            empresa["emailRepresentante"].indexOf("@") == -1 ||
            empresa["emailRepresentante"].indexOf(".") == -1
        ) {
            res.status(400).json({ message: "Email inválido, é necessário possuir @ e ." });
        } else if (senhaUser.length != 8 || senhaConfUser.length != 8) {
            res
                .status(400)
                .json({ message: "Senha inválida, é necessário possuir 8 caracteres" });
        } else if (senhaUser != senhaConfUser) {
            res.status(400).json({ message: "Senhas não coincidem!" });
        } else {

            const sql = `SELECT CNPJ FROM Empresa WHERE CNPJ = (?)`;
            conexao.query(sql, [empresa.cnpj], (erro, result) => {
                if (erro) {
                    res.status(400).json(erro);
                } else if (result[0]) {

                    // se achou já cadastrado
                    res.status(203).json({ message: "CNPJ já em uso!" });

                } else {

                    const sql = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = (?)`;
                    conexao.query(sql, [empresa.emailRepresentante], (erro, result) => {

                        if (erro) {
                            res.status(400).json(erro);
                        } else if (result[0]) {
                            // se achou já cadastrado
                            res.status(203).json({ message: "Email já em uso!" });

                        } else {

                            // empresa pode ser cadastrado
                            const sql =
                                "INSERT INTO Empresa(NomeEmpresa, RazaoSocial, CNPJ) VALUES (?, ?, ?)";

                            conexao.query(
                                sql,
                                [
                                    empresa.nomeEmpresa,
                                    empresa.razaoSocial,
                                    empresa.cnpj
                                ],
                                (erro, results) => {
                                    if (erro) {
                                        res.status(400).json(erro);
                                    } else {

                                        const sql = `SELECT IdEmpresa FROM Empresa WHERE CNPJ = (?)`;

                                        conexao.query(sql, [empresa.cnpj], (erro, result) => {
                                            if (erro) {
                                                res.status(400).json(erro);
                                            } else {

                                                // cadastro do representante
                                                const idEmpresa = result[0].IdEmpresa;

                                                // empresa pode ser cadastrado
                                                const sql =
                                                    "INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES (?, ?, ?, ?, ?)";

                                                conexao.query(
                                                    sql,
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

                                                            const sql = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = (?)`;

                                                            conexao.query(sql, [empresa.emailRepresentante], (erro, result) => {
                                                                if (erro) {
                                                                    res.status(400).json(erro);
                                                                } else {

                                                                    // cadastro na tebal
                                                                    const idFuncionario = result[0].idFuncionario;

                                                                    const sql =
                                                                        "INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (?, ?)";

                                                                    conexao.query(
                                                                        sql,
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
