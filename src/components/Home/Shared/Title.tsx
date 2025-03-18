type TitleProps = {
  title: string;
  subtitle?: string;
};
const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className=" w-full text-white text-center">
      <h1 className="text-white text-[30px] sm:text-4xl text-center ">
        {title}
      </h1>

      <p className=" mt-5 w-5/6 sm:w-2/3 px-10 text-center text-sm sm:text-[16px] mx-auto text-gray-500">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
