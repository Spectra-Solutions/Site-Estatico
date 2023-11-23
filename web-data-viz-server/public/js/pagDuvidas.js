// ---------------- função das linkagens --------------------

function jira() {
    window.location.href = "https://spectra-consulting.atlassian.net/servicedesk/customer/user/login?destination=portals"
}

function subir() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function criarMensagem() {
    mensagem_solucao.innerHTML = `<p id="problemas">Para o(s) problema(s):</p>
          <div id="problemas_cliente"></div>

          <p class="resposta" id="solucao">
            Nossa solução pode te ajudar a partir do monitoramento de:
          </p>

          <div id="componentes_monitorados"></div>
          <div id="solucoes_spectra"></div>

          <p class="resposta" id="outros">Além disso também monitoramos:</p>

          <div id="componentes_nao_monitorados" class="componentes_nao_monitorados"></div>`
}
function bt_solucao() {
    id_box_solucao.style.display = "flex";

    var vetorProblemasUsuario = [];

    const checkboxes = document.querySelectorAll('input[name="check"]:checked');
    console.log(checkboxes);
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            vetorProblemasUsuario.push(checkboxes[i].value);
        }
    }
    console.log(vetorProblemasUsuario);

    if (vetorProblemasUsuario.length == 0) {
        solucao.innerHTML = ""
        outros.innerHTML = ""
        solucoes_spectra.innerHTML = ""
        problemas.innerHTML = "Selecione um problema"

    } else {
        criarMensagem()

        for (var i = 0; i < vetorProblemasUsuario.length; i++) {
            var problemaAtual = vetorProblemasUsuario[i];
            problemas_cliente.innerHTML += `${problemaAtual} <br>`;
        }

        var solucoes = {
            lentidao: `Lentidão:<br>
            <b style= "color:#052767">CPU (Central Processing Unit)</b>
            <br>Causa: Sobrecarregada com muitos processos ou tarefas exigentes.<br><br>`,

            atrasoDeRespostas: ` Atraso de respostas: <br> 
            <b style= "color: #052767">
            RAM (Random Access Memory)</b> 
            <br>Causa: Insuficiente, levando a uma lentidão na troca de informações entre o CPU e os programas em execução.<br><br>`,

            downtime: ` Downtime (tempo de inatividade): <br>
            <b style= "color: #052767">(HD/SSD, RAM, CPU)</b>
            <br>Causa: Inclui falha de hardware, tanto em HDD/SSD, RAM e CPU <br><br>`,

            perdaDeDados: `Perda de dados:<br>
            <b style= "color: #052767">HD/SSD</b>
            <br>Causa: Erros de leitura/gravação por falta de armazenamento
            <br><br>`,

            armazenamentoInsuficiente: `Armazenamento insuficiente:<br>
            <b style= "color: #052767">HD/SSD</b> 
            <br> Causa: Falta de espaço disponível para armazenar novos dados ou programas, resultando em lentidão ou até mesmo a impossibilidade de processamento<br><br>`,

            redeInstavel: `Rede instável:<br>
            <b style= "color: #052767">Rede</b> 
            <br>Causa: Problemas na rede, incluindo conexões de internet ruins, problemas de roteador ou switch, interferências e congestionamento na rede.<br><br>`
        };

        var vetorComponentes = ["CPU", "Rede", "HD/SSD", "RAM"];

        for (var i = 0; i < vetorProblemasUsuario.length; i++) {
            var problemaAtual = vetorProblemasUsuario[i];
            if (problemaAtual == "Lentidão") {
                solucoes_spectra.innerHTML += solucoes.lentidao;
                var index = vetorComponentes.indexOf("CPU")
                console.log(index)
                vetorComponentes.splice(index, 1)
            }
            if (problemaAtual == "Atraso De Respostas") {
                solucoes_spectra.innerHTML += solucoes.atrasoDeRespostas;
                var index = vetorComponentes.indexOf("RAM")
                vetorComponentes.splice(index, 1)
            }
            if (problemaAtual == "Downtime") {
                solucoes_spectra.innerHTML += solucoes.downtime;
                var index = vetorComponentes.indexOf("CPU")
                vetorComponentes.splice(index, 1)
                index = vetorComponentes.indexOf("RAM")
                vetorComponentes.splice(index, 1)
                index = vetorComponentes.indexOf("HD/SSD")
                vetorComponentes.splice(index, 1)
            }
            if (problemaAtual == "Perda De Dados") {
                solucoes_spectra.innerHTML += solucoes.perdaDeDados;
                var index = vetorComponentes.indexOf("HD/SSD")
                vetorComponentes.splice(index, 1)
            }
            if (problemaAtual == "Armazenamento Insuficiente") {
                solucoes_spectra.innerHTML += solucoes.armazenamentoInsuficiente;
                var index = vetorComponentes.indexOf("HD/SSD")
                vetorComponentes.splice(index, 1)
            }
            if (problemaAtual == "Rede Instável") {
                solucoes_spectra.innerHTML += solucoes.redeInstavel;
                var index = vetorComponentes.indexOf("Rede")
                vetorComponentes.splice(index, 1)

            }



        }
        if (vetorComponentes.length != 0) {
            componentes_nao_monitorados.innerHTML += vetorComponentes
        } else {
            outros.innerHTML = ""
        }

        console.log(vetorComponentes)


    }


}


const navbar = document.getElementById("header-nav");

const posicaoQueGanhaCor = 100;

window.addEventListener("scroll", () => {

    if (window.scrollY > posicaoQueGanhaCor) {
        navbar.classList.add("colorirFundo");
    } else {
        navbar.classList.remove("colorirFundo");
    }
});
