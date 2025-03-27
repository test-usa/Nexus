import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link } from "react-scroll";
import logo from "../../public/image.png";
const Footer = () => {
  return (
    <CommonWrapper>
      <footer className="bg-[#212020] font-montserrat text-white py-16 px-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="text-4xl font-bold text-white mb-6">
              <img src={logo} alt="" className="w-16 h-14" />
            </div>
            <p className="text-gray-400 text-base mb-6 max-w-xs">
              Nexus - Finish your Edgenuity classes, fast.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Website</h3>
            <ul className="space-y-3">
              <li>
                <Link to="" smooth={true} duration={500}>
                  <a className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                    Features
                  </a>
                </Link>
              </li>
              <li>
                <a className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Credits</h3>
            <p>Made with EXBOT</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Nexus © All rights reserved
          </p>
        </div>
      </footer>
    </CommonWrapper>
  );
};

export default Footer;
