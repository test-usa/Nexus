import { CommonWrapperType } from "./wrapper.types";



const CommonWrapper = ({ children }: CommonWrapperType) => {
  return <div className="max-w-[1200px] mx-auto w-full p-3 relative z-30">{children}</div>;
};

export default CommonWrapper;
