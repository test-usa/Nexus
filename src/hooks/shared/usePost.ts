import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const usePost = <T, R>(route: string) => {
  const axisosSecure = useAxiosSecure();
  const { data, mutate, isPending, isSuccess } = useMutation<R, Error, T>({
    mutationFn: async (obj: T) => {
      const response = await axisosSecure.post<R>(route, obj);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        // toast here
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
