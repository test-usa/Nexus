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
import useDelete from "@/hooks/shared/useDelete";
import useUpdate from "@/hooks/shared/useUpdate";

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

const KeyManagement = () => {
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
  const [extendMinutes, setExtendMinutes] = useState(0);
  const [extendHours, setExtendHours] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountToBlock, setAccountToBlock] = useState<string | null>(null);
  const [accountToUnblock, setAccountToUnblock] = useState<string | null>(null); // New state for unblock

  const keysPerPage = 9;
  const { data, isSuccess, isLoading, refetch } = useFetch("/user-key/all-key");
  const { mutate: extendDuration } = useUpdate<any, any>(
    "/user-key/extend-duration"
  );
  const { mutate: deleteKey } = useDelete("/user-key/delete-key/");
  const { mutate: blockAccount, isPending: isBlocking } = useUpdate<any, any>(
    "/user-key/block-account"
  );
  const { mutate: unblockAccount, isPending: isUnblocking } = useUpdate<any, any>(
    "/user-key/unblock-account"
  ); // New mutation for unblock

  useEffect(() => {
    if (isSuccess && data?.data) {
      setKeys(
        data.data.map((item: any) => ({
          key: item.key,
          expiresAt: item.expiresAt,
          createdAt: item.createdAt,
          email: item.email,
          redeemedUsers: item.RedeemedBy?.length,
          _id: item._id,
          RedeemedBy: item.RedeemedBy || [],
        }))
      );
    }
  }, [isSuccess, data]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleReveal = (index: number, field: "email" | "key") => {
    setRevealedKeys((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: !prev[index]?.[field] },
    }));
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
            setIsAccountsModalOpen(false); // Close the modal after success
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
            setIsAccountsModalOpen(false); // Close the modal after success
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

  const offset = currentPage * keysPerPage;
  const currentKeys = keys.slice(offset, offset + keysPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading keys data</span>
      </div>
    );
  }

  if (!isSuccess) {
    return <div className="text-red-500">Failed to load keys.</div>;
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        All User Keys
      </h1>
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
                    ? keyItem.email
                    : `${keyItem.email.slice(0, 6)}...`}
                </TableCell>
                <TableCell
                  className="text-[16px] cursor-pointer"
                  onClick={() => toggleReveal(index, "key")}
                >
                  {revealedKeys[index]?.key
                    ? keyItem.key
                    : `${keyItem.key.slice(0, 6)}...`}
                </TableCell>
                <TableCell className="text-[16px]">
                  {keyItem.expiresAt === null
                    ? "N/A"
                    : keyItem.expiresAt === "Livetime"
                    ? "Life time"
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
                      keyItem.expiresAt === null
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {keyItem.expiresAt === null ? "Not Redeemed" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-2xl flex justify-center gap-5 items-center mt-4">
                  {/* Show Accounts Button with Modal */}
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
                                    {account.accountId}
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
                                            setAccountToBlock(account.accountId)
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
                                            onClick={() =>
                                              setAccountToBlock(null)
                                            }
                                            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                              confirmBlockAccount(
                                                accountToBlock!
                                              )
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
                                            setAccountToUnblock(account.accountId)
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
                                            onClick={() =>
                                              setAccountToUnblock(null)
                                            }
                                            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="default"
                                            onClick={() =>
                                              confirmUnblockAccount(
                                                accountToUnblock!
                                              )
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

export default KeyManagement;