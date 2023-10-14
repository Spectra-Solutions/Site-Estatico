// ---------------- chart ------------------------ 

// ----------------------- CPU ---------------------------
const graficoCPU = document.getElementById('ChartCPU');

new Chart(graficoCPU, {
    type: 'line',
    data: {
        labels: ['11h10', '11h30', '11h50', '12h10', '12h30', '12h50'],
        datasets: [{
            label: '',
            data: [20, 35, 30, 70, 45, 29],
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
                // labels: {
                //     color: 'white', // Define a cor do texto da legenda
                // }
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.7)', 
                bodyFontColor: 'white', 
                titleFontColor: 'white' 
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
            borderWidth: 3,
            backgroundColor: "rgba(255,255,255)",
            borderColor: "rgba(255,255,255)"
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
                    color: 'rgba(255,255,255,0.3)'
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
                    color: 'rgba(255,255,255,0)'
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
                titleFontColor: 'white'
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
            borderWidth: 3,
            backgroundColor: "rgba(255,255,255)",
            borderColor: "rgba(255,255,255)"
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
                    color: 'rgba(255,255,255,0.4)'
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
                    color: 'rgba(255,255,255,0)'
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
                titleFontColor: 'white'
            }
        }
    }
});