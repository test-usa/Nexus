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
            console.log(data, "siginup successfully");
            navigate("/signin");
            toast.success(data?.message);
          }
        } catch (error) {
          toast.error("Sign up failed, please try again");
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
      signIn_user: async (signdata: ISignInTypes) => {
        const axiosPublic = useAxiosPublic();
        try {
          set({ loading: true });
          const { data } = await axiosPublic.post("/auth/login", signdata);

          if (data?.success) {
            // success toast show
            set({ user: data?.data?.data });
            sessionStorage.setItem("token", data?.data?.accessToken);
            console.log(data, "login use from zustand");
            toast.success(data?.message);
          }
        } catch (error) {
          toast.error("Signin failed, please try again");
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },

      auth: async (userData: IAuth) => {
        const { name, email, token, photo } = userData;

        console.log(userData, "46 no linneeeeee");
        const axiosPublic = useAxiosPublic();
        try {
          if (userData) {
            const { data } = await axiosPublic.post("/auth/login", {
              name,
              email,
            });
            if (data.success) {
              // success toast show
              set({ user: data.user, token: data?.token });
            }
          }
        } catch (error) {
          console.log(error, "auth signin error");
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
