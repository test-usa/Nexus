import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFetch from "@/hooks/shared/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";

type TSinglePriceData = {
  prices: {
    regularKey: number;
    serviceKey: number;
  };
  users: {
    regularKey: number;
    serviceKey: number;
  };
  keyName: string;
};

const BuyingPage = () => {
  const id = useParams();
  const { data, isSuccess, isLoading, refetch } = useFetch(
    `/key/single-key/${id?.id}`
  );

  console.log(data?.data, "params single data");

  const [count, setCount] = useState<number>(1);
  const handleDescres = (): void => setCount((prev) => Math.max(1, prev - 1));
  const handleIncres = (): void => setCount((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-[#212020] flex items-center justify-center p-6">
      <div className="flex flex-col sm:flex-row  justify-center w-full max-w-5xl gap-8 rounded-lg p-6">
        {/**** IMAGE SECTION ****/}
        <div className=" bg-gradient-to-tr from-black/30 to-gray-800 rounded-2xl flex items-center justify-center w-full max-h-[400px]">
          <img
            src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
            alt="logo"
            className="object-contain w-full h-auto rounded-lg"
          />
        </div>

        {/**** PURCHASE CARD SECTION ****/}
        <div className=" w-full  sm:max-w-lg border border-gray-600 p-6  rounded-2xl shadow-lg shadow-gray-600 ">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-200">
            New Key
          </h2>
          <h2 className="text-sm sm:text-[16px] font-semibold mb-4 text-gray-200">
            $2.50 - $300.00
          </h2>

          <div className="space-y-3">
            <div className="mb-4">
              <label
                htmlFor="keyType"
                className="block text-xs text-gray-500 mb-2"
              >
                Select one*
              </label>
              <select
                id="keyType"
                className="w-full cursor-pointer bg-cyan-800/50 text-white py-2.5 px-2 rounded-md focus:outline-none"
              >
                <option value="day">1 Day</option>
                <option value="week">1 Week</option>
                <option value="month">1 Month</option>
                <option value="three_month">3 Months</option>
                <option value="year">1 Year</option>
                <option value="lifetime">Lifetime</option>
              </select>
            </div>

            <Separator className="bg-cyan-800" />

            <div className="flex items-center gap-x-5">
              <Button
                onClick={handleDescres}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 sm:w-8 w-6  h-8 text-black text-sm"
              >
                -
              </Button>
              <p className="text-gray-200 text-sm sm:text-lg">{count}</p>
              <Button
                onClick={handleIncres}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 sm:w-8 w-6  h-8 text-black text-sm"
              >
                +
              </Button>
            </div>

            <div className="space-y-3 flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-sm font-semibold text-gray-200">
                  Subtotal
                </h1>
                <p className="text-xs text-gray-500">
                  Total will be calculated at checkout
                </p>
              </div>
              <p className="text-xs text-gray-300">20</p>
            </div>

            <Button
              size="lg"
              className="w-full cursor-pointer text-[16px] sm:text-lg bg-cyan-800/50 hover:bg-cyan-900 rounded-md py-2  text-white focus:outline-none"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingPage;
