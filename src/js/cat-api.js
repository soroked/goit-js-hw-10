import axios from "axios";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = "live_UOR2MHSlJ55z0X7k97GZvdN07YZRW2AxdHkkGbb5AISDlHlIfqJ4KRNSeMcheb01";

export function fetchBreeds() {
  return axios.get('/breeds').then(res => res.data)}

export function fetchCatByBreed(breedId) {
  return axios.get('/images/search?breed_ids=' + breedId)
    .then(res => res.data)}