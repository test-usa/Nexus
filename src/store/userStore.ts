import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuth, ISginUpTypes, ISignInTypes, IUserStore } from "./Store.types";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const userStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      photo: null,
      token: null,

      signup_user: async (signupdata: ISginUpTypes) => {
        const axiosPublic = useAxiosPublic();
        try {
          const { data } = await axiosPublic.post("/auth/signup", signupdata);
          if (data.success) {
            // success toast show
          }
          if (data.error) {
            // error toast show
          }
        } catch (error) {
          console.log("signup problem", error);
        }
      },
      signIn_user: async (signdata: ISignInTypes) => {
        const axiosPublic = useAxiosPublic();
        try {
          const { data } = await axiosPublic.post("/auth/signin", signdata);
          if (data.success) {
            // success toast show
            set({ user: data.user, token: data?.token });
          }
          if (data.error) {
            // error toast show
          }
        } catch (error) {
          console.log("signIn error", error);
        }
      },

      auth: async (userData: IAuth) => {
        const { userName, email, token, photo } = userData;

        console.log(userName, email, token, "46 no linneeeeee");
        const axiosPublic = useAxiosPublic();
        try {
          if (userData) {
            const { data } = await axiosPublic.post("/auth/signin", {
              username,
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
      },
    }),
    { name: "user-store" }
  )
);

export default userStore;
