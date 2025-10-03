// Image Viewer Class
class OLXImageViewer {
  constructor() {
    this.scale = 1;
    this.posX = 0;
    this.posY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.viewer = null;
    this.img = null;
  }

  create(imageUrl) {
    // Remove existing viewer if any
    this.destroy();

    // Create viewer container
    this.viewer = document.createElement('div');
    this.viewer.className = 'olx-hires-viewer';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'olx-viewer-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => this.destroy();
    
    // Create zoom controls
    const controls = document.createElement('div');
    controls.className = 'olx-viewer-controls';
    
    const zoomIn = document.createElement('button');
    zoomIn.innerHTML = '+';
    zoomIn.onclick = () => this.zoom(0.2);
    
    const zoomOut = document.createElement('button');
    zoomOut.innerHTML = '−';
    zoomOut.onclick = () => this.zoom(-0.2);
    
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '⟲';
    resetBtn.title = 'Reset view';
    resetBtn.onclick = () => this.reset();
    
    controls.appendChild(zoomOut);
    controls.appendChild(resetBtn);
    controls.appendChild(zoomIn);
    
    // Create image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'olx-viewer-image-container';
    
    this.img = document.createElement('img');
    this.img.src = imageUrl;
    this.img.className = 'olx-viewer-image';
    
    imgContainer.appendChild(this.img);
    
    // Assemble viewer
    this.viewer.appendChild(closeBtn);
    this.viewer.appendChild(controls);
    this.viewer.appendChild(imgContainer);
    
    document.body.appendChild(this.viewer);
    
    // Event listeners
    this.setupEvents();
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.viewer.classList.add('active');
    });
  }

  setupEvents() {
    // Touchpad and mouse wheel support
    this.viewer.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // Check if this is a pinch-to-zoom gesture (ctrlKey is set for pinch gestures)
      if (e.ctrlKey) {
        // Pinch zoom
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        this.zoom(delta);
      } else {
        // Touchpad pan or mouse wheel scroll
        const isTouchpad = Math.abs(e.deltaY) < 50 || e.deltaX !== 0;
        
        if (isTouchpad) {
          // Touchpad pan
          this.posX -= e.deltaX;
          this.posY -= e.deltaY;
          this.updateTransform();
        } else {
          // Mouse wheel zoom
          const delta = e.deltaY > 0 ? -0.1 : 0.1;
          this.zoom(delta);
        }
      }
    }, { passive: false });

    // Drag to pan
    this.mouseMoveHandler = (e) => {
      if (this.isDragging) {
        this.posX = e.clientX - this.startX;
        this.posY = e.clientY - this.startY;
        this.updateTransform();
      }
    };

    this.mouseUpHandler = () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.img) {
          this.img.style.cursor = 'grab';
        }
      }
    };

    this.img.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true;
        this.startX = e.clientX - this.posX;
        this.startY = e.clientY - this.posY;
        this.img.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);

    // Close on background click
    this.viewer.addEventListener('click', (e) => {
      if (e.target === this.viewer) {
        this.destroy();
      }
    });

    // Close on Escape key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.destroy();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  zoom(delta) {
    this.scale = Math.max(0.1, Math.min(5, this.scale + delta));
    this.updateTransform();
  }

  reset() {
    this.scale = 1;
    this.posX = 0;
    this.posY = 0;
    this.updateTransform();
  }

  updateTransform() {
    this.img.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.scale})`;
  }

  destroy() {
    if (this.viewer) {
      // Stop dragging immediately
      this.isDragging = false;
      
      // Remove event listeners
      document.removeEventListener('keydown', this.escapeHandler);
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      
      this.viewer.classList.remove('active');
      setTimeout(() => {
        if (this.viewer && this.viewer.parentNode) {
          this.viewer.parentNode.removeChild(this.viewer);
        }
        this.viewer = null;
        this.img = null;
      }, 300);
    }
  }
}

// Global viewer instance
let viewer = new OLXImageViewer();

// Helper function to convert to hi-res URL
function getHiResUrl(src) {
  return src.replace(/;s=\d+x\d+/, ";s=10000x7000");
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openViewer") {
    viewer.create(message.imageUrl);
  }
});

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
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

  // Capture direct image clicks
  document.body.addEventListener(
    "click",
    (e) => {
      const img = e.target.closest("img[data-testid='swiper-image']");
      if (img) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const hiResUrl = getHiResUrl(img.src);
        viewer.create(hiResUrl);
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
          const hiResUrl = getHiResUrl(img.src);
          viewer.create(hiResUrl);
        }
      }
    },
    true
  );

  // Handle thumbnail clicks in carousel
  document.body.addEventListener(
    "click",
    (e) => {
      const thumb = e.target.closest("img[alt][src*='apollo.olxcdn.com']");
      if (thumb && !e.target.closest("img[data-testid='swiper-image']")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        
        // Delay to pick up updated main image after carousel click
        setTimeout(() => {
          const mainImg = document.querySelector("img[data-testid='swiper-image']");
          if (mainImg) {
            const hiResUrl = getHiResUrl(mainImg.src);
            viewer.create(hiResUrl);
          }
        }, 100);
      }
    },
    true
  );
}