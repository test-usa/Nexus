import CommonWrapper from "@/wrapper/CommonWrapper";
import "animate.css";

type TitleProps = {
  title: string;
  subtitle?: string;
};
const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <CommonWrapper>
      <div className="  space-y-5 w-[80%] mx-auto text-center font-montserrat">
        <h1 className="text-[var(--color-textcolor)] text-3xl sm:text-4xl text-center ">
          {title}
        </h1>

        <p className=" w-5/6 sm:w-2/3  text-center text-xs sm:text-[16px] mx-auto text-[var(--color-textsecondarycolor)]">
          {subtitle}
        </p>
      </div>
    </CommonWrapper>
  );
};

export default Title;
