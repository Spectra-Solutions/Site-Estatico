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

    const result = database.executar(instrucao2);

    console.log("consulta -------------");

    console.log(database.resultadoID.IdEmpresa);

    console.log(" fim consulta -------------");


    var instrucao3 = `
        
        INSERT INTO Funcionario (NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES ('${nomeRepresentante}', '${emailRepresentante}', '${senha}', ${2}, ${1});
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