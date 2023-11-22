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


function jira() {
    window.location.href = "https://spectra-consulting.atlassian.net/servicedesk/customer/user/login?destination=portals"
}


// LOGAR
var userValidado = false;

const form = document.getElementById('formLogar');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // dados do meu formulario - enviados para o meu endpoint
    const dadosUser = {
        emailUser: form.emailUser.value,
        senhaUser: form.senhaUser.value,
    };
    console.log(dadosUser);
    fetch('/autenticarUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUser),
    })
        .then((res) => {

            if (res.status === 200) {

                userValidado = true;

                var body = res.json();

                return body;

            } else if (res.status === 422 || res.status == 400) {

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

            if (userValidado) {

                console.log(body)

                validarSessao(body)

                window.location.href = '/monitoramentoGeral';

            } else {
                Toast.fire(body.configAlerta);
            }

        })
        .catch((err) => {
            console.log("On the catch");
            console.error('Erro inesperado: ', err);
        });
});

function alerta(configAlerta) {
    var { text } = configAlerta
    console.log("Dentro do alert", configAlerta);
    Swal.fire(configAlerta)
}

