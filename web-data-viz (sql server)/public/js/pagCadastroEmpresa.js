
function jira() {
    window.location.href = "https://spectra-consulting.atlassian.net/servicedesk/customer/user/login?destination=portals"
}

// mascara cnpj
$(document).ready(function () {
    $('#input_cnpj').inputmask('99.999.999/9999-99');
});


// configuracao alerta
// ALERTA
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        popup: 'swal2-show-custom-shadow'
    },
    didOpen: (toast) => {
        const popup = Swal.getPopup();
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})



// CADASTRO DE EMPRESA E USUÁRIO

var cadastroEfetuado = false;

const form = document.getElementById("formCadastro");
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const data = {
        nomeEmpresa: form.nomeEmpresa.value,
        razaoSocial: form.razaoEmpresa.value,
        cnpj: form.cnpjEmpresa.value,
        emailRepresentante: form.emailRepresentante.value,
        senha: form.senha.value,
        confSenha: form.confSenha.value,
        nomeRepresentante: form.nomeRepresentante.value
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