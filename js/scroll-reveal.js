(function() {
  var elements = document.querySelectorAll('.osb-reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        if (delay > 0) {
          setTimeout(function() { entry.target.classList.add('is-visible'); }, delay);
        } else {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function(el) { observer.observe(el); });
})();