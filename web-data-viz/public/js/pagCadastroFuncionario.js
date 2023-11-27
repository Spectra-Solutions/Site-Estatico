function voltarP() {
  containerEditar.style.display = "none";
}

function validar() {
  var nomeFuncionario = input_nome_funcionario.value;
  var emailFuncionario = input_email.value;
  var senhaFuncionario = input_senha.value;
}

function configurarMaquina() {
  window.location.href = "pgControle.html";
}

function cadastrarUsuario() {
  window.location.href = "cadastro-funcionario.html";
}

function pesquisar() { }



sessionStorage.ID_ALTER_FUNC = ""


var cadastroEfetuado = false;

sessionStorage.MODO_EDICAO = sessionStorage.MODO_EDICAO || "false";

const form = document.getElementById("formCadastroFuncionario");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  var idEmpresa = sessionStorage.ID_EMPRESA;
  var modoEdicao = sessionStorage.MODO_EDICAO;
  var idFuncionario = sessionStorage.ID_ALTER_FUNC;

  console.log(idEmpresa);
  console.log("MODO EDIÇÃO FORM", modoEdicao);

  console.log(form.nomeFuncionario.value)
  console.log(form.emailFuncionario.value)
  console.log(form.senha.value)
  console.log(form.nivelAviso.value)
  console.log(form.nivelAcesso.value)

  const data = {
    nomeFuncionario: form.nomeFuncionario.value,
    emailFuncionario: form.emailFuncionario.value,
    senha: form.senha.value,
    idEmpresa,
    nivelAviso: form.nivelAviso.value,
    nivelAcesso: form.nivelAcesso.value,
    idFuncionario,
    modoEdicao,

  };

  console.log("dados", data);

  fetch("/cadastrarFuncionario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 200) {

        formCadastroFuncionario.reset();

        cadastroEfetuado = true;

        return res.json().then((body) => {
          var configAlerta = {
            icon: "success",
            title: body.message,
            iconColor: "#3C8AFF",
          };
          body.configAlerta = configAlerta;
          return body;
        });
      } else if (res.status === 422 || res.status == 400 || res.status == 203) {
        return res.json().then((body) => {
          var configAlerta = {
            icon: "warning",
            title: body.message,
            iconColor: "#3C8AFF",
          };
          body.configAlerta = configAlerta;
          return body;
        });
      }

    })

    .then((body) => {
      Toast.fire(body.configAlerta);
      sessionStorage.MODO_EDICAO = "false";

      atualizarUsuarios();
    })
    .catch((err) => {
      console.error("Erro inesperado: ", err);
    });

});




function atualizarUsuarios() {

  const id = { id: sessionStorage.ID_EMPRESA }

  fetch("/atualizarUsuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((res) => {
      return res.json();
    })
    .then((nomeTodosFuncionrios) => {

      if (Array.isArray(nomeTodosFuncionrios) && nomeTodosFuncionrios.length > 0) {

        var listaFuncionarios = ""

        for (let index = 0; index < nomeTodosFuncionrios.length; index++) {
          var idFuncionario = nomeTodosFuncionrios[index].idFuncionario
          listaFuncionarios += `<div id="id_funcionario" class="funcionario" style="margin-top: 1vh;">
            <div id="id_classe_nome" class="nome">
                <span name="span_nome">${nomeTodosFuncionrios[index].NomeFunc}</span>
            </div>
            <div id="opcoes" class="opcoes">
                <img src="img/editar.svg" alt="" onclick="editarFuncionario(${idFuncionario})">
                <img src="img/excluir.svg" alt="" onclick="exibirAlertaExcluir(${idFuncionario})">
            </div>
        </div>`


          id_caixa_pesquisa.innerHTML = listaFuncionarios
        }
      } else {
        console.error("Dados inválidos recebidos.");
      }
    });
}



function excluir(idFuncionario) {
  const idFuncionario1 = { id: idFuncionario }
  console.log(idFuncionario)
  console.log(idFuncionario1)
  fetch("/deletarUsuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idFuncionario1 }),
  })

    // .then((res) => { return res.json(); })
    .then((respostaDelete) => {
      if (respostaDelete.status === 200) {
        Swal.fire(
          'Excluído',
          'O usuario foi excluido com sucesso.',
          'success'
        )

      } else if (respostaDelete.status === 422 || respostaDelete.status == 400 || respostaDelete.status == 203) {
        Swal.fire(
          'Não excluído',
          'Erro em deletar o usuário',
          'error'
        )
      }
      atualizarUsuarios()
    })
    .catch((err) => {
      console.error("Erro inesperado: ", err);
    });
};



function exibirAlertaExcluir(idFuncionario) {
  const Toast = Swal.fire({
    title: "Excluir Usuário",
    text: "Deseja excluir o usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Exluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {

    if (result.isConfirmed) {
      excluir(idFuncionario);

    }
  });
}

function editarFuncionario(idFuncionario) {

  sessionStorage.ID_ALTER_FUNC = idFuncionario

  sessionStorage.MODO_EDICAO = "true";

  irParaEdicao()

  fetch("/editarFuncionario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idFuncionario }),
  })
    .then((res) => res.json())
    .then((funcionario) => {

      console.log(funcionario);
      formCadastroFuncionario.input_nome_funcionario.value = funcionario.NomeFunc;
      formCadastroFuncionario.input_email.value = funcionario.EmailFunc;
      formCadastroFuncionario.input_senha.value = funcionario.SenhaFunc;
      formCadastroFuncionario.select_nivel_de_aviso.value = funcionario.nomeAviso;
      formCadastroFuncionario.select_nivel_de_acesso.value = funcionario.TipoFuncao;



    })
    .catch((error) => {
      console.error("Erro ao recuperar dados do funcionário para edição:", error);
    });
}


function irParaEdicao() {
  document.getElementById("span_btn").disabled = false;
  mudarTitulo.innerHTML = `EDITAR USUÁRIO`;
  limparInputs()
}

function voltarDaEdicao() {

  document.getElementById("span_btn").disabled = true;
  mudarTitulo.innerHTML = `CADASTRO DE USUÁRIO`;
  limparInputs()


}

function limparInputs() {
  formCadastroFuncionario.reset();
}




function puxarNome() {
  var digitado = input_nome.value
  id_caixa_pesquisa.innerHTML = ""

  fetch("/puxarNomeFuncionario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ digitado }),
  })
    .then((res) => res.json())
    .then((nomesPesquisados) => {

      const nomes = Object.values(nomesPesquisados);


      console.log(Object.keys(nomesPesquisados).length)


      if (Array.isArray(nomesPesquisados) && nomesPesquisados.length > 0) {
        var listaFuncionarios = ""

        for (let index = 0; index < Object.keys(nomesPesquisados).length; index++) {
          console.log(nomesPesquisados)
          var idFuncionario = nomesPesquisados[index].idFuncionario
          listaFuncionarios += `<div id="id_funcionario" class="funcionario" style="margin-top: 1vh;">
              <div id="id_classe_nome" class="nome">
                  <span name="span_nome">${nomesPesquisados[index].NomeFunc}</span>
              </div>
              <div id="opcoes" class="opcoes">
                  <img src="img/editar.svg" alt="" onclick="editarFuncionario(${idFuncionario})">
                  <img src="img/excluir.svg" alt="" onclick="exibirAlertaExcluir(${idFuncionario})">
              </div>
          </div>`


          id_caixa_pesquisa.innerHTML = listaFuncionarios
        }

      } else if (Object.keys(nomesPesquisados).length == 2) {
        id_caixa_pesquisa.innerHTML = `<div id="id_funcionario" class="funcionario" style="margin-top: 1vh;">
            <div id="id_classe_nome" class="nome">
                <span name="span_nome">${nomesPesquisados.NomeFunc}</span>
            </div>
            <div id="opcoes" class="opcoes">
                <img src="img/editar.svg" alt="" onclick="editarFuncionario(${nomesPesquisados.idFuncionario})">
                <img src="img/excluir.svg" alt="" onclick="exibirAlertaExcluir(${nomesPesquisados.idFuncionario})">
            </div>
        </div>`
      }

      else {
        console.log("Deu ruim")
      }

    })
    .catch((error) => {
      console.error("Erro ao recuperar dados do funcionário para edição:", error);
    });
}