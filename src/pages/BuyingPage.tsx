import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import useFetch from "@/hooks/shared/useFetch";
import usePost from "@/hooks/shared/usePost";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
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
  _id: string;
  keyName: string;
};

const BuyingPage = () => {
  const id = useParams();
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const handleDescres = (): void => {
    setCount((prev) => Math.max(1, prev - 1));
  };
  const handleIncres = (): void => setCount((prev) => prev + 1);

  const {
    data: checkoutData,
    mutate,
    isPending,
  } = usePost<
    { url: string },
    { key: string | undefined; amount: number; keyType: string }
  >("/payment/subscribe");

  //**** ALL KEYS DATA ****/
  const { data = [] } = useFetch(`/key/all-key`);
  //**** FILTERED SINGLE KEY ****/
  const singleKey =
    data?.data?.filter(
      (item: any) => String(item?._id) === String(id?.id)
    )[0] || [];

  useEffect(() => {
    if (isChecked) {
      setPrice(singleKey?.prices?.serviceKey * count);
    } else {
      setPrice(singleKey?.prices?.regularKey * count);
    }
  }, [data, count, isChecked]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    console.log("Selected Key:", e.target.value);
  };

  const checkoutHanlder = () => {
    const payload: {
      key: string | undefined;
      amount: number;
      keyType: string;
    } = {
      key: id?.id,
      amount: count,
      keyType: isChecked ? "Service" : "Regular",
    };
    mutate(payload);
  };

  useEffect(() => {
    if (checkoutData?.data?.url) {
      window.open(checkoutData.data.url, "_blank");
    }
  }, [checkoutData]);

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
            ${singleKey?.prices?.regularKey} - ${singleKey?.prices?.serviceKey}
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
                value={selectedKey}
                onChange={handleSelectChange}
                className="w-full cursor-pointer bg-cyan-800/50 text-white py-2.5 px-2 rounded-md focus:outline-none"
              >
                {data?.data?.map((keys: TSinglePriceData) => {
                  return (
                    <option key={keys._id} value={keys.keyName}>
                      {" "}
                      {keys.keyName}
                    </option>
                  );
                })}
              </select>
            </div>

            <Separator className="bg-cyan-800" />

            <div className="flex items-center justify-between ">
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
              <div className="flex items-center  space-x-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(!!checked)}
                  id="terms2"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="terms2"
                  className={`text-xs cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white `}
                >
                  Service Key
                </label>
              </div>
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
              <p className="text-xs text-gray-300">${price}</p>

              {/* <p className="text-xs text-gray-300">{price}</p>; */}
            </div>

            <Button
              size="lg"
              className="w-full cursor-pointer text-[16px] sm:text-lg bg-cyan-800/50 hover:bg-cyan-900 rounded-md py-2  text-white focus:outline-none"
              onClick={checkoutHanlder}
            >
              {isPending ? <Loader className="animate-spin" /> : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingPage;
