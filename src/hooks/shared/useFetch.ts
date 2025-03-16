import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useFetch = (route: string, params = {}) => {
  const axiosSecure = useAxiosSecure();
  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["data", route, JSON.stringify(params)],
    queryFn: async () => {
      const res = await axiosSecure.get(route, { params });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
  return { data, isSuccess, isLoading, refetch };
};

export default useFetch;
