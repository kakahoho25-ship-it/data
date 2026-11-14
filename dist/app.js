(() => {
  const config = window.DIA_SITE_CONFIG || { recruitment: {}, forms: {} };

  document.querySelectorAll('[data-config]').forEach((element) => {
    const value = config.recruitment[element.dataset.config];
    if (value) element.textContent = value;
  });

  document.querySelectorAll('.js-form-link').forEach((link) => {
    const url = config.forms[link.dataset.form];
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.classList.add('is-pending');
      link.setAttribute('aria-label', `${link.textContent.trim()} (폼 준비 중)`);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#apply').scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.form-pending-note').forEach((note) => { note.hidden = false; });
      });
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('details[open]').forEach((openDetail) => {
        if (openDetail !== detail) openDetail.open = false;
      });
    });
  });
})();
