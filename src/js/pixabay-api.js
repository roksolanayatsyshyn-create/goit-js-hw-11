import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY="53351360-25752520852e3bd129b79410f";

export function getImagesByQuery(query){
return axios.get("",{params:{
  key:API_KEY,
  q:query,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
},})
  .then(response=>{
    if (!response.data || response.data.hits.length === 0) {
  iziToast.warning({
    message: 'На жаль, за вашим запитом зображень не знайдено. Спробуйте ще раз!',
    position: 'topRight',
  });
  return { hits: [] };
}

      return response.data;
    })

    .catch(err => {console.error(err);
    return { hits: [] }})}