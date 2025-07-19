document.addEventListener("DOMContentLoaded", () => {
  // Insert style to ensure pointer events
  const style = document.createElement('style');
  style.textContent = `
    img[data-testid="swiper-image"],
    .swiper-zoom-container,
    [data-cy="ad-gallery-view"] {
      pointer-events: auto !important;
      cursor: zoom-in !important;
    }
  `;
  document.head.appendChild(style);

  // Helper: open hi-res
  function openHiRes(src) {
    const hiRes = src.replace(/;s=\d+x\d+/, ";s=10000x7000");
    if (hiRes !== src) window.location.href = hiRes;
  }

  // Capture direct image clicks
  document.body.addEventListener(
    "click",
    (e) => {
      const img = e.target.closest("img[data-testid='swiper-image']");
      if (img) {
        e.stopImmediatePropagation();
        e.preventDefault();
        openHiRes(img.src);
      }
    },
    true
  );

  // Capture clicks on gallery view to override opening modal
  document.body.addEventListener(
    "click",
    (e) => {
      const gallery = e.target.closest("[data-cy='ad-gallery-view']");
      if (gallery) {
        const img = gallery.querySelector("img[data-testid='swiper-image']");
        if (img) {
          e.stopImmediatePropagation();
          e.preventDefault();
          openHiRes(img.src);
        }
      }
    },
    true
  );

  // Also handle thumbnail area in zoom carousel
  document.body.addEventListener(
    "click",
    (e) => {
      const thumb = e.target.closest("img[alt][src*='apollo.olxcdn.com']");
      if (thumb) {
        // delay to pick up updated main image after carousel click
        setTimeout(() => {
          const mainImg = document.querySelector("img[data-testid='swiper-image']");
          if (mainImg) openHiRes(mainImg.src);
        }, 100);
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );
});
