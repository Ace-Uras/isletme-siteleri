// Daisy line-art reveal on scroll
const daisy = document.querySelector('.daisy-draw');
if (daisy && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        daisy.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(daisy);
} else if (daisy) {
  daisy.classList.add('in-view');
}

// Photo lightbox
const heroImg = document.getElementById('hero-img');
const zoomBtn = document.getElementById('hero-zoom-btn');
const lightbox = document.getElementById('lightbox');
const closeBtn = document.getElementById('lightbox-close');

function openLightbox() {
  lightbox.hidden = false;
  closeBtn.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  zoomBtn.focus();
}

if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
if (heroImg) heroImg.addEventListener('click', openLightbox);
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
});
