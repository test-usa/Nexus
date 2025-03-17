import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full p-2 h-16 flex items-center gap-x-4 justify-between font-montserrat">
      {/***** IMAGE START *****/}
      <div className="max-w-14 ">
        <img
          src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
          alt="logo"
          className="w-full "
        />
      </div>
      {/***** NAVIGATIONBAR START *****/}
      <div className="flex items-center gap-x-8 text-gray-400">
        <NavLink to="" className="hover:text-white translate transform duration-300">Features</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">Review</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">Pricing</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">FAQ</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">Blog</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">Support</NavLink>
      </div>
      {/**** AUTH OR PURCHASING ****/}
      <div className="flex items-center gap-x-4 text-gray-400 ">
        <NavLink to="" className="hover:text-white translate transform duration-300">Purchase</NavLink>
        <NavLink to="" className="hover:text-white translate transform duration-300">SignIn</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
