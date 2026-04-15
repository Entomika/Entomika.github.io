document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('.content-section')];

  hamburger?.addEventListener('click', () => sidebar.classList.toggle('open'));

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sidebar?.classList.remove('open');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    });
  }, { root: null, rootMargin: '-25% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  const slides = [...document.querySelectorAll('.slide')];
  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  const slideImages = [...document.querySelectorAll('.slide img')];

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<img alt="Expanded gallery image">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');

  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index < 0) index = 0;
  let autoScroll;

  const show = i => {
    slides[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScroll = setInterval(() => {
      if (!lightbox.classList.contains('open')) show(index + 1);
    }, 4500);
  };

  const stopAutoScroll = () => {
    if (autoScroll) clearInterval(autoScroll);
  };

  prev?.addEventListener('click', () => {
    show(index - 1);
    startAutoScroll();
  });

  next?.addEventListener('click', () => {
    show(index + 1);
    startAutoScroll();
  });

  slideImages.forEach(image => {
    image.addEventListener('click', () => {
      const activeSlide = document.querySelector('.slide.active img');
      if (activeSlide) {
        lightboxImg.src = activeSlide.src;
        lightboxImg.alt = activeSlide.alt;
        lightbox.classList.add('open');
        stopAutoScroll();
      }
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    startAutoScroll();
  });

  startAutoScroll();
});
