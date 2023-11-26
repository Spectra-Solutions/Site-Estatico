const express = require("express");
const app = require("../index");
const moment = require("moment");
const dtHora = moment();
const weekNumber = moment().week();

const conexao = require("../bd/connection");


class dashboard {

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
                1,
                dados.fkMaquina,
                dados.fkUser
            ],
            (erro, results) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {

                    const sql = `SELECT idComando from Comando WHERE nomeComando = (${dados.comando}) AND 
                    stattus = 1 AND fkMaquina = (${dados.fkMaquina}) AND AND fkFuncionario = (${dados.fkUser})`;

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


    // ====================== alterar taxas ====================== 
    atualizarTaxa(alterar, res) {

        const fk = alterar.fkEmpresa
        var valorAlerta = alterar.taxaAlerta
        var valorCritico = alterar.taxaCritica

        if (valorAlerta == "") {
            valorAlerta = 0.0
        }

        if (valorCritico == "") {
            valorCritico = 0.0
        }

        console.log(alterar)
        const sql = `update TaxaAviso set porcentagemCritico = (?), porcentagemAlerta = (?) where fkComponente = 1 and fkEmpresa = (?)`;
        conexao.query(sql, [valorCritico, valorAlerta, fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de CPU Atualizadas" });
            }
        });
    }

    atualizarTaxaDisco(alterar, res) {

        const fk = alterar.fkEmpresa
        const valorAlerta = alterar.taxaAlerta
        const valorCritico = alterar.taxaCritica

        if (valorAlerta == "") {
            valorAlerta = 0.0
        }

        if (valorCritico == "") {
            valorCritico = 0.0
        }

        console.log(alterar)
        const sql = `update TaxaAviso set porcentagemCritico = (?), porcentagemAlerta = (?) where fkComponente = 3 and fkEmpresa = (?)`;
        conexao.query(sql, [valorCritico, valorAlerta, fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de Disco Atualizadas" });
            }
        });
    }

    atualizarTaxaRAM(alterar, res) {

        const fk = alterar.fkEmpresa
        const valorAlerta = alterar.taxaAlerta
        const valorCritico = alterar.taxaCritica

        if (valorAlerta == "") {
            valorAlerta = 0.0
        }

        if (valorCritico == "") {
            valorCritico = 0.0
        }

        console.log(alterar)
        const sql = `update TaxaAviso set porcentagemCritico = (?), porcentagemAlerta = (?) where fkComponente = 2 and fkEmpresa = (?)`;
        conexao.query(sql, [valorCritico, valorAlerta, fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de RAM Atualizadas" });
            }
        });
    }



    restaurarTaxaCpu(alterar, res) {

        const fk = alterar.fkEmpresa

        const sql = `update TaxaAviso set porcentagemCritico = 80.0, porcentagemAlerta = 60.0 where fkComponente = 1 and fkEmpresa = (?)`;
        conexao.query(sql, [fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de CPU restauradas!" });
            }
        });
    }

    restaurarTaxaDisco(alterar, res) {

        const fk = alterar.fkEmpresa

        const sql = `update TaxaAviso set porcentagemCritico = 80.0, porcentagemAlerta = 60.0 where fkComponente = 3 and fkEmpresa = (?)`;
        conexao.query(sql, [fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de Disco restauradas!" });
            }
        });
    }

    restaurarTaxaRam(alterar, res) {

        const fk = alterar.fkEmpresa

        const sql = `update TaxaAviso set porcentagemCritico = 80.0, porcentagemAlerta = 60.0 where fkComponente = 2 and fkEmpresa = (?)`;
        conexao.query(sql, [fk], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ message: "Taxas de RAM restauradas!" });
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

        const sql = `SELECT ra.consumoAtual, ra.armazenamentoTotal, ra.armazenamentoDisponivel, rt.fkTipoAViso, rt.RegistroAviso, ra.fkComponente
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


}

module.exports = new dashboard();
