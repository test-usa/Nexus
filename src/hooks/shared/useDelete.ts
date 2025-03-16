import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useDelete = (route: string) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data, mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosSecure.delete(route + id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { data, mutate, isSuccess, isPending };
};

export default useDelete;
