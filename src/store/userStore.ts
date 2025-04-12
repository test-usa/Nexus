import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuth, ISginUpTypes, ISignInTypes, IUserStore } from "./Store.types";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { toast } from "sonner";

const userStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      photo: null,
      token: null,
      loading: false,
      signup_user: async (
        signupdata: ISginUpTypes,
        navigate: (path: string) => void
      ) => {
        const axiosPublic = useAxiosPublic();
        try {
          set({ loading: true });
          const { data } = await axiosPublic.post(
            "/user/create-user",
            signupdata
          );
          if (data?.success) {
            // success toast show
            navigate("/adminlogin");
            toast.success(data?.message);
          }
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message === "Duplicate Entry") {
            toast.error("User already exist");
          } else {
            toast.error("Somthing went wrong");
          }
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
      signIn_user: async (
        signdata: ISignInTypes,
        navigate: (path: string) => void
      ) => {
        const axiosPublic = useAxiosPublic();
        try {
          set({ loading: true });
          const { data } = await axiosPublic.post("/auth/login", signdata);

          if (data?.success) {
            // success toast show
            set({ user: data?.data?.data });
            sessionStorage.setItem("token", data?.data?.accessToken);
            toast.success(data?.message);
            navigate("/");
          }
        } catch (error) {
          toast.error("Signin failed, please try again");
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },

      auth: async (userData: IAuth) => {
        const { name, email, token } = userData;

        const axiosPublic = useAxiosPublic();
        try {
          if (userData) {
            const { data } = await axiosPublic.post("/auth/login", {
              name,
              email,
            });
            if (data.success) {
              toast.success("Signin successfull");
              sessionStorage.setItem("token", token);
            }
          }
        } catch (error) {
          toast.success("Signin incomplete, try again");
        }
      },
      logout_user: () => {
        set({ user: null, token: null });
        sessionStorage.removeItem("token");
        if (!sessionStorage.getItem("token")) {
          toast.success("signout successfull");
        }
      },
    }),
    { name: "user-store" }
  )
);

export default userStore;
