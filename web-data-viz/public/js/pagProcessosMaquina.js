function voltar() {
    window.location.href = "visao-maquina-individual.html"
}

function configurarMaquina() {
    window.location.href = "pgControle.html"
}

function cadastrarUsuario() {
    window.location.href = "cadastro-funcionario.html"
}

function obterProcessos() {
    const idMaquina = sessionStorage.ID_MAQUINA;
    const maquina = {
        idMaquina: idMaquina
    }
    fetch(`/ultimos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maquina),

    }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);


                atualizarTabela(resposta, sessionStorage.ID_MAQUINA);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function atualizarTabela(resposta, idMaquina) {
    table_processos.innerHTML = `<tr>
                    <th class="nomeProcesso">Nome Processo</th>
                    <th class="status">Status</th>
                    <th class="consumoCPU">Consumo CPU</th>
                    <th class="consumoRAM">Consumo RAM</th>
                    <th class="dtHora">Data e Hora</th>
                </tr> `;

    for (var i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        table_processos.innerHTML += `
                <tr>
                    <td>${registro.nomeProcesso}</td>
                    <td class="status">${"Executando"}</td>
                    <td class="consumo">${registro.usoCpu}%</td>
                    <td class="consumo">${registro.usoMemoria} MB</td>
                    <td>${registro.dtProcesso}</td>
                </tr>
        `

    }

}

function infoMaquina(idMaquina) {
    const maquina = {
        idMaquina: idMaquina
    }
    fetch(`/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maquina),

    }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var nomeMaq = document.getElementById("nomeMaq");
                nomeMaq.innerHTML = resposta[0].nome || 'N/A';

                var sistMaq = document.getElementById("sistMaq");
                sistMaq.innerHTML = resposta[0].sistemaOperacional || 'N/A';

                sessionStorage.SO_MAQ = resposta[0].sistemaOperacional;

                var secaoMaq = document.getElementById("secaoMaq");
                secaoMaq.innerHTML = resposta[0].secao || 'N/A';

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}