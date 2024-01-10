import axios from "axios";
// import VueJwtDecode from "vue-jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = BASE_URL;

// Access-Control-Allow-Origin: *
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// const token = localStorage.getItem('token')
//
// if (token) {
//     let decoded = VueJwtDecode.decode(token);
//     const currentDate = new Date();
//     const timestamp = currentDate.getTime();
//
//     if (timestamp < decoded.exp * 1000) {
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
//     }
// }
