import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAxiosInstance from "../useAxiosInstance";
import Cookies from "js-cookie";
const useAxiosSecure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    // REQUEST INTERCEPTORS
    const requestInterceptor = UseAxiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //RESPONSE INTERCEPTORS
    const responseInterceptor = UseAxiosInstance.interceptors.response.use(
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
      UseAxiosInstance.interceptors.request.eject(requestInterceptor);
      UseAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return UseAxiosInstance;
};

export default useAxiosSecure;
