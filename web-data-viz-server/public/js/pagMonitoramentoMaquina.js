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


function exibirAlertaDesligar() {
    const Toast = Swal.fire({
        title: 'Quer desligar a máquina?',
        text: "Tem certeza?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#052767',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    })
        .then((result) => {
            if (result.isConfirmed) {

                var comandoDesligar = "";

                if (sessionStorage.SO_MAQ == "Linux") {
                    comandoDesligar = "sudo shutdown -h now";
                } else if (sessionStorage.SO_MAQ == "Windows") {
                    comandoDesligar = "shutdown /s /f /t 0";
                }

                const dados = {
                    comando: comandoDesligar,
                    fkMaquina: sessionStorage.ID_MAQUINA,
                    fkUser: sessionStorage.ID_FUNC,
                    status: false
                };

                var gravouComando = false;
                var executouComando = false;

                fetch('/executarComandosInovacao', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                })
                    .then((res) => {

                        if (res.status === 200) {

                            gravouComando = true;

                            var body = res.json();

                            return body;
                        }
                    })
                    .then((body) => {

                        if (gravouComando) {

                            fetch('/validarComandosInovacao', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(dados)
                            })
                                .then((res) => {

                                    if (res.status === 200) {

                                        executouComando = true;

                                        var body = res.json();

                                        return body;
                                    }
                                })
                                .then((body) => {

                                    if (executouComando) {
                                        Swal.fire(
                                            'Desligada!',
                                            'A máquina foi desligada com sucesso.',
                                            'success'
                                        )
                                    } else {
                                        Swal.fire(
                                            'Opa!',
                                            'Erro ao executar o comando.',
                                            'warning'
                                        )
                                    }
                                })
                                .catch((err) => {
                                    console.log("On the catch");
                                    console.error('Erro inesperado: ', err);
                                });
                        } else {
                            Swal.fire(
                                'Opa!',
                                'Erro ao gravar o comando.',
                                'warning'
                            )
                        }
                    })
                    .catch((err) => {
                        console.log("On the catch");
                        console.error('Erro inesperado: ', err);
                    });
            }
        }
        )
}

function exibirAlertaReiniciar() {
    const Toast = Swal.fire({
        title: 'Quer reiniciar a máquina?',
        text: "Tem certeza?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#052767',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    })
        .then((result) => {

            if (result.isConfirmed) {

                var comandoReinicar = "";

                if (sessionStorage.SO_MAQ == "Linux") {
                    comandoReinicar = "sudo shutdown -r now";
                } else if (sessionStorage.SO_MAQ == "Windows") {
                    comandoReinicar = "shutdown /r /f /t 0";
                }

                const dados = {
                    comando: comandoReinicar,
                    fkMaquina: sessionStorage.ID_MAQUINA,
                    fkUser: sessionStorage.ID_FUNC,
                    status: false
                };

                var gravouComando = false;
                var executouComando = false;

                fetch('/executarComandosInovacao', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                })
                    .then((res) => {

                        if (res.status === 200) {

                            gravouComando = true;

                            var body = res.json();

                            return body;
                        }
                    })
                    .then((body) => {

                        if (gravouComando) {

                            var id = body;
                            console.log("COMANDO EXECUTADO: " + id)

                            fetch('/validarComandosInovacao', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(dados)
                            })
                                .then((res) => { return res.json(); })
                                .then((idComando) => {

                                    if (res.status === 200) {

                                        executouComando = true;

                                        var body = idComando.json();

                                        return body;
                                    }
                                })
                                .then((body) => {

                                    if (executouComando) {
                                        Swal.fire(
                                            'Desligada!',
                                            'A máquina foi desligada com sucesso.',
                                            'success'
                                        )
                                    } else {
                                        Swal.fire(
                                            'Opa!',
                                            'Erro ao executar o comando.',
                                            'warning'
                                        )
                                    }
                                })
                                .catch((err) => {
                                    console.log("On the catch");
                                    console.error('Erro inesperado: ', err);
                                });
                        } else {
                            Swal.fire(
                                'Opa!',
                                'Erro ao gravar o comando.',
                                'warning'
                            )
                        }
                    })
                    .catch((err) => {
                        console.log("On the catch");
                        console.error('Erro inesperado: ', err);
                    });
            }
        }
        )
}


function desligarMaquina() {
    exibirAlertaDesligar();
}

function reiniciarMaquina() {
    exibirAlertaReiniciar();
}

function atualizarDadosMaquina() {

    const id = { id: sessionStorage.ID_MAQUINA };

    console.log(id)

    fetch('/buscarInformacoesMaquina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
        .then((res) => { return res.json(); })
        .then((infoMaquinas) => {

            console.log(infoMaquinas);

            if (Array.isArray(infoMaquinas) && infoMaquinas.length > 0) {

                var info = infoMaquinas[0];

                listarInformacoesMaquina(info);

            } else {
                console.error('Dados inválidos recebidos.');
            }
        })

}

function atualizarTaxaComponente() {

    const idEmpresa = { idEmpresa: sessionStorage.ID_EMPRESA };

    fetch('/listarTaxaComponente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idEmpresa)
    })
        .then((res) => { return res.json(); })
        .then((infoTaxa) => {

            console.log(infoTaxa);

            if (Array.isArray(infoTaxa) && infoTaxa.length > 0) {


                var porcentAlertaCPU = document.getElementById("porcentAlertaCPU");
                porcentAlertaCPU.innerHTML = infoTaxa[0].porcentagemAlerta;

                var porcentCriticoCPU = document.getElementById("porcentCriticoCPU");
                porcentCriticoCPU.innerHTML = infoTaxa[0].porcentagemCritico;

                var porcentAlertaRAM = document.getElementById("porcentAlertaRAM");
                porcentAlertaRAM.innerHTML = infoTaxa[1].porcentagemAlerta;

                var porcentCriticoRAM = document.getElementById("porcentCriticoRAM");
                porcentCriticoRAM.innerHTML = infoTaxa[1].porcentagemCritico;

                var porcentAlertaDisco = document.getElementById("porcentAlertaDisco");
                porcentAlertaDisco.innerHTML = infoTaxa[2].porcentagemAlerta;

                var porcentCriticoDisco = document.getElementById("porcentCriticoDisco");
                porcentCriticoDisco.innerHTML = infoTaxa[2].porcentagemCritico;

            } else {
                console.error('Dados inválidos recebidos.');
            }
        })

}

function listarInformacoesMaquina(info) {

    if (info.possuiRegistroComponente == 0) {

        var configAlerta = {
            icon: 'warning',
            title: "Máquina não possui Registros para o monitoramento!",
            iconColor: '#3C8AFF'
        };

        Toast.fire(configAlerta);

    }

    console.log("info maq: " + info)

    var nomeMaq = document.getElementById("nomeMaq");
    nomeMaq.innerHTML = info.nome || 'N/A';

    var sistMaq = document.getElementById("sistMaq");
    sistMaq.innerHTML = info.sistemaOperacional || 'N/A';

    sessionStorage.SO_MAQ = info.sistemaOperacional;

    var secaoMaq = document.getElementById("secaoMaq");
    secaoMaq.innerHTML = info.secao || 'N/A';


}
