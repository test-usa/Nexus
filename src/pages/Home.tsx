import CustomerReviews from "@/components/home/CustomerReviews";
import EdgenuityBot from "@/components/home/EdgenuityBot";
import { FrequentlyAsk } from "@/components/home/FrequentlyAsk";
import Pricing from "@/components/home/Pricing";
import Banner from "@/components/home/Shared/Banner";
import CommonWrapper from "@/wrapper/CommonWrapper";
const Home = () => {
  return (
    <div className="bg-neutral-900">
      <CommonWrapper>
        <Banner />
        {/* <Video/> */}
        <EdgenuityBot />
        <CustomerReviews />
        <Pricing />
        <FrequentlyAsk />
      </CommonWrapper>
    </div>
  );
};

export default Home;
