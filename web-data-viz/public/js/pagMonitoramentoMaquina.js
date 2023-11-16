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

            if (Array.isArray(infoMaquinas) && infoMaquinas.length > 0) {
                var info = infoMaquinas[0];

                console.log(info);

                listarInformacoesMaquina(info);
            } else {
                console.error('Dados inválidos recebidos.');
            }
        })

}

function listarInformacoesMaquina(info) {

    var nomeMaq = document.getElementById("nomeMaq");
    nomeMaq.innerHTML = info.nome || 'N/A';

    var sistMaq = document.getElementById("sistMaq");
    sistMaq.innerHTML = info.sistemaOperacional || 'N/A';

    var secaoMaq = document.getElementById("secaoMaq");
    secaoMaq.innerHTML = info.secao || 'N/A';

    var especCPU = document.getElementById("especificacaoCPU");
    especCPU.innerHTML = info.especificacao || 'N/A';


}