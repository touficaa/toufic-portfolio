/* PROFILE PAGE SCRIPT - Scroll animations + reveal */

document.addEventListener('DOMContentLoaded', function() {

  const profileReveal = document.querySelectorAll(
    '.chapter-header, .who-grid-page, .origin-item, .era-block, .edu-card, ' +
    '.france-decision, .grades-block, .study-style, .work-card, .failure-row, ' +
    '.realization-block, .sira-hero-card, .sira-metric, .clients-strip, ' +
    '.survival-block, .strength-big-card, .broken-leg-block, .res-card, ' +
    '.travel-block, .trait-card, .ambition-block, .manifesto-block, .why-fed, ' +
    '.closing-actions, .closing-contact'
  );

  const profileObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        profileObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  profileReveal.forEach(function(el) {
    el.classList.add('reveal');
    profileObs.observe(el);
  });

});
