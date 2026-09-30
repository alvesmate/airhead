import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initShowreelVideo();

if (!reduceMotion) {
  initSmoothScroll();
  initHero();
  initFadeUps();
  initShowreel();
  initStatement();
  initFeatures();
  initSpecs();
  initBuy();
}

function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Якорные ссылки тоже скроллим плавно, с поправкой на липкую навигацию
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -52 });
    });
  });
}

function initHero() {
  // Появление при загрузке (стартовая прозрачность задана в CSS, чтобы не было вспышки)
  gsap.fromTo(
    '[data-hero]',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12 },
  );
  gsap.fromTo(
    '[data-hero-img]',
    { scale: 0.88, opacity: 0, filter: 'blur(20px)' },
    { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out', delay: 0.2 },
  );

  // При скролле шлем «наезжает» на зрителя, а текст уходит вверх
  gsap.to('.hero__media', {
    scale: 1.15,
    yPercent: 10,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__text', {
    opacity: 0,
    y: -80,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '45% top', scrub: true },
  });
}

function initFadeUps() {
  gsap.utils.toArray('[data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}

function initShowreel() {
  gsap.fromTo(
    '[data-reel]',
    { scale: 0.8, borderRadius: 64 },
    {
      scale: 1,
      borderRadius: radius(),
      ease: 'none',
      scrollTrigger: { trigger: '[data-reel]', start: 'top bottom', end: 'center center', scrub: true },
    },
  );
}

// Видео играет, только пока видно на экране; без автозапуска — если просили меньше движения
function initShowreelVideo() {
  const video = document.querySelector('video[data-reel]');
  if (!video) return;
  if (reduceMotion) {
    video.controls = true;
    return;
  }
  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
    { threshold: 0.25 },
  ).observe(video);
}

function initStatement() {
  gsap.fromTo(
    '[data-statement] .w',
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true },
    },
  );
}

function initFeatures() {
  const r = radius();
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    // Картинка раскрывается из «окошка» к полному размеру
    gsap.fromTo(
      el,
      { clipPath: `inset(18% 12% 18% 12% round ${r}px)` },
      {
        clipPath: `inset(0% 0% 0% 0% round ${r}px)`,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true },
      },
    );
    // и медленно едет внутри рамки (параллакс)
    const img = el.querySelector('img');
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }
  });
}

function initSpecs() {
  gsap.set('.spec', { opacity: 0, y: 60 });
  ScrollTrigger.batch('.spec', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }),
  });

  // Цифры «набегают» от нуля
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    if (Number.isNaN(end)) return;
    const dec = Number(el.dataset.dec) || 0;
    const counter = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = formatNumber(counter.v, dec)),
        }),
    });
  });
}

function initBuy() {
  gsap.from('.buy__media', {
    y: 120,
    opacity: 0,
    scale: 0.9,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.buy', start: 'top 75%' },
  });
}

function radius() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius')) || 28;
}

function formatNumber(v, dec) {
  return v
    .toLocaleString('ru-RU', { minimumFractionDigits: dec, maximumFractionDigits: dec })
    .replace('-', '−');
}
