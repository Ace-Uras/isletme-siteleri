// Reveal team cards one by one as they scroll into view
const cards = document.querySelectorAll('.team-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cards.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => observer.observe(card));
}
