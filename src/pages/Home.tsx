import CustomerReviews from "@/components/Home/CustomerReviews";
import EdgenuityBot from "@/components/Home/EdgenuityBot";
import { FrequentlyAsk } from "@/components/Home/FrequentlyAsk";
import Pricing from "@/components/Home/Pricing";
import Banner from "@/components/Home/Shared/Banner";
import CommonWrapper from "@/wrapper/CommonWrapper";

const Home = () => {
  return (
    <div className="bg-neutral-900">
      <Banner />
      <CustomerReviews />
      <CommonWrapper>
        {/* <Video/> */}
        <EdgenuityBot />
        <Pricing />
        <FrequentlyAsk />
      </CommonWrapper>
      
    </div>
  );
};

export default Home;
