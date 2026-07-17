document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const updateHeaderTone = () => {
    const progress = Math.min(window.scrollY / 520, 1);
    header.style.setProperty('--header-opacity', (.28 + progress * .54).toFixed(2));
    header.style.setProperty('--header-line-opacity', (.08 + progress * .12).toFixed(2));
  };

  window.addEventListener('scroll', updateHeaderTone, { passive: true });
  updateHeaderTone();

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  }));

  const viewer = document.querySelector('#visor-imagen');
  const viewerImage = document.querySelector('#imagen-grande');
  const previousButton = document.querySelector('.lightbox__control--previous');
  const nextButton = document.querySelector('.lightbox__control--next');
  const galleryCounter = document.querySelector('.lightbox__counter');
  let activeGallery = [];
  let activeIndex = 0;
  let touchStartX = 0;
  const closeViewer = () => { viewer.classList.remove('activo'); viewer.setAttribute('aria-hidden', 'true'); };
  const showGalleryImage = (index) => {
    activeIndex = (index + activeGallery.length) % activeGallery.length;
    viewerImage.src = activeGallery[activeIndex];
    const hasMultipleImages = activeGallery.length > 1;
    previousButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
    galleryCounter.textContent = hasMultipleImages ? `${activeIndex + 1} / ${activeGallery.length}` : '';
  };
  document.querySelector('.lightbox__close').addEventListener('click', closeViewer);
  viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeViewer(); });
  document.addEventListener('keydown', event => {
    if (!viewer.classList.contains('activo') || activeGallery.length < 2) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      showGalleryImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  previousButton.addEventListener('click', () => showGalleryImage(activeIndex - 1));
  nextButton.addEventListener('click', () => showGalleryImage(activeIndex + 1));
  viewer.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  viewer.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (activeGallery.length > 1 && Math.abs(distance) > 45) showGalleryImage(activeIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      activeGallery = project.dataset.gallery.split('|');
      showGalleryImage(0);
      viewerImage.alt = project.querySelector('h3').textContent;
      viewer.classList.add('activo'); viewer.setAttribute('aria-hidden', 'false');
    });
  });
});
