function updateChartData(chartData, chart, fetchDataEndpoint) {
    const dados = { idMaquina: sessionStorage.ID_MAQUINA };

    fetch(fetchDataEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.json())
        .then((data) => {

            // Adicionar o novo dado ao array de consumo
            const consumoAtual = data[0].consumoAtual;
            chartData.push(consumoAtual);

            // Manter no máximo 6 elementos no array de consumo
            if (chartData.length > 6) {
                chartData.shift();
            }

            // Adicionar o novo horário ao array de rótulos
            const novoHorario = getHorarios();
            chart.data.labels.push(novoHorario);

            // Manter no máximo 6 elementos no array de rótulos
            if (chart.data.labels.length > 6) {
                chart.data.labels.shift();
            }

            // Atualizar os dados do gráfico
            chart.data.datasets[0].data = [...chartData];
            chart.update();
        })
        .catch(error => {
            console.error('Erro ao buscar dados do servidor:', error);
        });
}

function getHorarios() {
    const now = new Date();
    const horas = now.getHours();
    const minutos = now.getMinutes();
    const segundos = now.getSeconds();

    return `${horas}:${minutos}:${segundos}`;
}

function criarChartJS(chartElement, chartData, chartLabel, fetchDataEndpoint) {
    const chart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: chartLabel,
                data: [],
                borderWidth: 3,
                backgroundColor: "rgba(255,255,255)",
                borderColor: "rgba(255,255,255)",
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.3)',
                    },
                    border: {
                        display: false
                    },
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0)',
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    bodyFontColor: 'white',
                    titleFontColor: 'white',
                    callbacks: {
                        title: function (tooltipItems) {
                            return 'Consumo Atual em %';
                        },
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        },
                    },
                }
            }
        }
    });

    // Atualizar os dados a cada 5 segundos
    setInterval(() => updateChartData(chartData, chart, fetchDataEndpoint), 5000);
    setInterval(() => atualizarDadosRede(), 5000);
    setInterval(() => atualizarDadosCPU(), 5000);
    setInterval(() => atualizarDadosRAM(), 5000);
    setInterval(() => atualizarDadosDisco(), 5000);

}

const consumoCPUArray = [];
const graficoCPU = document.getElementById('ChartCPU');
criarChartJS(graficoCPU, consumoCPUArray, 'Consumo CPU', '/listarDadosCPU');

const consumoDiscoArray = [];
const graficoDisco = document.getElementById('ChartDISCO');
criarChartJS(graficoDisco, consumoDiscoArray, 'Consumo Disco', '/listarDadosDisco');

const consumoRAMArray = [];
const graficoRAM = document.getElementById('ChartRAM');
criarChartJS(graficoRAM, consumoRAMArray, 'Consumo RAM', '/listarDadosRAM');


function atualizarDadosRede() {

    const dados = { idMaquina: sessionStorage.ID_MAQUINA };

    fetch('/listarDadosRede', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.json())
        .then((listaDadosRede) => {
            var latencia = document.getElementById("div_mbps");
            latencia.innerHTML = listaDadosRede.latencia || '20';

            var divDown = document.getElementById("div_download");
            divDown.innerHTML = listaDadosRede.consumoDownload || ('0.00');
            divDown.innerHTML +=  " kbps";

            var divUplo = document.getElementById("div_upload");
            divUplo.innerHTML = listaDadosRede.consumoUpload || ('0.00' + " kbps");
            divUplo.innerHTML +=  " kbps";
        })
        .catch(error => {
            console.error('Erro ao buscar dados do servidor:', error);
        });
}


function atualizarDadosCPU() {

    const dados = { idMaquina: sessionStorage.ID_MAQUINA };

    fetch('/listarDadosCPU', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.json())
        .then((listaDadosCPU) => {

            var especCPU = document.getElementById("especificacaoCPU");
            var tempoCPU = document.getElementById("atividadeCPU");

            // Verificar se o array consumoCPUArray está vazio
            if (listaDadosCPU.length > 0) {
                especCPU.innerHTML = listaDadosCPU[0].especificacao || 'N/A';
                tempoCPU.innerHTML = listaDadosCPU[0].tempoAtividade || 'N/A';
                trocarCorAviso(listaDadosCPU[0].fkTipoAViso, '.boxCPU');

            } else {
                especCPU.innerHTML = 'N/A';
                tempoCPU.innerHTML = 'N/A';
            }

        })
        .catch(error => {
            console.error('Erro ao buscar dados do servidor:', error);
        });
}

function atualizarDadosRAM() {

    const dados = { idMaquina: sessionStorage.ID_MAQUINA };

    fetch('/listarDadosRAM', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.json())
        .then((listaDadosRAM) => {

            console.log("DADOS RAMMMMM " + listaDadosRAM);

            var disponivel = document.getElementById("div_armazenamento_disponivel_ram");
            var total = document.getElementById("div_armazenamento_total_ram");
            var disponivelPorcent = document.getElementById("div_armazenamento_disponivel_ram_porcentagem");

            const memoriaTotal = listaDadosRAM[0].armazenamentoTotal;
            const memoriaDisponivel = listaDadosRAM[0].armazenamentoDisponivel;
            var memoriaDisponivelFormatado = listaDadosRAM[0].armazenamentoDisponivel;

            // Verificar se o array consumoCPUArray está vazio
            if (listaDadosRAM.length > 0) {

                if (listaDadosRAM[0].armazenamentoDisponivel.length >= 3) {
                    disponivel.innerHTML = memoriaDisponivelFormatado + "MB";
                } else {
                    disponivel.innerHTML = memoriaDisponivel + "GB";
                }

                total.innerHTML = listaDadosRAM[0].armazenamentoTotal + "GB";

                const porcentagemDisponivel = (memoriaDisponivel / memoriaTotal);
                console.log("PORCENTAGEM " + porcentagemDisponivel);
                disponivelPorcent.innerHTML = "(" + porcentagemDisponivel.toFixed(2) + "%)";

                console.log(listaDadosRAM[0].fkTipoAViso);
                trocarCorAviso(listaDadosRAM[0].fkTipoAViso, '.boxRAM');
            } else {
                disponivel.innerHTML = 'N/A';
                total.innerHTML = 'N/A';
            }

        })
        .catch(error => {
            console.error('Erro ao buscar dados do servidor:', error);
        });
}

function atualizarDadosDisco() {

    const dados = { idMaquina: sessionStorage.ID_MAQUINA };

    fetch('/listarDadosDisco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.json())
        .then((listaDadosDisco) => {

            var divListaDisco = document.getElementById("divListaDisco");

            var memoriaTotal = listaDadosDisco[0].armazenamentoTotal;
            var memoriaDisponivel = listaDadosDisco[0].armazenamentoDisponivel;

            var porcentagemDisponivel = (memoriaDisponivel / memoriaTotal) * 100;
            var disponivelFormatado = "(" + porcentagemDisponivel.toFixed(0) + "%)";

            var listaDisco = '';

            if (listaDadosDisco.length > 0) {

                for (var i = 0; i < listaDadosDisco.length; i++) {

                    var unidade = '';
                    if ((listaDadosDisco[0].armazenamentoTotal.length < 3) || (listaDadosDisco[0].armazenamentoDisponivel.length < 3)) {
                        unidade = "TB";
                    } else {
                        unidade = "GB";
                    }

                    listaDisco += `
                    
                        <div class="boxDadoAdicionalDisco">

                                <div class="linhas">
                                    Disco: <span id="qtd_disco">${i + 1}</span>
                                </div>

                                <div class="linhas">
                                    <span>Armazenamento Disponível:</span>
                                    <div id="div_armazenamento_disponivel_disco" class="estilizar">${memoriaDisponivel + unidade}</div>
                                    <div id="div_armazenamento_disponivel_disco_porcentagem" class="estilizar">${disponivelFormatado}
                                    </div>
                                </div>

                                <div class="linhas">
                                    <span>Armazenamento total:</span>
                                    <div id="div_armazenamento_total_disco" class="estilizar">${memoriaTotal + unidade}</div>
                                </div>

                            </div>
                    
                    `;
                }

                divListaDisco.innerHTML = listaDisco;

                console.log("ID TIPO AVISO DISCO: " + listaDadosDisco[0].fkTipoAViso);
                trocarCorAviso(listaDadosDisco[0].fkTipoAViso, '.boxDisco');

            } else {
                disponivel.innerHTML = 'N/A';
                total.innerHTML = 'N/A';
            }

        })
        .catch(error => {
            console.error('Erro ao buscar dados do servidor:', error);
        });
}

function trocarCorAviso(idTipoAviso, idSinalizador) {

    console.log("ID TIPO AVISO: " + idTipoAviso);

    var box = document.querySelector(idSinalizador);
    var avisoSinal = box.querySelector('.aviso');

    if (idTipoAviso == 1) {
        avisoSinal.id = 'critico';
    } else if (idTipoAviso == 2) {
        avisoSinal.id = 'alerta';
    } else {
        avisoSinal.id = 'normal';
    }

}