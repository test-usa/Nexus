import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { MdDelete } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { FaUserLock } from "react-icons/fa";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import usePost from "@/hooks/shared/usePost";
import useUpdate from "@/hooks/shared/useUpdate";
import useDelete from "@/hooks/shared/useDelete";

interface LicenseKey {
  key: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  redeemedUsers: number;
  _id: string;
  RedeemedBy?: {
    accountId: string;
    redeemedAt: string;
    isBlocked?: boolean;
  }[];
}

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

const GeneratedKeyTable = () => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revealedKeys, setRevealedKeys] = useState<
    Record<number, { email: boolean; key: boolean }>
  >({});
  const [selectedKey, setSelectedKey] = useState<LicenseKey | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
  const [extendDays, setExtendDays] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extendMinutes, setExtendMinutes] = useState(0);
  const [extendHours, setExtendHours] = useState(0);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [accountToBlock, setAccountToBlock] = useState<string | null>(null);
  const [accountToUnblock, setAccountToUnblock] = useState<string | null>(null); // New state for unblock

  // New state for generate keys form
  const [count, setCount] = useState<number>(1);
  const [email, setEmail] = useState<string>();
  const [filteredKeys, setFilteredKeys] = useState<[""]>([""]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedKeyType, setSelectedKeyType] = useState<string>("");

  const keysPerPage = 9;
  const { data, isSuccess, isLoading, refetch } = useFetch(
    "/user-key/all-generated-key"
  );
  const { mutate: extendDuration } = useUpdate<any, any>(
    "/user-key/extend-duration"
  );
  const { mutate: blockAccount, isPending: isBlocking } = useUpdate<any, any>(
    "/user-key/block-account"
  );
  const { mutate: unblockAccount, isPending: isUnblocking } = useUpdate<any, any>(
    "/user-key/unblock-account"
  ); // New mutation for unblock
  const { mutate: generateKeys, isPending: isGenerating } = usePost<any, any>(
    "/user-key/create-user-key"
  );
  const { mutate: deleteKey } = useDelete("/user-key/delete-key/");

  // Fetch key types for generation form
  const { data: keyTypes = [] } = useFetch(`/key/all-key`);

  // Fetch user data
  const { data: userData, isLoading: isUserLoading } =
    useFetch("user/get-self");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setKeys(
        data.data.map((item: any) => ({
          key: item.key,
          expiresAt: item.expiresAt,
          createdAt: item.createdAt,
          email: item?.email,
          redeemedUsers: item.RedeemedBy?.length || 0,
          _id: item._id,
          RedeemedBy: item.RedeemedBy || [],
        }))
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (userData?.data?.email) {
      setEmail(userData.data.email);
    }
  }, [userData, isUserLoading]);

  const confirmDelete = async (key: string) => {
    try {
      setIsProcessing(true);
      deleteKey(key, {
        onSuccess: () => {
          toast.success("Key deleted successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete key");
        },
      });
    } finally {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
    }
  };

  const confirmBlockAccount = async (accountId: string) => {
    if (!selectedKey) return;

    try {
      setIsProcessing(true);
      blockAccount(
        { key: selectedKey.key, accountId },
        {
          onSuccess: () => {
            toast.success(`Account ${accountId} blocked successfully`);
            refetch();
            setIsAccountsModalOpen(false);
          },
          onError: (error: any) => {
            toast.error(
              error.message || `Failed to block account ${accountId}`
            );
          },
        }
      );
    } finally {
      setIsProcessing(false);
      setAccountToBlock(null);
    }
  };

  const confirmUnblockAccount = async (accountId: string) => {
    if (!selectedKey) return;

    try {
      setIsProcessing(true);
      unblockAccount(
        { key: selectedKey.key, accountId },
        {
          onSuccess: () => {
            toast.success(`Account ${accountId} unblocked successfully`);
            refetch();
            setIsAccountsModalOpen(false);
          },
          onError: (error: any) => {
            toast.error(
              error.message || `Failed to unblock account ${accountId}`
            );
          },
        }
      );
    } finally {
      setIsProcessing(false);
      setAccountToUnblock(null);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKeyType(e.target.value);
    if (e.target.value) {
      const key = e.target.value;
      const filterKey = keyTypes?.data.filter(
        (filterKeys: TSinglePriceData) => filterKeys.keyName === key
      );
      setFilteredKeys(filterKey);
    }
  };

  const handleDescres = (): void => {
    setCount((prev) => Math.max(1, prev - 1));
  };
  const handleIncres = (): void => setCount((prev) => prev + 1);

  const handleGenerateKeys = () => {
    if (!selectedKeyType) {
      toast.error("Please select a key type");
      return;
    }

    const payload = {
      keyType: isChecked ? "Service" : "Regular",
      email,
      amount: count,
      key: filteredKeys[0]?._id,
    };

    generateKeys(payload, {
      onSuccess: () => {
        toast.success(`${count} keys generated successfully`);
        setIsGenerateModalOpen(false);
        refetch();
      },
      onError: () => {
        toast.error("Failed to generate keys");
      },
    });
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleReveal = (index: number, field: "email" | "key") => {
    setRevealedKeys((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: !prev[index]?.[field] },
    }));
  };

  const handleDeleteClick = (keyItem: LicenseKey) => {
    setSelectedKey(keyItem);
    setIsDeleteModalOpen(true);
  };

  const handleExtendClick = (keyItem: LicenseKey) => {
    setSelectedKey(keyItem);
    setIsExtendModalOpen(true);
  };

  const handleShowAccountsClick = (keyItem: LicenseKey) => {
    setSelectedKey(keyItem);
    setIsAccountsModalOpen(true);
  };

  const calculateTotalDays = () => {
    const minutesToDays = extendMinutes / (60 * 24);
    const hoursToDays = extendHours / 24;
    const totalDays = minutesToDays + hoursToDays + extendDays;
    return parseFloat(totalDays.toFixed(4));
  };

  const confirmExtend = async (key: string) => {
    setIsProcessing(true);
    try {
      const payload = {
        extendedDuration: calculateTotalDays(),
        key,
      };

      await extendDuration(payload, {
        onSuccess: () => {
          toast.success(`Key extended successfully`);
          refetch();
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to extend key");
        },
      });
    } catch (error) {
      toast.error("Failed to extend key");
    } finally {
      setIsProcessing(false);
      setIsExtendModalOpen(false);
      setExtendMinutes(0);
      setExtendHours(0);
      setExtendDays(0);
    }
  };

  const offset = currentPage * keysPerPage;
  const currentKeys = keys?.slice(offset, offset + keysPerPage);

  if (isLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading user data...</span>
      </div>
    );
  }

  if (!isSuccess) {
    return <div className="text-red-500">Failed to load keys.</div>;
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium tracking-wide mt-4 text-[var(--color-textcolor)]">
          All Generated Keys
        </h1>

        {/* Generate New Keys Button */}
        <Dialog
          open={isGenerateModalOpen}
          onOpenChange={setIsGenerateModalOpen}
        >
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
                  {keyTypes?.data?.map((keys: TSinglePriceData) => (
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
                    onCheckedChange={(checked) => setIsChecked(!!checked)}
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
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)]">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                No
              </TableHead>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                Email
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Key
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Expiry Date
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Redeemed Users
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Created Date
              </TableHead>
              <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                Status
              </TableHead>
              <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentKeys.map((keyItem, index) => (
              <TableRow
                key={index}
                className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                  index % 2 === 0
                    ? "bg-[var(--color-oddcolor)]"
                    : "bg-[var(--color-evencolor)]"
                }`}
              >
                <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px]">
                  {index + 1 + offset}
                </TableCell>
                <TableCell
                  className="text-[16px] cursor-pointer"
                  onClick={() => toggleReveal(index, "email")}
                >
                  {revealedKeys[index]?.email
                    ? keyItem?.email
                    : `${keyItem?.email?.slice(0, 6)}...`}
                </TableCell>
                <TableCell
                  className="text-[16px] cursor-pointer"
                  onClick={() => toggleReveal(index, "key")}
                >
                  {revealedKeys[index]?.key
                    ? keyItem.key
                    : `${keyItem?.key?.slice(0, 6)}...`}
                </TableCell>
                <TableCell className="text-[16px]">
                  {keyItem.expiresAt === null
                    ? "N/A"
                    : keyItem.expiresAt === "Lifetime"
                    ? "Lifetime"
                    : new Date(keyItem.expiresAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-[16px]">
                  {keyItem.redeemedUsers}
                </TableCell>
                <TableCell className="text-right text-[16px]">
                  {new Date(keyItem.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-[16px]">
                  <Badge
                    className={`capitalize px-3 py-1 text-sm font-medium text-black pr-10 ${
                      keyItem.expiresAt === null ? "bg-gray-400" : "bg-green-400"
                    }`}
                  >
                    {keyItem.expiresAt === null ? "Not Redeemed" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-2xl flex justify-center gap-5 items-center mt-4">
                  {/* View Accounts Button */}
                  {keyItem.redeemedUsers > 0 && (
                    <Dialog
                      open={isAccountsModalOpen}
                      onOpenChange={setIsAccountsModalOpen}
                    >
                      <DialogTrigger asChild>
                        <div
                          className="relative group cursor-pointer"
                          onClick={() => handleShowAccountsClick(keyItem)}
                        >
                          <FaUserLock className="text-blue-500 transition-transform duration-300 transform group-hover:scale-125" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            View Accounts
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Redeemed Accounts</DialogTitle>
                          <DialogDescription>
                            Accounts that redeemed key:{" "}
                            {selectedKey?.key?.slice(0, 8)}...
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {selectedKey?.RedeemedBy?.length ? (
                            selectedKey.RedeemedBy.map((account, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 border-b border-gray-700"
                              >
                                <div>
                                  <p className="font-medium">
                                    {account?.accountId}
                                  </p>
                                  {account.isBlocked && (
                                    <Badge className="bg-red-500 text-xs mt-1">
                                      Blocked
                                    </Badge>
                                  )}
                                </div>
                                <div>
                                  {/* Block Button */}
                                  {!account.isBlocked && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                          onClick={() =>
                                            setAccountToBlock(account?.accountId)
                                          }
                                        >
                                          Block
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                                        <DialogHeader>
                                          <DialogTitle>Block Account</DialogTitle>
                                          <DialogDescription className="text-white mt-4">
                                            Are you sure you want to block this
                                            account? This will prevent them from
                                            using the key.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setAccountToBlock(null)}
                                            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                              confirmBlockAccount(accountToBlock!)
                                            }
                                            disabled={isBlocking || isProcessing}
                                            className="border bg-transparent hover:bg-transparent cursor-pointer !border-red-400 text-white"
                                          >
                                            {isBlocking ? (
                                              <Loader className="animate-spin mr-2" />
                                            ) : null}
                                            {isBlocking
                                              ? "Blocking..."
                                              : "Block Account"}
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                  {/* Unblock Button */}
                                  {account.isBlocked && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                                          onClick={() =>
                                            setAccountToUnblock(account?.accountId)
                                          }
                                        >
                                          Unblock
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                                        <DialogHeader>
                                          <DialogTitle>Unblock Account</DialogTitle>
                                          <DialogDescription className="text-white mt-4">
                                            Are you sure you want to unblock this
                                            account? This will restore their access
                                            to the key.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setAccountToUnblock(null)}
                                            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="default"
                                            onClick={() =>
                                              confirmUnblockAccount(accountToUnblock!)
                                            }
                                            disabled={isUnblocking || isProcessing}
                                            className="border bg-transparent hover:bg-transparent cursor-pointer !border-green-400 text-white"
                                          >
                                            {isUnblocking ? (
                                              <Loader className="animate-spin mr-2" />
                                            ) : null}
                                            {isUnblocking
                                              ? "Unblocking..."
                                              : "Unblock Account"}
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-gray-400">
                              No accounts found
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* Extend Time Button with Modal */}
                  <Dialog
                    open={isExtendModalOpen}
                    onOpenChange={setIsExtendModalOpen}
                  >
                    <DialogTrigger asChild>
                      <div
                        className="relative group cursor-pointer"
                        onClick={() => handleExtendClick(keyItem)}
                      >
                        <GiDuration className="text-yellow-600 transition-transform duration-300 transform group-hover:scale-125" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          Extend Time
                        </span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                      <DialogHeader>
                        <DialogTitle>Extend License Key</DialogTitle>
                        <DialogDescription>
                          Extend the expiration date for key:{" "}
                          {selectedKey?.key?.slice(0, 8)}...
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="minutes" className="text-right">
                            Minutes
                          </Label>
                          <Input
                            id="minutes"
                            type="number"
                            min="0"
                            placeholder="0"
                            onChange={(e) =>
                              setExtendMinutes(Number(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="hours" className="text-right">
                            Hours
                          </Label>
                          <Input
                            id="hours"
                            type="number"
                            min="0"
                            placeholder="0"
                            onChange={(e) =>
                              setExtendHours(Number(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="days" className="text-right">
                            Days
                          </Label>
                          <Input
                            id="days"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={extendDays}
                            onChange={(e) =>
                              setExtendDays(Number(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Total</Label>
                          <div className="col-span-3 text-sm">
                            {calculateTotalDays()} days
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                          onClick={() => setIsExtendModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={() => confirmExtend(selectedKey?.key || "")}
                          disabled={isProcessing}
                          className="border bg-transparent hover:bg-transparent cursor-pointer !border-blue-400"
                        >
                          {isProcessing ? "Extending..." : "Extend Key"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Button with Modal */}
                  <Dialog
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                  >
                    <DialogTrigger asChild>
                      <div
                        className="relative group cursor-pointer"
                        onClick={() => handleDeleteClick(keyItem)}
                      >
                        <MdDelete className="text-red-600 transition-transform duration-300 transform group-hover:scale-125" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          Delete
                        </span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                      <DialogHeader>
                        <DialogTitle>Delete License Key</DialogTitle>
                        <DialogDescription className="text-white mt-4">
                          Are you sure you want to delete this key? This action
                          cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDeleteModalOpen(false)}
                          className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            confirmDelete(selectedKey?.key as string)
                          }
                          disabled={isProcessing}
                          className="border bg-transparent hover:bg-transparent cursor-pointer !border-red-400 text-white"
                        >
                          {isProcessing ? "Deleting..." : "Delete Key"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="mt-3 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(keys.length / keysPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default GeneratedKeyTable;