import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAxiosSecure from "../useAxiosSecure";

type ApiResponse<T> = {
  message?: string;
  success: boolean;
  data: T;
};

const useUpdate = <T, V>(route: string, queryKey?: string) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, mutate, isPending, isSuccess } = useMutation<
    ApiResponse<T>,
    Error,
    V
  >({
    mutationFn: async (obj: V) => {
      const response = await axiosSecure.patch<ApiResponse<T>>(route, obj);
      return response.data;
    },
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
      toast.success(data.message || "Update successful!");
      console.log("Update success:", data);
    },
    onError: (error: any) => {
      console.error("Update hook error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while updating."
      );
    },
  });

  return { data, mutate, isPending, isSuccess };
};

export default useUpdate;
