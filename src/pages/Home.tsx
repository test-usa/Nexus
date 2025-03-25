;
import CustomerReviews from "@/components/Home/CustomerReviews";
import EdgenuityBot from "@/components/Home/EdgenuityBot";
import { FrequentlyAsk } from "@/components/Home/FrequentlyAsk";
import Pricing from "@/components/Home/Pricing";
import Banner from "@/components/Home/Shared/Banner";
import CommonWrapper from "@/wrapper/CommonWrapper";
// import Video from "@/components/home/Video";


const Home = () => {
  return (
    <div>
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
