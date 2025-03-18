import CustomerReviews from "@/components/home/CustomerReviews";
import EdgenuityBot from "@/components/home/EdgenuityBot";
import FreeKeyCard from "@/components/home/FreeKeyCard";
import { FrequentlyAsk } from "@/components/home/FrequentlyAsk";
import Header from "@/components/home/Header";
import Video from "@/components/home/Video";
import CommonWrapper from "@/wrapper/CommonWrapper";

const Home = () => {
  return (
    <div>
      <CommonWrapper>
        <Video />
        <EdgenuityBot />
        <CustomerReviews />
        <FrequentlyAsk />
        <FreeKeyCard />
      </CommonWrapper>
    </div>
  );
};

export default Home;
