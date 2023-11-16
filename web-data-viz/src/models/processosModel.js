var database = require("../database/config");

function buscarUltimosProcessos(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `SELECT TOP ${limite_linhas} * FROM Processo
        where fkMaquinaProcesso = ${idMaquina}
        order by idProcesso desc `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM Processo
                    where fkMaquinaProcesso = ${idMaquina}
                    order by idProcesso desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosProcessos
}