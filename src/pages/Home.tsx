import CustomerReviews from "@/components/Home/CustomerReviews";
import EdgenuityBot from "@/components/Home/EdgenuityBot";
import { FrequentlyAsk } from "@/components/Home/FrequentlyAsk";
import Pricing from "@/components/Home/Pricing";
import Banner from "@/components/Home/Shared/Banner";
import Support from "@/components/Home/Support";

const Home = () => {
  return (
    <div className="bg-neutral-900 relative z-30">
      <Banner />
      <EdgenuityBot />
      <CustomerReviews />
      <Pricing />
      <FrequentlyAsk />
      <Support />
    </div>
  );
};

export default Home;
