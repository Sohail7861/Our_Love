const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
}

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    if (image.dataset.fallback && image.src !== image.dataset.fallback) {
      image.src = image.dataset.fallback;
    }
  }, { once: true });
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const heroImage = document.querySelector('.hero-image');

if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.18, 110);
        heroImage.style.setProperty('--parallax-offset', `${offset}px`);
        heroImage.style.transform = `translateY(${offset}px) scale(1.04)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}