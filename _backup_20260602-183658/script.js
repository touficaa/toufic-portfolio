/* ================================================================
   TOUFIC ABOU ALI — PORTFOLIO SCRIPT
   Loader · Nav · Counters · Charts · Scroll animations
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============= LOADER =============
  window.addEventListener('load', function() {
    setTimeout(function() {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 1800);
  });

  // ============= NAV SCROLL EFFECT =============
  const nav = document.getElementById('nav');
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
  });

  // ============= MOBILE MENU TOGGLE =============
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth < 769) {
        navMenu.classList.remove('active');
      }
    });
  });

  // ============= SMOOTH SCROLL =============
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============= ANIMATED COUNTERS =============
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  // ============= SCROLL OBSERVER (animations) =============
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('counter-number')) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe counter numbers
  document.querySelectorAll('.counter-number').forEach(function(el) {
    observer.observe(el);
  });

  // Observe reveal elements
  const revealElements = document.querySelectorAll(
    '.section-header, .pb-card-v2, .race-card-v2, .timeline-event, .pdf-card, .counter-card, .fact-card, .progression-block, .chart-card, .gallery-item, .about-story, .about-facts'
  );
  revealElements.forEach(function(el) {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // ============= CHARTS =============
  if (typeof Chart !== 'undefined') {

    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#737373';

    // Yearly running progression chart
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
              gradient.addColorStop(0, 'rgba(220, 38, 38, 0.15)');
              gradient.addColorStop(1, 'rgba(220, 38, 38, 0.85)');
              return gradient;
            },
            borderColor: '#DC2626',
            borderWidth: 0,
            borderRadius: 4,
            barThickness: 36
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0A0A0A',
              titleColor: '#FFFFFF',
              bodyColor: '#DC2626',
              padding: 12,
              displayColors: false,
              titleFont: { size: 11, weight: '600' },
              bodyFont: { size: 14, weight: '700' },
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
              grid: { color: '#F5F5F5', drawBorder: false },
              ticks: {
                font: { size: 11, weight: '500' },
                callback: function(value) { return value + ' km'; }
              }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 12, weight: '600' } }
            }
          }
        }
      });
    }

    // Discipline breakdown chart
    const disciplineCtx = document.getElementById('chartDiscipline');
    if (disciplineCtx) {
      new Chart(disciplineCtx, {
        type: 'doughnut',
        data: {
          labels: ['Running', 'Cycling', 'Swimming'],
          datasets: [{
            data: [721.17, 426.20, 28.25],
            backgroundColor: ['#0A0A0A', '#DC2626', '#A3A3A3'],
            borderColor: '#FFFFFF',
            borderWidth: 4,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
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
              padding: 12,
              displayColors: false,
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
  }

});
