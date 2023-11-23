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

document.addEventListener("DOMContentLoaded", function () {

    function rolagemAnimada(event) {

        var idDiv = this.getAttribute('href');

        if (idDiv.startsWith('/')) {
            return;
        }

        event.preventDefault();
        var divDestino = document.querySelector(idDiv);

        if (divDestino) {
            var targetPosition = divDestino.offsetTop;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    var links = document.querySelectorAll('nav a');

    links.forEach(function (link) {
        link.addEventListener('click', rolagemAnimada);
    });
});




// ---------------- função da nav -------------------- 


const navbar = document.getElementById("header-nav");

const posicaoQueGanhaCor = 100;

window.addEventListener("scroll", () => {

    if (window.scrollY > posicaoQueGanhaCor) {
        navbar.classList.add("colorirFundo");
    } else {
        navbar.classList.remove("colorirFundo");
    }
});