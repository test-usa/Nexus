import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import useFetch from "@/hooks/shared/useFetch";
import usePost from "@/hooks/shared/usePost";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import MainLogo from "../../public/mainLogo.png";
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
const Purchase = () => {
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>();
  const [reqularKey, setReqularKey] = useState<number>(0);
  const [serviceKey, setServiceKey] = useState<number>(0);
  const [keyId, setKeyId] = useState<string>("");
  const [filteredKeys, setFilteredKeys] = useState<[]>([]);
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

  useEffect(() => {
    if (filteredKeys.length > 0) {
      const [firstKey = {} as TSinglePriceData] = filteredKeys;

      if (firstKey) {
        const { prices, _id } = firstKey;
        // Update regular and service key values
        setReqularKey(prices.regularKey);
        setServiceKey(prices.serviceKey);
        setKeyId(_id);

        // Set the correct price based on isChecked
        setPrice(
          isChecked ? prices.serviceKey * count : prices.regularKey * count
        );
      }
    }
  }, [filteredKeys, count, isChecked, price]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    if (e.target.value) {
      const key = e.target.value;
      const filterKey = data?.data.filter(
        (filterKeys: TSinglePriceData) => filterKeys.keyName === key
      );
      setFilteredKeys(filterKey);
    }
  };

  const checkoutHanlder = () => {
    const payload: {
      key: string | undefined;
      amount: number;
      keyType: string;
    } = {
      key: keyId,
      amount: count,
      keyType: isChecked ? "Service" : "Regular",
    };
    // console.log("payload data", payload, keyId, price);
    mutate(payload);
  };

  useEffect(() => {
    if (checkoutData?.data?.url) {
      window.open(checkoutData.data.url, "_blank");
    }
  }, [checkoutData]);
  return (
    <div className="min-h-screen bg-[#212020] flex items-center justify-center p-6">
      <div className="flex flex-col sm:flex-row  justify-center w-full max-w-5xl gap-8 rounded p-6">
        {/**** IMAGE SECTION ****/}
        <div className=" bg-gradient-to-tr from-black/30 to-gray-800 rounded-2xl flex items-center justify-center w-full max-h-[400px]">
          <img
            src={MainLogo}
            alt="logo"
            className=" max-h-[400px] w-full h-auto rounded"
          />
        </div>

        {/**** PURCHASE CARD SECTION ****/}
        <div className=" w-full  sm:max-w-lg border border-gray-600 p-6  rounded-2xl shadow-lg shadow-gray-600 ">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-200">
            New Key
          </h2>
          <h2 className="text-sm sm:text-[16px] font-semibold mb-4 text-gray-200">
            ${reqularKey ? reqularKey : 0} - ${serviceKey ? serviceKey : 0}
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
                <option value="select">Select Key</option>
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

export default Purchase;
