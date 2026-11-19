document.documentElement.classList.add('js');

(function () {
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var navAnchors = links.querySelectorAll('a');

  // Mobile menu
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!links.classList.contains('open'));
  });
  navAnchors.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Navbar background on scroll
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlighting
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    // Scroll reveal
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  // Profile photo fallback (initials) if the image fails to load
  var img = document.getElementById('profileImg');
  function showFallback() { img.parentElement.classList.add('no-img'); }
  img.addEventListener('error', showFallback);
  if (img.complete && img.naturalWidth === 0) showFallback();

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
