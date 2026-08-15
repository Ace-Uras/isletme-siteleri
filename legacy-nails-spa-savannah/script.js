// Findings reveal one at a time as they scroll into view (storytelling cue).
const findings = document.querySelectorAll('.finding');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (findings.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  findings.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.32,0.72,0,1), transform 0.6s cubic-bezier(0.32,0.72,0,1)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  findings.forEach((el) => observer.observe(el));
}
