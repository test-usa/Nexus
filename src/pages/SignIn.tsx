import { SubmitHandler, useForm } from "react-hook-form";
import { ISingIn } from "./Form.types";
import { Loader, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import userStore from "@/store/userStore";
// import { useGoogleAuth } from "@/hooks/auth/googleAuth";
// import { useEffect } from "react";

const SignIn = () => {
  const { signIn_user, loading } = userStore();
  const navigate = useNavigate();
  // const { user: authuser, handleGoogleLogin } = useGoogleAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingIn>();
  const onSubmit: SubmitHandler<ISingIn> = (data) => {
    signIn_user(data, navigate);
  };
  // useEffect(()=>{
  //   auth(authuser)
  // },[authuser])
  return (
    <div className=" bg-[var(--color-dashboardbg)] min-h-screen flex flex-col items-center justify-center font-montserrat ">
      <div className="border-cyan-400 rounded mx-auto w-full border md:max-w-lg lg:max-w-2xl">
        <div className="p-8 w-full">
          <h1 className="text-center text-xl sm:text-2xl text-gray-400">
            Sign in
          </h1>
          {/**** O AUTH START ****/}
          <div>
            <div className="flex items-center justify-center gap-2 py-4">
              {/* <button className="border p-0.5 sm:p-1 bg-slate-800 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#8c9eff"
                    d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => handleGoogleLogin()}
                className="border p-0.5 sm:p-1 bg-gray-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </button> */}
              <img
                src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
                alt="logo"
                className="max-w-16 cursor-pointer"
              />
            </div>
            {/* <p className="text-sm text-center text-gray-400">OR</p> */}
          </div>
          {/**** SIGNUP FORM HERE ****/}
          <form
            className="flex flex-col gap-6 p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-x-3 border px-2 sm:px-4 py-3 rounded border-gray-400">
              <Mail className="text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                })}
                className="focus:outline-none focus:ring-0 bg-none w-[80%] text-gray-400 focus:bg-transparent bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-cyan-500 text-sm">{errors.email.message}</p>
            )}
            <div className="flex items-center gap-x-3 border px-2 sm:px-4 py-3 rounded border-gray-400">
              <Lock className="text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
                className="focus:outline-none focus:ring-0 bg-none w-[80%] text-gray-400 focus:bg-transparent bg-transparent"
              />
            </div>
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{"wrong password"}</p>
            )} */}
            <button
              type="submit"
              disabled={loading}
              className={`py-3 w-full text-white flex justify-center items-center gap-2 rounded transition
                cursor-pointer
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-cyan-600"
          }
        `}
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>{" "}
        </div>
      </div>
      <p className=" text-center text-xs sm:text-[16px] my-7 text-gray-400">
        ANot a member yet? Welcome on board -
        <Link
          to="/signup"
          className=" underline hover:text-gray-400  transform translate-all duration-200 text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8]"
        >
          Sign up now!
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
