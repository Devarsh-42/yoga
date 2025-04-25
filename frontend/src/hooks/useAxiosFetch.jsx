import { useEffect } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: `${BACKEND_URL}`, // TODO : Replace with base URL
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      return config;
    });

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        throw error;
      }
    );

    return () => {
      // Clean up interceptors when the component unmounts
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
