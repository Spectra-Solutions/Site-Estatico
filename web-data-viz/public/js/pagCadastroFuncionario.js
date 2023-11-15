function exibirAlertaExcluir() {
    const Toast = Swal.fire({
        title: 'Excluir Usuário',
        text: "Deseja excluir o usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Exluir',
        cancelButtonText: 'Cancelar'
    })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Excluído',
                    'O usuario foi excluido com sucesso.',
                    'success'
                )
            }
        }
        )
}

function editarFuncionario() {

    mudarTitulo.innerHTML = `EDITAR USUÁRIO`
}

function voltarP() {
    containerEditar.style.display = "none"
}

function validar() {
    var nomeFuncionario = input_nome_funcionario.value
    var emailFuncionario = input_email.value
    var senhaFuncionario = input_senha.value
}

function configurarMaquina() {
    window.location.href = "pgControle.html"
}

function cadastrarUsuario() {
    window.location.href = "cadastro-funcionario.html"
}

function pesquisar() {

}

function salvar() {
    mudarTitulo.innerHTML = `CADASTRO DE USUÁRIO`
}

function excluir() {

}
