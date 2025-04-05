import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { toast } from "sonner";
export type ApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};

const usePost = <T, V>(route: string) => {
  const axisosSecure = useAxiosSecure();
  const { data, mutate, isPending, isSuccess } = useMutation<
    ApiResponse<T>,
    Error,
    V
  >({
    mutationFn: async (obj) => {
      const response = await axisosSecure.post<ApiResponse<T>>(route, obj);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        // toast here
        toast.success(data?.message);
        console.log("post hooks data here", data);
      }
    },
    onError: (error) => {
      console.log(error, "use post hook onError");
      // toast here
      toast.error(data?.message);
    },
  });
  return { data, mutate, isPending, isSuccess };
};

export default usePost;
