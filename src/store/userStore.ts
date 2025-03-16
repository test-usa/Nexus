import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISginUpTypes, ISignInTypes, IUserStore } from "./Store.types";
import useAxiosPublic from "@/hooks/shared/UseAxiosPublic";

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
      logout_user: () => {
        set({ user: null, token: null });
      },
    }),
    { name: "user-store" }
  )
);

export default userStore;
