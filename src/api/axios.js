import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL:'https://restorant-baratie2.onrender.com',
    withCredentials:true
})
instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred.');
      }
  return Promise.reject(error);})

export default instance