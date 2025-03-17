import EdgenuityBot from "@/components/home/EdgenuityBot";
import FreeKeyCard from "@/components/home/FreeKeyCard";
import { FrequentlyAsk } from "@/components/home/FrequentlyAsk";
import Header from "@/components/home/Header";
import Video from "@/components/home/Video";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Video />
      <EdgenuityBot />
      <FrequentlyAsk />
      <FreeKeyCard />
    </div>
  );
};

export default Home;
