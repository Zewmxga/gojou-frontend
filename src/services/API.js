import axios from 'axios';
import { setPageError } from '@/stores/error';

const baseUrl = process.env.VUE_APP_API_BASE_URL;
// const baseUrl = 'http://192.168.0.106:5000'


export default (url = baseUrl) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
  })

  instance.interceptors.response.use(undefined, err => {
     if(err.response && err.response?.data?.error?.status !== 404) {
       setPageError(
        err.response?.data?.error?.message,
         err.response?.data?.error?.status
       )
     }
    return Promise.reject(err);

  })

  return instance;
}
