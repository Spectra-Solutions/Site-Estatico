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
		    func.fkFuncao, emp.url, emp.IdEmpresa, emp.NomeEmpresa, funca.idFuncao, funca.tipoFuncao
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
                                                const sqlC =
                                                    `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(?, ?, ?, ?)`
                                                conexao.query(
                                                    sqlC,
                                                    [
                                                        80,
                                                        60,
                                                        1,
                                                        idEmpresa

                                                    ],
                                                    (erro, results) => {
                                                        if (erro) {
                                                            res.status(400).json(erro);
                                                        } else {
                                                            const idEmpresa = result[0].IdEmpresa;
                                                            const sqlR =
                                                                `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(?, ?, ?, ?)`
                                                            conexao.query(
                                                                sqlR,
                                                                [
                                                                    75,
                                                                    60,
                                                                    2,
                                                                    idEmpresa

                                                                ],
                                                                (erro, results) => {
                                                                    if (erro) {
                                                                        res.status(400).json(erro);
                                                                    } else {
                                                                        const idEmpresa = result[0].IdEmpresa;
                                                                        const sqlD =
                                                                            `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(?, ?, ?, ?)`
                                                                        conexao.query(
                                                                            sqlD,
                                                                            [
                                                                                80,
                                                                                60,
                                                                                3,
                                                                                idEmpresa

                                                                            ],
                                                                            (erro, results) => {
                                                                                if (erro) {
                                                                                    res.status(400).json(erro);
                                                                                } else {
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
                                                                });
                                                        }
                                                    });
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

    cadastrarFuncionario(funcionario, res) {
      var idFuncionarioAtual = funcionario.idFuncionario
      console.log("id do funcionario novo: ",idFuncionarioAtual);
      var modoEdicao = funcionario.modoEdicao;
      console.log(modoEdicao);
      if (modoEdicao === "true") {
        console.log("atualizar");
        if (
          [funcionario.nomeFuncionario] == "" ||
          [funcionario.emailFuncionario] == "" ||
          [funcionario.senha] == "" ||
          [funcionario.idEmpresa] == "" ||
          [funcionario.nivelAviso] == "" ||
          [funcionario.nivelAcesso] == "" 
        ) {
          res.status(422).json({ message: "Preencha todos os campos!" });
        } else if (
          funcionario["emailFuncionario"].indexOf["@"] == -1 ||
          funcionario["emailFuncionario"].indexOf["."] == -1
        ) {
          res
            .status(400)
            .json({ message: "Email inválido, é necessário possuir @ e ." });
        } else if (funcionario.senha.length != 8) {
          res.status(400).json({
            message: "Senha inválida, é necessário possuir 8 caracteres",
          });
        } else {
          if (funcionario.nivelAcesso == "adm") {
            funcionario.nivelAcesso = 1;
          } else {
            funcionario.nivelAcesso = 2;
          }

          console.log("To antes do const ", funcionario.nomeFuncionario);

          const sql = `update Funcionario set NomeFunc = (?), EmailFunc = (?), SenhaFunc = (?), fkEmpresa = (?), fkFuncao = (?) where idFuncionario = (?)`;

          conexao.query(
            sql,
            [
              funcionario.nomeFuncionario,
              funcionario.emailFuncionario,
              funcionario.senha,
              funcionario.idEmpresa,
              funcionario.nivelAcesso,
              idFuncionarioAtual,
            ],
            (erro, result) => {
              if (erro) {
                console.log(erro);
                res.status(400).json(erro);
              } else if (result) {
                console.log("To DEPOIS do const ", funcionario.nomeFuncionario);
                const sql =
                  "update Chamado set FkTipoAviso = (?) where fkFuncionario = (?)";

                if (funcionario.nivelAviso == "critico") {
                  funcionario.nivelAviso = 1;
                } else if (funcionario.nivelAviso == "alerta") {
                  funcionario.nivelAviso = 2;
                } else {
                  funcionario.nivelAviso = 3;
                }

                conexao.query(
                  sql,
                  [funcionario.nivelAviso, idFuncionarioAtual],
                  (erro, result) => {
                    if (erro) {
                      res.status(400).json(erro);
                    } else {
                      res.status(200).json({
                        message: "Usuario atualizado com sucesso!",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        console.log("criação");
        if (
          [funcionario.nomeFuncionario] == "" ||
          [funcionario.emailFuncionario] == "" ||
          [funcionario.senha] == "" ||
          [funcionario.idEmpresa] == "" ||
          [funcionario.nivelAviso] == "" ||
          [funcionario.nivelAcesso] == ""
        ) {
          res.status(422).json({ message: "Preencha todos os campos!" });
        } else if (
          funcionario["emailFuncionario"].indexOf["@"] == -1 ||
          funcionario["emailFuncionario"].indexOf["."] == -1
        ) {
          res
            .status(400)
            .json({ message: "Email inválido, é necessário possuir @ e ." });
        } else if (funcionario.senha.length != 8) {
          res.status(400).json({
            message: "Senha inválida, é necessário possuir 8 caracteres",
          });
        } else {
          const sql = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = (?)`;
          conexao.query(sql, [funcionario.emailFuncionario], (erro, result) => {
            if (erro) {
              res.status(400).json(erro);
            } else if (result[0]) {
              // se achou já cadastrado
              res.status(203).json({ message: "Email já em uso!" });
            } else {
              if (funcionario.nivelAcesso == "adm") {
                funcionario.nivelAcesso = 1;
              } else {
                funcionario.nivelAcesso = 2;
              }

              const sql = `INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES (?, ?, ?, ?, ?);`;

              conexao.query(
                sql,
                [
                  funcionario.nomeFuncionario,
                  funcionario.emailFuncionario,
                  funcionario.senha,
                  funcionario.idEmpresa,
                  funcionario.nivelAcesso,
                ],
                (erro, result) => {
                  if (erro) {
                    console.log(erro);
                    res.status(400).json(erro);
                  } else {
                    
                    const sql = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = (?)`;

                    conexao.query(
                      sql,
                      [funcionario.emailFuncionario],
                      (erro, result) => {
                        if (erro) {
                          
                          res.status(400).json(erro);
                        } else {
                          console.log(result);
                          var idFunc = result[0].idFuncionario;
                          
                          const sql =
                            "INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (?, ?)";

                          if (funcionario.nivelAviso == "critico") {
                            funcionario.nivelAviso = 1;
                          } else if (funcionario.nivelAviso == "alerta") {
                            funcionario.nivelAviso = 2;
                          } else {
                            funcionario.nivelAviso = 3;
                          }

                          conexao.query(
                            sql,
                            [idFunc, funcionario.nivelAviso],
                            (erro, results) => {
                              if (erro) {
                                console.log(erro);
                                res.status(400).json(erro);
                              } else {
                                res.status(200).json({
                                  message:
                                    "Cadastrado com sucesso, faça seu login!",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    }

  atualizarUsuarios(id, res) {
    const sql = `select NomeFunc, idFuncionario from Funcionario order by NomeFunc;`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(result);
      }
    });
  }

  deletarUsuario(idFuncionario1, res) {
    console.log("ansdnaosn", JSON.stringify(idFuncionario1));

    const idDelete = idFuncionario1.id;
    const sql = `delete from Chamado where fkFuncionario = (?);`;

    conexao.query(sql, [idDelete], (erro, result) => {
      if (erro) {
        console.log(erro);
        res.status(400).json(erro);
      } else {
        const sql = `delete from funcionario where idFuncionario = (?);`;

        conexao.query(sql, [idDelete], (erro, result) => {
          if (erro) {
            console.log(erro);
            res.status(400).json(erro);
          } else {
            res.status(200).json(result);
          }
        });
      }
    });
  }

  editarFuncionario(idFuncionario, res) {
    const sql = `SELECT func.idFuncionario, func.NomeFunc, func.EmailFunc, func.SenhaFunc, func.fkEmpresa,
    func.fkFuncao, emp.IdEmpresa, emp.NomeEmpresa, funca.tipoFuncao, tp.nomeAviso
      FROM Funcionario as func
        JOIN Empresa as emp ON func.fkEmpresa = emp.IdEmpresa
          JOIN Funcao as funca ON func.fkFuncao = funca.idFuncao
            JOIN Chamado as cham ON func.idFuncionario = cham.fkFuncionario
              JOIN TipoAviso as tp ON cham.FKTipoAviso = tp.idTipoAviso 
                WHERE func.idFuncionario = (?);`;

    conexao.query(sql, [idFuncionario], (erro, result) => {
      if (erro) {
        return res.status(400).json(erro);
      } else if (result.length === 0) {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      } else {
        // Retorna os dados do funcionário encontrado
        res.status(200).json(result[0]);
      }
    });
  }

  puxarNomeFuncionario(digitado, res) {
    console.log(digitado);
    const sql = `SELECT NomeFunc, idFuncionario FROM funcionario where NomeFunc LIKE "%${digitado}%"`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        return res.status(400).json(erro);
      } else if (result.length === 0) {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      } else {
        // Retorna os dados do funcionário encontrado
        console.log("Dados do funcionário:", result.NomeFunc);
        res.status(200).json(result);
      }
    });
  }



}

module.exports = new usuario();




