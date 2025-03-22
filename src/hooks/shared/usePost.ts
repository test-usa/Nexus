import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { toast } from "sonner";
type dataType = {
  message: string;
  success: boolean;
  data: [];
};
const usePost = (route: string) => {
  const axisosSecure = useAxiosSecure();
  const { data, mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (obj) => {
      const response = await axisosSecure.post(route, obj);
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
    },
  });
  return { data, mutate, isPending, isSuccess };
};

export default usePost;
