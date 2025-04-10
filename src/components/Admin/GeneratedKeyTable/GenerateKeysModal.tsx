
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Separator } from "@/components/ui/separator";
  import { Loader } from "lucide-react";
  
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
  
  interface GenerateKeysModalProps {
    isGenerateModalOpen: boolean;
    setIsGenerateModalOpen: (open: boolean) => void;
    selectedKeyType: string;
    setSelectedKeyType: (keyType: string) => void;
    keyTypes: TSinglePriceData[];
    filteredKeys: TSinglePriceData[];
    setFilteredKeys: (keys: TSinglePriceData[]) => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>; // Updated type
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>; // Updated type
    email: string | undefined;
    handleGenerateKeys: () => void;
    isGenerating: boolean;
  }
  
  const GenerateKeysModal = ({
    isGenerateModalOpen,
    setIsGenerateModalOpen,
    selectedKeyType,
    setSelectedKeyType,
    keyTypes,
    setFilteredKeys,
    count,
    setCount,
    isChecked,
    setIsChecked,
    handleGenerateKeys,
    isGenerating,
  }: GenerateKeysModalProps) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedKeyType(e.target.value);
      if (e.target.value) {
        const key = e.target.value;
        const filterKey = keyTypes?.filter(
          (filterKeys: TSinglePriceData) => filterKeys.keyName === key
        );
        setFilteredKeys(filterKey);
      }
    };
  
    const handleDescres = (): void => {
      setCount((prev) => Math.max(1, prev - 1));
    };
  
    const handleIncres = (): void => {
      setCount((prev) => prev + 1);
    };
  
    return (
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            Generate New Keys
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
          <DialogHeader>
            <DialogTitle>Generate New Keys</DialogTitle>
            <DialogDescription>
              Create new license keys for distribution
            </DialogDescription>
          </DialogHeader>
  
          {/* Generate Keys Form */}
          <div className="space-y-4 py-4">
            <div className="mb-4">
              <Label
                htmlFor="keyType"
                className="block text-sm text-gray-300 mb-2"
              >
                Select Key Type*
              </Label>
              <select
                id="keyType"
                value={selectedKeyType}
                onChange={handleSelectChange}
                className="w-full cursor-pointer bg-cyan-800/50 text-white py-2.5 px-2 rounded-md focus:outline-none"
              >
                <option value="">Select Key</option>
                {keyTypes?.map((keys: TSinglePriceData) => (
                  <option key={keys._id} value={keys.keyName}>
                    {keys.keyName}
                  </option>
                ))}
              </select>
            </div>
  
            <Separator className="bg-cyan-800" />
  
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-5">
                <Button
                  onClick={handleDescres}
                  className="bg-gray-200 cursor-pointer hover:bg-gray-300 sm:w-8 w-6 h-8 text-black text-sm"
                >
                  -
                </Button>
                <p className="text-gray-200 text-sm sm:text-lg">{count}</p>
                <Button
                  onClick={handleIncres}
                  className="bg-gray-200 cursor-pointer hover:bg-gray-300 sm:w-8 w-6 h-8 text-black text-sm"
                >
                  +
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked: boolean | "indeterminate") =>
                    setIsChecked(checked === "indeterminate" ? false : checked)
                  }
                  id="terms2"
                  className="cursor-pointer"
                />
                <Label
                  htmlFor="terms2"
                  className="text-xs cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  Service Key
                </Label>
              </div>
            </div>
  
            <div className="space-y-3 flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-sm font-semibold text-gray-200">
                  Total Keys
                </h1>
                <p className="text-xs text-gray-500">
                  {count} key{count !== 1 ? "s" : ""} will be generated
                </p>
              </div>
              <p className="text-xs text-gray-300">{count}</p>
            </div>
          </div>
  
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
              onClick={() => setIsGenerateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleGenerateKeys}
              disabled={isGenerating || !selectedKeyType}
              className="border bg-transparent hover:bg-transparent cursor-pointer !border-green-400 text-white"
            >
              {isGenerating ? <Loader className="animate-spin mr-2" /> : null}
              {isGenerating ? "Generating..." : "Generate Keys"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GenerateKeysModal;