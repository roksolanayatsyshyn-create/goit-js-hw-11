import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";


let lightboxInstance = null; // інкапсульований інстанс

const refs = {};

function initLightbox(selector = '.gallery a') {

  if (lightboxInstance) return;
  lightboxInstance = new SimpleLightbox(selector, {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}


function refreshLightbox() {
  if (!lightboxInstance) {
    initLightbox();
    return;
  }
  lightboxInstance.refresh();
}


export function destroyLightbox() {
  if (!lightboxInstance) return;
  lightboxInstance.destroy();
  lightboxInstance = null;
}


export function createGallery(images, galleryEl) {
  if (!images || images.length === 0) return Promise.resolve();

  const galleryObj = images.map(image => ({
    webformatURL: image.webformatURL,
    largeImageURL: image.largeImageURL,
    alt: image.tags,
    likes: image.likes,
    views: image.views,
    comments: image.comments,
    downloads: image.downloads,
  }));

  const markup = galleryObj
    .map(
      img => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img 
            class="gallery-image"
            src="${img.webformatURL}"
            alt="${img.alt}"
          />
        </a>
        <div class="gallery-image-info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </li>
      `
    )
    .join('');

   
  galleryEl.innerHTML = markup;


  const imagesList = galleryEl.querySelectorAll('img');
  const loadPromises = [...imagesList].map(img => new Promise(resolve => {
    if (img.complete) return resolve();
    img.onload = img.onerror = resolve;
  }));


  return Promise.all(loadPromises).then(() => {
   
    refreshLightbox();
  });
}

export function clearGallery(galleryEl){
  galleryEl.innerHTML = "";
};
export function showLoader(loaderEl){
  if (!loaderEl) return;
  loaderEl.classList.remove("hidden")
};
export function hideLoader(loaderEl){
  if (!loaderEl) return;
  loaderEl.classList.add("hidden")};
