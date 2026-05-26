(function() {
  var nav = document.getElementById('osbNav');
  var toggle = document.getElementById('osbNavToggle');
  var mobileMenu = document.getElementById('osbMobileMenu');
  var servicesToggle = document.getElementById('osbMobileServicesToggle');
  var servicesSub = document.getElementById('osbMobileServicesSub');
  var servicesChevron = document.getElementById('osbMobileServicesChevron');

  if (!nav) return;

  // Scroll compact
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        nav.classList.toggle('osb-nav--scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function() {
      var isOpen = toggle.classList.contains('osb-nav__toggle--open');
      toggle.classList.toggle('osb-nav__toggle--open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        mobileMenu.classList.add('osb-nav__mobile--open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('osb-nav__mobile--open');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile services sub-menu
  if (servicesToggle && servicesSub && servicesChevron) {
    servicesToggle.addEventListener('click', function(e) {
      e.preventDefault();
      servicesSub.classList.toggle('osb-nav__mobile-sub--open');
      servicesChevron.classList.toggle('osb-nav__mobile-chevron--open');
    });
  }

  // Close mobile on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && toggle) {
      toggle.classList.remove('osb-nav__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      if (mobileMenu) mobileMenu.classList.remove('osb-nav__mobile--open');
      document.body.style.overflow = '';
    }
  });

  // Active link detection
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var servicePages = ['/services/industrial-refurbishment', '/services/commercial-construction', '/services/infrastructure-and-civils', '/services/repurposing-and-fit-out', '/services/project-coordination', '/services'];

  var desktopLinks = document.querySelectorAll('.osb-nav__link');
  desktopLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href === 'javascript:void(0)') return;
    if (href === path) link.classList.add('osb-nav__link--active');
  });

  if (servicePages.indexOf(path) !== -1) {
    var sp = document.querySelector('.osb-nav__dropdown-parent > .osb-nav__link');
    if (sp) sp.classList.add('osb-nav__link--active');
  }

  var mobileLinks = document.querySelectorAll('.osb-nav__mobile-link, .osb-nav__mobile-sub-link');
  mobileLinks.forEach(function(link) {
    if (link.getAttribute('href') === path) link.style.color = '#B39B6A';
  });
})();