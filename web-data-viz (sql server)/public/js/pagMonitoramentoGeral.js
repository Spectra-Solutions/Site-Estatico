
function buscarMaquina(idEmpresa) {

    const id = { id: idEmpresa };

    fetch('/listarMaquinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
        .then((res) => { return res.json(); })
        .then((listaMaquinas) => {

            listarMaquinas(listaMaquinas)

        })
}

function listarMaquinas(listaMaquinas) {

    console.log(listaMaquinas);

    maquinas.innerHTML = '';

    var listaTexto = '';

    var totalMaquinas = listaMaquinas.length;

    var colunasPorLinha = 15;

    var contIndex = 0;

    for (var contColuna = 0; contColuna < colunasPorLinha; contColuna++) {

        listaTexto += '<div class="maquinasColuna">';

        for (var contLinha = 0; contLinha < 4; contLinha++) {

            if (contIndex < totalMaquinas) {

                // Verifica se o índice está dentro dos limites da lista
                var maquina = listaMaquinas[contIndex];
                // var status = getStatusMaquina(); 

                listaTexto += `<div class="quadrados" id="normal" title= "${maquina.nome}" style="cursor: pointer;" onclick="buscarMaquinaPorId(${maquina.idMaquina})"></div>`;

                contIndex++;

            } else {
                // Adiciona uma célula vazia se não houver mais itens na lista
                listaTexto += '<div class="quadrados"></div>';
            }
        }

        listaTexto += '</div>';
    }

    maquinas.innerHTML = listaTexto;

    atualizarLegendas(totalMaquinas);
}

function atualizarLegendas(totalMaquinas) {

    var total = document.getElementById("totalMaquinas");
    total.innerHTML = totalMaquinas + " máquinas cadastradas";

}

function buscarMaquinaPorId(idMaquina) {

    sessionStorage.ID_MAQUINA = idMaquina;

    window.location.href = "/monitoramentoMaquina"

}
