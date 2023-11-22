// sessão
function validarSessao(body) {

    sessionStorage.NOME_FUNC = body.valores.NomeFunc;
    sessionStorage.ID_FUNC = body.valores.idFuncionario;
    sessionStorage.EMAIL_FUNC = body.valores.EmailFunc;
    sessionStorage.FK_EMPRESA = body.valores.fkEmpresa;
    sessionStorage.ID_EMPRESA = body.valores.IdEmpresa;
    sessionStorage.NOME_EMPRESA = body.valores.NomeEmpresa;
    sessionStorage.FK_FUNCAO = body.valores.fkFuncao;
    sessionStorage.TIPO_FUNCAO = body.valores.tipoFuncao;
}

function valoresUsuario() {

    var empresa = sessionStorage.NOME_EMPRESA;
    var usuario = sessionStorage.NOME_FUNC;
    var funcao = sessionStorage.TIPO_FUNCAO;

    var nomeEmpresa = document.getElementById("nomeEmp");
    nomeEmpresa.innerHTML = empresa;

    var nomeUser = document.getElementById("nomeUser");
    nomeUser.innerHTML = usuario;

    var tipouser = document.getElementById("tipoUser");
    tipouser.innerHTML = funcao;
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login";
}
