document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-links a');
  const backToTop = document.getElementById('backToTop');
  const counters = document.querySelectorAll('[data-counter]');

  setTimeout(() => preloader?.classList.add('hidden'), 450);

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 500);

    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  let countersStarted = false;
  const stats = document.querySelector('.stats');
  const counterObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.counter);
      const isDecimal = String(target).includes('.');
      let current = 0;
      const increment = target / 70;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = isDecimal ? target.toFixed(2) : Math.floor(target);
          clearInterval(timer);
        } else {
          counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }
      }, 18);
    });
  }, { threshold: 0.35 });

  if (stats) counterObserver.observe(stats);
});
