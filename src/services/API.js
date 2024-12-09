import axios from 'axios';
import { setPageError } from '@/stores/error';


 const baseUrl = 'https://animeapibdhd.vercel.app'


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
