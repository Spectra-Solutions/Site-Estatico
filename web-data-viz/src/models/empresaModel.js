var database = require('../database/config');

function listar() {
    var instrucao = `
        SELECT * FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nomeEmpresa,razaoSocial, cnpj, emailRepresentante, senha) {
    var instrucao = `
        INSERT INTO empresa VALUES 
        (null, '${nomeEmpresa}', '${razaoSocial}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar,
    cadastrar,
}   