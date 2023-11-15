function visaoMaquina() {
    window.location.href = "visao-maquina-individual.html"
}

function listarMaquina() {

    fetch('/listarMaquinas', {
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
}