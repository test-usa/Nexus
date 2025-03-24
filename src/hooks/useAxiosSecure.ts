import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "./useAxiosInstance";
const useAxiosSecure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // REQUEST INTERCEPTORS
    const requestInterceptor = useAxiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers.token = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //RESPONSE INTERCEPTORS
    const responseInterceptor = useAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("response error ---> axisosSecure", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          //   await logout_user(); // Clear user data on unauthorized
          setTimeout(() => navigate("/login"), 500);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      useAxiosInstance.interceptors.request.eject(requestInterceptor);
      useAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return useAxiosInstance;
};

export default useAxiosSecure;
