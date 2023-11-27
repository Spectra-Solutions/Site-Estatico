const express = require("express");
const app = require("../index");
const moment = require("moment");
const dtHora = moment();
const weekNumber = moment().week();

const conexao = require("../bd/connection");


class dashboard {

    listarMaquinas(idEmpresa, res) {
        const sql = `
        SELECT idMaquina, nome FROM Maquina 
        JOIN Empresa
            ON fkEmpresaMaquina = IdEmpresa
                WHERE idEmpresa = ${Number(idEmpresa)};
        `;
    
        conexao
            .connect()
            .then(() => {
                return conexao.query(sql);
            })
            .then((result) => {
                res.status(200).json(result.recordset);
            })
            .catch((erro) => {
                res.status(400).json(erro);
            })
            .finally(() => {
                conexao.close();
            });
    }

    executarComandosInovacao(dados, res) {
        const horaFormatada = dtHora.format('YYYY-MM-DD HH:mm:ss');
        console.log(horaFormatada);
        console.log(dados);
    
        const inserirComandoSql = `
            INSERT INTO Comando(nomeComando, stattus, fkMaquina, fkFuncionario) 
            VALUES ('${dados.comando}', ${dados.status}, ${dados.fkMaquina}, ${dados.fkUser})
        `;
    
        conexao.connect()
            .then(() => {
                return conexao.query(inserirComandoSql);
            })
            .then((results) => {
                const selectComandoSql = `
                    SELECT idComando 
                    FROM Comando 
                    WHERE nomeComando = '${dados.comando}' 
                        AND stattus = ${1} 
                        AND fkMaquina = ${dados.fkMaquina} 
                        AND fkFuncionario = ${dados.fkUser}
                `;
    
                return conexao.query(selectComandoSql);
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((erro) => {
                res.status(400).json(erro);
            })
            .finally(() => {
                conexao.close();
            });
    }
    

    listarInformacoesMaquina(idMaquina, res) {

        const sql = `SELECT m.idMaquina, m.nome, m.secao, m.sistemaOperacional, m.qtdDisco, 
                        CASE WHEN rc.fkMaquina IS NOT NULL THEN 1 ELSE 0 END AS possuiRegistroComponente
                            FROM Maquina as m
                                JOIN Empresa 
                                    ON fkEmpresaMaquina = IdEmpresa
                                    LEFT JOIN registroComponente AS rc ON m.idMaquina = rc.fkMaquina
                                        WHERE m.idMaquina = ${idMaquina};`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        });                                
    }

    listarTaxaMaquina(dados, res) {

        const sql = `SELECT DISTINCT ra.fkTipoAviso, m.idMaquina,
                        CASE WHEN rc.fkMaquina IS NOT NULL THEN 1 ELSE 0 END AS possuiRegistroComponente
                            FROM Maquina AS m
                                LEFT JOIN registroComponente AS rc ON m.idMaquina = rc.fkMaquina
                                    LEFT JOIN registroAvisos AS ra ON rc.fkComponente = ra.fkComponente
                                        LEFT JOIN Empresa AS e ON m.fkEmpresaMaquina = e.IdEmpresa
                                            WHERE m.idMaquina = ${dados.idMaquina} OR m.idMaquina IS NULL;`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
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

         conexao.connect()
         .then(() => {
         return conexao.query(sql);
         })
         .then((result) => {
             res.status(200).json(result.recordset);
         })
         .catch((erro) => {
             res.status(400).json(erro);
         })
         .finally(() => {
             conexao.close();
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
                                                WHERE e.idEmpresa = ${dados.idEmpresa}`;
        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        }); 
    }


    // ====================== alterar taxas ====================== 
    atualizarTaxa(alterar, res) {
        const fk = alterar.fkEmpresa;
        let valorAlerta = alterar.taxaAlerta;
        let valorCritico = alterar.taxaCritica;
    
        // Verificar se os valores são vazios ou nulos e atribuir 0.0
        valorAlerta = valorAlerta || 0.0;
        valorCritico = valorCritico || 0.0;
    
        console.log(alterar);
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = ${valorCritico}, porcentagemAlerta = ${valorAlerta} 
            WHERE fkComponente = 1 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de CPU Atualizadas" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }
    

    atualizarTaxaDisco(alterar, res) {
        const fk = alterar.fkEmpresa;
        let valorAlerta = alterar.taxaAlerta;
        let valorCritico = alterar.taxaCritica;
    
        // Verificar se os valores são vazios ou nulos e atribuir 0.0
        valorAlerta = valorAlerta || 0.0;
        valorCritico = valorCritico || 0.0;
    
        console.log(alterar);
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = ${valorCritico}, porcentagemAlerta = ${valorAlerta} 
            WHERE fkComponente = 3 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de Disco Atualizadas" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }

    atualizarTaxaTotal(id, res) {
        console.log("IDDDD" +id.fkEmpresa);
        // Query SQL com placeholders
        const sql = `
        IF NOT EXISTS (
            SELECT 1
            FROM TaxaAviso
            WHERE fkEmpresa = ${id.fkEmpresa}
        )
        BEGIN
            INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES
                (80, 60, 1, ${id.fkEmpresa}),
                (75, 60, 2, ${id.fkEmpresa}),
                (80, 60, 3, ${id.fkEmpresa});
        END;
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas Componentes Registradas" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                console.log(erro);
                console.log(sql);
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }
    

    atualizarTaxaRAM(alterar, res) {
        const fk = alterar.fkEmpresa;
        let valorAlerta = alterar.taxaAlerta;
        let valorCritico = alterar.taxaCritica;
    
        // Verificar se os valores são vazios ou nulos e atribuir 0.0
        valorAlerta = valorAlerta || 0.0;
        valorCritico = valorCritico || 0.0;
    
        console.log(alterar);
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = ${valorCritico}, porcentagemAlerta = ${valorAlerta} 
            WHERE fkComponente = 2 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de RAM Atualizadas" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }

    restaurarTaxaCpu(alterar, res) {
        const fk = alterar.fkEmpresa;
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = 80.0, porcentagemAlerta = 60.0 
            WHERE fkComponente = 1 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de CPU restauradas!" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }
    
    restaurarTaxaDisco(alterar, res) {
        const fk = alterar.fkEmpresa;
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = 80.0, porcentagemAlerta = 60.0 
            WHERE fkComponente = 3 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de Disco restauradas!" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }
    

    restaurarTaxaRam(alterar, res) {
        const fk = alterar.fkEmpresa;
    
        // Query SQL com placeholders
        const sql = `
            UPDATE TaxaAviso 
            SET porcentagemCritico = 80.0, porcentagemAlerta = 60.0 
            WHERE fkComponente = 2 AND fkEmpresa = ${fk}
        `;
    
        // Conectar ao banco de dados
        conexao.connect()
            .then(() => {
                // Executar a atualização
                return conexao.query(sql);
            })
            .then((result) => {
                // Enviar resposta com sucesso
                res.status(200).json({ message: "Taxas de RAM restauradas!" });
            })
            .catch((erro) => {
                // Enviar resposta de erro
                res.status(400).json(erro);
            })
            .finally(() => {
                // Fechar conexão
                conexao.close();
            });
    }
    

    listarCPU(dados, res) {

        const sql = `SELECT TOP 1 ra.especificacao, ra.consumoAtual, m.tempoAtividade, rt.fkTipoAViso, rt.idRegistroAviso FROM RegistroComponente as ra
                        JOIN Componente as c
                            ON idComponente = fkComponente
                                JOIN Maquina as m
                                    ON fkMaquina = m.idMaquina
										JOIN RegistroAvisos as rt
											ON rt.fkComponente = ra.fkComponente
												WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 1
													ORDER BY idRegistroComponente DESC,
																idRegistroAviso DESC
																	;`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        }); 
    }

    listarTaxaComponente(dados, res) {

        const sql = `SELECT ta.porcentagemCritico, ta.porcentagemAlerta, ta.fkComponente
                        FROM TaxaAviso as ta
                            JOIN Componente as c
                                ON ta.fkComponente = c.idComponente
                                    WHERE ta.fkEmpresa = ${dados.idEmpresa};`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        }); 
    }

    listarRede(dados, res) {

        const sql = `SELECT TOP 1 latencia, consumoDownload, consumoUpload FROM RegistroComponente
                        JOIN Componente
                            ON idComponente = fkComponente
                                WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 4
                                    ORDER BY idRegistroComponente DESC
					                    ;`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        });
    }
        

    listarRAM(dados, res) {

        const sql = `SELECT TOP 1 ra.consumoAtual, ra.armazenamentoTotal, ra.armazenamentoDisponivel, rt.fkTipoAViso, rt.RegistroAviso 
                        FROM RegistroComponente as ra
                            JOIN Componente as c 
                                ON c.idComponente = ra.fkComponente
                                    JOIN RegistroAvisos as rt
                                            ON rt.fkComponente = ra.fkComponente
                                                WHERE fkMaquina = ${dados.idMaquina} AND idComponente = 2
                                                    ORDER BY idRegistroComponente DESC,
                                                        idRegistroAviso desc;`;

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
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

        conexao.connect()
        .then(() => {
        return conexao.query(sql);
        })
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((erro) => {
            res.status(400).json(erro);
        })
        .finally(() => {
            conexao.close();
        }); 
    }


}

module.exports = new dashboard();
