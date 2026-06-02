/* ================================================================
   HOME PAGE SCRIPT
   Chart.js initialization
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#737373';

  // YEARLY RUNNING PROGRESSION
  const yearlyCtx = document.getElementById('chartYearly');
  if (yearlyCtx) {
    new Chart(yearlyCtx, {
      type: 'bar',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Distance (km)',
          data: [53.76, 287.94, 433.41, 668.24, 721.17],
          backgroundColor: function(context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return '#DC2626';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(220, 38, 38, 0.1)');
            gradient.addColorStop(1, 'rgba(220, 38, 38, 0.9)');
            return gradient;
          },
          borderRadius: 4,
          borderSkipped: false,
          barThickness: 42
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1800,
          easing: 'easeOutCubic'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0A0A0A',
            titleColor: '#FFFFFF',
            bodyColor: '#DC2626',
            padding: 14,
            displayColors: false,
            titleFont: { size: 11, weight: '600' },
            bodyFont: { size: 16, weight: '700' },
            callbacks: {
              label: function(context) {
                return context.parsed.y.toLocaleString() + ' km';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#F0F0F0', drawBorder: false },
            border: { display: false },
            ticks: {
              font: { size: 11, weight: '500' },
              callback: function(value) { return value + 'k'; }
            }
          },
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 12, weight: '600' } }
          }
        }
      }
    });
  }

  // DISCIPLINE BREAKDOWN
  const discCtx = document.getElementById('chartDiscipline');
  if (discCtx) {
    new Chart(discCtx, {
      type: 'doughnut',
      data: {
        labels: ['Running', 'Cycling', 'Swimming'],
        datasets: [{
          data: [721.17, 426.20, 28.25],
          backgroundColor: ['#0A0A0A', '#DC2626', '#A3A3A3'],
          borderColor: '#FFFFFF',
          borderWidth: 6,
          hoverOffset: 12,
          hoverBorderWidth: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        animation: {
          duration: 1800,
          easing: 'easeOutCubic'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12, weight: '600' },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#0A0A0A',
            titleColor: '#FFFFFF',
            bodyColor: '#DC2626',
            padding: 14,
            displayColors: false,
            titleFont: { size: 11, weight: '600' },
            bodyFont: { size: 15, weight: '700' },
            callbacks: {
              label: function(context) {
                return context.parsed.toFixed(2) + ' km';
              }
            }
          }
        }
      }
    });
  }

});
