import Banner from "@/components/home/Shared/Banner";
import CustomerReviews from "@/components/home/CustomerReviews";
import EdgenuityBot from "@/components/home/EdgenuityBot";
import { FrequentlyAsk } from "@/components/home/FrequentlyAsk";
import Video from "@/components/home/Video";
import Pricing from "@/components/home/Pricing";
import CommonWrapper from "@/wrapper/CommonWrapper";

const Home = () => {
  return (
    <div>
      <CommonWrapper>
        <Banner />
        <Video />
        <EdgenuityBot />
        <CustomerReviews />
        <Pricing />
        <FrequentlyAsk />
      </CommonWrapper>
    </div>
  );
};

export default Home;
