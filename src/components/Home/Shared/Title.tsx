type TitleProps = {
  title: string;
  subtitle?: string;
};
const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className=" w-full text-white text-center py-16">
      <h1 className="font-bold text-[24px] sm:text-[16px] md:text-[26px] lg:text-[32px] leading-tight tracking-[-1%]">
        {title}
      </h1>

      <p className=" text-gray-400 mt-2 text-sm sm:text-base md:text-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
