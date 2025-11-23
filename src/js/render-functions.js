

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

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = markup;

  const imagesList = tempDiv.querySelectorAll("img");

  const loadPromises = [...imagesList].map(img => {
    return new Promise(resolve => {
      if (img.complete) return resolve(); 
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  
  return Promise.all(loadPromises).then(() => {
   galleryEl.innerHTML = markup;
  });
}

export function clearGallery(galleryEl){
  galleryEl.innerHTML = "";
};
export function showLoader(loaderEl){
  loaderEl.classList.remove("hidden")
};
export function hideLoader(loaderEl){
  loaderEl.classList.add("hidden")};
