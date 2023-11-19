const express = require("express");
const path = require("path");
const app = require("../index");
const mssql = require('mssql');

const conexao = require("../bd/connection");

class usuario {

    autenticarUser(usuarioInfo, res) {
        console.log(usuarioInfo);

        var email = usuarioInfo.emailUser;
        var senha = usuarioInfo.senhaUser;

        if (email == "" || senha == "") {

            res.status(422).json({ message: "Preencha todos os campos!" });

        } else {
            const sql = `
   SELECT func.idFuncionario, func.NomeFunc, func.EmailFunc, func.SenhaFunc, func.fkEmpresa, 
   func.fkFuncao, emp.IdEmpresa, emp.NomeEmpresa, funca.idFuncao, funca.tipoFuncao
   FROM Funcionario AS func
   JOIN Empresa AS emp ON func.fkEmpresa = emp.IdEmpresa
   JOIN Funcao AS funca ON func.fkFuncao = funca.idFuncao
   WHERE func.EmailFunc = @email;
`;

            const request = conexao.request();
            request.input('email', email);

            request.query(sql, (erro, result) => {
                console.log(result);
                console.log(result.recordset.length)
                console.log(result.recordset[0].SenhaFunc)
                if (erro) {
                    console.log("erro na query");
                    console.log(erro);
                    res.status(400).json(erro);
                } else if (result.recordset.length === 0 || result.recordset[0].SenhaFunc.trim() !== usuarioInfo.senhaUser.trim()) {

                    // se achou o email já cadastrado
                    res.status(400).json({ message: "Email ou senha incorretos!" });

                } else {
                    // usuario autenticado
                    res.status(200).json({ message: "Bem vindo!", valores: result.recordset[0] });

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
            
            // Check if CNPJ is already in use
            const sqlSelectCnpj = "SELECT CNPJ FROM Empresa WHERE CNPJ = @cnpj";
            const requestCnpj = conexao.request();
            requestCnpj.input('cnpj', mssql.VarChar, empresa.cnpj);

            requestCnpj.query(sqlSelectCnpj, (erroCnpj, resultCnpj) => {
                if (erroCnpj) {
                    res.status(400).json(erroCnpj);
                } else if (resultCnpj.recordset[0]) {
                    // If CNPJ is found, it's already registered
                    res.status(203).json({ message: "CNPJ já em uso!" });
                } else {
                    // Check if Email is already in use
                    const sqlSelectEmail = "SELECT EmailFunc FROM Funcionario WHERE EmailFunc = @emailRepresentante";
                    const requestEmail = conexao.request();
                    requestEmail.input('emailRepresentante', mssql.VarChar, empresa.emailRepresentante);

                    requestEmail.query(sqlSelectEmail, (erroEmail, resultEmail) => {
                        if (erroEmail) {
                            res.status(400).json(erroEmail);
                        } else if (resultEmail.recordset[0]) {
                            // If Email is found, it's already registered
                            res.status(203).json({ message: "Email já em uso!" });
                        } else {
                            // Register the Empresa (Company)
                            const sqlInsertEmpresa = "INSERT INTO Empresa(NomeEmpresa, RazaoSocial, CNPJ) VALUES (@nomeEmpresa, @razaoSocial, @cnpj)";
                            const requestInsertEmpresa = conexao.request();
                            requestInsertEmpresa.input('nomeEmpresa', mssql.VarChar, empresa.nomeEmpresa);
                            requestInsertEmpresa.input('razaoSocial', mssql.VarChar, empresa.razaoSocial);
                            requestInsertEmpresa.input('cnpj', mssql.VarChar, empresa.cnpj);

                            requestInsertEmpresa.query(sqlInsertEmpresa, (erroInsertEmpresa, resultsEmpresa) => {
                                if (erroInsertEmpresa) {
                                    res.status(400).json(erroInsertEmpresa);
                                } else {
                                    // Get the ID of the registered Empresa
                                    const sqlSelectIdEmpresa = "SELECT IdEmpresa FROM Empresa WHERE CNPJ = @cnpj";
                                    const requestSelectIdEmpresa = conexao.request();
                                    requestSelectIdEmpresa.input('cnpj', mssql.VarChar, empresa.cnpj);

                                    requestSelectIdEmpresa.query(sqlSelectIdEmpresa, (erroIdEmpresa, resultIdEmpresa) => {
                                        if (erroIdEmpresa) {
                                            res.status(400).json(erroIdEmpresa);
                                        } else {
                                            // Register the Funcionario (Representative)
                                            const idEmpresa = resultIdEmpresa.recordset[0].IdEmpresa;
                                            const sqlInsertFuncionario = "INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES (@nomeRepresentante, @emailRepresentante, @senha, @idEmpresa, @funcao)";
                                            const requestInsertFuncionario = conexao.request();
                                            requestInsertFuncionario.input('nomeRepresentante', mssql.VarChar, empresa.nomeRepresentante);
                                            requestInsertFuncionario.input('emailRepresentante', mssql.VarChar, empresa.emailRepresentante);
                                            requestInsertFuncionario.input('senha', mssql.VarChar, empresa.senha);
                                            requestInsertFuncionario.input('idEmpresa', mssql.Int, idEmpresa);
                                            requestInsertFuncionario.input('funcao', mssql.Int, 1);

                                            requestInsertFuncionario.query(sqlInsertFuncionario, (erroInsertFuncionario, resultsFuncionario) => {
                                                if (erroInsertFuncionario) {
                                                    res.status(400).json(erroInsertFuncionario);
                                                } else {
                                                    // Get the ID of the registered Funcionario
                                                    const sqlSelectIdFuncionario = "SELECT idFuncionario FROM Funcionario WHERE EmailFunc = @emailRepresentante";
                                                    const requestSelectIdFuncionario = conexao.request();
                                                    requestSelectIdFuncionario.input('emailRepresentante', mssql.VarChar, empresa.emailRepresentante);

                                                    requestSelectIdFuncionario.query(sqlSelectIdFuncionario, (erroIdFuncionario, resultIdFuncionario) => {
                                                        if (erroIdFuncionario) {
                                                            res.status(400).json(erroIdFuncionario);
                                                        } else {
                                                            // Register the Chamado (Notification)
                                                            const idFuncionario = resultIdFuncionario.recordset[0].idFuncionario;
                                                            const sqlInsertChamado = "INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (@idFuncionario, @tipoAviso)";
                                                            const requestInsertChamado = conexao.request();
                                                            requestInsertChamado.input('idFuncionario', mssql.Int, idFuncionario);
                                                            requestInsertChamado.input('tipoAviso', mssql.Int, 1);

                                                            requestInsertChamado.query(sqlInsertChamado, (erroInsertChamado, resultsChamado) => {
                                                                if (erroInsertChamado) {
                                                                    res.status(400).json(erroInsertChamado);
                                                                } else {
                                                                    res.status(200).json({ message: "Cadastrado com sucesso, faça seu login!" });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

        }
    }


}

module.exports = new usuario();
