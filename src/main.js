import {getImagesByQuery} from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader} from './js/render-functions';
import axios from "axios";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

// import SimpleLightbox from "simplelightbox";

// import "simplelightbox/dist/simple-lightbox.min.css";



// refs
export const refs={
  form: document.querySelector('.form'),
  gallery:document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
}
// console.log(refs)
// let galleryImg= new SimpleLightbox ('.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });


 async function onFormSubmit(event){
event.preventDefault();
 
const query = event.target.elements["search-text"]?.value.trim();
if (!query) return;

 clearGallery(refs.gallery);
 showLoader(refs.loader);

 try{ 
  const data =await getImagesByQuery(query);

    if (!data.hits || data.hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;}
     
    await createGallery(data.hits, refs.gallery); 
    // galleryImg.refresh();
  }catch (err) {
    console.error(err);
  }finally {
    hideLoader(refs.loader);}
 

}
// listener
refs.form.addEventListener('submit', onFormSubmit)