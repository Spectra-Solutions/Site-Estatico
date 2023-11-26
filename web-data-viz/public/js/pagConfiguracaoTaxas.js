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

// ----------------------- CPU -------------------------------- 

function puxarTaxaCpu(fkEmpresa) {
    const fkEmpresA = fkEmpresa;


    fetch("/puxarTaxaCpu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fkEmpresA }),
    })
        .then((res) => res.json())
        .then((taxas) => {

            console.log("taxas recebidas:", taxas);


            formTaxa.inputTaxaAlertaCPU.value = taxas.porcentagemAlerta;
            formTaxa.inputTaxaCriticaCPU.value = taxas.porcentagemCritico;
            

        })
        .catch((error) => {
            console.error("Erro ao recuperar taxas para edição:", error);
        });
}

function puxarTaxaDisco(fkEmpresa) {
    const fkEmpresA = fkEmpresa;


    fetch("/puxarTaxaDisco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fkEmpresA }),
    })
        .then((res) => res.json())
        .then((taxas) => {

            console.log("taxas recebidas:", taxas);


            formTaxaDisco.inputTaxaAlertaDISCO.value = taxas.porcentagemAlerta;
            formTaxaDisco.inputTaxaCriticaDISCO.value = taxas.porcentagemCritico;
            

        })
        .catch((error) => { 
            console.error("Erro ao recuperar taxas para edição:", error);
        });
}

function puxarTaxaRam(fkEmpresa) {
    const fkEmpresA = fkEmpresa;


    fetch("/puxarTaxaRam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fkEmpresA }),
    })
        .then((res) => res.json())
        .then((taxas) => {

            console.log("taxas recebidas:", taxas);


            formTaxaRAM.inputTaxaAlertaRAM.value = taxas.porcentagemAlerta;
            formTaxaRAM.inputTaxaCriticaRAM.value = taxas.porcentagemCritico;
            

        })
        .catch((error) => { 
            console.error("Erro ao recuperar taxas para edição:", error);
        });
}



const form = document.getElementById("formTaxa");
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const botaoClicado = event.submitter;

    if (botaoClicado.id == "restaurarCPU") {
        restaurarTaxaCpu()
    } else if (botaoClicado.id == "atualizarTaxaCpu") {
        alterarCpu()
    }
});

function alterarCpu() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
        taxaAlerta: form.inputTaxaAlertaCPU.value,
        taxaCritica: form.inputTaxaCriticaCPU.value
    };

    fetch("/atualizarTaxa", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {

                formTaxa.reset();

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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}


function restaurarTaxaCpu() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
    };

    fetch("/restaurarTaxaCpu", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {
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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}



// ----------------------- Disco -------------------------------- 

const formDisco = document.getElementById("formTaxaDisco");
formDisco.addEventListener("submit", (event) => {

    event.preventDefault();

    const botaoClicado = event.submitter;

    if (botaoClicado.id == "restaurarDisco") {
        restaurarTaxaDisco()
    } else if (botaoClicado.id == "atualizarTaxaDisco") {
        alterarDisco()
    }
});

function alterarDisco() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
        taxaAlerta: formDisco.inputTaxaAlertaDISCO.value,
        taxaCritica: formDisco.inputTaxaCriticaDISCO.value
    };

    fetch("/atualizarTaxaDisco", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {

                formTaxaDisco.reset();

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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}

function restaurarTaxaDisco() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
    };

    fetch("/restaurarTaxaDisco", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {
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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}



// ----------------------- Ram -------------------------------- 

const formRam = document.getElementById("formTaxaRAM");
formRam.addEventListener("submit", (event) => {

    event.preventDefault();

    const botaoClicado = event.submitter;

    if (botaoClicado.id == "restaurarRam") {
        restaurarTaxaRam()
    } else if (botaoClicado.id == "atualizarTaxaRam") {
        alterarRam()
    }

});

function alterarRam() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
        taxaAlerta: formRam.inputTaxaAlertaRAM.value,
        taxaCritica: formRam.inputTaxaCriticaRAM.value
    };

    fetch("/atualizarTaxaRAM", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {

                formTaxaRAM.reset();

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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}

function restaurarTaxaRam() {
    const fkEmpresA = { id: fkEmpresa };

    const data = {
        fkEmpresa: fkEmpresA.id,
    };

    fetch("/restaurarTaxaRam", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) {
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

        })
        .catch((err) => {
            console.error("Erro inesperado: ", err);
        });
}


