/* RACE PROOF PAGE SCRIPT - Filters + reveal */

document.addEventListener('DOMContentLoaded', function() {

  // Scroll reveal
  const revealEls = document.querySelectorAll(
    '.chapter-header, .identity-card, .audit-card, .audit-note, .filter-bar, ' +
    '.race-table-wrap, .table-summary, .pb-verify-card, .featured-race, ' +
    '.splits-wrap, .splits-note, .media-card, .strava-media-note, ' +
    '.ironman-proof-card, .vs-block, .verify-contact, .closing-actions'
  );

  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  revealEls.forEach(function(el) {
    el.classList.add('reveal');
    obs.observe(el);
  });

  // Race table filters
  let currentYear = 'all';
  let currentPodium = 'all';

  const tableRows = document.querySelectorAll('#raceTable tbody tr');
  const yearBtns = document.querySelectorAll('[data-filter-year]');
  const podiumBtns = document.querySelectorAll('[data-filter-podium]');
  const summary = document.getElementById('tableSummary');

  function applyFilters() {
    let visible = 0;
    tableRows.forEach(function(row) {
      const year = row.getAttribute('data-year');
      const podium = row.getAttribute('data-podium');
      const yearMatch = currentYear === 'all' || year === currentYear;
      const podiumMatch = currentPodium === 'all' || (currentPodium === 'podium' && podium === 'true');

      if (yearMatch && podiumMatch) {
        row.style.display = '';
        visible++;
      } else {
        row.style.display = 'none';
      }
    });
    summary.textContent = 'Showing ' + visible + ' of 25 races';
  }

  yearBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      yearBtns.forEach(function(b) { b.classList.remove('filter-active'); });
      btn.classList.add('filter-active');
      currentYear = btn.getAttribute('data-filter-year');
      applyFilters();
    });
  });

  podiumBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      podiumBtns.forEach(function(b) { b.classList.remove('filter-podium-active'); });
      btn.classList.add('filter-podium-active');
      currentPodium = btn.getAttribute('data-filter-podium');
      applyFilters();
    });
  });

});
