const Header = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#212020] px-6">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold text-gray-300 leading-tight">
          The Fastest <span className="text-sky-500">Edgenuity Bot</span>
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Get your classes done fast with{" "}
          <span className="font-semibold text-white">Nexus</span>. A fully
          customizable Edgenuity bot, designed to streamline your learning
          experience effortlessly.
        </p>
        <div className="mt-8">
          <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-gray-500 rounded-lg transition duration-300 hover:text-white translate transform  bg-slate-800 hover:bg-slate-500 ">
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
