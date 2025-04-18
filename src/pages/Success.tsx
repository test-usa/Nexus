import CommonWrapper from "@/wrapper/CommonWrapper";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="font-montserrat bg-[#182029] w-full">
      <div className="max-w-[1540px] mx-auto flex-col items-center justify-center py-44 ">
        <CommonWrapper>
          <Link
            to="/"
            className="flex items-center gap-x-2 text-[var(--color-textcolor)]"
          >
            <IoIosArrowRoundBack className="text-2xl" />
            <span>Back to Home</span>
          </Link>
          <div className="mt-8 space-y-4">
            <h1 className="lg:text-2xl text-xl text-[var(--color-textcolor)] font-semibold">
              Thank you for choosing Exodus! ❤️{" "}
            </h1>
            <p className="lg:text-[16px] text-sm text-[var(--color-textsecondarycolor)]">
              {" "}
              Your setup instructions have been sent to your email (the one
              provided at checkout or linked with Apple Pay).
            </p>
            <h1 className="lg:text-xl text-sm text-[var(--color-textcolor)]">
              🔹 Didn’t receive the email?
            </h1>
            <ul className="list-disc ml-10 text-[var(--color-textsecondarycolor)] space-y-1">
              <li>Check your spam/junk folder.</li>
              <li>Ensure you used the correct email during checkout.</li>
              <li>
                Still need help?{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Contact Support
                </a>
              </li>
            </ul>
            <p className="lg:text-[16px] text-sm text-[var(--color-textsecondarycolor)]">
              We appreciate your support and hope you enjoy using Exodus! 🚀
            </p>
          </div>
        </CommonWrapper>
      </div>
    </div>
  );
};

export default Success;
