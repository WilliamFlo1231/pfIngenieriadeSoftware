import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const SolicitudVacacionesPieChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: ["Pendiente Aprobacion", "Autorizado", "Rechazado"],
                datasets: [{
                    data: data,
                    backgroundColor: ['#4e73df', '#1cc88a', '#e74a3b'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#d62d20'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                cutoutPercentage: 80,
            },
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};

export default SolicitudVacacionesPieChart;
