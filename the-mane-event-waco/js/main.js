// ===== Mobile menu (hamburger -> X, full-screen overlay) =====
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('navOverlay');

hamburger.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ===== Scroll reveal =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Sticky call bar: only once the hero's own CTAs scroll out of view =====
const callBar = document.querySelector('.call-bar');
const heroActions = document.querySelector('.hero-actions');

if (callBar && heroActions) {
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            callBar.classList.toggle('show', !entry.isIntersecting);
        });
    }, { threshold: 0 });
    barObserver.observe(heroActions);
}
