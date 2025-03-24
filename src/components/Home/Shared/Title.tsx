import CommonWrapper from "@/wrapper/CommonWrapper";

type TitleProps = {
  title: string;
  subtitle?: string;
};
const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <CommonWrapper>
      <div className=" text-white space-y-5 w-[80%] mx-auto text-center font-montserrat">
        <h1 className="text-white text-3xl sm:text-4xl text-center ">
          {title}
        </h1>

        <p className=" w-5/6 sm:w-2/3  text-center text-xs sm:text-[16px] mx-auto text-gray-500">
          {subtitle}
        </p>
      </div>
    </CommonWrapper>
  );
};

export default Title;
