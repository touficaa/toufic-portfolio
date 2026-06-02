/* ================================================================
   RECORD PAGE SCRIPT
   Filter, accordion, long run sort, Prague chart
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============ RACE TABLE FILTERS ============
  var filterBtns = document.querySelectorAll('.rec-filter-btn');
  var rows = document.querySelectorAll('#raceTableBody tr');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      rows.forEach(function(row) {
        var year    = row.getAttribute('data-year');
        var country = row.getAttribute('data-country');
        var podium  = row.getAttribute('data-podium');
        var marathon = row.getAttribute('data-marathon');
        var show = false;

        if (filter === 'all')      show = true;
        else if (filter === '2023')    show = year === '2023';
        else if (filter === '2024')    show = year === '2024';
        else if (filter === '2025')    show = year === '2025';
        else if (filter === '2026')    show = year === '2026';
        else if (filter === 'podium')  show = podium === 'true';
        else if (filter === 'lebanon') show = country === 'lebanon';
        else if (filter === 'france')  show = country === 'france';
        else if (filter === 'marathon') show = marathon === 'true';

        if (show) {
          row.classList.remove('hidden');
          row.style.opacity = '0';
          row.style.transform = 'translateY(8px)';
          setTimeout(function() {
            row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
          }, 10);
        } else {
          row.classList.add('hidden');
          row.style.opacity = '';
          row.style.transform = '';
          row.style.transition = '';
        }
      });
    });
  });

  // ============ PRAGUE SPLIT CHART ============
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#737373';

    var pragueCtx = document.getElementById('chartPrague');
    if (pragueCtx) {
      new Chart(pragueCtx, {
        type: 'bar',
        data: {
          labels: ['5K', '10K', '15K', 'Half', '25K', '30K', '35K', 'Finish'],
          datasets: [{
            label: 'Rank',
            data: [564, 644, 930, 1493, 1856, 2323, 2140, 2346],
            backgroundColor: [
              '#DC2626','#DC2626',
              '#A3A3A3','#A3A3A3','#A3A3A3',
              '#404040',
              '#A3A3A3',
              '#0A0A0A'
            ],
            borderRadius: 3,
            barThickness: 18
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1800, easing: 'easeOutCubic' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0A0A0A',
              titleColor: '#FFFFFF',
              bodyColor: '#DC2626',
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(c) { return 'Rank: ' + c.parsed.x.toLocaleString(); }
              }
            }
          },
          scales: {
            x: {
              reverse: true,
              grid: { color: '#F0F0F0' },
              border: { display: false },
              ticks: { font: { size: 10 }, callback: function(v) { return v.toLocaleString(); } }
            },
            y: {
              grid: { display: false },
              border: { display: false },
              ticks: { font: { size: 11, weight: '600' } }
            }
          }
        }
      });
    }
  }

});

// ============ ACCORDION ============
function toggleAcc(id) {
  var body   = document.getElementById('acc-body-' + id);
  var chev   = document.getElementById('chev-' + id);
  var header = body.previousElementSibling;
  var isOpen = body.classList.contains('open');

  document.querySelectorAll('.rec-acc-body').forEach(function(b) { b.classList.remove('open'); });
  document.querySelectorAll('.rec-acc-chev').forEach(function(c) { c.classList.remove('rotated'); });
  document.querySelectorAll('.rec-acc-header').forEach(function(h) { h.classList.remove('open'); });

  if (!isOpen) {
    body.classList.add('open');
    chev.classList.add('rotated');
    header.classList.add('open');

    // Init Prague chart when accordion opens
    setTimeout(function() {
      if (typeof Chart !== 'undefined' && id === 1) {
        var existing = Chart.getChart('chartPrague');
        if (!existing) {
          var ctx = document.getElementById('chartPrague');
          if (ctx) {
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['5K', '10K', '15K', 'Half', '25K', '30K', '35K', 'Finish'],
                datasets: [{
                  data: [564, 644, 930, 1493, 1856, 2323, 2140, 2346],
                  backgroundColor: ['#DC2626','#DC2626','#A3A3A3','#A3A3A3','#A3A3A3','#404040','#A3A3A3','#0A0A0A'],
                  borderRadius: 3,
                  barThickness: 18
                }]
              },
              options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1400 },
                plugins: { legend: { display: false } },
                scales: {
                  x: { reverse: true, grid: { color: '#F0F0F0' }, border: { display: false } },
                  y: { grid: { display: false }, border: { display: false } }
                }
              }
            });
          }
        }
      }
    }, 100);
  }
}

// ============ LONG RUNS SORT ============
var lrSortDir = { dist: -1, pace: 1 };

function sortLR(col) {
  var tbody = document.getElementById('lrBody');
  var rows  = Array.from(tbody.querySelectorAll('tr'));
  lrSortDir[col] *= -1;

  rows.sort(function(a, b) {
    var aVal = parseFloat(a.getAttribute('data-' + col));
    var bVal = parseFloat(b.getAttribute('data-' + col));
    return (aVal - bVal) * lrSortDir[col];
  });

  rows.forEach(function(r) { tbody.appendChild(r); });

  document.querySelectorAll('.lr-sortable').forEach(function(th) {
    var c = th.getAttribute('data-col');
    var label = c === 'dist' ? 'Distance' : 'Pace';
    if (c === col) {
      th.textContent = label + (lrSortDir[col] === 1 ? ' ↑' : ' ↓');
    } else {
      th.textContent = label + ' ↕';
    }
  });
}
