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

async function configurarSlack() {

    const { value: formValues } = await Swal.fire({
        title: 'Configurar Slack',
        html: `
        <form id="myForm" style="flex-direction: column">
            <span>Informe sua URL do Slack!</span>
            <input id="swalinput1" class="swal2-input" value="${sessionStorage.URL_SLACK}"> 
            <p>Esse link será usado para a emissão de alertas dos componentes!</p>
        </form>
    `,
        focusConfirm: false,
        showCancelButton: false,
        confirmButtonColor: '#052767',
        confirmButtonText: 'Configurar',
        preConfirm: () => {
            return {
                urlSlack: document.getElementById('swalinput1').value,
                fkEmpresa: sessionStorage.FK_EMPRESA,
            };
        }
    });
    if (formValues) {
        atualizarDados(formValues);
    }

}

var alterado_dados = false;

function atualizarDados(formValues) {

    sessionStorage.URL_SLACK = formValues.urlSlack;

    if (formValues.urlSlack != "" && formValues.fkEmpresa != "") {

        fetch('/configurarSlack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formValues }),
        })
            .then((res) => {

                if (res.status === 200) {

                    alterado_dados = true;
                }
            })
            .then((body) => {

                var configAlerta = {
                    icon: 'success',
                    title: "A URL do Slack foi alterada com sucesso!",
                    iconColor: '#052767'
                };

                Toast.fire(configAlerta);
            })
            .catch((err) => {
                console.error('Erro inesperado: ', err);
            });

    } else {
        var configAlerta = {
            icon: 'warning',
            title: "Preencha o campo URL!",
            iconColor: '#052767'
        };

        Toast.fire(configAlerta);
    }


}
