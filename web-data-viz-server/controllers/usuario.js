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
        // .finally(() => {
        //   conexao.close() // Fechando a conexão após a consulta ou em caso de erro
        // })
    }
  }

  cadastrarEmpresa(empresa, res) {
    const senhaUser = empresa.senha;
    const senhaConfUser = empresa.confSenha;
    let idEmpresa; // Declare a variável aqui para garantir o escopo adequado.

    // Verificação se o e-mail já está em uso
    const sqlCheckEmail = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = '${empresa.emailRepresentante}'`;

    conexao
        .connect()
        .then(() => conexao.query(sqlCheckEmail))
        .then((result) => {
            if (result.recordset && result.recordset.length > 0) {
                res.status(203).json({ message: 'E-mail já em uso!' });
                throw new Error('E-mail já em uso!');
            } else {
    if (
      !empresa.nomeEmpresa ||
      !empresa.razaoSocial ||
      !empresa.cnpj ||
      !empresa.emailRepresentante ||
      !empresa.senha ||
      !empresa.confSenha ||
      !empresa.nomeRepresentante
    ) {
      return res.status(422).json({ message: 'Preencha todos os campos!' });
    }

    if (empresa.emailRepresentante.indexOf('@') === -1 || empresa.emailRepresentante.indexOf('.') === -1) {
      return res.status(400).json({ message: 'Email inválido, é necessário possuir @ e .' });
    }

    if (senhaUser.length !== 8 || senhaConfUser.length !== 8 || senhaUser !== senhaConfUser) {
      return res.status(400).json({ message: 'Senha inválida, é necessário possuir 8 caracteres e as senhas devem coincidir.' });
    }

    const sqlCheckCNPJ = `SELECT CNPJ FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`;

    conexao
      .connect()
      .then(() => conexao.query(sqlCheckCNPJ))
      .then((result) => {

        if (result.recordset && result.recordset.length > 0) {
          res.status(203).json({ message: 'CNPJ já em uso!' });
        }

        // Cadastro da empresa
        const sqlInsertEmpresa = `INSERT INTO Empresa(NomeEmpresa, RazaoSocial, CNPJ) VALUES ('${empresa.nomeEmpresa}', '${empresa.razaoSocial}', '${empresa.cnpj}')`;
        return conexao.query(sqlInsertEmpresa);
      })
      .then(() => {
        // Obter o ID da empresa recém-cadastrada
        const sqlGetIdEmpresa = `SELECT IdEmpresa FROM Empresa WHERE CNPJ = '${empresa.cnpj}'`;
        return conexao.query(sqlGetIdEmpresa);
      })
      .then((result) => {
        if (result.recordset && result.recordset.length > 0) {
          idEmpresa = result.recordset[0].IdEmpresa;

          // Cadastro das taxas de aviso
          const sqlC = `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(${80}, ${60}, ${1}, ${idEmpresa})`;
          const sqlR = `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(75, 60, 2, ${idEmpresa})`;
          const sqlD = `INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES(80, 60, 3, ${idEmpresa})`;

          return Promise.all([
            conexao.query(sqlC),
            conexao.query(sqlR),
            conexao.query(sqlD),
          ]);
        } else {
          throw new Error('Erro ao cadastrar a empresa.');
        }
      })
      .then(() => {
        // Cadastro do representante
        const sqlFuncionario = `INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES ('${empresa.nomeRepresentante}', '${empresa.emailRepresentante}', '${empresa.senha}', ${idEmpresa}, 1)`;
        return conexao.query(sqlFuncionario);
      })
      .then(() => {
        // Obter o ID do representante recém-cadastrado
        const sqlGetIdFuncionario = `SELECT idFuncionario FROM Funcionario WHERE EmailFunc = '${empresa.emailRepresentante}'`;
        return conexao.query(sqlGetIdFuncionario);
      })
      .then((result) => {
        if (result.recordset && result.recordset.length > 0) {
          const idFuncionario = result.recordset[0].idFuncionario;

          // Cadastro na tabela Chamado
          const sqlChamado = `INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (${idFuncionario}, 3)`;
          return conexao.query(sqlChamado);
        } else {
          throw new Error('Erro ao obter o ID do funcionário.');
        }
      })
      .then(() => {
        return res.status(200).json({ message: 'Cadastrado com sucesso, faça seu login!' });
      })
    }
  })
  .catch((erro) => {
      console.error('Erro na operação:', erro);
  })
      // .finally(() => {
      //   conexao.close();
      // });
  }

  cadastrarFuncionario(funcionario, res) {

    var idFuncionarioAtual = funcionario.idFuncionario;
    var modoEdicao = funcionario.modoEdicao;
    var novoIdFuncionario;

    conexao
        .connect()
        .then(() => {

            if (
                !funcionario.nomeFuncionario ||
                !funcionario.emailFuncionario ||
                !funcionario.senha ||
                !funcionario.idEmpresa ||
                !funcionario.nivelAviso ||
                !funcionario.nivelAcesso
            ) {
                res.status(422).json({ message: "Preencha todos os campos!" });
                return Promise.reject('erro');
            } else if (funcionario.emailFuncionario.indexOf("@") === -1 || funcionario.emailFuncionario.indexOf(".") === -1) {
                res.status(400).json({ message: "Email inválido, é necessário possuir @ e ." });
                return Promise.reject('erro');
            } else if (funcionario.senha.length !== 8) {
                res.status(400).json({ message: "Senha inválida, é necessário possuir 8 caracteres" });
                return Promise.reject('erro');
            } else {

                if (modoEdicao == "true") {
                    console.log("atualizar");

                    if (funcionario.nivelAcesso === "adm") {
                        funcionario.nivelAcesso = 1;
                    } else {
                        funcionario.nivelAcesso = 2;
                    }

                    if (funcionario.nivelAviso == "critico") {
                        funcionario.nivelAviso = 1;
                    } else if (funcionario.nivelAviso == "alerta") {
                        funcionario.nivelAviso = 2;
                    } else {
                        funcionario.nivelAviso = 3;
                    }

                    const sqlUpdate = `update Funcionario set NomeFunc = '${funcionario.nomeFuncionario}', EmailFunc = '${funcionario.emailFuncionario}', SenhaFunc = '${funcionario.senha}', fkEmpresa = ${funcionario.idEmpresa}, fkFuncao = ${funcionario.nivelAcesso} where idFuncionario = ${idFuncionarioAtual}`;

                    return conexao.query(sqlUpdate);

                } else {
                    console.log("criacao");

                    const sqlSelect = `SELECT EmailFunc FROM Funcionario WHERE EmailFunc = '${funcionario.emailFuncionario}'`;

                    return conexao.query(sqlSelect);
                }

            }



        }).then((result) => {
            if (result && result.recordset && result.recordset.length > 0) {
                res.status(203).json({ message: 'Email já em uso!' });
                return Promise.reject('erro');
            }
            else {
                if (funcionario.nivelAcesso === "adm") {
                    funcionario.nivelAcesso = 1;
                } else {
                    funcionario.nivelAcesso = 2;
                }

                if (funcionario.nivelAviso == "critico") {
                    funcionario.nivelAviso = 1;
                } else if (funcionario.nivelAviso == "alerta") {
                    funcionario.nivelAviso = 2;
                } else {
                    funcionario.nivelAviso = 3;
                }

                if (modoEdicao === "true") {
                    const sqlUpdateChamado = `update Chamado set FkTipoAviso = ${funcionario.nivelAviso} where fkFuncionario = ${idFuncionarioAtual}`;

                    return conexao.query(sqlUpdateChamado);
                } else {
                    const sqlInsertFuncionario = `INSERT INTO Funcionario(NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES ('${funcionario.nomeFuncionario}', '${funcionario.emailFuncionario}', '${funcionario.senha}', ${funcionario.idEmpresa}, ${funcionario.nivelAcesso}) SELECT SCOPE_IDENTITY() AS idFuncionario;`;

                    // Inserir na tabela Funcionario e obter o idFuncionario
                    return conexao.query(sqlInsertFuncionario);
                }
            }

        })
        .then((result) => {
            if (modoEdicao !== "true") {
                // Capturar o idFuncionario recém-inserido
                novoIdFuncionario = result.recordset[0].idFuncionario;

                // Inserir na tabela Chamado usando o novoIdFuncionario
                const sqlInsertChamado = `INSERT INTO Chamado(fkFuncionario, FKTipoAviso) VALUES (${novoIdFuncionario}, ${funcionario.nivelAviso})`;

                return conexao.query(sqlInsertChamado);
            }
        })
        .then(() => {
            res.status(200).json({ message: 'Operação concluída com sucesso!' });
        })
        .catch((erro) => {
            console.error('Erro na operação:', erro);

        })
        .finally(() => {

            conexao.close();
        });

}

atualizarUsuarios(dados, res) {

  console.log(dados.idEmpresa);
  console.log(dados.idFunc);
  const sql = `select NomeFunc, idFuncionario from Funcionario where fkEmpresa = ${dados.idEmpresa} and idFuncionario <> ${dados.idFunc} order by NomeFunc;`;

  conexao
      .connect()
      .then(() => {
          return conexao.query(sql);
      })
      .then((result) => {
          res.status(200).json(result.recordset);
      })
      .catch((erro) => {
          console.error('Erro na operação:', erro);
          res.status(500).json({ message: 'Erro na operação no banco de dados.' });
      })
      // .finally(() => {
      //     // Feche a conexão após todas as operações serem concluídas ou em caso de erro
      //     conexao.close();
      // });
}

deletarUsuario(idFuncionario1, res) {
  console.log("ansdnaosn", JSON.stringify(idFuncionario1));

  conexao.connect((erroConexao) => {
      if (erroConexao) {
          console.error(erroConexao);
          res.status(500).json({ message: 'Erro de conexão com o banco de dados.' });
          return;
      }

      const idDelete = idFuncionario1.id;
      const sqlChamado = `delete from Chamado where fkFuncionario = ${idDelete}`;
      const sqlFuncionario = `delete from Funcionario where idFuncionario = ${idDelete}`;

      conexao.query(sqlChamado, (erroChamado, resultChamado) => {
          if (erroChamado) {
              console.error(erroChamado);
              res.status(400).json(erroChamado);
              return;
          }

          conexao.query(sqlFuncionario, (erroFuncionario, resultFuncionario) => {
              if (erroFuncionario) {
                  console.error(erroFuncionario);
                  res.status(400).json(erroFuncionario);
              } else {
                  res.status(200).json(resultFuncionario);
              }

              // conexao.close();  // Feche a conexão após as operações serem concluídas
          });
      });
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

  conexao
      .connect()
      .then(() => {
          return conexao.query(sql);
      })
      .then((result) => {
        console.log(result.recordset);
          res.status(200).json(result.recordset[0]);
      })
      .catch((erro) => {
          console.error('Erro na operação:', erro);
          res.status(500).json({ message: 'Erro na operação no banco de dados.' });
      })
      // .finally(() => {
      //     // Feche a conexão após todas as operações serem concluídas ou em caso de erro
      //     // conexao.close();
      // });
}

puxarNomeFuncionario(digitado, res) {
const sql = `SELECT NomeFunc, idFuncionario FROM funcionario WHERE NomeFunc LIKE '%${digitado}%';`;

conexao
    .connect()
    .then(() => conexao.query(sql))
    .then((result) => {
        const funcionarios = result.recordset;
        if (funcionarios.length === 0) {
            res.status(404).json({ error: "Funcionário não encontrado" });
        } else {
            res.status(200).json(funcionarios);
        }
    })
    .catch((erro) => {
        console.error('Erro na operação:', erro);
        res.status(400).json({ message: 'Erro na operação no banco de dados.' });
    })
    // .finally(() => conexao.close());
}


}

module.exports = new usuario()
