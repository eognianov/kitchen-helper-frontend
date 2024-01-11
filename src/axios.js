import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

