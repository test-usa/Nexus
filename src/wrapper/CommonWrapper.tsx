import { CommonWrapperType } from "./wrapper.types";



const CommonWrapper = ({ children }: CommonWrapperType) => {
  return <div className="max-w-[1200px] mx-auto p-3">{children}</div>;
};

export default CommonWrapper;
