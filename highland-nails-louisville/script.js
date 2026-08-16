// Gentle scroll-entry fade for bento cells.
const cells = document.querySelectorAll('.cell');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cells.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cells.forEach((cell) => observer.observe(cell));
} else {
  cells.forEach((cell) => cell.classList.add('in-view'));
}
