const express = require("express");
const app = require("../index");
const moment = require("moment");
const dtHora = moment();
const weekNumber = moment().week();

const conexao = require("../bd/connection");


class dashboard {

    //   cadastrarColaborador(dadosColaborador, res) {

    //     const nome = dadosColaborador.nome;
    //     const email = dadosColaborador.email;
    //     const cpf = dadosColaborador.cpf;
    //     const fortes = dadosColaborador.positivos;
    //     const fracos = dadosColaborador.negativos;
    //     const objetivo = dadosColaborador.objetivo;
    //     const plano = dadosColaborador.plano;
    //     const caracteristica = dadosColaborador.caracteristicas;
    //     const idUser = dadosColaborador.userLogado;
    //     const foto = dadosColaborador.foto;

    //     if (
    //       [nome] == "" ||
    //       [email] == "" ||
    //       [cpf] == "" ||
    //       [fortes] == "" ||
    //       [fracos] == "" ||
    //       [objetivo] == "" ||
    //       [plano] == "" || [foto] == ""
    //     ) {
    //       res.status(422).json({ message: "Preencha todos os campos!" });
    //     } else if ([caracteristica] == "") {
    //       res
    //         .status(400)
    //         .json({
    //           message:
    //             "Ops, o colaborador precisa ter pelo menos 1 característica!",
    //         });
    //     } else if (cpf.length != 14) {
    //       res.status(400).json({ message: "CPF inválido!" });
    //     } else {
    //       const sql = `SELECT cpf FROM colaborador WHERE cpf = (?)`;
    //       conexao.query(sql, [dadosColaborador.cpf], (erro, result) => {
    //         if (erro) {
    //           res.status(400).json(erro);
    //         } else if (result[0]) {
    //           // se achou o email já cadastrado
    //           res.status(203).json({ message: "CPF já em uso" });
    //         } else {
    //           // usuario pode ser cadastrado
    //           const sql =
    //             "INSERT INTO colaborador(nome, email, cpf, pontosFortes, pontosFracos, objetivo, plano, fkusuario, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    //           conexao.query(
    //             sql,
    //             [
    //               dadosColaborador.nome,
    //               dadosColaborador.email,
    //               dadosColaborador.cpf,
    //               dadosColaborador.negativos,
    //               dadosColaborador.positivos,
    //               dadosColaborador.objetivo,
    //               dadosColaborador.plano,
    //               idUser,
    //               dadosColaborador.foto,
    //             ],
    //             (erro, results) => {
    //               if (erro) {
    //                 res.status(400).json(erro);
    //               } else {
    //                 const sql = `SELECT idColaborador FROM colaborador WHERE cpf = (?)`;

    //                 conexao.query(sql, [dadosColaborador.cpf], (erro, result) => {

    //                   if (erro) {
    //                     res.status(400).json(erro);
    //                   } else {

    //                     const idColaborador = result[0].idColaborador;

    //                     console.log(caracteristica);

    //                     //definir quais foram os tipos de lideres escolhidos para o colaborador

    //                     for (var i = 0; i <= caracteristica.length - 1; i++) {
    //                       var idCarac = 0;
    //                       var liderancaTipo = "";

    //                       // pesquisar qual o id da caracteristica
    //                       const sql = `SELECT idCaracteristica FROM caracteristica WHERE descricao = (?)`;
    //                       conexao.query(sql, caracteristica[i], (erro, result) => {
    //                         if (erro) {
    //                           res.status(400).json(erro);
    //                         } else {
    //                           idCarac = result[0].idCaracteristica;

    //                           // validar lider
    //                           if (idCarac <= 3) {
    //                             liderancaTipo = "Professor";
    //                           } else if (idCarac <= 6) {
    //                             liderancaTipo = "Apaixonado";
    //                           } else if (idCarac <= 9) {
    //                             liderancaTipo = "Experiente";
    //                           } else if (idCarac <= 12) {
    //                             liderancaTipo = "Defensor";
    //                           } else if (idCarac <= 15) {
    //                             liderancaTipo = "Inspirador";
    //                           } else if (idCarac <= 18) {
    //                             liderancaTipo = "Gestor";
    //                           } else {
    //                             liderancaTipo = "Visionário";
    //                           }

    //                           const sql =
    //                             "INSERT INTO lideranca(fkColaborador, fkCaracteristica, tipoLider) VALUES (?, ?, ?)";
    //                           conexao.query(
    //                             sql,
    //                             [idColaborador, idCarac, liderancaTipo],
    //                             (erro, results) => {
    //                               if (erro) {
    //                                 res.status(400).json(erro);
    //                               }
    //                             }
    //                           );
    //                         }
    //                       });
    //                     }

    //                     res
    //                       .status(200)
    //                       .json({ message: "Colaborador cadastrado com sucesso!" });
    //                   }
    //                 });
    //               }
    //             }
    //           );
    //         }
    //       });
    //     }
    //   }

    //   atualizarColaborador(dadosColaborador, res) {

    //     const nome = dadosColaborador.nome;
    //     const email = dadosColaborador.email;
    //     const cpf = dadosColaborador.cpf;
    //     const fortes = dadosColaborador.positivos;
    //     const fracos = dadosColaborador.negativos;
    //     const objetivo = dadosColaborador.objetivo;
    //     const plano = dadosColaborador.plano;
    //     const foto = dadosColaborador.foto;
    //     const idColab = dadosColaborador.idColab;

    //     const dadosAtualizados = {
    //       nome: nome,
    //       email: email,
    //       cpf: cpf,
    //       pontosFortes: fortes,
    //       pontosFracos: fracos,
    //       objetivo: objetivo,
    //       plano: plano,
    //       foto: foto,

    //     };

    //     console.log(dadosAtualizados)

    //     const caracteristica = dadosColaborador.caracteristicas;

    //     if (
    //       [nome] == "" ||
    //       [email] == "" ||
    //       [cpf] == "" ||
    //       [fortes] == "" ||
    //       [fracos] == "" ||
    //       [objetivo] == "" ||
    //       [plano] == "" || [foto] == ""
    //     ) {
    //       res.status(422).json({ message: "Preencha todos os campos!" });
    //     } else if ([caracteristica] == "") {
    //       res
    //         .status(400)
    //         .json({
    //           message:
    //             "Ops, o colaborador precisa ter pelo menos 1 característica!",
    //         });
    //     } else if (cpf.length != 14) {
    //       res.status(400).json({ message: "CPF inválido!" });
    //     } else {


    //       // usuario pode ser cadastrado
    //       const sql =
    //         "UPDATE colaborador SET ? WHERE idColaborador = ?";

    //       conexao.query(
    //         sql,
    //         [dadosAtualizados, idColab],
    //         (erro, results) => {
    //           if (erro) {
    //             res.status(400).json(erro);
    //           } else {

    //             const sql = `SELECT idColaborador FROM colaborador WHERE cpf = (?)`;

    //             conexao.query(sql, [dadosColaborador.cpf], (erro, result) => {
    //               if (erro) {
    //                 res.status(400).json(erro);
    //               } else {
    //                 const idColaborador = result[0].idColaborador;

    //                 console.log(caracteristica);

    //                 const sql = `DELETE FROM lideranca WHERE fkColaborador = ${idColaborador};`;

    //                 conexao.query(sql, (erro, result) => {
    //                   if (erro) {
    //                     res.status(400).json(erro);
    //                   } else {

    //                     //definir quais foram os tipos de lideres escolhidos para o colaborador

    //                     for (var i = 0; i <= caracteristica.length - 1; i++) {
    //                       var idCarac = 0;
    //                       var liderancaTipo = "";

    //                       // pesquisar qual o id da caracteristica
    //                       const sql = `SELECT idCaracteristica FROM caracteristica WHERE descricao = (?)`;
    //                       conexao.query(sql, caracteristica[i], (erro, result) => {
    //                         if (erro) {
    //                           res.status(400).json(erro);
    //                         } else {
    //                           idCarac = result[0].idCaracteristica;

    //                           // validar lider
    //                           if (idCarac <= 3) {
    //                             liderancaTipo = "Professor";
    //                           } else if (idCarac <= 6) {
    //                             liderancaTipo = "Apaixonado";
    //                           } else if (idCarac <= 9) {
    //                             liderancaTipo = "Experiente";
    //                           } else if (idCarac <= 12) {
    //                             liderancaTipo = "Defensor";
    //                           } else if (idCarac <= 15) {
    //                             liderancaTipo = "Inspirador";
    //                           } else if (idCarac <= 18) {
    //                             liderancaTipo = "Gestor";
    //                           } else {
    //                             liderancaTipo = "Visionário";
    //                           }

    //                           const sql =
    //                             "INSERT INTO lideranca(fkColaborador, fkCaracteristica, tipoLider) VALUES (?, ?, ?)";
    //                           conexao.query(
    //                             sql,
    //                             [idColaborador, idCarac, liderancaTipo],
    //                             (erro, results) => {
    //                               if (erro) {
    //                                 res.status(400).json(erro);
    //                               }
    //                             }
    //                           );
    //                         }
    //                       });
    //                     }

    //                     res
    //                       .status(200)
    //                       .json({ message: "Colaborador atualizado com sucesso!" });
    //                   }
    //                 });


    //               }
    //             });
    //           }

    //         }
    //       );
    //     }
    //   }

    //   pesquisarColaboradores(dados, res) {

    //     const idUsuario = Number(dados.id);
    //     const texto = dados.textoPesquisa

    //     console.log(dados)
    //     const sql = `SELECT * FROM colaborador WHERE fkusuario = ${idUsuario} AND (cpf LIKE '%${texto}%' OR nome LIKE '%${texto}%')`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         console.log(result);
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    //   listarColaboradores(idUser, res) {
    //     const idUsuario = Number(idUser.id);

    //     const sql = `SELECT * FROM colaborador WHERE fkusuario = ${idUsuario} ORDER BY idColaborador DESC`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         console.log(result);
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    listarMaquinas(idEmpresa, res) {

        const sql = `SELECT idMaquina, nome FROM Maquina 
	        JOIN Empresa
                ON fkEmpresaMaquina = IdEmpresa
                    WHERE idEmpresa = ${Number(idEmpresa)};`

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    executarComandosInovacao(dados, res) {

        const horaFormatada = dtHora.format('YYYY-MM-DD HH:mm:ss');
        console.log(horaFormatada);

        console.log(dados);

        const sql =
            "INSERT INTO Comando(nomeComando, stattus, fkMaquina, fkFuncionario) VALUES (?, ?, ?, ?)";

        conexao.query(
            sql,
            [
                dados.comando,
                dados.status,
                dados.fkMaquina,
                dados.fkUser
            ],
            (erro, results) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {

                    const sql = `SELECT idComando from Comando WHERE nomeComando = (${dados.comando}) AND 
                    stattus = false AND fkMaquina = (${dados.fkMaquina}) AND AND fkFuncionario = (${dados.fkUser})`;

                    conexao.query(sql, (erro, result) => {
                        if (erro) {
                            res.status(400).json(erro);
                        } else {
                            res.status(200).json(result);
                        }
                    });

                }
            }
        );
    }

    listarInformacoesMaquina(idMaquina, res) {

        const sql = `SELECT m.idMaquina, m.nome, m.secao, m.sistemaOperacional, m.qtdDisco, 
                        CASE WHEN rc.fkMaquina IS NOT NULL THEN 1 ELSE 0 END AS possuiRegistroComponente
                            FROM Maquina as m
                                JOIN Empresa 
                                    ON fkEmpresaMaquina = IdEmpresa
                                    LEFT JOIN registroComponente AS rc ON m.idMaquina = rc.fkMaquina
                                        WHERE m.idMaquina = ${idMaquina};`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarTaxaMaquina(dados, res) {

        const sql = `SELECT DISTINCT ra.fkTipoAviso, m.idMaquina,
                        CASE WHEN rc.fkMaquina IS NOT NULL THEN 1 ELSE 0 END AS possuiRegistroComponente
                            FROM Maquina AS m
                                LEFT JOIN registroComponente AS rc ON m.idMaquina = rc.fkMaquina
                                    LEFT JOIN registroAvisos AS ra ON rc.fkComponente = ra.fkComponente
                                        LEFT JOIN Empresa AS e ON m.fkEmpresaMaquina = e.IdEmpresa
                                            WHERE m.idMaquina = ${dados.idMaquina} OR m.idMaquina IS NULL LIMIT 4;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarAviso(dados, res) {

        console.log(dados.idAviso);
        console.log(dados.idEmpresa);

        const sql = `SELECT registroAviso, dtHora, m.nome, e.NomeEmpresa FROM registroAvisos
                        JOIN Componente as c
                            ON fkComponente = c.idComponente
                                JOIN Maquina as m
                                    ON m.idMaquina = idMaquina
                                        JOIN Empresa as e
                                            ON m.fkEmpresaMaquina = e.IdEmpresa
                                                WHERE fkTipoAviso = ${dados.idAviso}
                                                    AND e.idEmpresa = ${dados.idEmpresa};`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarAvisoKPI(dados, res) {

        console.log(dados.idEmpresa);

        const sql = `SELECT registroAviso, dtHora, fkTipoAViso
                        FROM registroAvisos
                        JOIN Componente as c
                            ON fkComponente = c.idComponente
                                JOIN Maquina as m
                                    ON m.idMaquina = idMaquina
                                        JOIN Empresa as e
                                            ON m.fkEmpresaMaquina = e.IdEmpresa
                                                WHERE e.idEmpresa = ${dados.idEmpresa};`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarCPU(dados, res) {

        const sql = `SELECT ra.especificacao, ra.consumoAtual, m.tempoAtividade, rt.fkTipoAViso, rt.idRegistroAviso FROM RegistroComponente as ra
                        JOIN Componente as c
                            ON idComponente = fkComponente
                                JOIN Maquina as m
                                    ON fkMaquina = m.idMaquina
										JOIN RegistroAvisos as rt
											ON rt.fkComponente = ra.fkComponente
												WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 1
													ORDER BY idRegistroComponente DESC,
																idRegistroAviso DESC
																	LIMIT 1;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                console.log(JSON.stringify(result));
                res.status(200).json(result);
            }
        });
    }

    listarTaxaComponente(dados, res) {

        const sql = `SELECT ta.porcentagemCritico, ta.porcentagemAlerta, ta.fkComponente
                        FROM TaxaAviso as ta
                            JOIN Componente as c
                                ON ta.fkComponente = c.idComponente
                                    WHERE ta.fkEmpresa = ${dados.idEmpresa};`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                console.log(JSON.stringify(result));
                res.status(200).json(result);
            }
        });
    }

    listarRede(dados, res) {

        const sql = `SELECT latencia, consumoDownload, consumoUpload FROM RegistroComponente
                        JOIN Componente
                            ON idComponente = fkComponente
                                WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 4
                                    ORDER BY idRegistroComponente DESC
					                    LIMIT 1;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarRAM(dados, res) {

        const sql = `SELECT ra.consumoAtual, ra.armazenamentoTotal, ra.armazenamentoDisponivel, rt.fkTipoAViso, rt.RegistroAviso 
                        FROM RegistroComponente as ra
                            JOIN Componente as c 
                                ON c.idComponente = ra.fkComponente
                                    JOIN RegistroAvisos as rt
                                            ON rt.fkComponente = ra.fkComponente
                                                WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 2
                                                    ORDER BY idRegistroComponente DESC,
                                                        idRegistroAviso desc LIMIT 1;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    }

    listarDisco(dados, res) {

        const sql = `SELECT ra.consumoAtual, ra.armazenamentoTotal, ra.armazenamentoDisponivel, rt.fkTipoAViso, rt.RegistroAviso 
                        FROM RegistroComponente as ra
                            JOIN Componente as c 
                                ON c.idComponente = ra.fkComponente
                                    JOIN RegistroAvisos as rt
                                            ON rt.fkComponente = ra.fkComponente
                                                WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 3
                                                    ORDER BY idRegistroComponente DESC,
                                                        idRegistroAviso desc LIMIT 1;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {

                res.status(200).json(result);
            }
        });
    }

    //   buscaPorId(idColab, res) {
    //     const id = Number(idColab.id);

    //     const sql = `            SELECT colaborador.*, caracteristica.descricao
    //         FROM colaborador
    //         JOIN lideranca ON colaborador.idColaborador = lideranca.fkColaborador
    //         JOIN caracteristica ON lideranca.fkCaracteristica = caracteristica.idCaracteristica
    //         WHERE colaborador.idColaborador  = ${id}`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         console.log(result);
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    //   avaliarColab(dados, res) {

    //     const fkColaborador = dados.id;
    //     const avaliacao = Number(dados.nota);

    //     console.log(dados.nota + 'aqui no controller' + dados.id)

    //     const sql = `INSERT INTO desempenhoSemanal (categoria, dtSemana, fkColaboradorDesempenho) VALUES (${avaliacao}, WEEK(NOW()), ${fkColaborador})`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json({ message: erro });
    //       } else {
    //         res.status(200).json({ message: "Avaliação realizada com sucesso!" });
    //       }
    //     });
    //   }

    //   contarColab(id, res) {

    //     const sql = `SELECT COUNT(*) FROM colaborador WHERE fkusuario = ${id.id}`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    //   contarLider(id, res) {

    //     const sql = `SELECT tipoLider AS descricao, COUNT(DISTINCT idColaborador) AS quantidade
    //         FROM lideranca
    //         JOIN colaborador ON fkColaborador = idColaborador
    //         WHERE fkusuario = ${id.id}
    //         GROUP BY tipoLider; `;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    //   desempenhoColab(id, res) {
    //     const sql = `SELECT categoria, dtSemana
    //         FROM (
    //           SELECT categoria, dtSemana, ROW_NUMBER() OVER (ORDER BY dtSemana DESC) AS row_num
    //           FROM desempenhoSemanal
    //           WHERE fkColaboradorDesempenho = ${id.id}
    //           ORDER BY dtSemana DESC
    //           LIMIT 4
    //         ) AS ultimos_registros
    //         ORDER BY dtSemana ASC`;

    //     conexao.query(sql, (erro, result) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {
    //         res.status(200).json(result);
    //       }
    //     });
    //   }

    //   calcularDesempenho(id, res) {
    //     var qtdDesempenhoBaixo = 0;
    //     var qtdDesempenhoMedio = 0;
    //     var qtdDesempenhoAlto = 0;

    //     const sqlBaixo = `SELECT count(categoria) AS soma_categoria
    //         FROM (
    //           SELECT categoria, dtSemana, ROW_NUMBER() OVER (ORDER BY dtSemana DESC) AS row_num
    //           FROM desempenhoSemanal
    //           JOIN colaborador ON fkColaboradorDesempenho = idColaborador
    //           WHERE colaborador.fkusuario = ${id.id}
    //             AND categoria in (${0}, ${1}, ${2})  
    //           ORDER BY dtSemana DESC
    //         ) AS ultimos_registros
    //         ORDER BY dtSemana ASC; `;

    //     conexao.query(sqlBaixo, (erro, resultBaixo) => {
    //       if (erro) {
    //         res.status(400).json(erro);
    //       } else {

    //         qtdDesempenhoBaixo = resultBaixo[0].soma_categoria;

    //         const sqlMedio = `SELECT count(categoria) AS soma_categoria
    //             FROM (
    //             SELECT categoria, dtSemana, ROW_NUMBER() OVER (ORDER BY dtSemana DESC) AS row_num
    //             FROM desempenhoSemanal
    //             JOIN colaborador ON fkColaboradorDesempenho = idColaborador
    //             WHERE colaborador.fkusuario = ${id.id}
    //                 AND categoria in (${3}, ${4})  
    //             ORDER BY dtSemana DESC
    //             ) AS ultimos_registros
    //             ORDER BY dtSemana ASC; `;

    //         conexao.query(sqlMedio, (erro, resultMedio) => {
    //           if (erro) {
    //             res.status(400).json(erro);
    //           } else {
    //             qtdDesempenhoMedio = resultMedio[0].soma_categoria;

    //             const sqlAlto = `SELECT count(categoria) AS soma_categoria
    //             FROM (
    //             SELECT categoria, dtSemana, ROW_NUMBER() OVER (ORDER BY dtSemana DESC) AS row_num
    //             FROM desempenhoSemanal
    //             JOIN colaborador ON fkColaboradorDesempenho = idColaborador
    //             WHERE colaborador.fkusuario = ${id.id}
    //                 AND categoria in (${5})  
    //             ORDER BY dtSemana DESC
    //             ) AS ultimos_registros
    //             ORDER BY dtSemana ASC; `;

    //             conexao.query(sqlAlto, (erro, resultAlto) => {
    //               if (erro) {
    //                 res.status(400).json(erro);
    //               } else {
    //                 qtdDesempenhoAlto = resultAlto[0].soma_categoria;

    //                 const sql = `SELECT COUNT(*) as total FROM colaborador WHERE fkusuario = ${id.id}`;

    //                 conexao.query(sql, (erro, result) => {
    //                   if (erro) {
    //                     res.status(400).json(erro);
    //                   } else {

    //                     var totalColab = result[0].total;

    //                     if (totalColab = 0) {

    //                       qtdDesempenhoAlto = 0;
    //                       qtdDesempenhoBaixo = 0;
    //                       qtdDesempenhoMedio = 0;
    //                     }

    //                     const totalCategoria = {

    //                       desempenhoAlto: qtdDesempenhoAlto,
    //                       desempenhoMedio: qtdDesempenhoMedio,
    //                       desempenhoBaixo: qtdDesempenhoBaixo,
    //                       qtdTotal: totalColab
    //                     }

    //                     res.status(200).json(totalCategoria);
    //                   }
    //                 });
    //               }
    //             });
    //           }
    //         });
    //       }
    //     });
    //   }

    //   apagarColab(id, res) {

    //     const sql1 = `DELETE FROM lideranca WHERE fkColaborador = ${id}`;
    //     conexao.query(sql1, (erro) => {
    //       if (erro) {
    //         res.status(400).json({ erroMDS: "errooo" + erro });
    //       } else {

    //         const sql2 = `DELETE FROM desempenhoSemanal WHERE fkColaboradorDesempenho = ${id}`;
    //         conexao.query(sql2, (erro) => {
    //           if (erro) {
    //             res.status(400).json({ erroMDS: "errooo" + erro });
    //           } else {
    //             const sql3 = `DELETE FROM colaborador WHERE idColaborador = ${id}`;
    //             conexao.query(sql3, (erro) => {
    //               if (erro) {
    //                 res.status(400).json({ erroMDS: "errooo" + erro });
    //               } else {
    //                 res.status(200).json({ message: "Colaborador excluído com sucesso" });
    //               }
    //             });
    //           }
    //         });


    //       }
    //     });


    //   }
}

module.exports = new dashboard();
