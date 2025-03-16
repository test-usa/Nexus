import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useUpdate = <T, R>(route: string) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data, mutate, isPending, isSuccess } = useMutation<R, Error, T>({
    mutationFn: async (obj: T) => {
      const response = await axiosSecure.patch<R>(route, obj);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      // toast here
      console.log(error, "update hooks error");
    },
  });
  return { data, mutate, isPending, isSuccess };
};

export default useUpdate;
