import CommonWrapper from "@/wrapper/CommonWrapper";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
const Footer = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-950">
      <CommonWrapper>
        <footer className="  font-montserrat text-[var(--color-textcolor)] py-16 px-8">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="text-4xl font-bold text-[var(--color-textcolor)] mb-6">
                <img
                  src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
                  alt="logo"
                  className="w-14 h-14"
                />
              </div>
              <p className="text-[var(--color-textsecondarycolor)] text-base mb-6 max-w-xs">
                Exodus - Finish your Edgenuity classes, fast.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-4">Website</h3>
              <ul className="space-y-3">
                <li>
                  {location.pathname !== "/" ? (
                    <NavLink
                      to="/"
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Feature
                    </NavLink>
                  ) : (
                    <Link
                      to="Feature"
                      smooth
                      duration={1200}
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Feature
                    </Link>
                  )}
                </li>
                <li>
                  {location.pathname !== "/" ? (
                    <NavLink
                      to="/"
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Reviews
                    </NavLink>
                  ) : (
                    <Link
                      to="Review"
                      smooth
                      duration={1200}
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Reviews
                    </Link>
                  )}
                </li>
                <li>
                  {location.pathname !== "/" ? (
                    <NavLink
                      to="/"
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Pricing
                    </NavLink>
                  ) : (
                    <Link
                      to="Pricing"
                      smooth
                      duration={1200}
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      Pricing
                    </Link>
                  )}
                </li>
                <li>
                  {location.pathname !== "/" ? (
                    <NavLink
                      to="/"
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      FAQ
                    </NavLink>
                  ) : (
                    <Link
                      to="FAQ"
                      smooth
                      duration={1200}
                      // onClick={() => setToggle(false)}
                      className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                    >
                      FAQ
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] text-[var(--color-textsecondarycolor)]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-4">Credits</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#CDADFA] via-cyan-500 to-[#B5A2D8] cursor-pointer translate transform duration-300 text-sm lg:text-[16px] ">
                Made with Exodus
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-[var(--color-textsecondarycolor)] text-sm mb-4">
              Exodus © All rights reserved
            </p>
          </div>
        </footer>
      </CommonWrapper>
    </div>
  );
};

export default Footer;
