var database = require('../database/config');

function listar() {
    var instrucao = `
        SELECT * FROM Empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nomeEmpresa, razaoSocial, cnpj, emailRepresentante, senha, nomeRepresentante) {
    var instrucao = `
    
    INSERT INTO Empresa VALUES
	('${nomeEmpresa}', '${razaoSocial}', '${cnpj}');
   
    `;

    database.executar(instrucao);


    var instrucao2 = `
    Select IdEmpresa from empresa where CNPJ = '${cnpj}';

    `;

    console.log(instrucao2);



    var instrucao3 = `
        
        INSERT INTO Funcionario (idFuncionario, NomeFuncionario, Emailfuncionario, Senha, fkEmpresa, fkFuncao) VALUES ('${nomeRepresentante}', '${emailRepresentante}', '${senha}', ${2}, ${1});
        `;

    return database.executar(instrucao3);


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