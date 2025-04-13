import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import useFetch from "@/hooks/shared/useFetch";
// import usePost from "@/hooks/shared/usePost";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
  const [reqularKey, setReqularKey] = useState<number>(0);
  const [serviceKey, setServiceKey] = useState<number>(0);
  // const [keyNames, setKeyName] = useState<string>("");
  const [keyId, setKeyId] = useState<string>("");
  const [filteredKeys, setFilteredKeys] = useState<[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const handleDescres = (): void => {
    setCount((prev) => Math.max(1, prev - 1));
  };
  const handleIncres = (): void => setCount((prev) => prev + 1);

  // const {
  //   data: checkoutData,
  //   mutate,
  //   isPending,
  // } = usePost<
  //   { url: string },
  //   { key: string | undefined; amount: number; keyType: string }
  // >("/payment/subscribe");

  const url = import.meta.env.VITE_API_BASE_URL;

  const {
    data: checkoutData,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: async (obj: {
      key: string | undefined;
      amount: number;
      keyType: string;
    }) => {
      const response = await axios.post(
        `${url}/payment/create-purchase-link`,
        obj
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        // toast here
        toast.success(data?.message);
      }
    },
    onError: (error) => {
      console.log(error, "use post hook onError");
      // toast here
      toast.error(data?.message);
    },
  });
  console.log(reqularKey, "name");
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

  useEffect(() => {
    if (filteredKeys.length > 0) {
      const [firstKey = {} as TSinglePriceData] = filteredKeys;

      if (firstKey) {
        const { prices, _id } = firstKey;
        // Update regular and service key values
        setReqularKey(prices.regularKey);
        setServiceKey(prices.serviceKey);
        // setKeyName(keyName);

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
      key: keyId ? keyId : id?.id,
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
    <div className="py-28 font-montserrat bg-gray-950 flex items-center justify-center  p-6 ">
      <div className="flex flex-col sm:flex-row  justify-center w-full max-w-5xl  ml-0 gap-8 rounded-lg p-8 mt-14">
        {/**** IMAGE SECTION ****/}
        <div className=" rounded-2xl flex items-center justify-center w-full max-h-[400px]">
          <img
            src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
            alt="logo"
            className="max-h-[400px] h-auto"
          />
        </div>

        {/**** PURCHASE CARD SECTION ****/}
        <div className=" w-full  sm:max-w-lg border border-gray-600 p-6  rounded-2xl ">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-200">
            New Key
          </h2>
          <h2 className="text-sm sm:text-[16px] font-semibold mb-4 text-gray-200">
            ${reqularKey ? reqularKey : singleKey?.prices?.regularKey} - $
            {serviceKey ? serviceKey : singleKey?.prices?.serviceKey}
          </h2>

          <div className="space-y-3">
            <div className="mb-4">
              <label
                htmlFor="keyType"
                className="block text-xs text-gray-500 mb-2"
              >
                select key
              </label>
              <select
                id="keyType"
                value={selectedKey}
                onChange={handleSelectChange}
                className="w-full cursor-pointer bg-[#6359A6] text-white py-2.5 px-2 rounded focus:outline-none"
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
                  className=" cursor-pointer text-white  sm:w-8 w-6  h-8  text-sm bg-[#6359A6] rounded"
                >
                  -
                </Button>
                <p className="text-gray-200 text-sm sm:text-lg">{count}</p>
                <Button
                  onClick={handleIncres}
                  className=" cursor-pointer text-white  sm:w-8 w-6  h-8  text-sm bg-[#6359A6] rounded"
                >
                  +
                </Button>
              </div>
              <div className="flex items-center space-x-2">
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
            </div>

            <Button
              onClick={checkoutHanlder}
              className="w-full cursor-pointer  text-center text-[16px] sm:text-lg  hover:bg-[#7469bc] rounded py-5 font-normal  text-white focus:outline-none bg-[#6359A6] border-cyan-400 "
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
