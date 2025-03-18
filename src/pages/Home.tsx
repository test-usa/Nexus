import Banner from "@/components/Banner";
import CustomerReviews from "@/components/home/CustomerReviews";
import EdgenuityBot from "@/components/home/EdgenuityBot";
import FreeKeyCard from "@/components/home/FreeKeyCard";
import { FrequentlyAsk } from "@/components/home/FrequentlyAsk";

import Video from "@/components/home/Video";
import Pricing from "@/components/Pricing";
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
        <FreeKeyCard />
      </CommonWrapper>
    </div>
  );
};

export default Home;
