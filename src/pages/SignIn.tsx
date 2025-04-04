import { SubmitHandler, useForm } from "react-hook-form";
import { ISingIn } from "./Form.types";
import { Loader, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import userStore from "@/store/userStore";
import MainLogo from "../assets/../../public/mainLogo.png"
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
              className={`py-3 w-full text-white flex justify-center items-center gap-2 
                transform transition-all duration-300 
                bg-gradient-to-r to-[#615993] via-[#716188] from-[#9179AB] cursor-pointer  px-2 xl:px-4 text-sm xl:text-[16px] 
                border border-transparent hover:border-[#CDADFA] 
                hover:bg-transparent hover:shadow-sm hover:shadow-[#CDADFA] rounded
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
      {/* <p className=" text-center text-xs sm:text-[16px] my-7 text-gray-400">
        ANot a member yet? Welcome on board -
        <Link
          to="/signup"
          className=" underline hover:text-gray-400  transform translate-all duration-200 text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8]"
        >
          Sign up now!
        </Link>
      </p> */}
    </div>
  );
};

export default SignIn;
