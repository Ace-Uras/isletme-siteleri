// Bento cells fade up into place as the section enters view (hierarchy cue).
const cells = document.querySelectorAll('.bento-cell');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cells.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  cells.forEach((cell) => {
    cell.style.opacity = '0';
    cell.style.transform = 'translateY(16px)';
    cell.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cells.forEach((cell) => observer.observe(cell));
}
