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

    var cadastroEfetuado = false;

const form = document.getElementById("formCadastroFuncionario");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const data = {
        nomeFuncionario: form.nomeFuncionario.value,
        emailFuncionario: form.emailFuncionario.value,
        senha: form.senha.value,
        nivelAviso: form.nivelAviso.value,
        nivelAcesso: form.nivelAcesso.value
    };

    fetch("/cadastrarEmpresa", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {

                formCadastro.reset();

                cadastroEfetuado = true;

                return res.json().then((body) => {

                    var configAlerta = {
                        icon: 'success',
                        title: body.message,
                        iconColor: '#3C8AFF'
                    };
                    body.configAlerta = configAlerta;
                    return body;

                });

            } else if (res.status === 422 || res.status == 400 || res.status == 203) {

                return res.json().then((body) => {

                    var configAlerta = {
                        icon: 'warning',
                        title: body.message,
                        iconColor: '#3C8AFF'
                    };
                    body.configAlerta = configAlerta;
                    return body;
                });
            }
        })
        .then((body) => {

            Toast.fire(body.configAlerta);

            if (cadastroEfetuado == true) {

                // redireciona para o login
                setTimeout(() => {

                    window.location.href = "/login";

                }, 2500);

            }
        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
});
}

function excluir() {

}
