var database = require('../database/config');

function listar() {
    var instrucao = `
        SET IDENTITY_INSERT Empresa ON;
        SELECT * FROM Empresa;
        SET IDENTITY_INSERT Empresa OFF;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nomeEmpresa, razaoSocial, cnpj, emailRepresentante, senha, nomeRepresentante) {
    var instrucao = `
    SET IDENTITY_INSERT Empresa ON;
    INSERT INTO Empresa VALUES
	(null, '${nomeEmpresa}', '${razaoSocial}', '${cnpj}');
    SET IDENTITY_INSERT Empresa OFF;
    `;

    database.executar(instrucao);


    var instrucao2 = `
    SET IDENTITY_INSERT Empresa ON;
    Select IdEmpresa from empresa where CNPJ = '${cnpj}';
    SET IDENTITY_INSERT Empresa OFF;
    `;

    console.log(instrucao2);

    var resultado = database.executar(instrucao2);

    console.log("resultado:" + JSON.stringify(resultado));

    if (resultado && resultado.length > 0) {
        var idEmpresa = resultado[0].IdEmpresa;

        var instrucao3 = `
        SET IDENTITY_INSERT Empresa ON;
        INSERT INTO Funcionario (idFuncionario, NomeFuncionario, Emailfuncionario, Senha, fkEmpresa, fkFuncao) VALUES (null, '${nomeRepresentante}', '${emailRepresentante}', '${senha}', ${idEmpresa}, 1)
        SET IDENTITY_INSERT Empresa OFF;`;

        return database.executar(instrucao3);


    } else {
        return null;
    }
}

// function entrar(emailRepresentante, senha ) {
//     var instrucao = `
//         select * from Funcionario where EmailFuncionario = '${emailRepresentante}' and Senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }


module.exports = {
    listar,
    cadastrar
}   