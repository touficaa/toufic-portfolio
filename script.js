/* ================================================================
   TOUFIC ABOU ALI - PORTFOLIO CORE
   Shared scripts: cursor, nav, loader, scroll
   ================================================================ */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    // ============ LOADER ============
    window.addEventListener('load', function() {
      setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
      }, 2000);
    });

    // ============ CUSTOM CURSOR ============
    if (window.matchMedia('(min-width: 1025px)').matches) {
      const cursor = document.createElement('div');
      cursor.className = 'cursor';
      document.body.appendChild(cursor);

      const label = document.createElement('div');
      label.className = 'cursor-label';
      document.body.appendChild(label);

      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;

      document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        label.style.left = e.clientX + 'px';
        label.style.top = (e.clientY + 30) + 'px';
      });

      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.25;
        cursorY += dy * 0.25;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      const hoverEls = document.querySelectorAll('a, button, .interactive, .cursor-area');
      hoverEls.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
          cursor.classList.add('cursor-hover');
          const cursorText = el.getAttribute('data-cursor');
          if (cursorText) {
            label.textContent = cursorText;
            label.classList.add('visible');
            cursor.classList.add('cursor-link');
          }
        });
        el.addEventListener('mouseleave', function() {
          cursor.classList.remove('cursor-hover', 'cursor-link');
          label.classList.remove('visible');
        });
      });
    }

    // ============ NAV SCROLL EFFECT ============
    const nav = document.getElementById('nav');
    const scrollProgress = document.getElementById('scrollProgress');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;

      if (currentScroll > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (currentScroll / scrollHeight) * 100;
      if (scrollProgress) scrollProgress.style.width = scrolled + '%';

      lastScroll = currentScroll;
    }, { passive: true });

    // ============ MOBILE MENU ============
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
      });

      document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth < 1025) {
            navMenu.classList.remove('active');
          }
        });
      });
    }

    // ============ SMOOTH ANCHOR SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });

    // ============ GLOBAL SCROLL REVEAL ============
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function(el) { observer.observe(el); });

    // ============ ANIMATED NUMBER COUNTERS ============
    function animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const decimals = (target % 1 !== 0) ? 2 : 0;
      const duration = 2200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = current.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(update);
    }

    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { counterObserver.observe(c); });

  });

})();

/* ================================================================
   MOBILE NAV TOGGLE
   ================================================================ */
(function() {
  function initNavToggle() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when resizing back to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900 && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }
})();
