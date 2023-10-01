var database = require('../database/config');

function listar() {
    var instrucao = `
        SELECT * FROM Empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nomeEmpresa,razaoSocial, cnpj, emailRepresentante, senha) {
    var instrucao = `INSERT INTO Empresa VALUES
	(null, '${nomeEmpresa}', '${razaoSocial}', '${cnpj}');
    `;

    var instrucao = `
    INSERT INTO Funcionario (idFuncionario, Emailfuncionario, Senha) VALUES 
	(null, '${emailRepresentante}', '${senha}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(emailRepresentante, senha ) {
    var instrucao = `
        select * from Funcionario where EmailFuncionario = '${emailRepresentante}' and Senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar,
    cadastrar
}   