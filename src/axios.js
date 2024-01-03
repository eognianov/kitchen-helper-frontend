import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = BASE_URL;

const token = localStorage.getItem('token')

if (token) {
    let decoded = VueJwtDecode.decode(token);
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    if (timestamp >= decoded.exp) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}
