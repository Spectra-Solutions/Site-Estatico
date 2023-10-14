// ---------------- chart ------------------------ 

// ----------------------- CPU ---------------------------
const graficoCPU = document.getElementById('ChartCPU');

new Chart(graficoCPU, {
    type: 'line',
    data: {
        labels: ['11h10', '11h30', '11h50', '12h10', '12h30', '12h50'],
        datasets: [{
            label: 'CPU',
            data: [20, 35, 30, 70, 45, 29],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// ----------------------- DISCO ---------------------------
const graficoDISCO = document.getElementById('ChartDISCO');

new Chart(graficoDISCO, {
    type: 'line',
    data: {
        labels: ['11h10', '11h30', '11h50', '12h10', '12h30', '12h50'],
        datasets: [{
            label: 'Disco',
            data: [20, 35, 30, 70, 45, 29],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// ----------------------- RAM ---------------------------
const graficoRAM = document.getElementById('ChartRAM');

new Chart(graficoRAM, {
    type: 'line',
    data: {
        labels: ['11h10', '11h30', '11h50', '12h10', '12h30', '12h50'],
        datasets: [{
            label: 'RAM',
            data: [20, 35, 30, 70, 45, 29],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});