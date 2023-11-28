const express = require('express')
const path = require('path')
const app = require('../index')

const conexao = require('../bd/connection')

class usuario {
  autenticarUser(usuarioInfo, res) {
    var email = usuarioInfo.emailUser
    var senha = usuarioInfo.senhaUser

    if (email == '' || senha == '') {
      res.status(422).json({ message: 'Preencha todos os campos!' })
    } else {
      const sqlQuery = `
                SELECT func.idFuncionario, func.NomeFunc, func.EmailFunc, func.SenhaFunc, func.fkEmpresa, 
                func.fkFuncao, emp.IdEmpresa, emp.NomeEmpresa, funca.idFuncao, funca.tipoFuncao
                FROM Funcionario as func
                JOIN Empresa as emp ON func.fkEmpresa = emp.IdEmpresa
                JOIN Funcao as funca ON func.fkFuncao = funca.idFuncao
                WHERE func.EmailFunc = '${usuarioInfo.emailUser}';
            `

      conexao
        .connect()
        .then(() => {
          return conexao.query(sqlQuery)
        })
        .then(result => {
          if (
            result.recordset.length === 0 ||
            result.recordset[0].SenhaFunc.trim() !== usuarioInfo.senhaUser
          ) {
            // Se não encontrou o email ou a senha está incorreta
            res.status(400).json({ message: 'Email ou senha incorretos!' })
          } else {
            // Usuário autenticado
            res
              .status(200)
              .json({ message: 'Bem-vindo!', valores: result.recordset[0] })
            // Sessões para identificação do usuário
          }
        })
        .catch(erro => {
          res.status(400).json(erro)
        })
        .finally(() => {
          conexao.close() // Fechando a conexão após a consulta ou em caso de erro
        })
    }
  }

  cadastrarEmpresa(empresa, res) {
    const senhaUser = empresa.senha
    const senhaConfUser = empresa.confSenha

    if (
      !empresa.nomeEmpresa ||
      !empresa.razaoSocial ||
      !empresa.cnpj ||
      !empresa.emailRepresentante ||
      !empresa.senha ||
      !empresa.confSenha ||
      !empresa.nomeRepresentante
    ) {
      res.status(422).json({ message: 'Preencha todos os campos!' })
    } else if (
      empresa.emailRepresentante.indexOf('@') === -1 ||
      empresa.emailRepresentante.indexOf('.') === -1
    ) {
      res
        .status(400)
        .json({ message: 'Email inválido, é necessário possuir @ e .' })
    } else if (senhaUser.length !== 8 || senhaConfUser.length !== 8) {
      res
        .status(400)
        .json({ message: 'Senha inválida, é necessário possuir 8 caracteres' })
    } else if (senhaUser !== senhaConfUser) {
      res.status(400).json({ message: 'Senhas não coincidem!' })
    } else {
      const sqlCheckCNPJ = `SELECT CNPJ FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`

      conexao.query(sqlCheckCNPJ, (erro, result) => {
        if (erro) {
          res.status(400).json(erro)
        } else if (result[0]) {
          res.status(203).json({ message: 'CNPJ já em uso!' })
        } else {
          const sqlCheckEmail = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = '${empresa.emailRepresentante}'`

          conexao.query(sqlCheckEmail, (erro, result) => {
            if (erro) {
              res.status(400).json(erro)
            } else if (result[0]) {
              res.status(203).json({ message: 'Email já em uso!' })
            } else {
              // Empresa pode ser cadastrada
              const sqlInsertEmpresa = `INSERT INTO Empresa(NomeEmpresa, RazaoSocial, CNPJ) VALUES ('${empresa.nomeEmpresa}', '${empresa.razaoSocial}', '${empresa.cnpj}')`

              conexao.query(sqlInsertEmpresa, (erro, resultados) => {
                if (erro) {
                  console.error('Erro na consulta SQL:', erro)
                  res.status(400).json(erro)
                } else {
                  const sqlGetIdEmpresa = `SELECT IdEmpresa FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`

                  conexao.query(sqlGetIdEmpresa, (erro, result) => {
                    if (erro) {
                      res.status(400).json(erro)
                    } else {

                      // cadastro do representante
                      const idEmpresa = result.recordset[0].IdEmpresa;
                      const sqlC =
                        `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) 
                          VALUES(${80}, ${60}, ${1}, ${idEmpresa})`
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
                            const idEmpresa = result.recordset[0].IdEmpresa;
                            const sqlR =
                              `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES
                              (75, 60, 2, ${idEmpresa})`
                            conexao.query(
                              sqlR,
                              (erro, results) => {
                                if (erro) {
                                  res.status(400).json(erro);
                                } else {
                                  const idEmpresa = result.recordset[0].IdEmpresa;
                                  const sqlD =
                                    `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) 
                                    VALUES(80, 60, 3, ${idEmpresa})`
                                  conexao.query(
                                    sqlD,
                                    (erro, results) => {
                                      if (erro) {
                                        res.status(400).json(erro);
                                      } else {
                                        const idEmpresa = result.recordset[0].IdEmpresa;
                                        // empresa pode ser cadastrado
                                        const sql =
                                          `INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) 
                                          VALUES (${empresa.nomeRepresentante}, ${empresa.emailRepresentante}, ${empresa.senha}, ${idEmpresa},
                                             1`;

                                        conexao.query(
                                          sql,
                                          (erro, results) => {
                                            if (erro) {
                                              res.status(400).json(erro);
                                            } else {

                                              const sql = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = ${empresa.emailRepresentante}`;

                                              conexao.query(sql, (erro, result) => {
                                                if (erro) {
                                                  res.status(400).json(erro);
                                                } else {

                                                  // cadastro na tebal
                                                  const idFuncionario = result.recordset[0].idFuncionario;

                                                  const sql =
                                                    `INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (${idFuncionario}, 3)`;

                                                  conexao.query(
                                                    sql,
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
    var modoEdicao = funcionario.modoEdicao;

    console.log('MODO EDICAO' + modoEdicao);

    if (modoEdicao == "true") {

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

        const sql = `update Funcionario set NomeFunc = ${funcionario.nomeFuncionario}, EmailFunc = ${funcionario.emailFuncionario},
         SenhaFunc = ${funcionario.senha}, fkEmpresa = ${funcionario.idEmpresa}, 
        fkFuncao = ${funcionario.nivelAcesso} where idFuncionario = ${idFuncionarioAtual}`;

        conexao.query(
          sql,
          (erro, result) => {
            if (erro) {
              console.log(erro);
              res.status(400).json(erro);
            } else if (result.recordset) {
              console.log("To DEPOIS do const ", funcionario.nomeFuncionario);
              const sql =
                `update Chamado set FkTipoAviso = ${funcionario.nivelAviso} where fkFuncionario = ${idFuncionarioAtual}`;

              if (funcionario.nivelAviso == "critico") {
                funcionario.nivelAviso = 1;
              } else if (funcionario.nivelAviso == "alerta") {
                funcionario.nivelAviso = 2;
              } else {
                funcionario.nivelAviso = 3;
              }

              conexao.query(
                sql,
                (erro, result) => {
                  if (erro) {
                    res.status(400).json(erro);
                  } else {
                    res.status(200).json({
                      message: "Funcionário atualizado com sucesso!",
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
        const sql = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = ${funcionario.emailFuncionario}`;
        conexao.query(sql, (erro, result) => {
          if (erro) {
            res.status(400).json(erro);
          } else if (result.recordset[0]) {
            // se achou já cadastrado
            res.status(203).json({ message: "Email já em uso!" });
          } else {
            if (funcionario.nivelAcesso == "adm") {
              funcionario.nivelAcesso = 1;
            } else {
              funcionario.nivelAcesso = 2;
            }

            const sql = `INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) 
            VALUES (${funcionario.nomeFuncionario}, ${funcionario.emailFuncionario},
               ${funcionario.senha}, ${funcionario.idEmpresa}, ${funcionario.nivelAcesso});`;

            conexao.query(
              sql,
              (erro, result) => {
                if (erro) {
                  console.log(erro);
                  res.status(400).json(erro);
                } else {

                  const sql = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = ${funcionario.emailFuncionario}`;

                  conexao.query(
                    sql,
                    (erro, result) => {
                      if (erro) {

                        res.status(400).json(erro);
                      } else {
                        console.log(result.recordset);
                        var idFunc = result.recordset[0].idFuncionario;

                        const sql =
                          `INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (${idFunc}, ${funcionario.nivelAviso})`;

                        if (funcionario.nivelAviso == "critico") {
                          funcionario.nivelAviso = 1;
                        } else if (funcionario.nivelAviso == "alerta") {
                          funcionario.nivelAviso = 2;
                        } else {
                          funcionario.nivelAviso = 3;
                        }

                        conexao.query(
                          sql,
                          (erro, results) => {
                            if (erro) {
                              console.log(erro);
                              res.status(400).json(erro);
                            } else {
                              res.status(200).json({
                                message:
                                  "Funcionário cadastrado com sucesso!",
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

  atualizarUsuarios(dados, res) {

    console.log(dados.idEmpresa);
    console.log(dados.idFunc);
    const sql = `select NomeFunc, idFuncionario from Funcionario where fkEmpresa = ${dados.idEmpresa} and idFuncionario <> ${dados.idFunc} order by NomeFunc;`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        console.log(erro);
        res.status(400).json(erro);
      } else {
        res.status(200).json(result.recordset);
      }
    });
  }

  deletarUsuario(idFuncionario1, res) {
    console.log("ansdnaosn", JSON.stringify(idFuncionario1));

    const idDelete = idFuncionario1.id;
    const sql = `delete from Chamado where fkFuncionario = ${idDelete};`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        console.log(erro);
        res.status(400).json(erro);
      } else {
        const sql = `delete from funcionario where idFuncionario = ${idDelete};`;

        conexao.query(sql, (erro, result) => {
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
              WHERE func.idFuncionario = ${idFuncionario};`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        return res.status(400).json(erro);
      } else if (result.recordset.length === 0) {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      } else {
        // Retorna os dados do funcionário encontrado
        res.status(200).json(result.recordset[0]);
      }
    });
  }

  puxarNomeFuncionario(digitado, res) {
    console.log(digitado);
    const sql = `SELECT NomeFunc, idFuncionario FROM funcionario where NomeFunc LIKE '%${digitado}%'`;

    conexao.query(sql, (erro, result) => {
      if (erro) {
        return res.status(400).json(erro);
      } else if (result.recordset.length === 0) {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      } else {
        // Retorna os dados do funcionário encontrado
        console.log("Dados do funcionário:", result.recordset.NomeFunc);
        res.status(200).json(result.recordset);
      }
    });
  }
}

module.exports = new usuario()
