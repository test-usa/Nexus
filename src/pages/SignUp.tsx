import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "./Form.types";
import { Loader, Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import userStore from "@/store/userStore";

// import { useGoogleAuth } from "@/hooks/auth/googleAuth";
// import { useEffect } from "react";
const SignUp = () => {
  const navigate = useNavigate();
  // const { user: authuser, handleGoogleLogin } = useGoogleAuth();
  const { signup_user, loading } = userStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    signup_user(data, navigate);
  };

  // useEffect(() => {
  //   auth(authuser);
  // }, [authuser]);
  return (
    <div className="bg-[var(--color-dashboardbg)] min-h-screen flex flex-col items-center justify-center font-montserrat ">
      <div className="border border-cyan-400 rounded mx-auto w-full  md:max-w-lg lg:max-w-2xl">
        <div className="p-8 w-full">
          <h1 className="text-center text-xl sm:text-2xl text-gray-400">
            Create an Account
          </h1>
          {/**** O AUTH START ****/}
          <div>
            <div className="flex items-center justify-center gap-2 py-4 ">
        
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
            <div className="flex items-center rounded border-gray-400 gap-x-3 border px-2 sm:px-4 py-3">
              <UserRound className="text-gray-400" />
              <input
                type="text"
                placeholder="UserName"
                {...register("name", {
                  required: true,
                })}
                className="focus:outline-none focus:ring-0 bg-none w-[80%] text-gray-400 focus:bg-transparent"
              />
            </div>
            {errors.name && (
              <p className="text-cyan-500 text-sm">{errors.name.message}</p>
            )}
            <div className="flex items-center rounded border-gray-400 gap-x-3 border px-2 sm:px-4 py-3">
              <Mail className="text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
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
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number & 1 special character",
                  },
                })}
                className="focus:outline-none focus:ring-0 bg-none w-[80%] text-gray-400 focus:bg-transparent bg-transparent"
              />
            </div>
            {errors.password && (
              <span className="text-cyan-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`py-3 w-full cursor-pointer text-white flex justify-center items-center gap-2 rounded transition-all transform duration-300  
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
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
      <p className=" text-center text-xs sm:text-[16px] my-7 text-gray-400">
        Already a member? -{" "}
        <Link
          to="/signin"
          className=" underline hover:text-gray-400 transform translate-all duration-200 text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8]"
        >
          Sign in now!
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
