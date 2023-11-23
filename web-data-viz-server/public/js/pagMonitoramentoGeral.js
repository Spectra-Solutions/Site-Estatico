
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

                listarTaxaMaquina(maquina.idMaquina, maquina.nome)

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

var contAlerta = 0;
var contIdeal = 0;
var contCritico = 0;
var contNula = 0;

function listarTaxaMaquina(idMaquina, nomeMaq) {

    const dados = {
        idMaquina: idMaquina
    };

    console.log(dados);

    fetch('/listarTaxaMaquina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => { return res.json(); })
        .then((listaTaxa) => {

            var maquina = document.querySelector('.quadrados[title="' + nomeMaq + '"]');
            var taxa = "";

            if (listaTaxa[0].possuiRegistroComponente != 0) {

                var possuiCritico = listaTaxa.some(item => item.fkTipoAviso === 1);

                if (possuiCritico) {
                    taxa = "critico";
                    contCritico++
                } else {
                    var possuiAlerta = listaTaxa.some(item => item.fkTipoAviso === 2);
                    taxa = possuiAlerta ? "alerta" : "normal";

                    if (possuiAlerta) {
                        contAlerta++
                    } else {
                        contIdeal++
                    }
                }
            }
            else {
                taxa = "nula";
                contNula++
            }

            atualizarLegendasTaxa(contIdeal, contAlerta, contCritico, contNula)
            maquina.id = taxa;

        })
}

function atualizarLegendas(totalMaquinas) {
    var total = document.getElementById("totalMaquinas");
    total.innerHTML = totalMaquinas + " máquinas cadastradas";
}

function atualizarLegendasTaxa(contIdeal, contAlerta, contCritico, contNula) {

    var totalIdeal = document.getElementById("tltIdeal");
    totalIdeal.innerHTML = `-IDEAL (${contIdeal} máquinas)`;
    console.log(contIdeal);

    var totalAlerta = document.getElementById("tltAlerta");
    totalAlerta.innerHTML = `-ALERTA (${contAlerta} máquinas)`;
    console.log(contAlerta);

    var totalCritico = document.getElementById("tltCritico");
    totalCritico.innerHTML = `-CRÍTICO (${contCritico} máquinas)`;
    console.log(contCritico);

    var totalNula = document.getElementById("tltNula");
    totalNula.innerHTML = `-NULA (${contNula} máquinas)`;
    console.log(contNula);
}

function buscarMaquinaPorId(idMaquina) {

    sessionStorage.ID_MAQUINA = idMaquina;

    window.location.href = "/monitoramentoMaquina"

}

function buscarNotificacao(idEmpresa, idAviso) {

    const dados = {
        idEmpresa: idEmpresa,
        idAviso: idAviso
    };

    fetch('/listarNotificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => { return res.json(); })
        .then((listaNotificacao) => {

            var tipoAviso = "";
            if (dados.idAviso == 1) {
                tipoAviso = "critico";

                onClickCritico()

            } else {
                tipoAviso = "alerta";

                onClickAlerta()
            }

            listarNotificacao(listaNotificacao, tipoAviso)

        })
}

function alterarCorBotao(classe, cor) {
    var botoes = document.getElementsByClassName(classe);

    for (var i = 0; i < botoes.length; i++) {
        botoes[i].style.background = cor;
    }
}

function onClickCritico() {
    alterarCorBotao("btC", "#1e9c76ec");
    alterarCorBotao("btA", "#7E7C7C");
}

// Função chamada ao clicar no botão Alerta (btA)
function onClickAlerta() {
    alterarCorBotao("btA", "#1e9c76ec");
    alterarCorBotao("btC", "#7E7C7C");
}

function listarNotificacao(listaNotificacao, tipoAviso) {

    console.log(listaNotificacao);

    divCentralNotificacao.innerHTML = '';

    var listaTexto = '';

    var totalNotif = listaNotificacao.length;

    for (var contLinha = 0; contLinha < totalNotif; contLinha++) {

        // formatacao da data
        var notificacao = listaNotificacao[contLinha];
        var data = new Date(notificacao.dtHora);
        var opcoes = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
        var formatoBrasileiro = data.toLocaleString('pt-BR', opcoes);

        listaTexto += `
                    <div class="boxNotificacoes">
                        <div class="infosNotificacao">
                            <div class="bolaAviso" id="${tipoAviso}"></div>
                            <div class="escritaInformacoes">${notificacao.nome} - ${notificacao.registroAviso}</div>
                            <div class="horarioNotif">${formatoBrasileiro}</div>
                        </div>
                        <div class="verMaquina">
                            <div class="legendaMaq" onclick="visaoMaquina()">Ver Máquina</div>
                            <div class="icon">
                                <img src="img/icon-olho.svg" alt="" onclick="visaoMaquina()">
                            </div>
                        </div>
                    </div>
        `;

    }

    divCentralNotificacao.innerHTML = listaTexto;
}


function atualizarKPI(idEmpresa) {

    const dados = {
        idEmpresa: idEmpresa,
    };

    fetch('/listarAvisoKPI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => { return res.json(); })
        .then((listaNotificacao) => {

            atualizarKPIDisponibilidade(listaNotificacao)
            atualizarKPIAlerta(listaNotificacao)
            atualizarKPICritico(listaNotificacao)

        })

}

function atualizarKPIDisponibilidade(listaNotificacao) {
    const duasSemanasAtras = new Date();
    duasSemanasAtras.setDate(duasSemanasAtras.getDate() - 14);

    // Filtragem dos alertas nas duas últimas semanas com código 
    const doisUltimasSemanas = listaNotificacao.filter(alerta => alerta.fkTipoAViso === 3 && new Date(alerta.dtHora) >= duasSemanasAtras);

    const tempoIdeal = doisUltimasSemanas.length;
    const tempoTotal = listaNotificacao.length;

    console.log("Tempo Ideal:", tempoIdeal);
    console.log("Tempo Total:", tempoTotal);

    const disponibilidade = tempoTotal === 0 ? 0 : (tempoIdeal / tempoTotal) * 100;

    var valorDisp = document.getElementById("valorDisp");
    valorDisp.innerHTML = disponibilidade.toFixed(0) + "%";

}

function atualizarKPIAlerta(listaNotificacao) {

    const agora = new Date();
    const duasSemanasAtras = new Date(agora);
    duasSemanasAtras.setDate(duasSemanasAtras.getDate() - 14);

    const alertasAgora = listaNotificacao.filter(alerta =>
        alerta.fkTipoAViso == 2 && new Date(alerta.dtHora) >= duasSemanasAtras && new Date(alerta.dtHora) <= agora
    );

    const alertasUltimasDuasSemanas = listaNotificacao.filter(alerta =>
        alerta.fkTipoAViso == 2 && new Date(alerta.dtHora) >= duasSemanasAtras && new Date(alerta.dtHora) < agora
    );

    const quantidadeAlertasAgora = alertasAgora.length;
    const quantidadeAlertasUltimasDuasSemanas = alertasUltimasDuasSemanas.length;

    // Calcular a diferença entre o número atual e o número das últimas duas semanas
    const diferenca = quantidadeAlertasAgora - quantidadeAlertasUltimasDuasSemanas;

    console.log('Quantidade de alertas agora:', quantidadeAlertasAgora);
    console.log('Quantidade de alertas nas últimas duas semanas:', quantidadeAlertasUltimasDuasSemanas);
    console.log('Diferença:', diferenca);

    var diferencaAlertas = document.getElementById("diferencaAlertas");
    var totalAvisosAlertas = document.getElementById("totalAvisosAlertas");
    totalAvisosAlertas.innerHTML = quantidadeAlertasAgora;

    if (diferenca > 0) {
        diferencaAlertas.innerHTML = "+" + diferenca;
        diferencaAlertas.style.color = "#FF1818";
    } else if (diferenca < 0) {
        diferencaAlertas.innerHTML = "-" + diferenca;
        diferencaAlertas.style.color = "#1DB83F";
    } else {
        diferencaAlertas.innerHTML = "Igual";
        diferencaAlertas.style.color = "#1DB83F";
    }

}

function atualizarKPICritico(listaNotificacao) {

    const agora = new Date();
    const duasSemanasAtras = new Date(agora);
    duasSemanasAtras.setDate(duasSemanasAtras.getDate() - 14);

    const alertasAgora = listaNotificacao.filter(alerta =>
        alerta.fkTipoAViso == 1 && new Date(alerta.dtHora) >= duasSemanasAtras && new Date(alerta.dtHora) <= agora
    );

    const alertasUltimasDuasSemanas = listaNotificacao.filter(alerta =>
        alerta.fkTipoAViso == 1 && new Date(alerta.dtHora) >= duasSemanasAtras && new Date(alerta.dtHora) < agora
    );

    const quantidadeAlertasAgora = alertasAgora.length;
    const quantidadeAlertasUltimasDuasSemanas = alertasUltimasDuasSemanas.length;

    // Calcular a diferença entre o número atual e o número das últimas duas semanas
    const diferenca = quantidadeAlertasAgora - quantidadeAlertasUltimasDuasSemanas;

    console.log('Quantidade de alertas agora:', quantidadeAlertasAgora);
    console.log('Quantidade de alertas nas últimas duas semanas:', quantidadeAlertasUltimasDuasSemanas);
    console.log('Diferença:', diferenca);

    var diferencaAlertas = document.getElementById("diferencaCriticos");
    var totalAvisosAlertas = document.getElementById("totalAvisosCriticos");

    totalAvisosAlertas.innerHTML = quantidadeAlertasAgora;

    if (diferenca > 0) {
        diferencaAlertas.innerHTML = "+" + diferenca;
        diferencaAlertas.style.color = "#FF1818";
    } else if (diferenca < 0) {
        diferencaAlertas.innerHTML = "-" + diferenca;
        diferencaAlertas.style.color = "#1DB83F";
    } else {
        diferencaAlertas.innerHTML = "Igual";
        diferencaAlertas.style.color = "#1DB83F";
    }

}