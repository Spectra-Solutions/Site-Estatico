function verProcessos() {
    window.location.href = "processos-maquina.html"
}

function exibirAlertaDesligar() {
    const Toast = Swal.fire({
        title: 'Quer desligar a máquina?',
        text: "Tem certeza?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Desligada!',
                    'A máquina foi desligada com sucesso.',
                    'success'
                )
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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Reiniciada!',
                    'A máquina foi reiniciada com sucesso.',
                    'success'
                )
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